import { googleSignInController } from '../controllers/authController.js';

export default async function authRoutes(fastify, options) {
  // POST /api/v1/auth/google
  fastify.post('/google', googleSignInController);
}