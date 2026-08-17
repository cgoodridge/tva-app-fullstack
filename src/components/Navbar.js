import React from 'react';
import { Link } from 'react-router-dom';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DeleteIcon from '@mui/icons-material/Delete';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';



const Navbar = () => {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div className="container navbar">
      <div className="logo">
        <Link to="/">
          <img src="../images/tva-logo.png" alt="TVA logo" width="130" />
        </Link>
      </div>
      <nav className="topnav">
        <ul>
          <Hidden mdDown>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/members">Members</Link>
            </li>
            <li>
              <Link to="/timeline">Timeline</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </Hidden>
          <Hidden lgUp>
            <div className="topnav">
              <IconButton aria-label="menu" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <MenuIcon className="menuIcon" fontSize="large" />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}><Link to="/">Home</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link to="/members">Members</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link to="/timeline">Timeline</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link to="/about">About</Link></MenuItem>
              </Menu>
            </div>
          </Hidden>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar;