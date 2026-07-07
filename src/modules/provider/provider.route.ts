

import { Router } from "express";
import { providerController } from "./provider.controller";
import { auth } from "../../middlewares/auth.middleware";
import { role } from "../../../prisma/generated/prisma/enums";


const router = Router()

router.post('/gear',auth(role.Provider), providerController.addGearItems);
router.put('/gear/:gearItemId', auth(role.Provider,role.Admin), providerController.updateGearItemById);

router.delete(
  '/gear/:gearItemId',
  auth(role.Provider),
  providerController.deleteGearItemById,
);


router.get("/orders",auth(role.Provider), providerController.upcomingRentalOrder)

export const providerROute= router