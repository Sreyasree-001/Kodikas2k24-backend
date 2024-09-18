require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routers/auth-router");
const connectDb = require("./utils/db");

const cors = require("cors");

app.use(express.json());
app.use(cors());

//Mounting the router
app.use("/api/auth",router);

//Server port 
const PORT = process.env.PORT || 5000;

connectDb().then(() => {
    app.listen( PORT, () => {
      console.log(`server is running at port: ${PORT}`);
    });
});


//app.listen(PORT, () => console.log(`Server is running at PORT:${PORT}`));