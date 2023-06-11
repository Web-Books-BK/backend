import express from 'express';
import { router as UserRouter } from './users';
import { router as RoomRouter } from './roomRouter';

export const routes = express.Router();

routes.use(UserRouter);
routes.use(RoomRouter)
