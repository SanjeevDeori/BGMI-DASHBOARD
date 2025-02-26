// Initialize Lucide icons
lucide.createIcons();

// Sample match data
const matches = [
    {
        map: 'Erangel',
        result: 'Victory',
        kills: 11,
        rank: '#1',
        time: '32min ago'
    },
    {
        map: 'Miramar',
        result: 'Defeat',
        kills: 9,
        rank: '#4',
        time: '28min ago'
    },
    {
        map: 'Sanhok',
        result: 'Victory',
        kills: 12,
        rank: '#1',
        time: '25min ago'
    },
    {
        map: 'Vikendi',
        result: 'Defeat',
        kills: 3,
        rank: '#12',
        time: '45min ago'
    }
];

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Populate match history
    const matchesList = document.querySelector('.matches-list');

    matches.forEach(match => {
        const matchElement = document.createElement('div');
        matchElement.className = 'match-item';
        matchElement.innerHTML = `
            <div class="match-info">
                <div class="match-result ${match.result.toLowerCase()}">${match.result}</div>
                <div>
                    <h4>${match.map}</h4>
                    <span class="text-secondary">${match.time}</span>
                </div>
            </div>
            <div class="match-stats">
                <div class="stat">
                    <div class="stat-label">Kills</div>
                    <div class="stat-value">${match.kills}</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Rank</div>
                    <div class="stat-value">${match.rank}</div>
                </div>
            </div>
        `;
        matchesList.appendChild(matchElement);
    });

    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    let isDarkMode = false;

    themeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        document.documentElement.style.setProperty('--background-color', isDarkMode ? '#1f2937' : '#f3f4f6');
        document.documentElement.style.setProperty('--card-background', isDarkMode ? '#111827' : '#ffffff');
        document.documentElement.style.setProperty('--text-primary', isDarkMode ? '#f9fafb' : '#1f2937');
        document.documentElement.style.setProperty('--text-secondary', isDarkMode ? '#9ca3af' : '#6b7280');
        document.documentElement.style.setProperty('--border-color', isDarkMode ? '#374151' : '#e5e7eb');
        
        // Update icon
        themeToggle.innerHTML = `<i data-lucide="${isDarkMode ? 'sun' : 'moon'}"></i>`;
        lucide.createIcons();
    });

    // Mobile menu functionality
    let isMobileMenuOpen = false;
    const sidebar = document.querySelector('.sidebar');

    // Create mobile menu button
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-btn';
    menuButton.innerHTML = '<i data-lucide="menu"></i>';
    menuButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        background: var(--primary-color);
        border: none;
        border-radius: 50%;
        width: 48px;
        height: 48px;
        display: none;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;

    document.body.appendChild(menuButton);
    lucide.createIcons();

    // Show/hide menu button based on screen size
    const updateMenuButtonVisibility = () => {
        menuButton.style.display = window.innerWidth <= 768 ? 'flex' : 'none';
    };

    window.addEventListener('resize', updateMenuButtonVisibility);
    updateMenuButtonVisibility();

    // Toggle mobile menu
    menuButton.addEventListener('click', () => {
        isMobileMenuOpen = !isMobileMenuOpen;
        sidebar.classList.toggle('active');
        menuButton.innerHTML = `<i data-lucide="${isMobileMenuOpen ? 'x' : 'menu'}"></i>`;
        lucide.createIcons();
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMobileMenuOpen && !sidebar.contains(e.target) && !menuButton.contains(e.target)) {
            isMobileMenuOpen = false;
            sidebar.classList.remove('active');
            menuButton.innerHTML = '<i data-lucide="menu"></i>';
            lucide.createIcons();
        }
    });

    // Add hover animations to stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Animate progress bars on load
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
});