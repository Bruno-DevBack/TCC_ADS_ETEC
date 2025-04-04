import dbConnect from '../../../lib/dbConnect';
import Investimento from '../../../models/Investimento';
import Dashboard from '../../../models/Dashboard';
import Banco from '../../../models/Banco';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'GET') {
        try {
            const investimentos = await Investimento.find().populate('usuario_id banco_id');
            res.status(200).json(investimentos);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar investimentos', error });
        }
    }

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

            if (!banco) {
                return res.status(404).json({ message: 'Banco não encontrado' });
            }

            const cdi = banco.cdi / 100;
            const rendimentoBruto = valor_investimento * (1 + cdi * diasCorridos / 365);

            // Calcular IOF e IR
            let impostoRenda = 0;
            if (diasCorridos <= 180) impostoRenda = banco.IR_ate_180_dias / 100;
            else if (diasCorridos <= 360) impostoRenda = banco.IR_ate_360_dias / 100;
            else if (diasCorridos <= 720) impostoRenda = banco.IR_ate_720_dias / 100;
            else impostoRenda = banco.IR_acima_de_720_dias / 100;

            const valorImposto = rendimentoBruto * impostoRenda;
            const valorLiquido = rendimentoBruto - valorImposto;

            // Criar entrada no Dashboard
            const novoDashboard = new Dashboard({
                usuario_id,
                banco_id,
                investimento_id: novoInvestimento._id,
                valor_estimado: rendimentoBruto.toFixed(2),
                valor_liquido: valorLiquido.toFixed(2),
                dias_corridos: diasCorridos,
                percentual_rendimento: (cdi * diasCorridos / 365 * 100).toFixed(2),
                imposto_renda: valorImposto.toFixed(2),
                IOF: banco.IOF_diario.toFixed(2)
            });

            await novoDashboard.save();

            res.status(201).json({ message: 'Investimento criado e atualizado no dashboard!', novoInvestimento, novoDashboard });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar investimento', error });
        }
    }

    res.status(405).json({ message: 'Método não permitido' });
}
