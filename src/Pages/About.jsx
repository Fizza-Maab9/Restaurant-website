import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./About.css";

/* Reveals an element only once it scrolls into view */
const useReveal = (threshold = 0.2) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
};

const TypeText = ({ segments, start, speed = 16, onComplete, as: Tag = "span" }) => {
  const [segIndex, setSegIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const doneRef = useRef(false);
  useEffect(() => {
    if (!start) return;

    if (segIndex >= segments.length) {
      if (!doneRef.current) {
        doneRef.current = true;
        onComplete && onComplete();
      }
      return;
    }

    const current = segments[segIndex].text;

    if (charIndex >= current.length) {
      const t = setTimeout(() => {
        setSegIndex((s) => s + 1);
        setCharIndex(0);
      }, 60);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setCharIndex((c) => c + 1), speed);
    return () => clearTimeout(t);
  }, [start, segIndex, charIndex, segments, speed, onComplete]);

  return (
    <Tag>
      {segments.slice(0, segIndex).map((s, i) => (
        <span key={i} className={s.accent ? "type-accent" : undefined}>
          {s.text}
        </span>
      ))}
      {segIndex < segments.length && (
        <span className={segments[segIndex].accent ? "type-accent" : undefined}>
          {segments[segIndex].text.slice(0, charIndex)}
        </span>
      )}
      {start && segIndex < segments.length && <span className="type-cursor">|</span>}
    </Tag>
  );
};

const About = ({ darkMode }) => {
  const [heroRef, heroVisible] = useReveal(0.1);
  const [storyRef, storyVisible] = useReveal();
  const [whyRef, whyVisible] = useReveal();
  const [ctaRef, ctaVisible] = useReveal();

  const [heroTextStart, setHeroTextStart] = useState(false);
  const [heroSubStart, setHeroSubStart] = useState(false);

  const [storyTextStart, setStoryTextStart] = useState(false);
  const [storySubStart, setStorySubStart] = useState(false);

  const [whyTextStart, setWhyTextStart] = useState(false);
  const [whySubStart, setWhySubStart] = useState(false);

  const [ctaTextStart, setCtaTextStart] = useState(false);

  // Image reveals first, then a short beat later the heading starts typing
  useEffect(() => {
    if (heroVisible) {
      const t = setTimeout(() => setHeroTextStart(true), 450);
      return () => clearTimeout(t);
    }
  }, [heroVisible]);

  useEffect(() => {
    if (storyVisible) {
      const t = setTimeout(() => setStoryTextStart(true), 450);
      return () => clearTimeout(t);
    }
  }, [storyVisible]);

  useEffect(() => {
    if (whyVisible) {
      const t = setTimeout(() => setWhyTextStart(true), 250);
      return () => clearTimeout(t);
    }
  }, [whyVisible]);

  useEffect(() => {
    if (ctaVisible) {
      const t = setTimeout(() => setCtaTextStart(true), 250);
      return () => clearTimeout(t);
    }
  }, [ctaVisible]);

  return (
    <section className={`about-section ${darkMode ? "theme-dark" : "theme-light"}`}>

      {/* HERO SECTION */}

      <div className="about-hero" ref={heroRef}>

        <div className="about-content">

          <span className={`about-subtitle reveal ${heroVisible ? "revealed" : ""}`}>
            ABOUT MAAB'S KITCHEN
          </span>

          <h1>
            <TypeText
              start={heroTextStart}
              onComplete={() => setHeroSubStart(true)}
              segments={[
                { text: "Good Food, " },
                { text: "Great Moments", accent: true },
              ]}
            />
          </h1>

          <p className={heroSubStart ? "" : "text-hidden"}>
            <TypeText
              start={heroSubStart}
              speed={8}
              segments={[
                {
                  text:
                    "At Maab's Kitchen, we combine fresh ingredients, delicious flavors, and quality food to create a memorable dining experience for everyone.",
                },
              ]}
            />
          </p>

          <Link
            to="/menu"
            className={`about-menu-btn reveal ${heroSubStart ? "revealed" : ""}`}
          >
            Explore Our Menu →
          </Link>

        </div>


        <div className={`about-image reveal ${heroVisible ? "revealed" : ""}`}>

          <img
            src="https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=1200&q=80"
            alt="Maab's Kitchen Restaurant"
          />

        </div>

      </div>


      {/* OUR STORY */}

      <div className="about-story" ref={storyRef}>

        <div className={`story-image reveal ${storyVisible ? "revealed" : ""}`}>

          <img
            src="https://images.unsplash.com/photo-1763867641077-d672d26f2ccb?auto=format&fit=crop&w=1200&q=80"
            alt="Restaurant food"
          />

        </div>


        <div className="story-content">

          <span className={`section-label reveal ${storyVisible ? "revealed" : ""}`}>
            OUR STORY
          </span>

          <h2>
            <TypeText
              start={storyTextStart}
              onComplete={() => setStorySubStart(true)}
              segments={[
                { text: "Made With " },
                { text: "Love & Flavor", accent: true },
              ]}
            />
          </h2>

          <p>
            <TypeText
              start={storySubStart}
              speed={7}
              segments={[
                {
                  text:
                    "Maab's Kitchen was created with a simple idea: to serve delicious food in a comfortable and welcoming environment.",
                },
              ]}
            />
          </p>

          <p className={`reveal ${storySubStart ? "revealed" : ""}`}>
            From traditional Pakistani dishes to burgers,
            pizza, pasta, momos, desserts, and refreshing
            drinks, our menu offers something for everyone.
          </p>


          <div className={`story-features reveal ${storySubStart ? "revealed" : ""}`}>

            <div className="story-feature">
              <span>🍃</span>
              <div>
                <h3>Fresh Ingredients</h3>
                <p>We use quality and fresh ingredients.</p>
              </div>
            </div>

            <div className="story-feature">
              <span>👨‍🍳</span>
              <div>
                <h3>Made With Care</h3>
                <p>Every order is prepared with attention.</p>
              </div>
            </div>

            <div className="story-feature">
              <span>❤️</span>
              <div>
                <h3>Customer First</h3>
                <p>Customer satisfaction is our priority.</p>
              </div>
            </div>

          </div>

        </div>

      </div>


      {/* WHY CHOOSE US */}

      <div className="about-why" ref={whyRef}>

        <div className="why-header">

          <span className={`section-label reveal ${whyVisible ? "revealed" : ""}`}>
            WHY CHOOSE US
          </span>

          <h2>
            <TypeText
              start={whyTextStart}
              onComplete={() => setWhySubStart(true)}
              segments={[
                { text: "Why People Love " },
                { text: "Maab's Kitchen", accent: true },
              ]}
            />
          </h2>

          <p>
            <TypeText
              start={whySubStart}
              speed={7}
              segments={[
                {
                  text: "Delicious food, quality ingredients, and friendly service — all in one place.",
                },
              ]}
            />
          </p>

        </div>


        <div className={`why-grid ${whySubStart ? "revealed" : ""}`}>

          <div className="why-card" style={{ "--d": "0s" }}>
            <div className="why-icon">🥗</div>
            <h3>Fresh Food</h3>
            <p>Fresh ingredients are used to prepare delicious and quality food.</p>
          </div>

          <div className="why-card" style={{ "--d": "0.12s" }}>
            <div className="why-icon">🍽️</div>
            <h3>Wide Menu</h3>
            <p>Enjoy Pakistani food, fast food, desserts, drinks, and much more.</p>
          </div>

          <div className="why-card" style={{ "--d": "0.24s" }}>
            <div className="why-icon">⚡</div>
            <h3>Quick Service</h3>
            <p>We prepare every order carefully and efficiently.</p>
          </div>

          <div className="why-card" style={{ "--d": "0.36s" }}>
            <div className="why-icon">❤️</div>
            <h3>Made With Love</h3>
            <p>Every dish is prepared with quality, care, and passion.</p>
          </div>

        </div>

      </div>


      {/* CALL TO ACTION */}

      <div className="about-cta" ref={ctaRef}>

        <div>
          <span className={`reveal ${ctaVisible ? "revealed" : ""}`}>READY TO ORDER?</span>

          <h2>
            <TypeText
              start={ctaTextStart}
              speed={10}
              segments={[
                { text: "Taste Something " },
                { text: "Delicious Today!", accent: true },
              ]}
            />
          </h2>
        </div>

        <Link
          to="/menu"
          className={`about-cta-btn reveal ${ctaVisible ? "revealed" : ""}`}
        >
          Order Now →
        </Link>

      </div>

    </section>
  );
};

export default About;
