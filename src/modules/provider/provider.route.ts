

import { Router } from "express";
import { gearController } from "../gears/gear.service";
import { providerController } from "./provider.controller";
import { auth } from "../../middlewares/auth.middleware";
import { role } from "../../../prisma/generated/prisma/enums";


const router = Router()

router.post('/gear',auth(role.Provider), providerController.addGearItems);
router.post('/gear/:gearItemId', auth(role.Provider,role.Admin), providerController.updateGearItemById);

router.delete(
  '/gear/:gearItemId',
  auth(role.Provider),
  providerController.deleteGearItemById,
);


export const providerROute= router