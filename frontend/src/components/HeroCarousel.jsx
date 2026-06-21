import { useEffect, useState } from "react";
import { HERO_SLIDES } from "../constants/dashboard";

export default function HeroCarousel({ onExplore }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[index];

  return (
    <section className="hero-carousel">
      <div className="hero-carousel__track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {HERO_SLIDES.map((s) => (
          <article key={s.image} className="hero-carousel__slide">
            <img src={s.image} alt={s.title} loading="lazy" />
            <div className="hero-carousel__overlay">
              <h2>{s.title}</h2>
              <p>{s.subtitle}</p>
              <button type="button" className="btn btn--light" onClick={() => onExplore(s.serviceId)}>
                Book now
              </button>
            </div>
          </article>
        ))}
      </div>
      <div className="hero-carousel__dots">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            className={i === index ? "active" : ""}
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
