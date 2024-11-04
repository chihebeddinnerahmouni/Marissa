import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Test = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedType, setSelectedType] = useState('all');
  const navigate = useNavigate();
  const location = useLocation();
      const query = new URLSearchParams(location.search);
      const page = query.get("page")
  
  const limit = 2;

  const fetchData = async (page: number) => {
    setLoading(true);
    console.log("fetched")
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`);
      setData(response.data);
      setTotalPages(Math.ceil(100 / limit));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!page) navigate('/test?page=1', { replace: true });
  }
  , []);

  useEffect(() => {
    fetchData(currentPage);
  }, [page]);

  useEffect(() => {
    if (currentPage !== parseInt(page as string, 10)) {
      navigate(`/test?page=${currentPage}`, { replace: true });
    }
  }, [currentPage, selectedType]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className='w-full min-h-screen'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {data.map((item: any, index: number) => (
            <div key={index} className='w-full p-4 border-b border-gray-200'>
              <h1 className='text-xl font-bold'>{item.title}</h1>
              <p>{item.body}</p>
            </div>
          ))}
          <div className='pagination flex gap-3'>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Test;