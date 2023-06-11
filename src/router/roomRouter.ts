import { Router } from 'express';
import { getListRoom, createRoom, updateRoom, deleteRoom, getRoomDetail } from '../controller/roomController';
import { checkJwt } from '../middleware/checkJwt';

export const router = Router();

router.get('/rooms', getListRoom);
router.post('/rooms', checkJwt, createRoom);
router.get('/rooms/:id', getRoomDetail);
router.put('/rooms/:id', checkJwt, updateRoom);
router.delete('/rooms/:id', checkJwt, deleteRoom);
