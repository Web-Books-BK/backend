import { Response, Request, NextFunction, Express } from "express";

import { User } from "../database/models/users";
import {matchPassword } from "../utils/hassPassword";

export async function login(req: Request, res: Response) {
    try {
        const payload = req.body;
        if (!payload.email) throw new Error("Email is required");
        if (!payload.password) throw new Error("Password is required");

        const user = await User.findOne({ where: { email: payload.email } })
        if (!user) {
            res.status(401);
            throw new Error("No user with this email");
        }

        const passwordMatch = await matchPassword(user.password, req.body.password)
        if (!passwordMatch) {
            res.status(401);
            throw new Error("Invalid password or email");
        }

        delete user.dataValues.password;
        res.status(200).json({ user })
    } catch (err) {
        const status = res.statusCode ? res.statusCode : 500
        res.status(status).json({ errors: { body: ['Could not login ', (<Error>err).message] } })
    }
}
