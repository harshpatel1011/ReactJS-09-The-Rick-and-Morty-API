import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <div className="nav-brand">
        <Link to="/">
          <img src="https://rickandmortyapi.com/icons/icon-512x512.png" alt="Rick and Morty Logo" className="nav-logo" />
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/characters">Characters</Link>
        <Link to="/episodes">Episodes</Link>
        <Link to="/locations">Locations</Link>
        <Link to="/search">Search</Link>
      </div>
    </nav>
  );
}

export default Navbar;