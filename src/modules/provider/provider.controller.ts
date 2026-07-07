import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { providerService } from './provider.service';
import httpstatus from "http-status"
const addGearItems = catchAsync(async (req, res, next) => {
  
  const payload = req.body;
  const providerId = req.user?.authorId as string


  const result = await providerService.addGearItem(providerId, payload);
  

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

  const result = await providerService.updateGearItemById(
    gearItemId,
    providerId,
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

  const result = await providerService.deleteGearItemById(
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


const upcomingRentalOrder = catchAsync(async (req, res, next) => {

  const providerId = req.user?.authorId as string;


  const result = await providerService.upcomingRentalOrder(providerId);

  sendResponse(res, {
    success: true,
    statusCode: httpstatus.CREATED,
    message: 'Rental Order Retreieved Successfully',
    data: result,
  });
})



const updateRentalORderStatus = catchAsync(async (req, res, next) => {
  const providerId = req.user?.authorId as string;

  const result = await providerService.upcomingRentalOrder(providerId);

  sendResponse(res, {
    success: true,
    statusCode: httpstatus.CREATED,
    message: 'Rental Order Status  Updated Successfully',
    data: result,
  });
});


export const providerController = {
  addGearItems,
  updateGearItemById,
  deleteGearItemById,
  upcomingRentalOrder,
  updateRentalORderStatus,
};