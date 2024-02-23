var express = require('express');
var router = express.Router();
const mongoClient = require('../mongo');
const objectId = require("mongodb").ObjectId;


router.get('/profiles', async function(req, res, next) {
  const profiles = await mongoClient.getProfiles(); 
  res.send(profiles);
});

router.get('/profile/:id', async function(req, res, next) {
  const profileId = new objectId(req.params.id);
  const profile = await mongoClient.getProfile(profileId); 
  res.send(profile);
});

module.exports = router;