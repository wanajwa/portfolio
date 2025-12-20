const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", mobileMenu);
}

function mobileMenu() {
  if (!hamburger || !navMenu) return;
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

// Close navbar when link is clicked
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  if (hamburger) hamburger.classList.remove("active");
  if (navMenu) navMenu.classList.remove("active");
}

// Smooth scroll to footer bottom when Contact is clicked
const contactLink = document.querySelector('#nav-contact');
if (contactLink) {
  contactLink.addEventListener('click', function (e) {
    e.preventDefault();
    const footer = document.querySelector('#footer');
    if (footer && typeof footer.scrollIntoView === 'function') {
      footer.scrollIntoView({ behavior: 'smooth', block: 'end' });
    } else if (footer) {
      // fallback
      window.scrollTo({ top: footer.offsetTop, behavior: 'smooth' });
    }
    closeMenu();
  });
}

// Event Listeners: Handling toggle event
const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
}

if (toggleSwitch) {
  toggleSwitch.addEventListener("change", switchTheme, false);
}

// Save user preference on load

const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (toggleSwitch && currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

//Adding date

let myDate = document.querySelector("#datee");

if (myDate) {
  const yes = new Date().getFullYear();
  myDate.textContent = yes;
}
