import axios from "axios";

const clientId = "";//Enter your client id here
const redirectUri = "http://localhost:3000";
let accessToken;


function getStoredAccessToken() {
  const storedToken = sessionStorage.getItem("spotify_access_token");
  const storedExpiration = Number(sessionStorage.getItem("spotify_token_expiration"));

  if (storedToken && storedExpiration > Date.now()) {
    return storedToken;
  }

  
  sessionStorage.removeItem("spotify_access_token");
  sessionStorage.removeItem("spotify_token_expiration");
  return null;
}

/**
 * Extracts parameters from the URL.
 */
function getUrlParams() {
  const params = new URLSearchParams(window.location.hash.substring(1));
  return {
    accessToken: params.get("access_token"),
    expiresIn: params.get("expires_in") ? Number(params.get("expires_in")) : null,
  };
}

/**
 * Handle Spotify authentication and token retrieval.
 */
function getAccessToken() {
  if (accessToken) return accessToken;

  accessToken = getStoredAccessToken();
  if (accessToken) return accessToken;

  const { accessToken: urlToken, expiresIn } = getUrlParams();

  if (urlToken && expiresIn) {
    accessToken = urlToken;
    sessionStorage.setItem("spotify_access_token", accessToken);
    sessionStorage.setItem("spotify_token_expiration", Date.now() + expiresIn * 1000);

    // Clean URL
    window.history.replaceState(null, null, "/");
    return accessToken;
  }

  // Redirect to Spotify authorization
  window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public%20user-read-private%20user-library-read&redirect_uri=${redirectUri}`;
}


const Spotify = {
  
  async search(term) {
    if (!term) return [];

    const token = getStoredAccessToken() || getAccessToken();
    if (!token) {
      console.error("Access token is missing or invalid.");
      return [];
    }

    try {
      const { data } = await axios.get("https://api.spotify.com/v1/search", {
        headers: { Authorization: `Bearer ${token}` },
        params: { type: "track", q: term },
      });

      return data.tracks?.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0]?.name || "Unknown Artist",
        album: track.album?.name || "Unknown Album",
        uri: track.uri,
        img: track.album?.images?.[1]?.url || "",
      })) || [];
    } catch (error) {
      console.error("Error searching Spotify:", error.response?.data || error.message);
      return [];
    }
  },

  
  async savePlaylist(name, trackURIs) {
    if (!name || !trackURIs.length) {
      console.warn("Playlist name or track URIs are missing.");
      return;
    }

    const token = getStoredAccessToken() || getAccessToken();
    if (!token) {
      console.error("Access token is missing or invalid.");
      return;
    }

    try {
      const headers = { Authorization: `Bearer ${token}` };

      const { data: user } = await axios.get("https://api.spotify.com/v1/me", { headers });
      const { data: playlist } = await axios.post(
        `https://api.spotify.com/v1/users/${user.id}/playlists`,
        { name },
        { headers }
      );

      await axios.post(
        `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
        { uris: trackURIs },
        { headers }
      );

      console.log(`Playlist "${name}" created successfully.`);
    } catch (error) {
      console.error("Error saving playlist:", error.response?.data || error.message);
    }
  },
};

export default Spotify;
