
const langButtons = document.querySelectorAll(".lang button");
async function loadAdminContent() {
  try {
    const res = await fetch("/data/admin-content.json");
    const data = await res.json();

    document.querySelector(".hero h1").innerHTML = data.name.replace(" ", "<br>");
    document.querySelector(".nickname").textContent = data.nickname;
    document.querySelector(".hero-text").textContent = data.description;

    const serviceCards = document.querySelectorAll(".service-card");

   data.services.forEach((service, index) => {
  if (serviceCards[index]) {
    serviceCards[index].querySelector("h3").textContent = service.title;
    serviceCards[index].querySelector("p").textContent = service.text;

    const categories = ["product", "product", "video", "all"];
const category = service.category || categories[index] || "all";

serviceCards[index].style.cursor = "pointer";

serviceCards[index].onclick = () => {
  if (category === "contact") {
    const contactSection = document.getElementById("contact");

    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    return;
  }

  openPortfolioCategory(category);
};
  }
});

    const portfolioGrid = document.querySelector(".portfolio-grid");

    if (portfolioGrid && data.portfolio) {
      portfolioGrid.innerHTML = "";

      data.portfolio.forEach((item) => {
        const div = document.createElement("div");
        div.className = `work-item ${item.size || ""}`;
        div.dataset.category = item.category;

        div.innerHTML = `<img src="${item.image}" alt="${item.title}">`;

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
      initFaq();
    }

  } catch (error) {
    console.log("Admin content not loaded");
  }
}

loadAdminContent();

const translations = {
  uk: {
    nav: ["Послуги", "Прайс", "Роботи", "Питання", "Контакти"],
    label: "PRODUCT PHOTO & VIDEO CONTENT",
    name: "Аліна<br>Гарнатка",
    desc: "Предметний фотограф та відеограф. Створюю фото контент на сайт, Amazon, сторінки брендів, а також різні види відео контенту — від презентацій до експертних. Спеціалізуюсь на коротких роликах TikTok формату.",
    links: ["мої послуги", "прайс", "мої роботи", "питання"],
    servicesTitleSmall: "01 / Послуги",
    servicesTitle: "Що можна замовити",
    services: [
      ["Предметні фото", "Естетична зйомка продуктів для брендів, сайтів, каталогів та соцмереж."],
      ["Фото на сайт", "Візуал для сайтів, Amazon, маркетплейсів, презентацій та сторінок бренду."],
      ["Відео контент", "Короткі ролики, TikTok/Reels формат, презентації продукту та експертні відео."],
      ["Співпраця", "Колаборації, рекламний контент, комплексна зйомка та робота з beauty-брендами."]
    ],
    priceTitle: "Ціни по індивідуальному запиту",
    priceText: "Вартість залежить від формату зйомки, кількості фото/відео, складності ідеї, реквізиту та термінів виконання.",
    fop: "Оплата можлива на ФОП.",
    priceBtn: "Обговорити проєкт →",
    worksSmall: "02 / Роботи",
    worksTitle: "Портфоліо",
    filters: ["Усі", "Предметні фото", "Фото на руці", "Макро текстури", "Відео контент"],
    faqSmall: "03 / Питання",
    faqTitle: "Правила роботи",
    faq: [
      ["Як відбувається співпраця?", "Спочатку обговорюємо задачу, продукт, формат контенту, терміни, референси та бажаний результат. Після цього формується індивідуальна пропозиція."],
      ["Як формується ціна?", "Ціна залежить від кількості матеріалів, складності зйомки, реквізиту, монтажу, терміновості та формату контенту."],
      ["Чи можна замовити тільки відео?", "Так, можна замовити окремо фото, відео або комплексну зйомку під бренд."],
      ["Куди приходять заявки?", "Усі заявки з сайту автоматично надходять у Telegram."]
    ],
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
    services: [
      ["Предметные фото", "Эстетичная съёмка продуктов для брендов, сайтов, каталогов и соцсетей."],
      ["Фото для сайта", "Визуал для сайтов, Amazon, маркетплейсов, презентаций и страниц бренда."],
      ["Видео контент", "Короткие ролики, формат TikTok/Reels, презентации продукта и экспертные видео."],
      ["Сотрудничество", "Коллаборации, рекламный контент, комплексная съёмка и работа с beauty-брендами."]
    ],
    priceTitle: "Цены по индивидуальному запросу",
    priceText: "Стоимость зависит от формата съёмки, количества фото/видео, сложности идеи, реквизита и сроков выполнения.",
    fop: "Оплата возможна на ФОП.",
    priceBtn: "Обсудить проект →",
    worksSmall: "02 / Работы",
    worksTitle: "Портфолио",
    filters: ["Все", "Предметные фото", "Фото на руке", "Макро текстуры", "Видео контент"],
    faqSmall: "03 / Вопросы",
    faqTitle: "Правила работы",
    faq: [
      ["Как проходит сотрудничество?", "Сначала обсуждаем задачу, продукт, формат контента, сроки, референсы и желаемый результат. После этого формируется индивидуальное предложение."],
      ["Как формируется цена?", "Цена зависит от количества материалов, сложности съёмки, реквизита, монтажа, срочности и формата контента."],
      ["Можно ли заказать только видео?", "Да, можно заказать отдельно фото, видео или комплексную съёмку под бренд."],
      ["Куда приходят заявки?", "Все заявки с сайта автоматически приходят в Telegram."]
    ],
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
    services: [
      ["Product photos", "Aesthetic product photography for brands, websites, catalogs and social media."],
      ["Website photos", "Visual content for websites, Amazon, marketplaces, presentations and brand pages."],
      ["Video content", "Short videos, TikTok/Reels format, product presentations and expert videos."],
      ["Collaboration", "Collaborations, advertising content, full content shoots and work with beauty brands."]
    ],
    priceTitle: "Prices by individual request",
    priceText: "The price depends on the shooting format, number of photos/videos, idea complexity, props and deadlines.",
    fop: "Payment via Ukrainian sole proprietor account is available.",
    priceBtn: "Discuss the project →",
    worksSmall: "02 / Works",
    worksTitle: "Portfolio",
    filters: ["All", "Product photos", "Hand photos", "Macro textures", "Video content"],
    faqSmall: "03 / FAQ",
    faqTitle: "Work rules",
    faq: [
      ["How does cooperation work?", "First, we discuss the task, product, content format, deadlines, references and desired result. After that, an individual offer is created."],
      ["How is the price formed?", "The price depends on the number of materials, shooting complexity, props, editing, urgency and content format."],
      ["Can I order only video?", "Yes, you can order photo, video, or a full brand content shoot separately."],
      ["Where do requests go?", "All website requests are automatically sent to Telegram."]
    ],
    contactTitle: "Leave a request",
    contactText: "Write what type of content you need, leave your contact — and the request will automatically be sent to Telegram.",
    placeholders: ["Your name", "Telegram / Instagram / phone", "Briefly describe the task"],
    selectFirst: "What are you interested in?",
    formBtn: "Send request →"
  }
};

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

  document.querySelectorAll(".service-card").forEach((card, index) => {
    card.querySelector("h3").textContent = t.services[index][0];
    card.querySelector("p").textContent = t.services[index][1];
  });

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

  document.querySelectorAll(".faq-item").forEach((item, index) => {
    item.querySelector("button").innerHTML = `${t.faq[index][0]} <span>+</span>`;
    item.querySelector("p").textContent = t.faq[index][1];
  });

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

const filterButtons = document.querySelectorAll(".filter-buttons button");
const workItems = document.querySelectorAll(".work-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    workItems.forEach((item) => {
      const category = item.dataset.category;

      if (filter === "all" || category === filter) {
        item.classList.remove("hide");
      } else {
        item.classList.add("hide");
      }
    });
  });
});

// Открытие фото в большом размере
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox.querySelector("img");

workItems.forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img");
    lightboxImg.src = img.src;
    lightbox.classList.add("active");
  });
});

lightbox.addEventListener("click", () => {
  lightbox.classList.remove("active");
  lightboxImg.src = "";
});

// FAQ / вопросы
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

initFaq();

// Плавное появление блоков при скролле
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

// Форма заявки
// Форма заявки
const requestForm = document.getElementById("requestForm");
const formStatus = document.getElementById("formStatus");

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
    formStatus.textContent = "Форма запрацює після завантаження сайту на Netlify.";
  }
  function openPortfolioCategory(category) {
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
    function makeServicesClickable() {
  const serviceCards = document.querySelectorAll(".service-card");

  const defaultCategories = ["product", "product", "video", "contact"];

  serviceCards.forEach((card, index) => {
    card.style.cursor = "pointer";

    card.onclick = () => {
      const category = defaultCategories[index] || "all";

      if (category === "contact") {
        document.getElementById("contact")?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
        return;
      }

      document.getElementById("works")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      setTimeout(() => {
        const btn = document.querySelector(`.filter-buttons button[data-filter="${category}"]`);
        if (btn) btn.click();
      }, 500);
    };
  });
}

setTimeout(makeServicesClickable, 1000);
}
});

