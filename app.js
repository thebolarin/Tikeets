const express = require('express');
const { json } = require('body-parser');
const cookieSession = require('cookie-session');
const { errorHandler, NotFoundError } = require('@bolarin/common');
const dotenv = require("dotenv");
require('express-async-errors');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const helmet= require('helmet');
const compression = require('compression');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/event');
const ticketRoutes = require('./routes/ticket');

const accessLogStream = fs.createWriteStream(
  path.join(__dirname,'access.log'),
  {flags:'a'}
);

dotenv.config();
const app = express();
app.use (helmet());
app.use(cors());
app.use(compression());
app.use(morgan('combined' , {stream:accessLogStream}));

app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    // secure: process.env.NODE_ENV !== 'test',
    secure: false,
  })
);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.use('', authRoutes);
app.use('', eventRoutes);
app.use('', ticketRoutes);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

module.exports = app;