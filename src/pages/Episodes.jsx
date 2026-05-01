import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function Episodes() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://rickandmortyapi.com/api/episode?page=${page}`)
      .then(res => res.json())
      .then(data => {
        setEpisodes(data.results);
        setLoading(false);
      });
  }, [page]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  return (
    <main className="list-page">
      <section className="list-section">
        <h1 className="page-title">Episodes</h1>
        
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="list-grid">
            {episodes.map(ep => (
              <Link to={`/episode/${ep.id}`} key={ep.id} className="list-card">
                <div className="list-card-content">
                  <span className="ep-tag">{ep.episode}</span>
                  <h3>{ep.name}</h3>
                  <p className="air-date">Aired: {ep.air_date}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="pagination">
          <button className="pag-btn" disabled={page === 1} onClick={() => handlePageChange(page - 1)}>Previous</button>
          <span className="page-num">Page {page}</span>
          <button className="pag-btn" onClick={() => handlePageChange(page + 1)}>Next</button>
        </div>
      </section>
    </main>
  );
}

export default Episodes;