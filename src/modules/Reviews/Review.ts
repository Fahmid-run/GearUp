import { Request, Response, Router } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { checkExists } from "../../utils/checkExist";
import { register } from "node:module";
import { prisma } from "../../lib/prisma";
import { removeAllListeners } from "node:cluster";
import { role } from "../../../prisma/generated/prisma/enums";
import { sendResponse } from "../../utils/sendResponse";
import httpstatus from "http-status"
import { auth } from "../../middlewares/auth.middleware";


const route = Router()


route.post("/:gearItemId",auth(role.Customer), catchAsync(async (req: Request, res: Response) => {
  
  const customerId = req.user?.authorId;
  const gearItemId= req.params?.gearItemId as string
  const { review, rating } = req.body;
  checkExists(prisma.customer, customerId, "User does not exists")


  

  const result = await prisma.reviews.create({
    data: {
      review,
      rating,
      customerId:customerId!,
      gearItemId
    }
  });

  
  sendResponse(res, {
    success: true,
    statusCode: httpstatus.CREATED,
    message: 'Review Created Successfully',
    data:result,
  });

}))


export const reviewRoute= route