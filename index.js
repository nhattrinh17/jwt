const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const route = require("./routers");

const app = express()

dotenv.config()

const mongodbUrl = process.env.MONGODB_URL 
mongoose.connect(mongodbUrl ,{
    useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(() => {
      console.log('Connected to database !!');
    })
    .catch((err)=>{
      console.log('Connection failed !!'+ err.message);
    });
app.use(cors())
app.use(cookieParser())
app.use(express.json())

const PORT = process.env.PORT
app.listen(PORT || 3000, () => {
    console.log(`server is running at http://localhost:${PORT}`)
})

// router
route(app)


