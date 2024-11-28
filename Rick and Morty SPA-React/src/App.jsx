import React, { useEffect, useState } from "react";
import "./App.css";

const Header = () => (
  <header className="bg-gradient-to-r from-purple-500 to-pink-500 py-8">
    <h1 className="text-6xl text-white header-font">Rick and Morty</h1>
  </header>
);

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="flex justify-center mb-8">
      <input
        type="text"
        placeholder="Search Name"
        className="px-4 py-2 border rounded-l-full focus:outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className="bg-teal-500 text-white px-4 py-2 rounded-r-full"
        onClick={handleSearch}
      >
        <i className="fas fa-arrow-right"></i>
      </button>
    </div>
  );
};

const CharacterCard = ({ character }) => (
  <div
    className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
    onClick={() => alert(`You clicked on ${character.name}`)}
  >
    <img
      src={character.image}
      alt={character.name}
      className="w-full h-48 object-cover"
    />
    <div className="bg-teal-500 text-white py-2">
      <h2 className="text-xl">{character.name}</h2>
    </div>
  </div>
);

const CharacterGrid = ({ characters }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4">
    {characters.map((character) => (
      <CharacterCard key={character.id} character={character} />
    ))}
  </div>
);

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.results);
        setFilteredCharacters(data.results);
      });
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = characters.filter((character) =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCharacters(filtered);
  };

  return (
    <div className="text-center">
      <Header />
      <div className="mt-8">
        <SearchBar onSearch={handleSearch} />
        <CharacterGrid characters={filteredCharacters} />
      </div>
    </div>
  );
};

export default App;
