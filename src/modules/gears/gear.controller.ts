import { prisma } from "../../lib/prisma";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status"
import { gearItemsServices } from "./gear.service";

const getGearItems = catchAsync(async (req, res, next) => {
  const query = req.query;
    const result = await gearItemsServices.getGearItems(query)


    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Gear Items Retreived  Successfully',
      data: result,
    });
})
  

const getGearItemsById=catchAsync(async (req, res, next) => {
    const gearId = req.params?.gearId as string;

    const result = await gearItemsServices.getGearItemsById(gearId)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Gear Item Retreived  Successfully',
      data: result,
    });
})
  const getGearItemsByCategories = catchAsync(async (req, res, next) => {
    const result = await prisma.categories.findMany({
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'All Categories Gear Item Retrieved Successfully',
      data: result,
    });
  })


export const gearController = {
  getGearItems, getGearItemsById,getGearItemsByCategories
}