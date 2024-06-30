import React, { useRef, useState, useEffect } from 'react';
import {
    Button,
    Box,
    Stack,
} from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import RepeatIcon from '@mui/icons-material/Repeat';
import RepeatOneIcon from '@mui/icons-material/RepeatOne';
import ShareIcon from '@mui/icons-material/Share';
import Slider from '@mui/material/Slider';
import CircularProgress from "@mui/material/CircularProgress";


const ControlPanel = ({
    similarSongs,
    videoRef,
    currentSongIndex,
    setCurrentSongIndex,
    isPlaying, setIsPlaying,
    isRepeat, setIsRepeat,
    isVideoLoading,
    isDarkTheme


}) => {

    const [volume, setVolume] = useState(100);

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


    const prevSongHandler = () => {
        setCurrentSongIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : similarSongs.length - 1
        );
        setIsPlaying(true);
    };

    const nextSongHandler = () => {
        setCurrentSongIndex((prevIndex) =>
            prevIndex < similarSongs.length - 1 ? prevIndex + 1 : 0
        );
        setIsPlaying(true);

    };





    const handleVolumeChange = (event, newValue) => {
        if (videoRef.current) {
            const internalPlayer = videoRef.current.getInternalPlayer();
            internalPlayer.setVolume(newValue);
            setVolume(newValue);
        }
    };

    const handleMute = () => {
        if (volume === 0) {
            setVolume(100);
        } else {
            setVolume(0);
        }
    };

    const toggleRepeat = () => {
        setIsRepeat(!isRepeat);
    };

    useEffect(() => {
        // document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
        const handleVolumeChangeYouTube = (event) => {
            setVolume(event.target.getVolume());

        };
        if (videoRef.current) {
            videoRef.current.internalPlayer.addEventListener('onVolumeChange', handleVolumeChangeYouTube);
        }

        if (videoRef.current) {
            videoRef.current.internalPlayer.playVideo();
        }
        if (videoRef.current) {
            videoRef.current.internalPlayer.addEventListener('onStateChange', (event) => {
                // Check if the video is playing (state code 1) or paused (state code 2)
                if (event.data === 1) {
                    setIsPlaying(true);
                } else if (event.data === 2) {
                    setIsPlaying(false);
                }

            });
        }


        return () => {
            // Cleanup the event listener when the component is unmounted
            if (videoRef.current) {
                videoRef.current.internalPlayer.removeEventListener('onStateChange', () => { });
            }
            if (videoRef.current) {
                videoRef.current.internalPlayer.removeEventListener('onVolumeChange', handleVolumeChangeYouTube);
            }
        };
    }, [videoRef]);

    return (
        <div className="sticky-control-panel">
            <div className="current-playing-song">
                <img
                    src={similarSongs[currentSongIndex]?.thumbnail}
                    alt={similarSongs[currentSongIndex]?.songName}
                    className="ControlPanel-thumbnail"
                />
                <div className="ContrPan-song-details">
                    <p className="ControlPanel-song-name animated-text" style={{ fontWeight: "600" }}>{similarSongs[currentSongIndex]?.songName}</p>
                    <p className="ControlPanel-songDetails animated-text">
                        {similarSongs[currentSongIndex]?.category} | {similarSongs[currentSongIndex]?.genre} | {similarSongs[currentSongIndex]?.type}
                    </p>
                </div>
            </div>

            {/* Control buttons */}
            <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                <Button onClick={prevSongHandler}>
                    <SkipPreviousIcon />
                </Button>
                {isVideoLoading ? (
                    <Button>
                        <CircularProgress className="playPauseBtnLoader" style={{ color: isDarkTheme ? "white" : "black" }}  size={24}/>
                    </Button>
                ) : (

                    <>

                        <Button onClick={playPauseHandler}>
                            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                        </Button>
                    </>
                )}
                <Button onClick={nextSongHandler}>
                    <SkipNextIcon />
                </Button>
            </Stack>
            <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" className='controllPannelRightBtns'>
                {/* Sound Control */}
                <Box className="slider-box" sx={{ width: 100 }} >
                    <Slider
                        value={volume}
                        onChange={handleVolumeChange}
                        aria-labelledby="continuous-slider"
                    />
                </Box>
                <Button onClick={handleMute} >
                    {volume === 0 ? <VolumeOffIcon /> : <VolumeUpIcon />}
                </Button>

                {/* Add your custom song control buttons here */}
                <Button onClick={toggleRepeat}>
                    {isRepeat ? <RepeatOneIcon /> : <RepeatIcon />}
                </Button>

                {/* Share Button */}
                <Button >
                    <ShareIcon />
                </Button>
            </Stack>
        </div >
    );
};

export default ControlPanel;
