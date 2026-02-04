class PosterCard extends HTMLElement {
  static get observedAttributes() {
    return ["title", "description", "rating", "year", "duration", "score", "genre", "price", "image"];
  }

  constructor() {
    super();
    this._mounted = false;
    this._onClick = this._onClick.bind(this);
  }

  connectedCallback() {
    if (!this._mounted) {
      this._mounted = true;
      this.render();
      this.addEventListener("click", this._onClick);
    }
  }

  disconnectedCallback() {
    this.removeEventListener("click", this._onClick);
    this._mounted = false;
  }

  attributeChangedCallback() {
    if (this._mounted) this.render();
  }

  _getAttr(name, fallback = "") {
    const v = this.getAttribute(name);
    return v === null ? fallback : v;
  }

  _onClick(e) {
    if (!e.target.closest(".poster-card")) return;

    const movieData = {
      title: this._getAttr("title", "Unknown Title"),
      description: this._getAttr("description", "No description available"),
      rating: this._getAttr("rating", "N/A"),
      year: this._getAttr("year", "N/A"),
      duration: this._getAttr("duration", "N/A"),
      score: this._getAttr("score", "N/A"),
      genre: this._getAttr("genre", "N/A"),
      price: this._getAttr("price", "N/A"),
      image: this._getAttr(
        "image",
        "https://cdn.marvel.com/content/1x/snh_online_6072x9000_posed_01.jpg"
      ),
    };

    if (window.app && typeof window.app.showMovieDetail === "function") {
      window.app.showMovieDetail(movieData);
    }
  }

  render() {
    const title = this._getAttr("title", "Unknown Title");
    const rating = this._getAttr("rating", "N/A");
    const year = this._getAttr("year", "N/A");
    const duration = this._getAttr("duration", "N/A");
    const score = this._getAttr("score", "N/A");
    const genre = this._getAttr("genre", "N/A");
    const price = this._getAttr("price", "N/A");
    const image = this._getAttr(
      "image",
      "https://cdn.marvel.com/content/1x/snh_online_6072x9000_posed_01.jpg"
    );

    this.innerHTML = `
      <style>
        :host { display:block; margin:0; padding:0; }

        .poster-card{
          width: 100%;
          aspect-ratio: 3 / 5;
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.6);
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .poster-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 30px rgba(255, 107, 0, 0.5);
        }

        .poster-card::after{
          content:"";
          position:absolute;
          inset:0;
          background:linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.1));
        }

        .card-header{
          position:absolute; top:12px; left:12px; right:12px;
          display:flex; justify-content:space-between; align-items:center;
          z-index:2; pointer-events:none;
        }

        .title{
          font-weight:800;
          font-size:1.06rem;
          text-shadow:0 3px 8px rgba(0,0,0,0.6);
          color:#fff;
          max-width:80%;
          line-height:1.2;
        }

        .rating-badge{
          position:absolute; top:12px; right:12px;
          display:flex; align-items:center; gap:6px;
          background:rgba(0,0,0,0.45);
          padding:6px 10px;
          border-radius:999px;
          border:1px solid rgba(255,255,255,0.06);
          color:#ffd166;
          font-weight:700;
          z-index:2; pointer-events:none;
        }

        .star{ width:18px; height:18px; }

        .card-info{
          position:absolute; left:12px; right:12px; bottom:12px;
          z-index:2; pointer-events:none;
        }

        .meta{
          display:flex; gap:12px; align-items:center;
          margin-bottom:8px;
          font-size:0.9rem;
          color:#fff;
        }

        .score{ color:#4cd97a; font-weight:800; }
        .genre{ font-size:0.92rem; margin-bottom:8px; opacity:0.95; color:#fff; }
        .price{ font-weight:800; color:#ffd166; font-size:1.05rem; }
      </style>

      <div class="poster-card" style="background-image: url('${image.replace(/'/g, "%27")}');">
        <div class="rating-badge">
          <svg class="star" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 17.3 6.16 20l1.02-5.94L2.5 10.9l5.98-.87L12 4.5l3.52 5.53 5.98.87-4.68 3.16L17.84 20z"/>
          </svg>
          <span class="rating">${rating}</span>
        </div>

        <div class="card-header">
          <div class="title">${title}</div>
        </div>

        <div class="card-info">
          <div class="meta">
            <div class="score">${score}%</div>
            <div class="year-time">${year} • ${duration}</div>
          </div>
          <div class="genre">${genre}</div>
          <div class="price">${price}$</div>
        </div>
    </div>
`;
    }
}

if (!customElements.get("poster-card")) {
  customElements.define("poster-card", PosterCard);
}
