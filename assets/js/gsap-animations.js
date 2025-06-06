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

    let lastWindowWidth = window.innerWidth;

    // Initialize animations
    function initAnimations() {
        // Fade-in animations
        document.querySelectorAll('[fade-in]').forEach(element => {
            const duration = element.dataset.duration || defaults.fade.duration;
            let delay = element.dataset.delay || defaults.fade.delay;
            const stagger = element.dataset.stagger || defaults.fade.stagger;
            if (window.innerWidth < 479) {
                delay = defaults.fade.delay;
            }

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
            let delay = element.dataset.delay || defaults.slideUp.delay;
            const stagger = element.dataset.stagger || defaults.slideUp.stagger;
            const distance = element.dataset.distance || defaults.slideUp.distance;
            if (window.innerWidth < 479) {
                delay = defaults.slideUp.delay;
            }

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
            let delay = element.dataset.delay || defaults.splitText.delay;
            const stagger = element.dataset.stagger || defaults.splitText.stagger;
            if (window.innerWidth < 479) {
                delay = defaults.splitText.delay;
            }

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

    // Function to refresh only split-text animations on resize
    function refreshSplitTextAnimations() {
        document.querySelectorAll('[split-text]').forEach(element => {
            // Determine split type
            let splitType = 'lines';
            if (element.hasAttribute('split-char')) splitType = 'chars';
            else if (element.hasAttribute('split-word')) splitType = 'words';

            // Revert previous split if exists
            if (splitTextInstances.has(element)) {
                splitTextInstances.get(element).revert();
            }

            // Kill ScrollTriggers for this element
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === element) trigger.kill();
            });
            // Kill tweens for this element
            gsap.killTweensOf(element);

            // Re-split
            const split = new SplitText(element, { type: splitType });
            splitTextInstances.set(element, split);

            // Re-animate
            const duration = element.dataset.duration || defaults.splitText.duration;
            const delay = element.dataset.delay || defaults.splitText.delay;
            const stagger = element.dataset.stagger || defaults.splitText.stagger;

            gsap.from(split[splitType], {
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
        ScrollTrigger.refresh();
    }

    // Refresh only split-text animations on page resize (only if width changes)
    window.addEventListener('resize', () => {
        if (window.innerWidth !== lastWindowWidth) {
            lastWindowWidth = window.innerWidth;
            refreshSplitTextAnimations();
        }
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