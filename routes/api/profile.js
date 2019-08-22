const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET /api/profile/me
// @desc    Gets current user profile
// @access  Public
router.get('/me', auth, async (req, res)  => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('User', ['name', 'position', 'email']);

        if(!profile){
            return res.status(400).json({ message: 'There is no profile for this user' });
        }

        res.json(profile);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST /api/profile
// @desc    Create of update a user profile
// @access  Private
router.post('/', auth, async (req, res) => {
    const { capacity, daysOff } = req.body;

    // Builds profile object
    const profileField = {};
    profileField.user = req.user.id;
    if(capacity) profileField.capacity = capacity;
    if(daysOff) profileField = daysOff;

    try{
        let profile = await Profile.findOne({ user: req.user.id });
        if(profile){
            // Update
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileField}, { new: true});
            return res.json(profile);
        }

        // Create
        profile = new Profile(profileField);
        await profile.save();
        res.json(profile);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;