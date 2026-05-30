import { BookModel } from '../models/bookModel.js';

export const getAllBooksController = async (request, reply) => {
  try {
    const books = await BookModel.getAllBooks();
    return reply.status(200).send(books);
  } catch (error) {
    request.log.error(error); // Logs using Fastify's built-in high-performance logger
    return reply.status(500).send({ 
      error: 'Internal Server Error', 
      message: 'Failed to retrieve books library.' 
    });
  }
};

export const getBookController = async (request, reply) => {
  const { bookId } = request.params;
  try {
    const book = await BookModel.getBook(bookId);
    if (!book) {
      return reply.status(404).send({ error: 'Book not found' });
    }
    return reply.status(200).send(book);
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({ 
      error: 'Internal Server Error', 
      message: 'Failed to retrieve book.' 
    });
  }
};