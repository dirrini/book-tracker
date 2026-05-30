import { getAllBooksController, getBookController } from '../controllers/bookController.js';
import { getBookReviewsController } from '../controllers/reviewController.js';

export default async function bookRoutes(fastify, options) {
  // GET /api/v1/books
  fastify.get('/', getAllBooksController);
  fastify.get('/:bookId', getBookController);
  fastify.get('/:bookId/reviews', getBookReviewsController);
}