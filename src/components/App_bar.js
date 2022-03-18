import React, { useEffect, useState } from 'react'
import { styled, alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { getNews, setNewsType, getSearchedNews,setLanguageAction } from '../actions/news_action'
import strings from '../locale/localize'

const defaultNewsType = 'Stock'
const pages = ['current affairs', 'Stock', 'sports', 'news', 'bollywood'];
const transitionDuration = 1000;

const Capitalize= (str)=>{
  return   str.split(' ').map(item=>item.charAt(0).toUpperCase() + item.slice(1)).join(' ')
}


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    flexShrink: 0,
    //this will hide the backdrop when varient="temporary"
    "& .MuiBackdrop-root": {
      display: "none"
    },
    backgroundColor: "rgba(0,0,0,0.6)"
  },
  drawerPaper: {
    // width: drawerWidth,
    // backgroundImage: url(${drawerPaper})`,
    backgroundColor: "rgba(120,120,120,0.2)"
  },
  drawerContainer: {
    overflow: "auto"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: transitionDuration
    }),
    marginLeft: 0
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: transitionDuration
    }),
    // marginLeft: drawerWidth
  }
}));

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const settings = ['english','hindi'];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  marginRight: 5,
  width: '50%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


export default function ElevateAppBar(props) {
  const [inputSearch, SetInputSearch] = useState('')
  const newsDataType = useSelector((state) => state.newsDataType)
  const setLanguage = useSelector((state) => state.setLanguage)
  const dispatch = useDispatch()
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Avatar
        alt="test"
        src="/tidbit.png"
        sx={{
          //position: "absolute",
          width: "120px",
          height: "120px",
          marginLeft: "50px"
        }}
      />
      <Divider />
      <List>
        {['current_affairs', 'Stock', 'sports', 'news', 'bollywood'].map((text, index) => (
          <ListItem onClick={() => handleCloseNavMenu(text)} button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={Capitalize(strings[text])} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['aboutUs', 'ContactUs'].map((text, index) => (
          <ListItem onClick={() => handleDrawerAboutSection(text)} button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={Capitalize(strings[text])} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  useEffect(() => {
    getNews(dispatch, defaultNewsType, setLanguage);
    setNewsType(dispatch, defaultNewsType)

  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    getNews(dispatch, page, setLanguage);
    setNewsType(dispatch, page)
    setAnchorElNav(null);
    SetInputSearch('')
  };
  const handleDrawerAboutSection = (page) => {
    setNewsType(dispatch, page)
    setAnchorElNav(null);
    SetInputSearch('')
  };


  const handleCloseNavMenuForUnselected = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (lang) => {
    let setLng = 'en'
    if(lang==='hindi'){
      setLng = 'hi'
    } 
    strings.setLanguage(setLng);
    getNews(dispatch, newsDataType, setLng);
    setLanguageAction(dispatch, setLng)
    setAnchorElUser(null);
  };

  const handleChange = (e) => {
    SetInputSearch(e.target.value)
  }

  const keyPress = (e) => {
    if (e.keyCode == 13) {
      getSearchedNews(dispatch, e.target.value,setLanguage);
      setNewsType(dispatch, e.target.value)
      setAnchorElNav(null);
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      {/* <ElevationScroll {...props}> */}
      <AppBar>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
             {strings[newsDataType || defaultNewsType]} {/*Header starting menu icon or text */}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              // onClick={(handleOpenNavMenu)}
              onClick={toggleDrawer('left', true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenuForUnselected}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>

                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>


          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            {strings[newsDataType || defaultNewsType]}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {/* {strings[page || defaultNewsType]} */}
              </Button>
            ))}
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder={strings['search']}
              inputProps={{ 'aria-label': 'search' }}
              value={inputSearch}
              onKeyDown={keyPress}
              onChange={handleChange}
            />
          </Search>
          <Box sx={{ flexGrow: 0, marginRight: 0.1 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                {/* <img src="/img/logo1.jpg" alt="Paris"/> */}
                <Avatar alt="Remy Sharp" src="/img/tidbit.png" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={()=>handleCloseUserMenu(setting)}>
                  <Typography textAlign="center">{Capitalize(setting)}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          // width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            // width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        //  className={classes.drawer}
        variant="temporary"
        classes={{
          paper: classes.drawerPaper
        }}
        // transitionDuration={{
        //   enter: transitionDuration,
        //   exit: transitionDuration
        // }}
        anchor={'left'}
        open={state['left']}
        onClose={toggleDrawer('left', false)}
      >
        <Toolbar />
        {list('left')}
      </Drawer>
      <div>
      </div>
      <Toolbar />

    </React.Fragment>
  );
}