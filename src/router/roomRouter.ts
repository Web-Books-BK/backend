import { Router } from 'express';
import { getListRoom, createRoom, updateRoom, deleteRoom, getRoomDetail } from '../controller/roomController';

export const router = Router();

router.get('/rooms', getListRoom);
router.post('/rooms', createRoom);
router.get('/rooms/:id', getRoomDetail);
router.put('/rooms/:id', updateRoom);
router.delete('/rooms/:id',deleteRoom);
