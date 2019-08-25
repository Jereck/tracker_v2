const express   = require('express');
const auth      = require('../../middleware/auth');
const bcrypt    = require('bcryptjs');
const config    = require('config');
const jwt       = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// Import Models
const Task      = require('../../models/Task');
const User      = require('../../models/User');
const Profile   = require('../../models/Profile');

// @route   POST /api/tasks
// @desc    Creates new Task
// @access  Public
router.post('/', [auth, [check('title', 'Title is required').not().isEmpty()]], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const user = await User.findById(req.user.id).select('-password');

        const newTask = new Task({
            title: req.body.title,
            estimatedHours: req.body.estimatedHours,
            status: req.body.status,
            user: req.user.id,
            name: user.name
        });

        const task = await newTask.save();

        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @route   GET /api/tasks
// @desc    Gets all the Tasks
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdDate: -1 })
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET /api/tasks/:id
// @desc    Gets Task by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task){
            return res.status(404).json({ message: 'Task not found!' });
        }
        res.json(task);
    } catch (err) {
        console.error(err.message);
        if (err.ind === 'OjbectId'){
            return res.status(404).json({ message: 'Task not found!' });
        }
        res.status(500).send('Server error');
    }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete specific post
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task){
            return res.status(404).json({ message: 'Task not found!' });
        }

        // Check user
        if(task.user.toString() !== req.user.id){
            return res.status(401).json({ message: 'User not authorized' });
        }

        await task.remove();
        res.json({ message: 'Task removed' });
    } catch (err) {
        console.error(err.message);
        if (err.ind === 'OjbectId'){
            return res.status(404).json({ message: 'Task not found!' });
        }
        res.status(500).send('Server error');
    }
});

module.exports = router;