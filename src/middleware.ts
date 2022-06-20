import {Middleware, HttpErrors} from '@loopback/rest';
// import {logger} from './utils/logger';
import * as dotenv from 'dotenv';
// import jwt_decode from 'jwt-decode';
dotenv.config();

export const log: Middleware = async (middlewareCtx, next) => {
  const {request} = middlewareCtx;
  try {
    // Process response
    return await next();
  } catch (err: any) {
    // Catch errors from downstream middleware
    if (err.__proto__.status && err.__proto__.status === 401) {
      throw new HttpErrors[401](err);
    } else {
      return {
        success: false,
        error: err.message,
        detail: JSON.stringify(err),
      };
    }
  }
};
