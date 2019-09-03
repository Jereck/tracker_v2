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
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'position', 'email']).populate('Task', ['title', 'estimatedHours', 'status']);

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
    if(daysOff) profileField.daysOff = daysOff;

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

// @route   GET /api/profile
// @desc    Gets all profiles
// @access  Public
router.get('/', async (req, res) =>{
    try{
        const profiles = await Profile.find().populate('user', ['name', 'position'])
        res.json(profiles);

    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route   GET /api/profile/user/:user_id
// @desc    Gets profile by User ID
// @access  Public
router.get('/user/:user_id', async (req, res) =>{
    try{
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'position'])
        
        if(!profile) return res.status(400).json({ message: 'Profile not found' });
        res.json(profile);
    } catch(err){
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(400).json({ message: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
})

// @route   DELETE /api/profile
// @desc    Delete profile, user, and posts
// @access  private
router.delete('/', auth, async (req, res) =>{
    try{
        // @todo - remove users posts

        // Remove Profile
        await Profile.findOneAndRemove({ user: req.user.id });
        // Remove User
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ message: 'User deleted' });
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;