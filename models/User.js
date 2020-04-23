const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  status:{
    type: String,
    enum: ["Aguardando confirmação", "Ativo"],
    default: 'Aguardando confirmação'
  },
  email: {
    type: String,
    unique: true
  },
  confirmationCode: String, 
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
