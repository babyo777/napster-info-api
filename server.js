const express = require("express");
const app = express();
const { Octokit } = require("@octokit/rest");
const cors = require("cors");
const ytdl = require("ytdl-core");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const dotenv = require('dotenv').config()

const PORT = process.env.PORT || 3000;

app.use(cors());
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.static("public"));
const github = new Octokit({
  auth: process.env.GITHUB,
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/Upload.html"));
});

app.post("/upload", upload.single("cover"), async (req, res) => {
  if (req.body.title.length > 23 || req.body.artist.length > 30 || !req.file) {
    res.send(
      "<script>alert('Cover not Provided or Title , Artist name is Too Long');window.location='/';</script>"
    );
  } else {
    const content = req.file.buffer.toString("base64");
    try {
      const info = (await ytdl.getInfo(req.body.url)).videoDetails.title;
      try {
        const file = await github.repos.createOrUpdateFileContents({
          owner: "babyo7",
          repo: "Music-Player",
          path: `Cover/${req.file.originalname}`,
          message: "New Cover",
          content,
        });
        console.log(file.data.commit.message);
        download(
          req.body.title,
          req.body.artist,
          req.body.url,
          `${req.file.originalname}`,
          res
        );
      } catch (error) {
        console.error(error.message);
        res.send(
          "<script>alert('Cover Already Exist');window.location='/';</script>"
        );
      }
    } catch (error) {
      console.log(error.message);
      res.send("<script>alert('Invalid Link');window.location='/';</script>");
    }
  }
});

app.post("/music", async (req, res) => {
  try {
    const response = await github.repos.getContent({
      owner: "babyo7",
      repo: "NGL--Database",
      path: `music.json`,
    });

    let content = Buffer.from(response.data.content, "base64").toString(
      "utf-8"
    );
    let data = JSON.parse(content);

    res.json(data);
  } catch (error) {
    console.log(error.message);
    res.send(`<script>alert('${error.message}');window.location='/';</script>`);
  }
});

async function fetch(title, artist, cover, music, res) {
  const NewMusic = {
    title: title,
    artist: artist,
    audio: `https://music-player-babyo7.vercel.app/Music/${music}`,
    cover: `https://music-player-babyo7.vercel.app/Cover/${cover}`,
  };
  try {
    github.repos
      .getContent({
        owner: "babyo7",
        repo: "NGL--Database",
        path: "music.json",
      })
      .then((response) => {
        const existingContent = Buffer.from(
          response.data.content,
          "base64"
        ).toString("utf-8");

        const existingData = JSON.parse(existingContent);

        existingData.push(NewMusic);

        const updatedContent = Buffer.from(
          JSON.stringify(existingData, null, 2)
        ).toString("base64");

        return github.repos.createOrUpdateFileContents({
          owner: "babyo7",
          repo: "NGL--Database",
          path: "music.json",
          message: "Add new song to music.json",
          content: updatedContent,
          sha: response.data.sha,
        });
      })
      .then((response) => {
        console.log("File updated successfully:", response.data.commit.message);
        res.redirect("/");
      })
      .catch((error) => {
        console.error("Error updating file:", error.message);
        res.send(
          `<script>alert('${error.message}');window.location='/';</script>`
        );
      });
  } catch (error) {
    console.log(error.message);
    res.send(`<script>alert('${error.message}');window.location='/';</script>`);
  }
}

async function download(title, artist, url, cover, res) {
  try {
    const info = (await ytdl.getInfo(url)).videoDetails.title;
    const stream = ytdl(url, { quality: "lowest" }).pipe(
      fs.createWriteStream(`${info}.mp3`)
    );
    stream.on("finish", async () => {
      const content = fs.readFileSync(`${info}.mp3`).toString("base64");
      try {
        const file = await github.repos.createOrUpdateFileContents({
          owner: "babyo7",
          repo: "Music-Player",
          path: `Music/${info}.mp3`,
          message: "new",
          content,
        });
        console.log(file.data.commit.message);
        fs.unlinkSync(`${info}.mp3`);
        fetch(title, artist, cover, `${info}.mp3`, res);
      } catch (error) {
        fs.unlinkSync(`${info}.mp3`);
        console.error(error.message);
        res.send(
          "<script>alert('Music Already Exist');window.location='/';</script>"
        );
      }
    });
  } catch (error) {
    console.log(error.message);
    res.send(`<script>alert('${error.message}');window.location='/';</script>`);
  }
}

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
