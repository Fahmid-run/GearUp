import { Request, Response, Router } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { checkExists } from '../../utils/checkExist';
import { prisma } from '../../lib/prisma';

import { role } from '../../../prisma/generated/prisma/enums';
import { sendResponse } from '../../utils/sendResponse';
import httpstatus from 'http-status';
import { auth } from '../../middlewares/auth.middleware';
import AppError from '../../utils/appError';

const route = Router();

route.post(
  '/:gearItemId',
  auth(role.Customer),
  catchAsync(async (req: Request, res: Response) => {
    const customerId = req.user?.authorId as string;
    const gearItemId = req.params?.gearItemId as string;
    const { review, rating } = req.body;
    checkExists(prisma.customer, customerId, 'User does not exists');

    const rental = await prisma.rentalOrder.findUnique({
      where: {
        customerId,
      },
    });

    if (rental?.rentalStatus !== 'RETURNED') {
      throw new AppError('You cannot give a review!!', httpstatus.FORBIDDEN);
    }

    const result = await prisma.reviews.create({
      data: {
        review,
        rating,
        customerId: customerId!,
        gearItemId,
      },
    });

    sendResponse(res, {
      success: true,
      statusCode: httpstatus.CREATED,
      message: 'Review Created Successfully',
      data: result,
    });
  }),
);

export const reviewRoute = route;
