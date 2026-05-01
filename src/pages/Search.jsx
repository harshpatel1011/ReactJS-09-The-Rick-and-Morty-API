import { useState } from "react";
import CharacterCard from "../components/CharacterCard";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const search = () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    fetch(`https://rickandmortyapi.com/api/character/?name=${query}`)
      .then(res => res.json())
      .then(data => {
        setResults(data.results || []);
        setLoading(false);
      })
      .catch(() => {
        setResults([]);
        setLoading(false);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') search();
  };

  return (
    <main className="search-page">
      <section className="search-hero">
        <h1>Search Characters</h1>
        <div className="search-box">
          <input 
            placeholder="e.g. Rick Sanchez..." 
            value={query} 
            onChange={e => setQuery(e.target.value)} 
            onKeyPress={handleKeyPress}
          />
          <button onClick={search}>Search</button>
        </div>
      </section>

      <section className="characters-section">
        {loading ? (
          <div className="loading">Searching the multiverse...</div>
        ) : (
          <>
            {searched && results.length === 0 && (
              <div className="no-results">No characters found matching "{query}"</div>
            )}
            <div className="characters-grid">
              {results.map(char => (
                <CharacterCard key={char.id} character={char} />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default Search;