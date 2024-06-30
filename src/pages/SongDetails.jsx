import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllSongs } from '../redux/actions/song';
import { fetchAllArtists } from '../redux/actions/artist';
import ImageHeader from "../components/common/ImageHeader";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Button, Chip, Stack, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";
import uiConfigs from "../configs/ui.configs";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTheme } from "@mui/system";
import YouTube from 'react-youtube';
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import RepeatIcon from '@mui/icons-material/Repeat';
import RepeatOneIcon from '@mui/icons-material/RepeatOne';
import ShareIcon from '@mui/icons-material/Share';
import Slider from '@mui/material/Slider';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import CopyToClipboard from 'react-copy-to-clipboard';


const SongDetails = () => {
    const { songId } = useParams();
    const dispatch = useDispatch();
    const theme = useTheme();
    const videoRef = useRef(null);
    const isDarkTheme = theme.palette.mode === 'dark';
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const navigate = useNavigate()
    const [volume, setVolume] = useState(100);
    const [isRepeat, setIsRepeat] = useState(false);
    const [openShareDialog, setOpenShareDialog] = useState(false);
    const [copied, setCopied] = useState(false);
    const [viewOption, setViewOption] = useState('similarSongs');

    const handleViewChange = (event, newView) => {
        if (newView !== null) {
            setViewOption(newView);
        }
    };
    const handleCopyLink = () => {
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1500); // Set the duration for which the "Copied!" message is displayed
    };

    const handleOpenShareDialog = () => {
        setOpenShareDialog(true);
    };

    const handleCloseShareDialog = () => {
        setOpenShareDialog(false);
    };


    const handleShareButtonClick = (platform) => {
        // Implement share logic for each platform
        switch (platform) {
            case 'facebook':
                const facebookAppId = '868258688273039';
                // Replace other parameters with your own data
                const facebookShareUrl = `https://www.facebook.com/dialog/share?app_id=${facebookAppId}&display=popup&href=${encodeURIComponent(songUrl)}&redirect_uri=${encodeURIComponent(songUrl)}`;
                window.open(facebookShareUrl, '_blank');
                break;
            case 'whatsapp':
                // Replace the text and URL with the actual content you want to share
                window.open(`https://wa.me/?text=${encodeURIComponent(`Check out this awesome song: ${songUrl}`)}`, '_blank');
                break;
            case 'instagram':
                // Add your Instagram share logic here (Note: Instagram sharing may require additional steps)
                console.log('Instagram share clicked');
                break;
            case 'twitter':
                // Replace the text and URL with the actual content you want to share
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this awesome song: ${songUrl}`)}`, '_blank');
                break;
            case 'email':
                // Replace the email, subject, and body with the actual content you want to share
                songUrl = `mailto:?subject=Check%20out%20this%20awesome%20song&body=Hey,%20I%20found%20this%20amazing%20song%20and%20wanted%20to%20share%20it%20with%20you:%20${songUrl}`;
                break;
            default:
                break;
        }
    };


    const handleVolumeChange = (event, newValue) => {
        // Handle volume change
        if (videoRef.current) {
            const internalPlayer = videoRef.current.getInternalPlayer();
            internalPlayer.setVolume(newValue);
            setVolume(newValue);
        }

    };



    const handleMute = () => {

        if (volume === 0) {
            setVolume(100)


        } else {
            setVolume(0)



        }
    };







    const toggleRepeat = () => {
        // Toggle repeat status
        setIsRepeat(!isRepeat);
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

    const nextSongHandler = () => {
        setCurrentSongIndex((prevIndex) =>
            prevIndex < similarSongs.length - 1 ? prevIndex + 1 : 0
        );
        setIsPlaying(true);
    };

    const prevSongHandler = () => {
        setCurrentSongIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : similarSongs.length - 1
        );
        setIsPlaying(true); // Auto-play previous song
    };


    const handleVideoEnd = () => {
        // Callback function to play the next song when the video ends
        if (isRepeat) {
            // If repeat is enabled, replay the current song
            videoRef.current.internalPlayer.seekTo(0);
            videoRef.current.internalPlayer.playVideo();
        } else {
            // Otherwise, play the next song
            nextSongHandler();
        }


        // Reset repeat state after playing the song in a loop
        if (isRepeat) {
            setTimeout(() => {
                setIsRepeat(false);
            }, 300); // Adjust the timeout duration as needed
        }
    };

    useEffect(() => {
        dispatch(fetchAllSongs());
        dispatch(fetchAllArtists());
        document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');

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
                // Check if the video has ended (state code 0)

            });
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

    }, [dispatch, isDarkTheme]);


    const songs = useSelector((state) => state.songs.songs);
    const song = songs.find((s) => s._id === songId);

    const artists = useSelector((state) => state.artists.artists);
    const matchedArtists = artists.filter((artist) =>
        song?.artists.includes(artist._id)
    );
    const similarSongs = [song, ...songs
        .filter(
            (s) =>
                s._id !== songId &&
                (s.genre === song?.genre || s.category === song?.category)
        )
        .slice(0, 99)];


    if (!song) {
        return <p>Song not found</p>;
    }
    const songNameForUrl = similarSongs[currentSongIndex]?.songName.replace(/ /g, ' ').toLowerCase();
    const songUrl = `${window.location.origin}/song/${songNameForUrl}/${similarSongs[currentSongIndex]?._id}`
    


    const breakpoints = {
        
        600: {
          slidesPerView: 3,
        },
          
        601: {
          slidesPerView: 5,
        },
       
      };
    
  
    return (

        <div>
            <ImageHeader imgPath={song?.banner} />
            <Box sx={{
                color: "primary.contrastText",
                ...uiConfigs.style.mainContent
            }}
                style={{ color: theme.palette.mode === "light" ? "black" : "white" }}
            >
                {/* media content */}
                <Box sx={{
                    marginTop: { xs: "-10rem", md: "-15rem", lg: "-20rem" }
                }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: { md: "row", xs: "column" }
                    }}>
                        {/* poster */}
                        <Box sx={{
                            width: { xs: "70%", sm: "50%", md: "40%" },
                            margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" }
                        }}>
                            <Box sx={{
                                //  height:" 400px", 
                                //  width: "500px", 
                                borderRadius: "20px",
                                paddingTop: "80%",
                                ...uiConfigs.style.backgroundImage(song?.thumbnail)
                            }} />
                        </Box>
                        {/* poster */}

                        {/* media info */}
                        <Box sx={{
                            width: { xs: "100%", md: "60%" },
                            color: "text.primary"
                        }}>
                            <Stack spacing={5}>
                                {/* Type */}
                                <Chip
                                    label={song?.type}
                                    variant="filled"
                                    color="primary"
                                    style={{ width: "fit-content" }}

                                />
                                {/* title */}
                                <Typography
                                    variant="h4"
                                    fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                                    fontWeight="700"
                                    sx={{ ...uiConfigs.style.typoLines(2, "left") }}
                                >
                                    {song?.songName}
                                </Typography>
                                {/* title */}

                                {/* category and genere */}


                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Chip
                                        label={song?.category}
                                        variant="filled"
                                        color="primary"
                                        style={{ width: "fit-content" }}

                                    />
                                    <Chip
                                        label={song?.genre}
                                        variant="filled"
                                        color="primary"
                                        style={{ width: "fit-content" }}

                                    />
                                </Stack>


                                {/* buttons */}
                                <Stack direction="row" spacing={1}>
                                    <Button
                                        variant="contained"
                                        sx={{ width: "max-content" }}
                                        size="large"
                                        startIcon={<PlayArrowIcon />}

                                    >
                                        watch now
                                    </Button>
                                </Stack>



                            </Stack>

                        </Box>

                    </Box>
                    <div className='songDetails'>
                        <div className='songDetailsDescription'>
                            <p

                            >
                                {song?.description}
                            </p>
                        </div>
                        <div className='songDetailsMusicPlatform'>
                            <Stack>
                                <Typography
                                    variant="h6"
                                    fontSize={{ xs: "1.5rem", md: "2rem", lg: "2rem" }}
                                    fontWeight="700"


                                >
                                    Listen On
                                </Typography>
                                <Stack direction="row" className='MusicPlatformIcons'>
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
                            </Stack>
                        </div>

                        <div className='songDetailsArtist'>
                            <Typography
                                variant="h6"
                                fontSize={{ xs: "1.5rem", md: "2rem", lg: "2rem" }}
                                fontWeight="700"

                            >
                                Artists
                            </Typography>
                            <Swiper breakpoints={breakpoints}  spaceBetween={10} grabCursor={true} className='songDetailsArtistSwiper' >
                                {matchedArtists.map(matchedArtist => (
                                    <SwiperSlide key={matchedArtist?._id}>
                                        <Link to={`/artist/${matchedArtist?._id}`}>
                                            <div className="artist-container">

                                                <img src={matchedArtist?.profilePhoto} alt={matchedArtist?.artistName} className='artist-imageHome' />
                                            </div>
                                            <div className='songDetailsArtistSwiper-ArtistName' style={{ color: theme.palette.mode === "light" ? "black" : "white" }}>
                                                <h6>{matchedArtist?.name}</h6>
                                                <h6>( {matchedArtist?.role} )</h6>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>


                    </div>
                    <div className='songDetailsVideo'>
                        <YouTube
                            ref={videoRef}
                            videoId={similarSongs[currentSongIndex]?.youtubeVideoId}
                            opts={{
                                width: '100%',
                                height: '700',
                                playerVars: {
                                    autoplay: isPlaying ? 1 : 0,
                                    allow: 'picture-in-picture',
                                },
                            }}
                            className='songDetailsVideo-video'
                            data-theme={isDarkTheme ? 'dark' : 'light'}
                            onEnd={handleVideoEnd}

                        />
                    </div>
                    <div className='similarSongLyrics'>
                        <div className='similarSongLyricsToggle-buttons'>
                            <ToggleButtonGroup
                                value={viewOption}
                                exclusive
                                onChange={handleViewChange}
                                aria-label="view options"
                                sx={{ margin: '16px 0' }}
                            >
                                <ToggleButton value="similarSongs">
                                    Similar Songs
                                </ToggleButton>
                                <ToggleButton value="lyrics">
                                    Lyrics
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </div>

                        {viewOption === 'similarSongs' && (
                            <div className='similarSongsSection'>
                                <div id='songDetailsSimilarSongList' className="similarSongsList">
                                    {similarSongs.map((similarSong, index) => (
                                        <Link to={`/song/${similarSong?.songName}/${similarSong._id}`} onClick={() => setCurrentSongIndex(0)}>
                                            <div  id='songDetailsSimilarSongItem' className="similarSongItem" key={index}>
                                                <div className='similarSongItem-songThumbnail'>
                                                    <img src={similarSong?.thumbnail} alt={similarSong?.songName} className="thumbnail" />
                                                </div>
                                                <div className="similarSongItem-songDetails">
                                                    <p className="songName">{similarSong?.songName}</p>
                                                    <p className="songName">{similarSong?.description}</p>
                                                    <p className='songName'>{similarSong?.category} | {similarSong?.genre} | {similarSong?.type}</p>


                                                </div>

                                            </div>
                                        </Link>
                                    ))}


                                </div>


                            </div>
                        )}

                        {viewOption === 'lyrics' && (
                            <div className="lyricsSection">
                                <p>{similarSongs[currentSongIndex]?.lyrics}</p>
                            </div>
                        )}
                    </div>

                </Box>

            </Box>
            <div className="sticky-control-panel">
                {/* Animated currently playing song information */}
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
                <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" className='controlPannelCenterBtns'>
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
                    <Button onClick={handleOpenShareDialog}>
                        <ShareIcon />
                    </Button>
                </Stack>
            </div>

            {/* Share Dialog */}
            <Dialog open={openShareDialog} onClose={handleCloseShareDialog} >
                <DialogContent >
                    <h4>Share This Song</h4>

                    <div className='dailog-shareLinkBox'>
                        <p className='dailog-share-link' style={{ whiteSpace: "nowrap" }}>
                            {songUrl}
                        </p>
                        <CopyToClipboard text={songUrl} onCopy={handleCopyLink}>
                            <Button style={{ height: "fit-content" }}>
                                {copied === true ? "Copied!" : "Copy Link"}
                            </Button>
                        </CopyToClipboard>

                    </div>
                    <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="space-between" className='dailog-shareIcons'>
                        <IconButton onClick={() => handleShareButtonClick('facebook')}>
                            <FacebookIcon />
                        </IconButton>
                        <IconButton onClick={() => handleShareButtonClick('whatsapp')}>
                            <WhatsAppIcon />
                        </IconButton>
                        <IconButton onClick={() => handleShareButtonClick('twitter')}>
                            <TwitterIcon />
                        </IconButton>
                        <IconButton onClick={() => handleShareButtonClick('email')}>
                            <EmailIcon />
                        </IconButton>
                    </Stack>
                </DialogContent>
            </Dialog>



        </div>


    );
};

export default SongDetails;
