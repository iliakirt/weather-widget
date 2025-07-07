
export default function Favorites({ favorites, onRemove, onSelectCity }) {
    return (
        <div className="mt-8 w-full">
            <h3 className="text-xl font-semibold mb-4">⭐ Favorite Cities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {favorites.map((city) => (
                    <div
                        key={city.id}
                        className="bg-white rounded-xl shadow p-4 flex justify-between items-center hover:bg-blue-50"
                    >
                        <p
                            onClick={() => onSelectCity(city.name)}
                            className="cursor-pointer font-medium text-blue-600 hover:underline"
                        >
                            {city.name}
                        </p>
                        <button
                            onClick={() => onRemove(city.name)}
                            className="text-red-500 hover:text-red-700"
                        >
                            🗑️
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
