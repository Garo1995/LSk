
const SITE_CONFIG = {
  phone: "+7 (812) 000-00-00",
  email: "info@example.ru",
  workHours: "Пн–Пт, 9:00–18:00"
};

document.addEventListener("DOMContentLoaded", () => {
  fillContacts();
  initHeader();
  initMobileMenu();
  initFeedbackForm();
  initYear();
});

/* Подстановка телефона и почты во все места на странице */
function fillContacts() {
  document.querySelectorAll("[data-fill='phone']").forEach((el) => {
    el.textContent = SITE_CONFIG.phone;
    if (el.tagName === "A") {
      el.href = "tel:" + SITE_CONFIG.phone.replace(/[^\d+]/g, "");
    }
  });
  document.querySelectorAll("[data-fill='email']").forEach((el) => {
    el.textContent = SITE_CONFIG.email;
    if (el.tagName === "A") {
      el.href = "mailto:" + SITE_CONFIG.email;
    }
  });
  document.querySelectorAll("[data-fill='hours']").forEach((el) => {
    el.textContent = SITE_CONFIG.workHours;
  });
}

/* Тень у шапки при прокрутке */
function initHeader() {
  const header = document.querySelector("header");
  if (!header) return;
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 10);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* Мобильное меню */
function initMobileMenu() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;

  const close = () => {
    nav.classList.remove("is-open");
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
}




/* FAQ: плавное открытие и закрытие */



document.addEventListener("DOMContentLoaded", function () {
  const accordion = document.querySelector("#accordion");

  if (!accordion) return;

  accordion.querySelectorAll(".questions-box").forEach(function (item) {
    const link = item.querySelector(".link");
    const submenu = item.querySelector(".submenu-faq");

    if (!link || !submenu) return;

    link.addEventListener("click", function () {
      const isOpen = item.classList.contains("open");

      accordion.querySelectorAll(".questions-box").forEach(function (other) {
        if (other === item || !other.classList.contains("open")) return;

        const content = other.querySelector(".submenu-faq");
        if (!content) return;

        other.classList.remove("open");
        closeAccordion(content);
      });

      if (isOpen) {
        item.classList.remove("open");
        closeAccordion(submenu);
      } else {
        item.classList.add("open");
        openAccordion(submenu);
      }
    });
  });

  function openAccordion(element) {
    element.style.display = "block";
    element.style.height = "0px";
    element.style.overflow = "hidden";
    element.style.transition = "height 0.35s ease";

    requestAnimationFrame(function () {
      element.style.height = element.scrollHeight + "px";
    });

    element.addEventListener("transitionend", function handler(event) {
      if (event.propertyName !== "height") return;

      element.style.height = "auto";
      element.style.removeProperty("overflow");
      element.style.removeProperty("transition");
      element.removeEventListener("transitionend", handler);
    });
  }

  function closeAccordion(element) {
    element.style.height = element.scrollHeight + "px";
    element.style.overflow = "hidden";
    element.style.transition = "height 0.35s ease";

    element.offsetHeight;

    requestAnimationFrame(function () {
      element.style.height = "0px";
    });

    element.addEventListener("transitionend", function handler(event) {
      if (event.propertyName !== "height") return;

      element.style.display = "none";
      element.style.removeProperty("height");
      element.style.removeProperty("overflow");
      element.style.removeProperty("transition");
      element.removeEventListener("transitionend", handler);
    });
  }
});




/* Форма обратной связи: открывает почтовую программу с готовым письмом */
function initFeedbackForm() {
  const form = document.querySelector(".feedback-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const contact = (data.get("contact") || "").toString().trim();
    const message = (data.get("message") || "").toString().trim();

    const subject = "Обращение с сайта ООО «ЛСК»";
    const body = `Имя: ${name}\nКонтакт для связи: ${contact}\n\n${message}`;
    window.location.href =
      "mailto:" + SITE_CONFIG.email +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    const note = form.querySelector(".form-note");
    if (note) note.textContent = "Открыта ваша почтовая программа — проверьте письмо и отправьте его.";
  });
}

/* Год в подвале */
function initYear() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}
