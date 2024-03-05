require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = 3001;
const app = express();
app.use(cors());
app.use(express.json());

const mongoString = process.env.DB_URL;
mongoose.connect(mongoString);
const db = mongoose.connection;

const Model = require("./models/model");

const birdRouter = require("./routes/sightings");

db.on("error", (error) => {
  console.log(error);
});

db.once("connected", () => {
  console.log("Mongodb connected");
});

//example API endpoint
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

//routes
app.post("/api/user/post", async (req, res) => {
  const newDocument = new Model({
    email: req.body.user.email,
    password: req.body.user.password,
    username: req.body.user.username,
    firstName: req.body.user.firstName,
    lastName: req.body.user.lastName,
  });

  try {
    const saveEntry = await newDocument.save();
    res.status(200).json(saveEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post('/api/user/update', async (req, res) => {
  const id = req.body.user._id; 
  const updatedDocument = {
    email: req.body.user.email,
    username: req.body.user.username,
    firstName: req.body.user.firstName, 
    lastName: req.body.user.lastName
  }; 

  try {
    const saveEntry = await Model.findOneAndUpdate({_id: id}, updatedDocument);
    res.status(200).json(saveEntry); 
    console.log(`Save entry: ${saveEntry}`);
  } catch(error){
    console.log(error); 
    res.status(500).json({message: error.message}); 
  }
}); 

app.get("/api/user/all", async (req, res) => {
  try { 
    const data = await Model.find(); 
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/user/getOne/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/user/getOne/:email/:password", async (req, res) => {
  try {
    const data = await Model.find({
      email: req.params.email,
      password: req.params.password,
    });
    console.log(data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/user/exists/:email", async (req, res) => {
  try {
    const data = await Model.find({ email: req.params.email });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.use("/birds", birdRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
