import { MoreVertical, Trash2 } from "lucide-react"

export const Table = ({
  data = [],
  columns = [],
  renderCustomCell,
  onRowClick,
  onDeleteClick,
  itemsPerPage = 8,
  className = "",
  showDelete = false,
  currentPage,
  setCurrentPage,
  sortConfig,
  onSort,
}) => {
  // Pagination
  const totalPages = Math.ceil(data.length / itemsPerPage)
  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Status badge styles
  const getStatusStyle = (status) => {
    const baseStyle = "px-3 py-1 rounded-full text-sm font-medium"
    switch (status?.toLowerCase()) {
      case "ongoing":
        return `${baseStyle} bg-red-50 text-red-600`
      case "completed":
        return `${baseStyle} bg-green-50 text-green-600`
      default:
        return baseStyle
    }
  }

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => onSort(column.key)}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {sortConfig.key === column.key && (
                      <span className="text-gray-400">{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                    )}
                  </div>
                </th>
              ))}
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {column.key === "status" ? (
                      <span className={getStatusStyle(item[column.key])}>{item[column.key]}</span>
                    ) : renderCustomCell ? (
                      renderCustomCell(column.key, item[column.key], item)
                    ) : (
                      item[column.key]
                    )}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => onRowClick?.(item)}
                      className="text-primary hover:text-primary/90 flex items-center justify-center bg-white"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                    {showDelete && (
                      <button
                        onClick={() => onDeleteClick?.(item)}
                        className="text-red-600 hover:text-red-900 flex items-center"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4">
        <div className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Table