// Main Application
class App {
    constructor() {
        this.root = document.getElementById('root');
        this.components = [];
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
        
        // Append all components
        this.components.forEach(component => {
            this.root.appendChild(component.render());
        });
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
});