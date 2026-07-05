import cookieParser from "cookie-parser"
import express, { Application } from "express"
import cors from "cors"
import { errorHandler } from "./middlewares/globalErrorHandler"
import AppError from "./utils/appError"
import httpstatus from "http-status"



const app :Application= express()


//middlewares 
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
  
}))


// 404 Not found

app.use((req, res, next) => {
  next(new AppError ("APi Route Not Found",httpstatus.NOT_FOUND))
})



app.use(errorHandler);


app.get('/test', async (req, res) => {
  if (true) {
    throw new AppError('LLduaaaa', 404);
  }
  res.send('OK');
});





export default app