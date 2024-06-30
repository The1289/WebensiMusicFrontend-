import { configureStore } from "@reduxjs/toolkit";
import appStateSlice from "./features/appStateSlice";
import authModalSlice from "./features/authModalSlice";
import globalLoadingSlice from "./features/globalLoadingSlice";
import themeModeSlice from "./features/themeModeSlice";
import { songReducer } from './reducers/song';
import { artistReducer } from "./reducers/artist";
import { playlistReducer } from "./reducers/playlist";
import { userReducer } from "./reducers/user";




const store = configureStore({
  reducer: {
    themeMode: themeModeSlice,
    authModal: authModalSlice,
    globalLoading: globalLoadingSlice,
    appState: appStateSlice, 
    songs: songReducer, 
    artists: artistReducer, 
    playlists: playlistReducer,
    user: userReducer,
  
     
  }
});

export default store;