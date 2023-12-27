const Axios = require('axios')
const express = require('express')
const router = express.Router()
const GetPlaylist = require('ytpl')
const audio = require('../models/audio')


router.get('/',async(req,res)=>{
    if(req.query.url){
        try {
            let music = await GetPlaylist(req.query.url);
            const musicList = await Promise.all(music.items.map(async (music, i) => {
                const audioData = await audio(music.shortUrl);
                return {
                    "id": i,
                    "title": music.title,
                    "artist": music.author.name,
                    "audio": audioData,
                    "cover": "Cover/" + (Math.floor(Math.random() * 85)+1) + ".webp"
                };
            }));   
            res.json(musicList)
        } catch (error) {
            res.status(404).json({error:error.message})
        }    
    }else{
        res.json({message:"no url Provided"})
    }
})


router.post('/message',(req,res)=>{
    try {
        const url = `https://api.telegram.org/bot6296316080:AAFc7DoB9b2kOivNMRRK3kg-_WUW2cIatC4/sendMessage?chat_id=5356614395&text=${encodeURIComponent(
            req.ip + req.body.message 
          )}`;
          Axios.post(url).then((result) => {
            res.status(200).send('Message sent successfully'); 
          }).catch((err) => {
            console.log(err.message);
            res.status(500).send('Error Sending Message')
          });
    } catch (error) {
        console.log(error.message);
    } 
})

module.exports = router



