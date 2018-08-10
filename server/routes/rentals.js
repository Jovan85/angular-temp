const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');
const User = require('../models/user');
const UserCtrl = require('../controllers/user');
const MongooseHelpers = require('../helpers/mongoose');

router.get('/:id', (req, res) => {
  const rentalId = req.params.id;

  Rental.findById(rentalId)
        .populate('user', 'username -_id')
        .populate('bookings', 'startAt endAt -_id')
        .exec((err, foundRental) => {
          if (err) {
            return res.status(422).send({errors:
              [ { title: 'Rental error', detail: 'Could not find rental'} ] })
          }
          return res.json(foundRental);
        });
});

router.get('/secret', UserCtrl.authMiddleware, (req, res) => {
  res.json({"secret": true});
});

router.get('', (req, res) => {
  const city = req.query.city;

  if (city) {
    Rental.find({city: city.toLowerCase()})
          .select('-bookings')
          .exec((err, filteredRentals) => {
            if (err) {
              return res.status(422).send({ errors: MongooseHelpers.normalizeErrors(err.errors) });
            }
            if (filteredRentals.length == 0) {
              return res.status(422).send({errors:
                [ { title: 'No Rental Found', detail: `There are no rentals for city ${city}`} ] });
            }
            return res.json(filteredRentals);
          });
  } else {
      Rental.find({})
      .select('-bookings')
      .exec((err, foundRentals) => {
        if (err) {
          return res.status(422).send({ errors: MongooseHelpers.normalizeErrors(err.errors) });
        }
        if (city && foundRentals.length == 0) {
          return res.status(422).send({errors:
            [ { title: 'No Rental Found', detail: `There are no rentals for city ${city}`} ] });
        }
        return res.json(foundRentals);
      });
  }

});

router.post('', UserCtrl.authMiddleware, (req, res) => {
  const user = res.locals.user;
  const { title, city, street, category, image, shared, bedrooms, description, dailyRate } = req.body;

  const rental = new Rental({title, city, street, category, image, shared, bedrooms, description, dailyRate, user});
  //rental.user = user;

  Rental.create(rental, (err, newRental) => {
    if (err) {
      return res.status(422).send({ errors: MongooseHelpers.normalizeErrors(err.errors) });
    }
    User.update({_id: user.id}, { $push: {rentals: newRental} }, () => {});
    return res.json(newRental);
  });
});

module.exports = router;
