// Header Component
class Header {
    constructor() {
        this.element = this.createElement();
    }

    createElement() {
        const header = document.createElement('header');
        header.className = 'header';
        header.innerHTML = `
            <div class="logo">Dom</div>
            <nav>
                <ul>
                    <li>
                    <a href="#home" data-view="home">Нүүр</a>
                    </li>
                    <li>
                    <a href="#comingsoon" data-view="comingSoon">Удахгүй гарах</a>
                    </li>
                    <li>
                    <a href="#movies" data-view="movies">Кино</a>
                    </li>
                    <li>
                    <a href="#series" data-view="series">Цуврал</a>
                    </li>
                    <li>
                    <a href="#top" data-view="top">Шилдэг</a>
                    </li>
                </ul>
            </nav>
            <div class="header-buttons">
                <button class="btn-primary">Захиала</button>
                <button class="btn-secondary" id="loginBtn">Нэвтрэх</button>
            </div>
        `;

        // Add event listeners
        this.addEventListeners(header);

        return header;
    }

    addEventListeners(header) {
        // Handle login button click
        header.querySelector('#loginBtn').addEventListener('click', () => {
            window.loginModal.open();
        });

        // Handle navigation link clicks
        const navLinks = header.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent the default anchor behavior
                const view = link.getAttribute('data-view');
                this.handleNavigation(view);
            });
        });
    }

    handleNavigation(view) {
        if (window.app) {
            // Log current view
            console.log(`Navigated to: ${view}`);
            
            // Highlight the active link
            this.highlightActiveLink(view);

            // Switch to the appropriate view
            switch (view) {
                case 'home':
                    window.app.showHome();
                    break;
                case 'comingSoon':
                    window.app.showComingSoon();
                    break;
                default:
                    alert(`Navigation to "${view}" is not yet implemented.`);
                    break;
            }
        } else {
            console.error('App instance not found!');
        }
    }

    highlightActiveLink(view) {
        // Clear active class from all links
        const navLinks = this.element.querySelectorAll('nav a');
        navLinks.forEach(link => link.classList.remove('active'));

        // Add active class to the current link
        const activeLink = this.element.querySelector(`nav a[data-view="${view}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    render() {
        return this.element;
    }
}