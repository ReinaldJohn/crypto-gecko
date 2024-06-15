import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);

  const handleSearch = async (query) => {
    if (query.length > 2) {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            "x-cg-demo-api-key": import.meta.env.VITE_CG_DEMO_API,
          },
        };

        const response = await fetch(
          `https://api.coingecko.com/api/v3/search?query=${query}`,
          options
        );
        const data = await response.json();
        setSearchResults(data.coins);
        setShowDropdown(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchQuery("");
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  return (
    <header className="bg-gray-800 text-white py-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-4">
          <img
            src="/path/to/your/logo.png" // Make sure this path is correct
            alt="Crypto Tracker Logo"
            className="h-10 w-10"
          />
          <h1 className="text-2xl font-bold">Crypto Gecko</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="favorites-button bg-pink-500 text-white hidden sm:flex">
            <span className="star-icon">&#9733;</span>
            <Link to={"/my-favorites"}>My Favorites</Link>
          </div>
          <div className="relative" ref={searchRef}>
            <input
              type="text"
              placeholder="Search Coins..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 rounded-full bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 w-32 sm:w-64"
            />
            {showDropdown && (
              <div className="absolute left-0 right-0 mt-2 py-2 w-full bg-gray-700 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto custom-scrollbar">
                {searchResults.length > 0 ? (
                  searchResults.map((coin) => (
                    <Link
                      key={coin.id}
                      to={`/coin-details/${coin.id}`}
                      className="flex items-center px-4 py-2 text-white hover:bg-gray-600"
                      onClick={() => {
                        setShowDropdown(false);
                        setSearchQuery("");
                      }}
                    >
                      <img
                        src={coin.thumb}
                        alt={coin.name}
                        className="h-6 w-6 mr-2"
                      />
                      {coin.name}
                    </Link>
                  ))
                ) : (
                  <div className="block px-4 py-2 text-white">
                    No results found
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="hidden-menu sm:hidden">
            <button id="menu-button" className="text-xl focus:outline-none">
              &#9776;
            </button>
          </div>
        </div>
      </div>
      <div
        id="dropdown-menu"
        className="hidden absolute right-4 mt-2 py-2 w-48 bg-gray-700 rounded-lg shadow-lg"
      >
        <div className="favorites-button bg-yellow-400">
          <span className="star-icon">&#9733;</span>
          <span>My Favorites</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
