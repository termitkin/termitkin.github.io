/*
 * Masonry init
 */
window.addEventListener("load", function() {
  const elem = document.querySelector(".grid");
  new Masonry(elem, {
    itemSelector: ".grid-item",
    transitionDuration: "0.4s"
  });
});
