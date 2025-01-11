import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import HomeScreen from './components/HomeScreen';
import SearchScreen from './components/SearchScreen';
import DetailsScreen from './components/DetailsScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/search" element={<SearchScreen />} />
        <Route path="/details/:id" element={<DetailsScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;