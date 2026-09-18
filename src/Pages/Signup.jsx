import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Signup.css";

const Signup = ({ darkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Where to go back to after signup — defaults to home if not given
  const from = location.state?.from || "/";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (formData.password.length < 6) {
      alert(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      alert("Passwords do not match.");
      return;
    }

    const existingUser =
      JSON.parse(
        localStorage.getItem("user")
      ) || null;

    if (
      existingUser &&
      existingUser.email === formData.email
    ) {
      alert(
        "This email is already registered. Please login."
      );

      navigate("/login", { state: { from } });
      return;
    }

    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(newUser)
    );

    // Sign the user in immediately — no separate Login step
    localStorage.setItem("isLoggedIn", "true");

    alert(
      "Account successfully created! 🎉"
    );

    // Go back to wherever the user came from
    navigate(from);
  };

  return (
    <section className={`signup-section ${darkMode ? "theme-dark" : "theme-light"}`}>

      <div className="signup-container">

        <div className="signup-content">

          <span>JOIN US</span>

          <h1>
            Create Your{" "}
            <strong>Account</strong>
          </h1>

          <p>
            Create your account and order your
            favorite food from Maab's Kitchen.
          </p>

        </div>

        <form
          className="signup-form"
          onSubmit={handleSignup}
          autoComplete="off"
        >

          <h2>Create Account</h2>

          <div className="signup-group">

            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="off"
              required
            />

          </div>

          <div className="signup-group">

            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
              required
            />

          </div>

          <div className="signup-group">

            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />

          </div>

          <div className="signup-group">

            <label>Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />

          </div>

          <button
            type="submit"
            className="signup-submit-btn"
          >
            Create Account
          </button>

          <p className="login-text">
            Already have an account?{" "}

            <Link to="/login" state={{ from }}>
              Login
            </Link>
          </p>

        </form>

      </div>

    </section>
  );
};

export default Signup;