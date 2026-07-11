import { prisma } from '../../lib/prisma';
import { GearItemsWhereInput } from '../../models';
import { Iquery } from './gear.interface';

const getGearItems = async (query: Iquery) => {
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 10;
  const skip = (page - 1) * limit;

  const sortBy = query.sortBy ? query.sortBy : 'createdAt';
  const sortOrder = query.sortOrder ? query.sortOrder : 'desc';

  const andConditions: GearItemsWhereInput[] = [];

  if (query.searchTerm) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: query.searchTerm,
            mode: 'insensitive',
          },
          description: {
            contains: query.searchTerm,
            mode: 'insensitive',
          },
        },
      ],
    });
  }

  if (query.name) {
    andConditions.push({
      name: query.name,
    });
  }
  if (query.description) {
    andConditions.push({
      description: query.description,
    });
  }
  if (query.rentalPricePerDay) {
    andConditions.push({
      rentalPricePerDay: Number(query.rentalPricePerDay),
    });
  }

  if (query.brand) {
    andConditions.push({
      brand: query.brand,
    });
  }

  const result = await prisma.gearItems.findMany({
    where: {
      AND: andConditions,
    },
    take: limit,
    skip: skip,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });
  return result;
};

const getGearItemsById = async (gearId: string) => {
  const result = prisma.gearItems.findUnique({
    where: {
      id: gearId,
    },
  });

  return result;
};

export const gearItemsServices = {
  getGearItems,
  getGearItemsById,
};
