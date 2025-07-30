gsap.registerPlugin(ScrollTrigger);

// Only apply on screens wider than 768px
if (window.matchMedia("(min-width: 769px)").matches) {
  const section = document.querySelector(".services-section"),
        boxes = gsap.utils.toArray(".services-section .box");

  // Pin the section during scroll
  ScrollTrigger.create({
    trigger: section,
    start: "top 20%",
    end: "+=900",
    pin: true,
    pinSpacing: true,
    markers: false,
  });

  const revealFactor = 0.9; // Higher = slower reveal (more scroll between box animations)

  // Animate boxes opacity & scale on scroll up/down
  ScrollTrigger.create({
    trigger: section,
    start: "top 20%",
    end: "+=900",
    onUpdate: self => {
      const total = boxes.length,
            reveal = Math.floor(self.progress / revealFactor * total);

      // Shuffle boxes once for random reveal order
      if (!section._shuffledBoxes)
        section._shuffledBoxes = boxes.slice().sort(() => Math.random() - 0.5);

      section._shuffledBoxes.forEach((box, i) => {
        const op = gsap.getProperty(box, "opacity"),
              scale = gsap.getProperty(box, "scale");

        // Fade & scale in boxes within reveal count, fade out others
        if (i < reveal && (op === 0 || scale === 0))
          gsap.to(box, {opacity: 1, scale: 1, duration: 1, ease: "power1.out"});
        else if (i >= reveal && (op === 1 || scale === 1))
          gsap.to(box, {opacity: 0, scale: 0, duration: 1, ease: "power1.out"});
      });
    }
  });
}

