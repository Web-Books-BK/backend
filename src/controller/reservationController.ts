import { Reservation } from '../database/models/reservation';
import { Response, Request } from 'express';
import { v4 } from 'uuid';
import { CustomRequest } from '../types/customRequest';
import { Room } from '../database/models/room';

async function getReservation(req: CustomRequest, res: Response) {
  const userId = req.userId;
  try {
    if (!userId) {
      res.status(200);
    }
    const reservations = await Reservation.findAll({
      where: {
        userId: userId,
      },
    });
    res.status(200).send({ data: reservations });
  } catch (e) {
    res.status(400).json({ errors: { body: ['Could not get reservation', (e as Error).message] } });
  }
}

async function createReservation(req: CustomRequest, res: Response) {
  const userId = req.userId;
  try {
    const payload = req.body.reservation;
    const roomIdRq = payload.room;
    const room = await Room.findByPk(roomIdRq);
    if (!room) {
      throw Error('Room not exist');
    }
    if (!room.available) {
      throw Error('Not available');
    }
    console.log(room);
    console.log(userId);
    await room.update(
      {
        available: false,
      },
      { where: { id: room.id } }
    );
    const reservation = await Reservation.create({
      userId: userId,
      roomId: room.id,
      startDate: payload.startDate,
      endDate: payload.endDate,
      price: room.price,
    });

    if (reservation) {
      res.status(200).json({ reservation });
    }
  } catch (e) {
    res.status(400).json({ errors: { body: ['Could not create reservation', (e as Error).message] } });
  }
}

async function cancel(req: CustomRequest, res: Response) {
  const userId = req.userId;
  const reservationId = req.params.id;
  try {
    const reservation = await Reservation.findByPk(reservationId);
    if (!reservation) {
      throw Error('Reservation not exist');
    }
    if (userId != reservation.userId) {
      throw Error('Not allow');
    }
    if (reservation.startDate > Date.now()) {
      throw Error("Can't cancel");
    }
    if (reservation.endDate - reservation.startDate < 0) {
      throw Error('Invalid date');
    }

    await Room.update(
      {
        available: true,
      },
      {
        where: {
          id: reservation.roomId,
        },
      }
    );
    await reservation.destroy();
    res.status(200).json({ reservation });
  } catch (e) {
    res.status(400).json({ errors: { body: ['Could not cancel reservation', (e as Error).message] } });
  }
}

export { cancel, getReservation, createReservation };
