import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section">

      {/* Glowing top border */}
      <div className="footer-top-line"></div>

      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand footer-column">

          <Link to="/" className="footer-logo">
            <span className="footer-logo-badge">
               🍽️
              </span>
            <span className="footer-logo-text">
              Maab's <em>Kitchen</em>
            </span>
          </Link>

          <p className="footer-description">
            Delicious food, fresh ingredients, and unforgettable
            flavors made with love.
          </p>

          <Link to="/menu" className="footer-order-btn">
            Explore Menu →
          </Link>

        </div>


        {/* Quick Links */}
        <div className="footer-column">

          <h3>Quick Links</h3>

          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/menu">Menu</Link>
            </li>

            <li>
              <Link to="/about">About</Link>
            </li>

            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>

        </div>


        {/* Customer */}
        <div className="footer-column">

          <h3>Customer</h3>

          <ul>
            <li>
              <Link to="/cart">Cart</Link>
            </li>

            <li>
              <Link to="/orders">My Orders</Link>
            </li>

            <li>
              <Link to="/profile">Profile</Link>
            </li>

            <li>
              <Link to="/checkout">Checkout</Link>
            </li>
          </ul>

        </div>


        {/* Contact */}
        <div className="footer-column footer-contact">

          <h3>Contact Us</h3>

          <div className="footer-contact-item">
            <span>📞</span>
            <p>+92 341 7194113</p>
          </div>

          <div className="footer-contact-item">
            <span>💬</span>
            <p>WhatsApp Orders</p>
          </div>

          <div className="footer-contact-item">
            <span>📍</span>
            <p>Pakistan</p>
          </div>

        </div>

      </div>


      {/* Bottom */}
      <div className="footer-bottom">

        <p>
          © {currentYear}{" "}
          <strong>Maab's Kitchen</strong>.
          All rights reserved.
        </p>
{/* 
        <Link to="/" className="footer-top-btn">
          ↑
        </Link> */}

      </div>

    </footer>
  );
};

export default Footer;


