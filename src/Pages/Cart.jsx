import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const itemsRef = useRef([]);

  const [cart, setCart] = useState(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    return Array.isArray(savedCart) ? savedCart : [];
  });

  // Check authentication before showing the cart
  const savedUser =
    JSON.parse(localStorage.getItem("user")) || null;

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  // Redirect in an effect instead of during render — doing it
  // during render caused a blank white flash before the
  // redirect happened
  useEffect(() => {
    if (!savedUser || !isLoggedIn) {
      if (!savedUser) {
        navigate("/signup",{state:{from:"/cart"}});
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedUser, isLoggedIn]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("item-visible");
            entry.target.classList.remove("item-hidden");
          } else {
            entry.target.classList.remove("item-visible");
            entry.target.classList.add("item-hidden");
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    itemsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [cart]);

  if (!savedUser || !isLoggedIn) {
    // The useEffect above is already redirecting — render
    // the normal cart section (styled) instead of null, so
    // there's no blank flash while the redirect happens
    return null;
  }

  // Quantity
  const updateQuantity = (id, change) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: Math.max(
            1,
            Number(item.quantity || 1) + change
          ),
        };
      }

      return item;
    });

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // Remove Item
  const removeItem = (id) => {
    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // Clear Cart
  const clearCart = () => {
    setCart([]);

    localStorage.removeItem("cart");
  };

  // Total items
  const totalItems = cart.reduce(
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  );

  // Total price
  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  // Empty cart
  if (cart.length === 0) {
    return (
      <section className="cart-section">
        <div className="empty-cart">
          <div className="empty-cart-box">
            <div className="empty-cart-icon">
              🛒
            </div>

            <h1>Your Cart is Empty</h1>

            <p>
              You haven't added anything to your cart yet...
            </p>

            <Link
              to="/menu"
              className="continue-shopping-btn"
            >
              Explore Menu
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-section">

      {/* Header */}
      <div className="cart-header">
        <span>YOUR ORDER</span>

        <h1>
          Shopping <strong>Cart</strong>
        </h1>

        <p>
          Review Your Selected items before Checkout...
        </p>
      </div>

      <div className="cart-container">

        <div className="cart-items">

          {cart.map((item, index) => (
            <div
              className="cart-item item-hidden"
              key={item.id}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              style={{
                "--item-delay": `${(index % 6) * 0.08}s`,
              }}
            >

              {/* Image */}
              <div className="cart-item-image">
                <img
                  src={item.image}
                  alt={item.name}
                />
              </div>

              {/* Information */}
              <div className="cart-item-info">

                <h2>{item.name}</h2>

                <p>
                  {item.description}
                </p>

                <strong>
                  Rs. {item.price}
                </strong>

              </div>

              {/* Actions */}
              <div className="cart-item-actions">

                <div className="quantity-box">

                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.id, -1)
                    }
                  >
                    −
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.id, 1)
                    }
                  >
                    +
                  </button>

                </div>

                {/* Item Total */}
                <strong className="item-total">
                  Rs.{" "}
                  {Number(item.price) *
                    Number(item.quantity)}
                </strong>

                {/* Remove */}
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() =>
                    removeItem(item.id)
                  }
                >
                  Remove
                </button>

              </div>

            </div>
          ))}

          {/* Bottom Buttons */}
          <div className="cart-bottom-buttons">

            <Link
              to="/menu"
              className="continue-btn"
            >
              ← Continue Shopping
            </Link>

            <button
              type="button"
              className="clear-cart-btn"
              onClick={clearCart}
            >
              Clear Cart
            </button>

          </div>

        </div>

        {/* Order Summary */}
        <div className="cart-summary">

          <h2>Order Summary</h2>

          <div className="summary-line">
            <span>Item</span>
            <span>{totalItems}</span>
          </div>

          <div className="summary-line">
            <span>Subtotal</span>
            <span>
              Rs. {totalPrice}
            </span>
          </div>

          <div className="summary-line">
            <span>Delivery</span>
            <span>Free</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-total">

            <span>Total</span>

            <strong>
              Rs. {totalPrice}
            </strong>

          </div>

          <button
            type="button"
            className="checkout-btn"
            onClick={() =>
              navigate("/checkout")
            }
          >
            Proceed to CheckOut →
          </button>

        </div>

      </div>

    </section>
  );
};

export default Cart;