/* owd-category-filter */
(function () {
  function init() {
    if (window.OWD_COLLECTIONS) return;
    document.querySelectorAll("[data-filter]").forEach(function (bar) {
      var slug = bar.getAttribute("data-filter");
      var chips = Array.prototype.slice.call(bar.querySelectorAll("[data-chip]"));
      if (!chips.length) return;
      var active = chips.filter(function (c) { return c.getAttribute("aria-pressed") === "true"; })[0] || chips[0];
      var idle = chips.filter(function (c) { return c !== active; })[0] || active;
      var activeCls = active.className;
      var idleCls = idle.className;
      function select(chip) {
        var cat = (chip.getAttribute("data-chip") || "").toLowerCase();
        chips.forEach(function (c) {
          var on = c === chip;
          c.className = on ? activeCls : idleCls;
          c.setAttribute("aria-pressed", on ? "true" : "false");
        });
        document.querySelectorAll('[data-collection="' + slug + '"]').forEach(function (grid) {
          Array.prototype.forEach.call(grid.children, function (card) {
            var own = (card.getAttribute("data-category") || "").toLowerCase();
            card.style.display = !cat || own === cat ? "" : "none";
          });
        });
      }
      chips.forEach(function (chip) {
        chip.addEventListener("click", function (e) { e.preventDefault(); select(chip); });
        chip.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(chip); }
        });
      });
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
