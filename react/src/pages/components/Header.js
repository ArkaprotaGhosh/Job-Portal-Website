import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { UseLogout } from '../../hooks/UseLogout'
import { UseAutheContext } from '../../hooks/UseAutheContext';



const Header = () => {


    const [isOpen, setIsOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('');
    const { logout } = UseLogout()
    const { user } = UseAutheContext()


    const handleNavLinkClick = (link) => {
        setActiveLink(link);
        setIsOpen(false); // Close the navbar after clicking a link on mobile
    };

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };
    const handleClick = () => {
        logout()
    }
    return (
        <div>



            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" onClick={() => handleNavLinkClick('/')}>
                        <h1 className="logo" >Get Jobs</h1>
                    </Link>
                    {/* //---------Admin is active--------------\\ */}
                    {user && (<>
                        <div className="right-section">
                            {/* <span>{user.data.email}</span> */}
                            <Link to='/login'><button className="login-btn" onClick={handleClick}>Log Out</button> </Link>
                        </div>
                    </>)}


                    {/* //------if user not exist---------\\ */}
                    {!user && (<>

                        <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
                            <ul>
                                <li>
                                    <NavLink
                                        to="/"
                                        exact
                                        className={activeLink === '/' ? 'active' : ''}
                                        onClick={() => handleNavLinkClick('/')}
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/jobs"
                                        exact
                                        className={activeLink === '/jobs' ? 'active' : ''}
                                        onClick={() => handleNavLinkClick('/jobs')}
                                    >
                                        Jobs
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/services"
                                        exact
                                        className={activeLink === '/services' ? 'active' : ''}
                                        onClick={() => handleNavLinkClick('/services')}
                                    >
                                        Services
                                    </NavLink>
                                </li>
                            </ul>
                        </div>

                        <div className="right-section">
                            {/* //-------Admin Login & Signup--------\\ */}
                            <Link to="/login" ><button className="login-btn">Login</button> </Link>
                            <Link to="/signup" ><button className="signup-btn" style={{border: "2px solid #ffffff"}}>Register</button></Link>
                            <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
                                <NavLink
                                    to="/adminsignup"
                                    exact
                                    className={activeLink === '/adminsignup' ? 'active' : ''}
                                    onClick={() => handleNavLinkClick('/adminsignup')}
                                    style={{
                                        borderLeft: "2px solid white",
                                        marginLeft: "21px",
                                        padding: "10px 21px 10px 21px",
                                    }}
                                >
                                    Recruiter
                                </NavLink>
                            </div>
                        </div>

                    </>)}
                    <div className="navbar-toggle" onClick={toggleNavbar}>
                        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
                        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
                    </div>

                </div>
            </nav >
        </div >
    )
}

export default Header