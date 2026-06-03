const header = document.querySelector("#header");
const menuBtn = document.querySelector("#mobileMenuBtn");
const gnb = document.querySelector("#gnb");
const floatTop = document.querySelector("#floatTop");
const filterBtns = document.querySelectorAll(".filter-btn");
const portfolioCards = document.querySelectorAll(".portfolio-card");
const faqItems = document.querySelectorAll(".faq-item");
const contactForm = document.querySelector("#contactForm");
const formMessage = document.querySelector("#formMessage");


window.addEventListener("scroll", () => {
  if (header) header.classList.toggle("scrolled", window.scrollY > 20);
  if (floatTop) floatTop.classList.toggle("show", window.scrollY > 450);
});

if (menuBtn && gnb) menuBtn.addEventListener("click", () => {
  gnb.classList.toggle("open");
});

if (gnb) gnb.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    gnb.classList.remove("open");
  });
});

if (floatTop) floatTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

filterBtns.forEach((btn) => {
  btn.("click", () => {
    filterBtns.forEach((item) => item.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    portfolioCards.forEach((card) => {
      const matched = filter === "all" || card.dataset.category === filter;
      card.style.display = matched ? "block" : "none";
    });
  });
});

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  const closeItem = (target) => {
    const targetAnswer = target.querySelector(".faq-answer");
    target.classList.remove("active");
    targetAnswer.style.height = "0px";
    targetAnswer.style.opacity = "0";
    targetAnswer.style.padding = window.innerWidth <= 760
    ? "18px 24px 28px 24px"
    : "20px 24px 32px 72px";
  };

  const openItem = (target) => {
    const targetAnswer = target.querySelector(".faq-answer");
    target.classList.add("active");

    targetAnswer.style.height = "auto";
    const fullHeight = targetAnswer.scrollHeight;
    targetAnswer.style.height = "0px";

    requestAnimationFrame(() => {
      targetAnswer.style.height = fullHeight + "px";
      targetAnswer.style.opacity = "1";
      targetAnswer.style.padding = window.innerWidth <= 760
        ? "18px 24px 32px 24px"
        : "20px 24px 20px 72px";
    });
  };

  if (item.classList.contains("active")) {
    openItem(item);
  }

  question.("click", () => {
    const isActive = item.classList.contains("active");

    faqItems.forEach((other) => {
      closeItem(other);
    });

    if (!isActive) {
      openItem(item);
    }
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
if (contactForm) contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = {
    hospital: contactForm.querySelector('input[placeholder="병원명 또는 브랜드명"]').value,
    name: contactForm.querySelector('input[placeholder="담당자명"]').value,
    phone: contactForm.querySelector('input[placeholder="연락처 010-0000-0000"]').value,
    service: contactForm.querySelector("select").value,
    message: contactForm.querySelector("textarea").value
  };

  await fetch("여기에_Apps_Script_URL_붙여넣기", {
    method: "POST",
    body: JSON.stringify(formData)
  });

  formMessage.textContent = "상담 신청이 접수되었습니다. 빠르게 확인 후 연락드릴게요.";
  contactForm.reset();
});
// if (contactForm) contactForm.addEventListener("submit", (event) => {
//   event.preventDefault();
//   formMessage.textContent = "문의 샘플이 접수된 것처럼 표시했어요. 실제 전송은 별도 연결이 필요합니다.";
//   contactForm.reset();
});
