import express from 'express';
import mongoose from 'mongoose';

import { router } from "./router";
import * as dotenv from 'dotenv';
dotenv.config();
// import ProductService from './ProductService';

const app = express();


app.use(express.json());
app.use('/products', router);
app.use((_, res) => {
    res.sendStatus(404);
})


async function startApp() {
    try {
        app.listen(process.env.PORT, async () => {
            await mongoose.connect('mongodb+srv://vadym:a00190019@cluster0.dycb7b9.mongodb.net/?retryWrites=true&w=majority');
            console.log('APP STARTED');

            // for (let i = 0; i < 99; i++) {
            //     await ProductService._createDummyProducts();
            // }
            // console.log('PRODUCTS CREATED');
        });
    } catch (e) {
        console.log(e);
    }
}


startApp();
