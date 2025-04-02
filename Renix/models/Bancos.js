import mongoose from 'mongoose';
import { type } from 'os';

const bancoSchema = new mongoose.Schema ({
    nome_banco :{
        type: String, 
        required: true,
    },
    IOF_diario: {
        type: Number, 
        required: true,
    },
    cdi: {
        type: Number, 
        required: true, 
    },
    IR_ate_180_dias: {
        type: Number,
        required: true,
    },
    IR_ate_360_dias: {
        type: Number,
        required: true,
    },
    IR_ate_720_dias: {
        type: Number,
        required: true,
    },
    IR_acima_720_dias: {
        type: Number,
        required: true,
    }
}, {timestamps: true });

export default mongoose.models.Bancos || mongoose.model('Bancos', bancoSchema); 