/* eslint-disable react/prop-types */
import Track from "../Track/Track";
import styles from "./Playlist.module.css";

function Playlist({
  playlistTracks,
  onRemove,
  playlistName,
  setPlaylistName,
  savePlaylist,
}) {
  return (
    <div className={styles.playlist}>
      <h2>Your Playlist</h2>

      <input
        placeholder="Playlist Name"
        id="playlistName"
        type="text"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
      />

      {playlistTracks.length === 0 ? (
        <p>No tracks in your playlist. Add some to get started!</p>
      ) : (
        playlistTracks.map((track) => (
          <Track key={track.id} track={track} onRemove={onRemove} />
        ))
      )}
      <button className={styles.savebtn} onClick={savePlaylist}>
        Save Playlist
      </button>
    </div>
  );
}

export default Playlist;
