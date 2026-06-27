import {Request, Response, Router} from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import httpStatus from "http-status";
import config from "../../config";
import {userController} from "./user.controller"


const router = Router();

router.post('/register', userController.rgisterUser);


export const userRoutes = router;
