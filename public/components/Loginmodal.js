// LoginModal Component
class LoginModal {
  constructor() {
    this.element = this.createElement();
    this.overlay = null;
    this.modal = null;

    window.loginModal = this;

    this.setupModal();
  }

  createElement() {
    const container = document.createElement("div");

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.id = "modalOverlay";

    const modal = document.createElement("div");
    modal.className = "login-modal";
    modal.id = "loginModal";

    modal.innerHTML = `
      <div class="modal-header">
        <h1>log in to your account</h1>
        <button type="button" class="closebtn">✕</button>
      </div>

      <div class="modal-body">
        <form id="loginForm">
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
            <button type="button" id="registerbtn" class="joinbtn">Join</button>
          </div>
        </form>
      </div>
    `;

    container.appendChild(overlay);
    container.appendChild(modal);
    return container;
  }

  setupModal() {
    setTimeout(() => {
      this.overlay = document.getElementById("modalOverlay");
      this.modal = document.getElementById("loginModal");

      this.overlay.addEventListener("click", () => this.close());

      this.modal.querySelector(".closebtn").addEventListener("click", () => this.close());

      this.modal.querySelector(".forgotlink").addEventListener("click", (e) => {
        e.preventDefault();
        alert("Forgot password");
      });

      this.modal.querySelector("#registerbtn").addEventListener("click", () => {
        alert("Register functionality would be implemented here");
      });

      this.modal.addEventListener("click", (e) => e.stopPropagation());

      // ✅ Use your real handler
      const form = this.modal.querySelector("#loginForm");
      form.addEventListener("submit", (e) => this.handleLogin(e));

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") this.close();
      });
    }, 0);
  }

  async handleLogin(event) {
    event.preventDefault();

    const email = this.modal.querySelector("#email").value.trim();
    const password = this.modal.querySelector("#password").value;

    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    try {
      submitBtn.textContent = "Logging in...";
      submitBtn.disabled = true;

      // ✅ Call your Express route
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // if you use cookies/sessions:
        // credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      // Expecting JSON like { success: true, user, token? , message? }
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || `HTTP ${res.status} login failed`);
      }

      if (data.success) {
        // If using JWT token:
        if (data.token) localStorage.setItem("token", data.token);

        // Store user if you want:
        if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

        this.close();

        if (window.app && typeof window.app.updatedUserState === "function") {
          window.app.updatedUserState();
        }

        if (data.user?.role === "admin" && window.adminPanel) {
          if (confirm("Go to admin dashboard?")) window.adminPanel.open();
        }
      } else {
        throw new Error(data.message || "Invalid login");
      }
    } catch (error) {
      alert(`Login failed: ${error.message}`);
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  }

  open() {
    if (this.modal && this.overlay) {
      this.modal.classList.add("active");
      this.overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  close() {
    if (this.modal && this.overlay) {
      this.modal.classList.remove("active");
      this.overlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  render() {
    return this.element;
  }
}
