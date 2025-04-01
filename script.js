document.addEventListener("DOMContentLoaded", () => {
  const pieChart = document.getElementById("pieChart");
  const textWrapper = document.querySelector(".firsttext-wrapper");
  const fallingBackground = document.querySelector(".falling-background");

  let percentage = 0;
  function animatePie() {
    const diff = 40 - percentage;
    if (Math.abs(diff) > 0.1) {
      percentage += diff * 1;
      pieChart.style.background = `conic-gradient(#343638 0% ${percentage}%, #959699 ${percentage}% 100%)`;
      requestAnimationFrame(animatePie);
    } else {
      percentage = 40;
      pieChart.style.background = `conic-gradient(#343638 0% ${percentage}%, #959699 ${percentage}% 100%)`;
    }
  }
  requestAnimationFrame(animatePie);

  setTimeout(() => {
    const maxRadius = 0.5;
    const speed = 0.02;
    let angle = 0;
    let introProgress = 0;

    function moveInCircle() {
      if (introProgress < 1) introProgress += 0.01;
      const eased = introProgress * introProgress * (3 - 2 * introProgress);
      const radius = maxRadius * eased;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      textWrapper.style.transform = `translate(-50%, -15%) translate(${x}vh, ${y}vh)`;
      angle += speed;
      requestAnimationFrame(moveInCircle);
    }

    moveInCircle();
  }, 1000);

  window.addEventListener("scroll", (event) => {
    console.log("Scroll event triggered", event); // Debugging log
    if (!fallingBackground.classList.contains("animate")) {
      fallingBackground.classList.add("animate");
      console.log("Animate class added to falling-background");
    }
  });
});