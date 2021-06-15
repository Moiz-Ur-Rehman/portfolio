function menu(){
    const bars=document.querySelector('.icon')
    const nav=document.querySelector('.menu ul')
    bars.addEventListener('click',function(){
        nav.classList.toggle('nav-active')
    })
}
menu()
//GSAP
gsap.from('.name',{duration:1,x:-100})
gsap.registerPlugin(ScrollTrigger);
gsap.from(".about", {
    scrollTrigger: {
        trigger: ".about",
        toggleActions: "restart reverse restart reverse"
    },
    duration: 1.5,
    opacity: 0
});
gsap.from(".service1", {
    scrollTrigger: {
        trigger: ".service1",
        toggleActions: "restart reverse restart reverse"
    },
    duration: 1,
    opacity: 0,
    x: -100
});
gsap.from(".service2", {
    scrollTrigger: {
        trigger: ".service2",
        toggleActions: "restart reverse restart reverse"
    },
    duration: 1,
    opacity: 0,
    x: 100
});
gsap.from(".service3", {
    scrollTrigger: {
        trigger: ".service3",
        toggleActions: "restart reverse restart reverse"
    },
    duration: 1,
    opacity: 0,
    x: -100
});
gsap.from(".skillset", {
    scrollTrigger: {
        trigger: ".skillset",
        toggleActions: "restart none none none"
    },
    duration: 1,
    opacity: 0,
    y: -50,
    stagger: .1
});
//Message sent
function success(){
    var success=document.querySelector('#success')
    success.style.display='none'
}
const names=document.getElementById("name")
const email=document.getElementById("email")
const Error=document.getElementById("Error")

form.addEventListener('submit', (e)=>{
    Message=[]
    const username=names.value.trim()
    if (username.length < 3){
       Message.push("Name can not be less than 3 characters")
    }
    if(Message.length > 0){
        e.preventDefault()
        Error.innerText=Message
    }
})
//loader
let loader = document.querySelector('.loader');
let body = document.querySelector('body');
window.addEventListener('load', function () {
    loader.style.display = 'none';
    body.style.overflowY = "auto";
});
//swiper
var swiper = new Swiper('.swiper-container', {
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

const controls=document.querySelector(".controls");
const container=document.querySelector(".thumbnail-container");
const allBox=container.children;
const containerWidth=container.offsetWidth;
const margin=30;
var items=0;
var totalItems=0;
var jumpSlideWidth=0;

// item setup per slide

responsive=[
{breakPoint:{width:0,item:1}}, //if width greater than 0 (1 item will show) 
{breakPoint:{width:720,item:2}}, //if width greater than 600 (2  item will show) 
{breakPoint:{width:1050,item:3}} //if width greater than 1000 (3 item will show) 
]

function slider(){
   for(let i=0; i<responsive.length;i++){
       if(window.innerWidth>responsive[i].breakPoint.width){
           items=responsive[i].breakPoint.item
       }
   }
   start();
}

function start(){
    var totalItemsWidth=0
   for(let i=0;i<allBox.length;i++){
        // width and margin setup of items
       allBox[i].style.width=(containerWidth/items)-margin + "px";
       allBox[i].style.margin=(margin/2)+ "px";
      totalItemsWidth+=containerWidth/items;
      totalItems++;
   }

   // thumbnail-container width set up
   container.style.width=totalItemsWidth + "px";

   // slides controls number set up
    const allSlides=Math.ceil(totalItems/items);
   const ul=document.createElement("ul");
      for(let i=1;i<=allSlides;i++){
        const li=document.createElement("li");
             li.id=i;
             li.setAttribute("onclick","controlSlides(this)");
             ul.appendChild(li);
             if(i==1){
                 li.className="active";
             }
      }
      controls.appendChild(ul);
}
  // when click on numbers slide to next slide
function controlSlides(ele){
    const ul=controls.children;
    const li=ul[0].children  
    var active;
    for(let i=0;i<li.length;i++){
        if(li[i].className=="active"){
            // find who is now active
            active=i;
            // remove active class from all 'li' elements
            li[i].className="";
        }
    }
    // add active class to current slide
    ele.className="active";
    var numb=(ele.id-1)-active;
    jumpSlideWidth=jumpSlideWidth+(containerWidth*numb);
    container.style.marginLeft=-jumpSlideWidth + "px";
}
window.onload=slider();