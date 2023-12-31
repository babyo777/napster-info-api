const { default: axios } = require("axios");
const Axios = require("axios");
const express = require("express");
const router = express.Router();
const GetPlaylist = require("ytpl");


router.get("/", async (req, res) => {
  if (req.query.url) {
    try {
      const music = await GetPlaylist(req.query.url);
      const musicList = music.items.map((music, i) => ({
            id: i,
            title: music.title,
            artist: music.author.name,
            audio: music.shortUrl,
            cover: "Cover/" + (Math.floor(Math.random() * 73) + 1) + ".webp",
      }))
      res.json(musicList);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.json({ "message": "no url Provided"});
  }
});

router.post("/message", async (req, res) => {

  try {
    const url = `https://api.telegram.org/bot6296316080:AAFc7DoB9b2kOivNMRRK3kg-_WUW2cIatC4/sendMessage?chat_id=5356614395&text=${encodeURIComponent(
    req.body.message
    )}`;
    await Axios.post(url);
    res.status(200).send("Message sent successfully");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error Sending Message");
  }
});

router.post("/send", async (req, res) => {

  try {
    const url = `https://api.telegram.org/bot6296316080:AAFc7DoB9b2kOivNMRRK3kg-_WUW2cIatC4/sendMessage?chat_id=${req.query.id}&text=${encodeURIComponent(
    req.body.message
    )}`;
    await Axios.post(url);
    res.status(200).send("Message sent successfully");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error Sending Message");
  }
});

module.exports = router;
