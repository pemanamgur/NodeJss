import express from 'express';
const app = express();

import mongoose from 'mongoose';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';

dotenv.config();

import ProductRouter from './routes/productRoutes.js';
import categoryRouters from './routes/categoryRoutes.js';
import userRouters from './routes/userRoutes.js';
import bookRouters from './routes/bookRoutes.js';
app.use(cors());
app.use(express.static('./public'));
app.use(fileUpload());
app.use(express.json());

app.use('/books', bookRouters);
app.use('/products', ProductRouter);
app.use('/category', categoryRouters);
app.use('/user', userRouters);

app.get(
  '/new',

  (req, res) => {
    console.log(req.body.name);
    res.status(200).send('success');
  }
);

const Port = process.env.PORT || 5000;
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(Port, () => console.log('listening on port 5000'));
  } catch (e) {
    console.error(e.message);
  }
};

start();
