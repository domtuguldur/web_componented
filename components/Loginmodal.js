// LoginModal Component
class LoginModal {
    constructor() {
        this.element = this.createElement();
        this.overlay = null;
        this.modal = null;
        this.setupModal();
        
        // Make this globally accessible
        window.loginModal = this;
    }

    createElement() {
        const container = document.createElement('div');
        
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.id = 'modalOverlay';
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'login-modal';
        modal.id = 'loginModal';
        
        modal.innerHTML = `
            <div class="modal-header">
                <h1>log in to your account</h1>
                <button class="closebtn">✕</button>
            </div>
            
            <div class="modal-body">
                <form action="/submit_login" method="post">
                    <div class="formgroup">
                        <input type="email" id="email" name="email" placeholder="Email" required>
                    </div>
                    
                    <div class="formgroup">
                        <input type="password" id="password" name="password" placeholder="Password" required>
                    </div>
                    
                    <div class="rememberrow">
                        <div class="remembergroup">
                            <input type="checkbox" id="remember" name="remember">
                            <label for="remember">Remember me</label>
                        </div>
                        <a href="#" class="forgotlink">Forgot password?</a>
                    </div>
                    
                    <button type="submit" class="loginbtn">Log In</button>

                    <div class="join">
                        <p class="jointxt">wanna join DOM?</p>
                        <button type="button" class="joiinbtn">Join</button>
                    </div>
                </form>
            </div>
        `;
        
        container.appendChild(overlay);
        container.appendChild(modal);
        
        return container;
    }

    setupModal() {
        // Get references after DOM is loaded
        setTimeout(() => {
            this.overlay = document.getElementById('modalOverlay');
            this.modal = document.getElementById('loginModal');
            
            // Add event listeners
            this.overlay.addEventListener('click', () => this.close());
            
            const closeBtn = this.modal.querySelector('.closebtn');
            closeBtn.addEventListener('click', () => this.close());
            
            const forgotLink = this.modal.querySelector('.forgotlink');
            forgotLink.addEventListener('click', (e) => {
                e.preventDefault();
                alert('Forgot password');
            });
            
            // Prevent modal from closing when clicking inside
            this.modal.addEventListener('click', (e) => {
                e.stopPropagation();
            });
            
            // Form submission
            const form = this.modal.querySelector('form');
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Login functionality would be implemented here');
            });
            
            // ESC key to close
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.close();
                }
            });
        }, 0);
    }

    open() {
        if (this.modal && this.overlay) {
            this.modal.classList.add('active');
            this.overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    close() {
        if (this.modal && this.overlay) {
            this.modal.classList.remove('active');
            this.overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    render() {
        return this.element;
    }
}