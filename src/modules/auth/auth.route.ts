import { Router } from "express";
import { authController } from "./auth.controller";
import { role } from '../../../prisma/generated/prisma/enums';
import { auth } from "../../middlewares/auth.middleware";


const router = Router()

router.post("/register",authController.registerUser)
router.post('/login', authController.loginUser);
router.get('/me',auth(role.Customer,role.Provider, role.Admin) ,authController.getMyProfile);




export const authRoute= router