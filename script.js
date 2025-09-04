document.addEventListener("DOMContentLoaded", function() {
    // --- Typewriter Animation for h1 ---
    const typewriter = document.getElementById("typewriter");
    const text = typewriter.textContent;
    typewriter.textContent = "";
    let index = 0;

    function type() {
        if (index < text.length) {
            typewriter.textContent += text[index];
            index++;
            setTimeout(type, 40); // 100ms delay per character
        }
    }
    type();


    // --- Scroll-Triggered Break/Arrange Animation ---
    const scrollElements = document.querySelectorAll(".scroll-anim");

    // IntersectionObserver to detect scroll direction
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible"); // Arrange when scrolling down
            } else {
                entry.target.classList.remove("visible"); // Break away when scrolling up
            }
        });
    }, {
        root: null, // Viewport
        threshold: 0.1 // Trigger at 10% visibility
    });

    // Observe each scroll-anim element
    scrollElements.forEach(element => {
        observer.observe(element);
    });

    // --- Navbar Toggle ---
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");
    navToggle.addEventListener("click", function() {
        navMenu.classList.toggle("active");
    });
});

   // navbar animation
   document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`nav a[href="#${id}"]`);
                if (activeLink) {
                    // Remove active class from all links
                    navLinks.forEach(link => link.classList.remove('active'));
                    // Add active class to the current link
                    activeLink.classList.add('active');
                }
            }
        });
    }, { threshold: 0.3 }); // Trigger when 50% of the section is visible

    sections.forEach(section => observer.observe(section));
});
   window.addEventListener('scroll', () => {
    if (window.scrollY === 0) {
        navLinks.forEach(link => link.classList.remove('active'));
        document.querySelector('nav a[href="#home"]').classList.add('active');
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const showMoreBtn = document.querySelector('.show-more');
    const popup = document.getElementById('aboutPopup');
    const fullText = document.querySelector('.popup-content .full-text');
    const cursor = document.querySelector('.cursor');
    const closePopupBtn = document.querySelector('.close-popup');
    const container = document.querySelector('.container');
    let isTyping = false;

    if (showMoreBtn && popup && fullText && cursor && closePopupBtn) {
        const textContent = fullText.textContent.trim().slice(0, -1); // Exclude cursor text
        fullText.textContent = ''; // Clear initial content

        showMoreBtn.addEventListener('click', () => {
            if (!isTyping) {
                popup.style.display = 'flex';
                container.classList.add('blur'); // Blur the rest
                typeText(textContent, 0);
            }
        });

        closePopupBtn.addEventListener('click', () => {
            popup.style.display = 'none';
            container.classList.remove('blur');
            fullText.textContent = ''; // Reset text
            isTyping = false;
        });

        function typeText(text, index) {
            isTyping = true;
            if (index < text.length) {
                fullText.textContent = text.substring(0, index + 1);
                setTimeout(() => typeText(text, index + 1), 40);
            } else {
                fullText.appendChild(cursor);
                isTyping = false;
            }
        }
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll(
        '.logo, .nav-link a, .nav-toggle, ' +
        '.hero h1, .hero p, ' +
        '.projects h2, .projects p, .project-gallery img, ' +
        '.skills-content h2, .skills-content h3, .skills-content > p, .skill-item img, .skill-item h4, .skill-item p, .skills-image img, .see-more, ' +
        '.about-me-area h6, .about-me-area h1, .about-me-area p, .about-left .img, .about-right .about-info, ' +
        '#contact h2, #contact p, .contact-box'
    );

    function applyMobileAnimations() {
        if (window.innerWidth <= 793) {
            elements.forEach(element => element.classList.add('scroll-arrange'));
        } else {
            elements.forEach(element => {
                element.classList.remove('scroll-arrange');
                element.classList.add('visible');
            });
        }
    }

    applyMobileAnimations();
    window.addEventListener('resize', applyMobileAnimations);

    const observer = new IntersectionObserver((entries) => {
        if (window.innerWidth <= 793) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }
    }, { threshold: 0.1 });

    elements.forEach(element => observer.observe(element));
});

// Back-to-Top Button for Desktop
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) { // Show after scrolling 300px
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const thankYou = document.querySelector('.thank-you');
    const closeThankYouBtn = document.querySelector('.close-thank-you');

    if (contactForm && thankYou && closeThankYouBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default submission
            fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm)
            })
            .then(response => {
                if (response.ok) {
                    contactForm.style.display = 'none'; // Hide form
                    thankYou.style.display = 'block'; // Show thank you
                } else {
                    alert('Failed to send message. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            });
        });

        closeThankYouBtn.addEventListener('click', () => {
            thankYou.style.display = 'none';
            contactForm.style.display = 'block'; // Show form again
            contactForm.reset(); // Reset form fields
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const newsletterForm = document.getElementById('newsletterForm');
    const thankYou = document.querySelector('.footer-middle .thank-you');

    if (newsletterForm && thankYou) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            fetch(newsletterForm.action, {
                method: 'POST',
                body: new FormData(newsletterForm)
            })
            .then(response => {
                if (response.ok) {
                    newsletterForm.style.display = 'none';
                    thankYou.style.display = 'block';
                    newsletterForm.reset();
                } else {
                    alert('Failed to subscribe. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            });
        });
    }
});