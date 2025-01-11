import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <img
        src="https://cdn-icons-png.flaticon.com/512/2503/2503508.png"
        alt="TV Shows App"
        className="w-32 h-32"
      />
      <h1 className="text-2xl font-bold mt-4">TV Shows App</h1>
    </div>
  );
}

export default SplashScreen;