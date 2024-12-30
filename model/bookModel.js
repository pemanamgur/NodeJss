import mongoose from 'mongoose';

const bookschema = mongoose.Schema(
  {
    name: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Book = mongoose.model('Book', bookschema);
export default Book;
