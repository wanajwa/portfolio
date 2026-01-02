'use strict';

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     TOGGLE FUNCTION
  ========================= */
  const elementToggleFunc = (elem) => {
    elem.classList.toggle("active");
  };

  /* =========================
     SIDEBAR
  ========================= */
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");

  if (sidebarBtn) {
    sidebarBtn.addEventListener("click", () => {
      elementToggleFunc(sidebar);
    });
  }

  /* =========================
     CATEGORY MAPPING
  ========================= */
  const categoryMap = {
    "c++ programming": "cpp",
    "design": "design"
  };

  /* =========================
     CUSTOM SELECT & FILTER
  ========================= */
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-selecct-value]");
  const filterBtn = document.querySelectorAll("[data-filter-btn]");
  const filterItems = document.querySelectorAll("[data-filter-item]");

  const filterFunc = (value) => {
    const normalized = categoryMap[value] || value;

    filterItems.forEach(item => {
      item.classList.toggle(
        "active",
        normalized === "all" || normalized === item.dataset.category
      );
    });
  };

  if (select) {
    select.addEventListener("click", () => elementToggleFunc(select));
  }

  selectItems.forEach(item => {
    item.addEventListener("click", function () {
      const value = this.innerText.toLowerCase().trim();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(value);
    });
  });

  let lastClickedBtn = filterBtn[0];
  filterBtn.forEach(btn => {
    btn.addEventListener("click", function () {
      const value = this.innerText.toLowerCase().trim();
      selectValue.innerText = this.innerText;
      filterFunc(value);

      lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  });

  /* =========================
   CONTACT FORM + EMAILJS
========================= */
const form = document.querySelector("[data-form]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formBtn) {

  // Initial state (IMPORTANT)
  formBtn.disabled = !form.checkValidity();

  // Re-check on every input
  form.addEventListener("input", () => {
    formBtn.disabled = !form.checkValidity();
  });

  // Submit (EmailJS)
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    formBtn.disabled = true;

    emailjs.sendForm(
      "service_41ma4oi",        // ✅ your service ID
      "template_llkc6s8",      // 🔁 replace with real template ID
      form
    ).then(() => {
      alert("Message sent successfully!");
      form.reset();
      formBtn.disabled = true;
    }).catch(err => {
      console.error(err);
      alert("Failed to send message.");
      formBtn.disabled = false;
    });
  });
}


  /* =========================
     PAGE NAVIGATION
  ========================= */
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  navigationLinks.forEach((link, index) => {
    link.addEventListener("click", function () {
      pages.forEach((page, i) => {
        const active = this.innerText.toLowerCase() === page.dataset.page;
        page.classList.toggle("active", active);
        navigationLinks[i].classList.toggle("active", active);
      });
      window.scrollTo(0, 0);
    });
  });

  /* =========================
     LIGHT / DARK MODE
  ========================= */
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  if (localStorage.getItem("theme") === "light") {
    body.classList.add("light-theme");
    themeToggle.innerHTML = '<ion-icon name="sunny-outline"></ion-icon>';
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-theme");
    const isLight = body.classList.contains("light-theme");

    themeToggle.innerHTML = isLight
      ? '<ion-icon name="sunny-outline"></ion-icon>'
      : '<ion-icon name="moon-outline"></ion-icon>';

    localStorage.setItem("theme", isLight ? "light" : "dark");
  });

});
