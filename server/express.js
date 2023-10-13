import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import router from '../src/routes/index.js'
import dotenv from "dotenv"
import { connectToDatabase } from '../config/databaseConnection.js'
const app = express()
dotenv.config();
connectToDatabase();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
app.use("/api", router)
export default app