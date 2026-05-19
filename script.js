const langButtons = document.querySelectorAll(".lang button");

let siteData = {};
let currentLang = "uk";

const defaultVideos = [
  {
    type: "Викраска",
    title: "Викраска на один нігтик",
    description: "Коротке відео з демонстрацією кольору, текстури та блиску продукту на одному нігті.",
    link: ""
  },
  {
    type: "Викраска",
    title: "Викраска на всій руці",
    description: "Повна демонстрація продукту на всій руці, щоб показати вигляд відтінку в реальному манікюрі.",
    link: ""
  },
  {
    type: "МК",
    title: "МК на всій руці",
    description: "Майстер-клас або покрокове відео з нанесенням продукту на всій руці.",
    link: ""
  },
  {
    type: "Експертний контент",
    title: "Експертний контент манікюр/педикюр",
    description: "Відео з поясненнями, порадами, процесом роботи або експертною подачею для майстрів та клієнтів.",
    link: ""
  },
  {
    type: "TikTok/Reels",
    title: "Tik tok формат",
    description: "Динамічні короткі ролики для TikTok, Reels та Shorts з акцентом на візуал, тренди та швидке залучення уваги.",
    link: "https://www.youtube.com/shorts/ZMdzlb5dkjQ"
  },
  {
    type: "Лайфхаки",
    title: "Короткі відео лайфхаки",
    description: "Короткі корисні відео з порадами, фішками, техніками або цікавими прийомами у форматі для соцмереж.",
    link: ""
  },
  {
    type: "Огляд",
    title: "Огляд продукції",
    description: "Відеоогляд продукту: упаковка, текстура, використання, переваги та загальне враження.",
    link: ""
  },
  {
    type: "Реклама",
    title: "Рекламний ролик продукції, презентація",
    description: "Готовий рекламний ролик або презентаційне відео для продукту, бренду, сайту чи соціальних мереж.",
    link: ""
  }
];

const translations = {
  uk: {
    nav: ["Послуги", "Прайс", "Роботи", "Питання", "Контакти"],
    label: "PRODUCT PHOTO & VIDEO CONTENT",
    name: "Аліна<br>Гарнатка",
    desc: "Предметний фотограф та відеограф. Створюю фото контент на сайт, Amazon, сторінки брендів, а також різні види відео контенту — від презентацій до експертних.",
    links: ["мої послуги", "прайс", "мої роботи", "питання"],
    servicesTitleSmall: "01 / Послуги",
    servicesTitle: "Що можна замовити",
    priceTitle: "Ціни по індивідуальному запиту",
    priceText: "Вартість залежить від формату зйомки, кількості фото/відео, складності ідеї, реквізиту та термінів виконання.",
    fop: "Оплата на ФОП.",
    priceBtn: "Обговорити проєкт →",
    worksSmall: "02 / Роботи",
    worksTitle: "Портфоліо",
    videoSmall: "03 / Відео",
    videoTitle: "Відео контент",
    faqSmall: "04 / Питання",
    faqTitle: "Правила роботи",
    filters: ["Усі", "Предметні фото", "Фото на руці", "Макро текстури", "Відео контент"],
    contactTitle: "Залишити заявку",
    contactText: "Напишіть, який контент вам потрібен, залиште контакт — і заявка автоматично прийде в Telegram.",
    placeholders: ["Ваше ім’я", "Telegram / Instagram / телефон", "Коротко опишіть задачу"],
    selectFirst: "Що вас цікавить?",
    formBtn: "Відправити заявку →",
    watchBtn: "Дивитися приклад →"
  },

  ru: {
    nav: ["Услуги", "Прайс", "Работы", "Вопросы", "Контакты"],
    label: "PRODUCT PHOTO & VIDEO CONTENT",
    name: "Алина<br>Гарнатка",
    desc: "Предметный фотограф и видеограф. Создаю фото-контент для сайтов, Amazon, страниц брендов, а также разные виды видео-контента.",
    links: ["мои услуги", "прайс", "мои работы", "вопросы"],
    servicesTitleSmall: "01 / Услуги",
    servicesTitle: "Что можно заказать",
    priceTitle: "Цены по индивидуальному запросу",
    priceText: "Стоимость зависит от формата съёмки, количества фото/видео, сложности идеи, реквизита и сроков выполнения.",
    fop: "Оплата на ФОП.",
    priceBtn: "Обсудить проект →",
    worksSmall: "02 / Работы",
    worksTitle: "Портфолио",
    videoSmall: "03 / Видео",
    videoTitle: "Видео контент",
    faqSmall: "04 / Вопросы",
    faqTitle: "Правила работы",
    filters: ["Все", "Предметные фото", "Фото на руке", "Макро текстуры", "Видео контент"],
    contactTitle: "Оставить заявку",
    contactText: "Напишите, какой контент вам нужен, оставьте контакт — и заявка автоматически придёт в Telegram.",
    placeholders: ["Ваше имя", "Telegram / Instagram / телефон", "Кратко опишите задачу"],
    selectFirst: "Что вас интересует?",
    formBtn: "Отправить заявку →",
    watchBtn: "Смотреть пример →"
  },

  en: {
    nav: ["Services", "Price", "Works", "FAQ", "Contacts"],
    label: "PRODUCT PHOTO & VIDEO CONTENT",
    name: "Alina<br>Garnatka",
    desc: "Product photographer and videographer. I create photo content for websites, Amazon, brand pages, and different types of video content.",
    links: ["my services", "price", "my works", "FAQ"],
    servicesTitleSmall: "01 / Services",
    servicesTitle: "What you can order",
    priceTitle: "Prices by individual request",
    priceText: "The price depends on the shooting format, number of photos/videos, idea complexity, props and deadlines.",
    fop: "Payment via Ukrainian sole proprietor account is available.",
    priceBtn: "Discuss the project →",
    worksSmall: "02 / Works",
    worksTitle: "Portfolio",
    videoSmall: "03 / Video",
    videoTitle: "Video content",
    faqSmall: "04 / FAQ",
    faqTitle: "Work rules",
    filters: ["All", "Product photos", "Hand photos", "Macro textures", "Video content"],
    contactTitle: "Leave a request",
    contactText: "Write what type of content you need, leave your contact — and the request will automatically be sent to Telegram.",
    placeholders: ["Your name", "Telegram / Instagram / phone", "Briefly describe the task"],
    selectFirst: "What are you interested in?",
    formBtn: "Send request →",
    watchBtn: "Watch example →"
  }
};

function addVideoStyles() {
  if (document.getElementById("video-section-styles")) return;

  const style = document.createElement("style");
  style.id = "video-section-styles";

  style.innerHTML = `
    .video-section {
      padding-top: 80px;
    }

    .video-list {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 22px;
    }

    .video-card {
      border: 1px solid rgba(45,45,47,0.14);
      background: rgba(255,255,255,0.72);
      border-radius: 28px;
      padding: 28px;
      min-height: 260px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: .25s ease;
    }

    .video-card:hover {
      transform: translateY(-4px);
      border-color: var(--pink-dark);
    }

    .video-card small {
      display: inline-flex;
      width: fit-content;
      padding: 8px 14px;
      border-radius: 999px;
      background: var(--pink-light);
      color: var(--pink-dark);
      font-weight: 800;
      margin-bottom: 26px;
    }

    .video-card h3 {
      font-size: 26px;
      line-height: 1.05;
      margin: 0 0 16px;
    }

    .video-card p {
      color: var(--gray);
      line-height: 1.65;
      margin: 0 0 24px;
    }

    .video-card a {
      color: var(--pink-dark);
      font-weight: 800;
      text-decoration: none;
    }

    .service-card {
      cursor: pointer !important;
    }

    @media (max-width: 1100px) {
      .video-list {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 700px) {
      .video-list {
        grid-template-columns: 1fr;
      }
    }
  `;

  document.head.appendChild(style);
}

function createVideoSection() {
  if (document.getElementById("videos")) return;

  const worksSection = document.getElementById("works");
  if (!worksSection) return;

  const section = document.createElement("section");
  section.id = "videos";
  section.className = "section video-section";

  section.innerHTML = `
    <div class="section-title">
      <p>03 / Відео</p>
      <h2>Відео контент</h2>
    </div>

    <div class="video-list"></div>
  `;

  worksSection.insertAdjacentElement("afterend", section);
}

function isVideoMedia(media) {
  if (!media) return false;

  return (
    media.includes("youtube.com") ||
    media.includes("youtu.be") ||
    media.endsWith(".mp4") ||
    media.endsWith(".webm")
  );
}

function cleanPortfolioFromVideos() {
  siteData.portfolio = siteData.portfolio || [];

  siteData.portfolio = siteData.portfolio.filter((item) => {
    return !isVideoMedia(item.image || "");
  });
}

function renderBase() {
  if (siteData.name) {
    document.querySelector(".hero h1").innerHTML = siteData.name.replace(" ", "<br>");
  }

  if (siteData.nickname) {
    document.querySelector(".nickname").textContent = siteData.nickname;
  }

  if (siteData.description) {
    document.querySelector(".hero-text").textContent = siteData.description;
  }
}

function renderServices() {
  const serviceCards = document.querySelectorAll(".service-card");

  if (siteData.services) {
    siteData.services.forEach((service, index) => {
      if (serviceCards[index]) {
        serviceCards[index].querySelector("h3").textContent = service.title;
        serviceCards[index].querySelector("p").textContent = service.text;
      }
    });
  }

  serviceCards.forEach((card, index) => {
    const service = siteData.services?.[index];
    const defaultCategories = ["product", "product", "video", "contact"];
    const category = service?.category || defaultCategories[index] || "all";

    card.onclick = () => {
      openTarget(category);
    };
  });
}

function renderPortfolio() {
  const portfolioGrid = document.querySelector(".portfolio-grid");
  if (!portfolioGrid) return;

  portfolioGrid.innerHTML = "";

  const portfolio = siteData.portfolio || [];

  portfolio.forEach((item) => {
    if (isVideoMedia(item.image || "")) return;

    const div = document.createElement("div");

    div.className = `work-item ${item.size || ""}`;
    div.dataset.category = item.category || "product";

    div.innerHTML = `<img src="${item.image}" alt="${item.title || ""}">`;

    portfolioGrid.appendChild(div);
  });

  initFilters();
  initLightbox();
}

function renderVideos() {
  const videoList = document.querySelector(".video-list");
  if (!videoList) return;

  videoList.innerHTML = "";

  siteData.videos = siteData.videos && siteData.videos.length ? siteData.videos : defaultVideos;

  siteData.videos.forEach((video, index) => {
    const card = document.createElement("div");
    card.className = "video-card";

    card.innerHTML = `
      <div>
        <small>${video.type || `Video ${index + 1}`}</small>
        <h3>${video.title || "Відео"}</h3>
        <p>${video.description || ""}</p>
      </div>

      ${
        video.link
          ? `<a href="${video.link}" target="_blank" rel="noopener">${translations[currentLang].watchBtn}</a>`
          : ""
      }
    `;

    videoList.appendChild(card);
  });
}

function renderFaq() {
  const faqList = document.querySelector(".faq-list");
  if (!faqList) return;

  faqList.innerHTML = "";

  const faq = siteData.faq || [];

  faq.forEach((item) => {
    const div = document.createElement("div");
    div.className = "faq-item";

    div.innerHTML = `
      <button>${item.question}<span>+</span></button>
      <p>${item.answer}</p>
    `;

    faqList.appendChild(div);
  });

  initFaq();
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

function openTarget(category) {
  if (category === "contact") {
    const contact = document.getElementById("contact") || document.querySelector(".contact-section");

    if (contact) {
      contact.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    return;
  }

  if (category === "video") {
    const videos = document.getElementById("videos");

    if (videos) {
      videos.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    return;
  }

  const works = document.getElementById("works");

  if (works) {
    works.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  setTimeout(() => {
    const btn = document.querySelector(`.filter-buttons button[data-filter="${category}"]`);
    if (btn) btn.click();
  }, 500);
}

function setLanguage(lang) {
  currentLang = lang;
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

  if (sectionTitles[0]) {
    sectionTitles[0].querySelector("p").textContent = t.servicesTitleSmall;
    sectionTitles[0].querySelector("h2").textContent = t.servicesTitle;
  }

  const priceTitle = document.querySelector(".price-section h2");
  if (priceTitle) priceTitle.textContent = t.priceTitle;

  const priceText = document.querySelector(".price-section p:not(.label):not(.fop)");
  if (priceText) priceText.textContent = t.priceText;

  const fop = document.querySelector(".fop");
  if (fop) fop.textContent = t.fop;

  const mainBtn = document.querySelector(".main-btn");
  if (mainBtn) mainBtn.textContent = t.priceBtn;

  if (sectionTitles[1]) {
    sectionTitles[1].querySelector("p").textContent = t.worksSmall;
    sectionTitles[1].querySelector("h2").textContent = t.worksTitle;
  }

  const videoTitle = document.querySelector("#videos .section-title");

  if (videoTitle) {
    videoTitle.querySelector("p").textContent = t.videoSmall;
    videoTitle.querySelector("h2").textContent = t.videoTitle;
  }

  const faqTitle = document.querySelector("#faq .section-title");

  if (faqTitle) {
    faqTitle.querySelector("p").textContent = t.faqSmall;
    faqTitle.querySelector("h2").textContent = t.faqTitle;
  }

  document.querySelectorAll(".filter-buttons button").forEach((button, index) => {
    button.textContent = t.filters[index];
  });

  const contactTitle = document.querySelector(".contact-left h2");
  if (contactTitle) contactTitle.textContent = t.contactTitle;

  const contactText = document.querySelector(".contact-left > p:not(.label)");
  if (contactText) contactText.textContent = t.contactText;

  const inputs = document.querySelectorAll(".contact-form input");
  if (inputs[0]) inputs[0].placeholder = t.placeholders[0];
  if (inputs[1]) inputs[1].placeholder = t.placeholders[1];

  const textarea = document.querySelector(".contact-form textarea");
  if (textarea) textarea.placeholder = t.placeholders[2];

  const selectFirst = document.querySelector(".contact-form select option");
  if (selectFirst) selectFirst.textContent = t.selectFirst;

  const formBtn = document.querySelector(".contact-form button");
  if (formBtn) formBtn.textContent = t.formBtn;

  langButtons.forEach((btn) => btn.classList.remove("active"));

  const activeLang = document.querySelector(`.lang button[data-lang="${lang}"]`);
  if (activeLang) activeLang.classList.add("active");

  renderBase();
  renderServices();
  renderVideos();
}

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.lang);
  });
});

function initAnimations() {
  const animatedElements = document.querySelectorAll(
    ".hero-left, .hero-right, .section-title, .service-card, .price-section, .work-item, .video-card, .faq-item, .contact-left, .contact-form"
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
      threshold: 0.12
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

    const formBody = {
      name: formData.get("name"),
      contact: formData.get("contact"),
      service: formData.get("service"),
      message: formData.get("message")
    };

    try {
      const response = await fetch("/send-telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formBody)
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

async function loadAdminContent() {
  addVideoStyles();
  createVideoSection();

  try {
    const res = await fetch("/data/admin-content.json");
    siteData = await res.json();

    siteData.videos = siteData.videos && siteData.videos.length ? siteData.videos : defaultVideos;

    cleanPortfolioFromVideos();

    renderBase();
    renderServices();
    renderPortfolio();
    renderVideos();
    renderFaq();
    initAnimations();
  } catch (error) {
    console.log("Admin content not loaded", error);

    siteData.videos = defaultVideos;

    renderVideos();
    initFilters();
    initFaq();
    initLightbox();
    initAnimations();
  }
}

loadAdminContent();
