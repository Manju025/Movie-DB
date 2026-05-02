import './Footer.css'

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <h2 className="logo">movieDB</h2>

      <p className="footer-text">
        Built for movie lovers. Discover, explore, repeat 🍿
      </p>

      <div className="footer-links">
        <a href="/">Home</a>
        <a href="/top-rated">Top Rated</a>
        <a href="/upcoming">Upcoming</a>
        <a href="/search">Search</a>
      </div>

      <p className="copyright">
        © {new Date().getFullYear()} movieDB. All rights reserved.
      </p>
    </div>
  </footer>
)

export default Footer
