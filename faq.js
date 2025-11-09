  // FAQ Toggle Logic
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      // Close all other open FAQs
      faqItems.forEach(i => {
        if (i !== item) i.classList.remove("active");
      });

      // Toggle current one
      item.classList.toggle("active");
    });
  });
