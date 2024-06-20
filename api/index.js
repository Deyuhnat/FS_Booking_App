const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const app = express();
const User = require("./models/User");
require("dotenv").config({ path: "./env" });

app.use(express.json());

const bcryptSalt = bcrypt.genSaltSync(10);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173", //What kind of app should be able to communicate with our app API
  })
);

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("test successful");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const userDoc = await User.create({
    //wait for the brypt 10 time
    name,
    email,
    password: bcrypt.hashSync(password, bcryptSalt),
  });

  res.json(userDoc);
});

app.listen(4000);
