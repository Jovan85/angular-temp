const User = require('../models/user');
const MongooseHelpers = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.auth = (req, res) => {
  const { email, password } = req.body;

  if(!password || !email) {
    return res.status(422)
       .send({errors:[ { title: 'Data missing', detail: 'Email and password are required'} ] })
  }

  User.findOne({email}, (err, user) => {
    if (err) {
      return res.status(422).send({ errors: MongooseHelpers.normalizeErrors(err.errors) });
    }
    if (!user) {
      return res.status(422)
        .send({errors:[ { title: 'Invalid user', detail: 'User does not exist'} ] });
    }
    if(user.hasSamePassword(password)) {
      const token = jwt.sign({
        userId: user.id, username: user.username
      }, config.SECRET, { expiresIn: 60*60 });

      return res.json(token);
    } else {
      return res.status(422)
        .send({errors:[ { title: 'Wrong data', detail: 'Wrong email or password'} ] });
    }

  });
}

exports.register = (req, res) => {
  const { username, email, password, passwordConfirmation } = req.body;

  if (username.length < 3 || username.length > 32) {
    return res.status(422)
       .send({errors:[ { title: 'Invalid username', detail: 'Username should be min 3 and max 32 characters long'} ] })
  }

  if(!password || !email) {
    return res.status(422)
       .send({errors:[ { title: 'Data missing', detail: 'Email and password are required'} ] })
  }

  if (password.length < 4 || password.length > 32) {
    return res.status(422)
       .send({errors:[ { title: 'Invalid password', detail: 'Password should be min 4 and max 32 characters long'} ] })
  }

  if (password !== passwordConfirmation) {
    return res.status(422)
       .send({errors:[ { title: 'Invalid password', detail: 'Password and confirmation do not match'} ] })
  }

  User.findOne({email}, function(err, existingUser) {
    if (err) {
      return res.status(422).send({ errors: MongooseHelpers.normalizeErrors(err.errors) });
    }
    if (existingUser) {
      return res.status(422)
       .send({errors:[ { title: 'Invalid email', detail: 'User with this email already exist'} ] })
    }

    const user = new User({
      username,
      email,
      password
    });

    user.save((err) => {
      if (err) {
        return res.status(422).send({errors: MongooseHelpers.normalizeErrors(err.errors)});
      }
      return res.json({'registered': true});
    });
  })
}

exports.authMiddleware = function(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    const user = parseToken(token);
    User.findById(user.userId, function(err, user) {
      if (err) {
        return res.status(422).send({ errors: MongooseHelpers.normalizeErrors(err.errors) });
      }
      if(user) {
        res.locals.user = user;
        next();
      } else {
        return res.status(401)
          .send({errors:[ { title: 'Not authorized', detail: 'You need to login to get access'} ] })
      }
    });
  } else {
    return res.status(401)
       .send({errors:[ { title: 'Not authorized', detail: 'You need to login to get access'} ] })
  }
}

function parseToken(token) {
  return jwt.verify(token.split(' ')[1], config.SECRET);
};
