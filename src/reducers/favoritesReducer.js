export const FAVORITES_STORAGE_KEY = 'photo_gallery_favorites';

// Action types
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';

// Initial state reads directly from localStorage to prevent initial overwrite
export const initFavorites = () => {
  try {
    const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    console.error('Error reading from localStorage', err);
    return [];
  }
};

// Reducer function
export const favoritesReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE: {
      const photoId = action.payload;
      const isFav = state.includes(photoId);
      const updatedFavorites = isFav
        ? state.filter((id) => id !== photoId)
        : [...state, photoId];

      // Persist to localStorage
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updatedFavorites));
      return updatedFavorites;
    }
    default:
      return state;
  }
};