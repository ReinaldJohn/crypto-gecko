import { createContext, useState, useEffect } from "react";

// Create context
export const CryptoContext = createContext();

// Create provider component
const CryptoProvider = ({ children }) => {
  const [trendings, setTrendings] = useState([]);
  const [largestGainers, setLargestGainers] = useState([]);
  const [topCryptos, setTopCryptos] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({
    key: "market_cap_rank",
    direction: "ascending",
  });

  const itemsPerPage = 10;

  // Fetching data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Default Settings for getting data from API
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            "x-cg-demo-api-key": import.meta.env.VITE_CG_DEMO_API,
          },
        };

        // Fetching Trending Coins
        const trendingResponse = await fetch(
          "https://api.coingecko.com/api/v3/search/trending",
          options
        );
        const trendingData = await trendingResponse.json();
        setTrendings(trendingData.coins);

        // Fetching Largest Gainers
        const gainers = trendingData.coins.map((coin) => ({
          ...coin,
          change: coin.item.data.price_change_percentage_24h.usd || 0,
        }));
        const sortedGainers = gainers.sort((a, b) => b.change - a.change);
        setLargestGainers(sortedGainers.slice(0, 3));

        // Fetching Top Cryptos
        const topCryptoResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100`,
          options
        );
        const topCryptoData = await topCryptoResponse.json();
        setTopCryptos(topCryptoData);

        setIsLoading(false); // Data loaded
      } catch (err) {
        console.log(err);
        setIsLoading(false); // Data loaded with error
      }
    };
    fetchData();
  }, []);

  // Favorites
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (cryptoSymbol) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(cryptoSymbol)
        ? prevFavorites.filter((symbol) => symbol !== cryptoSymbol)
        : [...prevFavorites, cryptoSymbol]
    );
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage * itemsPerPage < topCryptos.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <CryptoContext.Provider
      value={{
        trendings,
        largestGainers,
        topCryptos,
        favorites,
        currentPage,
        isLoading,
        sortConfig,
        itemsPerPage,
        addToFavorites,
        handlePreviousPage,
        handleNextPage,
        requestSort,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

export default CryptoProvider;
