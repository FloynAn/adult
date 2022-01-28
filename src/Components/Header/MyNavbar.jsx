import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useSearchParams } from 'react-router-dom';
import { productContext } from '../../Contexts/ProductsContext';
import Logo from '../images/LOGO.png'
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
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
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function MyNavbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const {cartLength, getProducts, useAuth, logout} = React.useContext(productContext)
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchVal, setSearchVal] = React.useState(searchParams.get('q') ? searchParams.get('q') : '')

  const currentUser = useAuth ()

  React.useEffect(() => {
    setSearchParams({
      'q': searchVal,
      '_limit': 3,
      '_page': 1
    })
  }, [searchVal])

  async function handleLogout (){
    try {
      localStorage.clear()
      await logout()
    } catch (error) {
      console.log(error);
    }
  }

  const handleValue = (e) => {
    const search = new URLSearchParams (window.location.search)
    search.set('q', e.target.value)
    setSearchVal(e.target.value)
    setSearchParams({
      'q': searchVal,
      '_limit': 3,
      '_page': 1
    })
    getProducts()
  }

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
keepMounted 
      transformOrigin={{ 
        vertical: 'top', 
        horizontal: 'right', 
      }} 
      open={isMenuOpen} 
      onClose={handleMenuClose} 
    > 
      <Link to='/login' style={{textDecoration:'none'}}> 
        <MenuItem style={{color: 'purple'}}>Войти</MenuItem> 
      </Link> 
 
      <Link to='/register'  style={{textDecoration:'none'}}> 
        <MenuItem style={{color: 'purple'}}>Зарегистрироваться</MenuItem> 
      </Link> 
      
       
    </Menu> 
  ); 
 
  const mobileMenuId = 'primary-search-account-menu-mobile'; 
  const renderMobileMenu = ( 
    <Menu 
      anchorEl={mobileMoreAnchorEl} 
      anchorOrigin={{ 
        vertical: 'top', 
        horizontal: 'right', 
      }} 
      id={mobileMenuId} 
      keepMounted 
      transformOrigin={{ 
        vertical: 'top', 
        horizontal: 'right', 
      }} 
      open={isMobileMenuOpen} 
      onClose={handleMobileMenuClose} 
    > 
      <MenuItem style={{display:'flex', flexDirection:'column'}} onClick={handleProfileMenuOpen}> 
      <Search> 
            <SearchIconWrapper> 
              <SearchIcon /> 
            </SearchIconWrapper> 
            <StyledInputBase 
              placeholder="Поиск..." 
              inputProps={{ 'aria-label': 'search' }} 
              value={searchVal} 
              onChange={handleValue} 
            /> 
          </Search> 
          
          <IconButton 
            size="large" 
            aria-label="account of current user" 
            aria-controls="primary-search-account-menu" 
            aria-haspopup="true" 
            color="inherit" 
          > 
            <AccountCircle /> 
          </IconButton> 

          {currentUser?.email} 
          {/* <Box sx={{ flexGrow: 1 }} />  */}
          {currentUser?.email ==="admin@gmail.com" ? ( 
            <Link to="/add" style={{color:"violet", marginRight: '1%'}}> 
              <AddIcon/> 
            </Link> 
          ):(null)} 
          { 
            currentUser?( 
              <LogoutIcon style={{color:"violet", marginRight: '1%', cursor: "pointer"}}
              variant='success'  
              disabled={!currentUser}  
              onClick={handleLogout}
              > 
               Выйти 
              </LogoutIcon> 
            ) : (null) 
          }  
 
           
                {currentUser?.email !== "admin@gmail.com" && currentUser !== null ? ( 
                <Link to="/cart" style={{color:"violet"}}> 
                  <IconButton color='inherit'> 
              <Badge badgeContent={cartLength} color='secondary'> 
                <ShoppingCartIcon/> 
              </Badge> 
            </IconButton> 
          </Link> 
                ) : (null)}
          {/* <Box sx={{ display: { xs: 'none', md: 'flex' } }}> 
          </Box>  */}

      </MenuItem> 
    </Menu> 
  ); 
 
  return ( 
    <Box sx={{ flexGrow: 1 }}> 
 
      <AppBar position="static" color="secondary"> 
        <Toolbar> 
          <Typography
            variant="h6" 
            noWrap 
            component="div" 
             
            sx={{ display: { xs: 'none', sm: 'block' } }} 
          > 
        
          <Link to="/">
          <img width='230px' src={Logo} alt="logo"/>
          </Link> 
         
          </Typography> 
          <Search sx={{ display: { xs: 'none', md: 'block', lg: 'block'} }}> 
            <SearchIconWrapper> 
              <SearchIcon /> 
            </SearchIconWrapper> 
            <StyledInputBase 
              placeholder="Поиск..." 
              inputProps={{ 'aria-label': 'search' }} 
              value={searchVal} 
              onChange={handleValue} 
            /> 
          </Search> 
 
          <Box sx={{ flexGrow: 1 }} /> 
          {currentUser?.email ==="admin@gmail.com" ? ( 
            <Link to="/add" style={{color:"white", marginRight: '1%'}}> 
              <AddIcon sx={{ display: { xs: 'none', md: 'block', lg: 'block'} }}/> 
            </Link> 
          ):(null)} 
          { 
            currentUser?( 
              <LogoutIcon sx={{ display: { xs: 'none', md: 'block', lg: 'block'} }} style={{color:"white", marginRight: '1%', cursor: "pointer"}}
              variant='success'  
              disabled={!currentUser}  
              onClick={handleLogout}
              > 
               Выйти 
              </LogoutIcon> 
            ) : (null) 
          } 
          <Box sx={{ display: { xs: 'none', md: 'block', lg: 'block'} }}>
          {currentUser?.email} 
            </Box> 
 
            <IconButton sx={{ display: { xs: 'none', md: 'block', lg: 'block'} }}
              size="large" 
              edge="end" 
              aria-label="account of current user" 
              aria-controls={menuId} 
              aria-haspopup="true" 
              onClick={handleProfileMenuOpen} 
              color="inherit" 
            > 
              <AccountCircle /> 
                </IconButton>
                {currentUser?.email !== "admin@gmail.com" && currentUser !== null ? ( 
                <Link to="/cart" style={{color:"white"}}> 
                  <IconButton color='inherit'> 
              <Badge badgeContent={cartLength} color='secondary' sx={{ display: { xs: 'none', md: 'block', lg: 'block'} }}> 
                <ShoppingCartIcon /> 
              </Badge> 
            </IconButton> 
          </Link> 
                ) : (null)}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}> 
          </Box> 
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}> 
            <IconButton 
              size="large" 
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
