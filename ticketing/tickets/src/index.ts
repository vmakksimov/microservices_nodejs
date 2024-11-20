import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@vmmtickets/common';
import { showTicketRouter } from './routes/show';
import { createTicketRouter } from './routes/new';
import { indexTicketRouter } from './routes';
import { updateTicketRouter } from './routes/update';
import {runConsumer} from '../kafka'
const app = express();
app.set('trust proxy', true)
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: false,
        httpOnly: true,
    })
)
app.use(currentUser);
app.use(createTicketRouter);
app.use(showTicketRouter)
app.use(indexTicketRouter)
app.use(updateTicketRouter)
app.all('*', async (req, res) => {
    throw new NotFoundError()
})
app.use(errorHandler);

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
    }
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error)
    }
    
    await runConsumer().catch(console.error);

    app.listen(3000, () => {
        
        console.log('Listening on port 3000!!!!');
    })
}

start();

