import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { gearItemService } from "./provider.service";
import httpstatus from "http-status"
const addGearItems = catchAsync(async (req, res, next) => {
  
  const payload = req.body;
  const providerId = req.user?.authorId as string


  const result = await gearItemService.addGearItem(providerId, payload);
  

  sendResponse(res,{
    success: true,
    statusCode: httpstatus.CREATED,
    message: "Gear Item Added Successfully",
    data:result
  })

})

const updateGearItemById = catchAsync(async (req, res, next) => {
  const payload = req.body;
  const providerId = req.user?.authorId as string;
  const gearItemId= req.params?.gearItemId as string

  const result = await gearItemService.updateGearItemById(
    gearItemId,providerId,
    payload,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpstatus.CREATED,
    message: 'Gear Item Updated Successfully',
    data: result,
  });

})

const deleteGearItemById = catchAsync(async (req, res, next) => {
  const providerId = req.user?.authorId as string;
  const gearItemId = req.params?.gearItemId as string;

  const result = await gearItemService.deleteGearItemById(
    gearItemId,
    providerId,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpstatus.OK,
    message: 'Gear Item Deleted Successfully',
    data: {},
  });
});


export const providerController = {
  addGearItems,
  updateGearItemById,
  deleteGearItemById,
};