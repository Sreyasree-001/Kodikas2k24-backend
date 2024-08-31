const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    team_name : {
        type : String,
        required : true,
        unique : true
    },

    // memberDetail_1
    memberName_1: {
        type : String,
        required : true
    },
    class_1: {
        type : String,
        required : true
    },
    rollNo_1: {
        type : String,
        required : true
    },
    emailId_1: {
        type : String,
        required : true,
        unique: true
    },
    phone_1: {
        type : String,
        required : true
    },

    // memberDetail_2
    memberName_2: {
        type : String,
        required : true
    },
    class_2: {
        type : String,
        required : true
    },
    rollNo_2: {
        type : String,
        required : true
    },
    emailId_2: {
        type : String,
        required : true,
        unique: true
    },
    phone_2: {
        type : String,
        required : true
    },
    isAdmin :{
        type : Boolean,
        default : false
    }
});

module.exports = new mongoose.model('Team',TeamSchema);