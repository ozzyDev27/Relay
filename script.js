const pieChart = document.getElementById('pieChart');
let percentage = 0;

function animatePie() {
    const diff = 40 - percentage;
    if (Math.abs(diff) > .1) {
        percentage += diff * .05;
        pieChart.style.background = `conic-gradient(#343638 0% ${percentage}%, #959699 ${percentage}% 100%)`; //monkey patch lol
        requestAnimationFrame(animatePie);
    } else {
        percentage = 40;
        pieChart.style.background = `conic-gradient(#343638 0% $s{percentage}%, #959699 ${percentage}% 100%)`;
    }
}

requestAnimationFrame(animatePie);
