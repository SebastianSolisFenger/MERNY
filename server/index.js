import express from 'express';

// import body-parser which is the MIDDLEWARE
import bodyParser from 'body-parser';

import mongoose from 'mongoose';

import dotenv from 'dotenv';

// FINISH IMPORTS

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));

app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

dotenv.config();

// CONNECT WITH MONGODB
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(process.env.PORT, () => console.log('Listening')));
