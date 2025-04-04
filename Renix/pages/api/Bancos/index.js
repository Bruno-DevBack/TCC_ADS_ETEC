import dbConnect from '../../../lib/dbConnect';
import Banco from '../../../models/Banco';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'GET') {
        try {
            const bancos = await Banco.find().populate('usuarios_id', 'nome_usuario emai_usuario');
            res.status(200).json(bancos);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar bancos', error: error.message });
        }
    }

    else if (req.method === 'POST') {
        try {
            const { nome_banco, IOF_diario, cdi, IR_ate_180_dias, IR_ate_360_dias, IR_ate_720_dias, IR_acima_de_720_dias, usuarios_id } = req.body;

            const novoBanco = new Banco({
                nome_banco,
                IOF_diario,
                cdi,
                IR_ate_180_dias,
                IR_ate_360_dias,
                IR_ate_720_dias,
                IR_acima_de_720_dias,
                usuarios_id
            });

            await novoBanco.save();
            res.status(201).json({ message: 'Banco criado com sucesso', banco: novoBanco });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar banco', error: error.message });
        }
    }

    else {
        res.status(405).json({ message: 'Método não permitido' });
    }
}
