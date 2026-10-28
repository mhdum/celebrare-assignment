import { useState, useReducer, useCallback, useMemo } from "react";
import { useFetchPhotos } from "../hooks/useFetchPhoto";
import {
  favoritesReducer,
  initFavorites,
  TOGGLE_FAVORITE,
} from "../reducers/favoritesReducer";

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos();
  const [searchTerm, setSearchTerm] = useState("");

  const [favorites, dispatch] = useReducer(favoritesReducer, [], initFavorites);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const filteredPhotos = useMemo(() => {
    if (!searchTerm.trim()) return photos;
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(searchTerm.toLowerCase().trim()),
    );
  }, [photos, searchTerm]);

  const toggleFavorite = (id) => {
    dispatch({ type: TOGGLE_FAVORITE, payload: id });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Photo Gallery</h1>

        <div className="max-w-md mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by author name..."
            className="w-full px-4 py-2 border border-gray-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
          />
        </div>
      </header>

      {loading && (
        <div className="flex flex-col items-center justify-center min-h-75">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-gray-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading photos...</p>
        </div>
      )}

      {error && !loading && (
        <div className="max-w-md mx-auto p-4 bg-red-50 border border-red-300 rounded-lg text-red-700 text-center">
          <p className="font-semibold">Error</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          {filteredPhotos.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              No photos match your search.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredPhotos.map((photo) => {
                const isFavorite = favorites.includes(photo.id);

                return (
                  <div
                    key={photo.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 flex flex-col"
                  >
                    <div className="relative aspect-video bg-gray-200">
                      <img
                        src={`https://picsum.photos/id/${photo.id}/400/300`}
                        alt={`Photo by ${photo.author}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    <div className="p-4 flex items-center justify-between mt-auto">
                      <span className="text-sm font-medium text-gray-800 truncate pr-2">
                        {photo.author}
                      </span>

                      {/* Heart Icon Button */}
                      <button
                        onClick={() => toggleFavorite(photo.id)}
                        aria-label="Toggle favourite"
                        className="p-1.5 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`w-6 h-6 transition-colors ${
                            isFavorite
                              ? "text-red-500 fill-red-500"
                              : "text-gray-400 hover:text-gray-600 fill-none"
                          }`}
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
