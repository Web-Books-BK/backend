import { Room } from '../database/models/room';
import { Response, Request } from 'express';
import { v4 } from 'uuid';

async function getListRoom(req: Request, res: Response) {
  try {
    let { limit = '20', offset = '0' } = req.query;
    const rooms = await Room.findAll({
      limit: parseInt(limit as string),
      offset: parseInt(offset as string),
    });
    res.status(200).send({ data: rooms });
  } catch (e) {
    res.status(400).json({ errors: { body: ['Could not get list romm', (e as Error).message] } });
  }
}

async function createRoom(req: Request, res: Response) {
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
      owner: payload.owner,
    });
    if (room) {
      res.status(200).json({ room });
    }
  } catch (e) {
    res.status(400).json({ errors: { body: ['Could not create room', (e as Error).message] } });
  }
}

async function updateRoom(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const payload = req.body.room;
    let oldRoom = await Room.findByPk(id);
    if (!oldRoom) {
      throw Error('Room not exist');
    }
    oldRoom.update(
      {
        name: payload.name ? payload.name : oldRoom.name,
        description: payload.description ? payload.description : oldRoom.desciption,
        available: payload.available ? payload.available : oldRoom.available,
        livingRoom: payload.livingRoom ? payload.livingRoom : oldRoom.available,
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

async function deleteRoom(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const room = await Room.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({ room });
  } catch (e) {
    res.status(400).json({ errors: { body: ['Could not delete room', (e as Error).message] } });
  }
}

export { getListRoom, createRoom, deleteRoom, updateRoom };
