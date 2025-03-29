document.addEventListener("DOMContentLoaded", () => {
  const pieChart = document.getElementById('pieChart');
  const textWrapper = document.querySelector(".firsttext-wrapper");
  const textElement = document.getElementById("centerText");
  const scrollDownArrow = document.querySelector(".scrolldownarrow");
  const sections = Array.from(document.querySelectorAll(".section"));

  // Pie chart animation
  let percentage = 0;
  function animatePie() {
    const diff = 40 - percentage;
    if (Math.abs(diff) > 0.1) {
      percentage += diff * 0.05;
      pieChart.style.background = `conic-gradient(#343638 0% ${percentage}%, #959699 ${percentage}% 100%)`;
      requestAnimationFrame(animatePie);
    } else {
      percentage = 40;
      pieChart.style.background = `conic-gradient(#343638 0% ${percentage}%, #959699 ${percentage}% 100%)`;
    }
  }
  requestAnimationFrame(animatePie);

  // Orbiting text
  setTimeout(() => {
    const maxRadius = 1;
    const speed = 0.02;
    let angle = 0;
    let introProgress = 0;

    function moveInCircle() {
      if (introProgress < 1) introProgress += 0.01;
      const eased = introProgress * introProgress * (3 - 2 * introProgress);
      const radius = maxRadius * eased;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      textWrapper.style.transform = `translate(0%, 42.5vh) translate(${x}vh, ${y}vh)`;
      angle += speed;
      requestAnimationFrame(moveInCircle);
    }

    moveInCircle();
  }, 1000);

  // Full-page scroll
  let currentSectionIndex = 0;
  let isScrolling = false;

  function scrollToSection(index) {
    if (index < 0 || index >= sections.length) return;
    isScrolling = true;
    currentSectionIndex = index;
    window.scrollTo({
      top: window.innerHeight * index,
      behavior: "smooth"
    });
    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  }

  window.addEventListener("wheel", (e) => {
    if (isScrolling) return;
    if (e.deltaY > 0) scrollToSection(currentSectionIndex + 1);
    else if (e.deltaY < 0) scrollToSection(currentSectionIndex - 1);
  });

  if (scrollDownArrow) {
    scrollDownArrow.addEventListener("click", () => {
      scrollToSection(currentSectionIndex + 1);
    });
  }

  // Disable middle mouse auto scroll
  window.addEventListener("mousedown", (e) => {
    if (e.button === 1) e.preventDefault();
  });

  // Snap to closest section on load/resize
  function snapToClosest() {
    const index = Math.round(window.scrollY / window.innerHeight);
    scrollToSection(index);
  }

  window.addEventListener("resize", snapToClosest);
  window.addEventListener("load", snapToClosest);
});
