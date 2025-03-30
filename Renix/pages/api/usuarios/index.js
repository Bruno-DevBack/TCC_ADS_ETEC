import dbConnect from '../../../lib/dbConnect';
import Usuario from '../../../models/Usuarios';
import mongoose from 'mongoose';

export default async function handler(req, res) {
    await dbConnect();

    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            if (id) {
                // Se o ID estiver presente, buscar usuário por ID
                if (!mongoose.Types.ObjectId.isValid(id)) {
                    return res.status(400).json({ message: 'ID inválido' });
                }

                const usuario = await Usuario.findById(id);
                if (!usuario) {
                    return res.status(404).json({ message: 'Usuário não encontrado' });
                }

                return res.status(200).json(usuario);
            } else {
                // Se não tiver ID, retorna todos os usuários
                const usuarios = await Usuario.find({});
                return res.status(200).json(usuarios);
            }
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao buscar usuário(s)', error });
        }
    } else {
        res.status(405).json({ message: 'Método não permitido' });
    }
}
