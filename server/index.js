const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const Rental = require('./models/rental');
const rentalRoutes = require('./routes/rentals');
const FakeDb = require('./fake-db');
const app = express();

mongoose.connect(config.DB_URI, { useNewUrlParser: true })
  .then(() => {
    const fakeDb = new FakeDb();
    fakeDb.seedDB();
  })

app.use('/api/v1/rentals', rentalRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('App is running');
});
