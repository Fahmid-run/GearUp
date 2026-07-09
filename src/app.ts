import cookieParser from "cookie-parser"
import express, { Application } from "express"
import cors from "cors"
import { errorHandler } from "./middlewares/globalErrorHandler"
import AppError from "./utils/appError"
import httpstatus from "http-status"
import { authRoute } from "./modules/auth/auth.route"
import { providerController } from "./modules/provider/provider.controller"
import { providerROute } from "./modules/provider/provider.route"
import { reviewRoute } from "./modules/Reviews/Review"
import { role } from "../prisma/generated/prisma/enums"
import { auth } from "./middlewares/auth.middleware"
import { rentalRoute } from "./modules/rental/rental"
import { gearRoute } from "./modules/gears/gear.service"
import { paymentRoute } from "./modules/payments/payments.route"
import { paymentController } from "./modules/payments/payments.controller"



const app :Application= express()


//middlewares 
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(cors({
  
}))


app.use(express.json());


app.get('/', (req, res) => {
  res.end('hello root');
});

//auth route
app.use('/api/auth', authRoute);
//provider route
app.use('/api/provider', providerROute);
//review route
app.use('/api/reviews', reviewRoute);
//rental route
app.use('/api/rentals', rentalRoute);

//gear item route
app.use('/api/gear', gearRoute);
//payment route
app.use('/api/payments', paymentRoute);






// 404 Not found

app.use((req, res, next) => {
  next(new AppError ("APi Route Not Found",httpstatus.NOT_FOUND))
})



app.use(errorHandler);








export default app