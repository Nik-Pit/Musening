/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./SearchBar.module.css";

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!term.trim()) {
      alert("Please enter a valid search term.");
      return;
    }

    onSearch(term);
    setTerm("");
  };

  return (
    <form id="Search-form" onSubmit={handleSubmit} className={styles.searchBar}>
      <div className={styles.header}>
        <h2>Musening App &#174;</h2>
        <h3>
          <span>by</span> Spotify
          <img
            className={styles.img}
            src="https://open.spotifycdn.com/cdn/images/favicon32.b64ecc03.png"
            alt="spotify-icon"
          />
        </h3>
      </div>
      <label className={styles.label} htmlFor="searchTerm">
        Search and create your playlist
      </label>
      <br />
      <input
        className={styles.input}
        onChange={handleChange}
        type="text"
        name="searchTerm"
        id="searchTerm"
        value={term}
        placeholder="Search song, album, or artist"
      />
      <button type="submit" className={styles.button}>
        <span>Search</span>
      </button>
    </form>
  );
}

export default SearchBar;
