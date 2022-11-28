const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        immutable: true
    },
    lastName: {
        type: String,
        immutable: true
    },
    emailAddress: {
        type: String,
        unique: true,
        required: [true, "Email address is required"],
        immutable: true
    },
    mobileNumber: {
        type: String,
        unique: true,
        immutable: true
    },
    City: {
        type: String,
        enum: ['Dhaka', 'Chattogram', 'Khulna', 'Sylhet', 'Rajshahi', 'Rangpur', 'Mymensingh', 'Barishal','Cumilla', 'Narayanganj', 'Gazipur'],
        default: 'Chattogram',
        immutable: true
    },
    userName: {
        type: String,
        unique: true,
        required: [true, "Username is required"],
        immutable: true
    },
    passWord: {
        type: String,
        required: [true, "Password is required"]
    }
}, {versionKey: false});

const profileModel = mongoose.model('userProfiles', userSchema);
module.exports = profileModel