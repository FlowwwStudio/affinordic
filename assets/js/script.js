// Store the original state of navbar links
let isMenuOpen = false;
let isAnimating = false;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    // Find the menu button
    const menuButton = document.querySelector('[data-menu="button"]');
    const containerTop = document.querySelector('.navbar_links-container.is-top');
    const containerMiddle = document.querySelector('.navbar_links-container.is-middle');
    const containerBottom = document.querySelector('.navbar_links-container.is-bottom');
    const navMenu = document.querySelector('.navbar_menu');
    
    // Initial setup
    gsap.set(navMenu, {
        display: 'none',
        opacity: 0,
    });
    gsap.set([containerTop, containerMiddle, containerBottom], {
        xPercent: 105,
        yPercent: 0,
        rotation: 0
    });

    function toggleMenu() {
        if (isAnimating) return; // Prevent clicking during animation
        isAnimating = true;
        
        if (!isMenuOpen) {
            // Open menu
            navMenu.style.display = 'flex';
            
            const openMenu = gsap.timeline({
                onComplete: () => {
                    isMenuOpen = true;
                    isAnimating = false;
                }
            });
            
            openMenu.to(navMenu, {
                opacity: 1,
                duration: 0.3,
            })
            .to(containerTop, {
                xPercent: 0,
                duration: 0.4,
                ease: "power2.inOut",
            }, '<0.1')
            .to(containerMiddle, {
                xPercent: 0,
                duration: 0.4,
                ease: "power2.inOut",
            }, '<0.1')
            .to(containerBottom, {
                xPercent: 0,
                duration: 0.4,
                ease: "power2.inOut",
            }, '<0.1');
        } else {
            // Close menu
            const closeMenu = gsap.timeline({
                onComplete: () => {
                    navMenu.style.display = 'none';
                    // Reset positions for next open
                    gsap.set([containerTop, containerMiddle, containerBottom], {
                        xPercent: 105,
                        yPercent: 0,
                        rotation: 0
                    });
                    isMenuOpen = false;
                    isAnimating = false;
                }
            });
            
            closeMenu.to(containerTop, { 
                xPercent: 0,
                yPercent: 300,
                rotation: 20,
                duration: 1,
                ease: "power2.inOut",
            })
            .to(containerMiddle, {
                xPercent: 0,
                yPercent: 250,
                rotation: 10,
                duration: 1,
                ease: "power2.inOut",
            }, '<0.1')
            .to(containerBottom, {
                xPercent: 0,
                yPercent: 200,
                rotation: -20,
                duration: 1,
                ease: "power2.inOut",
            }, '<0.1')
            .to(navMenu, {
                opacity: 0,
                duration: 0.3
            });
        }
    }
    
    // Only add event listener if the button exists
    if (menuButton) {
        menuButton.addEventListener('click', toggleMenu);
    }

    // Add scroll trigger
    
});
