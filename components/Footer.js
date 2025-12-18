// Footer Component
class Footer {
    constructor() {
        this.element = this.createElement();
    }

    createElement() {
        const footer = document.createElement('footer');
        
        footer.innerHTML = `
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Get In Touch</h3>
                    <ul>
                        <li><a href="#">FAQs</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Feedback</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>About Us</h3>
                    <ul>
                        <li><a href="#">Our Story</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Gift Cards</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Legal</h3>
                    <ul>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms & Conditions</a></li>
                        <li><a href="#">Cookie Policy</a></li>
                    </ul>
                </div>
            </div>
        `;
        
        return footer;
    }

    render() {
        return this.element;
    }
}