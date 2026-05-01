import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CharacterCard from "../components/CharacterCard";

function Characters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then(res => res.json())
      .then(data => {
        setCharacters(data.results);
        setLoading(false);
      });
  }, [page]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  return (
    <main className="characters-page">
      <section className="characters-section">
        <h1 className="page-title">Characters</h1>
        
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="characters-grid">
            {characters.map(char => (
              <CharacterCard key={char.id} character={char} />
            ))}
          </div>
        )}

        <div className="pagination">
          <button 
            className="pag-btn" 
            disabled={page === 1} 
            onClick={() => handlePageChange(page - 1)}
          >
            Previous
          </button>
          <span className="page-num">Page {page}</span>
          <button 
            className="pag-btn" 
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </button>
        </div>
      </section>
    </main>
  );
}

export default Characters;