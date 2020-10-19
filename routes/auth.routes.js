const { Router } = require('express');
const User = require('../models/User');
const { validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');
const sessionizeUser = require('../utils/helpers');
const router = Router();

// /api/auth/register
router.post(
  '/register',
  [
    check('email').isEmail().withMessage('Wrong email'),
    check('password')
      .isLength({ min: 6 })
      .withMessage('Minimum password length 6 characters'),
    check('username')
      .isLength({ min: 4, max: 12 })
      .withMessage('Username length should be between 4 and 12 characters')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: 'Wrong registration data', errors: errors.array() });
      }

      let { username, email, password } = req.body;

      username = username.toLowerCase();
      email = email.toLowerCase();

      const candidateEmail = await User.findOne({ email });

      if (candidateEmail) {
        return res
          .status(400)
          .json({ message: 'User with such email already exists' });
      }

      const candidateUsername = await User.findOne({ username });

      if (candidateUsername) {
        return res
          .status(400)
          .json({ message: 'User with such username already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({
        username,
        email,
        password: hashedPassword
      });

      const sessionUser = sessionizeUser(user);

      await user.save();

      req.session.user = sessionUser;

      res
        .status(201)
        .json({ message: 'New User was created!', user: sessionUser });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

// /api/auth/login
router.post(
  '/login',
  [check('password').exists().withMessage('Enter password')],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: 'Wrong registration data', errors: errors.array() });
      }

      let { emailOrUsername, password } = req.body;

      emailOrUsername = emailOrUsername.toLowerCase();

      const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      const isEmail = emailReg.test(emailOrUsername);

      let user;

      if (isEmail) {
        user = await User.findOne({ email: emailOrUsername });
      } else {
        user = await User.findOne({ username: emailOrUsername });
      }

      if (!user) {
        return res.status(400).json({ message: 'User was not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Wrong password try again' });
      }

      const sessionUser = sessionizeUser(user);

      req.session.user = sessionUser;

      res.json({ message: 'Successful login', user: sessionUser });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

router.delete('/logout', async (req, res) => {
  try {
    const { user } = req.session;

    if (user) {
      await req.session.destroy();

      res.clearCookie(config.get('SESS_NAME'));
      res.json({ message: 'Successful logout' });
    } else {
      throw new Error('Something went wrong');
    }
  } catch (e) {
    res.status(422).json({ message: e.message });
  }
});

router.get('/authchecker', (req, res) => {
  const { user } = req.session;
  if (user) {
    return res.json({ message: 'Authenticated Successfully', user });
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
});

module.exports = router;
