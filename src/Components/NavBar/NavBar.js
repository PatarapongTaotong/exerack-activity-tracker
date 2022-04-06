import './NavBar.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className="nav-bar-wrapper">
            <div className="nav-bar container">
                <nav className="logo">
                    <span>Exerack</span>
                </nav>
                <nav className="nav-menu">
                    <ul className="nav-list">
                        <li className="nav-item">
                            <Link to="/home">
                                <div className="nav-link tooltip">
                                    <i className="fa-solid fa-house"></i>
                                    <span className="tooltiptext">Home</span>
                                </div>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/activities">
                                <div className="nav-link tooltip">
                                    <i className="fa-solid fa-dumbbell"></i>
                                    <span className="tooltiptext">Activities</span>
                                </div>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/profile">
                                <div className="nav-link tooltip">
                                    <i className="fa-solid fa-user"></i>
                                    <span className="tooltiptext">Profile</span>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default NavBar;