import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import bookRoutes from './routes/bookRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userBookRoutes from './routes/userBookRoutes.js';

const fastify = Fastify({ logger: true });

// 1. Register JWT first
fastify.register(jwt, {
  secret: process.env.JWT_SECRET || 'fallback_development_secret_321!'
});

// 2. Register CORS using the official framework strategy (no top-level await)
fastify.register(cors, {
  origin: true, // Dynamically allows the requesting origin (perfect for development)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
});

// 3. Register Moduled Routes
fastify.register(bookRoutes, { prefix: '/api/v1/books' });
fastify.register(authRoutes, { prefix: '/api/v1/auth' });
fastify.register(userBookRoutes, { prefix: '/api/v1/my-books' });

const start = async () => {
  try {
    // Explicitly bind to 0.0.0.0 so Docker can map internal traffic to your host machine
    await fastify.listen({ port: process.env.PORT || 5000, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();