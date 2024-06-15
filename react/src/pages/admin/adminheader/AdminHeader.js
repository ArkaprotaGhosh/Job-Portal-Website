import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { UseLogout } from '../../../hooks/UseLogout'
import { UseAutheContext } from '../../../hooks/UseAutheContext';

const AdminHeader = () => {
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
        <div >
            <nav className="navbar">
                <div className="navbar-container">
                    <h1 className="logo" >Get Jobs</h1>
                    {/* //---------Admin is active--------------\\ */}
                    {user && (<>
                    <> <NavLink to='/getjobadmin'><h1 to='/adminlogin' className="logo">Dashboard</h1></NavLink></>
                        <div className="right-section">
                            <span>{user.data.email}</span>
                            <Link to='/adminlogin'><button className="login-btn" onClick={handleClick}>Log Out</button> </Link>
                        </div>
                    </>)}

                    {/* //------------Admin is not active-------------\\ */}
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
                                        Job Seekers
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/adminsignup"
                                        exact
                                        className={activeLink === '/adminsignup' ? 'active' : ''}
                                        onClick={() => handleNavLinkClick('/adminsignup')}
                                    >
                                        Job Post
                                    </NavLink>
                                </li>
                            </ul>
                        </div>

                        <div className="right-section">
                            {/* //-------Admin Login & Signup--------\\ */}
                            <Link to="/adminlogin" ><button className="login-btn">Login</button> </Link>
                            <Link to="/adminsignup" ><button className="signup-btn">Signup</button></Link>
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

export default AdminHeader