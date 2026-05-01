import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CharacterCard from "../components/CharacterCard";

function LocationDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [location, setLocation] = useState(null);
    const [residents, setResidents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`https://rickandmortyapi.com/api/location/${id}`)
            .then(response => response.json())
            .then(async (data) => {
                setLocation(data);
                
                const resData = await Promise.all(
                    data.residents.slice(0, 20).map(url => fetch(url).then(res => res.json()))
                );
                setResidents(resData);
                setLoading(false);
            });
    }, [id]);

    if (loading || !location) return <div className="loading">Exploring location...</div>;

    return (
        <main className="details-container">
            <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
            
            <header className="page-header">
                <span className="type-tag-large">{location.type}</span>
                <h1>{location.name}</h1>
                <p className="meta-info">Dimension: {location.dimension}</p>
            </header>

            <section className="residents-section">
                <h3>Known Residents</h3>
                <div className="characters-grid">
                    {residents.map(resident => (
                        <CharacterCard key={resident.id} character={resident} />
                    ))}
                </div>
                {location.residents.length === 0 && <p className="no-info">No known residents at this location.</p>}
                {location.residents.length > 20 && (
                    <p className="more-info">And {location.residents.length - 20} more residents...</p>
                )}
            </section>
        </main>
    );
}

export default LocationDetails;