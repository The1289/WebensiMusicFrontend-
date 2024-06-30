import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "@mui/system";
import { fetchAllSongs } from '../redux/actions/song';
import PauseIcon from "@mui/icons-material/Pause";
import CircularProgress from "@mui/material/CircularProgress";
import ControlPanel from "../components/common/SongControllPannle"
import YouTube from 'react-youtube';
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const MediaSlide = () => {
    const { genreName } = useParams();
    const dispatch = useDispatch();
    const songs = useSelector((state) => state.songs.songs);
    const isLoadingSongs = useSelector((state) => state.songs.isLoading);
    const theme = useTheme();
    const isDarkTheme = theme.palette.mode === 'dark';
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [isVideoLoading, setIsVideoLoading] = useState(false)
    useEffect(() => {
        dispatch(fetchAllSongs());
        document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
    }, [dispatch, isDarkTheme]);

    if (isLoadingSongs) {

        return <p>Loading...</p>
    }


    const matchedSongs = genreName
        ? songs.filter((song) => song.genre === genreName)
        : songs;

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
        <div>
            <div className="playlistSongs">
                <h2>{genreName}</h2>
                <div id="genreSongPage">
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

                                <div className={`similarSongItem ${currentSongIndex === index ? 'currently-playing' : ''}`} key={index}>
                                    <div className='similarSongItem-songThumbnail' onClick={() => {
                                        setCurrentSongIndex(index);
                                        setIsPlaying(true);
                                    }}>
                                        <img src={similarSong?.thumbnail} alt={similarSong?.songName} className="thumbnail" />

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
        </div>

    );
};

export default MediaSlide;
