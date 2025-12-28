import { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      
      // Aktuális időjárás
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=hu`
      );
      
      if (!weatherResponse.ok) {
        throw new Error('Város nem található');
      }
      
      const weatherData = await weatherResponse.json();
      setWeather(weatherData);
      
      // 5 napos előrejelzés
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=hu`
      );
      
      const forecastData = await forecastResponse.json();
      
      // Szűrjük ki a napi előrejelzéseket (12:00-kor)
      const dailyForecasts = forecastData.list.filter(item => 
        item.dt_txt.includes('12:00:00')
      ).slice(0, 5);
      
      setForecast(dailyForecasts);
      
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  const getDayName = (dateString) => {
    const days = ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'];
    const date = new Date(dateString);
    return days[date.getDay()];
  };

  const getWeatherIcon = (description) => {
    const icons = {
      'tiszta égbolt': '☀️',
      'kevés felhő': '🌤️',
      'szétszórt felhők': '⛅',
      'erősen felhős': '☁️',
      'törött felhőzet': '☁️',
      'záporeső': '🌧️',
      'eső': '🌧️',
      'zivatar': '⛈️',
      'hó': '❄️',
      'köd': '🌫️'
    };
    
    for (let key in icons) {
      if (description.includes(key)) {
        return icons[key];
      }
    }
    return '🌤️';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 max-w-4xl w-full">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
          ☀️ Időjárás
        </h1>
        
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex flex-col sm:flex-row gap-2">
            <input 
              type="text" 
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Írd be a város nevét..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition w-full sm:w-auto"
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
          <div className="space-y-6">
            {/* Aktuális időjárás */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 sm:p-6">
              <div className="text-center mb-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">{weather.name}</h2>
                <p className="text-gray-600">{weather.sys.country}</p>
              </div>
              
              <div className="text-center py-4">
                <div className="text-5xl sm:text-6xl md:text-7xl mb-2">
                  {getWeatherIcon(weather.weather[0].description)}
                </div>
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-blue-600">
                  {Math.round(weather.main.temp)}°C
                </div>
                <p className="text-lg sm:text-xl text-gray-600 capitalize mt-2">
                  {weather.weather[0].description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-200">
                <div className="text-center">
                  <p className="text-gray-600 text-sm">Páratartalom</p>
                  <p className="text-lg sm:text-xl font-semibold text-gray-700">{weather.main.humidity}%</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 text-sm">Szél</p>
                  <p className="text-lg sm:text-xl font-semibold text-gray-700">{Math.round(weather.wind.speed)} km/h</p>
                </div>
              </div>
            </div>

            {/* 5 napos előrejelzés */}
            {forecast && forecast.length > 0 && (
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">5 napos előrejelzés</h3>
                {/* Mobilon scrollozható, nagyobb képernyőn grid */}
                <div className="overflow-x-auto pb-2">
                  <div className="flex sm:grid sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3 min-w-max sm:min-w-0">
                    {forecast.map((day, index) => (
                      <div 
                        key={index}
                        className="bg-white rounded-lg p-3 sm:p-4 text-center shadow-md hover:shadow-lg transition min-w-[100px] sm:min-w-0"
                      >
                        <p className="font-semibold text-gray-700 text-xs sm:text-sm mb-2">
                          {getDayName(day.dt_txt)}
                        </p>
                        <div className="text-2xl sm:text-3xl mb-2">
                          {getWeatherIcon(day.weather[0].description)}
                        </div>
                        <p className="text-xl sm:text-2xl font-bold text-blue-600">
                          {Math.round(day.main.temp)}°C
                        </p>
                        <p className="text-xs text-gray-500 mt-1 capitalize line-clamp-2">
                          {day.weather[0].description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;