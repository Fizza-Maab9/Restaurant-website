import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();

  const [cart] = useState(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    return Array.isArray(savedCart) ? savedCart : [];
  });

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    payment: "Cash on Delivery",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty!");
      navigate("/menu");
      return;
    }

    if (
      !formData.name ||
      !formData.phone ||
      !formData.address ||
      !formData.city
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const loggedInUser =
      JSON.parse(localStorage.getItem("user")) || null;

    const isLoggedIn =
      localStorage.getItem("isLoggedIn") === "true";

    if (!loggedInUser || !isLoggedIn) {
      alert("Please login before placing your order.");
      navigate("/login");
      return;
    }

    let message = `Hello Maab's Kitchen!%0A%0A`;
    message += `*New Order* 🍽️%0A%0A`;

    message += `*Customer Details:*%0A`;
    message += `Name: ${formData.name}%0A`;
    message += `Phone: ${formData.phone}%0A`;
    message += `Address: ${formData.address}%0A`;
    message += `City: ${formData.city}%0A`;
    message += `Payment: ${formData.payment}%0A%0A`;

    message += `*Order Details:*%0A`;

    cart.forEach((item) => {
      message += `${item.name} x ${item.quantity} = Rs. ${
        item.price * item.quantity
      }%0A`;
    });

    message += `%0A*Total: Rs. ${totalPrice}*`;

    const whatsappNumber = "923417194113";

    const whatsappURL =
      `https://wa.me/${whatsappNumber}?text=${message}`;

    const order = {
      id: Date.now(),

      userEmail: loggedInUser.email,

      customer: {
        ...formData,
        accountName: loggedInUser.name,
        accountEmail: loggedInUser.email,
      },

      items: cart,

      total: totalPrice,

      date: new Date().toLocaleString(),
    };

    const oldOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const safeOldOrders = Array.isArray(oldOrders)
      ? oldOrders
      : [];

    localStorage.setItem(
      "orders",
      JSON.stringify([
        ...safeOldOrders,
        order,
      ])
    );

    localStorage.removeItem("cart");

    window.open(whatsappURL, "_blank");

    alert(
      "Your order has been placed successfully! 🎉"
    );

    navigate("/menu");
  };

  return (
    <section className="checkout-section">

      <div className="checkout-header">
        <span>CHECKOUT</span>

        <h1>
          Complete Your <strong>Order</strong>
        </h1>

        <p>
          Enter your details and confirm your delicious order.
        </p>
      </div>

      <div className="checkout-container">

        <form
          className="checkout-form"
          onSubmit={handlePlaceOrder}
        >
          <h2>Customer Details</h2>

          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>

            <input
              type="tel"
              name="phone"
              placeholder="03XX XXXXXXX"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Address</label>

            <textarea
              name="address"
              placeholder="Enter your complete address"
              value={formData.address}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>

          <div className="form-group">
            <label>City</label>

            <input
              type="text"
              name="city"
              placeholder="Enter your city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Payment Method</label>

            <select
              name="payment"
              value={formData.payment}
              onChange={handleChange}
            >
              <option value="Cash on Delivery">
                Cash on Delivery
              </option>

              <option value="Bank Transfer">
                Bank Transfer
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="place-order-btn"
          >
            Place Order 🍽️
          </button>
        </form>

        <div className="checkout-summary">

          <h2>Your Order</h2>

          <div className="checkout-items">

            {cart.length === 0 ? (
              <p className="no-items">
                Your cart is empty.
              </p>
            ) : (
              cart.map((item) => (
                <div
                  className="checkout-item"
                  key={item.id}
                >
                  <div className="checkout-item-image">
                    <img
                      src={item.image}
                      alt={item.name}
                    />
                  </div>

                  <div className="checkout-item-info">
                    <h3>{item.name}</h3>

                    <p>
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <strong>
                    Rs.{" "}
                    {Number(item.price) *
                      Number(item.quantity)}
                  </strong>
                </div>
              ))
            )}

          </div>

          <div className="checkout-divider"></div>

          <div className="checkout-total">
            <span>Total</span>

            <strong>
              Rs. {totalPrice}
            </strong>
          </div>

          <button
            type="button"
            className="back-cart-btn"
            onClick={() => navigate("/cart")}
          >
            ← Back to Cart
          </button>

        </div>

      </div>

    </section>
  );
};

export default Checkout;