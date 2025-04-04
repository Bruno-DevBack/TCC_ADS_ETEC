import dbConnect from '../../../lib/dbConnect';
import Investimento from '../../../models/Investimento';

export default async function handler(req, res) {
    await dbConnect();

    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const investimento = await Investimento.findById(id);
            if (!investimento) {
                return res.status(404).json({ message: 'Investimento não encontrado' });
            }
            res.status(200).json(investimento);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar investimento', error });
        }
    }

    if (req.method === 'DELETE') {
        try {
            const investimento = await Investimento.findByIdAndDelete(id);
            if (!investimento) {
                return res.status(404).json({ message: 'Investimento não encontrado' });
            }
            res.status(200).json({ message: 'Investimento deletado com sucesso' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar investimento', error });
        }
    }

    res.status(405).json({ message: 'Método não permitido' });
}
