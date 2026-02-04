// HighlightSection Component
class HighlightSection {
    constructor() {
        this.movies = [
            {
                id: 'slide1',
                title: 'The Batman',
                description: 'In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a killer known as the Riddler.',
                image: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1200&h=675&fit=crop',
                trailer: 'https://www.youtube.com/watch?v=zL4LFSbFPcw'
            },
            {
                id: 'slide2',
                title: 'Spider-Man: No Way Home',
                description: 'Peter Parker is unmasked and can no longer separate his normal life from the high-stakes of being a superhero. When he asks for help from Doctor Strange, the stakes become even more dangerous.',
                image: 'https://i.redd.it/7fu1vtxseg681.jpg',
                trailer: 'https://www.youtube.com/watch?v=JfVOs4VSpmA'
            },
            {
                id: 'slide3',
                title: 'Avengers: Endgame',
                description: 'After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more to reverse Thanos\' actions and restore balance.',
                image: 'https://www.hdwallpapers.in/download/avengers_endgame_2019-HD.jpg',
                trailer: 'https://www.youtube.com/watch?v=TcMBFSGVi1c'
            }
        ];
        
        this.element = this.createElement();
    }

    createElement() {
        const section = document.createElement('div');
        section.className = 'highlight-section';
        
        const sliderWrapper = document.createElement('div');
        sliderWrapper.className = 'slider-wrapper';
        
        const slider = document.createElement('div');
        slider.className = 'slider';
        slider.id = 'movieSlider';
        
        // Create movie slides
        this.movies.forEach(movie => {
            slider.appendChild(this.createMovieSlide(movie));
        });
        
        // Create navigation dots
        const sliderNav = document.createElement('div');
        sliderNav.className = 'slider-nav';
        
        this.movies.forEach(movie => {
            const navLink = document.createElement('a');
            navLink.href = `#${movie.id}`;
            navLink.textContent = `Slide ${movie.id.replace('slide', '')}`;
            sliderNav.appendChild(navLink);
        });
        
        sliderWrapper.appendChild(slider);
        sliderWrapper.appendChild(sliderNav);
        section.appendChild(sliderWrapper);
        
        return section;
    }

    createMovieSlide(movie) {
        const slide = document.createElement('div');
        slide.className = 'movie-feature';
        slide.id = movie.id;
        
        slide.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}">
            <div class="movie-info">
                <button class="btn-secondary" onclick="window.open('${movie.trailer}', '_blank')">▶ Watch Trailer</button>
                <h2>${movie.title}</h2>
                <p>${movie.description}</p>
                <button class="booking">Book Now</button>
            </div>
        `;
        
        // Add booking event listener
        slide.querySelector('.booking').addEventListener('click', () => {
            alert(`Захиалга: ${movie.title}`);
        });
        
        return slide;
    }

    render() {
        return this.element;
    }
}