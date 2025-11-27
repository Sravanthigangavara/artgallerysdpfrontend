import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Gallery.css";

export default function Gallery() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const cardsRef = useRef(null);
  const autoRef = useRef(null);

  // --- Replace these with your real assets ---
  const slides = [
    { id: 1, src: "/assets/image7.jpg", title: "Curated Originals", subtitle: "Discover art you love" },
    { id: 2, src: "/assets/image.png", title: "Emerging Artists", subtitle: "Support new voices" },
    { id: 3, src: "/assets/lll.jpg", title: "Museum Quality", subtitle: "Shop with confidence" },
  ];

  const categoryCards = [
    { id: "abstract", title: "Abstract", desc: "Bold forms & colors", img: "/assets/image1.jpg" },
    { id: "landscape", title: "Landscapes", desc: "Nature & vistas", img: "/assets/image3.jpg" },
    { id: "portrait", title: "Portraits", desc: "Faces & stories", img: "/assets/image5.jpg" },
    { id: "modern", title: "Modern", desc: "Contemporary vision", img: "/assets/image6.jpg" },
    { id: "flowers", title: "Flowers", desc: "Beauty in bloom", img: "/assets/image4.jpg" },
  ];
  // -----------------------------------------

  const total = slides.length;

  const nextSlide = useCallback(() => setSlideIndex((s) => (s + 1) % total), [total]);
  const prevSlide = useCallback(() => setSlideIndex((s) => (s - 1 + total) % total), [total]);
  const goToSlide = (i) => setSlideIndex(((i % total) + total) % total);

  useEffect(() => {
    autoRef.current = setInterval(nextSlide, 4500);
    return () => clearInterval(autoRef.current);
  }, [nextSlide]);

  // Horizontal scroll for cards: scroll by visible width minus some gap
  const scrollCards = (dir) => {
    if (!cardsRef.current) return;
    const width = cardsRef.current.clientWidth;
    const amount = Math.round(width * 0.8);
    cardsRef.current.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth" });
  };

  // keyboard left/right to navigate carousel
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nextSlide, prevSlide]);

  return (
    <div className="va-page">
      {/* NAV */}
      <header className="va-header">
        <div className="va-header-inner">
          <Link to="/" className="va-logo" aria-label="VirtuArt home">
            <span className="va-logo-icon">🖼️</span>
            <span className="va-logo-text">ARTGALLERY</span>
          </Link>

          <nav className="va-nav" aria-label="Main navigation">
            <Link className="va-link" to="/">Home</Link>
            <Link className="va-link" to="/about">About Us</Link>
            <Link className="va-link" to="/contact">Contact</Link>
            <Link className="va-link" to="/login">Login</Link>
            <Link className="va-link" to="/register">Register</Link>
          </nav>
        </div>
      </header>

      {/* HERO + CAROUSEL */}
      <main className="va-main">
        <section className="va-hero">
          <div className="va-hero-inner">
            <div className="va-carousel" aria-roledescription="carousel">
              <div
                className="va-track"
                style={{ transform: `translateX(-${slideIndex * 100}%)` }}
                aria-live="polite"
              >
                {slides.map((s) => (
                  <figure className="va-slide" key={s.id}>
                    <img src={s.src} alt={s.title} loading="lazy" />
                    <figcaption className="va-caption">
                      <strong>{s.title}</strong>
                      <span>{s.subtitle}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>

              <button className="va-control va-prev" onClick={prevSlide} aria-label="Previous slide">‹</button>
              <button className="va-control va-next" onClick={nextSlide} aria-label="Next slide">›</button>

              <div className="va-dots" role="tablist" aria-label="Slide dots">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    className={`va-dot ${i === slideIndex ? "active" : ""}`}
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => goToSlide(i)}
                  />
                ))}
              </div>
            </div>

            <div className="va-hero-text">
              <h1>Find your next favorite artwork</h1>
              <p>Original pieces from emerging and established artists worldwide. Curated collections, secure checkout.</p>
              <div className="va-hero-actions">
                <Link to="/register" className="va-btn primary">Join as Collector</Link>
                <Link to="/about" className="va-btn ghost">Learn More</Link>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIES / CARDS */}
        <section className="va-categories">
          <div className="va-section-head">
            <h2>Explore Categories</h2>
            <p>Handpicked selections from our gallery</p>
          </div>

          <div className="va-cards-wrap">
            <button
              className="va-scroll-btn left"
              aria-label="Scroll categories left"
              onClick={() => scrollCards("prev")}
            >
              ‹
            </button>

            <div className="va-cards" ref={cardsRef}>
              {categoryCards.map((c) => (
                <article
                  className="va-card"
                  key={c.id}
                  onClick={() => setSelectedCard(c)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedCard(c)}
                >
                  <div className="va-card-media">
                    <img src={c.img} alt={c.title} loading="lazy" />
                  </div>
                  <div className="va-card-body">
                    <h3>{c.title}</h3>
                    <p>{c.desc}</p>
                  </div>
                </article>
              ))}
            </div>

            <button
              className="va-scroll-btn right"
              aria-label="Scroll categories right"
              onClick={() => scrollCards("next")}
            >
              ›
            </button>
          </div>
        </section>

        {/* FEATURE GRID (example section) */}
        <section className="va-feature-grid">
          <div className="va-grid-card">
            <img src="/assets/image2.jpg" alt="Featured artwork" loading="lazy" />
            <div className="va-grid-card-body">
              <h3>Featured Artist: Maya</h3>
              <p>Immersive watercolors that explore light and memory.</p>
              <Link to="/about" className="va-link-more">View collection →</Link>
            </div>
          </div>

          <div className="va-grid-card">
            <img src="/assets/image8.jpg" alt="Gallery" loading="lazy" />
            <div className="va-grid-card-body">
              <h3>Museum Quality Prints</h3>
              <p>Archival prints with museum-grade paper and framing options.</p>
              <Link to="/contact" className="va-link-more">Get a quote →</Link>
            </div>
          </div>
        </section>
      </main>

      {/* MODAL */}
      {selectedCard && (
        <aside
          className="va-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedCard.title} details`}
          onClick={() => setSelectedCard(null)}
        >
          <div className="va-modal-inner" onClick={(e) => e.stopPropagation()}>
            <button className="va-modal-close" aria-label="Close" onClick={() => setSelectedCard(null)}>×</button>
            <img src={selectedCard.img} alt={selectedCard.title} />
            <div className="va-modal-body">
              <h3>{selectedCard.title}</h3>
              <p>{selectedCard.desc}</p>
            </div>
          </div>
        </aside>
      )}

      {/* FOOTER */}
      <footer className="va-footer">
        <div className="va-footer-inner">
          <div>© {new Date().getFullYear()}ARTGALLERY — All rights reserved.</div>
          <div className="va-footer-links">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/register">Sign up</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
