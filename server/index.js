import express from 'express';

// import body-parser which is the MIDDLEWARE
import bodyParser from 'body-parser';

import mongoose from 'mongoose';

import dotenv from 'dotenv';

import cors from 'cors';

// import the routes
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';

// EXPRESS

const app = express();

// MIDDLEWARE
app.use(bodyParser.json({ limit: '30mb', extended: true }));

app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

// CORS

app.use(cors());

// EXPRESS

dotenv.config();

// CONNECT WITH MONGODB =>  it's a promise therefore you use .then() and .catch()
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Listening at ${process.env.PORT}`)
    )
  )
  .catch((err) => console.log(err));

// Usage of routes
app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/post', PostRoute);
