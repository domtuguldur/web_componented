// MovieDetail Component
class MovieDetail {
    constructor() {
        this.movieData = null;
        this.element = null;
    }

    // Set movie data and update display
    setMovie(movieData) {
        this.movieData = movieData;
        this.element = this.createElement();
    }

    createElement() {
        if (!this.movieData) {
            return document.createElement('div');
        }

        const container = document.createElement('div');
        container.className = 'movie-detail-container';
        
        container.innerHTML = `
            <div class="movie-detail">
                <button class="back-button" id="backBtn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    Back to Movies
                </button>
                
                <div class="movie-detail-content">
                    <div class="movie-detail-poster">
                        <img src="${this.movieData.image}" alt="${this.movieData.title}">
                    </div>
                    
                    <div class="movie-detail-info">
                        <h1 class="movie-detail-title">${this.movieData.title}</h1>
                        
                        <div class="movie-detail-meta">
                            <span class="meta-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 17.3 6.16 20l1.02-5.94L2.5 10.9l5.98-.87L12 4.5l3.52 5.53 5.98.87-4.68 3.16L17.84 20z"/>
                                </svg>
                                ${this.movieData.rating}/5
                            </span>
                            <span class="meta-item">${this.movieData.year}</span>
                            <span class="meta-item">${this.movieData.duration}</span>
                            <span class="meta-item score-badge">${this.movieData.score}% Score</span>
                        </div>
                        
                        <div class="movie-detail-genre">
                            <strong>Genre:</strong> ${this.movieData.genre}
                        </div>
                        
                        <div class="movie-detail-description">
                            <h3>Synopsis</h3>
                            <p>${this.movieData.description}</p>
                        </div>
                        
                        <div class="movie-detail-price">
                            <span class="price-label">Ticket Price:</span>
                            <span class="price-value">${this.movieData.price}$</span>
                        </div>
                        
                        <button class="btn-book-now">Book Now</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add event listener for back button
        setTimeout(() => {
            const backBtn = container.querySelector('#backBtn');
            if (backBtn) {
                backBtn.addEventListener('click', () => {
                    if (window.app) {
                        window.app.showHome();
                    }
                });
            }
        }, 0);
        
        return container;
    }

    render() {
        if (!this.element) {
            this.element = this.createElement();
        }
        return this.element;
    }
}
