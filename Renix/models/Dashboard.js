import mongoose from 'mongoose';

const dashboardSchema = new mongoose.Schema({
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
  investimento_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Investimento',
    required: true
  },
  valor_estimado: {
    type: Number,
    required: true
  },
  valor_liquido: {
    type: Number,
    required: true
  },
  dias_corridos: {
    type: Number,
    required: true
  },
  percentual_rendimento: {
    type: Number,
    required: true
  },
  imposto_renda: {
    type: Number,
    required: true
  },
  IOF: {
    type: Number,
    required: true
  }
}, { timestamps: true });

export default mongoose.models.Dashboard || mongoose.model('Dashboard', dashboardSchema);
