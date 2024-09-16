const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
    unique: true
  },
  firstMemName:{
    type: String,
    required: true,
  },
  firstMemEmail: {
    type: String,
    required: true,
    unique: true
  },
  firstMemClass:{
    type: String,
    required: true,
  },
  firstMemRoll:{
    type: String,
    required: true,
  },
  firstMemPh:{
    type: String,
    required: true,
  },
  secMemName: {
    type: String,
    required: true,
  },
  secMemEmail: {
    type: String,
    required: true,
    unique: true
  },
  secMemClass:{
    type: String,
    required: true,
  },
  secMemRoll:{
    type: String,
    required: true,
  },
  secMemPh:{
    type: String,
    required: true,
  },
  paymentStatus:{
    type: Boolean,
    default: false,
  }
});
const Team = new mongoose.model('Team',TeamSchema);
module.exports = Team;