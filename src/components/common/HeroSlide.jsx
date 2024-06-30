import React, { useEffect, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import { useDispatch } from 'react-redux';
import SwiperCore, { Autoplay, EffectFade } from 'swiper/core';
import { Swiper } from 'swiper/react';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import { setGlobalLoading } from '../../redux/features/globalLoadingSlice';
import { server } from '../../server';
import 'swiper/css/effect-fade';
import { useTheme } from "@mui/system";



SwiperCore.use([Autoplay, EffectFade]);

const HeroSlide = () => {

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';
  const dispatch = useDispatch(); // Make sure dispatch is defined

  const [banners, setBanners] = useState([]);

  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
    const getBanners = async () => {
      try {
        dispatch(setGlobalLoading(true)); // Assuming setGlobalLoading is an action that sets global loading state to true
        const response = await fetch(`${server}/banner/all-banners`);
        const data = await response.json();

        if (response.ok) {
          setBanners(data.banners);
        } else {
          console.error('Failed to fetch banners');
        }
      } catch (error) {
        console.error('Error fetching banners:', error);
        console.error('Failed to fetch banners');
      } finally {
        dispatch(setGlobalLoading(false));
      }
    };

    getBanners();
  }, [dispatch, isDarkTheme]);

  return (
    <div>
      <div className="banner">
        <Swiper
          effect={'fade'}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Autoplay, EffectFade]}
          className='bannerSwiper'
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner?._id} className='bannerSwiperSlide'>
              <Link to={banner?.bannerNavigationLink}>
                <div className="banner-image" style={{ backgroundImage: `url(${banner?.bannerUrl})` }} >
                  <div className="gradient-overlay"></div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HeroSlide;
