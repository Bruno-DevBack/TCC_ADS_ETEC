import mongoose from 'moongose';
import { type } from 'os';

const dashboardSchema = new mongoose.Schema ({
    valor_estimado: {
        type: Number,
        required: true,
    },
    valor_liquido: {
        type: Number,
        required: true,
    },
    dias_corridos: {
        type: Number,
        required: true,
    },
    percentual_rendimento: {
        type: Number,
        required: true,
    },
    imposto_renda: {
        type: Number,
        required: true,
    },
}, {timestamps: true});

export default mongoose.models.Dashboard || mongoose.model('Dashboard', dashboardSchema)