import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  montant: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Todo || mongoose.model('Todo', todoSchema);