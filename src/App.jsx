import { useState, useEffect } from "react"
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Favorites from "./components/Favorites";

export default function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [unit, setUnit] = useState('metric');
    const [lastCity, setLastCity] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchWeather = async (city) => {
        setLoading(true);
        setError('');

        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=c519efca0095ac7927219988f3d29e20`);
            const data = await res.json();

            if (data.cod === "404") {
                throw new Error("City not found");
            }
            console.log(data);
            setWeatherData(data);
            setLastCity(city);
        } catch (err) {
            console.error(err.message);
            setWeatherData(null); // clear previous result
            setError(err.message); // see below
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (lastCity) {
            fetchWeather(lastCity);
        }
    }, [unit]);

    const removeFavorite = (name) => {
        const updated = favorites.filter(fav => fav.name !== name);
        setFavorites(updated);
        localStorage.setItem("favorites", JSON.stringify(updated));
    };

    const toggleFavorite = () => {
        if (!weatherData) return;
        const exists = favorites.some(f => f.name === weatherData.name);
        let updated;
        if (exists) {
            updated = favorites.filter(f => f.name !== weatherData.name);
        } else {
            updated = [...favorites, weatherData];
        }
        setFavorites(updated);
        localStorage.setItem("favorites", JSON.stringify(updated));
    };

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(stored);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex flex-col items-center px-4 py-8 text-gray-800">
            <div className="w-full max-w-screen-md space-y-6">

                <h1 className="text-3xl font-bold text-blue-600 text-center">Weather App</h1>

                <SearchBar onSearch={fetchWeather} />

                {loading && <p className="text-sm text-blue-700 text-center">Loading...</p>}
                {error && <p className="text-sm text-red-600 text-center">{error}</p>}

                {weatherData && (
                    <div className="flex justify-center">
                        <WeatherCard
                            weather={weatherData}
                            unit={unit}
                            isFavorite={favorites.some(f => f.name === weatherData.name)}
                            onToggleFavorite={toggleFavorite}
                        />
                    </div>
                )}

                <div className="text-center">
                    <button
                        onClick={() => setUnit(unit === 'metric' ? 'imperial' : 'metric')}
                        className="mt-2 bg-white px-4 py-2 rounded shadow hover:bg-gray-200"
                    >
                        Switch to {unit === 'metric' ? '°F' : '°C'}
                    </button>
                </div>

                <Favorites
                    favorites={favorites}
                    unit={unit}
                    onRemove={removeFavorite}
                    onSelectCity={fetchWeather}
                />

            </div>
        </div>
    );
}
