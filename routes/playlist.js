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
import { SpotifyToYT } from "../models/SpotifyToYt.js";
import { getPlaylistDetails } from "../models/getPlaylistDetails.js";
import { GetPlaylistSongsLessThenHundred } from "../models/getPlaylistDetailsLessthanHundred.js";
import { getLyrics } from "../models/getLyrics.js";
import { getLRC } from "../models/getLrc.js";

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
    const songs = await getPlaylistSongs(query);
    if (songs.length > 0) {
      res.json(songs);
    } else {
      res.status(500).json({ message: "mixes not supported" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
router.get("/gpd/:ps?", async (req, res) => {
  try {
    const query = req.params.ps;
    res.json(await getPlaylistDetails(query));
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
router.get("/psh/:ps?", async (req, res) => {
  try {
    const query = req.params.ps;
    res.json(await GetPlaylistSongsLessThenHundred(query));
  } catch (error) {
    console.log(error.message);
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

router.get("/spyt/:l", async (req, res) => {
  const PlaylistID = req.params.l;
  try {
    res.json(await SpotifyToYT(PlaylistID));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/lyrics/", async (req, res) => {
  const title = req.query.t;
  const artist = req.query.a;
  try {
    res.json(await getLyrics(title, artist));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/lrc/:p?", async (req, res) => {
  const title = req.params.p;
  try {
    res.json(await getLRC(title));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/is/p/:l?", async (req, res) => {
  try {
    const is = req.query.l;
    const id = await getPlaylistID.getPlaylistID(is);
    const p = await getPlaylistSongs(id);
    if (p.length == 0) {
      res.status(500).json("invalid");
    } else {
      res.status(200).json(id);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export default router;
