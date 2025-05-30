// ===============================
// Intersection Observer Animations
// ===============================
const handleIntersect = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            if (el.classList.contains('animate-fadeIn')) {
                el.classList.add('animate', 'fadeInUp');
            } else if (el.classList.contains('animate-fadeInRight')) {
                el.classList.add('animate', 'fadeInRight');
            } else if (el.classList.contains('animate-fadeInLeft')) {
                el.classList.add('animate', 'fadeInLeft');
            }
            el.classList.add('visible');
            observer.unobserve(el);
        }
    });
};

const observer = new IntersectionObserver(handleIntersect, {
    threshold: 0.2
});

document.querySelectorAll('.animate-fadeIn, .animate-fadeInRight, .animate-fadeInLeft').forEach(el => {
    observer.observe(el);
});

// ===============================
// Lottie Animation
// ===============================
lottie.loadAnimation({
    container: document.getElementById("lottie-animation"),
    renderer: "svg",
    loop: false,
    autoplay: true,
    path: "resource/Scripts/dashboard-animate.json"
});

// ===============================
// Carousel Curve Testimonials
// ===============================
document.addEventListener('DOMContentLoaded', function () {
    let currentCardIndex = 0;
    const cards = document.querySelectorAll('.we-card');
    const totalCards = cards.length;
    const carouselClasses = ['active', 'prev-1', 'next-1', 'prev-2', 'next-2', 'prev-3', 'next-3'];

    const updateCarousel = () => {
        cards.forEach(card => {
            carouselClasses.forEach(cls => card.classList.remove(cls));
        });

        const getIndex = offset => (currentCardIndex + offset + totalCards) % totalCards;

        cards[currentCardIndex].classList.add('active');
        cards[getIndex(-1)].classList.add('prev-1');
        cards[getIndex(1)].classList.add('next-1');
        cards[getIndex(-2)].classList.add('prev-2');
        cards[getIndex(2)].classList.add('next-2');
        cards[getIndex(-3)].classList.add('prev-3');
        cards[getIndex(3)].classList.add('next-3');
    };

    const autoPlay = () => {
        currentCardIndex = (currentCardIndex + 1) % totalCards;
        updateCarousel();
    };

    updateCarousel();
    setInterval(autoPlay, 5000);
});

// ===============================
// Tab Slide with Progress Bar
// ===============================
document.addEventListener("DOMContentLoaded", function () {
    const tabSlide = document.querySelector('#tabSlide');
    if (!tabSlide) return;

    const tabs = tabSlide.querySelectorAll('[data-bs-toggle="pill"]');
    const progressBars = tabSlide.querySelectorAll('.progress-bar');
    let currentIndex = 0;
    const interval = 20000;
    let timer;

    progressBars.forEach(bar => {
        bar.style.transition = `width ${interval}ms linear`;
    });

    const resetProgressBars = () => {
        progressBars.forEach(bar => {
            bar.style.transition = "none";
            bar.style.width = "0%";
            void bar.offsetWidth; // trigger reflow
            bar.style.transition = `width ${interval}ms linear`;
        });
    };

    const activateTab = (index) => {
        if (tabs[index].classList.contains("active")) return;

        const tabTrigger = new bootstrap.Tab(tabs[index]);
        tabTrigger.show();

        resetProgressBars();
        const currentProgressBar = tabs[index].querySelector('.progress-bar');
        if (currentProgressBar) {
            currentProgressBar.style.width = "100%";
        }

        currentIndex = index;
    };

    const startTabLoop = () => {
        resetProgressBars();
        const currentProgressBar = tabs[currentIndex].querySelector('.progress-bar');
        if (currentProgressBar) {
            currentProgressBar.style.width = "100%";
        }

        timer = setInterval(() => {
            currentIndex = (currentIndex + 1) % tabs.length;
            activateTab(currentIndex);
        }, interval);
    };

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            clearInterval(timer);
            resetProgressBars();

            const currentProgressBar = tab.querySelector('.progress-bar');
            if (currentProgressBar) {
                currentProgressBar.style.width = "100%";
            }

            currentIndex = index;
            startTabLoop();
        });
    });

    startTabLoop();
});

// ===============================
// Infinite Logos Slide
// ===============================
const trackInner = document.querySelector('.logo-track-inner');
if (trackInner) {
    const originalTrack = trackInner.querySelector('.logo-track');
    const clone = originalTrack.cloneNode(true);
    trackInner.appendChild(clone);
}
