import { Room } from '../database/models/room';
import { Response, Request } from 'express';
import { v4 } from 'uuid';
import { CustomRequest } from '../types/customRequest';

async function getListRoom(req: Request, res: Response) {
  try {
    let { limit = '20', offset = '0', owner } = req.query;
    if (!owner) {
      const rooms = await Room.findAll({
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
      });
      res.status(200).send({ data: rooms });
    } else {
      const rooms = await Room.findAll({
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
        where: {
          owner: owner,
        }
      });
      res.status(200).send({ data: rooms });

    }
  } catch (e) {
    res.status(400).json({ errors: { body: ['Could not get list room', (e as Error).message] } });
  }
}

async function getRoomDetail(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const room = await Room.findByPk(id);
    if (!room) {
      throw Error('Room not exist');
    }
    return res.status(200).send({ data: room });
  } catch (e) {
    res.status(400).json({ errors: { body: ['Could not get room data', (e as Error).message] } });
  }
}

async function createRoom(req: CustomRequest, res: Response) {
  const userId = req.userId;
  try {
    const payload = req.body.room;
    const room = await Room.create({
      id: v4(),
      name: payload.name,
      description: payload.description,
      available: payload.available,
      livingRoom: payload.livingRoom,
      bedroom: payload.bedroom,
      toilet: payload.toilet,
      wifi: payload.wifi,
      swimmingPool: payload.swimmingPool,
      images: payload.images,
      price: payload.price,
      address: payload.address,
      phone: payload.phone,
      owner: userId,
    });
    if (room) {
      res.status(200).json({ room });
    }
  } catch (e) {
    res.status(400).json({ errors: { body: ['Could not create room', (e as Error).message] } });
  }
}

async function updateRoom(req: CustomRequest, res: Response) {
  const userId = req.userId;
  try {
    const id = req.params.id;
    const payload = req.body.room;
    let oldRoom = await Room.findByPk(id);
    if (!oldRoom) throw Error('Room not exist');
    if (userId != oldRoom.owner) throw Error('Authorisation');
    oldRoom.update(
      {
        name: payload.name ? payload.name : oldRoom.name,
        description: payload.description ? payload.description : oldRoom.description,
        available: payload.available ? payload.available : oldRoom.available,
        livingRoom: payload.livingRoom ? payload.livingRoom : oldRoom.livingRoom,
        bedroom: payload.bedroom ? payload.bedroom : oldRoom.bedroom,
        toilet: payload.toilet ? payload.toilet : oldRoom.toilet,
        wifi: payload.wifi ? payload.wifi : oldRoom.wifi,
        swimmingPool: payload.swimmingPool ? payload.swimmingPool : oldRoom.swimmingPool,
        images: payload.images ? payload.images : oldRoom.images,
        price: payload.price ? payload.price : oldRoom.price,
        address: payload.address ? payload.address : oldRoom.address,
        phone: payload.phone ? payload.phone : oldRoom.phone,
        owner: oldRoom.owner,
      },
      { where: { id: id } }
    );
    res.status(200).json({ oldRoom });
  } catch (e) {
    res.status(400).json({ errors: { body: ['Could not update room', (e as Error).message] } });
  }
}

async function deleteRoom(req: CustomRequest, res: Response) {
  const userId = req.userId;
  const id = req.params.id;
  try {
    const room = await Room.findByPk(id);
    if (!room) throw Error('Room not exist');
    if (userId != room.owner) throw Error('Authorisation');
    await room.destroy();
    res.status(200).json({ room });
  } catch (e) {
    res.status(400).json({ errors: { body: ['Could not delete room', (e as Error).message] } });
  }
}

export { getListRoom, createRoom, deleteRoom, updateRoom, getRoomDetail };
