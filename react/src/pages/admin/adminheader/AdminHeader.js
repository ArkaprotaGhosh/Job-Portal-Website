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
            <nav className="navbar" style={{backgroundColor :"#ededed63"}}>
                <div className="navbar-container">
                    <h1 className="logo" style={{color:"black"}} >Get Jobs</h1>
                    {/* //---------Admin is active--------------\\ */}
                    {user && (<>
                    <> <NavLink to='/getjobadmin'><h1 to='/adminlogin' className="logo">Dashboard</h1></NavLink></>
                        <div className="right-section">
                            <span>{user.data.email}</span>
                            <Link to='/adminlogin'><button className="login-btn" onClick={handleClick} style={{color:"black"}}>Log Out</button> </Link>
                        </div>
                    </>)}

                    {/* //------------Admin is not active-------------\\ */}
                    {!user && (<>

                        <div className={`navbar-links ${isOpen ? 'active' : ''}`} style={{color: "black"}}>
                            <ul>
                                <li>
                                    <NavLink
                                        to="/"
                                        exact
                                        style={{color:"black"}}
                                        className={activeLink === '/' ? 'active' : ''}
                                        onClick={() => handleNavLinkClick('/')}
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/adminsignup"
                                        exact
                                        style={{color:"black"}}
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
                            <Link to="/adminlogin" ><button className="login-btn" style={{backgroundColor:"blue", color:"white"}}>Login</button> </Link>
                            <Link to="/adminsignup" ><button className="signup-btn" style={{border:"2px solid blue", color: "blue"}}>Signup</button></Link>
                            <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
                                <NavLink
                                    to="/"
                                    exact
                                    className={activeLink === '/adminsignup' ? 'active' : ''}
                                    onClick={() => handleNavLinkClick('/adminsignup')}
                                    style={{
                                        borderLeft: "2px solid blue",
                                        marginLeft: "21px",
                                        padding: "10px 21px 10px 21px",
                                        color:"black"
                                    }}
                                >
                                    Find Jobs
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

export default AdminHeader