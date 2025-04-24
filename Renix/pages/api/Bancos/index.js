import dbConnect from '../../../lib/dbConnect';
import Banco from '../../../models/Bancos';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'GET') {
        try {
            const bancos = await Banco.find('nome_banco');
            res.status(200).json(bancos);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar bancos', error: error.message });
        }
    }

    else if (req.method === 'POST') {
        try {
<<<<<<< HEAD
            const { nome_banco, IOF_diario, cdi, IR_ate_180_dias, IR_ate_360_dias, IR_ate_720_dias, IR_acima_720_dias } = req.body;
=======
            const { nome_banco, IOF_diario, cdi, IR_ate_180_dias, IR_ate_360_dias, IR_ate_720_dias, IR_acima_de_720_dias } = req.body;
>>>>>>> 07ea07f0e8c52ab7cc4830bac319bce8d1904dd6

            const novoBanco = new Banco({
                nome_banco,
                IOF_diario,
                cdi,
                IR_ate_180_dias,
                IR_ate_360_dias,
                IR_ate_720_dias,
<<<<<<< HEAD
                IR_acima_720_dias,
=======
                IR_acima_de_720_dias,
>>>>>>> 07ea07f0e8c52ab7cc4830bac319bce8d1904dd6
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
