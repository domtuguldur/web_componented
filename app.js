// Main Application
class App {
    constructor() {
        this.root = document.getElementById('root');
        this.components = [];
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
        
        // Append all components
        this.components.forEach(component => {
            this.root.appendChild(component.render());
        });
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});