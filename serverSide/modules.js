const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
       type: String,
       required: [true, "Name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Name is required"]
    },
    age: {
        type: String,
        required: [true, "Age is required"]
    },
    gender: {
        type: String,
        required: [true, "Gender is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
});

const User = mongoose.model('user', UserSchema);

module.exports =  User;
