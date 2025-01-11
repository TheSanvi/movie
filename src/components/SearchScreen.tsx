import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Show } from '../types';

function SearchScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const searchShows = async (term: string) => {
    if (!term) {
      setShows([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${term}`);
      setShows(response.data.map((item: any) => item.show));
    } catch (error) {
      console.error('Error searching shows:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="sticky top-0 bg-gray-100 pb-4">
        <input
          type="text"
          placeholder="Search shows..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            searchShows(e.target.value);
          }}
          className="w-full p-3 rounded-lg shadow"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {shows.map((show) => (
            <div
              key={show.id}
              className="bg-white rounded-lg shadow overflow-hidden cursor-pointer"
              onClick={() => navigate(`/details/${show.id}`, { state: { show } })}
            >
              <div className="flex">
                <img
                  src={show.image?.medium || 'https://via.placeholder.com/210x295'}
                  alt={show.name}
                  className="w-24 h-36 object-cover"
                />
                <div className="p-4 flex-1">
                  <h2 className="text-xl font-bold mb-2">{show.name}</h2>
                  <p className="text-gray-600 line-clamp-3"
                     dangerouslySetInnerHTML={{ __html: show.summary || 'No summary available' }}>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchScreen;