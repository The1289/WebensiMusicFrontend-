import React, {useEffect} from 'react';
import { Dropdown } from 'antd';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import menuConfigs from '../../configs/menu.configs';
import { Link } from "react-router-dom"
import { useTheme } from "@mui/system";
const UserMenu = () => {
  const { user } = useSelector((state) => state.user);
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';


  useEffect(() => {

    document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');


  }, [isDarkTheme]);

  const userMenuItems = [
    ...menuConfigs.user.map((item) => ({
      key: item.display,
      label: (
        <Link to={item.path} rel="noopener noreferrer" className='userMenuItems'>
          <span>{item.icon}</span><p>{item.display}</p>
        </Link>
      ),
    })),
  ];

  const items = [
    ...userMenuItems,
    // Add other menu items as needed
    // Example:
    // {
    //   key: 'logout',
    //   label: (
    //     <a href="/logout" rel="noopener noreferrer">
    //       Logout
    //     </a>
    //   ),
    // },
  ];




  return (
    <>
      <div>
        <Dropdown menu={{ items }} placement="bottomRight" arrow>
          <Avatar style={{ color: 'white', background: 'linear-gradient(45deg, #0161cf, #01fff0)', cursor: 'pointer' }}>
            {user?.name ? user.name.charAt(0) : ''}
          </Avatar>
        </Dropdown>
      </div>
    </>
  );
};

export default UserMenu;
