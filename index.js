const express = require("express");
const router = require("./routers/auth-router");
const app = express();

//Mounting the router
app.use("/auth",router);

//Server port 
const PORT = 8000;

//Starting the server
app.listen(PORT, () => console.log(`Server is running at PORT:${PORT}`));