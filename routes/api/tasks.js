const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Import Task Model
const Task = require('../../models/Task');

// @route   GET /api/tasks
// @desc    Gets all the Tasks
// @access  Public
router.get('/', (req, res) => {
    Task.find({})
        .then(tasks => res.json({tasks}))
});

// @route   POST /api/tasks
// @desc    Creates new Task
// @access  Public
router.post('/', (req, res) => {
    res.send('This is the post route!');

    // Create new task
    newTask = new Task({
        // Grab task data
        title: req.body.title,
        estimatedHours: req.body.estimatedHours,
        status: req.body.status
    })
    newTask.save().then(task => res.json(task));
    // Connect task to user
})

module.exports = router;