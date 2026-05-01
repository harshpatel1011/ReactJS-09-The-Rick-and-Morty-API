import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CharacterCard = ({ character }) => {
  const [firstEpisode, setFirstEpisode] = useState("");

  useEffect(() => {
    if (character.episode?.[0]) {
      fetch(character.episode[0])
        .then(res => res.json())
        .then(data => setFirstEpisode(data.name))
        .catch(err => console.error(err));
    }
  }, [character.episode]);

  const statusColor = 
    character.status === 'Alive' ? 'var(--status-alive)' :
    character.status === 'Dead' ? 'var(--status-dead)' : 
    'var(--status-unknown)';

  return (
    <article className="character-card">
      <div className="card-image">
        <img src={character.image} alt={character.name} />
      </div>
      <div className="card-content">
        <div className="section">
          <Link to={`/character/${character.id}`}>
            <h2>{character.name}</h2>
          </Link>
          <span className="status">
            <span className="status-icon" style={{ backgroundColor: statusColor }}></span>
            {character.status} - {character.species}
          </span>
        </div>

        <div className="section">
          <span className="label">Last known location:</span>
          {character.location?.url ? (
            <Link to={`/location/${character.location.url.split('/').pop()}`} className="value">
              {character.location.name}
            </Link>
          ) : (
            <span className="value">{character.location?.name || 'Unknown'}</span>
          )}
        </div>

        <div className="section">
          <span className="label">First seen in:</span>
          {character.episode?.[0] ? (
            <Link to={`/episode/${character.episode[0].split('/').pop()}`} className="value">
              {firstEpisode || "Loading..."}
            </Link>
          ) : (
            <span className="value">Unknown</span>
          )}
        </div>
      </div>
    </article>
  );
};

export default CharacterCard;
