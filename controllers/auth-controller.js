//Home page logic 

const home = (req, res) => {
    try {
        res.status(200).send("Welcome to the server side home page");
    } catch(error) {
        res.status(400).send("Could not load page");
    }
};

//Registration page logic

const register = (req, res) => {
    try {
        res.status(200).send("Welcome to the registration page");
    } catch (error) {
        res.status(400).send("Error");
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