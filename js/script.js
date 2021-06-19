function menu() {
  const bars = document.querySelector(".icon");
  const nav = document.querySelector(".menu ul");
  bars.addEventListener("click", function () {
    nav.classList.toggle("nav-active");
  });
}
menu();
//GSAP
gsap.registerPlugin(ScrollTrigger);
const animate = (Class, xValue, dur) => {
  gsap.from(Class, {
    scrollTrigger: {
      trigger: Class,
      toggleActions: "restart reverse restart reverse",
    },
    duration: dur,
    opacity: 0,
    x: xValue,
  });
};
animate(".service1", -100, 1);
animate(".service2", 100, 1);
animate(".service3", -100, 1);
animate(".about", null, 1.5);
gsap.from(".skillset", {
  scrollTrigger: {
    trigger: ".skillset",
    toggleActions: "restart none none none",
  },
  duration: 1,
  opacity: 0,
  y: -50,
  stagger: 0.1,
});
gsap.from(".card", {
  scrollTrigger: {
    trigger: ".card",
    toggleActions: "restart none none none",
  },
  duration: 1,
  opacity: 0,
  rotationY: 90,
});

//Message sent
function success() {
  var success = document.querySelector("#success");
  success.style.display = "none";
}
const names = document.getElementById("name");
const email = document.getElementById("email");
const Error = document.getElementById("Error");

form.addEventListener("submit", (e) => {
  Message = [];
  const username = names.value.trim();
  if (username.length < 3) {
    Message.push("Name can not be less than 3 characters");
  }
  if (Message.length > 0) {
    e.preventDefault();
    Error.innerText = Message;
  }
});
//loader
let loader = document.querySelector(".loader");
let reveal1 = document.querySelector(".reveal1");
let reveal2 = document.querySelector(".reveal2");
let body = document.querySelector("body");
window.addEventListener("load", function () {
  loader.style.display = "none";
  reveal1.style.transform = "translateX(-100%)";
  reveal2.style.transform = "translateX(100%)";
  body.style.overflowY = "auto";
  if (window.innerWidth > 745) {
    gsap.from(".name", { duration: 2, x: -100 });
    gsap.from(".navbar", { duration: 2, y: -100 });
    gsap.from(".picture img", { duration: 2, x: 100 });
  }
});
//swiper
var swiper = new Swiper(".swiper-container", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const controls = document.querySelector(".controls");
const container = document.querySelector(".thumbnail-container");
const allBox = container.children;
const containerWidth = container.offsetWidth;
const margin = 30;
var items = 0;
var totalItems = 0;
var jumpSlideWidth = 0;
// item setup per slide
responsive = [
  { breakPoint: { width: 0, item: 1 } }, //if width greater than 0 (1 item will show)
  { breakPoint: { width: 720, item: 2 } }, //if width greater than 600 (2  item will show)
  { breakPoint: { width: 1050, item: 3 } }, //if width greater than 1000 (3 item will show)
];
function slider() {
  for (let i = 0; i < responsive.length; i++) {
    if (window.innerWidth > responsive[i].breakPoint.width) {
      items = responsive[i].breakPoint.item;
    }
  }
  start();
}
function start() {
  var totalItemsWidth = 0;
  for (let i = 0; i < allBox.length; i++) {
    // width and margin setup of items
    allBox[i].style.width = containerWidth / items - margin + "px";
    allBox[i].style.margin = margin / 2 + "px";
    totalItemsWidth += containerWidth / items;
    totalItems++;
  }
  // thumbnail-container width set up
  container.style.width = totalItemsWidth + "px";
  // slides controls number set up
  const allSlides = Math.ceil(totalItems / items);
  const ul = document.createElement("ul");
  for (let i = 1; i <= allSlides; i++) {
    const li = document.createElement("li");
    li.id = i;
    li.setAttribute("onclick", "controlSlides(this)");
    ul.appendChild(li);
    if (i == 1) {
      li.className = "active";
    }
  }
  controls.appendChild(ul);
}
// when click on numbers slide to next slide
function controlSlides(ele) {
  const ul = controls.children;
  const li = ul[0].children;
  var active;
  for (let i = 0; i < li.length; i++) {
    if (li[i].className == "active") {
      // find who is now active
      active = i;
      // remove active class from all 'li' elements
      li[i].className = "";
    }
  }
  // add active class to current slide
  ele.className = "active";
  var numb = ele.id - 1 - active;
  jumpSlideWidth = jumpSlideWidth + containerWidth * numb;
  container.style.marginLeft = -jumpSlideWidth + "px";
}
window.onload = slider();

const cardButton = document.querySelectorAll(".card-button");
const cardImage = document.querySelectorAll(".card-image img");
const projectsFullScreen = document.querySelectorAll(".projects-full-screen");
const projectsFullImage = document.querySelectorAll(".full-screen-image");
const closeIconProjects = document.querySelectorAll(".close-icon");
const clickCard = (i, cardOpener) => {
  cardOpener[i].addEventListener("click", () => {
    projectsFullScreen[i].style.visibility = "visible";
    projectsFullScreen[i].style.transform = "translateX(0%)";
    projectsFullImage[i].style.animation =
      "slide 17s 2s infinite alternate ease-in-out";
    body.style.overflowY = "hidden";
    closeIconProjects[i].addEventListener("click", () => {
      projectsFullScreen[i].style.visibility = "hidden";
      projectsFullScreen[i].style.transform = "translateX(-100%)";
      projectsFullImage[i].style.animation = "none";
      body.style.overflowY = "auto";
    });
  });
};
for (let i = 0; i < cardButton.length; i++) {
  clickCard(i, cardButton);
  clickCard(i, cardImage);
}
