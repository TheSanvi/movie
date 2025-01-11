import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Show } from '../types';

function HomeScreen() {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchShows();
  }, []);

  const fetchShows = async () => {
    try {
      const response = await axios.get('https://api.tvmaze.com/search/shows?q=all');
      setShows(response.data.map((item: any) => item.show));
    } catch (error) {
      console.error('Error fetching shows:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="gradient-bg text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-4xl font-bold">TV Shows</h1>
              <p className="text-primary-100 mt-2">Discover your next favorite show</p>
            </div>
            <button
              onClick={() => navigate('/search')}
              className="glass-effect px-6 py-3 rounded-full hover:bg-white hover:bg-opacity-20 transition-all duration-300 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Search Shows</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-500 border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {shows.map((show, index) => (
              <div
                key={show.id}
                className="card-hover bg-white rounded-2xl shadow-lg overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(`/details/${show.id}`, { state: { show } })}
              >
                <div className="relative aspect-[2/3] bg-gray-200">
                  <img
                    src={show.image?.medium || 'https://via.placeholder.com/210x295'}
                    alt={show.name}
                    className="w-full h-full object-cover"
                  />
                  {show.rating?.average && (
                    <div className="absolute top-3 right-3 glass-effect text-white px-3 py-1 rounded-full text-sm font-semibold">
                      ★ {show.rating.average}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-1">{show.name}</h2>
                  {show.genres && show.genres.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {show.genres.slice(0, 3).map((genre) => (
                        <span
                          key={genre}
                          className="bg-primary-50 text-primary-700 text-xs px-3 py-1 rounded-full font-medium"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  )}
                  <div
                    className="text-gray-600 text-sm line-clamp-3 mb-4"
                    dangerouslySetInnerHTML={{
                      __html: show.summary || 'No summary available',
                    }}
                  />
                  {show.premiered && (
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(show.premiered).getFullYear()}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="gradient-bg text-white py-12 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-primary-100">
            Powered by TVMaze API • Made with ❤️
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomeScreen;