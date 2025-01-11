import { useLocation } from 'react-router-dom';
import { Show } from '../types';

function DetailsScreen() {
  const location = useLocation();
  const { show } = location.state as { show: Show };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={show.image?.original || show.image?.medium || 'https://via.placeholder.com/680x1000'}
          alt={show.name}
          className="w-full h-96 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{show.name}</h1>
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: show.summary || 'No summary available' }}
          />
        </div>
      </div>
    </div>
  );
}

export default DetailsScreen;