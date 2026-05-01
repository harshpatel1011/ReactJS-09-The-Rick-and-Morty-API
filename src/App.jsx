import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import CharacterDetails from "./pages/CharacterDetails";
import Episodes from "./pages/Episodes";
import EpisodeDetails from "./pages/EpisodeDetails";
import Locations from "./pages/Locations";
import LocationDetails from "./pages/LocationDetails";
import Search from "./pages/Search";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/character/:id" element={<CharacterDetails />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/episode/:id" element={<EpisodeDetails />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/location/:id" element={<LocationDetails />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </>
  );
}

export default App;