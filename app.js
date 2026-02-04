// Main Application
class App {
    constructor() {
        this.root = document.getElementById('root');
        this.components = [];
        this.currentView = 'home'; 
        this.movieDetail = new MovieDetail();
        this.header = new Header(); 
        this.upcomingSlider = new UpcomingSlider(); 
        this.footer = new Footer();
        this.highlightSection = new HighlightSection(); 
        this.init();
    }

    init() {
        // Create all components for "home" view
        this.components = [
            this.header,
            this.highlightSection,
            new MoviePosters(),
            new LoginModal(),
            this.footer
        ];

        // Render initial view
        this.render();
    }

    render() {
        // Clear root
        this.root.innerHTML = '';

        if (this.currentView === 'home') {
            // Append components for "home" view
            this.components.forEach(component => {
                this.root.appendChild(component.render());
            });
        } else if (this.currentView === 'detail') {
            // Show movie detail view with Header and Footer
            this.root.appendChild(this.header.render());
            this.root.appendChild(this.movieDetail.render());
            this.root.appendChild(this.footer.render());
        } else if (this.currentView === 'comingSoon') {
            // Render "Coming Soon" view
            const comingSoonDiv = document.createElement('div');
            comingSoonDiv.className = 'coming-soon-section';
            comingSoonDiv.innerHTML = `
                <h2>Coming Soon</h2>
                <p>Stay tuned for exciting movies and shows that are on their way!</p>
            `;

            // Append Header, UpcomingSlider, and Footer
            this.root.appendChild(this.header.render());
            this.root.appendChild(this.upcomingSlider.render()); // Fixed to lowercase "u"
            this.root.appendChild(this.footer.render());
        }
    }

    // Navigate to movie detail view
    showMovieDetail(movieData) {
        this.currentView = 'detail';
        this.movieDetail.setMovie(movieData);
        this.render();
        window.scrollTo(0, 0);
    }

    // Navigate to coming soon view
    showComingSoon() {
        this.currentView = 'comingSoon';
        this.render();
        window.scrollTo(0, 0);
    }

    // Navigate back to home view
    showHome() {
        this.currentView = 'home';
        this.render();
        window.scrollTo(0, 0);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});