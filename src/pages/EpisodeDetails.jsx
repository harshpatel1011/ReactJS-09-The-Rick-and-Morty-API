import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CharacterCard from "../components/CharacterCard";

function EpisodeDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [episode, setEpisode] = useState(null);
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`https://rickandmortyapi.com/api/episode/${id}`)
            .then(response => response.json())
            .then(async (data) => {
                setEpisode(data);
                
                const charData = await Promise.all(
                    data.characters.slice(0, 20).map(url => fetch(url).then(res => res.json()))
                );
                setCharacters(charData);
                setLoading(false);
            });
    }, [id]);

    if (loading || !episode) return <div className="loading">Loading episode details...</div>;

    return (
        <main className="details-container">
            <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
            
            <header className="page-header">
                <span className="ep-tag-large">{episode.episode}</span>
                <h1>{episode.name}</h1>
                <p className="meta-info">First Aired: {episode.air_date}</p>
            </header>

            <section className="characters-section">
                <h3>Characters in this Episode</h3>
                <div className="characters-grid">
                    {characters.map(char => (
                        <CharacterCard key={char.id} character={char} />
                    ))}
                </div>
                {episode.characters.length > 20 && (
                    <p className="more-info">And {episode.characters.length - 20} more characters...</p>
                )}
            </section>
        </main>
    );
}

export default EpisodeDetails;