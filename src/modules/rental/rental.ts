import { Request, Response, Router } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { checkExists } from '../../utils/checkExist';
import { register } from 'node:module';
import { prisma } from '../../lib/prisma';
import { removeAllListeners } from 'node:cluster';
import { role } from '../../../prisma/generated/prisma/enums';
import { sendResponse } from '../../utils/sendResponse';
import httpstatus from 'http-status';
import { auth } from '../../middlewares/auth.middleware';

const route = Router();

route.post(
  '/:gearItemId',
  auth(role.Customer),
  catchAsync(async (req: Request, res: Response) => {
    const customerId = req.user?.authorId;
    const gearItemId = req.params?.gearItemId as string;
    const { startDate, endDate, totalAmount } = req.body;
    checkExists(prisma.customer, customerId, 'User does not exists');

    const result = await prisma.rentalOrder.create({
      data: {
        customerId:customerId!,
        gearItemId,
        startDate,
        endDate,
        totalAmount,
      },
    });

    sendResponse(res, {
      success: true,
      statusCode: httpstatus.CREATED,
      message: 'Rental Order Places Successfully',
      data: result,
    });
  }),
);

route.get(
  '/',
  auth(role.Customer, role.Provider),
  catchAsync(async (req: Request, res: Response) => {
    const customerId = req.user?.authorId;
    checkExists(prisma.customer, customerId, 'User does not exists');

    const resultForCustomer = await prisma.rentalOrder.findMany({
      where: {
        customerId,
      },
    });

    sendResponse(res, {
      success: true,
      statusCode: httpstatus.CREATED,
      message: 'Rental Order Retreieved Successfully',
      data: resultForCustomer,
    });
    
  }),
);


route.get(
  '/:rentalId',
  auth(role.Customer, role.Provider),
  catchAsync(async (req: Request, res: Response) => {
    const rentalId= req.params?.rentalId as string

    const result = await prisma.rentalOrder.findUnique({
      where: {
        id: rentalId,
      },
    });

     sendResponse(res, {
       success: true,
       statusCode: httpstatus.CREATED,
       message: 'Rental Order Retreived Successfully',
       data: result,
     });
  }),
);
export const rentalRoute = route;
