const mongoose = require ("mongoose");
const URI ="mongodb+srv://kodikas2024:kodikas@2024@cluster0.3bgcz.mongodb.net/kodikas_admin?retryWrites=true&w=majority&appName=Cluster0";
const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log('connection successful to database');
        
    } catch (error) {
        
        console.error("database connection failed");
        process.exit(0);
        
    }
};
module.exports = connectDb; 