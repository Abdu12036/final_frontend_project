// === Interactive Search with Highlight and Filter ===
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const cards = document.querySelectorAll(".tour-container2 .card");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();

    cards.forEach(card => {
      const titleEl = card.querySelector("h3");
      const descEl = card.querySelector("p");
      const title = titleEl.textContent.toLowerCase();
      const desc = descEl.textContent.toLowerCase();

      // Remove previous highlights
      titleEl.innerHTML = titleEl.textContent;
      descEl.innerHTML = descEl.textContent;

      // If the query is empty — show all
      if (query === "") {
        card.style.display = "block";
        return;
      }

      // If it matches title or description
      if (title.includes(query) || desc.includes(query)) {
        card.style.display = "block";

        // Highlight matched text (case-insensitive)
        const highlight = (text) =>
          text.replace(new RegExp(`(${query})`, "gi"), "<mark>$1</mark>");

        titleEl.innerHTML = highlight(titleEl.textContent);
        descEl.innerHTML = highlight(descEl.textContent);
      } else {
        // Hide cards without matches
        card.style.display = "none";
      }
    });
  });
});
