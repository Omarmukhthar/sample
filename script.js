document.addEventListener("DOMContentLoaded", () => {
  const contactSection = document.getElementById("contact");
  const scrollBtn = document.querySelector(".btn--primary");
  const cards = document.querySelectorAll(".card");
  const orbs = document.querySelectorAll(".orb");

  // Smooth scroll to contact
  scrollBtn.addEventListener("click", (e) => {
    e.preventDefault();
    contactSection.scrollIntoView({ behavior: "smooth" });
  });

  // Reveal cards on scroll
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  cards.forEach(card => {
    observer.observe(card);
  });

  // Parallax effect on orbs
  document.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e;

    orbs.forEach((orb, index) => {
      const speed = 0.02 + index * 0.01;
      orb.style.transform = `translate(${clientX * speed}px, ${clientY * speed}px)`;
    });
  });

  // Keyboard accessibility
  cards.forEach(card => {
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });

  // Copy phone number on click
  cards.forEach(card => {
    if (card.textContent.includes("Phone")) {
      card.addEventListener("click", () => {
        navigator.clipboard.writeText("+918754643365")
          .then(() => showToast("Phone number copied!"))
          .catch(() => showToast("Copy failed. Try manually."));
      });
    }
  });

  // Toast notification
  function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("fade-out");
      toast.addEventListener("transitionend", () => toast.remove());
    }, 2500);
  }

  // Typing effect in subtitle
  const subtitle = document.querySelector(".hero__subtitle");
  const text = "I build modern, responsive websites with clean UI & UX.";
  let index = 0;

  function typeEffect() {
    if (index < text.length) {
      subtitle.textContent += text.charAt(index);
      index++;
      setTimeout(typeEffect, 50);
    }
  }

  subtitle.textContent = "";
  typeEffect();

  // Scroll to top button behavior
  const scrollTopBtn = document.getElementById("scrollTop");

  window.addEventListener("scroll", () => {
    scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
  // Reveal hero section on scroll
  const hero = document.querySelector(".hero");
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.4 });

  heroObserver.observe(hero);
