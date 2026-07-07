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



const app :Application= express()


//middlewares 
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
  
}))


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






// 404 Not found

app.use((req, res, next) => {
  next(new AppError ("APi Route Not Found",httpstatus.NOT_FOUND))
})



app.use(errorHandler);








export default app