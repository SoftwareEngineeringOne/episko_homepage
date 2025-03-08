document.addEventListener("DOMContentLoaded", function() {
  const cards = document.querySelectorAll('.card-clickable');

  cards.forEach(card => {
    card.addEventListener('click', (event) => {
      if (event.target.closest('a') && !event.target.closest('.card-clickable').isEqualNode(event.target)) {
        return;
      }

      const href = card.getAttribute('href');
      if (href) {
        window.location.href = href;
      }
    })
  })
})
