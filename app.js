// Main Application
class App {
    constructor() {
        this.root = document.getElementById('root');
        this.components = [];
        this.currentView = 'home'; // Track current view: 'home' or 'detail'
        this.movieDetail = new MovieDetail();
        this.init();
    }

    init() {
        // Create all components
        this.components = [
            new Header(),
            new HighlightSection(),
            new MoviePosters(),
            new LoginModal(),
            new Footer()
        ];

        // Render all components
        this.render();
    }

    render() {
        // Clear root
        this.root.innerHTML = '';
        
        if (this.currentView === 'home') {
            // Append all components for home view
            this.components.forEach(component => {
                this.root.appendChild(component.render());
            });
        } else if (this.currentView === 'detail') {
            // Show movie detail view
            this.root.appendChild(this.movieDetail.render());
        }
    }

    // Navigate to movie detail view
    showMovieDetail(movieData) {
        this.currentView = 'detail';
        this.movieDetail.setMovie(movieData);
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