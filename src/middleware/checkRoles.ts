import { Request, Response, NextFunction } from "express";
import { User } from "../database/models/users";

export const checkRole = (roles: Array<Number>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        //Get the user ID from previous midleware
        const id = res.locals.jwtPayload.userId;

        //Get user role from the database
        let user: User;
        try {
            user = <User>await User.findOne({ where: { id: id } });
            if (roles.indexOf(user.role) > -1) next();
            else res.status(401).send();
        } catch (id) {
            res.status(401).send();
        }
    };
};
