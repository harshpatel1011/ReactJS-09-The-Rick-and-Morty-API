import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function CharacterDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [char, setChar] = useState(null);
  const [location, setLocation] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setEpisodes([]);

    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then(res => res.json())
      .then(async (data) => {
        setChar(data);

        if (data.origin.url) {
          fetch(data.origin.url)
            .then(res => res.json())
            .then(org => setOrigin(org));
        }

        if (data.location.url) {
          fetch(data.location.url)
            .then(res => res.json())
            .then(loc => setLocation(loc));
        }

        const epData = await Promise.all(
          data.episode.map(url => fetch(url).then(res => res.json()))
        );
        setEpisodes(epData);
        setLoading(false);
      });
  }, [id]);

  if (loading || !char) return <div className="loading">Wubba Lubba Dub Dub... Loading...</div>;

  const statusColor = 
    char.status === 'Alive' ? 'var(--status-alive)' :
    char.status === 'Dead' ? 'var(--status-dead)' : 
    'var(--status-unknown)';

  return (
    <main className="details-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      
      <div className="profile-header">
        <div className="profile-image-container">
            <img src={char.image} alt={char.name} className="profile-image" />
            <div className="profile-status-badge" style={{ backgroundColor: statusColor }}>
                {char.status}
            </div>
        </div>
        
        <div className="profile-info-main">
          <h1>{char.name}</h1>
          <p className="profile-meta">{char.species} • {char.gender} • {char.origin?.name}</p>
          
          <div className="details-grid">
            <div className="detail-item">
              <span className="label">Origin: </span>
              <span className="value">
                {origin ? (
                  <Link to={`/location/${origin.id}`}>{origin.name}</Link>
                ) : (
                  char.origin?.name || "Unknown"
                )}
              </span>
            </div>
            
            <div className="detail-item">
              <span className="label">Last Known Location: </span>
              <span className="value">
                {location ? (
                  <Link to={`/location/${location.id}`}>{location.name}</Link>
                ) : (
                  char.location?.name || "Unknown"
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      <section className="episodes-section">
        <h3>All Episodes</h3>
        <div className="episodes-mini-grid">
          {episodes.map(episode => (
            <Link to={`/episode/${episode.id}`} key={episode.id} className="episode-chip">
              <span className="ep-code">{episode.episode}</span>
              <span className="ep-name">{episode.name}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default CharacterDetails;