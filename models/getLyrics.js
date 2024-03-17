import { Google } from "@flytri/lyrics-finder";

async function getLyrics(title, artist) {
  const lyrics = await Google(title, artist);
  return lyrics;
}

export { getLyrics };
