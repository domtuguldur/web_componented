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
                    <li><a href="#home">Нүүр</a></li>
                    <li><a href="#comingsoon">Удахгүй гарах</a></li>
                    <li><a href="#movies">Кино</a></li>
                    <li><a href="#series">Цуврал</a></li>
                    <li><a href="#top">Шилдэг</a></li>
                </ul>
            </nav>
            <div class="header-buttons">
                <button class="btn-primary">Захиала</button>
                <button class="btn-secondary" id="loginBtn">Нэвтрэх</button>
            </div>
        `;

        // Add event listener to login button
        header.querySelector('#loginBtn').addEventListener('click', () => {
            window.loginModal.open();
        });

        return header;
    }

    render() {
        return this.element;
    }
}