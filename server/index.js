const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/dev');
const rentalRoutes = require('./routes/rentals');
const userRoutes = require('./routes/users');
const bookingRoutes = require('./routes/bookings');
const FakeDb = require('./fake-db');
const app = express();

mongoose.connect(config.DB_URI, { useNewUrlParser: true })
  .then(() => {
    const fakeDb = new FakeDb();
    // fakeDb.seedDB();
  })

app.use(bodyParser.json());

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('App is running');
});
