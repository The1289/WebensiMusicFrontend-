import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "../common/Footer";
import GlobalLoading from "../common/GlobalLoading";
import Topbar from "../common/Topbar";
import AuthModal from "../common/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";




const MainLayout = () => {
  

 
  return (
    <>
      {/* global loading */}
      <GlobalLoading />
      {/* global loading */}

      {/* login modal */}
      <AuthModal />
      {/* login modal */}

      <Box display="flex" minHeight="100vh">
        {/* header */}
        <Topbar />
        {/* header */}

        {/* main */}
        <Box
          component="main"
          flexGrow={1}
          overflow="hidden"
          minHeight="100vh"
        >
          <Outlet />
        </Box>
        {/* main */}
      </Box>

      {/* footer */}
      <Footer />
      {/* footer */}
    </>
  );
};

export default MainLayout;