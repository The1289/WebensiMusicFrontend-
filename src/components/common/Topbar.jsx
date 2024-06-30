import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  Stack,
  Toolbar,
  useScrollTrigger,
  Typography,


} from "@mui/material";
import { cloneElement, useState } from "react";
import { Link } from "react-router-dom";
import menuConfigs from "../../configs/menu.configs";
import { themeModes } from "../../configs/theme.configs";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { setThemeMode } from "../../redux/features/themeModeSlice";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import Sidebar from "./Sidebar";






const ScrollAppBar = ({ children, window }) => {
  const { themeMode } = useSelector((state) => state.themeMode);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    sx: {
      color: trigger ? "text.primary" : themeMode === themeModes.dark ? "primary.contrastText" : "text.primary",
      backgroundColor: trigger ? "background.paper" : themeMode === themeModes.dark ? "transparent" : "background.paper",
    },
  });
};

const Topbar = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const { appState } = useSelector((state) => state.appState);
  const { themeMode } = useSelector((state) => state.themeMode);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const genres = ["Pop", "Rock", "Hip-Hop/Rap", "Electronic", "Indie"];
  


  const onSwitchTheme = () => {
    const theme = themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
    dispatch(setThemeMode(theme));
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const [showSubnavbar, setShowSubnavbar] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowSubnavbar(scrollY > 80);
    };

    // Attach event listener for scroll
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);






  return (
    <>
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
      <ScrollAppBar>
        <AppBar elevation={0} sx={{ zIndex: 9999 }}>
          <Toolbar sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                color="inherit"
                sx={{ mr: 2, display: { md: "none" } }}
                onClick={toggleSidebar}
              >
                <MenuIcon />
              </IconButton>

              <Box sx={{ display: { xs: "inline-block", md: "none" } }} className="mobileNavLogo">
                <Logo />

              </Box>
              <IconButton
                sx={{ color: "inherit",   cursor: "pointer", display: { xs: "inline-block", md: "none" } }}
                aria-label="search"
              >
                <SearchOutlinedIcon  style={{marginTop: "12px"}}/>
              </IconButton>




            </Stack>

            {/* main menu */}
            <Box flexGrow={1} alignItems="center" display={{ xs: "none", md: "flex" }} className="mainNav">
              <Box sx={{ marginRight: "30px" }} className="mainNavLogo">
                <Logo />
              </Box>

              {/* Searchbar */}
              <Box sx={{ position: "relative", }} className="mainNavSearch">
                <InputBase
                  placeholder="Search..."
                  sx={{
                    color: "inherit",
                    '& .MuiInputBase-input': {
                      padding: "8px 26px",
                    },
                    border: "1px solid gray",
                    borderRadius: "10px",
                    width: "100%"

                  }}

                />
                <IconButton
                  sx={{ position: "absolute", right: 0, color: "inherit" }}
                  aria-label="search"
                >
                  <SearchOutlinedIcon />
                </IconButton>
              </Box>
              {/* Searchbar */}
              <div className="mainNavBtns">
                {menuConfigs.main.map((item, index) => (
                  <Button
                    key={index}
                    sx={{
                      color: appState.includes(item.state) ? "primary.contrastText" : "inherit",
                      mr: 2
                    }}
                    component={Link}
                    to={item.path}
                    variant={appState.includes(item.state) ? "contained" : "text"}

                  >
                    {item.display}
                  </Button>
                ))}


                <IconButton
                  sx={{ color: "inherit" }}
                  onClick={onSwitchTheme}
                >
                  {themeMode === themeModes.dark && <DarkModeOutlinedIcon />}
                  {themeMode === themeModes.light && <WbSunnyOutlinedIcon />}
                </IconButton>
              </div>
            </Box>
            {/* main menu */}

            {/* user menu */}
            <Stack spacing={3} direction="row" alignItems="center">
              {isAuthenticated ? (
               
                <UserMenu/>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => dispatch(setAuthModalOpen(true))}
                  sx={{ padding: "2px" }}
                >
                  sign in
                </Button>

              )}
              

            </Stack>
            
            {/* user menu */}
          </Toolbar>
          {/* Subnavbar */}
          <Toolbar sx={{
            alignItems: "center", justifyContent: "space-between", zIndex: 9998,
            position: "fixed",
            top: "64.4px",
            width: "100%",
            backgroundColor: "background.paper",
            transition: "opacity 0.3s ease-in-out",
            opacity: "0",
            opacity: showSubnavbar ? 1 : 0,
            visibility: "hidden",
            visibility: showSubnavbar ? "visible" : "hidden"


          }}



            className="subNav"
          >
            {/* Customize the subnavbar as needed */}
            <Box flexGrow={1} alignItems="center" display="flex" className="subNavContent">
              <div className="subNavContent-item" id="subNavContentItemOne">
                <Link>
                  <h4>New Release</h4>
                </Link>
              </div>

              <div className="subNavContent-item" id="subNavContentItemTwo">
                <Link>
                  <h4>Trending Now</h4>
                </Link>
              </div>

              <div className="subNavContent-item"
                id="subNavContentItemThree"
              >

                <h4 >Moods & Genre</h4>

                {/* Genres Popover */}
                <div
                  className="genres-menu"
                >
                  <Box p={2}>
                    {genres.map((genre) => (
                      <Typography key={genre} variant="body1">
                        <Link to={`/genre/${genre}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          {genre}
                        </Link>
                      </Typography>
                    ))}
                  </Box>
                </div>
                {/* Genres Popover */}

              </div>

              <div className="subNavContent-item" id="subNavContentItemFour">
                <Link>
                  <h4>Top Albums</h4>
                </Link>
              </div>
              <div className="subNavContent-item" id="subNavContentItemFour">
                <Link>
                  <h4>Top Charts</h4>
                </Link>
              </div>

              <div className="subNavContent-item" id="subNavContentItemFive">
                <Link>
                  <h4>All Artists</h4>
                </Link>
              </div>

              <div className="subNavContent-item" id="subNavContentItemSix">
                <Link>
                  <h4>All Playlists</h4>
                </Link>
              </div>


            </Box>
          </Toolbar>
          {/* Subnavbar */}

        </AppBar>

      </ScrollAppBar>
    </>
  );
};

export default Topbar;
