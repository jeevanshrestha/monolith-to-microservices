import express from 'express';
import {
  getAllBooks,
  searchBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../controllers/bookController';
import { bookValidationRules, validate } from '../middlewares/validationMiddleware';

const router = express.Router();

// Public routes
router.get('/', bookValidationRules.getBooks , getAllBooks);
router.get('/search', searchBooks);
router.get('/:id', getBookById);

// Admin routes (protected)
//router.use(protect);
//router.use(restrictTo('admin'));

router.post('/', bookValidationRules.createBook , createBook);
router.patch('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;