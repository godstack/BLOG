const { Router } = require('express');
const User = require('../models/User');
const { validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = Router();

// /api/auth/register
router.post(
  '/register',
  [
    check('email').isEmail().withMessage('Wrong email'),
    check('password')
      .isLength({ min: 6 })
      .withMessage('Minimum password length 6 characters')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: 'Wrong registration data', errors: errors.array() });
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: 'Such user already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({ email, password: hashedPassword });

      await user.save();

      res.status(201).json({ message: 'User was created!' });
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong, try again' });
    }
  }
);

// /api/auth/login
router.post(
  '/login',
  [
    check('email')
      .normalizeEmail()
      .isEmail()
      .withMessage('Enter correct email'),
    check('password').exists().withMessage('Enter password')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: 'Wrong registration data', errors: errors.array() });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'User was not found' });
      }

      const isMatch = bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Wrong password try again' });
      }

      const token = jwt.sign(
        {
          userId: user.id
        },
        config.get('jwtSecret'),
        {
          expiresIn: '1h'
        }
      );

      res.json({ token, user: user.id });
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong, try again' });
    }
  }
);

module.exports = router;
