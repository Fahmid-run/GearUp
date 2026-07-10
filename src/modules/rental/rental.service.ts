
import { Rental_Status } from '../../../prisma/generated/prisma/enums';
import { prisma } from "../../lib/prisma";
import AppError from "../../utils/appError";
import { IRentalPayload } from "./rental.interface";
import httpstatus from 'http-status'

const createRentalOrder = async (userId: string, payload: IRentalPayload) => {
  const customer = await prisma.customer.findUniqueOrThrow({
    where: {
      userId,
    },
  });

  const { startDate, endDate, items } = payload;

  const start = new Date(startDate);

  const end = new Date(endDate);

  if (start >= end) {
    throw new AppError('Invalid rental date', 400);
  }

  const days = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
  );

  const gearIds = items.map((item:any) => item.gearItemId);

  const gears = await prisma.gearItems.findMany({
    where: {
      id: {
        in: gearIds,
      },
    },
  });

  const providerIds = new Set(gears.map(gear => gear.providerId));

  if (providerIds.size > 1) {
    throw new AppError(
      'All gear items in a rental order must belong to the same provider.',
      httpstatus.BAD_REQUEST,
    );
  }



  if (gears.length !== items.length) {
    throw new AppError('Some gear not found', httpstatus.NOT_FOUND);
  }

  let totalAmount = 0;

  const orderItems = items.map((item:any) => {
    const gear = gears.find(g => g.id === item.gearItemId);

    if (!gear) {
      throw new AppError('Gear not found', 404);
    }

    const price = gear.rentalPricePerDay * item.quantity * days;

    totalAmount += price;

    return {
      gearItemId: item.gearItemId,

      quantity: item.quantity,

      pricePerDay: gear.rentalPricePerDay,
    };
  });

  const result = await prisma.$transaction(async tx => {
    const rentalOrder = await tx.rentalOrder.create({
      data: {
        customerId: customer.id,

        startDate: start,

        endDate: end,

        totalAmount,
        items: {
          create: orderItems,
        },

        rentalStatus: Rental_Status.PLACED,
      },

      include: {
        items: true,
      },
    });

    return rentalOrder;
  });

  return result;
};


export const rentalService = {
  createRentalOrder,
};