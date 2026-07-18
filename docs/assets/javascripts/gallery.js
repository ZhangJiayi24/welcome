function initializeDormGallery(gallery) {
  if (gallery.dataset.galleryReady === "true") return;

  const viewport = gallery.querySelector("[data-gallery-viewport]");
  const slides = Array.from(gallery.querySelectorAll("[data-gallery-slide]"));
  const previous = gallery.querySelector("[data-gallery-prev]");
  const next = gallery.querySelector("[data-gallery-next]");
  const current = gallery.querySelector("[data-gallery-current]");
  const total = gallery.querySelector("[data-gallery-total]");

  if (!viewport || slides.length === 0) return;
  gallery.dataset.galleryReady = "true";
  if (total) total.textContent = String(slides.length);

  const activeIndex = () => {
    const width = viewport.clientWidth || 1;
    return Math.min(slides.length - 1, Math.max(0, Math.round(viewport.scrollLeft / width)));
  };

  const update = () => {
    const index = activeIndex();
    if (current) current.textContent = String(index + 1);
    if (previous) previous.disabled = index === 0;
    if (next) next.disabled = index === slides.length - 1;
  };

  const goTo = (index) => {
    slides[Math.min(slides.length - 1, Math.max(0, index))].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  previous?.addEventListener("click", () => goTo(activeIndex() - 1));
  next?.addEventListener("click", () => goTo(activeIndex() + 1));
  viewport.addEventListener("scroll", update, { passive: true });
  viewport.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") goTo(activeIndex() - 1);
    if (event.key === "ArrowRight") goTo(activeIndex() + 1);
  });
  window.addEventListener("resize", update);
  update();
}

function initializeDormGalleries() {
  document.querySelectorAll("[data-gallery]").forEach(initializeDormGallery);
}

document.addEventListener("DOMContentLoaded", initializeDormGalleries);
