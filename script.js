const langButtons = document.querySelectorAll(".lang button");

const translations = {
  uk: {
    nav: ["Послуги", "Прайс", "Роботи", "Питання", "Контакти"],
    label: "PRODUCT PHOTO & VIDEO CONTENT",
    name: "Аліна<br>Гарнатка",
    desc: "Предметний фотограф та відеограф. Створюю фото контент на сайт, Amazon, сторінки брендів, а також різні види відео контенту — від презентацій до експертних. Спеціалізуюсь на коротких роликах TikTok формату.",
    links: ["мої послуги", "прайс", "мої роботи", "питання"],
    servicesTitleSmall: "01 / Послуги",
    servicesTitle: "Що можна замовити",
    priceTitle: "Ціни по індивідуальному запиту",
    priceText: "Вартість залежить від формату зйомки, кількості фото/відео, складності ідеї, реквізиту та термінів виконання.",
    fop: "Оплата можлива на ФОП.",
    priceBtn: "Обговорити проєкт →",
    worksSmall: "02 / Роботи",
    worksTitle: "Портфоліо",
    filters: ["Усі", "Предметні фото", "Фото на руці", "Макро текстури", "Відео контент"],
    faqSmall: "03 / Питання",
    faqTitle: "Правила роботи",
    contactTitle: "Залишити заявку",
    contactText: "Напишіть, який контент вам потрібен, залиште контакт — і заявка автоматично прийде в Telegram.",
    placeholders: ["Ваше ім’я", "Telegram / Instagram / телефон", "Коротко опишіть задачу"],
    selectFirst: "Що вас цікавить?",
    formBtn: "Відправити заявку →"
  },

  ru: {
    nav: ["Услуги", "Прайс", "Работы", "Вопросы", "Контакты"],
    label: "PRODUCT PHOTO & VIDEO CONTENT",
    name: "Алина<br>Гарнатка",
    desc: "Предметный фотограф и видеограф. Создаю фото-контент для сайтов, Amazon, страниц брендов, а также разные виды видео-контента — от презентаций до экспертных видео. Специализируюсь на коротких роликах в формате TikTok.",
    links: ["мои услуги", "прайс", "мои работы", "вопросы"],
    servicesTitleSmall: "01 / Услуги",
    servicesTitle: "Что можно заказать",
    priceTitle: "Цены по индивидуальному запросу",
    priceText: "Стоимость зависит от формата съёмки, количества фото/видео, сложности идеи, реквизита и сроков выполнения.",
    fop: "Оплата возможна на ФОП.",
    priceBtn: "Обсудить проект →",
    worksSmall: "02 / Работы",
    worksTitle: "Портфолио",
    filters: ["Все", "Предметные фото", "Фото на руке", "Макро текстуры", "Видео контент"],
    faqSmall: "03 / Вопросы",
    faqTitle: "Правила работы",
    contactTitle: "Оставить заявку",
    contactText: "Напишите, какой контент вам нужен, оставьте контакт — и заявка автоматически придёт в Telegram.",
    placeholders: ["Ваше имя", "Telegram / Instagram / телефон", "Кратко опишите задачу"],
    selectFirst: "Что вас интересует?",
    formBtn: "Отправить заявку →"
  },

  en: {
    nav: ["Services", "Price", "Works", "FAQ", "Contacts"],
    label: "PRODUCT PHOTO & VIDEO CONTENT",
    name: "Alina<br>Garnatka",
    desc: "Product photographer and videographer. I create photo content for websites, Amazon, brand pages, and different types of video content — from product presentations to expert videos. I also specialize in short TikTok-style videos.",
    links: ["my services", "price", "my works", "FAQ"],
    servicesTitleSmall: "01 / Services",
    servicesTitle: "What you can order",
    priceTitle: "Prices by individual request",
    priceText: "The price depends on the shooting format, number of photos/videos, idea complexity, props and deadlines.",
    fop: "Payment via Ukrainian sole proprietor account is available.",
    priceBtn: "Discuss the project →",
    worksSmall: "02 / Works",
    worksTitle: "Portfolio",
    filters: ["All", "Product photos", "Hand photos", "Macro textures", "Video content"],
    faqSmall: "03 / FAQ",
    faqTitle: "Work rules",
    contactTitle: "Leave a request",
    contactText: "Write what type of content you need, leave your contact — and the request will automatically be sent to Telegram.",
    placeholders: ["Your name", "Telegram / Instagram / phone", "Briefly describe the task"],
    selectFirst: "What are you interested in?",
    formBtn: "Send request →"
  }
};

function youtubeToEmbed(url) {
  if (!url) return "";

  if (url.includes("youtube.com/embed/")) {
    return url;
  }

  if (url.includes("youtube.com/watch?v=")) {
    const id = url.split("watch?v=")[1].split("&")[0];
    return `https://www.youtube.com/embed/${id}`;
  }

  if (url.includes("youtube.com/shorts/")) {
    const id = url.split("youtube.com/shorts/")[1].split("?")[0];
    return `https://www.youtube.com/embed/${id}`;
  }

  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1].split("?")[0];
    return `https://www.youtube.com/embed/${id}`;
  }

  return url;
}

function renderMedia(item) {
  const media = item.image || "";
  const cleanMedia = media.split("?")[0].toLowerCase();

  const isVideoFile = cleanMedia.endsWith(".mp4") || cleanMedia.endsWith(".webm");
  const isYoutube = media.includes("youtube.com") || media.includes("youtu.be");

  if (isYoutube) {
    const embedUrl = youtubeToEmbed(media);

    return `
      <iframe
        src="${embedUrl}"
        title="${item.title || "Video"}"
        frameborder="0"
        allowfullscreen
        loading="lazy">
      </iframe>
    `;
  }

  if (isVideoFile) {
    return `
      <video src="${media}" controls muted playsinline></video>
    `;
  }

  return `<img src="${media}" alt="${item.title || ""}">`;
}

function initFilters() {
  const filterButtons = document.querySelectorAll(".filter-buttons button");

  filterButtons.forEach((button) => {
    button.onclick = () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter;
      const workItems = document.querySelectorAll(".work-item");

      workItems.forEach((item) => {
        const category = item.dataset.category;

        if (filter === "all" || category === filter) {
          item.classList.remove("hide");
        } else {
          item.classList.add("hide");
        }
      });
    };
  });
}

function initFaq() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const button = item.querySelector("button");

    if (!button) return;

    button.onclick = () => {
      item.classList.toggle("active");
    };
  });
}

function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector("img");

  document.querySelectorAll(".work-item").forEach((item) => {
    item.onclick = () => {
      const img = item.querySelector("img");

      if (!img) return;

      lightboxImg.src = img.src;
      lightbox.classList.add("active");
    };
  });

  lightbox.onclick = () => {
    lightbox.classList.remove("active");
    lightboxImg.src = "";
  };
}

function openPortfolioCategory(category) {
  if (category === "contact") {
    const contactSection = document.getElementById("contact") || document.querySelector(".contact-section");

    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    return;
  }

  const worksSection = document.getElementById("works");

  if (worksSection) {
    worksSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  setTimeout(() => {
    const targetButton = document.querySelector(`.filter-buttons button[data-filter="${category}"]`);

    if (targetButton) {
      targetButton.click();
    }
  }, 500);
}

function initServiceCards(data) {
  const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach((card, index) => {
    const service = data.services?.[index];

    const defaultCategories = ["product", "product", "video", "contact"];
    const category = service?.category || defaultCategories[index] || "all";

    card.style.cursor = "pointer";

    card.onclick = () => {
      openPortfolioCategory(category);
    };
  });
}

async function loadAdminContent() {
  try {
    const res = await fetch("/data/admin-content.json");
    const data = await res.json();

    if (data.name) {
      document.querySelector(".hero h1").innerHTML = data.name.replace(" ", "<br>");
    }

    if (data.nickname) {
      document.querySelector(".nickname").textContent = data.nickname;
    }

    if (data.description) {
      document.querySelector(".hero-text").textContent = data.description;
    }

    const serviceCards = document.querySelectorAll(".service-card");

    if (data.services) {
      data.services.forEach((service, index) => {
        if (serviceCards[index]) {
          serviceCards[index].querySelector("h3").textContent = service.title;
          serviceCards[index].querySelector("p").textContent = service.text;
        }
      });
    }

    initServiceCards(data);

    const portfolioGrid = document.querySelector(".portfolio-grid");

    if (portfolioGrid && data.portfolio) {
      portfolioGrid.innerHTML = "";

      data.portfolio.forEach((item) => {
        const div = document.createElement("div");
        div.className = `work-item ${item.size || ""}`;
        div.dataset.category = item.category || "product";

        div.innerHTML = renderMedia(item);

        portfolioGrid.appendChild(div);
      });
    }

    const faqList = document.querySelector(".faq-list");

    if (faqList && data.faq) {
      faqList.innerHTML = "";

      data.faq.forEach((item) => {
        const div = document.createElement("div");
        div.className = "faq-item";

        div.innerHTML = `
          <button>${item.question}<span>+</span></button>
          <p>${item.answer}</p>
        `;

        faqList.appendChild(div);
      });
    }

    initFilters();
    initFaq();
    initLightbox();
    initAnimations();

  } catch (error) {
    console.log("Admin content not loaded", error);
    initFilters();
    initFaq();
    initLightbox();
    initAnimations();
  }
}

function setLanguage(lang) {
  const t = translations[lang];

  document.documentElement.lang = lang;

  document.querySelectorAll(".nav a").forEach((item, index) => {
    item.textContent = t.nav[index];
  });

  document.querySelector(".label").textContent = t.label;
  document.querySelector(".hero h1").innerHTML = t.name;
  document.querySelector(".hero-text").textContent = t.desc;

  document.querySelectorAll(".hero-links a").forEach((item, index) => {
    item.innerHTML = `${t.links[index]} <span>→</span>`;
  });

  const sectionTitles = document.querySelectorAll(".section-title");

  sectionTitles[0].querySelector("p").textContent = t.servicesTitleSmall;
  sectionTitles[0].querySelector("h2").textContent = t.servicesTitle;

  document.querySelector(".price-section h2").textContent = t.priceTitle;
  document.querySelector(".price-section p:not(.label):not(.fop)").textContent = t.priceText;
  document.querySelector(".fop").textContent = t.fop;
  document.querySelector(".main-btn").textContent = t.priceBtn;

  sectionTitles[1].querySelector("p").textContent = t.worksSmall;
  sectionTitles[1].querySelector("h2").textContent = t.worksTitle;

  document.querySelectorAll(".filter-buttons button").forEach((button, index) => {
    button.textContent = t.filters[index];
  });

  sectionTitles[2].querySelector("p").textContent = t.faqSmall;
  sectionTitles[2].querySelector("h2").textContent = t.faqTitle;

  document.querySelector(".contact-left h2").textContent = t.contactTitle;
  document.querySelector(".contact-left > p:not(.label)").textContent = t.contactText;

  const inputs = document.querySelectorAll(".contact-form input");
  inputs[0].placeholder = t.placeholders[0];
  inputs[1].placeholder = t.placeholders[1];

  document.querySelector(".contact-form textarea").placeholder = t.placeholders[2];
  document.querySelector(".contact-form select option").textContent = t.selectFirst;
  document.querySelector(".contact-form button").textContent = t.formBtn;

  langButtons.forEach((btn) => btn.classList.remove("active"));
  document.querySelector(`.lang button[data-lang="${lang}"]`).classList.add("active");
}

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.lang);
  });
});

function initAnimations() {
  const animatedElements = document.querySelectorAll(
    ".hero-left, .hero-right, .section-title, .service-card, .price-section, .work-item, .faq-item, .contact-left, .contact-form"
  );

  animatedElements.forEach((element) => {
    element.classList.add("fade-up");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    {
      threshold: 0.12,
    }
  );

  animatedElements.forEach((element) => observer.observe(element));
}

const requestForm = document.getElementById("requestForm");
const formStatus = document.getElementById("formStatus");

if (requestForm) {
  requestForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    formStatus.textContent = "Відправляємо заявку...";

    const formData = new FormData(requestForm);

    const data = {
      name: formData.get("name"),
      contact: formData.get("contact"),
      service: formData.get("service"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/send-telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        formStatus.textContent = "Заявку відправлено. Скоро з вами зв’яжуться.";
        requestForm.reset();
      } else {
        formStatus.textContent = "Помилка відправки. Напишіть напряму в Telegram.";
      }
    } catch (error) {
      formStatus.textContent = "Помилка відправки. Напишіть напряму в Telegram.";
    }
  });
}

loadAdminContent();
