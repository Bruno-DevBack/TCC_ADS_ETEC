import dbConnect from '../../../lib/dbConnect';
import withRateLimit from '../../../lib/withRateLimit';
import Investimento from '../../../models/Investimento';
import Dashboard from '../../../models/Dashboard';
import Banco from '../../../models/Bancos';
import Usuario from '../../../models/Usuarios'; // IMPORTANTE: faltava isso

async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        try {
            const { usuario_id, banco_id, valor_investimento, data_inicio, data_fim } = req.body;

            // Criar o novo investimento
            const novoInvestimento = new Investimento({
                usuario_id,
                banco_id,
                valor_investimento,
                data_inicio,
                data_fim
            });

            await novoInvestimento.save();

            // Calcular rendimento
            const diasCorridos = Math.ceil((new Date(data_fim) - new Date(data_inicio)) / (1000 * 60 * 60 * 24));
            const banco = await Banco.findById(banco_id);
            const usuario = await Usuario.findById(usuario_id);

            if (!banco || !usuario) {
                return res.status(404).json({ message: 'Usuário ou banco não encontrado' });
            }

            const cdi = banco.cdi / 100;
            const rendimentoBruto = valor_investimento * (1 + cdi * diasCorridos / 365);

            // Calcular IOF e IR
            let impostoRenda = 0;
            if (diasCorridos <= 180) impostoRenda = banco.IR_ate_180_dias / 100;
            else if (diasCorridos <= 360) impostoRenda = banco.IR_ate_360_dias / 100;
            else if (diasCorridos <= 720) impostoRenda = banco.IR_ate_720_dias / 100;
            else impostoRenda = banco.IR_acima_720_dias / 100;

            const valorImposto = rendimentoBruto * impostoRenda;
            const valorLiquido = rendimentoBruto - valorImposto;

            // Criar entrada no Dashboard com nomes
            const novoDashboard = new Dashboard({
                usuario_id,
                nome_usuario: usuario.nome_usuario,
                banco_id,
                nome_banco: banco.nome_banco,
                investimento_id: novoInvestimento._id,
                valor_bruto: parseFloat(rendimentoBruto.toFixed(2)),
                valor_liquido: parseFloat(valorLiquido.toFixed(2)),
                dias_corridos: diasCorridos,
                imposto_renda: parseFloat(valorImposto.toFixed(2)),
                IOF: parseFloat(banco.IOF_diario.toFixed(2))
            });

            await novoDashboard.save();

            return res.status(201).json({
                message: 'Investimento criado e dashboard atualizado com nomes!',
                novoInvestimento,
                novoDashboard
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao criar investimento', error: error.message });
        }
    }

    return res.status(405).json({ message: 'Método não permitido' });
}
export default withRateLimit(handler, 10);