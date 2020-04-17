const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({

    brand: String,
    model: String,
    color: String,
    plate: {
        type: String,
        unique: true
    }, 
    city: String,
    state: String,
    year: Number,
    details: String,
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

