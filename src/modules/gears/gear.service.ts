import { Router } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { prisma } from '../../lib/prisma';

const route = Router();

route.get(
  '/',
  catchAsync(async (req, res, next) => {
    const result = await prisma.gearItems.findMany({});

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Gear Items Retreived  Successfully',
      data: result,
    });
  }),
);

route.get(
  '/:gearId',
  catchAsync(async (req, res, next) => {
    const gearId = req.params?.gearId as string;

    const result = await prisma.gearItems.findUnique({
      where: {
        id: gearId,
      },
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Gear Item Retreived  Successfully',
      data: result,
    });
  }),
);

route.get(
  '/categories',
  catchAsync(async (req, res, next) => {
    const result = await prisma.categories.findMany({
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'All Categories Gear Item Retrieved Successfully',
      data: result,
    });
  }),
);

export const gearRoute = route;
