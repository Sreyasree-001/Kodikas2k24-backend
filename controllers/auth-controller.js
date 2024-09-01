const Team = require("../models/team-model");

//Home page logic 

const home = (req, res) => {
    try {
        res.status(200).send("Welcome to the server side home page");
    } catch(error) {
        res.status(400).send("Could not load page");
    }
};

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

module.exports = {home,registerGet, registerPost, about};