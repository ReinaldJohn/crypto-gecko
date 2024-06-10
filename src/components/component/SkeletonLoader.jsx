const SkeletonLoader = () => {
  const rows = Array.from({ length: 10 });

  return (
    <tbody className="bg-gray-800 divide-y divide-gray-700">
      {rows.map((_, index) => (
        <tr key={index} className="animate-pulse">
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-4 bg-gray-700 rounded w-3/4 skeleton"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-4 bg-gray-700 rounded w-1/2 skeleton"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-4 bg-gray-700 rounded w-1/4 skeleton"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-4 bg-gray-700 rounded w-1/4 skeleton"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-4 bg-gray-700 rounded w-1/4 skeleton"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-4 bg-gray-700 rounded w-1/4 skeleton"></div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default SkeletonLoader;
