import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-gray-800 text-white py-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-4">
          <img
            src="../../src/assets/cg.png"
            alt="Crypto Tracker Logo"
            className="h-10 w-10"
          />
          <h1 className="text-2xl font-bold">Crypto Gecko</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="favorites-button bg-pink-500 text-white hidden sm:flex">
            <span className="star-icon">&#9733;</span>
            <Link to="">My Favorites</Link>
          </div>
          <input
            type="text"
            placeholder="Search Coins..."
            className="px-4 py-2 rounded-full bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 w-32 sm:w-64"
          />
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
