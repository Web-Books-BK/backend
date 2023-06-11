import express from 'express';
import { router as UserRouter } from './users';

export const routes = express.Router();

routes.use(UserRouter);