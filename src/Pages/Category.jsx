import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import menuData from "../api/menuData.json";
import "./Category.css";

const Category = () => {
  const { categorySlug } = useParams();
  const cardsRef = useRef([]);

  const [reviews, setReviews] = useState(() => {
    return JSON.parse(localStorage.getItem("reviews")) || {};
  });

  const [activeReview, setActiveReview] = useState(null);
  const [openReviews, setOpenReviews] = useState(null);
  const [expandedList, setExpandedList] = useState({});
  const [addedItem, setAddedItem] = useState(null);
  const [reviewData, setReviewData] = useState({
    name: "",
    rating: 0,
    review: "",
  });

  const category = menuData.find(
    (item) => item.slug === categorySlug
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("card-visible");
            entry.target.classList.remove("card-hidden");
          } else {
            entry.target.classList.remove("card-visible");
            entry.target.classList.add("card-hidden");
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [category]);

  if (!category) {
    return (
      <section className="category-section">
        <div className="category-not-found">
          <h1>Category Not Found</h1>
          <p>This category does not exist.</p>
        </div>
      </section>
    );
  }

  // Add to cart — no login required here anymore
  const addToCart = (item) => {
    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = existingCart.find(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItem) {
      const updatedCart = existingCart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...existingCart, { ...item, quantity: 1 }];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    setAddedItem(item.id);
    setTimeout(() => setAddedItem(null), 1500);
  };

  const openReview = (item) => {
    setReviewData({ name: "", rating: 0, review: "" });
    setActiveReview(item.id);
    setOpenReviews(item.id);
  };

  const submitReview = (item) => {
    if (!reviewData.name.trim()) {
      alert("Please enter your name.");
      return;
    }
    if (reviewData.rating === 0) {
      alert("Please select a rating.");
      return;
    }
    if (!reviewData.review.trim()) {
      alert("Please write a review.");
      return;
    }

    const newReview = {
      id: Date.now(),
      itemId: item.id,
      itemName: item.name,
      name: reviewData.name.trim(),
      rating: reviewData.rating,
      review: reviewData.review.trim(),
      date: new Date().toLocaleDateString(),
    };

    const oldItemReviews = Array.isArray(reviews[item.id])
      ? reviews[item.id]
      : [];

    const updatedReviews = {
      ...reviews,
      [item.id]: [...oldItemReviews, newReview],
    };

    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
    setReviews(updatedReviews);
    setActiveReview(null);
    setReviewData({ name: "", rating: 0, review: "" });
  };

  const getAverageRating = (item) => {
    const itemReviews = Array.isArray(reviews[item.id])
      ? reviews[item.id]
      : [];

    if (itemReviews.length === 0) {
      return item.rating || 0;
    }

    const totalRating = itemReviews.reduce(
      (total, review) => total + Number(review.rating || 0),
      0
    );

    return (totalRating / itemReviews.length).toFixed(1);
  };

  const toggleExpandList = (itemId) => {
    setExpandedList((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  return (
    <section className="category-section">

      {/* Category Header */}
      <div className="category-header">
        <span>OUR MENU</span>
        <h1>{category.name}</h1>
        <p>{category.description}</p>
      </div>

      {/* Category Items */}
      <div className="category-grid">

        {category.items.map((item, index) => {

          const itemReviews = Array.isArray(reviews[item.id])
            ? reviews[item.id]
            : [];

          const averageRating = getAverageRating(item);
          const isReviewsOpen = openReviews === item.id;
          const isExpanded = !!expandedList[item.id];

          const visibleReviews = isExpanded
            ? itemReviews
            : itemReviews.slice(0, 1);

          return (
            <div
              className="category-card card-hidden"
              key={item.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              style={{ "--card-delay": `${(index % 4) * 0.1}s` }}
            >

              {/* Dish Image — plain text directly on picture, no box */}
              <div className="category-image">
                <img src={item.image} alt={item.name} />
                <div className="image-gradient"></div>

                <div className="category-image-text">
                  <h2>{item.name}</h2>

                  <span className="category-price">
                    Rs. {item.price}
                  </span>

                  <span className="category-line"></span>

                  <p className="category-description">
                    {item.description}
                  </p>

                  <div className="dish-rating">
                    <span className="rating-pill">
                      ⭐ {averageRating}
                    </span>
                    <span className="rating-count">
                      ({itemReviews.length} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Dish Content — cart button + compact review accordion */}
              <div className="category-content">

                <button
                  type="button"
                  className="add-cart-btn"
                  onClick={() => addToCart(item)}
                >
                  {addedItem === item.id
                    ? "✓ Added to Cart"
                    : "Add to Cart"}
                </button>

                <div className="dish-review-section">

                  {/* Compact toggle bar */}
                  <button
                    type="button"
                    className="review-toggle"
                    onClick={() =>
                      setOpenReviews(isReviewsOpen ? null : item.id)
                    }
                  >
                    <div className="review-toggle-left">

                      <div className="review-avatars">
                        {itemReviews.slice(0, 3).map((review, i) => (
                          <span
                            className="mini-avatar"
                            key={review.id}
                            style={{ zIndex: 3 - i }}
                          >
                            {(review.name || "C").charAt(0).toUpperCase()}
                          </span>
                        ))}

                        {itemReviews.length === 0 && (
                          <span className="mini-avatar mini-avatar-empty">
                            —
                          </span>
                        )}
                      </div>

                      <span className="review-toggle-text">
                        {itemReviews.length > 0
                          ? `${itemReviews.length} Review${itemReviews.length > 1 ? "s" : ""}`
                          : "No reviews yet"}
                      </span>

                    </div>

                    <span
                      className={
                        isReviewsOpen
                          ? "review-chevron open"
                          : "review-chevron"
                      }
                    >
                      ▾
                    </span>
                  </button>

                  {/* Expandable panel */}
                  <div
                    className={
                      isReviewsOpen
                        ? "review-panel review-panel-open"
                        : "review-panel"
                    }
                  >

                    <div className="review-panel-inner">

                      {itemReviews.length > 0 ? (
                        <>
                          <div className="reviews-list">
                            {visibleReviews.map((review) => {
                              const customerName = review.name || "Customer";

                              return (
                                <div className="dish-review" key={review.id}>

                                  <div className="review-user">
                                    <div className="review-avatar">
                                      {customerName.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                      <strong>{customerName}</strong>
                                      <small>{review.date || "Recently"}</small>
                                    </div>
                                  </div>

                                  <div className="review-stars">
                                    {Array.from(
                                      { length: Number(review.rating) || 0 },
                                      (_, i) => <span key={i}>⭐</span>
                                    )}
                                  </div>

                                  <p>"{review.review}"</p>

                                </div>
                              );
                            })}
                          </div>

                          {itemReviews.length > 1 && (
                            <button
                              type="button"
                              className="show-more-btn"
                              onClick={() => toggleExpandList(item.id)}
                            >
                              {isExpanded
                                ? "Show Less"
                                : `Show ${itemReviews.length - 1} More Review${itemReviews.length - 1 > 1 ? "s" : ""}`}
                            </button>
                          )}
                        </>
                      ) : (
                        <p className="no-review">No reviews yet.</p>
                      )}

                      <button
                        type="button"
                        className="review-btn"
                        onClick={() => openReview(item)}
                      >
                        Add ⭐ Rate & Review
                      </button>

                      {activeReview === item.id && (
                        <div className="review-form">
                          <h4>Rate {item.name}</h4>

                          <input
                            type="text"
                            placeholder="Enter your name"
                            value={reviewData.name}
                            onChange={(e) =>
                              setReviewData((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                          />

                          <div className="rating-input">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                type="button"
                                key={star}
                                className={
                                  star <= reviewData.rating
                                    ? "rating-star active"
                                    : "rating-star"
                                }
                                onClick={() =>
                                  setReviewData((prev) => ({
                                    ...prev,
                                    rating: star,
                                  }))
                                }
                              >
                                ★
                              </button>
                            ))}
                          </div>

                          <textarea
                            rows="4"
                            placeholder="Write your review..."
                            value={reviewData.review}
                            onChange={(e) =>
                              setReviewData((prev) => ({
                                ...prev,
                                review: e.target.value,
                              }))
                            }
                          ></textarea>

                          <div className="review-actions">
                            <button
                              type="button"
                              className="submit-review-btn"
                              onClick={() => submitReview(item)}
                            >
                              Submit Review
                            </button>

                            <button
                              type="button"
                              className="cancel-review-btn"
                              onClick={() => {
                                setActiveReview(null);
                                setReviewData({ name: "", rating: 0, review: "" });
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}

                    </div>

                  </div>

                </div>

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
};

export default Category;