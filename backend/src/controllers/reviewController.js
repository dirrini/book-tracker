import { ReviewModel } from '../models/reviewModel.js';

export const getBookReviewsController = async (request, reply) => {
  const { bookId } = request.params;

  try {
    const reviews = await ReviewModel.getReviewsByBookId(bookId);
    return reply.status(200).send(reviews);
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({ error: 'Failed to fetch reviews for this volume.' });
  }
};