import { useContext } from "react";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";
import { CryptoContext } from "../../context/ContextProvider";

import TrendingList from "../component/TrendingList";
import LargestGainerList from "../component/LargestGainerList";
import SkeletonLoader from "../component/SkeletonLoader";

const HomePage = () => {
  const {
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
  } = useContext(CryptoContext);

  const sortedCryptos = [...topCryptos].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const indexOfLastCrypto = currentPage * itemsPerPage;
  const indexOfFirstCrypto = indexOfLastCrypto - itemsPerPage;
  const currentCryptos = sortedCryptos.slice(
    indexOfFirstCrypto,
    indexOfLastCrypto
  );

  return (
    <section className="bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto flex flex-col gap-8 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-8 h-full">
            <div className="flex flex-col border border-slate-600 bg-gray-800 text-white rounded-lg p-6 h-full space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">🔥 Trending</h2>
                <a href="" className="underline">
                  View more
                </a>
              </div>
              {trendings.slice(0, 3).map((trending) => (
                <TrendingList key={trending.item.id} trending={trending} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-8 h-full">
            <div className="flex flex-col border border-slate-600 bg-gray-800 text-white rounded-lg p-6 h-full space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">🚀 Largest Gainers</h2>
                <a href="" className="underline">
                  View more
                </a>
              </div>

              {largestGainers.map((gainer) => (
                <LargestGainerList key={gainer.item.id} gainer={gainer} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto bg-gray-800 rounded shadow-md p-6 h-full overflow-x-auto custom-scrollbar">
        <h2 className="text-xl font-semibold mb-4 text-white">
          Top Cryptocurrencies
        </h2>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs text-start font-medium text-white uppercase tracking-wider cursor-pointer sticky left-0 bg-gray-700 z-10"
                  onClick={() => requestSort("market_cap_rank")}
                >
                  Rank #
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs text-start font-medium text-white uppercase tracking-wider cursor-pointer sticky left-20 bg-gray-700 z-10"
                  onClick={() => requestSort("name")}
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs text-start font-medium text-white uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("current_price")}
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs text-start font-medium text-white uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("price_change_percentage_24h")}
                >
                  24h Change
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs text-start font-medium text-white uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("market_cap")}
                >
                  Market Cap
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs text-start font-medium text-white uppercase tracking-wider"
                >
                  Favorite
                </th>
              </tr>
            </thead>
            {!isLoading ? (
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {currentCryptos.map((crypto) => (
                  <tr
                    key={crypto.id}
                    className="hover:bg-gray-700 transition-all ease-in-out"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-white sticky left-0 bg-gray-800 z-10">
                      {crypto.market_cap_rank}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white sticky left-20 bg-gray-800 z-10">
                      <Link to={`coin-details/${crypto.id}`}>
                        <div className="flex items-center">
                          <img
                            src={crypto.image}
                            className="w-6 h-6 mr-2"
                            alt={`${crypto.name} logo`}
                          />
                          {crypto.name}
                          <span className="ml-2 text-sm text-slate-500">
                            {crypto.symbol.toUpperCase()}
                          </span>
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">
                      <NumericFormat
                        value={crypto.current_price}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-500">
                      <div className="flex items-center gap-4">
                        {crypto.price_change_percentage_24h < 0 ? (
                          <>
                            <i
                              className="fa fa-caret-down"
                              aria-hidden="true"
                              style={{ color: "red" }}
                            ></i>
                            <span className="text-red-500">
                              {Math.abs(
                                crypto.price_change_percentage_24h.toFixed(2)
                              )}
                              %
                            </span>
                          </>
                        ) : (
                          <>
                            <i
                              className="fa fa-caret-up"
                              aria-hidden="true"
                              style={{ color: "green" }}
                            ></i>
                            <span className="text-green-500">
                              {Math.abs(
                                crypto.price_change_percentage_24h.toFixed(2)
                              )}
                              %
                            </span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">
                      <NumericFormat
                        value={crypto.market_cap}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span
                        className={`star-button ${
                          favorites.includes(crypto.symbol) ? "filled" : ""
                        }`}
                        id={crypto.symbol}
                        onClick={() => addToFavorites(crypto.symbol)}
                      >
                        ☆
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <SkeletonLoader />
            )}
          </table>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-white">{`Showing ${
            indexOfFirstCrypto + 1
          }-${Math.min(indexOfLastCrypto, topCryptos.length)} of ${
            topCryptos.length
          } results`}</span>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 bg-gray-700 text-white rounded-l-md"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="px-3 py-1 bg-gray-700 text-white rounded-r-md"
              onClick={handleNextPage}
              disabled={indexOfLastCrypto >= topCryptos.length}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
