import { useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

const Profile = ({ darkMode }) => {
   const [user, setUser] = useState(() => {
    const savedUser =
      JSON.parse(localStorage.getItem("user")) || null;

    const isLoggedIn =
      localStorage.getItem("isLoggedIn") === "true";

    if (!savedUser || !isLoggedIn) {
      return null;
    }

    return savedUser;
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");

  const handleLoginChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setLoginError("");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");

    sessionStorage.removeItem("cartAuthVerified");

    setUser(null);
  };

  const handleInlineLogin = (e) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      setLoginError("Please enter both email and password.");
      return;
    }

    const savedUser =
      JSON.parse(localStorage.getItem("user")) || null;

    if (!savedUser) {
      setLoginError("Account not found. Please create an account first.");
      return;
    }

    if (
      loginData.email !== savedUser.email ||
      loginData.password !== savedUser.password
    ) {
      setLoginError("Email or password is incorrect.");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");

    setUser(savedUser);
    setLoginData({ email: "", password: "" });
  };

  return (
    <section className={`profile-section ${darkMode ? "theme-dark" : "theme-light"}`}>

      <div className="profile-container">

        <div className="profile-icon">
          <span>✦</span>
        </div>

        <span className="profile-subtitle">
          MY ACCOUNT
        </span>

        {user ? (
          <>
            <h1>
              Welcome, <strong>{user.name}</strong>
            </h1>

            <p className="profile-description">
              Manage your account information and view
              your previous orders.
            </p>

            <div className="profile-card">

              <div className="profile-info">
                <span>FULL NAME</span>

                <h3>
                  {user.name}
                </h3>
              </div>

              <div className="profile-info">
                <span>EMAIL ADDRESS</span>

                <h3>
                  {user.email}
                </h3>
              </div>

            </div>

            <div className="profile-buttons">

              <Link
                to="/orders"
                className="profile-orders-btn"
              >
                📦 My Orders
              </Link>

              <button
                type="button"
                className="profile-logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>

            </div>
          </>
        ) : (
          <>
            <h1>
              Welcome to{" "}
              <strong>Maab's Kitchen</strong>
            </h1>

            <p className="profile-description">
              Login below to view your profile information
              and orders.
            </p>

            {/* INLINE LOGIN FORM */}
            <form className="profile-login-form" onSubmit={handleInlineLogin} autoComplete="off">

              <div className="profile-form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  autoComplete="off"
                />
              </div>

              <div className="profile-form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  autoComplete="new-password"
                />
              </div>

              {loginError && (
                <p className="profile-login-error">{loginError}</p>
              )}

              <div className="profile-login-actions">

                <button type="submit" className="profile-orders-btn profile-login-submit">
                  Login →
                </button>

                <Link
                  to="/signup"
                  state={{from:"/orders"}}
                  className="profile-logout-btn"
                >
                  Create Account
                </Link>

              </div>

            </form>
          </>
        )}

      </div>

    </section>
  );
};

export default Profile;