import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import './NavBar.css';


const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);

  return (
    <nav className="navbar">
      <ul className="navbar__list">
        {user ? (
          <>
            <li className="navbar__item"><Link to="/" className="navbar__link">HOME</Link></li>
            <li className="navbar__item"><Link to="/events" className="navbar__link">Events</Link></li>
            <li className="navbar__item"><Link to="/events/new" className="navbar__link">NEW Event</Link></li>
            <li className="navbar__item">
              <Link to="/" onClick={handleSignout} className="navbar__link navbar__signout">SIGN OUT</Link>
            </li>
          </>
        ) : (
          <div className="navbar__auth-links">
            <li className="navbar__item"><Link to="/signin" className="navbar__link">Sign In</Link></li>
            <li className="navbar__item"><Link to="/signup" className="navbar__link">Sign Up</Link></li>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
