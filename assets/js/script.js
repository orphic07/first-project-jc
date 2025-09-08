const nav = document.querySelector("nav ul");
const menuBtn = document.createElement("div");
menuBtn.classList.add("menu-btn");
menuBtn.innerHTML = "☰"; // hamburger icon
document.querySelector("header").appendChild(menuBtn);

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("show");
});

// ===== SKILLS ANIMATION =====
const skillFills = document.querySelectorAll(".skill-fill");

function animateSkills() {
  skillFills.forEach(fill => {
    const level = fill.getAttribute("data-skill");
    fill.style.width = level;
  });
}

window.addEventListener("scroll", () => {
  const skillsSection = document.querySelector("#skills");
  const rect = skillsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    animateSkills();
  }
});

// ===== FORM VALIDATION =====
const form = document.querySelector("#contact-form");
const nameInput = form.querySelector("input[name='name']");
const emailInput = form.querySelector("input[name='email']");
const messageInput = form.querySelector("textarea[name='message']");

function showError(input, msg) {
  let error = input.nextElementSibling;
  if (!error || !error.classList.contains("error-msg")) {
    error = document.createElement("small");
    error.classList.add("error-msg");
    input.insertAdjacentElement("afterend", error);
  }
  error.textContent = msg;
  input.style.borderColor = "red";
}

function clearError(input) {
  const error = input.nextElementSibling;
  if (error && error.classList.contains("error-msg")) {
    error.textContent = "";
  }
  input.style.borderColor = "#ddd";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

nameInput.addEventListener("input", () => {
  nameInput.value.trim().length < 2
    ? showError(nameInput, "Name must be at least 2 characters")
    : clearError(nameInput);
});

emailInput.addEventListener("input", () => {
  !isValidEmail(emailInput.value)
    ? showError(emailInput, "Enter a valid email")
    : clearError(emailInput);
});

messageInput.addEventListener("input", () => {
  messageInput.value.trim().length < 10
    ? showError(messageInput, "Message must be at least 10 characters")
    : clearError(messageInput);
});

form.addEventListener("submit", e => {
  e.preventDefault();
  if (
    nameInput.value.trim().length >= 2 &&
    isValidEmail(emailInput.value) &&
    messageInput.value.trim().length >= 10
  ) {
    alert("Message sent successfully!");
    form.reset();
  } else {
    alert("Please fix the errors before sending.");
  }
});