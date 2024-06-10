import { Link } from "react-router-dom";

const TrendingList = ({ trending }) => {
  return (
    <Link to={`coin-details/${trending.item.id}`}>
      <div
        key={trending.item.id}
        className="flex justify-between items-center p-2 hover:bg-gray-700 transition-all ease-in-out rounded-md"
      >
        <div className="flex items-center gap-2">
          <img
            src={trending.item.thumb}
            alt={trending.item.name}
            className="w-8 h-8"
          />
          <span className="font-bold leading-6 text-white">
            {trending.item.name}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-sm">$ {trending.item.data.price.toFixed(5)}</p>
          <span className="text-sm text-green-500">▲ 0.0%</span>
        </div>
      </div>
    </Link>
  );
};

export default TrendingList;
