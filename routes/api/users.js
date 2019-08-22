const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// Express Validator
const { check, validationResult } = require('express-validator')

const router = express.Router();

// Gets User Model
const User = require('../../models/User');

// @route   POST api/users
// @desc    Creates a new User
// @access  Public
router.post('/', [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
        check('position', 'Please select your current position.').not().isEmpty()
    ], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, position } = req.body;

    try {
        let user = await User.findOne({ email });

        if(user){
            res.status(400).json({ errors: [{ message: 'User already exists' }] })
        }

        user = new User({
            name, email, password, position
        })
    
        const salt = await bcrypt.genSalt(10);
    
        user.password = await bcrypt.hash(password, salt);
    
        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
            if(err) throw err;
            res.json({ token });
        });

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @route   GET api/users
// @desc    Gets all Users
// @access  Public
router.get('/', (req, res) => {
    User.find({})
        .then(users => res.json(users));
})

module.exports = router;