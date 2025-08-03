const express=require("express");
const server=express();
const cors=require("cors");
require('dotenv').config();
const cookieParser=require("cookie-parser");

const database_connection=require("./config/db");
database_connection.db_connect();

const router=require("./routes/all-routes");

const PORT=process.env.PORT || 9094;


server.use(express.json());
server.use(cookieParser());
server.use(cors({
  origin:"*",       //"http://localhost:3000", // adjust as needed
  credentials: true               // important for cookies
}));

server.use("/api",router);

server.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
})