import dbConnect from '../../../lib/dbConnect';
import Usuario from '../../../models/Usuarios';
import withRateLimit from '../../../lib/withRateLimit';

async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método não permitido' });
    }

    await dbConnect();

    const { nome_usuario, emai_usuario, telefone_usuario, senha_usuario, cpf_usuario, cnpj_usuario } = req.body;

    try {
        // Verifica se o usuário já existe
        const usuarioExistente = await Usuario.findOne({ $or: [{ emai_usuario }, { cpf_usuario }] });
        if (usuarioExistente) {
            return res.status(400).json({ message: 'Usuário já cadastrado com este email ou CPF' });
        }

        const usuario = new Usuario({
            nome_usuario,
            emai_usuario,
            telefone_usuario,
            senha_usuario,
            cpf_usuario,
            cnpj_usuario: cnpj_usuario || null,
            eAdmin: false,
            ePremium: false,
        });

        await usuario.save();
        res.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
    }
}
export default withRateLimit(handler, 10);