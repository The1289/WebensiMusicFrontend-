import { Typography, useTheme } from '@mui/material';

const Logo = () => {
  const theme = useTheme();

  return (
    <img src="/images/mainLogo.png" alt="" style={{ width: '60px'}}/>   
  );
};

export default Logo;