import mongoose from 'mongoose';

const investimentoSchema = new mongoose.Schema({
    usuario_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    banco_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Banco',
        required: true
    },
    valor_investimento: {
        type: Number,
        required: true
    },
    data_inicio: {
        type: Date,
        required: true
    },
    data_fim: {
        type: Date,
        required: true
    }
}, { timestamps: true });

export default mongoose.models.Investimento || mongoose.model('Investimento', investimentoSchema);
