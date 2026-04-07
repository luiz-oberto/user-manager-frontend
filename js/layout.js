document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const topbar = document.getElementById("topbar");

  const currentPage = window.location.pathname.split("/").pop();

  if (sidebar) {
    sidebar.innerHTML = `
      <div class="sidebar">
        <div class="sidebar-brand">
          <i class="bi bi-people-fill"></i>
          <span>UserManager</span>
        </div>

        <nav class="sidebar-nav">
          <a href="dashboard.html" class="sidebar-link ${currentPage === "dashboard.html" ? "active" : ""}">
            <i class="bi bi-grid-1x2-fill"></i>
            <span>Dashboard</span>
          </a>

          <a href="users.html" class="sidebar-link ${currentPage === "users.html" ? "active" : ""}">
            <i class="bi bi-person-lines-fill"></i>
            <span>Usuários</span>
          </a>

          <a href="create-user.html" class="sidebar-link ${currentPage === "create-user.html" ? "active" : ""}">
            <i class="bi bi-person-plus-fill"></i>
            <span>Criar usuário</span>
          </a>

          <a href="profile.html" class="sidebar-link ${currentPage === "profile.html" ? "active" : ""}">
            <i class="bi bi-person-circle"></i>
            <span>Meu perfil</span>
          </a>
        </nav>
      </div>
    `;
  }

  if (topbar) {
    topbar.innerHTML = `
      <div class="topbar">
        <div class="topbar-left">
          <div class="search-box">
            <i class="bi bi-search"></i>
            <input type="text" id="globalSearch" placeholder="Pesquisar usuários...">
          </div>
        </div>

        <div class="topbar-right">
          <div class="user-info">
            <span id="loggedUserName">Usuário</span>
          </div>
          <button class="btn btn-logout" id="logoutBtn">
            <i class="bi bi-box-arrow-right"></i>
            Sair
          </button>
        </div>
      </div>
    `;

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "index.html";
      });
    }

    const searchInput = document.getElementById("globalSearch");
    if (searchInput) {
      searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const query = searchInput.value.trim();
          if (query) {
            window.location.href = `users.html?search=${encodeURIComponent(query)}`;
          }
        }
      });
    }
  }

  fillLoggedUserName();
});

function fillLoggedUserName() {
  const token = localStorage.getItem("token");
  const nameEl = document.getElementById("loggedUserName");

  if (!token || !nameEl) return;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    nameEl.textContent = payload.nome || payload.sub || "Usuário";
  } catch (error) {
    nameEl.textContent = "Usuário";
  }
}