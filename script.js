document.addEventListener("DOMContentLoaded", () => {
  const pieChart = document.getElementById("pieChart");
  const textWrapper = document.querySelector(".firsttext-wrapper");
  const fallingBackground = document.querySelector(".falling-background");

  let percentage = 0;
  function animatePie() {
    const duration = 1000; // Total animation duration in milliseconds
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1); // Clamp progress between 0 and 1
      const easedProgress = progress * (2 - progress); // Ease-out function

      percentage = easedProgress * 40; // Target percentage is 40
      pieChart.style.background = `conic-gradient(rgba(227, 145, 44, 1) 0% ${percentage}%,rgba(244, 169, 79, 1) ${percentage}% 100%)`;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  requestAnimationFrame(() => {
    animatePie(); // Ensure animation starts after rendering is complete
  });

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

  window.addEventListener("scroll", () => {
    if (!fallingBackground.classList.contains("animate")) {
      fallingBackground.classList.add("animate");
    }
  });

  const scrollArrow = document.getElementById("scrollArrow");
  const nextSection = document.getElementById("secondPage");
  scrollArrow?.addEventListener("click", () => {
    nextSection.scrollIntoView({ behavior: "smooth" });
  });

  const svgGrid = document.querySelector(".svg-grid");
  if (svgGrid) {
    const totalSVGs = 50;
    const highlightedCount = 10;
    const highlightedIndices = new Set();

    while (highlightedIndices.size < highlightedCount) {
      highlightedIndices.add(Math.floor(Math.random() * totalSVGs));
    }

    for (let i = 0; i < totalSVGs; i++) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 100 100");
      svg.innerHTML = `
        <circle cx="50" cy="13.979" r="7.312"/>
        <path d="M67.709,30.771c0-4.584-3.716-8.3-8.302-8.3h-18.73c-4.583,0-8.3,3.716-8.3,8.3v22.358
          c0,1.956,1.584,3.543,3.54,3.543s3.545-1.587,3.545-3.543V35.021c0.058-0.296,0.307-0.523,0.618-0.523
          c0.354,0,0.643,0.288,0.643,0.643v53.695c0,2.483,2.017,4.497,4.496,4.497c2.484,0,4.499-2.014,4.499-4.497V56.983
          c0-0.206,0.166-0.372,0.371-0.372s0.371,0.166,0.371,0.372v31.853c0,2.483,2.015,4.497,4.497,4.497
          c2.481,0,4.496-2.014,4.496-4.497V35.028c0.056-0.298,0.307-0.529,0.621-0.529c0.354,0,0.642,0.288,0.642,0.643v17.988
          c0,1.956,1.587,3.543,3.543,3.543s3.542-1.587,3.542-3.543V30.771z"/>`;

      if (highlightedIndices.has(i)) {
        svg.style.fill = "#244c8d";
      } else {
        svg.style.fill = "#7aaaf7";
        svg.classList.add("healthy");
        if (Math.random() < 0.5) {
          svg.classList.add("dancing");
        } else {
          svg.classList.add("otherDancing");
        }
      }

      svgGrid.appendChild(svg);
    }
  }



  // Create SVG grid for fifthpage
  const fifthPageGrid = document.querySelector(".fifthpage .svg-grid");
  if (fifthPageGrid) {
    const totalSVGs = 50;

    for (let i = 0; i < totalSVGs; i++) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 100 100");
      svg.innerHTML = `
        <circle cx="50" cy="13.979" r="7.312"/>
        <path d="M67.709,30.771c0-4.584-3.716-8.3-8.302-8.3h-18.73c-4.583,0-8.3,3.716-8.3,8.3v22.358
          c0,1.956,1.584,3.543,3.54,3.543s3.545-1.587,3.545-3.543V35.021c0.058-0.296,0.307-0.523,0.618-0.523
          c0.354,0,0.643,0.288,0.643,0.643v53.695c0,2.483,2.017,4.497,4.496,4.497c2.484,0,4.499-2.014,4.499-4.497V56.983
          c0-0.206,0.166-0.372,0.371-0.372s0.371,0.166,0.371,0.372v31.853c0,2.483,2.015,4.497,4.497,4.497
          c2.481,0,4.496-2.014,4.496-4.497V35.028c0.056-0.298,0.307-0.529,0.621-0.529c0.354,0,0.642,0.288,0.642,0.643v17.988
          c0,1.956,1.587,3.543,3.543,3.543s3.542-1.587,3.542-3.543V30.771z"/>`;

      svg.style.fill = "#7aaaf7";
      svg.classList.add("healthy");
      if (Math.random() < 0.5) {
        svg.classList.add("dancing");
      } else {
        svg.classList.add("otherDancing");
      }

      fifthPageGrid.appendChild(svg);
    }
  }

  // 🔁 Liquid Morphing Animation using Flubber
  const liquidPath = document.querySelector("#liquidPath");
  const shapes = [
    "M200 388V13.9124C200 13.9124 199.991 14.1091 193 18.9542C171.723 33.7003 158 4.81771 138 13.9124C112.5 25.5081 115 24.4997 82.5 12.9041C63.1175 5.98857 16.5 -12.3038 0 12.9041V388H200Z",
    "M199.998 388V12.7575C199.998 12.7575 200.498 12.1372 186.498 6.18323C174.781 1.6252 153.998 -6.45944 129.499 9.21757C103.999 20.849 83.4991 6.18311 53.9994 4.16041C33.4865 2.75391 12.9999 29.3317 0 11.6315V388H199.998Z",
    "M200 388V15.2853C200 15.2853 197 14.2807 177.5 6.74623C165.783 2.21892 146 -6.81608 121.5 8.75545C94 29.8525 57.5 40.9032 42 20.3085C29.6 3.83267 8.83333 9.42503 0 14.2807V388H200Z"
  ];

  let index = 0;

  function morphToNext() {
    const from = shapes[index];
    const to = shapes[(index + 1) % shapes.length];
    const interpolator = flubber.interpolate(from, to);
    let t = 0;

    function animate() {
      t += 0.01;
      if (t >= 1) {
        index = (index + 1) % shapes.length;
        morphToNext();
      } else {
        liquidPath.setAttribute("d", interpolator(t));
        requestAnimationFrame(animate);
      }
    }

    animate();
  }

  morphToNext();

});