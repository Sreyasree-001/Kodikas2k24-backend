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

const register = async (req, res) => {
    try {

        console.log(req.body);


        // Error occuring here, so commented out
        /*const {teamname, name1, class1, rollno1, email1} = req.body;

        const result = await Team.create({
            "team_name": teamname,
            "memberName_1": name1,
            "class_1": class1,
            "rollNo_1": rollno1,
            "emailId_1": email1
        });*/
        res.status(200).json({'success': req.body});

    } catch (error) {
        console.log(error);
        res.status(400).send(error);
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

module.exports = {home, register, about};