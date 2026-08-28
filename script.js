// ================================
// Mobile Navigation
// ================================

const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector("nav ul");

menuBtn.addEventListener("click", () => {
    menu.classList.toggle("show");
});

// Close menu after clicking a link

document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", () => {

        menu.classList.remove("show");

    });

});

// ================================
// Sticky Header
// ================================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){

        header.classList.add("sticky");

    }else{

        header.classList.remove("sticky");

    }

});

// ================================
// Active Navigation
// ================================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;

        if(pageYOffset >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

});

// ================================
// Scroll Animation
// ================================

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show-animation");

        }

    });

},{
    threshold:0.15
});

document.querySelectorAll(

".service-card,.skill-card,.why-card,.project-card,.testimonial-card,.info-box"

).forEach(el=>{

    el.classList.add("hidden-animation");

    observer.observe(el);

});

// ================================
// Smooth Scroll
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

// ================================
// Scroll To Top Button
// ================================

const scrollBtn = document.querySelector(".scroll-top");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 400){

        scrollBtn.style.opacity="1";
        scrollBtn.style.pointerEvents="auto";

    }else{

        scrollBtn.style.opacity="0";
        scrollBtn.style.pointerEvents="none";

    }

});

// ================================
// Typing Effect
// ================================

const title = document.querySelector(".hero h1");

const text = title.innerHTML;

title.innerHTML = "";

let i = 0;

function typing(){

    if(i < text.length){

        title.innerHTML += text.charAt(i);

        i++;

        setTimeout(typing,25);

    }

}

window.onload = typing;

// ================================
// Current Year
// ================================

const year = new Date().getFullYear();

const copyright = document.querySelector(".copyright");

if(copyright){

    copyright.innerHTML =
    `© ${year} Digitally Win | All Rights Reserved`;

}

const form = document.querySelector("form");

form.addEventListener("submit", function(){

    document.getElementById("success-message").style.display = "block";

});