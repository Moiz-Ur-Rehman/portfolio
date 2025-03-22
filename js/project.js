//card flip on hover
CSSPlugin.defaultTransformPerspective = 1000;
var cardback = document.querySelectorAll(".cardBack");
TweenMax.set(cardback, { rotationY: -180 });
var projectCards = document.querySelectorAll(".project-card");
if (window.innerWidth > 600) {
  projectCards.forEach(cardFlip);
  function cardFlip(element, i) {
    var frontCard = element.querySelectorAll(":scope > .cardFront");
    var backCard = element.querySelectorAll(":scope > .cardBack");
    tl = new TimelineMax({ paused: true });
    tl.to(frontCard, 1, { rotationY: 180 })
      .to(backCard, 1, { rotationY: 0 }, 0)
      .to(element, 0.5, { z: 50 }, 0)
      .to(element, 0.5, { z: 0 }, 0.5);
    element.animation = tl;
  }

  projectCards.forEach(cardHover);
  function cardHover(card) {
    card.addEventListener("mouseenter", function () {
      if (!this.classList.contains("disable-hover")) this.animation.play();
      card.addEventListener("mouseleave", () => {
        if (!this.classList.contains("disable-hover")) this.animation.reverse();
      });
    });
  }
}
//card skew on scroll
let proxy = { skew: 0 },
  skewSetter = gsap.quickSetter(".project-card", "skewY", "deg"),
  clamp = gsap.utils.clamp(-20, 20);
ScrollTrigger.create({
  onUpdate: (self) => {
    let skew = clamp(self.getVelocity() / -300);
    if (Math.abs(skew) > Math.abs(proxy.skew)) {
      proxy.skew = skew;
      gsap.to(proxy, {
        skew: 0,
        duration: 0.8,
        ease: "power3",
        overwrite: true,
        onUpdate: () => skewSetter(proxy.skew),
      });
    }
  },
});
gsap.set(".project-card", { transformOrigin: "right center", force3D: true });
const fullProjects = document.querySelectorAll(".projects-full-screen");
const fullscreenImage = document.querySelectorAll(".full-screen-image");
const closeIcon = document.querySelectorAll(".close-icon");
const body = document.querySelector("body");
const clickCard = (i) => {
  projectCards[i].addEventListener("click", () => {
    fullProjects[i].style.visibility = "visible";
    fullProjects[i].style.transform = "translateX(0%)";
    body.style.overflowY = "hidden";
    fullscreenImage[i].style.animation =
      "slide 15s 2s infinite alternate ease-in-out";
    closeIcon[i].addEventListener("click", () => {
      fullProjects[i].style.transform = "translateX(-100%)";
      fullProjects[i].style.visibility = "hidden";
      body.style.overflowY = "auto";
      fullscreenImage[i].style.animation = "none";
    });
  });
};
for (let i = 0; i < fullProjects.length; i++) {
  clickCard(i);
}

let loader = document.querySelector(".loader");
let content = document.querySelector(".content");

window.addEventListener("load", function () {
  setTimeout(() => {
    gsap.to(loader, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        loader.style.display = "none";
      },
    });

    document.body.style.overflow = "auto";

    // Disable hover effects initially
    projectCards.forEach((card) => card.classList.add("disable-hover"));

    gsap.to(content, { opacity: 1, duration: 0.8, ease: "power2.out" });

    // Animate each project card from a different direction
    let animations = [];
    projectCards.forEach((card, index) => {
      let direction = ["x", "y"][Math.floor(Math.random() * 2)]; // Randomly choose X or Y axis
      let distance = Math.random() > 0.5 ? 100 : -100; // Random positive or negative distance

      const anim = gsap.fromTo(
        card,
        { opacity: 0, [direction]: distance },
        {
          opacity: 1,
          [direction]: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power2.out",
        }
      );
      animations.push(anim);
    });

    // Remove the disable-hover class after all animations complete
    gsap
      .timeline()
      .add(animations) // Wait for all card animations
      .add(() => {
        projectCards.forEach((card) => card.classList.remove("disable-hover"));
      });
  }, 200);
});
