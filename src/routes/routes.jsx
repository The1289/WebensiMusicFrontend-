import HomePage from "../pages/HomePage";
import PersonDetail from "../pages/PersonDetail";
import FavoriteList from "../pages/FavoriteList";
import MediaDetail from "../pages/MediaDetail";
import MediaList from "../pages/MediaList";
import MediaSearch from "../pages/MediaSearch";
import PasswordUpdate from "../pages/PasswordUpdate";
import ReviewList from "../pages/ReviewList";
import ProtectedPage from "../components/common/ProtectedPage";
import SongDetails from "../pages/SongDetails"
import PlaylistDetails from "../pages/PlaylistDetails";
import ArtistDetails from "../pages/ArtistDetails"
import Artists from "../pages/Artist"
import Genre from "../pages/Genre"
import ContactUs from "../pages/ContactUs"
import AboutUs from "../pages/AboutUs";
import Policies from "../pages/Policies"


export const routesGen = {
  home: "/",
  mediaList: (type) => `/${type}`,
  mediaDetail: (type, id) => `/${type}/${id}`,
  mediaSearch: "/search",
  person: (id) => `/person/${id}`,
  favoriteList: "/favorites",
  reviewList: "/reviews",
  passwordUpdate: "password-update",


};

const routes = [
  {
    index: true,
    element: <HomePage />,
    state: "home"
  },
  {
    path: "/person/:personId",
    element: <PersonDetail />,
    state: "person.detail"
  },
  {
    path: "/search",
    element: <MediaSearch />,
    state: "search"
  },
  {
    path: "/password-update",
    element: (
      <ProtectedPage>
        <PasswordUpdate />
      </ProtectedPage>
    ),
    state: "password.update"
  },
  {
    path: "/favorites",
    element: (
      <ProtectedPage>
        <FavoriteList />
      </ProtectedPage>
    ),
    state: "favorites"
  },
  {
    path: "/reviews",
    element: (
      <ProtectedPage>
        <ReviewList />
      </ProtectedPage>
    ),
    state: "reviews"
  },
  {
    path: "/:mediaType",
    element: <MediaList />
  },
  {
    path: "/:mediaType/:mediaId",
    element: <MediaDetail />
  },

  {
    path: "/song/:songName/:songId",
    element: <SongDetails />,
    state: "song.details"
  },
  {
    path: "/playlist/:playlistName/:playlistId",
    element: <PlaylistDetails />,
    state: "playlist.details"
  },
  {
    path: "/artist/:artistName/:artistId",
    element: <ArtistDetails />,
    state: "artist.details"
  },
  {
    path: "/artists",
    element: <Artists />,
    state: "artists"
  },
  {
    path: "/genre/:genreName",
    element: <Genre />,
    state: "genre"
  },

  {
    path: "/contact",
    element: <ContactUs />,
    state: "contact"
  },

 {
    path: "/about",
    element: <AboutUs />,
    state: "about"
  },

 {
    path: "/policies",
    element: <Policies />,
    state: "policies"
  },




];

export default routes;