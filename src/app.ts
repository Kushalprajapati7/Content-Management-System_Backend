import express, { Request, Response } from "express";
import connectDB from "./config/database";
import * as dotenv from 'dotenv';
import userRoutes from './routes/userRoutes'
import mediaRoutes from './routes/mediaRoutes'
import contentRoutes from './routes/contentRoutes'
import path from 'path';
import cors from 'cors';

dotenv.config();


const app = express();
const port = 3000;

app.use(express.json({limit:"1000mb"}));
app.use(express.urlencoded({ extended: true , limit:"1000mb"}));
app.use(cors())

app.use('/api/user', userRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/content', contentRoutes);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

connectDB().then(() => {

    app.listen(port, () => {
        console.log(`Server is On At Port 3000`);

    })
}).catch((error: any) => {
    console.log("Error starting server :", error.message);
});
