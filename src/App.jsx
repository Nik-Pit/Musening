import { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import Playlist from "./components/Playlist/Playlist";
import Spotify from "./Spotify";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("");

  const searchSpotify = (term) => {
    console.log("Searching Spotify for:", term);
    Spotify.search(term).then((results) => {
    
      setSearchResults(results);
    });
  };

  const addTrack = (track) => {
    if (playlistTracks.find((savedTrack) => savedTrack.id === track.id)) return;
    const updatedTracks = [...playlistTracks, track];
    setPlaylistTracks(updatedTracks);
  };

  const removeTrack = (track) => {
    const updatedTracks = playlistTracks.filter(
      (savedTrack) => savedTrack.id !== track.id
    );
    setPlaylistTracks(updatedTracks);
  };

  const savePlaylist = () => {
    const trackURIs = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      setPlaylistName("");
      setPlaylistTracks([]);
      setSearchResults([]);
      alert("Playlist saved successfully!");
    });
  };

  return (
    <>
      <SearchBar onSearch={searchSpotify} />
      <SearchResults searchResults={searchResults} onAdd={addTrack} />
      <Playlist
        playlistTracks={playlistTracks}
        onRemove={removeTrack}
        playlistName={playlistName}
        setPlaylistName={setPlaylistName}
        savePlaylist={savePlaylist}
      />
    </>
  );
}

export default App;
