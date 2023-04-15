import React, { useContext } from 'react'
import "./navbar.css"
import {Link} from "react-router-dom"
import { AuthContext } from '../../SearchContext/authContext'

const Navbar = () => {
 const {user} = useContext(AuthContext);

  
    return (
        <div className='nav'>
            <div className='navWrapper'>
            <Link to="/" style={{color:"inherit", textDecoration:"none" }} >
                <span className='logo' >Booking.in</span>
            </Link>
          {
            user ? user.username :(
                <div className='navItems'>
                <Link to='/login'>
                    <button className="navbutton">login</button>

                </Link>
                    <button className="navbutton">Register</button>
                </div>
            )
          }
             
            
            </div>
        </div>
    );
}

export default Navbar;
