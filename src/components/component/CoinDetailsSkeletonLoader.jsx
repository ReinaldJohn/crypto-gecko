const CoinDetailsSkeletonLoader = () => {
  return (
    <div className="container mx-auto max-w-3xl animate-pulse skeleton">
      <div className="flex mb-4 skeleton">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all ease-in-out skeleton"
        >
          <i
            className="fa fa-chevron-left mr-2"
            aria-hidden="true skeleton"
          ></i>
          Go Back
        </button>
      </div>

      <div className="bg-gray-800 rounded shadow-md p-6 w-full animate-pulse skeleton">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 skeleton">
          <div className="flex items-center mb-4 md:mb-0 skeleton">
            <img src="" alt="" className="h-10 w-10 mr-2" />
            <h2 className="text-2xl font-semibold" id="coin-name skeleton"></h2>
            <span className="ml-2 text-gray-400 skeleton"></span>
          </div>
          <div className="flex items-center bg-yellow-400 text-gray-700 px-4 py-2 rounded-md cursor-pointer skeleton">
            <i className="fa fa-star mr-2" aria-hidden="true skeleton"></i>
            <span></span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 skeleton">
          <div className="flex items-center skeleton">
            <span
              className="text-4xl font-bold"
              id="coin-price skeleton"
            ></span>
            <span className="" id="coin-change skeleton"></span>
          </div>
        </div>
        <div className="mb-4 skeleton">
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-2 skeleton">
            <div className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500 skeleton"></div>
          </div>
          <div className="flex justify-between text-xs skeleton">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="mb-4 border border-gray-600 p-4 rounded skeleton">
          <h3 className="text-xl font-semibold mb-2 text-center skeleton"></h3>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 skeleton">
            <input
              type="number"
              placeholder="Amount"
              className="px-4 py-2 bg-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="crypto-amount"
            />
            <span className="text-xl skeleton">=</span>
            <div className="flex flex-col md:flex-row items-center gap-4 skeleton">
              <input
                type="number"
                placeholder=""
                className="px-4 py-2 bg-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                id=""
              />
              <div className="rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 skeleton">
                <select
                  className="px-4 py-2 bg-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  name=""
                  id=""
                >
                  <option value=" skeleton">USD</option>
                  <option value=" skeleton"></option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4 border border-gray-600 p-4 rounded skeleton">
          <h3 className="text-xl font-semibold mb-2 skeleton"></h3>
          <div className="space-y-2 skeleton">
            <div className="flex justify-between skeleton">
              <span></span>
              <span></span>
            </div>
            <div className="flex justify-between skeleton">
              <span></span>
              <span></span>
            </div>
            <div className="flex justify-between skeleton">
              <span></span>
              <span></span>
            </div>
            <div className="flex justify-between skeleton">
              <span></span>
              <span></span>
            </div>
            <div className="flex justify-between skeleton">
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <div className="mb-4 border border-gray-600 p-4 rounded skeleton">
          <h3 className="text-xl font-semibold mb-2 skeleton">Info</h3>
          <div className="space-y-2 skeleton">
            <div className="flex justify-between skeleton">
              <span></span>
              <a href="" className="text-blue-500 hover:underline skeleton"></a>
            </div>
            <div className="flex justify-between skeleton">
              <span></span>
              <select className="bg-gray-700 rounded-md px-2 py-1 skeleton">
                <option></option>
              </select>
            </div>
            <div className="flex justify-between skeleton">
              <span></span>
              <select className="bg-gray-700 rounded-md px-2 py-1 skeleton">
                <option></option>
              </select>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center skeleton">
              <span>Community</span>
              <div className="flex flex-wrap justify-center space-x-2 mt-2 md:mt-0 skeleton">
                <span className="inline-flex items-center bg-gray-700 text-white px-4 py-2 rounded-full mr-2 skeleton">
                  <i className="fab fa-twitter mr-2 skeleton"></i>
                </span>
                <span className="inline-flex items-center bg-gray-700 text-white px-4 py-2 rounded-full mr-2 skeleton">
                  <i className="fab fa-facebook mr-2 skeleton"></i>
                </span>
                <span className="inline-flex items-center bg-gray-700 text-white px-4 py-2 rounded-full skeleton">
                  <i className="fas fa-comments mr-2 skeleton"></i>
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center skeleton">
              <span></span>
              <a href="" className="text-blue-500 hover:underline skeleton"></a>
            </div>
            <div className="flex justify-between items-center skeleton">
              <span></span>
              <span></span>
            </div>
            <div className="flex justify-between items-center skeleton">
              <span></span>
              <div className="flex flex-wrap justify-center space-x-2 mt-2 md:mt-0 skeleton">
                <span className="inline-flex items-center bg-gray-700 text-white px-4 py-2 rounded-full mr-2 skeleton"></span>
                <span className="inline-flex items-center bg-gray-700 text-white px-4 py-2 rounded-full skeleton">
                  More
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-gray-600 p-4 rounded skeleton">
          <h3 className="text-xl font-semibold mb-2 skeleton"></h3>
          <div className="space-y-2 skeleton">
            <div className="flex justify-between skeleton">
              <span></span>
              <span></span>
            </div>
            <div className="flex justify-between skeleton">
              <span></span>
              <span></span>
            </div>
            <div className="flex justify-between skeleton">
              <span></span>
              <span></span>
            </div>
            <div className="flex justify-between skeleton">
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinDetailsSkeletonLoader;
