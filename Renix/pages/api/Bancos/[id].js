import dbConnect from '../../../lib/dbConnect';
import Banco from '../../../models/Bancos';
import mongoose from 'mongoose';

export default async function handler(req, res) {
    await dbConnect();
    const { id } = req.query;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID inválido' });
    }

    if (req.method === 'GET') {
        try {
<<<<<<< HEAD
            const banco = await Banco.findById(id).populate('usuarios_id', 'nome_usuario email_usuario');
=======
            const banco = await Banco.findById(id).populate('usuarios_id', 'nome_usuario emai_usuario');
>>>>>>> 07ea07f0e8c52ab7cc4830bac319bce8d1904dd6
            if (!banco) return res.status(404).json({ message: 'Banco não encontrado' });

            res.status(200).json(banco);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar banco', error: error.message });
        }
    } 
    
    else if (req.method === 'PUT') {
        try {
            const bancoAtualizado = await Banco.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
            if (!bancoAtualizado) return res.status(404).json({ message: 'Banco não encontrado' });

            res.status(200).json({ message: 'Banco atualizado com sucesso', banco: bancoAtualizado });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar banco', error: error.message });
        }
    } 
    
    else if (req.method === 'DELETE') {
        try {
            const bancoDeletado = await Banco.findByIdAndDelete(id);
            if (!bancoDeletado) return res.status(404).json({ message: 'Banco não encontrado' });

            res.status(200).json({ message: 'Banco removido com sucesso' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao excluir banco', error: error.message });
        }
    } 
    
    else {
        res.status(405).json({ message: 'Método não permitido' });
    }
}
