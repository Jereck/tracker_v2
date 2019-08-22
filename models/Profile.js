const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    capacity: {
        type: Number,
        default: 0
    },
    daysOff: [
        {
            startDate: {
                type: Date
            },
            endDate: {
                type: Date
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Profile = mongoose.model('Profile', ProfileSchema);