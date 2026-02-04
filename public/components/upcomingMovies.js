// UpcomingSlider Component
class UpcomingSlider {
    constructor() {
        this.upcomingMovies = [
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

        // Track current slide for autoplay + manual navigation
        this.currentSlideIndex = 0;
        this.sliderElement = null;

        this.element = this.createElement();
    }

    createElement() {
        const section = document.createElement('div');
        section.className = 'upcoming-slider-section';

        const sliderWrapper = document.createElement('div');
        sliderWrapper.className = 'slider-wrapper';

        const slider = document.createElement('div');
        slider.className = 'slider';
        this.sliderElement = slider;

        // Create slides
        this.upcomingMovies.forEach(movie => {
            slider.appendChild(this.createSlide(movie));
        });

        // Navigation dots
        const sliderNav = document.createElement('div');
        sliderNav.className = 'slider-nav';

        this.upcomingMovies.forEach((movie, index) => {
            const navBtn = document.createElement('button');
            navBtn.className = 'nav-dot';
            navBtn.textContent = index + 1;
            navBtn.addEventListener('click', () => {
                this.scrollToSlide(index);
            });
            sliderNav.appendChild(navBtn);
        });

        sliderWrapper.appendChild(slider);
        sliderWrapper.appendChild(sliderNav);
        section.appendChild(sliderWrapper);

        // Autoplay
        this.addAutoplay();

        return section;
    }

    createSlide(movie) {
        const slide = document.createElement('div');
        slide.className = 'slider-slide';
        slide.id = movie.id;

        slide.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}">
            <div class="movie-info">
                <h2>${movie.title}</h2>
                <p>${movie.description}</p>
                <button class="btn-secondary trailer-btn">▶ Watch Trailer</button>
                <button class="btn-primary booking">Book Now</button>
            </div>
        `;

        // Trailer button
        slide.querySelector('.trailer-btn').addEventListener('click', () => {
            window.open(movie.trailer, '_blank');
        });

        // Booking button
        slide.querySelector('.booking').addEventListener('click', () => {
            alert(`Захиалга: ${movie.title}`);
        });

        return slide;
    }

    scrollToSlide(index) {
        if (!this.sliderElement) return;

        const slides = this.sliderElement.querySelectorAll('.slider-slide');
        if (!slides.length || !slides[index]) return;

        this.currentSlideIndex = index;

        this.sliderElement.scrollTo({
            top: 0,
            left: slides[index].offsetLeft,
            behavior: 'smooth'
        });
    }

    addAutoplay() {
        if (!this.sliderElement) return;

        const slides = this.sliderElement.querySelectorAll('.slider-slide');
        if (!slides.length) return;

        setInterval(() => {
            this.currentSlideIndex = (this.currentSlideIndex + 1) % slides.length;
            this.scrollToSlide(this.currentSlideIndex);
        }, 5000); 
    }

    render() {
        return this.element;
    }
}