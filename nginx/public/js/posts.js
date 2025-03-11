/**
 * @module public/js/posts
 * @description Attaches click event listeners to elements with the class "card-clickable".
 * When a card is clicked (except when directly clicking on an inner anchor), it navigates to the URL defined in its href attribute.
 */
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card-clickable");

  cards.forEach((card) => {
    card.addEventListener("click", (event) => {
      if (
        event.target.closest("a") &&
        !event.target.closest(".card-clickable").isEqualNode(event.target)
      ) {
        return;
      }

      const href = card.getAttribute("href");
      if (href) {
        window.location.href = href;
      }
    });
  });
});
