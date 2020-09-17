const mongoose = require("mongoose");
const app = require('./app');

const start = async () => {
  console.log('Starting up........');

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  const port = process.env.PORT || 2500;
  
  app.listen(port, () => {
    console.log(`Listening on port  ${port}`);
  });
};

start();