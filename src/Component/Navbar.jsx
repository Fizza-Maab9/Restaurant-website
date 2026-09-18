import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={scrolled ? "navbar scrolled" : "navbar"}>

      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="restaurant-logo" onClick={closeMenu}>
          <span className="logo-badge">🍽️</span>
          <span className="logo-text">
            Maab's <em>Kitchen</em>
          </span>
        </Link>

        {/* Navigation */}
        <nav className={menuOpen ? "nav-menu active" : "nav-menu"}>
          <div className="nav-links">
            <Link to="/" onClick={closeMenu} style={{ "--i": 0 }}>Home</Link>
            <Link to="/about" onClick={closeMenu} style={{ "--i": 1 }}>About</Link>
            <Link to="/menu" onClick={closeMenu} style={{ "--i": 2 }}>Menu</Link>
            <Link to="/profile" onClick={closeMenu} style={{ "--i": 3 }}>Profile</Link>
            <Link to="/orders" onClick={closeMenu} style={{ "--i": 4 }}>Orders</Link>
            <Link to="/contact" onClick={closeMenu} style={{ "--i": 5 }}>Contact</Link>
          </div>

          <div className="nav-actions">
            <Link to="/login" className="login-btn" onClick={closeMenu} style={{ "--i": 6 }}>
              Login
            </Link>

            <Link to="/cart" className="cart-btn" onClick={closeMenu} style={{ "--i": 7 }}>
              🛒 Cart
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={menuOpen ? "hamburger active" : "hamburger"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className="navbar-bottom-line"></div>
    </header>
  );
};

export default Navbar;