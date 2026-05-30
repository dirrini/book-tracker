import { UserBookModel } from '../models/userBookModel.js';

export const addBookController = async (request, reply) => {
  const { bookId } = request.body;
  // request.user is dynamically populated by our JWT verification preValidation hook
  const userId = request.user.userId; 

  if (!bookId) {
    return reply.status(400).send({ error: 'Missing target bookId parameter.' });
  }

  try {
    await UserBookModel.addBookToUser(userId, bookId);
    return reply.status(201).send({ message: 'Book added successfully to your library.' });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({ error: 'Database transaction failed mapping user asset.' });
  }
};

export const getMyBookIdsController = async (request, reply) => {
  const userId = request.user.userId;
  try {
    const bookIds = await UserBookModel.getUserBookIds(userId);
    return reply.status(200).send(bookIds);
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({ error: 'Failed to retrieve personal catalog indexes.' });
  }
};