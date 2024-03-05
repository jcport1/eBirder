const express = require("express");

const router = express.Router();

const BirdSightingModel = require("../models/sightingModel");

//Ebird base url
const ebird_url_recent_obs = "https://api.ebird.org/v2/data/obs/geo/recent";
const ebird_key = process.env.EBIRD_KEY;

//Ebird controllers

//recent nearby geo observations
//change to a post or query params
router.get("/nearby/:lat/:lng", (req, res) => {
  //sample lat and long
  const lat = req.params.lat;
  const lng = req.params.lng;
  const my_url = `https://api.ebird.org/v2/data/obs/geo/recent?lat=${lat}&lng=${lng}`;

  fetch(my_url, {
    method: "GET",
    headers: {
      "x-ebirdapitoken": ebird_key,
    },
  })
    .then((response) => response.json())
    .then((result) => res.send(result))
    .catch((error) => {
      console.log(error);
    });
});

//nearby hotspot
router.get("/hotspots/:lat/:lng", (req, res) => {
  const lat = req.params.lat;
  const lng = req.params.lng;
  const hotspot_url = `https://api.ebird.org/v2/ref/hotspot/geo?lat=${lat}&lng=${lng}&back=5&dist=5&fmt=json`;

  fetch(hotspot_url, {
    method: "GET",
    headers: {
      "x-ebirdapitoken": ebird_key,
    },
  })
    .then((response) => response.json())
    .then((result) => res.send(result))
    .catch((error) => {
      console.log(error);
    });
});

//change to a post or query params
router.get("/info/:speciesCode", (req, res) => {
  const specCode = req.params.speciesCode;
  const my_url = `https://api.ebird.org/v2/ref/taxonomy/ebird?species=${specCode}&fmt=json`;

  fetch(my_url, {
    method: "GET",
    headers: {
      "x-ebirdapitoken": ebird_key,
    },
  })
    .then((response) => response.json())
    .then((result) => res.send(result))
    .catch((error) => {
      console.log(error);
    });
});

//get user sightings
//find user id
//query collection and return all docs that belong to user id
router.get("/find/:email", async (req, res) => {
  try {
    const data = await BirdSightingModel.find({ author: req.params.email });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/new", async (req, res) => {
  const newDocument = new BirdSightingModel({
    comName: req.body.comName,
    lat: req.body.lat,
    lng: req.body.lng,
    comment: req.body.comment,
    author: req.body.author,
  });
  try {
    const saveEntry = await newDocument.save();
    res.status(200).json(saveEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//edit router
router.patch("/update/:id", async (req, res) => {
  try {
    const bird_sighting_id = req.params.id;
    const updateData = req.body;
    const options = { new: true };

    const updatedResult = await BirdSightingModel.findByIdAndUpdate(
      bird_sighting_id,
      updateData,
      options
    );
    res.json(updatedResult);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//delete router
router.delete("/delete/:id", async (req, res) => {
  try {
    //use params to find entry in database
    const bird_sighting_id = req.params.id;
    const data = await BirdSightingModel.findByIdAndDelete(bird_sighting_id);
    res.json({ message: `bird sighting for ${data.comName} deleted` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
