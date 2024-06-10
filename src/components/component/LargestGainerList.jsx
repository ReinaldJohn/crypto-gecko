import { Link } from "react-router-dom";

const LargestGainerList = ({ gainer }) => {
  return (
    <Link to={`coin-details/${gainer.item.id}`}>
      <div
        key={gainer.item.id}
        className="flex justify-between items-center p-2 hover:bg-gray-700 transition-all ease-in-out rounded-md"
      >
        <div className="flex items-center gap-2">
          <img
            src={gainer.item.thumb}
            alt={gainer.item.name}
            className="w-8 h-8"
          />
          <span className="font-bold leading-6 text-white">
            {gainer.item.name}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-sm">$ {gainer.item.data.price.toFixed(5)}</p>
          <span
            className={`text-sm ${
              gainer.change > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {gainer.change.toFixed(2)}%
          </span>
        </div>
      </div>
    </Link>
  );
};

export default LargestGainerList;
