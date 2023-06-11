import { Router } from 'express';
import { getListRoom, createRoom, updateRoom, deleteRoom } from '../controller/roomController';

const router = Router();

router.get('/rooms', getListRoom);
router.post('/rooms', createRoom);
router.put('/rooms/:id', updateRoom);
router.delete('/room/:id', deleteRoom);

export {router}
