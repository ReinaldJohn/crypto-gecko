import { useState, useEffect, useContext } from "react";
import { NumericFormat } from "react-number-format";
import { Link, useParams } from "react-router-dom";
import { CryptoContext } from "../../context/ContextProvider";
import CoinDetailsSkeletonLoader from "../component/CoinDetailsSkeletonLoader";

const CoinDetails = () => {
  const { coin } = useParams();
  const [coinDetails, setCoinDetails] = useState(null);
  const [coinDatas, setCoinDatas] = useState({});
  const [converter, setConverter] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState({});
  const [cryptoAmount, setCryptoAmount] = useState(1);
  const [fiatAmount, setFiatAmount] = useState(0);
  const [usdPrice, setUsdPrice] = useState(0);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);

  const { isLoading, addToFavorites, favorites } = useContext(CryptoContext);

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            "x-cg-demo-api-key": import.meta.env.VITE_CG_DEMO_API,
          },
        };

        const coinDetailsResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin}&locale=en`,
          options
        );
        const coinDetailsData = await coinDetailsResponse.json();
        setCoinDetails(coinDetailsData[0]);
        setUsdPrice(coinDetailsData[0].current_price);

        const coinDataResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coin}`,
          options
        );
        const coinData = await coinDataResponse.json();
        setCoinDatas(coinData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCoinDetails();
  }, [coin]);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        };

        const exchangeRateResponse = await fetch(
          `https://v6.exchangerate-api.com/v6/${
            import.meta.env.VITE_EXCHANGE_RATE_API_FREE
          }/latest/USD`,
          options
        );
        const exchangeRateData = await exchangeRateResponse.json();
        setExchangeRates(exchangeRateData.conversion_rates);
      } catch (err) {
        console.log(err);
      }
    };

    fetchExchangeRate();
  }, []);

  useEffect(() => {
    if (coinDetails && exchangeRates[converter]) {
      setFiatAmount(cryptoAmount * usdPrice * exchangeRates[converter]);
    }
  }, [cryptoAmount, usdPrice, exchangeRates, converter]);

  if (isLoading) {
    return <CoinDetailsSkeletonLoader />;
  }

  if (!coinDetails) {
    return <div>No coin details found</div>;
  }

  const getWidthPercentage = () => {
    const minPrice = coinDetails.low_24h;
    const maxPrice = coinDetails.high_24h;
    const currentPrice = coinDetails.current_price;

    const percentage =
      ((currentPrice - minPrice) / (maxPrice - minPrice)) * 100;
    return percentage;
  };

  function handleConverter(e) {
    setConverter(e);
  }

  const formatValue = (value) =>
    (value * (exchangeRates[converter] || 1)).toFixed(2);

  const handleAddToFavorites = (symbol) => {
    setIsFavoriteLoading(true);
    addToFavorites(symbol);
    setTimeout(() => {
      setIsFavoriteLoading(false);
    }, 1000); // Simulate a loading state for 1 second
  };

  const isFavorite = favorites.includes(coinDatas.symbol);

  return (
    <section className="bg-gray-900 min-h-screen">
      <div className="container mx-auto max-w-3xl">
        <div className="flex mb-4">
          <Link to="/">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all ease-in-out"
            >
              <i className="fa fa-chevron-left mr-2" aria-hidden="true"></i>
              Go Back
            </button>
          </Link>
        </div>

        <div className="bg-gray-800 rounded shadow-md p-6 w-full">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="flex items-center mb-4 md:mb-0">
              <img
                src={coinDetails.image}
                alt={`${coinDetails.name} Logo`}
                className="h-10 w-10 mr-2"
              />
              <h2 className="text-2xl font-semibold" id="coin-name">
                {coinDetails.name}
              </h2>
              <span className="ml-2 text-gray-400">
                #{coinDetails.market_cap_rank}
              </span>
            </div>

            {isFavorite ? (
              <div className="flex items-center bg-yellow-500 px-4 py-2 rounded-md cursor-pointer text-white">
                <i className="fa fa-star mr-2" aria-hidden="true"></i>
                <span>Favorited</span>
              </div>
            ) : (
              <div
                className="flex items-center bg-yellow-500 px-4 py-2 rounded-md cursor-pointer text-white"
                onClick={() => handleAddToFavorites(coinDatas.symbol)}
              >
                {isFavoriteLoading ? (
                  <span>Loading...</span>
                ) : (
                  <>
                    <i className="fa fa-star mr-2" aria-hidden="true"></i>
                    <span>Add to Favorites</span>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="flex items-center">
              <span className="text-4xl font-bold mr-2" id="coin-price">
                <NumericFormat
                  value={formatValue(usdPrice)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={converter === "USD" ? "$" : "₱"}
                />
              </span>

              {coinDetails.price_change_percentage_24h < 0 ? (
                <>
                  <i
                    className="fa fa-caret-down"
                    aria-hidden="true"
                    style={{ color: "red" }}
                  ></i>
                  <span className="text-red-500 ml-2">
                    {Math.abs(
                      coinDetails.price_change_percentage_24h.toFixed(2)
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
                  <span className="text-green-500 ml-2">
                    {Math.abs(
                      coinDetails.price_change_percentage_24h.toFixed(2)
                    )}
                    %
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-2">
              <div
                className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500"
                style={{
                  width: `${getWidthPercentage()}%`,
                }}
              ></div>
            </div>
            <div className="flex justify-between text-xs">
              <span>
                <NumericFormat
                  value={formatValue(coinDetails.low_24h)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={converter === "USD" ? "$" : "₱"}
                />
              </span>
              <span>24hr Range</span>
              <span>
                <NumericFormat
                  value={formatValue(coinDetails.high_24h)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={converter === "USD" ? "$" : "₱"}
                />
              </span>
            </div>
          </div>
          <div className="mb-4 border border-gray-600 p-4 rounded">
            <h3 className="text-xl font-semibold mb-2 text-center">
              {coinDetails.name} Converter
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
              <NumericFormat
                value={cryptoAmount}
                onValueChange={(values) => setCryptoAmount(values.floatValue)}
                thousandSeparator={true}
                placeholder={`${coinDetails.name} Amount`}
                id="crypto-amount"
                className="px-4 py-2 bg-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <span className="text-xl">=</span>
              <div className="flex flex-col md:flex-row items-center gap-4">
                <NumericFormat
                  value={fiatAmount.toFixed(2)}
                  thousandSeparator={true}
                  placeholder={converter}
                  id="amount"
                  className="px-4 py-2 bg-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  prefix={converter === "USD" ? "$" : "₱"}
                />
                <div className="rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <select
                    className="px-4 py-2 bg-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={(e) => handleConverter(e.target.value)}
                  >
                    <option value="USD">USD</option>
                    <option value="PHP">PHP</option>
                    {/* Add more currencies as needed */}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4 border border-gray-600 p-4 rounded">
            <h3 className="text-xl font-semibold mb-2">Market Data</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Market Cap</span>
                <span>
                  <NumericFormat
                    value={formatValue(coinDetails.market_cap)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={converter === "USD" ? "$" : "₱"}
                  />
                </span>
              </div>
              <div className="flex justify-between">
                <span>Fully Diluted Valuation</span>
                <span>
                  <NumericFormat
                    value={formatValue(coinDetails.fully_diluted_valuation)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={converter === "USD" ? "$" : "₱"}
                  />
                </span>
              </div>
              <div className="flex justify-between">
                <span>24 Hour Trading Vol</span>
                <span>
                  <NumericFormat
                    value={formatValue(coinDetails.total_volume)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={converter === "USD" ? "$" : "₱"}
                  />
                </span>
              </div>
              <div className="flex justify-between">
                <span>Circulating Supply</span>
                <span>
                  <NumericFormat
                    value={coinDetails.circulating_supply}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                </span>
              </div>
              <div className="flex justify-between">
                <span>Max Supply</span>
                <span>
                  <NumericFormat
                    value={coinDetails.max_supply}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="mb-4 border border-gray-600 p-4 rounded">
            <h3 className="text-xl font-semibold mb-2">Info</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Website</span>
                <a
                  href={coinDatas.links?.homepage[0]}
                  className="text-blue-500 hover:underline"
                >
                  {coinDatas.links?.homepage[0]}
                </a>
              </div>
              <div className="flex justify-between items-center">
                <span>Categories</span>
                <div className="flex flex-wrap justify-center space-x-2 space-y-2 md:mt-0">
                  {coinDatas.categories &&
                    coinDatas.categories.map((category, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center bg-gray-700 text-white p-2 rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="border border-gray-600 p-4 rounded">
            <h3 className="text-xl font-semibold mb-2">
              {coinDetails.name} Historical Price
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>24h Range</span>
                <span>
                  <NumericFormat
                    value={formatValue(coinDetails.low_24h)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={converter === "USD" ? "$" : "₱"}
                  />{" "}
                  -{" "}
                  <NumericFormat
                    value={formatValue(coinDetails.high_24h)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={converter === "USD" ? "$" : "₱"}
                  />
                </span>
              </div>
              <div className="flex justify-between">
                <span>All-Time High</span>
                <span>
                  <NumericFormat
                    value={formatValue(coinDetails.ath)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={converter === "USD" ? "$" : "₱"}
                  />{" "}
                  ({new Date(coinDetails.ath_date).toLocaleDateString()})
                </span>
              </div>
              <div className="flex justify-between">
                <span>All-Time Low</span>
                <span>
                  <NumericFormat
                    value={formatValue(coinDetails.atl)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={converter === "USD" ? "$" : "₱"}
                  />{" "}
                  ({new Date(coinDetails.atl_date).toLocaleDateString()})
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoinDetails;
