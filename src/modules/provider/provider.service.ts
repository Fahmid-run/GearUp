import {
  Category,
  GearAvailability,
} from '../../../prisma/generated/prisma/enums';
import { prisma } from '../../lib/prisma';
import AppError from '../../utils/appError';
import { checkExists } from '../../utils/checkExist';
import httpstatus from 'http-status';
interface IGearItem {
  name: string;
  description: string;
  stock: number;
  rentalPricePerDay: number;
  condition: string;
  brand: string;
  image: string;
  category: Category;
  availability: GearAvailability;
}

const addGearItem = async (providerId: string, paylaod: IGearItem) => {
  const {
    name,
    description,
    stock,
    rentalPricePerDay,
    condition = 'Good',
    brand,
    image = 'https://google.com',
    category = 'fitness',
    availability = 'AVAILABLE',
  } = paylaod;

  await checkExists(prisma.provider, providerId, 'Provider does not exists');

  const result = await prisma.gearItems.create({
    data: {
      name,
      description,
      providerId,
      stock,
      rentalPricePerDay,
      condition,
      brand,
      image,
      category,
      availability,
    },
  });

  return result;
};

const updateGearItemById = async (
  gearItemId: string,
  providerId: string,
  paylaod: IGearItem,
) => {
  const gearItem = await checkExists(
    prisma.gearItems,
    gearItemId,
    'Gear item does not exists',
  );

  const isOwner = providerId === gearItem.providerId;

  if (!isOwner) {
    throw new AppError('Forbidden Access', httpstatus.FORBIDDEN);
  }

  const {
    name,
    description,
    stock,
    rentalPricePerDay,
    condition = 'Good',
    brand,
    image = 'https://google.com',
    category = 'fitness',
    availability = 'AVAILABLE',
  } = paylaod;

  const result = await prisma.gearItems.update({
    where: {
      id: gearItemId,
    },
    data: {
      name,
      description,
      stock,
      rentalPricePerDay,
      condition,
      brand,
      image,
      category,
      availability,
    },
  });

  return result;
};


const deleteGearItemById = async (
  gearItemId: string,
  providerId: string,
) => {
  const gearItem = await checkExists(
    prisma.gearItems,
    gearItemId,
    'Gear item does not exists',
  );

  const isOwner = providerId === gearItem.providerId;

  if (!isOwner) {
    throw new AppError('Forbidden Access', httpstatus.FORBIDDEN);
  }

  
  const result = await prisma.gearItems.delete({
    where: {
      id: gearItemId,
    }
  });

  return result;
};


export const gearItemService = {
  addGearItem,
  updateGearItemById,
  deleteGearItemById,
};
