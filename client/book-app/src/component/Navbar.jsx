import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../App.css";




export const Navbar = () => {
    const [isOpen,setIsopen] = useState(false);
    const navigate = useNavigate();
    const toggleMenu = () => {
        setIsopen(!isOpen);
    }
    const handleToggleMenu = () => {
        setIsopen(false);
    }
    const logoutUser  = () => {
        if(window.confirm("you wanna logout?")){
            localStorage.clear();
            navigate('/login')
        }else {
            navigate('/books')
        }
    }
    const auth = localStorage.getItem("token")
    const username = localStorage.getItem("username")
    return(
        <div>
            <nav>
                <div>
                    <FontAwesomeIcon
                    icon={faBars}
                    className="hamburger-icon"
                    onClick={toggleMenu}
                    style={isOpen ? { transform: "rotate(90deg)" } : {}}
                    />
                    <h2>Books Sharing App</h2>        
                </div>
                <div className={`nav-right ${isOpen ? "open" : ""}`}>
                    <ul>
                        {auth ? (
                            <>
                            <li>                            
                                <NavLink to="/favoritebooks" onClick={handleToggleMenu}>
                                    ❤️
                                </NavLink>{" "}
                            </li>
                            <li>
                                {username}
                                <NavLink to= "/login" onClick={logoutUser}>Logout</NavLink>
                            </li>
                            </>
                        ):(
                            <>
                            <li>
                                <NavLink to="/login">Login</NavLink>{" "}
                            </li>
                            <li>
                                <NavLink to="/signup">SignUp</NavLink>
                            </li>
                            <li>
                                <NavLink to="/forgotPassword">Forgot Password</NavLink>
                            </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    );
}