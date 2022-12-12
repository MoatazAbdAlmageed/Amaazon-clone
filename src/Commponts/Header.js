import React from 'react'
import {Link} from "react-router-dom"
import { useAuth } from '../Context/GlobalState'
import { auth } from '../firebase'
import Logo from "../images/header-logo.png"
import SearchIcone from "../images/icon/search-icon.png"
import shopinCart from "../images/icon/shopping-cart.png"
import './Header.css'
const Header = () => {
    const {user, basket} = useAuth()
    const handleAuthentication = () =>{
        auth.signOut();
    }
  return (
    <div className='header'>
         <Link to="/">
        <img className="header-logo" src={Logo} alt="logo-img" />
      </Link>
        <div className='header-search'>
                <input className='header-searchInput' type="text" />
                <img className='header-searchIcon' src={SearchIcone} alt="search-icon" />
        </div>
        <div className='header-nav'>
            <Link to={!user && "/login"}>
                <div className='header-option' onClick={handleAuthentication}>
                    <span className='header-optionLineOne'>Hello 
                     {user ? `${user.email}` : 'Guest'}  </span>
                    <span className='header-optionLineTwo'> 
                    {user ? "Sign Out" : "Sign In"}</span>
                </div>
            </Link>
            <Link to="/orders">
                <div className='header-option'>
                    <span className='header-optionLineOne'>Returns</span>
                    <span className='header-optionLineTwo'>$ Orders</span>
                </div>
            </Link>
            <div className='header-option'>
            <span className='header-optionLineOne'>Your</span>
            <span className='header-optionLineTwo'>Prime</span>
            </div>
            <Link to="/checkout">
                <div className='header-optionBasket'>
                <img src={shopinCart} />
                    <span className='header-optionTwo header-basketCount'>
                        {basket?.length}
                    </span>
                </div>
            </Link>
        </div>
    </div>
  )
}

export default Header