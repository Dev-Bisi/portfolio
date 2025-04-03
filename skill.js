
document.addEventListener('DOMContentLoaded', () => {
// Typewriter Effect with Auto-Start and Mobile Support
const typewriter = document.getElementById("typewriter");
if (typewriter) {
    const text = typewriter.textContent;
    typewriter.textContent = "";
    let index = 0;
    let typingInterval = setInterval(type, 100);

    function type() {
        if (index < text.length) {
            typewriter.textContent += text[index];
            index++;
        } else {
            typewriter.textContent = "";
            index = 0;
        }
    }

    document.addEventListener("mousemove", () => {
        if (!typingInterval) {
            typewriter.textContent = "";
            index = 0;
            typingInterval = setInterval(type, 100);
        }
    });

    document.addEventListener("touchstart", () => {
        clearInterval(typingInterval);
        typewriter.textContent = "";
        index = 0;
        typingInterval = setInterval(type, 100);
    });

    document.addEventListener("mouseleave", () => {
        if (typingInterval) {
            clearInterval(typingInterval);
            typingInterval = null;
            typewriter.textContent = text;
        }
    });
}

// Scroll-Triggered Animation for .animate-element
const animateElements = document.querySelectorAll(".animate-element");
const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.5 });

animateElements.forEach(element => animateObserver.observe(element));

// Scroll-Triggered Animation for .scroll-anim
const scrollElements = document.querySelectorAll(".scroll-anim");
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        } else {
            entry.target.classList.remove("visible");
        }
    });
}, { threshold: 0.1 });

scrollElements.forEach(element => scrollObserver.observe(element));

// Navbar Toggle
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
}
});