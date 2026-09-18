import { Link } from "react-router-dom";
import "./Home.css";

const Home = ({ darkMode }) => {
  return (
    <section className={`home-section ${darkMode ? "theme-dark" : "theme-light"}`}>

      <div className="home-overlay"></div>

      <div className="home-content">

        <span className="home-small-title">
          Welcome to Maab's Kitchen
        </span>

        <h1>
          Delicious Food,
          <span className="glow-text"> Made With Love</span>
        </h1>

        <p>
          Fresh ingredients, delicious flavors and a warm dining
          experience — all made especially for you.
        </p>

        <div className="home-buttons">

          <Link to="/menu" className="primary-btn">
            Explore Menu
          </Link>

          <Link to="/contact" className="secondary-btn">
            Contact
          </Link>

        </div>

        <div className="home-features">

          <div>
            <span>🍃
           Fresh Ingredients
           </span>
          </div>

          <div>
            <span>👨‍🍳
            Expert Chefs
            </span>
          </div>

          <div>
            <span>❤️
            Made With Love
            </span>
          </div>

        </div>

        {/* <div className="floating-card">
          <span>⭐</span>
          <div>
            <strong>4.9</strong>
            <small>Customer Rating</small>
          </div>
        </div> */}

      </div>

    </section>
  );
};

export default Home;