import mongoose from 'mongoose';

const dashboardSchema = new mongoose.Schema({
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
  IOF: {
    type: Number,
    required: true,
  },

  // Referências para as coleções relacionadas
  usuario_dashboard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  banco_dashboard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bancos',
    required: true,
  },
  investimento_dashboard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Investimentos', // Supondo que você tenha o modelo de investimentos também
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.Dashboard || mongoose.model('Dashboard', dashboardSchema);
