// Scroll Spy - Highlights active TOC link based on scroll position
(function () {
    const tocLinks = document.querySelectorAll('.toc-list a');
    if (!tocLinks.length) return;

    // Get section IDs from TOC links
    const sectionIds = Array.from(tocLinks).map(link => link.getAttribute('href').replace('#', ''));

    // Offset for fixed navbar
    const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '70', 10);
    const offset = navHeight + 40;

    function updateActiveLink() {
        const scrollY = window.scrollY;
        let currentSection = sectionIds[0];

        for (const id of sectionIds) {
            const section = document.getElementById(id);
            if (!section) continue;

            const sectionTop = section.offsetTop - offset;
            if (scrollY >= sectionTop) {
                currentSection = id;
            }
        }

        tocLinks.forEach(link => {
            const href = link.getAttribute('href').replace('#', '');
            if (href === currentSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Throttle scroll events for performance
    let ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                updateActiveLink();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Run on load
    updateActiveLink();
})();
