const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navItems.forEach((link) => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
}));

const setActiveLink = () => {
  let current = "home";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 150) current = section.id;
  });
  navItems.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${current}`));
};
window.addEventListener("scroll", setActiveLink);

const skillsObserver = new IntersectionObserver((entries, observer) => {
  if (entries[0].isIntersecting) {
    document.querySelectorAll(".skill").forEach((skill) => {
      skill.querySelector(".progress-bar").style.width = `${skill.dataset.level}%`;
    });
    observer.disconnect();
  }
}, { threshold: 0.25 });
skillsObserver.observe(document.querySelector("#skills"));

const form = document.querySelector(".contact-form");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let isValid = true;
  const fields = {
    name: form.elements.name,
    email: form.elements.email,
    subject: form.elements.subject,
    message: form.elements.message
  };

  Object.entries(fields).forEach(([key, field]) => {
    const fieldWrap = field.closest(".field");
    const error = fieldWrap.querySelector(".error");
    fieldWrap.classList.remove("invalid");
    error.textContent = "";

    if (!field.value.trim()) {
      error.textContent = `Please enter ${key === "message" ? "a message" : key === "email" ? "your email" : `your ${key}`}.`;
      fieldWrap.classList.add("invalid");
      isValid = false;
    } else if (key === "email" && !emailPattern.test(field.value.trim())) {
      error.textContent = "Please enter a valid email address.";
      fieldWrap.classList.add("invalid");
      isValid = false;
    }
  });

  const status = form.querySelector(".form-status");
  if (isValid) {
    status.textContent = "Thanks! Your message has been validated and is ready to send.";
    form.reset();
  } else {
    status.textContent = "";
  }
});

form.querySelectorAll("input, textarea").forEach((field) => {
  field.addEventListener("input", () => {
    field.closest(".field").classList.remove("invalid");
    field.closest(".field").querySelector(".error").textContent = "";
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();
