const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const range = require('express-range');

router.use(range({ accept: 'bytes' }));

router.get('/', async (req, res) => {
  try {
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/videolesbixxx.json');
    const data = response.data;
    const randomIndex = Math.floor(data.length * Math.random());
    const videoUrl = data[randomIndex];
    const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
    const videoBuffer = Buffer.from(videoResponse.data, 'base64');
    //const videoBase64 = videoBuffer.toString('base64');
    res.end(videoBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

module.exports = router;
