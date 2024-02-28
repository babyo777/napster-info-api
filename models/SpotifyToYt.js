import spotifyWebApi from "spotify-web-api-node";

const Spotify = new spotifyWebApi({
  clientId: "ddf083a591a448089ae15e2ae725689c",
  clientSecret: "d7299778cf514687a865fc9f280032fa",
});

const SpotifyToYT = async (PlaylistID) => {
  const token = await Spotify.clientCredentialsGrant();
  Spotify.setAccessToken(token.body["access_token"]);

  const playlistTracks = await Spotify.getPlaylistTracks(PlaylistID);

  const modified = playlistTracks.body["items"].map((track) => {
    const name = track.track.name;
    const thumbnailUrl = track.track.album.images[0].url;
    const artist = track.track.artists[0].name;
    return { name, artist, thumbnailUrl };
  });
  return modified;
};

export { SpotifyToYT };
