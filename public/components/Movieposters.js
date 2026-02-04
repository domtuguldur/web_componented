class MoviePosters {
  constructor() {
    this.movies = [];
    this.element = this.createElement();
    this.loadMovies();
  }

  createElement() {
    const section = document.createElement("div");
    section.className = "movie-posters";

    const heading = document.createElement("h2");
    heading.textContent = "Now Showing";
    section.appendChild(heading);

    this.statusEl = document.createElement("p");
    this.statusEl.textContent = "Loading movies...";
    section.appendChild(this.statusEl);

    return section;
  }

  async loadMovies() {
    try {
      const res = await fetch("http://192.168.1.94:3000/api/movies"); 
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();

      this.movies = [...data, ...data];
      this.renderMovies();
    } catch (e) {
      console.error(e);
      if (this.statusEl) this.statusEl.textContent = "Failed to load movies.";
    }
  }

  renderMovies() {
    if (this.statusEl && this.statusEl.parentNode) this.statusEl.remove();
    this.element.querySelectorAll("poster-card").forEach(el => el.remove());

    this.movies.forEach(movie => {
      const card = document.createElement("poster-card");
      card.setAttribute("title", movie.title ?? "");
      card.setAttribute("description", movie.description ?? "");
      card.setAttribute("rating", String(movie.rating ?? ""));
      card.setAttribute("year", String(movie.year ?? ""));
      card.setAttribute("duration", movie.duration ?? "");
      card.setAttribute("score", String(movie.score ?? ""));
      card.setAttribute("genre", movie.genre ?? "");
      card.setAttribute("price", String(movie.price ?? ""));
      card.setAttribute("image", movie.image ?? "");
      this.element.appendChild(card);
    });
  }

  render() { return this.element; }
}
