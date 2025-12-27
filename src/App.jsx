import './App.css'

import { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=hu`
      );
      
      if (!response.ok) {
        throw new Error('Város nem található');
      }
      
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          ☀️ Időjárás
        </h1>
        
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Írd be a város nevét..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Keresés
            </button>
          </div>
        </form>

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {weather && !loading && (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800">{weather.name}</h2>
              <p className="text-gray-600">{weather.sys.country}</p>
            </div>
            
            <div className="text-center py-4">
              <div className="text-6xl font-bold text-blue-600">
                {Math.round(weather.main.temp)}°C
              </div>
              <p className="text-xl text-gray-600 capitalize mt-2">
                {weather.weather[0].description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="text-center">
                <p className="text-gray-600 text-sm">Páratartalom</p>
                <p className="text-xl font-semibold">{weather.main.humidity}%</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-sm">Szél</p>
                <p className="text-xl font-semibold">{Math.round(weather.wind.speed)} km/h</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;