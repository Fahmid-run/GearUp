import { Router } from "express";
import { adminController } from "./admin.controller";
import { auth } from "../../middlewares/auth.middleware";
import { role } from "../../enums";

const route = Router()


route.get("/users",auth(role.Admin), adminController.getAllUser)

route.get('/rentals', auth(role.Admin), adminController.getAllRentalOrder);


route.patch('/users/:id', auth(role.Admin), adminController.userAccountStatus);


route.get('/gear', auth(role.Admin), adminController.getAllGear);



export const adminRoute = route;