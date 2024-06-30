import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchAllArtists } from "../redux/actions/artist";
import { fetchAllSongs } from "../redux/actions/song";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Chip, Stack } from "@mui/material";
import YouTube from 'react-youtube';
import ControlPanel from "../components/common/SongControllPannle"
import { useTheme } from "@mui/system";
import PauseIcon from "@mui/icons-material/Pause";
import CircularProgress from "@mui/material/CircularProgress";


const PlaylistDetails = () => {
    const { artistId } = useParams();
    const dispatch = useDispatch();
    const artists = useSelector((state) => state.artists.artists);
    const artist = artists.find((a) => a._id === artistId);
    const songs = useSelector((state) => state.songs.songs);
    const isLoadingArtists = useSelector((state) => state.artists.isLoading);
    const isLoadingSongs = useSelector((state) => state.songs.isLoading);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const theme = useTheme();
    const isDarkTheme = theme.palette.mode === 'dark';
    const [isVideoLoading, setIsVideoLoading] = useState(false)





    useEffect(() => {
        dispatch(fetchAllArtists());
        dispatch(fetchAllSongs());
        document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');

    }, [dispatch, isDarkTheme]);


    if (isLoadingArtists || isLoadingSongs) {
        // Handle loading state
        return <p>Loading...</p>;
    }

    if (!artist) {
        // Handle the case when Artist details are not available
        return <p>Artist not found.</p>;
    }

    // Filter songs based on the song IDs in the Artist
    const matchedSongs = songs.filter((song) =>
        song.artists.includes(artistId)
    );


    const handleVideoEnd = () => {
        // Callback function to play the next song when the video ends
        if (isRepeat) {
            // If repeat is enabled, replay the current song
            videoRef.current.internalPlayer.seekTo(0);
            videoRef.current.internalPlayer.playVideo();
        } else {
            setCurrentSongIndex((prevIndex) =>
                prevIndex < matchedSongs.length - 1 ? prevIndex + 1 : 0
            );
            setIsPlaying(true);
        }


        // Reset repeat state after playing the song in a loop
        if (isRepeat) {
            setTimeout(() => {
                setIsRepeat(false);
            }, 300); // Adjust the timeout duration as needed
        }
    };


    const playPauseHandler = () => {
        if (videoRef.current) {
            const internalPlayer = videoRef.current.getInternalPlayer();

            if (isPlaying) {
                internalPlayer.pauseVideo();
            } else {
                internalPlayer.playVideo();
            }

            setIsPlaying(!isPlaying);
        }
    };
    const handleStateChange = (event) => {
        // Update the play/pause icon based on the video state
        const playerState = event.data;

        if (playerState === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
            setIsVideoLoading(false); // Video is no longer loading
        } else if (playerState === window.YT.PlayerState.PAUSED || isPlaying === false) {
            setIsPlaying(false);
            setIsVideoLoading(false); // Video is no longer loading
        } else {
            setIsPlaying(false);
            setIsVideoLoading(true); // Video is loading or in another state
        }
    };




    return (
        <>
            <div className="playlist">
                <div className="playlistDetails">
                    <div className="ArtistDetailsImg">
                        <img
                            src={artist?.profilePhoto}
                            alt={artist?.name}
                        />
                    </div>
                    <div className="playlistDetailsContent">
                        <Chip
                            label={artist?.role}
                            variant="filled"
                            color="primary"
                            style={{ width: "fit-content" }}
                            id="playlistDetailsType"

                        />
                        <h1 >
                            {artist?.name}
                        </h1>
                        <div className="playlistMainDetails">
                            <Stack direction="row" spacing={1}>
                                <Chip
                                    label={`${matchedSongs?.length} Songs`}
                                    variant="filled"
                                    color="primary"
                                    style={{ width: "fit-content" }}

                                />
                                <Chip
                                    label={artist?.dob}
                                    variant="filled"
                                    color="primary"
                                    style={{ width: "fit-content" }}

                                />

                            </Stack>

                        </div>
                        <p >
                            {artist?.bio}
                        </p>
                        <div className="playlistDetailsContentMusicPlatform">
                            <h4>Listen On</h4>
                            <Stack direction="row" spacing={5} className="MusicPlatformIcons">
                                <Link to="https://youtube.com" className='musicPlatformIconsLink'>
                                    <img src="/images/spotify.png" alt="spotifyMusicIcon" />
                                </Link>
                                <Link to="https://youtube.com" className='musicPlatformIconsLink'>
                                    <img src="/images/appleMusic.svg" alt="appleMusicIcon" />
                                </Link>
                                <Link to="https://youtube.com" className='musicPlatformIconsLink'>
                                    <img src="/images/amazonMusic.png" alt="amazonMusicIcon" />
                                </Link>
                                <Link to="https://youtube.com" className='musicPlatformIconsLink'>
                                    <img src="/images/youtubeMusic.svg" alt="youtubeMusicIcon" />
                                </Link>
                            </Stack>
                        </div>
                    </div>
                </div>
                
                <div className="playlistSongs">
                   
                        <div className='playlistSongVideo'>
                            <YouTube
                                ref={videoRef}
                                videoId={matchedSongs[currentSongIndex]?.youtubeVideoId}
                                opts={{
                                    width: '100%',
                                    height: '500',
                                    playerVars: {
                                        autoplay: isPlaying ? 1 : 0,
                                        allow: 'picture-in-picture',
                                        // 'controls': 0, 
                                        'showinfo': 0,
                                        'rel': 0,
                                        'iv_load_policy': 3
                                    },
                                }}
                                className='songDetailsVideo-video'
                                data-theme={isDarkTheme ? 'dark' : 'light'}
                                onEnd={handleVideoEnd}
                                onStateChange={handleStateChange}





                            />
                        </div>
                        <div id="playlistSongs-songs" className='similarSongsSection'>
                            <div className="similarSongsList">
                                {matchedSongs.map((similarSong, index) => (

                                    <div id="playlistSimilarSongItem" className={`similarSongItem ${currentSongIndex === index ? 'currently-playing' : ''}`} key={index}>
                                        <div className='similarSongItem-songThumbnail' onClick={() => {
                                            setCurrentSongIndex(index);
                                            setIsPlaying(true);
                                        }}>
                                            <img src={similarSong?.thumbnail} alt={similarSong?.songName} className="thumbnail" id="playlistThumbnail"/>

                                            <div className="playPauseBtnSimilarSong" onClick={playPauseHandler}>
                                                {currentSongIndex === index && isVideoLoading ? (
                                                    <CircularProgress className="playPauseBtnLoader" style={{ color: isDarkTheme ? "white" : "black" }} size={30} />
                                                ) : (
                                                    <>
                                                        {currentSongIndex === index && isPlaying ? (
                                                            <PauseIcon />
                                                        ) : (
                                                            <PlayArrowIcon />
                                                        )}
                                                    </>
                                                )}
                                            </div>


                                        </div>
                                        <div className="similarSongItem-songDetails">
                                            <Link to={`/song/${similarSong?.songName}/${similarSong._id}`} onClick={() => setCurrentSongIndex(0)}>
                                                <p className="songName">{similarSong?.songName}</p>
                                                <p className="songName">{similarSong?.description}</p>
                                                <p className='songName'>{similarSong?.category} | {similarSong?.genre} | {similarSong?.type}</p>
                                            </Link>

                                        </div>

                                    </div>

                                ))}


                            </div>


                        </div>
                   
                </div>
            </div>
            <ControlPanel
                similarSongs={matchedSongs}
                videoRef={videoRef}
                currentSongIndex={currentSongIndex}
                setCurrentSongIndex={setCurrentSongIndex}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                isRepeat={isRepeat}
                setIsRepeat={setIsRepeat}
                isVideoLoading={isVideoLoading}
                isDarkTheme={isDarkTheme}

            />
        </>
    );
};

export default PlaylistDetails;
