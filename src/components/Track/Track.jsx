/* eslint-disable react/prop-types */
import styles from "./Track.module.css";

function Track({ track, onAdd, onRemove }) {
  console.log(track);
  return (
    <div className={styles.track}>
      <div className={styles.info}>
        <h3 className={styles.title}>{track.name}</h3>
        <img src={track.img} alt="" />
        <p className={styles.artist}> {track.artist}</p>
      </div>
      <div className={styles.iframeContainer}>
        <iframe
          src={`https://open.spotify.com/embed/track/${track.id}`}
          width="300"
          height="80"
          allow="encrypted-media"
          title={`Player for ${track.name}`}
        ></iframe>
      </div>
      <div className={styles.actions}>
        {onAdd && (
          <button className={styles.addButton} onClick={() => onAdd(track)}>
            Add
          </button>
        )}
        {onRemove && (
          <button
            className={styles.removeButton}
            onClick={() => onRemove(track)}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}

export default Track;
