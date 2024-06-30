import { useEffect } from "react";
import { SwiperSlide } from "swiper/react";
import { fetchAllSongs } from "../../redux/actions/song";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPlaylists } from "../../redux/actions/playlist"
import SwiperCore, { Navigation } from "swiper/core";
import { Swiper } from "swiper/react";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useTheme } from "@mui/system";
import { fetchAllArtists } from '../../redux/actions/artist';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow, FreeMode, Autoplay, Grid } from 'swiper/core';
import 'swiper/css/free-mode';
import { updateLocalStorageOnSongClick } from '../../utils/localStorageUtils'
import { getRecentlyWatchedSongsInLast7Days } from '../../utils/localStorageUtils'


SwiperCore.use([Navigation, EffectCoverflow, FreeMode, Autoplay, Grid]);

const MediaSlide = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs.songs);
  const playlists = useSelector((state) => state.playlists.playlists);
  const artists = useSelector((state) => state.artists.artists);
  const isLoadingSongs = useSelector((state) => state.songs.isLoading);
  const isLoadingPlaylists = useSelector((state) => state.playlists.isLoading);
  const isLoadingArtists = useSelector((state) => state.artists.isLoading);
  const recentlyWatchedSongs = getRecentlyWatchedSongsInLast7Days().slice(0, 40);

  const theme = useTheme();
  useEffect(() => {
    dispatch(fetchAllSongs());
    dispatch(fetchAllPlaylists());
    dispatch(fetchAllArtists());
  }, [dispatch]);

  if (isLoadingSongs || isLoadingPlaylists || isLoadingArtists) {
    // Handle loading state for both songs and playlists
    return <p>Loading...</p>
  }


  const handleSongClick = (song) => {
    updateLocalStorageOnSongClick(song);
    // Additional logic for handling song click on this page...
  };

  const newReleaseSongs = songs
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 30);



  const breakpoints = {
    // when window width is >= 320px
    280: {
      slidesPerView: 4,
    },
    
    850: {
      slidesPerView: 5,
    },
   
  };



  return (
    <div> 

      <div className="RecentlyWatchedSongs">
        <h2>Recently Watched</h2>
        <div className="recentlyWatchedSongList">
          {recentlyWatchedSongs.map(({ song, timestamp }) => (
            <div key={song._id} className="recetnlyPlayedSong">
              {/* Render recently watched song content */}
              <Link to={`/song/${song?.songName}/${song?._id}`} className="recetnlyPlayedSongContent">
                <div className='recently-songThumbnail'>
                  <img src={song?.thumbnail} alt={song?.songName} className="thumbnail" />
                </div>
                <div className="recently-songDetails">
                  <p className="recetnlyPlayedSongDetails-details">{song?.songName}</p>
                  <p className="recetnlyPlayedSongDetails-details">{song?.description}</p>
                  <p className='recetnlyPlayedSongDetails-details'>{song?.category} | {song?.genre} | {song?.type}</p>


                </div>
              </Link>
            </div>
          ))}

        </div>
      </div>
      <div className="NewReleaseSong"> 
        <h2>New Releases</h2>
        <Swiper breakpoints={breakpoints} grabCursor={true} navigation cssMode={true}  spaceBetween={15}>
          {newReleaseSongs.map((song) => (
            <SwiperSlide key={song._id}>
              <Link to={`/song/${song?.songName}/${song?._id}`} className="song-link" style={{ color: theme.palette.mode === "light" ? "black" : "white" }} onClick={() => handleSongClick(song)}>
                <div className="image-container">
                  <img
                    src={song?.thumbnail}
                    alt={song?.songName}
                    className="thumbnail-image"
                  />
                  <div className="overlay"></div>
                  <div className="play-icon">
                    <PlayArrowIcon />
                  </div>
                </div>
                <h6>{song?.songName}</h6>
                <p>{song?.category} | {song?.genre} | {song?.type}</p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="NewReleaseSong">
        <h2>Popular Songs</h2>
        <Swiper effect={'coverflow'}
         spaceBetween={15}
          grabCursor={true}
          slidesPerView={'3'}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          loop={true}
          modules={[EffectCoverflow, Autoplay]}>
          {newReleaseSongs.map((song) => (
            <SwiperSlide key={song._id}>
              <Link to={`/song/${song?.songName}/${song?._id}`} className="song-link" style={{ color: theme.palette.mode === "light" ? "black" : "white" }}>
                <div className="popularImage-container">
                  <img
                    src={song?.thumbnail}
                    alt={song?.songName}
                    className="popularImage-image"
                  />

                </div>
                <h6>{song?.songName}</h6>
                <p>{song?.category} | {song?.genre} | {song?.type}</p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="NewReleaseSong">
        <h2>Trending Now</h2>
        <Swiper
          spaceBetween={15}
          centeredSlides={true}
          grabCursor={true}
          slidesPerView={'2'}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Autoplay]}>
          {newReleaseSongs.map((song) => (
            <SwiperSlide key={song._id}>
              <Link to={`/song/${song?.songName}/${song?._id}`} className="song-link" style={{ color: theme.palette.mode === "light" ? "black" : "white" }}>
                <div className="trendingImage-container">
                  <img
                    src={song?.thumbnail}
                    alt={song?.songName}
                    className="trendingImage-image"
                  />

                </div>
                <h6>{song?.songName}</h6>
                <p>{song?.category} | {song?.genre} | {song?.type}</p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>






      {/* Playlists Swiper */}
      <div className="PlaylistSwiper">
        <h2>Top Playlists</h2>
        <Swiper breakpoints={breakpoints} grabCursor={true} navigation cssMode={true}  spaceBetween={15}>
          {playlists.map((playlist) => (
            <SwiperSlide key={playlist?._id}>
              <Link to={`/playlist/${playlist?.playlistName}/${playlist?._id}`} className="playlist-link" style={{ color: theme.palette.mode === "light" ? "black" : "white" }}>
                <div className="image-container">
                  <img
                    src={playlist?.thumbnail}
                    alt={playlist?.playlistName}
                    className="thumbnail-image"
                  />
                  <div className="overlay"></div>
                  <div className="play-icon">
                    <PlayArrowIcon />
                  </div>
                </div>
                <h6>{playlist?.playlistName}</h6>
                <p>{playlist?.category} | {playlist?.genre} | {playlist?.type}</p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="PlaylistSwiper">
        <h2>Top Charts</h2>
        <Swiper slidesPerView="5" grabCursor={true} navigation cssMode={true} spaceBetween={15}>
          {playlists
            .filter((playlist) => playlist?.category === "Top Charts") 
            .map((playlist) => (
              <SwiperSlide key={playlist?._id}>

                <Link to={`/playlist/${playlist?.playlistName}/${playlist?._id}`} className="playlist-link" style={{ color: theme.palette.mode === "light" ? "black" : "white" }}>
                  <div className="image-container">
                    <img
                      src={playlist?.thumbnail}
                      alt={playlist?.playlistName}
                      className="thumbnail-image"
                    />
                    <div className="overlay"></div>
                    <div className="play-icon">
                      <PlayArrowIcon />
                    </div>
                  </div>
                  <h6>{playlist?.playlistName}</h6>
                  <p>{playlist?.category} | {playlist?.genre} | {playlist?.type}</p>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className="PlaylistSwiper">
        <h2>Top Albums</h2>
        <Swiper slidesPerView="5" grabCursor={true} navigation cssMode={true} spaceBetween={15}>
          {playlists
            .filter((playlist) => playlist?.type === "Album") 
            .map((playlist) => (
              <SwiperSlide key={playlist?._id}>
               
                <Link to={`/playlist/${playlist?.playlistName}/${playlist?._id}`} className="playlist-link" style={{ color: theme.palette.mode === "light" ? "black" : "white" }}>
                  <div className="image-container">
                    <img
                      src={playlist?.thumbnail}
                      alt={playlist?.playlistName}
                      className="thumbnail-image"
                    />
                    <div className="overlay"></div>
                    <div className="play-icon">
                      <PlayArrowIcon />
                    </div>
                  </div>
                  <h6>{playlist?.playlistName}</h6>
                  <p>{playlist?.category} | {playlist?.genre} | {playlist?.type}</p>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      {/* Artist Swiper  */}
      <div className="ArtistsSwiper">
        <h2>Artists</h2>
        <Swiper breakpoints={breakpoints} grabCursor={true} navigation cssMode={true} spaceBetween={15}>
          {artists.map((artist) => (
            <SwiperSlide key={artist?._id}>
              {/* Render playlist content here */}
              <Link to={`/artist/${artist?.name}/${artist?._id}`} className="artist-link" style={{ color: theme.palette.mode === "light" ? "black" : "white" }}>
                <div className="artist-container">
                  <img
                    src={artist?.profilePhoto}
                    alt={artist?.name}
                    className="artist-imageHome"
                    id="artistImageHome"
                  />


                </div>
                <h6>{artist?.name}  </h6>
                <h6>( {artist?.role} )  </h6>

              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MediaSlide;
