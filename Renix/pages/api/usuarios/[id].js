import dbConnect from '../../../lib/dbConnect';
import Usuario from '../../../models/Usuarios';

export default async function handler(req, res) {
    const { id } = req.query;
    await dbConnect();

    if (req.method === 'PUT') {
        try {
            // Se a senha não for passada, removemos o campo 'senha_usuario' do corpo da requisição
            if (!req.body.senha_usuario) {
                delete req.body.senha_usuario;
            }

            const usuario = await Usuario.findByIdAndUpdate(id, req.body, { new: true });

            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            res.status(200).json(usuario);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao atualizar usuário', error });
        }
    } else if (req.method === 'DELETE') {
        try {
            const usuario = await Usuario.findByIdAndDelete(id);
            if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });
            res.status(200).json({ message: 'Usuário deletado' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar usuário', error });
        }
    } else {
        res.status(405).json({ message: 'Método não permitido' });
    }
}
