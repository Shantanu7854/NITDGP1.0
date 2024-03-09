import {config} from 'dotenv';
config();
import jwt from 'jsonwebtoken';
import {UnauthenticatedError} from '../errors/index.js';

const auth = (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith('Bearer ')){
      throw new UnauthenticatedError('Authentication invalid')
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, "abcdef");

    // attach the user to job routes
    req.user = { 
                 userId: payload.userId, 
                 name: payload.name 
               };
    next();
  } catch (error) {
        throw new UnauthenticatedError('Authentication Invalid ');
  }
}

export default auth; 