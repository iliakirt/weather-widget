import { useState } from "react"
import search_icon from '../assets/search.png'

export default function SearchBar(props) {
    const [inputSearch, setInputSearch] = useState('');


    return (
        <div>
            <form
                className="flex items-center justify-center gap-2 mt-6"
                onSubmit={(e) => {
                    e.preventDefault();
                    props.onSearch(inputSearch);
                    setInputSearch('');
                }}>
                <input
                    type="search"
                    value={inputSearch}
                    onChange={(e) => setInputSearch(e.target.value)}
                    placeholder="Enter city name..."
                    className="px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-64"
                />
                <img
                    className="w-6 h-6 cursor-pointer hover:scale-110 transition"
                    alt="search"
                    src={search_icon}
                    onClick={() => {
                        props.onSearch(inputSearch);
                        setInputSearch('');
                    }} />
            </form>
        </div>
    )
}