import { addBookController, getMyBookIdsController } from '../controllers/userBookController.js';

// Authentication verification helper plugin pattern
const authenticateHook = async (request, reply) => {
  try {
    await request.jwtVerify(); // Automatically decodes Authorization: Bearer <token>
  } catch (err) {
    return reply.status(401).send({ error: 'Authentication required to modify collection properties.' });
  }
};

export default async function userBookRoutes(fastify, options) {
  // Register Protected Endpoints directly along with your registrations block:
  fastify.post('/', { preValidation: [authenticateHook] }, addBookController);
  fastify.get('/ids', { preValidation: [authenticateHook] }, getMyBookIdsController);
}