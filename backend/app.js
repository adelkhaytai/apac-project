import express from "express"
const app = express()
import dotenv from "dotenv"
import colors from "colors"
import { connectDB } from "./config/connect.js"
import authRouter from "./routes/auth.js"
import eventsRouter from "./routes/event.js"
import cookieParser  from "cookie-parser"
import cors from "cors"

dotenv.config({path : "./config/.env"})
const corsOptions = {
  origin: 'https://apac-forntend.vercel.app',
  optionsSuccessStatus: 200
};
  
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.use("/api/",authRouter)
app.use("/api/",eventsRouter)

connectDB()


app.listen(process.env.PORT , ()=>{
    console.log(`server started on port : ${process.env.PORT} in ${process.env.NODE_ENV} mode`.bgMagenta)
})

