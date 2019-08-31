const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    position: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    tasks:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }
})

module.exports = User = mongoose.model('User', UserSchema);