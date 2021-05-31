CSSPlugin.defaultTransformPerspective = 1000;
var cardback = document.querySelectorAll('.cardBack');
TweenMax.set(cardback, { rotationY: -180 });
var projectCards = document.querySelectorAll('.project-card');
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
let proxy = { skew: 0 },
    skewSetter = gsap.quickSetter(".project-card", "skewY", "deg"), // fast
    clamp = gsap.utils.clamp(-20, 20); // don't let the skew go beyond 20 degrees. 
ScrollTrigger.create({
  onUpdate: (self) => {
    let skew = clamp(self.getVelocity() / -300);
    // only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
    if (Math.abs(skew) > Math.abs(proxy.skew)) {
      proxy.skew = skew;
      gsap.to(proxy, {skew: 0, duration: 0.8, ease: "power3", overwrite: true, onUpdate: () => skewSetter(proxy.skew)});
    }
  }
});
// make the right edge "stick" to the scroll bar. force3D: true improves performance
gsap.set(".project-card", {transformOrigin: "right center", force3D: true});
