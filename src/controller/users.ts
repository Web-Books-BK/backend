import { Response, Request, NextFunction, Express } from 'express';

import { User } from '../database/models/users';
import { hashPassword, matchPassword } from '../utils/hassPassword';
import { v4 } from 'uuid';
import { CustomRequest } from '../types/customRequest';
import { Room } from '../database/models/room';
import { Reservation } from '../database/models/reservation';

export async function createUser(req: Request, res: Response) {
  try {
    const payload = req.body;
    if (!payload.email) throw new Error('Email is required');
    if (!payload.userName) throw new Error('UserName is required');
    if (!payload.fullName) throw new Error('FullName is required');
    if (!payload.password) throw new Error('Password is required');
    if (!payload.role) throw new Error('Role is required');

    const existingUser = await User.findOne({ where: { email: payload.email } });
    if (existingUser) {
      throw new Error('User already exist');
    }

    const password = await hashPassword(payload.password);
    const user = await User.create({
      id: v4(),
      userName: payload.userName,
      fullName: payload.fullName,
      email: payload.email,
      password: password,
      phone: payload.phone,
      address: payload.address,
      role: payload.role,
    });

    if (user) {
      if (user.dataValues.hash_password) delete user.dataValues.hash_password;
      res.status(201).json({ user });
    }
  } catch (err) {
    res.status(422).json({ errors: { body: ['Could not create user ', (<Error>err).message] } });
  }
}

export async function userInformation(req: CustomRequest, res: Response) {
  const userId = req.userId;
  try {
    let reservationResult = [];
    const user = await User.findByPk(userId);
    if (user) {
        if (user.dataValues.password) {
            delete user.dataValues.password
        }
    } else {
        throw Error("User not exist");
    }
    const rooms = await Room.findAll({
      where: {
        owner: userId,
      },
    });
    for (const room of rooms) {
      const reservations = await Reservation.findAll({
        where: {
          roomId: room.id,
        },
        include: [Room, User],
      });

      reservationResult.push(reservations);
    }
    const reservated = await Reservation.findAll({
        where: {
            userId: userId,
        },
        include: [Room, User]
    })


    res.status(200).send({
      data: {
        user: user,
        reservations: reservationResult,
        reservated: reservated
      },
    });
  } catch (e) {
    res.status(422).json({ errors: { body: ['Could not create user ', (<Error>e).message] } });
  }
}

export async function listReservation(req: CustomRequest, res: Response) {}
