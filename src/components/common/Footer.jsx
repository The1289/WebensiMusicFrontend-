import React, { useState, useEffect } from 'react';
import { Paper, Slide, Button, Snackbar, TextField } from '@mui/material';
import Container from './Container';
import Logo from './Logo';
import menuConfigs from "../../configs/menu.configs";
import { Link } from "react-router-dom";
import { FiPhoneCall } from "react-icons/fi";
import { TfiLocationPin } from "react-icons/tfi";
import { MdOutlineEmail } from "react-icons/md";
import { MdWhatsapp } from "react-icons/md";
import { server } from '../../server';
import { FaFacebook, FaInstagramSquare, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import { fetchAllArtists } from '../../redux/actions/artist';
import { fetchAllSongs } from "../../redux/actions/song";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPlaylists } from "../../redux/actions/playlist"
import { useTheme } from "@mui/system";

const Footer = () => {


  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs.songs);
  const playlists = useSelector((state) => state.playlists.playlists);
  const artists = useSelector((state) => state.artists.artists);
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';


  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
    dispatch(fetchAllSongs());
    dispatch(fetchAllPlaylists());
    dispatch(fetchAllArtists());
  }, [dispatch, isDarkTheme]);


  const newReleaseSongs = songs
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 30);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: '',
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${server}/contact/submit-inquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setOpenSnackbar(true);
        setFormData({
          name: '',
          email: '',
          mobile: '',
          message: '',
        });
      } else {
        console.error('Failed to submit inquiry');
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div className='footer'>
      <div className="FooterYoutubeChannelBtn">
        <div className="youtubeChannelInfo">
          <div className='youtubeChannelInfoLogo'>
            <img src="/images/mainLogo.png" alt="" />
          </div>

          <p>🎵 Elevate your musical journey! 🚀 Hit subscribe now for the latest beats and exclusive content. ✨ Join us in exploring the magic of music together! 🔔🎧 #Subscribe #MusicMagic 🌟</p>

        </div>
        <div className="youtubeChannelBtn">
          <button>
            <Link to="https://youtube.com"> <FaYoutube /> Subscribe Now</Link>
          </button>

        </div>

      </div>
      <div className="footerContactSection">
        <div className="fotterContactDetails">
          <div className="footerContactDetailsContent">
            <div className="footerContactCard" id="footerContactCard_One">
              <a href="https://maps.app.goo.gl/pvh37i9gYU7CwUzW8"><TfiLocationPin /></a>
              <h2>Our Head Office</h2>
              <p>Lorem 5252, ipsum dolor sit amet consectetur , adipisicing elit. Id quod quos dolorem.</p>

            </div>
            <div className="footerContactCard" id="footerContactCard_Two">
              <a href="tel:8855932409"><FiPhoneCall /></a>
              <h2>Phone Number</h2>
              <p>+91 8528985588</p>

            </div>
            <div className="footerContactCard" id="footerContactCard_Three">
              <a href="mailTo:contact@webensi.com"><MdOutlineEmail /></a>
              <h2>Email </h2>
              <p>contact@webensi.com</p>
              <p>service@webensi.com</p>

            </div>
            <div className="footerContactCard" id="footerContactCard_Four">
              <a href="https://wa.me/8855932409" target="_blank" rel="noopener noreferrer"><MdWhatsapp /></a>
              <h2>Whatsapp</h2>
              <p>+91 8574855587</p>

            </div>

          </div>

        </div>
        <div className="footerContactForm">
          <div className="footerContactFormContent">

            <div className="footerContactForm-form">
              <form >
                <TextField
                  label="Name"
                  variant="filled"
                  fullWidth
                  margin="normal"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{ color: "red" }}

                />
                <TextField
                  label="Email"
                  variant="filled"
                  fullWidth
                  margin="normal"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField
                  label="Mobile"
                  variant="filled"
                  fullWidth
                  margin="normal"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                />
                <TextField
                  label="Message"
                  variant="filled"
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleSubmit}
                  size='large'
                >
                  Submit
                </Button>
              </form>
            </div>
            <div className="footerContentForm-formDetails">
              <h1>Get in touch</h1>
              <h3>Connect with Us Today and Transform Ideas into Reality!</h3>
              <p>Ready to turn your thoughts into action? We're just a message away! Whether you're curious about our services, want to discuss exciting opportunities, or simply share a great idea, let's connect. Drop us a line through our contact form, ring us up, shoot an email, or even WhatsApp us – the possibilities are endless! Your inquiries are our priority, and we're thrilled to embark on this journey with you. Let's bring your vision to life together!</p>

              <div className="footer-socialIcons">

                <a href="/"><FaFacebook /></a>
                <a href="/"><FaInstagramSquare /></a>
                <a href="/"><FaTwitter /></a>
                <a href=""><FaLinkedin /></a>
                <a href="/"><FaYoutube /></a>
              </div>

            </div>
          </div>

        </div>

      </div>
      <div className="footerQuickLinks">
        <div className="quickLinks">
          <h4>New Release</h4>
          <div className="quickLinks-links">
            {newReleaseSongs.map((song, index) => (
              <Link key={song.id} to={`/song/${song?.songName}/${song?._id}`}>
                <p>{song?.songName}</p>
                {index < newReleaseSongs.length - 1 && "|"}

              </Link>
            ))}
          </div>
        </div>
        <div className="quickLinks">
          <h4>Trending Now</h4>
          <div className="quickLinks-links">
            {newReleaseSongs.map((song, index) => (
              <Link key={song.id} to={`/song/${song?.songName}/${song?._id}`}>
                <p>{song?.songName}</p>
                {index < newReleaseSongs.length - 1 && "|"}

              </Link>
            ))}
          </div>
        </div>
        <div className="quickLinks">
          <h4>Top Playlists</h4>
          <div className="quickLinks-links">
            {playlists.slice(0, 20).map((playlist, index) => (
              <Link key={playlist.id} to={`/playlist/${playlist?.playlistName}/${playlist._id}`}>

                <p>{playlist?.playlistName}</p>
                {index < playlists.length - 1 && "|"}
              </Link>
            ))}
          </div>
        </div>



        <div className="quickLinks">
          <h4>Top Artists</h4>
          <div className="quickLinks-links">
            {artists.slice(0, 20).map((artist, index) => (
              <Link key={artist.id} to={`/artist/${artist?.name}/${artist?._id}`}>
                <p>{artist?.name}</p>
                {index < artists.length - 1 && "|"}
              </Link>
            ))}
          </div>
        </div>


      </div>
      <div className="footerMainLinks">
        <div className="footerMainLinks-links">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/policies">Privacy Policy</Link>
        </div>
        <div className="fotterMainLinks-Logo">
          <img src="/images/mainLogo.png" alt="" />
        </div>
      </div>
      <div className="footerCopyright">
        <p>Thank you for streaming with us, where every beat finds its home. Your love for music drives our passion, and we're thrilled to be the soundtrack to your moments. Keep vibing, keep discovering, and let the rhythm carry you until we meet again. Cheers to the music that connects us all !</p>
        <h5>2024 &copy; All Rights Reserved | webensi.com</h5>

      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        TransitionComponent={Slide}
        message="Inquiry submitted successfully!"
        key={Slide.direction}
      />
    </div>
  );
};

export default Footer;