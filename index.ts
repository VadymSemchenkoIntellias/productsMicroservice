import express from 'express';
import mongoose from 'mongoose';

import { router as productsRouter } from "./productsRouter";
import { router as webHooksRouter } from "./webHooksRouter";
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();


app.use(express.json());
app.use('/products', productsRouter);
app.use('/webhooks', webHooksRouter);
app.use((_, res) => {
    res.sendStatus(404);
})


async function startApp() {
    try {
        app.listen(process.env.PORT, async () => {
            await mongoose.connect('mongodb+srv://vadym:a00190019@cluster0.dycb7b9.mongodb.net/?retryWrites=true&w=majority');
        });
        // await ProductService._migrateProducts();
    } catch (e) {
        console.log(e);
    }
}


startApp();
