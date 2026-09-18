import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import menuData from "../api/menuData.json";
import "./Menu.css";

const Menu = () => {
  const navigate = useNavigate();
  const cardsRef = useRef([]);
  const imagesRef = useRef([]);

  const openCategory = (slug) => {
    navigate(`/menu/${slug}`);
  };

  useEffect(() => {
    // Card entrance + typewriter trigger
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("card-visible");
            entry.target.classList.remove("card-hidden");

            const textBlock = entry.target.querySelector(".category-image-text");
            if (textBlock && !textBlock.classList.contains("type-in")) {
              textBlock.classList.add("type-in");
            }
          } else {
            entry.target.classList.remove("card-visible");
            entry.target.classList.add("card-hidden");
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    // Scroll parallax on images
    const handleScroll = () => {
      imagesRef.current.forEach((img) => {
        if (!img) return;
        const rect = img.getBoundingClientRect();
        const offset = (rect.top - window.innerHeight / 2) * 0.12;
        img.style.setProperty("--parallax", `${offset}px`);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="menu-section">

      {/* ================= HEADER ================= */}

      <div className="menu-header">
        <span className="menu-subtitle">EXPLORE OUR MENU</span>
        <h1>
          Choose Your <span>Favorite</span>
        </h1>
        <p>
          From traditional Pakistani flavors to delicious fast food,
          discover something special for everyone.
        </p>
      </div>

      {/* ================= CATEGORY CARDS ================= */}

      <div className="category-grid">
        {menuData.map((category, index) => (
          <div
            key={category.id}
            ref={(element) => {
              cardsRef.current[index] = element;
            }}
            className="category-card card-hidden"
            style={{ "--delay": `${(index % 3) * 0.12}s` }}
            onClick={() => openCategory(category.slug)}
          >
            <div className="category-image">
              <img
                ref={(el) => {
                  imagesRef.current[index] = el;
                }}
                src={category.image}
                alt={category.name}
              />

              <div className="image-gradient"></div>

              <div className="category-image-text">
                <h2 className="type-line" style={{ "--tdelay": "0s" }}>
                  {category.name}
                </h2>
                <span className="category-line"></span>
                <p className="type-line" style={{ "--tdelay": "0.12s" }}>
                  {category.description}
                </p>
              </div>

              <div className="category-count">
                <strong>{category.items.length}</strong>
                <small>Items</small>
              </div>

              <div className="view-menu">
                <span>View Menu</span>
                <strong>→</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Menu;