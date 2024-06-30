// localStorageUtils.js
export const updateLocalStorageOnSongClick = (song) => {
    const recentlyWatched = JSON.parse(localStorage.getItem('recentlyWatched')) || [];
    const timestamp = new Date().getTime();
  
    // Check if the song is already in the recentlyWatched list
    const isSongAlreadyWatched = recentlyWatched.some((entry) => entry.song._id === song._id);
  
    if (!isSongAlreadyWatched) {
      recentlyWatched.unshift({ song, timestamp });
  
      // Keep only the first 40 recently watched songs
      const trimmedRecentlyWatched = recentlyWatched.slice(0, 40);
  
      localStorage.setItem('recentlyWatched', JSON.stringify(trimmedRecentlyWatched));
    }
  };


  export const getRecentlyWatchedSongs = () => {
    const recentlyWatched = JSON.parse(localStorage.getItem('recentlyWatched')) || [];
    return recentlyWatched;
  };
  


  export const getRecentlyWatchedSongsInLast7Days = () => {
    const recentlyWatched = getRecentlyWatchedSongs();
    const now = new Date().getTime();
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
  
    return recentlyWatched.filter((entry) => entry.timestamp >= sevenDaysAgo);
  };
  