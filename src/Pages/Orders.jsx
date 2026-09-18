import { useState } from "react";
import { Link } from "react-router-dom";
import "./Orders.css";

const Orders = ({ darkMode }) => {
  const [orders, setOrders] = useState(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const currentUser =
      JSON.parse(localStorage.getItem("user")) || null;

    if (!currentUser || !Array.isArray(savedOrders)) {
      return [];
    }

    return savedOrders
      .filter(
        (order) =>
          order.userEmail === currentUser.email
      )
      .reverse();
  });

  const [openOrderId, setOpenOrderId] = useState(null);

  const toggleOrder = (id) => {
    setOpenOrderId((prev) => (prev === id ? null : id));
  };

  const clearOrders = () => {
    const currentUser =
      JSON.parse(localStorage.getItem("user")) || null;

    if (!currentUser) {
      return;
    }

    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    if (!Array.isArray(savedOrders)) {
      return;
    }

    const remainingOrders = savedOrders.filter(
      (order) =>
        order.userEmail !== currentUser.email
    );

    localStorage.setItem(
      "orders",
      JSON.stringify(remainingOrders)
    );

    setOrders([]);
  };

  if (orders.length === 0) {
    return (
      <section className={`orders-section empty-orders ${darkMode ? "theme-dark" : "theme-light"}`}>

        <div className="empty-orders-box">

          <div className="empty-orders-icon">
            📦
          </div>

          <h1>
            No Orders Yet
          </h1>

          <p>
            You haven't placed any orders yet.
          </p>

          <Link
            to="/menu"
            className="orders-menu-btn"
          >
            Explore Menu
          </Link>

        </div>

      </section>
    );
  }

  return (
    <section className={`orders-section ${darkMode ? "theme-dark" : "theme-light"}`}>

      <div className="orders-header">

        <span>
          MY ORDERS
        </span>

        <h1>
          Your <strong>Orders</strong>
        </h1>

        <p>
          Tap on an order to see the full details.
        </p>

      </div>

      <div className="orders-container">

        {orders.map((order, index) => {
          const isOpen = openOrderId === order.id;
          const itemCount = order.items?.reduce(
            (sum, item) => sum + Number(item.quantity || 0),
            0
          );

          return (
            <div
              className={`order-card ${isOpen ? "open" : ""}`}
              key={order.id}
              style={{ "--i": index }}
            >

              {/* COMPACT SUMMARY ROW — always visible, click to expand */}
              <button
                type="button"
                className="order-summary-row"
                onClick={() => toggleOrder(order.id)}
              >
                <div className="order-summary-left">
                  <div className="order-stamp">#{String(order.id).slice(-4)}</div>

                  <div className="order-summary-text">
                    <span className="order-badge">Confirmed</span>
                    <h2>{order.customer?.name || "Your Order"}</h2>
                    <p>{order.date} · {itemCount} item{itemCount === 1 ? "" : "s"}</p>
                  </div>
                </div>

                <div className="order-summary-right">
                  <strong>Rs. {order.total}</strong>
                  <span className={`order-chevron ${isOpen ? "rotated" : ""}`}>▾</span>
                </div>
              </button>

              {/* EXPANDABLE DETAILS */}
              <div className={`order-details ${isOpen ? "expanded" : ""}`}>
                <div className="order-details-inner">

                  <div className="customer-box">

                    <h3>
                      Customer Details
                    </h3>

                    <p>
                      <strong>
                        Name:
                      </strong>{" "}
                      {order.customer?.name}
                    </p>

                    <p>
                      <strong>
                        Phone:
                      </strong>{" "}
                      {order.customer?.phone}
                    </p>

                    <p>
                      <strong>
                        Address:
                      </strong>{" "}
                      {order.customer?.address}
                    </p>

                    <p>
                      <strong>
                        City:
                      </strong>{" "}
                      {order.customer?.city}
                    </p>

                    <p>
                      <strong>
                        Payment:
                      </strong>{" "}
                      {order.customer?.payment}
                    </p>

                  </div>

                  <div className="ordered-items">

                    <h3>
                      Ordered Items
                    </h3>

                    {order.items?.map((item) => (
                      <div
                        className="ordered-item"
                        key={item.id}
                      >

                        <div className="ordered-item-image">

                          <img
                            src={item.image}
                            alt={item.name}
                          />

                        </div>

                        <div className="ordered-item-info">

                          <h4>
                            {item.name}
                          </h4>

                          <p>
                            Quantity: {item.quantity}
                          </p>

                        </div>

                        <strong>
                          Rs.{" "}
                          {Number(item.price) *
                            Number(item.quantity)}
                        </strong>

                      </div>
                    ))}

                  </div>

                  <div className="order-total">

                    <span>
                      Total Amount
                    </span>

                    <strong>
                      Rs. {order.total}
                    </strong>

                  </div>

                </div>
              </div>

            </div>
          );
        })}

      </div>

      <div className="orders-actions">

        <Link
          to="/menu"
          className="orders-menu-btn"
        >
          ← Order More
        </Link>

        <button
          type="button"
          className="clear-orders-btn"
          onClick={clearOrders}
        >
          Clear Order History
        </button>

      </div>

    </section>
  );
};

export default Orders;