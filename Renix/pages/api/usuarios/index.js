import dbConnect from '../../../lib/dbConnect';
import Usuario from '../../../models/Usuarios';
import mongoose from 'mongoose';
import withRateLimit from '../../../lib/withRateLimit';

async function handler(req, res) {
    await dbConnect();

    const { id, eAdmin } = req.query;

    if (req.method === 'GET') {
        try {
            if (eAdmin !== 'false') {
                return res.status(403).json({ message: 'Acesso negado: apenas administradores podem visualizar esses dados' });
            }

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: 'ID inválido' });
            }

            const usuario = await Usuario.findById(id);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            return res.status(200).json(usuario);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao buscar usuário', error: error.message });
        }
    }

    return res.status(405).json({ message: 'Método não permitido' });
}
export default withRateLimit(handler, 10);