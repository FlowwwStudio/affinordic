// GSAP Animation Module
class GSAPAnimations {
    constructor() {
        this.init();
    }

    init() {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger, SplitText);

        // Initialize animations
        this.initFadeIn();
        this.initSlideUp();
        this.initSplitText();
    }

    // Helper method to get data attributes with defaults
    getDataAttributes(element, defaults) {
        const attrs = {};
        for (const [key, defaultValue] of Object.entries(defaults)) {
            const value = element.dataset[key];
            attrs[key] = value !== undefined ? value : defaultValue;
        }
        return attrs;
    }

    // Fade-in animation
    initFadeIn() {
        const elements = document.querySelectorAll('[data-animation="fade"]');
        
        elements.forEach(element => {
            const { stagger = 0.1, duration = .3, delay = 0 } = this.getDataAttributes(element, {
                stagger: 0.1,
                duration: .3,
                delay: 0
            });

            gsap.from(element, {
                opacity: 0,
                duration: parseFloat(duration),
                delay: parseFloat(delay),
                stagger: parseFloat(stagger),
                scrollTrigger: {
                    trigger: element,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }

    // Slide-up + fade animation
    initSlideUp() {
        const elements = document.querySelectorAll('[data-animation="slide-up"]');
        
        elements.forEach(element => {
            const { stagger = 0.1, duration = .3, delay = 0, distance = "80%" } = this.getDataAttributes(element, {
                stagger: 0.1,
                duration: .3,
                delay: 0,
                distance: "80%"
            });

            gsap.from(element, {
                y: distance,
                opacity: 0,
                duration: parseFloat(duration),
                delay: parseFloat(delay),
                stagger: parseFloat(stagger),
                scrollTrigger: {
                    trigger: element,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }

    // SplitText animation
    initSplitText() {
        const elements = document.querySelectorAll('[data-animation="split-text"]');
        
        elements.forEach(element => {
            const { split = "words", stagger = 0.15, duration = .5, delay = 0 } = this.getDataAttributes(element, {
                split: "words",
                stagger: 0.15,
                duration: .5,
                delay: 0
            });

            // Create SplitText instance
            const splitText = new SplitText(element, {
                type: split
            });

            // Animate the split elements
            gsap.from(splitText[split], {
                y: "100%",
                opacity: 0,
                duration: parseFloat(duration),
                delay: parseFloat(delay),
                stagger: parseFloat(stagger),
                scrollTrigger: {
                    trigger: element,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }
}

// Initialize the animations when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GSAPAnimations();
}); 