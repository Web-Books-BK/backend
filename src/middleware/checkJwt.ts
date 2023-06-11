import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as config from '../config/config';
import { CustomRequest } from '../types/customRequest';

export const checkJwt = (req: CustomRequest, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  const authHeader = req.header('Authorization') ? (req.header('Authorization') as string).split(' ') : null;
  let jwtPayload;

  //Try to validate the token and get data
  if (!authHeader) {
    return res.status(422).json({
      errors: { body: ['Authorization failed', 'No Authorization header'] },
    });
  }
  if (authHeader[0] !== 'Bearer')
    return res.status(401).json({
      errors: { body: ['Authorization failed', 'Token missing'] },
    });

  //Check if token is valid
  const token = authHeader[1];
  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    const userID = jwtPayload.userID
    if (!userID) throw new Error('No user found in token');
    req.userId = userID
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send("Authrization failed");
    return;
  }
  //Call the next middleware or controller
  next();
};
