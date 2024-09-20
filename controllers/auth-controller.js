const Team = require("../models/team-model");
const nodemailer = require("nodemailer");
const path = require('path');

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
      message: "This are the registered teams",
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

const admin = (req, res) => {
  const filePath = path.join(process.cwd(), './adminPage', 'index.html');
  res.sendFile(filePath);
}

module.exports = {home,registerGet, registerPost, about, admin};