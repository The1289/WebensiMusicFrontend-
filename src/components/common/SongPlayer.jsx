// SongPlayer.js

import React, { useEffect, useRef, useState } from 'react';
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import YouTube from 'react-youtube';
import { useTheme } from "@mui/system";
import { Button, Stack, Typography } from "@mui/material";


const SongPlayer = ({ songs }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';


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

  const nextSongHandler = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex < songs.length - 1 ? prevIndex + 1 : 0
    );
    setIsPlaying(true);
  };

  const prevSongHandler = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : songs.length - 1
    );
    setIsPlaying(true);
  };

  const onEndHandler = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex < songs.length - 1 ? prevIndex + 1 : 0
    );
    setIsPlaying(true);
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');

    if (videoRef.current) {
      videoRef.current.internalPlayer.playVideo();
    }

    if (videoRef.current) {
      videoRef.current.internalPlayer.addEventListener('onStateChange', (event) => {
        if (event.data === 0) {
          onEndHandler();
        }
      });
    }

    if (videoRef.current) {
      videoRef.current.internalPlayer.addEventListener('onStateChange', (event) => {
        if (event.data === 1) {
          setIsPlaying(true);
        } else if (event.data === 2) {
          setIsPlaying(false);
        }

        if (event.data === 0) {
          onEndHandler();
        }
      });
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.internalPlayer.removeEventListener('onStateChange', () => { });
      }
    };
  }, [songs, isDarkTheme]);

  return (
    <div className='songDetailsVideo'>
      <YouTube
        ref={videoRef}
        videoId={songs[currentSongIndex]?.youtubeVideoId}
        opts={{
          width: '100%',
          height: '700',
          playerVars: {
            autoplay: isPlaying ? 1 : 0,
            allow: 'picture-in-picture',
          },
        }}
        onEnd={onEndHandler}
        className='songDetailsVideo-video'
        data-theme={isDarkTheme ? 'dark' : 'light'}
      />
      <Stack direction="row" spacing={1}>
        <Button onClick={prevSongHandler}>
          <SkipPreviousIcon />
        </Button>
        <Button onClick={playPauseHandler}>
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </Button>
        <Button onClick={nextSongHandler}>
          <SkipNextIcon />
        </Button>
      </Stack>

      <div className='similarSongsSection'>
        <Typography
          variant="h6"
          fontSize={{ xs: "1.5rem", md: "2rem", lg: "2rem" }}
          fontWeight="700"
        >
          Similar Songs
        </Typography>
        <div className="similarSongsList">
          {songs.map((song, index) => (
            <div className="similarSongItem" key={index}>
              <div className='similarSongItem-songThumbnail'>
                <img src={song?.thumbnail} alt={song?.songName} className="thumbnail" />
              </div>
              <div className="similarSongItem-songDetails">
                <p className="songName">{song?.songName}</p>
                <p className="songName">{song?.description}</p>
                <p className='songName'>{song?.category} | {song?.genre} | {song?.type}</p>


              </div>

            </div>
          ))}


        </div>

      </div>

    </div>
  );
};

export default SongPlayer;
