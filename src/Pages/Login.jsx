import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ darkMode }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add pending item to cart after login
  const addPendingItemToCart = () => {
    const pendingItem =
      JSON.parse(
        localStorage.getItem("pendingCartItem")
      ) || null;

    if (!pendingItem) {
      return;
    }

    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = existingCart.find(
      (item) => item.id === pendingItem.id
    );

    let updatedCart;

    if (existingItem) {
      updatedCart = existingCart.map((item) =>
        item.id === pendingItem.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          ...pendingItem,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    localStorage.removeItem("pendingCartItem");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const savedUser =
      JSON.parse(localStorage.getItem("user")) || null;

    if (!savedUser) {
      alert(
        "Account not found. Please signup first."
      );

      navigate("/signup");
      return;
    }

    if (
      formData.email !== savedUser.email ||
      formData.password !== savedUser.password
    ) {
      alert(
        "Email or password is incorrect."
      );

      return;
    }

    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    addPendingItemToCart();


    // Return user to the page where Add to Cart was clicked
    const pendingPath =
      localStorage.getItem("pendingCartPath");

    if (pendingPath) {
      localStorage.removeItem(
        "pendingCartPath"
      );

      navigate(pendingPath);
    } else {
      navigate("/orders");
    }
  };

  return (
    <section className={`login-section ${darkMode ? "theme-dark" : "theme-light"}`}>

      <div className="login-container">

        <div className="login-content">

          <span>WELCOME BACK</span>

          <h1>
            Login to{" "}
            <strong>Maab's Kitchen</strong>
          </h1>

          <p>
            Login to your account and continue
            ordering your favorite food.
          </p>

        </div>

        <form
          className="login-form"
          onSubmit={handleLogin}
          autoComplete="off"
        >

          <h2>Login</h2>

          <div className="login-group">

            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              autoComplete=""
              required
            />

          </div>

          <div className="login-group">

            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />

          </div>

          <button
            type="submit"
            className="login-submit-btn"
          >
            Login
          </button>

          <p className="signup-text">
            Don't have an account?{" "}

            <Link to="/signup">
              Create Account
            </Link>
          </p>

        </form>

      </div>

    </section>
  );
};

export default Login;