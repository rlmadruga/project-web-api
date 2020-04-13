const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({

    brand: String,
    model: String,
    color: String,
    plate: String, 
    city: String,
    state: String,
    year: Number,
    details: String,
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

