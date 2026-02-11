// Comparison Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Filter buttons functionality
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterType = this.getAttribute('data-filter');

            // Remove active class from all buttons in the same group
            const group = this.parentElement;
            group.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            // Add active class to clicked button
            this.classList.add('active');

            // Apply filter based on type
            if (filterType) {
                applyFilter(filterType);
            }
        });
    });

    // Toggle switches for showing/hiding sections
    const toggleSwitches = document.querySelectorAll('.toggle-switch input[type="checkbox"]');

    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const toggleType = this.getAttribute('data-toggle');

            if (toggleType === 'highlight-diff') {
                toggleHighlightDifferences(this.checked);
            }
        });
    });

    // Country visibility toggles
    const countryToggles = document.querySelectorAll('[data-country-toggle]');

    countryToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const country = this.getAttribute('data-country-toggle');
            toggleCountryColumn(country, this.checked);
        });
    });

    // Filter function
    function applyFilter(filterType) {
        const rows = document.querySelectorAll('.comparison-table-main tbody tr:not(.category-header)');

        rows.forEach(row => {
            // Show all rows first
            row.style.display = '';

            // Apply specific filter
            if (filterType === 'all') {
                row.style.display = '';
            } else if (filterType === 'tax') {
                const category = row.getAttribute('data-category');
                if (category !== 'taxation') {
                    row.style.display = 'none';
                }
            } else if (filterType === 'cost') {
                const category = row.getAttribute('data-category');
                if (category !== 'costs') {
                    row.style.display = 'none';
                }
            } else if (filterType === 'setup') {
                const category = row.getAttribute('data-category');
                if (category !== 'timeline' && category !== 'requirements') {
                    row.style.display = 'none';
                }
            }
        });

        // Show/hide category headers
        const categoryHeaders = document.querySelectorAll('.category-header');
        categoryHeaders.forEach(header => {
            const category = header.getAttribute('data-category');

            if (filterType === 'all') {
                header.style.display = '';
            } else if (filterType === 'tax' && category !== 'taxation') {
                header.style.display = 'none';
            } else if (filterType === 'cost' && category !== 'costs') {
                header.style.display = 'none';
            } else if (filterType === 'setup' && category !== 'timeline' && category !== 'requirements') {
                header.style.display = 'none';
            }
        });
    }

    // Highlight differences function
    function toggleHighlightDifferences(enabled) {
        const rows = document.querySelectorAll('.comparison-table-main tbody tr:not(.category-header)');

        rows.forEach(row => {
            const cells = row.querySelectorAll('td:not(:first-child)');
            const values = Array.from(cells).map(cell => cell.textContent.trim());

            // Check if all values are the same
            const allSame = values.every(val => val === values[0]);

            if (enabled && !allSame) {
                row.style.background = 'var(--accent-light)';
            } else {
                row.style.background = '';
            }
        });
    }

    // Toggle country column visibility
    function toggleCountryColumn(country, visible) {
        const table = document.querySelector('.comparison-table-main');
        if (!table) return;

        // Find column index
        const headers = table.querySelectorAll('thead th');
        let columnIndex = -1;

        headers.forEach((header, index) => {
            if (header.getAttribute('data-country') === country) {
                columnIndex = index;
            }
        });

        if (columnIndex === -1) return;

        // Toggle header visibility
        headers[columnIndex].style.display = visible ? '' : 'none';

        // Toggle all cells in that column
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells[columnIndex]) {
                cells[columnIndex].style.display = visible ? '' : 'none';
            }
        });
    }

    // Mobile accordion for country cards
    const mobileCountryHeaders = document.querySelectorAll('.mobile-country-header');

    mobileCountryHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const card = this.closest('.mobile-country-card');
            card.classList.toggle('expanded');
        });
    });

    // Export comparison (future feature)
    const exportBtn = document.getElementById('exportComparison');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            alert('Export feature coming soon! You can print this page using Ctrl+P or Cmd+P.');
            window.print();
        });
    }

    // Initialize with default filter (all)
    const defaultFilter = document.querySelector('.filter-btn[data-filter="all"]');
    if (defaultFilter) {
        defaultFilter.classList.add('active');
    }
});
