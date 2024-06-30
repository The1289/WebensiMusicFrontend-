import { Box } from "@mui/material";
import { Swiper } from "swiper/react";

const AutoSwiper = ({ children }) => {
  return (
   
      <Swiper
        slidesPerView="4"
        grabCursor={true}
        
      >
        {children}
      </Swiper>
   
  );
};

export default AutoSwiper;