'use strict';

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     HELPER: TOGGLE CLASS
  ========================= */
  const elementToggleFunc = (elem) => {
    if (elem) elem.classList.toggle("active");
  };

  /* =========================
     SIDEBAR TOGGLE
  ========================= */
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");

  if (sidebar && sidebarBtn) {
    sidebarBtn.addEventListener("click", () => {
      elementToggleFunc(sidebar);
    });
  }

  /* =========================
     CATEGORY MAPPING
  ========================= */
  const categoryMap = {
    "c++ programming": "cpp",
    "web development": "web development",
    "applications": "applications",
    "design": "design",
    "all": "all"
  };

  /* =========================
     FILTER & SELECT
  ========================= */
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-selecct-value]");
  const filterBtns = document.querySelectorAll("[data-filter-btn]");
  const filterItems = document.querySelectorAll("[data-filter-item]");

  const filterFunc = (value) => {
    const normalized = categoryMap[value] || value;

    filterItems.forEach(item => {
      const show =
        normalized === "all" ||
        normalized === item.dataset.category;

      item.classList.toggle("active", show);
    });
  };

  if (select) {
    select.addEventListener("click", () => {
      elementToggleFunc(select);
    });
  }

  selectItems.forEach(item => {
    item.addEventListener("click", function () {
      const value = this.innerText.toLowerCase().trim();
      if (selectValue) selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(value);
    });
  });

  let lastActiveBtn = filterBtns[0];
  filterBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      const value = this.innerText.toLowerCase().trim();
      if (selectValue) selectValue.innerText = this.innerText;

      filterFunc(value);

      if (lastActiveBtn) lastActiveBtn.classList.remove("active");
      this.classList.add("active");
      lastActiveBtn = this;
    });
  });

  /* =========================
     CONTACT FORM (EMAILJS)
  ========================= */
  const form = document.querySelector("[data-form]");
  const formBtn = document.querySelector("[data-form-btn]");

  if (form && formBtn && window.emailjs) {

    formBtn.disabled = !form.checkValidity();

    form.addEventListener("input", () => {
      formBtn.disabled = !form.checkValidity();
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      formBtn.disabled = true;

      emailjs.sendForm(
        "service_41ma4oi",
        "template_llkc6s8",
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
  const navLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  navLinks.forEach(link => {
    link.addEventListener("click", function () {
      const targetPage = this.innerText.toLowerCase();

      pages.forEach(page => {
        page.classList.toggle(
          "active",
          page.dataset.page === targetPage
        );
      });

      navLinks.forEach(nav =>
        nav.classList.toggle("active", nav === this)
      );

      window.scrollTo(0, 0);
    });
  });

  /* =========================
     LIGHT / DARK MODE (FIXED)
  ========================= */
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  // Default theme
  if (!localStorage.getItem("theme")) {
    localStorage.setItem("theme", "dark");
  }

  // Apply saved theme
  if (localStorage.getItem("theme") === "light") {
    body.classList.add("light-theme");
    if (themeToggle) {
      themeToggle.innerHTML = '<ion-icon name="sunny-outline"></ion-icon>';
    }
  }

  // Toggle theme
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("light-theme");

      const isLight = body.classList.contains("light-theme");

      themeToggle.innerHTML = isLight
        ? '<ion-icon name="sunny-outline"></ion-icon>'
        : '<ion-icon name="moon-outline"></ion-icon>';

      localStorage.setItem("theme", isLight ? "light" : "dark");
    });
  }

});
