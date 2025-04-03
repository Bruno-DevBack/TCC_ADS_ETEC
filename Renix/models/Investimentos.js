import { timeStamp } from 'console';
import mongoose from 'mongoose';
import moongose from 'moongose';
import { ref } from 'process';

const investimentoSchema = new moongose.Schema({

    usuario_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
      },

      banco_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bancos',
        required: true,
      },

    valor_investimento: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
    },

    data_inicio: {
        type: Date,
        required: true,
    },

    data_fim: {
        type: Date,
        required: true,

        validate: {
            validator: function (v) {
                return v >= this.data_inicio;
            },
            message: props => `A data de fim (${props.value}) não pode ser anterior à data de inicio`
        }, 
    },
}, { timestamps: true });

investimentoSchema

export default mongoose.models.Investimento || mongoose.model('Investimento', investimentoSchema)