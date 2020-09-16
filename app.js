const express = require('express');
const { json } = require('body-parser');
const cookieSession = require('cookie-session');
const { errorHandler, NotFoundError } = require('@bolarin/common');
const dotenv = require("dotenv");
require('express-async-errors');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/event');
const ticketRoutes = require('./routes/ticket');

dotenv.config();
const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    // secure: process.env.NODE_ENV !== 'test',
    secure: false,
  })
);
app.use('', authRoutes);
app.use('', eventRoutes);
app.use('', ticketRoutes);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

module.exports = app;