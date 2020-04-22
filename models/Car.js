const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({

    brand: {
        type: String,
        uppercase: true
    },
    model: {
        type: String,
        uppercase: true
    },
    color: {
        type: String,
        uppercase: true
    },
    plate: {
        type: String,
        unique: true
    }, 
    city: {
        type: String,
        uppercase: true
    },
    state: {
        type: String,
        uppercase: true
    },
    year: String,

    details: {
        type: String,
        uppercase: true
    },
    status: {
        type: String,
        enum: ['Roubado', 'Sem registro ou alerta de roubo']
    },
    path: String,
    originalName: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
});

const Car = mongoose.model("Car", carSchema);
module.exports = Car;

