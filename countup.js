// Counter animation for #stats section
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  const speed = 200; // smaller = faster

  const animateCounters = () => {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = Math.ceil(target / speed);

        if (count < target) {
          counter.innerText = count + increment;
          setTimeout(updateCount, 20); // adjust speed
        } else {
          counter.innerText = target.toLocaleString(); // add commas
        }
      };
      updateCount();
    });
  };

  // Animate only when #stats enters viewport
  const statsSection = document.querySelector("#stats");
  let started = false;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        animateCounters();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(statsSection);
});
