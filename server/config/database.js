const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then( () => {
        console.log("Database connection successful");
    })
    .catch( (error) => {
        console.log(`"${error}" ERROR has occured while connecting Database.`);
        process.exit(1);
    })
}

