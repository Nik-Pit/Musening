/* eslint-disable react/prop-types */
import Track from "../Track/Track";

function SearchResults({ searchResults, onAdd }) {
  const headStyle = {
    fontFamily: "cursive",
    fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: "2px",
    marginTop: "75px",
    marginBottom: "10px",
    color: " #FFFFFF",
    background: " #333",
    textShadow:
      "0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px #49ff18, 0 0 30px #49FF18, 0 0 40px #49FF18, 0 0 55px #49FF18, 0 0 75px #49ff18",
  };
  return (
    <div>
      <h2 style={headStyle}>RESULTS</h2>
      <hr />
      {searchResults.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "1.3rem", color: "#333" }}>
          Try searching for something !
        </p>
      ) : (
        searchResults.map((track) => (
          <Track key={track.id || track.uri} track={track} onAdd={onAdd} />
        ))
      )}
    </div>
  );
}

export default SearchResults;
