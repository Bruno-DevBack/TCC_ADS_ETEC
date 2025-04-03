import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const usuarioSchema = new mongoose.Schema({
    nome_usuario: {
        type: String,
        required: true,
    },
    emai_usuario: {
        type: String,
        required: true,
        unique: true,
    },
    telefone_usuario: {
        type: String,
        required: true,
    },
    eAdmin: {
        type: Boolean,
        default: false,
    },
    ePremium: {
        type: Boolean,
        default: false,
    },
    senha_usuario: {
        type: String,
        required: true,
    },
    cnpj_usuario: {
        type: String,
        default: null,
    },
    cpf_usuario: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });

// Hash da senha antes de salvar
usuarioSchema.pre('save', async function (next) {
    if (!this.isModified('senha_usuario')) return next();
    const salt = await bcrypt.genSalt(10);
    this.senha_usuario = await bcrypt.hash(this.senha_usuario, salt);
    next();
});

// Método para comparar senha
usuarioSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.senha_usuario);
};

export default mongoose.models.Usuario || mongoose.model('Usuario', usuarioSchema);