var express = require('express');
var router = express.Router();
const mongoClient = require('../mongo');


router.get('/profiles', async function(req, res, next){
  let profiles = [];
  try {
    profiles = await mongoClient.getProfiles();
  } catch(err){
    console.log(err);
  }

  res.send(profiles);
});

router.get('/profile/:id', async function(req, res, next){
  let profile = {
    id: '',
    name: '',
    frames: {},
  }
  try {
    profile = await mongoClient.getProfile(req.params.id);
  } catch(err){
    console.log(err);
  }

  res.send(profile);
});

router.post('/profile', async function(req, res, next){
  const data = req.body;
  const profileId = data.id;
  let profile = null;
  let respData = {id: null}

  try {
    if(profileId){
      profile = await mongoClient.update(data);
    } else {
      profile = await mongoClient.create(data);
    }
    respData.id = profile.insertedId ?? data.id;
  } catch(err){
    console.log(err);
  }

  res.send(respData);
});

router.delete('/profile/:id', async function(req, res, next){
  const profileId = req.params.id;
  let respData = {id: ''}

  try {
    const result = await mongoClient.delete(profileId);
    respData.id = result.deletedCount > 0 ? profileId : '';
  } catch(err){
    console.log(err);
  }

  res.send(respData);
});

module.exports = router;