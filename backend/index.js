import dotenv from 'dotenv'
import bodyParser from "body-parser";
import express from 'express'
import mongoose from 'mongoose'
import cors from "cors";
import routes from './routes/userRoutes.js';
import storeRoutes from './routes/storeRoutes.js';

const app = express()
app.use(bodyParser.json());

app.use(cors())
dotenv.config()

const port = process.env.PORT || 4000;
mongoose.connect(process.env.MONGODBURL).then(() => {
    console.log("DB connected successfully")

    app.listen(port , () => {
        console.log(`Server running on port ${port}`)
    })
})

app.use(express.json());

app.use('/api' , routes , storeRoutes)