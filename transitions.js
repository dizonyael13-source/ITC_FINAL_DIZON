document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("pageshow", () => {
    document.body.classList.remove("is-exiting");
  });

  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;

    const href = link.getAttribute("href");
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      link.target === "_blank" ||
      e.ctrlKey ||
      e.metaKey ||
      e.shiftKey ||
      e.altKey
    ) {
      return;
    }

    const targetUrl = new URL(link.href, window.location.href);

    if (
      targetUrl.origin !== window.location.origin ||
      targetUrl.pathname === window.location.pathname
    ) {
      return;
    }

    if ("onpagereveal" in window) {
      return;
    }

    e.preventDefault();
    document.body.classList.add("is-exiting");

    setTimeout(() => {
      window.location.href = targetUrl.href;
    }, 210);
  });
});
