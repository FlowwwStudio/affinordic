// GSAP Animation System
document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, SplitText);

    // Default animation settings
    const defaults = {
        fade: {
            duration: .5,
            delay: 0,
            stagger: 0.1
        },
        slideUp: {
            duration: .3,
            delay: 0,
            stagger: 0.1,
            distance: '50px'
        },
        splitText: {
            duration: 0.4,
            delay: 0,
            stagger: 0.1
        }
    };

    // Store SplitText instances for cleanup on resize
    const splitTextElements = [];
    const splitTextInstances = new Map();

    // Initialize animations
    function initAnimations() {
        // Fade-in animations
        document.querySelectorAll('[fade-in]').forEach(element => {
            const duration = element.dataset.duration || defaults.fade.duration;
            const delay = element.dataset.delay || defaults.fade.delay;
            const stagger = element.dataset.stagger || defaults.fade.stagger;

            gsap.from(element, 
                {   
                    opacity: 0,
                    duration: parseFloat(duration),
                    delay: parseFloat(delay),
                    stagger: parseFloat(stagger),
                    scrollTrigger: {
                    trigger: element,
                    start: 'top 90%',
                    toggleActions: 'play none none pause'
                }
            });
        });

        // Slide-up + fade animations
        document.querySelectorAll('[slide-up]').forEach(element => {
            const duration = element.dataset.duration || defaults.slideUp.duration;
            const delay = element.dataset.delay || defaults.slideUp.delay;
            const stagger = element.dataset.stagger || defaults.slideUp.stagger;
            const distance = element.dataset.distance || defaults.slideUp.distance;

            gsap.from(element, 
                {
                    opacity: 0,
                    y: distance,
                    ease: 'power1.out',
                    duration: parseFloat(duration),
                    delay: parseFloat(delay),
                    stagger: parseFloat(stagger),
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 90%',
                        toggleActions: 'play none none pause'
                    }
            });
        });

        // SplitText animations
        document.querySelectorAll('[split-text]').forEach(element => {
            // Determine split type based on attributes
            let splitType = 'lines'; // default
            if (element.hasAttribute('split-char')) splitType = 'chars';
            else if (element.hasAttribute('split-word')) splitType = 'words';

            const duration = element.dataset.duration || defaults.splitText.duration;
            const delay = element.dataset.delay || defaults.splitText.delay;
            const stagger = element.dataset.stagger || defaults.splitText.stagger;

            // If already split, revert before splitting again
            if (splitTextInstances.has(element)) {
                splitTextInstances.get(element).revert();
            }

            // Create SplitText instance
            const split = new SplitText(element, {
                type: splitType
            });
            splitTextInstances.set(element, split);
            splitTextElements.push(element);

            // Animate the split elements
            gsap.from(split[splitType], 
                {
                    opacity: 0,
                    yPercent: 100,
                    ease: 'power1.out',
                    duration: parseFloat(duration),
                    delay: parseFloat(delay),
                    stagger: parseFloat(stagger),
                    scrollTrigger: {
                    trigger: element,
                    start: 'top 90%',
                    toggleActions: 'play none none pause'
                }
            });
        });
    }

    // Initialize animations
    initAnimations();

    // Refresh ScrollTrigger and re-split SplitText on page resize
    window.addEventListener('resize', () => {
        // Revert all SplitText instances
        splitTextInstances.forEach((split, element) => {
            split.revert();
        });
        splitTextInstances.clear();
        // Re-initialize animations (including SplitText)
        initAnimations();
        ScrollTrigger.refresh();
    });
    
    // Image scroll animation
    const imageScroll = document.querySelectorAll('[img-scale]');
    imageScroll.forEach(image => {
        gsap.from(image, {
            scale: 1.1,
            scrollTrigger: {
                trigger: image,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });
}); 