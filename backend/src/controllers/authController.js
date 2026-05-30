import { OAuth2Client } from 'google-auth-library';
import { UserModel } from '../models/userModel.js';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleSignInController = async (request, reply) => {
  const { credential } = request.body; // Token sent from the frontend login button

  if (!credential) {
    return reply.status(400).send({ error: 'Missing Google credential token.' });
  }

  try {
    // 1. Verify the token with Google
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const { sub: googleId, email, name } = payload;

    // 2. Check if user exists in PostgreSQL, otherwise create them
    let user = await UserModel.findByOauthId(googleId);
    
    if (!user) {
      user = await UserModel.createUser({
        oauthProvider: 'google',
        oauthId: googleId,
        email: email,
        displayName: name
      });
    }

    // 3. Issue your own stateless JWT for the frontend/mobile apps
    const appToken = request.server.jwt.sign({ 
      userId: user.id,
      email: user.email 
    }, {
      expiresIn: '7d' // Standard session duration
    });

    return reply.status(200).send({
      message: 'Authentication successful',
      token: appToken,
      user: {
        id: user.id,
        displayName: user.display_name,
        email: user.email
      }
    });

  } catch (error) {
    request.log.error('OAuth verification crash:', error);
    return reply.status(401).send({ error: 'Invalid Google credential token.' });
  }
};