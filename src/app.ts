import cookieParser from "cookie-parser"
import express, { Application } from "express"
import cors from "cors"
import { errorHandler } from "./middlewares/globalErrorHandler"
import AppError from "./utils/appError"
import httpstatus from "http-status"
import { authRoute } from "./modules/auth/auth.route"



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


app.use('/api/auth', authRoute);





// 404 Not found

app.use((req, res, next) => {
  next(new AppError ("APi Route Not Found",httpstatus.NOT_FOUND))
})



app.use(errorHandler);








export default app