import { Router } from "express";
import { getReservation, cancel, createReservation } from "../controller/reservationController";
import { checkJwt } from "../middleware/checkJwt";

export const router = Router();

router.get('/reservations', checkJwt ,getReservation);
router.post('/reservations', checkJwt, createReservation);
router.delete('/reservations/:id', checkJwt, cancel);