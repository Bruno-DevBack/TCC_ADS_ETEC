import dbConnect from '../../../lib/dbConnect';
import Usuario from '../../../models/Usuarios';
import withRateLimit from '../../../lib/withRateLimit';

async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método não permitido' });
    }

    await dbConnect();

<<<<<<< HEAD
    const { email_usuario, senha_usuario } = req.body;

    try {
        const usuario = await Usuario.findOne({ email_usuario });
=======
    const { emai_usuario, senha_usuario } = req.body;

    try {
        const usuario = await Usuario.findOne({ emai_usuario });
>>>>>>> 07ea07f0e8c52ab7cc4830bac319bce8d1904dd6
        if (!usuario || !(await usuario.matchPassword(senha_usuario))) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        res.status(200).json({
            usuario: {
                id: usuario._id,
                nome_usuario: usuario.nome_usuario,
<<<<<<< HEAD
                email_usuario: usuario.email_usuario,
=======
                emai_usuario: usuario.emai_usuario,
>>>>>>> 07ea07f0e8c52ab7cc4830bac319bce8d1904dd6
                eAdmin: usuario.eAdmin, // true = admin, false = usuário normal
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao fazer login', error: error.message });
    }
}
export default withRateLimit(handler, 10);