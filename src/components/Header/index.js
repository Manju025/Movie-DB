import {NavLink} from 'react-router-dom'
import './Header.css'

const Header = () => (
  <nav className="navbar">
    <h1 className="header-title">movieDB</h1>
    <ul className="nav-links">
      <li>
        <NavLink
          exact
          to="/"
          className="nav-btn"
          activeClassName="active-nav-btn"
        >
          Popular
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/top-rated"
          className="nav-btn"
          activeClassName="active-nav-btn"
        >
          Top Rated
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/upcoming"
          className="nav-btn"
          activeClassName="active-nav-btn"
        >
          Upcoming
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/search"
          className="nav-btn"
          activeClassName="active-nav-btn"
        >
          Search
        </NavLink>
      </li>
    </ul>
  </nav>
)

export default Header
