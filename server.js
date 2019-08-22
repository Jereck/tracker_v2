const express = require('express');
const config = require('config');
const connectDB = require('./config/db');

// Routes
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const tasks = require('./routes/api/tasks');
const profile = require('./routes/api/profile');

const app = express();

connectDB();

app.use(express.json({ extended: false }));


// Use Routes
app.use('/api/users', users);
app.use('/api/tasks', tasks);
app.use('/api/auth', auth);
app.use('/api/profile', profile);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is listening on port: ${port}`));