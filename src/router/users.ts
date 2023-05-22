import { Express, NextFunction, Request, Response , Router} from "express";
import {checkJwt} from '../middleware/checkJwt';
import {checkRole} from '../middleware/checkRoles';
import {login} from '../controller/authController'
import {createUser} from '../controller/users'

const router = Router();

router.get("/signin", [checkJwt, checkRole], login)
router.get("/signup",createUser) 