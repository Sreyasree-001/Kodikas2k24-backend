require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routers/auth-router");
const connectDb = require("./utils/db");

app.use(express.json());

//Mounting the router
app.use("/api/auth",router);

//Server port 
const PORT = 8000;

connectDb().then(() => {
    app.listen( PORT, () => {
      console.log(`server is running at port: ${PORT}`);
    });
});

//Starting the server
//app.listen(PORT, () => console.log(`Server is running at PORT:${PORT}`));