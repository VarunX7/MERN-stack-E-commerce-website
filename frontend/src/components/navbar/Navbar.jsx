import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../assets/logo.png'
import cart_icon from '../assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext'
// import dropdown from '../assets/nav_dropdown.png'

export const Navbar = () => {

  const [menu, setMenu] = useState("shop")
  const {getTotalCartItems} = useContext(ShopContext)
  const menuRef = useRef();

  // const dropdown_toggle = (e)=>{
  //   menuRef.current.classList.toggle('nav-menu-visible')
  //   e.target.classList.toggle('open')
  // }

  const logout = ()=>{
    localStorage.removeItem('auth-token')
    window.location.replace('/')
  }

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt='' />
        <p>SHOPPER</p>
      </div>
      {/* <img className='nav-dropdown' src={dropdown} onClick={dropdown_toggle} alt="" /> */}
      <ul className="nav-menu" ref={menuRef}>
        <li onClick={() => {setMenu("shop")}}><Link to='/' style={{ textDecoration: 'none', color: '#626262'}}> Shop </Link>{ menu === "shop" ? <hr /> : <></>}</li>
        <li onClick={() => {setMenu("men")}}><Link to='/men' style={{ textDecoration: 'none', color: '#626262'}}> Men </Link>{ menu === "men" ? <hr /> : <></>}</li>
        <li onClick={() => {setMenu("women")}}><Link to='/women' style={{ textDecoration: 'none', color: '#626262'}}> Women </Link>{ menu === "women" ? <hr /> : <></>}</li>
        <li onClick={() => {setMenu("kids")}}><Link to='/kids' style={{ textDecoration: 'none', color: '#626262'}}> Kids </Link>{ menu === "kids" ? <hr /> : <></>}</li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')? <button onClick={logout}>Logout</button>: <Link to='/login'><button>Login</button></Link>}  
        <Link to='/cart'><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  )
}

