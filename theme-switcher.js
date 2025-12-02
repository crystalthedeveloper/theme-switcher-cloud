/**
 * Webflow Dark/Light Theme Switcher
 * -----------------------------------
 * Automatically sets theme based on user or system preference.
 * Supports toggle button, direct theme buttons, custom text, background, link, icon, and image styles.
 *
 * ✅ HOW TO USE — Custom Attributes (cltd-prefixed for uniqueness):
 * ----------------------------------------------------------------
 * [data-cltd-theme-toggle]        → Toggle button
 * [data-cltd-set-theme="dark"]   → Directly switch to dark theme
 * [data-cltd-set-theme="light"]  → Directly switch to light theme
 * [data-cltd-theme-text]          → Dynamic text color; optional: use [data-cltd-dark="#fff"] / [data-cltd-light="#000"]
 * [data-cltd-theme-bg]            → Dynamic background color; optional: use [data-cltd-dark="#000"] / [data-cltd-light="#fff"]
 * [data-cltd-theme-link]          → Dynamic link color; optional: use [data-cltd-dark="#ccc"] / [data-cltd-light="#333"]
 * [data-cltd-icon="dark"]        → Show in dark mode only
 * [data-cltd-icon="light"]       → Show in light mode only
 * [data-cltd-theme-img="dark"]   → Show image in dark mode only
 * [data-cltd-theme-img="light"]  → Show image in light mode only
 */

Webflow.push(function () {
  const root = document.body;

  const userPref = localStorage.getItem("theme");
  const systemPref = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = userPref || (systemPref ? "dark" : "light");
  root.setAttribute("data-cltd-theme", theme);

  applyTheme(theme);

  // Listen for system theme changes (if no manual override is set)
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
    if (!localStorage.getItem("theme")) {
      const newTheme = e.matches ? "dark" : "light";
      root.setAttribute("data-cltd-theme", newTheme);
      applyTheme(newTheme);
    }
  });

  function toggleTheme() {
    const currentTheme = root.getAttribute("data-cltd-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    root.setAttribute("data-cltd-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  }

  function applyTheme(theme) {
    updateIcons(theme);
    updateTextColors(theme);
    updateBackgrounds(theme);
    updateLinkColors(theme);
    updateImages(theme);
    updateActiveButtons(theme);
  }

  function updateIcons(theme) {
    const darkIcons = document.querySelectorAll("[data-cltd-icon='dark']");
    const lightIcons = document.querySelectorAll("[data-cltd-icon='light']");

    darkIcons.forEach(icon => {
      icon.style.opacity = theme === "dark" ? "1" : "0";
      icon.style.transform = theme === "dark" ? "scale(1)" : "scale(0.8)";
      icon.style.pointerEvents = theme === "dark" ? "auto" : "none";
    });

    lightIcons.forEach(icon => {
      icon.style.opacity = theme === "light" ? "1" : "0";
      icon.style.transform = theme === "light" ? "scale(1)" : "scale(0.8)";
      icon.style.pointerEvents = theme === "light" ? "auto" : "none";
    });
  }

  function applyColor(el, theme, type) {
    const customColor = el.getAttribute(`data-cltd-${theme}`);
    if (customColor) {
      el.style[type] = customColor;
    } else {
      if (type === "color") el.style.color = theme === "dark" ? "#ffffff" : "#1a1a1a";
      if (type === "backgroundColor") el.style.backgroundColor = theme === "dark" ? "#000000" : "#ffffff";
    }
    el.style.transition = `${type} 0.3s ease`;
  }

  function updateTextColors(theme) {
    document.querySelectorAll("[data-cltd-theme-text]").forEach(el => applyColor(el, theme, "color"));
  }

  function updateBackgrounds(theme) {
    document.querySelectorAll("[data-cltd-theme-bg]").forEach(el => applyColor(el, theme, "backgroundColor"));
  }

  function updateLinkColors(theme) {
    document.querySelectorAll("[data-cltd-theme-link]").forEach(el => applyColor(el, theme, "color"));
  }

  function updateImages(theme) {
    const darkImages = document.querySelectorAll('[data-cltd-theme-img="dark"]');
    const lightImages = document.querySelectorAll('[data-cltd-theme-img="light"]');

    darkImages.forEach(img => {
      img.style.display = theme === "dark" ? "block" : "none";
      img.setAttribute("aria-hidden", theme === "dark" ? "false" : "true");
    });

    lightImages.forEach(img => {
      img.style.display = theme === "light" ? "block" : "none";
      img.setAttribute("aria-hidden", theme === "light" ? "false" : "true");
    });
  }

  function updateActiveButtons(theme) {
    document.querySelectorAll("[data-cltd-set-theme]").forEach(el => {
      const isActive = el.getAttribute("data-cltd-set-theme") === theme;
      el.classList.toggle("active-theme", isActive);
      el.style.opacity = isActive ? "0.5" : "1";
      el.style.transition = "opacity 0.3s ease";
    });
  }

  // [data-cltd-theme-toggle] support
  const toggle = document.querySelector("[data-cltd-theme-toggle]");
  if (toggle) {
    toggle.addEventListener("click", toggleTheme);
  }

  // [data-cltd-set-theme] support
  const setThemeButtons = document.querySelectorAll("[data-cltd-set-theme]");
  setThemeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const newTheme = btn.getAttribute("data-cltd-set-theme");
      root.setAttribute("data-cltd-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      applyTheme(newTheme);
    });
  });
});
