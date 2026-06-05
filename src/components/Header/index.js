import {useState} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const history = useHistory()

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState)
  }

  const handleSearch = e => {
    e.preventDefault()
    if (searchInput.trim() !== '') {
      history.push(`/search?q=${searchInput.trim()}`)
      setSearchInput('')
      setIsMenuOpen(false)
    }
  }

  return (
    <nav className="navbar">
      <div className="nav-header">
        <h1 className="header-title">movieDB</h1>
        <button className="hamburger" onClick={toggleMenu} type="button">
          <span className={`line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`line ${isMenuOpen ? 'open' : ''}`}></span>
        </button>
      </div>
      <ul className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
        <li>
          <NavLink
            exact
            to="/"
            className="nav-btn"
            activeClassName="active-nav-btn"
            onClick={() => setIsMenuOpen(false)}
          >
            Popular
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/top-rated"
            className="nav-btn"
            activeClassName="active-nav-btn"
            onClick={() => setIsMenuOpen(false)}
          >
            Top Rated
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/upcoming"
            className="nav-btn"
            activeClassName="active-nav-btn"
            onClick={() => setIsMenuOpen(false)}
          >
            Upcoming
          </NavLink>
        </li>

        <li className="search-li">
          <form onSubmit={handleSearch} className="header-search-form">
            <input
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              className="header-search-input"
            />
            <button type="submit" className="header-search-btn">
              🔍
            </button>
          </form>
        </li>
      </ul>
    </nav>
  )
}

export default Header
