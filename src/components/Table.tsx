type TableProps = {
  data: any[];
  uniqueCol: string;
  displayColumns: string[];
  editAction: () => void;
};

export function Table({
  data,
  uniqueCol,
  displayColumns,
  editAction,
}: TableProps): JSX.Element {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {displayColumns.map((col) => (
                    <th
                      key={col}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {col}
                    </th>
                  ))}
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((data) => (
                  <tr key={data[uniqueCol]}>
                    {displayColumns.map((col) => (
                      <td
                        key={`${data[uniqueCol]}_${col}`}
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {data[col]}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        type="button"
                        onClick={() => {
                          editAction();
                        }}
                        className="text-indigo-600 hover:text-indigo-900">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
