const Pagination = ({ 
  currentPage = 1, 
  totalPages = 1, 
  totalItems = 0, 
  itemsPerPage = 10,
  onPageChange 
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
      <div className="text-sm text-muted">
        Showing {startItem} to {endItem} of {totalItems} entries
      </div>
      
      <div className="join">
        <button 
          className="join-item btn btn-sm"
          onClick={() => onPageChange?.(currentPage - 1)}
          disabled={currentPage === 1}
        >
          «
        </button>
        
        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <button key={`ellipsis-${index}`} className="join-item btn btn-sm btn-disabled">
              ...
            </button>
          ) : (
            <button
              key={page}
              className={`join-item btn btn-sm ${currentPage === page ? 'btn-active' : ''}`}
              onClick={() => onPageChange?.(page)}
            >
              {page}
            </button>
          )
        ))}
        
        <button 
          className="join-item btn btn-sm"
          onClick={() => onPageChange?.(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Pagination;
