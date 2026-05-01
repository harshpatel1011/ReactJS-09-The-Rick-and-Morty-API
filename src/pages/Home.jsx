import { useEffect, useState } from "react";
import CharacterCard from "../components/CharacterCard";

function Home() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const randomIds = Array.from({ length: 6 }, () => Math.floor(Math.random() * 826) + 1);
    
    fetch(`https://rickandmortyapi.com/api/character/${randomIds.join(',')}`)
      .then((res) => res.json())
      .then((data) => {
        setCharacters(Array.isArray(data) ? data : [data]);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="home-container">
      <header className="hero">
        <div className="hero-content">
          <h1>The Rick and Morty API</h1>
        </div>
      </header>

      <section className="characters-section">
        {loading ? (
          <div className="loading">Loading characters...</div>
        ) : (
          <div className="characters-grid">
            {characters.map((char) => (
              <CharacterCard key={char.id} character={char} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;