// Admin Panel Component
class AdminPanel {
    constructor() {
        this.element = null;
        this.currentTab = 'dashboard';
        window.adminPanel = this;
    }

    createElement() {
        const container = document.createElement('div');
        container.className = 'admin-panel-container';
        
        container.innerHTML = `
            <div class="admin-panel">
                <div class="admin-sidebar">
                    <div class="admin-logo">
                        <h2>Admin Panel</h2>
                    </div>
                    <nav class="admin-nav">
                        <button class="admin-nav-btn active" data-tab="dashboard">
                            📊 Dashboard
                        </button>
                        <button class="admin-nav-btn" data-tab="movies">
                            🎬 Movies
                        </button>
                        <button class="admin-nav-btn" data-tab="bookings">
                            🎫 Bookings
                        </button>
                        <button class="admin-nav-btn" data-tab="users">
                            👥 Users
                        </button>
                        <button class="admin-nav-btn exit-admin" id="exitAdmin">
                            ← Back to Site
                        </button>
                    </nav>
                </div>
                
                <div class="admin-content">
                    <div class="admin-tab" id="dashboardTab">
                        <h1>Dashboard Overview</h1>
                        <div class="stats-grid" id="statsGrid">
                            <div class="loading">Loading statistics...</div>
                        </div>
                        <div class="recent-bookings">
                            <h2>Recent Bookings</h2>
                            <div id="recentBookings"></div>
                        </div>
                    </div>
                    
                    <div class="admin-tab" id="moviesTab" style="display: none;">
                        <div class="tab-header">
                            <h1>Manage Movies</h1>
                            <button class="btn-primary" id="addMovieBtn">+ Add New Movie</button>
                        </div>
                        <div id="moviesTable"></div>
                    </div>
                    
                    <div class="admin-tab" id="bookingsTab" style="display: none;">
                        <h1>All Bookings</h1>
                        <div id="bookingsTable"></div>
                    </div>
                    
                    <div class="admin-tab" id="usersTab" style="display: none;">
                        <h1>User Management</h1>
                        <div id="usersTable"></div>
                    </div>
                </div>
            </div>
            
            <!-- Add/Edit Movie Modal -->
            <div class="modal-overlay" id="movieFormOverlay">
                <div class="admin-modal" id="movieFormModal">
                    <div class="modal-header">
                        <h2 id="movieFormTitle">Add New Movie</h2>
                        <button class="closebtn" id="closeMovieForm">✕</button>
                    </div>
                    <div class="modal-body">
                        <form id="movieForm">
                            <input type="hidden" id="movieId">
                            <div class="formgroup">
                                <label>Title</label>
                                <input type="text" id="movieTitle" required>
                            </div>
                            <div class="formgroup">
                                <label>Description</label>
                                <textarea id="movieDescription" rows="4" required></textarea>
                            </div>
                            <div class="form-row">
                                <div class="formgroup">
                                    <label>Rating</label>
                                    <input type="number" id="movieRating" step="0.1" min="0" max="5" required>
                                </div>
                                <div class="formgroup">
                                    <label>Year</label>
                                    <input type="number" id="movieYear" min="1900" max="2030" required>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="formgroup">
                                    <label>Duration</label>
                                    <input type="text" id="movieDuration" placeholder="02:30:00" required>
                                </div>
                                <div class="formgroup">
                                    <label>Score</label>
                                    <input type="number" id="movieScore" min="0" max="100" required>
                                </div>
                            </div>
                            <div class="formgroup">
                                <label>Genre</label>
                                <input type="text" id="movieGenre" placeholder="Action, Adventure" required>
                            </div>
                            <div class="formgroup">
                                <label>Price ($)</label>
                                <input type="number" id="moviePrice" min="0" step="50" required>
                            </div>
                            <div class="formgroup">
                                <label>Image URL</label>
                                <input type="url" id="movieImage" required>
                            </div>
                            <div class="form-actions">
                                <button type="submit" class="btn-primary">Save Movie</button>
                                <button type="button" class="btn-secondary" id="cancelMovieForm">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
        
        this.setupEventListeners(container);
        return container;
    }

    setupEventListeners(container) {
        // Tab navigation
        const navBtns = container.querySelectorAll('.admin-nav-btn:not(.exit-admin)');
        navBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                this.switchTab(tab);
                
                // Update active state
                navBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
        
        // Exit admin
        container.querySelector('#exitAdmin').addEventListener('click', () => {
            if (window.app) {
                window.app.showHome();
            }
        });
        
        // Movie form
        container.querySelector('#addMovieBtn').addEventListener('click', () => this.showMovieForm());
        container.querySelector('#closeMovieForm').addEventListener('click', () => this.hideMovieForm());
        container.querySelector('#cancelMovieForm').addEventListener('click', () => this.hideMovieForm());
        container.querySelector('#movieForm').addEventListener('submit', (e) => this.handleMovieSubmit(e));
        
        // Click outside modal to close
        container.querySelector('#movieFormOverlay').addEventListener('click', (e) => {
            if (e.target.id === 'movieFormOverlay') {
                this.hideMovieForm();
            }
        });
    }

    switchTab(tabName) {
        this.currentTab = tabName;
        
        // Hide all tabs
        const tabs = document.querySelectorAll('.admin-tab');
        tabs.forEach(tab => tab.style.display = 'none');
        
        // Show selected tab
        document.getElementById(`${tabName}Tab`).style.display = 'block';
        
        // Load data for the tab
        switch(tabName) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'movies':
                this.loadMovies();
                break;
            case 'bookings':
                this.loadBookings();
                break;
            case 'users':
                this.loadUsers();
                break;
        }
    }

    async loadDashboard() {
        try {
            const result = await window.apiService.getAdminStats();
            const stats = result.stats;
            
            const statsGrid = document.getElementById('statsGrid');
            statsGrid.innerHTML = `
                <div class="stat-card">
                    <div class="stat-icon">👥</div>
                    <div class="stat-info">
                        <h3>${stats.totalUsers}</h3>
                        <p>Total Users</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🎫</div>
                    <div class="stat-info">
                        <h3>${stats.totalBookings}</h3>
                        <p>Total Bookings</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🎬</div>
                    <div class="stat-info">
                        <h3>${stats.totalMovies}</h3>
                        <p>Total Movies</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">💰</div>
                    <div class="stat-info">
                        <h3>$${stats.totalRevenue.toFixed(2)}</h3>
                        <p>Total Revenue</p>
                    </div>
                </div>
            `;
            
            // Recent bookings
            const recentBookings = document.getElementById('recentBookings');
            if (stats.recentBookings.length === 0) {
                recentBookings.innerHTML = '<p>No recent bookings</p>';
            } else {
                recentBookings.innerHTML = stats.recentBookings.map(booking => `
                    <div class="booking-item">
                        <strong>${booking.movieTitle}</strong>
                        <span>${booking.bookingNumber}</span>
                        <span>$${booking.totalPrice}</span>
                    </div>
                `).join('');
            }
        } catch (error) {
            console.error('Failed to load dashboard:', error);
        }
    }

    async loadMovies() {
        try {
            const result = await window.apiService.getMovies();
            const movies = result.movies;
            
            const table = document.getElementById('moviesTable');
            
            if (movies.length === 0) {
                table.innerHTML = '<p>No movies found. Add your first movie!</p>';
                return;
            }
            
            table.innerHTML = `
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Year</th>
                            <th>Rating</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${movies.map(movie => `
                            <tr>
                                <td>${movie.title}</td>
                                <td>${movie.genre}</td>
                                <td>${movie.year}</td>
                                <td>⭐ ${movie.rating}</td>
                                <td>$${movie.price}</td>
                                <td>
                                    <button class="btn-edit" onclick="adminPanel.editMovie('${movie.id}')">Edit</button>
                                    <button class="btn-delete" onclick="adminPanel.deleteMovie('${movie.id}')">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } catch (error) {
            console.error('Failed to load movies:', error);
        }
    }

    async loadBookings() {
        try {
            const result = await window.apiService.getAllBookings();
            const bookings = result.bookings;
            
            const table = document.getElementById('bookingsTable');
            
            if (bookings.length === 0) {
                table.innerHTML = '<p>No bookings found.</p>';
                return;
            }
            
            table.innerHTML = `
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Booking #</th>
                            <th>Movie</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Seats</th>
                            <th>Total</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${bookings.map(booking => `
                            <tr>
                                <td>${booking.bookingNumber}</td>
                                <td>${booking.movieTitle}</td>
                                <td>${booking.date}</td>
                                <td>${booking.time}</td>
                                <td>${booking.seats}</td>
                                <td>$${booking.totalPrice}</td>
                                <td><span class="status-badge ${booking.status}">${booking.status}</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } catch (error) {
            console.error('Failed to load bookings:', error);
        }
    }

    async loadUsers() {
        try {
            const result = await window.apiService.getAllUsers();
            const users = result.users;
            
            const table = document.getElementById('usersTable');
            
            if (users.length === 0) {
                table.innerHTML = '<p>No users found.</p>';
                return;
            }
            
            table.innerHTML = `
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${users.map(user => `
                            <tr>
                                <td>${user.name}</td>
                                <td>${user.email}</td>
                                <td>${user.phone || 'N/A'}</td>
                                <td><span class="role-badge">${user.role}</span></td>
                                <td>
                                    <button class="btn-delete" onclick="adminPanel.deleteUser('${user.id}')">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } catch (error) {
            console.error('Failed to load users:', error);
        }
    }

    showMovieForm(movieData = null) {
        const overlay = document.getElementById('movieFormOverlay');
        const title = document.getElementById('movieFormTitle');
        const form = document.getElementById('movieForm');
        
        if (movieData) {
            title.textContent = 'Edit Movie';
            document.getElementById('movieId').value = movieData.id;
            document.getElementById('movieTitle').value = movieData.title;
            document.getElementById('movieDescription').value = movieData.description;
            document.getElementById('movieRating').value = movieData.rating;
            document.getElementById('movieYear').value = movieData.year;
            document.getElementById('movieDuration').value = movieData.duration;
            document.getElementById('movieScore').value = movieData.score;
            document.getElementById('movieGenre').value = movieData.genre;
            document.getElementById('moviePrice').value = movieData.price;
            document.getElementById('movieImage').value = movieData.image;
        } else {
            title.textContent = 'Add New Movie';
            form.reset();
            document.getElementById('movieId').value = '';
        }
        
        overlay.classList.add('active');
    }

    hideMovieForm() {
        const overlay = document.getElementById('movieFormOverlay');
        overlay.classList.remove('active');
        document.getElementById('movieForm').reset();
    }

    async handleMovieSubmit(e) {
        e.preventDefault();
        
        const movieId = document.getElementById('movieId').value;
        const movieData = {
            title: document.getElementById('movieTitle').value,
            description: document.getElementById('movieDescription').value,
            rating: document.getElementById('movieRating').value,
            year: document.getElementById('movieYear').value,
            duration: document.getElementById('movieDuration').value,
            score: document.getElementById('movieScore').value,
            genre: document.getElementById('movieGenre').value,
            price: document.getElementById('moviePrice').value,
            image: document.getElementById('movieImage').value
        };
        
        try {
            let result;
            if (movieId) {
                result = await window.apiService.updateMovie(movieId, movieData);
            } else {
                result = await window.apiService.addMovie(movieData);
            }
            
            if (result.success) {
                alert(movieId ? 'Movie updated successfully!' : 'Movie added successfully!');
                this.hideMovieForm();
                this.loadMovies();
            }
        } catch (error) {
            alert('Failed to save movie: ' + error.message);
        }
    }

    async editMovie(movieId) {
        try {
            const result = await window.apiService.getMovie(movieId);
            this.showMovieForm(result.movie);
        } catch (error) {
            alert('Failed to load movie data');
        }
    }

    async deleteMovie(movieId) {
        if (!confirm('Are you sure you want to delete this movie?')) {
            return;
        }
        
        try {
            const result = await window.apiService.deleteMovie(movieId);
            if (result.success) {
                alert('Movie deleted successfully!');
                this.loadMovies();
            }
        } catch (error) {
            alert('Failed to delete movie: ' + error.message);
        }
    }

    async deleteUser(userId) {
        if (!confirm('Are you sure you want to delete this user?')) {
            return;
        }
        
        try {
            const result = await window.apiService.deleteUser(userId);
            if (result.success) {
                alert('User deleted successfully!');
                this.loadUsers();
            }
        } catch (error) {
            alert('Failed to delete user: ' + error.message);
        }
    }

    open() {
        if (!window.apiService.isAdmin()) {
            alert('Access denied. Admin privileges required.');
            return;
        }
        
        this.element = this.createElement();
        
        if (window.app) {
            window.app.root.innerHTML = '';
            window.app.root.appendChild(this.element);
        }
        
        // Load dashboard
        this.loadDashboard();
    }
}