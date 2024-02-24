import express from "express";
const router = express.Router();
import getPlaylistID from "ytpl";
import { searchWithSuggestion } from "../models/Suggestions/searchMuisc.js";
import { searchWithoutSuggestion } from "../models/searchMusic.js";
import { searchPlaylist } from "../models/searchPlaylist.js";
import { searchArtist } from "../models/searchArtist.js";
import { getArtistsDetails } from "../models/getArtist.js";
import { getAlbumSongs } from "../models/getalbumSongs.js";
import { getPlaylistSongs } from "../models/getplaylistSongs.js";
import { searchAlbum } from "../models/searchAlbum.js";
import { searchPlaylists } from "node-youtube-music";

router.get("/ss/:s?", async (req, res) => {
  try {
    const query = req.params.s;
    res.json(await searchWithSuggestion(query));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/s/:s?", async (req, res) => {
  try {
    const query = req.params.s;
    res.json(await searchWithoutSuggestion(query));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/ps/:ps?", async (req, res) => {
  try {
    const query = req.params.ps;
    res.json(await getPlaylistSongs(query));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/p/:p?", async (req, res) => {
  try {
    const query = req.params.p;
    res.json(await searchPlaylist(query));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/a/:a?", async (req, res) => {
  try {
    //do h-2,160 w-3,840
    const query = req.params.a;
    res.json(await searchArtist(query));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/ga/:ga?", async (req, res) => {
  try {
    //do h-2,160 w-3,840
    const query = req.params.ga;
    res.json(await getArtistsDetails(query));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/gas/:gas?", async (req, res) => {
  try {
    //do h-2,160 w-3,840
    const query = req.params.gas;
    res.json(await getAlbumSongs(query));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/al/:al?", async (req, res) => {
  try {
    //do h-2,160 w-3,840
    const query = req.params.al;
    res.json(await searchAlbum(query));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/is/p/:l?", async (req, res) => {
  try {
    const is = req.query.l;
    const id = await getPlaylistID.getPlaylistID(is);
    const p = getPlaylistSongs(id);
    if (p.length == 0) {
      return res.status(500).json("invalid");
    }else{
    res.status(200).json(id);}
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export default router;
