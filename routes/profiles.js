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

router.post('/profile', async function(req, res, next) {
  const data = req.body;
  const profileId = data.id;
  let profile = null;

  if(profileId){
    profile = await mongoClient.update(data);
  } else {
    profile = await mongoClient.create(data);
  }

  res.send({
    id: profile.insertedId ?? data.id
  });
});

router.delete('/profile/:id', async function(req, res, next) {
  const profileId = new objectId(req.params.id);
  const result = await mongoClient.delete(profileId); 
  res.send({
    id: result.deletedCount > 0 ? profileId : '',
  });
});

module.exports = router;