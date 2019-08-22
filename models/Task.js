const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    User: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        require: true
    },
    createdDate: {
        type: Date,
        default: Date.now,
        require: true
    },
    activeDate: {
        type: Date
    },
    blockedDate: {
        type: Date
    },
    finishedDate: {
        type: Date
    },
    estimatedHours: {
        type: String,
        require: true
    },
    totalHours: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    }
})

module.exports = Task = mongoose.model('Task', TaskSchema);