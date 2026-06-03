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
  header.classList.toggle("scrolled", window.scrollY > 20);
  floatTop.classList.toggle("show", window.scrollY > 450);
});

menuBtn.addEventListener("click", () => {
  gnb.classList.toggle("open");
});

gnb.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    gnb.classList.remove("open");
  });
});

floatTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((item) => item.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    portfolioCards.forEach((card) => {
      const matched = filter === "all" || card.dataset.category === filter;
      card.style.display = matched ? "block" : "none";
    });
  });
});

// faqItems.forEach((item) => {
//   const question = item.querySelector(".faq-question");

//   question.addEventListener("click", () => {
//     faqItems.forEach((other) => {
//       if (other !== item) other.classList.remove("active");
//     });
//     item.classList.toggle("active");
//   });
// });
faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        const isActive = item.classList.contains("active");

        faqItems.forEach((other) => {
            other.classList.remove("active");
        });

        if (!isActive) {
            item.classList.add("active");
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

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "문의 샘플이 접수된 것처럼 표시했어요. 실제 전송은 별도 연결이 필요합니다.";
  contactForm.reset();
});
