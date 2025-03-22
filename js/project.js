//card flip on hover
CSSPlugin.defaultTransformPerspective = 1000;
var cardback = document.querySelectorAll('.cardBack');
TweenMax.set(cardback, { rotationY: -180 });
var projectCards = document.querySelectorAll('.project-card');
if (window.innerWidth > 600) {
  projectCards.forEach(cardFlip);
  function cardFlip(element, i) {
      var frontCard = element.querySelectorAll(':scope > .cardFront');
      var backCard = element.querySelectorAll(':scope > .cardBack');
      tl = new TimelineMax({ paused: true });
      tl
          .to(frontCard, 1, { rotationY: 180 })
          .to(backCard, 1, { rotationY: 0 }, 0)
          .to(element, .5, { z: 50 }, 0)
          .to(element, .5, { z: 0 }, .5);
      element.animation = tl;
  };
  
  projectCards.forEach(cardHover);
  function cardHover(card) {
      card.addEventListener('mouseenter', function () {
          this.animation.play();
          card.addEventListener('mouseleave', () => {
              this.animation.reverse();
          });
      });
  };
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
      gsap.to(proxy, {skew: 0, duration: 0.8, ease: "power3", overwrite: true, onUpdate: () => skewSetter(proxy.skew)});
    }
  }
});
gsap.set(".project-card", {transformOrigin: "right center", force3D: true});
const fullProjects = document.querySelectorAll('.projects-full-screen');
const fullscreenImage = document.querySelectorAll('.full-screen-image');
const closeIcon = document.querySelectorAll('.close-icon');
const body = document.querySelector('body');
const clickCard = (i)=>{
  projectCards[i].addEventListener('click', () => {
    fullProjects[i].style.visibility = 'visible';
    fullProjects[i].style.transform = 'translateX(0%)';
    body.style.overflowY = 'hidden'
    fullscreenImage[i].style.animation = 'slide 15s 2s infinite alternate ease-in-out';
    closeIcon[i].addEventListener('click',()=>{
      fullProjects[i].style.transform = 'translateX(-100%)';
      fullProjects[i].style.visibility = 'hidden';
      body.style.overflowY = 'auto'
      fullscreenImage[i].style.animation = 'none';
    });
  });
}
for(let i=0;i<fullProjects.length;i++){
  clickCard(i)
}

let loader = document.querySelector(".loader");
window.addEventListener("load", function () {
  loader.style.display = "none";
  body.style.overflowY = "auto";
});