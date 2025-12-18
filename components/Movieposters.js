// MoviePosters Component
class MoviePosters {
    constructor() {
        this.movies = [
            {
                title: "Spider-Man: No Way Home",
                description: "Peter Parker is unmasked and asks Doctor Strange for help.",
                rating: "4.4",
                year: "2021",
                duration: "02:28:00",
                score: "90",
                genre: "Action, Adventure",
                price: "300",
                image: 'https://cdn.marvel.com/content/1x/snh_online_6072x9000_posed_01.jpg'
            },
            {
                title: "Inception",
                description: "A thief who steals corporate secrets through dream-sharing.",
                rating: "4.7",
                year: "2010",
                duration: "02:28:00",
                score: "89",
                genre: "Sci-Fi, Thriller",
                price: "400",
                image: "https://m.media-amazon.com/images/M/MV5BMTM0MjUzNjkwMl5BMl5BanBnXkFtZTcwNjY0OTk1Mw@@._V1_.jpg"
            },
            {
                title: "The Batman",
                description: "In his second year of fighting crime, Batman uncovers corruption.",
                rating: "4.6",
                year: "2022",
                duration: "02:56:00",
                score: "88",
                genre: "Action, Crime",
                price: "350",
                image: 'https://assets-prd.ignimgs.com/2021/10/15/new-batman-poster-1634314278488.jpg'
            },
            {
                title: "Avengers: Endgame",
                description: "After the devastating events, the Avengers assemble once more.",
                rating: "4.8",
                year: "2019",
                duration: "03:01:00",
                score: "95",
                genre: "Action, Adventure",
                price: "450",
                image: "https://tse2.mm.bing.net/th/id/OIP.Fsm9DJ05UXPQ8XbyatmcQQHaLH?rs=1&pid=ImgDetMain&o=7&rm=3"
            }
        ];

        // Duplicate some movies to fill the grid
        this.movies = [...this.movies, ...this.movies];
        
        this.element = this.createElement();
    }

    createElement() {
        const section = document.createElement('div');
        section.className = 'movie-posters';
        
        // Add heading
        const heading = document.createElement('h2');
        heading.textContent = 'Now Showing';
        section.appendChild(heading);
        
        // Create poster cards
        this.movies.forEach(movie => {
            const posterCard = document.createElement('poster-card');
            Object.keys(movie).forEach(key => {
                posterCard.setAttribute(key, movie[key]);
            });
            section.appendChild(posterCard);
        });
        
        return section;
    }

    render() {
        return this.element;
    }
}