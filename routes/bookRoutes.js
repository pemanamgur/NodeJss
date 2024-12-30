import express from 'express';
import {
  addBook,
  deleteBook,
  getBookList,
  listBook,
  updateBook,
  updateOnlyOneBook,
} from '../controllers/booksController.js';

const router = express.Router();

const middle = (req, res, next) => {
  console.log('middleware');
  try {
    if (req.body.name === 'book1') throw new Error('invalid request');
    next();
  } catch (error) {
    console.log('error');
    next(error);
  }
};
router.route('/add').post(middle, addBook);
router.route('/').get(getBookList);
router.route('/list').get(listBook);
router.route('/:bookId').delete(deleteBook);
router.route('/:bookId').patch(updateBook);
router.route('/:bookId').get(updateOnlyOneBook);

// router.route("/add").post(addCategory);
// router.route("/delete/:id").delete(deleteCategory);

// router.route("/update/:id").put(updateCategory);

export default router;
