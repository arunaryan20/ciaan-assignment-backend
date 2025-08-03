const mongoose = require('mongoose');

exports.db_connect=()=>{

     // we can use "mongodb://localhost:27017/" this url instead of .env url but i am getting error in connection error so i write local host IP address directly on .env DB_URL

    const DB_URL=process.env.DB_URL
     mongoose.connect(DB_URL)
  .then(() => console.log(`Connected to database`)).catch((err)=>{
    console.log(`Error while connection to database ${err}`)
  })
}