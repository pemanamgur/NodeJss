import mongoose from 'mongoose';
import Book from '../model/bookModel.js';
export const addBook = async (req, res) => {
  try {
    const { name, createdBy } = req.body;
    const book = await Book.create({ name, createdBy });

    res.status(200).json(book);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const getBookList = async (req, res) => {
  try {
    const book = await Book.find();
    res.status(200).json(book);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const deleteBook = async (req, res) => {
  const { bookId } = req.params;
  try {
    const book = await Book.deleteOne({ _id: bookId });
    res.status(200).json(book);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const updateBook = async (req, res) => {
  const { bookId } = req.params;
  const updatedData = req.body; // Assuming you're sending updated fields in the request body

  try {
    // Update the book document with the given ID
    const book = await Book.findByIdAndUpdate(bookId, updatedData, {
      new: true,
    });

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const updateOnlyOneBook = async (req, res) => {
  const { bookId } = req.params;
  const updatedData = req.body; // Assuming you're sending updated fields in the request body
  console.log(updatedData);
  try {
    // Update the book document with the given ID
    const book = await Book.findOne({ name: bookId })
      .populate([{ path: 'createdBy', select: 'name' }])
      .select('-name');

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const ambiBook = async (req, res) => {
  const { bookId } = req.params;
  try {
    const book = await Book.deleteOne({ _id: bookId });
    res.status(200).json(book);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const listBook = async (req, res) => {
  const { bookId } = req.params;
  // const { name } = req.body;
  const { name, id } = req.query;
  console.log(name, 'mm', req.body);
  try {
    const book = await Book.aggregate([
      // { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'users',
          localField: 'createdBy',
          foreignField: '_id',
          as: 'createdBy',
          pipeline: [{ $project: { name: 1 } }],
        },
      },
      { $match: { 'createdBy.name': name } },

      { $set: { createdBy: { $first: '$createdBy' } } },
    ]);
    res.status(200).json(book);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
