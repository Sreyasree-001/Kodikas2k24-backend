const Team = require("../models/team-model");
const nodemailer = require("nodemailer");
const path = require('path');

// const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose')

//Home page logic 

const home = (req, res) => {
    try {
        res.status(200).send("Welcome to the server side home page");
    } catch(error) {
        res.status(400).send("Could not load page");
    }
};

// Create a transporter for Nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.email",
  port: 587,
  secure: false, // true for port 465, false for other ports
  service: 'gmail',
  auth: {
    user: "kodikas.cse@gmail.com",
    pass: "ldcw lueu pqbq gozj", 
  },
});
//Registration page logic
const registerGet = async (req, res) =>{
  //return res.send("This is registration page");
  const allData = await Team.find().lean();
  if (allData.length === 0) {
    return res.status(201).json({
      success: true,
      message: "No teams found",
      data: [],
    });
  } else {
    // Return all registered teams with their data
    return res.status(201).json({
      success: true,
      message: "These are the registered teams",
      data: allData,
    });
  }
}
const registerPost = async (req, res) => {

    try {
        const teamData = req.body;
        try {
          const newTeam = await Team.create(teamData);

          console.log(newTeam.firstMemEmail);
          console.log(newTeam.secMemEmail);
          const firstEmail = newTeam.firstMemEmail;
          const secEmail = newTeam.secMemEmail;
          
          // Registration successful mail
          let mailContent = `
          Hello Team,

          Congratulations on successfully registering for the event!

          Here are your team details:
          - Team Name: ${newTeam.teamName}
          - Team member1 details: 
                 Name: ${newTeam.firstMemName}
                 Email: ${firstEmail}
                 Class: ${newTeam.firstMemClass} 
                 Roll: ${newTeam.firstMemRoll}
                 Phone no.: ${newTeam.firstMemPh}
          
          - Team member2 details:
                 Name: ${newTeam.secMemName}
                 Email: ${secEmail}
                 Class: ${newTeam.secMemClass} 
                 Roll: ${newTeam.secMemRoll}
                 Phone no.: ${newTeam.secMemPh}
          
          Please Join the Whatsapp group for Participants- https://chat.whatsapp.com/LLQKx5wW9DlL7INMkEA1pQ
          Best regards,
          The Organizing Committee Kodikas2k24
          `;

          const mailOptions = {
            from: 'kodikas.cse@gmail.com',
            to: [firstEmail, secEmail],
            subject: 'Confirmation email',
            text: mailContent
          };

          transporter.sendMail(mailOptions, (err, info) => {
            if(err){
              console.log(err);
              res.send("Error while sending email")
            }
            else{
              console.log("Email sent:", info.response);
              res.send("Email send successfully")
            }
          })


        } catch (saveError) {
          console.error(`Error saving team: ${saveError.message}`);
          console.error(saveError.stack);
          return res.status(500).json({
            success: false,
            message: "Error saving team",
          });
        }
    } catch (e) {
        console.error(`Error creating team: ${e.message}`);
        console.error(e.stack);
        return res.status(500).json({
          success: false,
          message: "Internal Server Error",
      });
    }
};

//About page logic 

const about = (req, res) => {
    try {
        res.status(200).send("Welcome to the about page of KODIKAS 2K24");
    } catch (error) {
        res.status(400).send("Error");
    }
};

const admin = async (req, res, next) => {
  try{
  const allTeamData = await Team.find().lean();
  const filePath = path.join(process.cwd(), './adminPage', 'index.ejs');
    res.render(filePath, { teams: allTeamData });
  }
  catch(err) {
    res.status(400).send(err);
  }
  
}

const update = async (req, res, next) => {
  const { teamId, paymentStatus } = req.body;
  //console.log(teamId + " this is updating");
  //const allTeamData = Team;
  const objectId = new mongoose.Types.ObjectId(teamId);

  try {
    const result = await Team.updateOne({ _id: objectId }, { $set: { paymentStatus } });
    //here i want to reload the admin page 
    res.json({ message: 'Payment status updated successfully' })
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error updating payment status' });
  }
}

//Paid teams
const paychecked = async (req, res) =>{

  const allTeamData = await Team.find().lean();
  const allPaidData = await Team.find({paymentStatus : "true"});

  if (allPaidData.length === 0) {
    return res.status(201).json({
      success: true,
      message: "No teams found with payment-status true",
      data: [],
    });
  } else {
    // Return all registered teams with their names
    const teamNames = allPaidData.map(team => team.teamName);
    return res.status(201).json({
      success: true,
      message: "These are the paid teams",
      total: allTeamData.length,
      count: teamNames.length,
      data: teamNames,
    });
  }
}

//qualified teams for 2nd round
const final = async (req, res, next) => {
  try{
  const allTeamData = await Team.find().lean();
  const allSelTeam = await Team.find({teamName : [
    "Eccentric Duo", "Iraters", "X-Treme", "Ravenclaw Runtime", "Auro", "Script Sentries", "Cyber Creeperz", "Jani_na", "RunTime",
    "GEKKO", "TechNOS", "Marvels", "Rewired", "Z Rod", "Code Thief", "BitMinds", "OOP", "RAVAGERS", "CREATURE", "Questers", "Cosmic weavers"
  ] });
  const filePath = path.join(process.cwd(), './qualified', 'final.ejs');
    res.render(filePath, { teams: allSelTeam });
  }
  catch(err) {
    res.status(400).send(err);
  }
  
}

//send email to qualifiers
const sendMail = async (req, res, next) => {
  const { teamId } = req.body;
  console.log(teamId + " this is updating");
  //const allTeamData = Team;
  const objectId = new mongoose.Types.ObjectId(teamId);

  try {
    const teamData = await Team.findOne({ _id: objectId });
    //console.log(teamData)

        const firstEmail = teamData.firstMemEmail;
          const secEmail = teamData.secMemEmail;

          let mailContent = `

        Hello Participant,

      The moment you've been working towards is finally here! 🌟

      We are thrilled to announce that your team has qualified for the Final Round of Kodikas 2k24! Your dedication and skills have brought you this far, and now you’re just one step away from ultimate victory. The entire Kodikas 2k24 team sends their heartfelt congratulations on making it to the grand finale. 💻🏆

        This is your time to shine, and we’re excited to witness the brilliance your team brings to the final challenge!
    We wish you all the best as you step into the final battle towards triumph! 💫🔥

      Best regards,
      Team Kodikas 2k24 🖥
          `;

          const mailOptions = {
            from: 'kodikas.cse@gmail.com',
            to: [firstEmail, secEmail],
            subject: "🎉 You've Qualified for the Final Round of Kodikas 2k24! 🚀",
            text: mailContent
          };

          transporter.sendMail(mailOptions, (err, info) => {
            if(err){
              console.log(err);
              res.send("Error while sending email")
            }
            else{
              console.log("Email sent:", info.response);
              res.send("Email send successfully")
            }
          })
  
    res.json({ message: 'Payment status updated successfully' })
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error updating payment status' });
  }
}

module.exports = {home,registerGet, registerPost, about, admin, update, paychecked, final, sendMail};