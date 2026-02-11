// Navigation JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navbarMenu = document.getElementById('navbarMenu');

    if (menuToggle && navbarMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        });
    }

    // Mobile Dropdown Toggle
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');

        if (toggle) {
            toggle.addEventListener('click', function(e) {
                // Only handle click on mobile
                if (window.innerWidth <= 767) {
                    e.stopPropagation();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar') && navbarMenu && navbarMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navbarMenu.classList.remove('active');
        }
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.navbar-menu a:not(.dropdown-toggle)');

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 767 && menuToggle && navbarMenu) {
                menuToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
            }
        });
    });

    // Highlight active page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navMenuLinks = document.querySelectorAll('.navbar-menu > a');

    navMenuLinks.forEach(link => {
        const linkPage = link.getAttribute('href');

        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Add sticky navbar on scroll
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Add shadow when scrolled
        if (currentScroll > 0) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
});
