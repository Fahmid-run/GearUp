import { Router } from 'express';

import { gearController } from './gear.controller';

const route = Router();

route.get('/', gearController.getGearItems);

route.get('/:gearId', gearController.getGearItemsById);

route.get('/categories', gearController.getGearItemsByCategories);

export const gearRoute = route;
