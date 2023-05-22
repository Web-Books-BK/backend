import { Express, NextFunction, Request, Response , Router} from "express";
import {checkJwt} from '../middleware/checkJwt';
import {checkRole} from '../middleware/checkRoles';
import {login} from '../controller/authController'
import {createUser} from '../controller/users'

export const router = Router();

router.post("/signin", [checkJwt, checkRole], login)
router.post("/signup",createUser) 
