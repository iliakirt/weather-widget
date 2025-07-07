import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WeatherCard({ weather, unit, isFavorite, onToggleFavorite }) {


    return (
        <div className="bg-amber-100 rounded-2xl shadow-lg p-6 w-80 text-center mt-6">
            <h2 className="text-xl font-bold mb-2">{weather.name}</h2>
            <p className="text-4xl font-semibold mb-2">
                {Math.floor(weather.main.temp)}{unit === 'metric' ? '°C' : '°F'}
            </p>
            <p className="text-gray-600 capitalize">{weather.weather[0].description}</p>
            <p className="text-sm mt-2">Humidity: {weather.main.humidity}%</p>
            <p className="text-sm mb-2">Wind: {weather.wind.speed} m/s</p>
            <div className="bg-blue-200 rounded-md p-2 text-center mt-6 w-24 h-24 mx-auto flex items-center justify-center">
                <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt="weather icon"
                    className="mx-auto"
                />
            </div>

            <motion.button
                onClick={onToggleFavorite}
                whileTap={{ scale: 1.2 }}
                animate={{ scale: isFavorite ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="mt-4">
                <Heart
                    color={isFavorite ? 'red' : 'gray'}
                    fill={isFavorite ? 'red' : 'none'}
                    size={28}
                />
            </motion.button>
        </div>

    )
}