// GSAP Animation System
document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, SplitText);

    // Default animation settings
    const defaults = {
        fade: {
            duration: .3,
            delay: 0,
            stagger: 0.1
        },
        slideUp: {
            duration: .3,
            delay: 0,
            stagger: 0.1,
            distance: '80%'
        },
        splitText: {
            duration: 0.5,
            delay: 0,
            stagger: 0.15
        }
    };

    // Initialize animations
    function initAnimations() {
        // Fade-in animations
        document.querySelectorAll('[data-animation="fade"]').forEach(element => {
            const duration = element.dataset.duration || defaults.fade.duration;
            const delay = element.dataset.delay || defaults.fade.delay;
            const stagger = element.dataset.stagger || defaults.fade.stagger;

            gsap.from(element, {
                opacity: 0,
                duration: parseFloat(duration),
                delay: parseFloat(delay),
                stagger: parseFloat(stagger),
                scrollTrigger: {
                    trigger: element,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Slide-up + fade animations
        document.querySelectorAll('[data-animation="slide-up"]').forEach(element => {
            const duration = element.dataset.duration || defaults.slideUp.duration;
            const delay = element.dataset.delay || defaults.slideUp.delay;
            const stagger = element.dataset.stagger || defaults.slideUp.stagger;
            const distance = element.dataset.distance || defaults.slideUp.distance;

            gsap.from(element, {
                opacity: 0,
                y: distance,
                duration: parseFloat(duration),
                delay: parseFloat(delay),
                stagger: parseFloat(stagger),
                scrollTrigger: {
                    trigger: element,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // SplitText animations
        document.querySelectorAll('[data-animation="split-text"]').forEach(element => {
            const splitType = element.dataset.split || 'words';
            const duration = element.dataset.duration || defaults.splitText.duration;
            const delay = element.dataset.delay || defaults.splitText.delay;
            const stagger = element.dataset.stagger || defaults.splitText.stagger;

            // Create SplitText instance
            const split = new SplitText(element, {
                type: splitType
            });

            // Animate the split elements
            gsap.from(split[splitType], {
                opacity: 0,
                y: '100%',
                duration: parseFloat(duration),
                delay: parseFloat(delay),
                stagger: parseFloat(stagger),
                scrollTrigger: {
                    trigger: element,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    }

    // Initialize animations
    initAnimations();

    // Refresh ScrollTrigger on page resize
    window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
    });
}); 