import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function Locations() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://rickandmortyapi.com/api/location?page=${page}`)
      .then(res => res.json())
      .then(data => {
        setLocations(data.results);
        setLoading(false);
      });
  }, [page]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  return (
    <main className="list-page">
      <section className="list-section">
        <h1 className="page-title">Locations</h1>
        
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="list-grid">
            {locations.map(loc => (
              <Link to={`/location/${loc.id}`} key={loc.id} className="list-card">
                <div className="list-card-content">
                  <span className="type-tag">{loc.type}</span>
                  <h3>{loc.name}</h3>
                  <p className="dimension">{loc.dimension}</p>
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

export default Locations;