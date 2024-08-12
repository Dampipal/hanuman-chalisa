import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useSearchParams } from 'react-router-dom';
import Hanu from './pages/Hanu';

const PaginatedHanu = () => {
  // State for current page
  const [currentPage, setCurrentPage] = useState(() => {
    // Retrieve the last saved page from localStorage, or default to 1
    return parseInt(localStorage.getItem('currentPage') || '1', 10);
  });
  const itemsPerPage = 1;
  const totalPages = Math.ceil(108 / itemsPerPage);
  const hanuArray = Array.from({ length: 1008 });

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10);
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  }, [searchParams, currentPage]);

  useEffect(() => {
    // Save the current page to localStorage whenever it changes
    localStorage.setItem('currentPage', currentPage.toString());
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setSearchParams({ page: nextPage });
      setCurrentPage(nextPage);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const previousPage = currentPage - 1;
      setSearchParams({ page: previousPage });
      setCurrentPage(previousPage);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = hanuArray.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <div>
        {currentItems.map((_, index) => (
          <Hanu key={indexOfFirstItem + index} />
        ))}
      </div>
      <div className="pagination" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {currentPage < totalPages && (
          <button
            onClick={handleNextPage}
            style={{
              margin: '0 5px',
              padding: '10px 20px',
              cursor: 'pointer',
              backgroundColor: '#007bff',
              color: '#fff',
              border: '1px solid #007bff',
              borderRadius: '5px',
            }}
          >
            Next
          </button>
        )}
        {currentPage > 1 && (
          <button
            onClick={handlePreviousPage}
            style={{
              margin: '0 5px',
              padding: '10px 20px',
              cursor: 'pointer',
              backgroundColor: '#007bff',
              color: '#fff',
              border: '1px solid #007bff',
              borderRadius: '5px',
            }}
          >
            Previous
          </button>
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginatedHanu />} />
      </Routes>
    </Router>
  );
}

export default App;
