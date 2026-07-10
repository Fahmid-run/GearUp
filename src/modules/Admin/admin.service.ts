import { User_Status } from '../../enums';
import { prisma } from '../../lib/prisma';

const getAllUserFromDb = async () => {
  const result = await prisma.user.findMany({});

  return result;
};
const getAllGearFromDb = async () => {
  const result = await prisma.gearItems.findMany({
    include: {
      provider: true,
    },
  });
  return result;
};

const getAllRentalOrderFromDb = async () => {
  const result = await prisma.rentalOrder.findMany({});
  return result
};

const userAccountStatus = async (id:string, status:User_Status) => {

  const result = await prisma.user.update({
    where: {
      id
    },
    data: {
      status
    }, omit: {
      password:true
    }
  })



  return result;
  

}


export const adminServices = {
  getAllGearFromDb,
  getAllRentalOrderFromDb,
  getAllUserFromDb,
  userAccountStatus,
};
