// layout.js

document.addEventListener("DOMContentLoaded", () => {
    initLayout();
});

/* =========================
   INIT
========================= */

function initLayout() {
    const user = getUserFromToken();
    const currentPage = getCurrentPage();

    renderSidebar(user, currentPage);
    renderTopbar();
    fillLoggedUserName();
    bindLayoutEvents();
}

/* =========================
   HELPERS
========================= */

function getCurrentPage() {
    return window.location.pathname.split("/").pop();
}

/* =========================
   SIDEBAR
========================= */

function renderSidebar(user, currentPage) {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar) return;

    const container = document.createElement("div");
    container.className = "sidebar";

    container.appendChild(createSidebarBrand());
    container.appendChild(createSidebarNav(user, currentPage));

    sidebar.innerHTML = "";
    sidebar.appendChild(container);
}

function createSidebarBrand() {
    const brand = document.createElement("div");
    brand.className = "sidebar-brand";

    brand.innerHTML = `
        <i class="bi bi-people-fill"></i>
        <span>UserManager</span>
    `;

    return brand;
}

function createSidebarNav(user, currentPage) {
    const nav = document.createElement("nav");
    nav.className = "sidebar-nav";

    if (user?.is_superuser) {
        nav.appendChild(createSidebarLink(
            "dashboard.html",
            "bi bi-grid-1x2-fill",
            "Dashboard",
            currentPage === "dashboard.html"
        ));

        nav.appendChild(createSidebarLink(
            "create.html",
            "bi bi-person-plus-fill",
            "Criar usuário",
            currentPage === "create.html"
        ));
    }

    nav.appendChild(createSidebarLink(
        "profile.html",
        "bi bi-person-circle",
        "Meu perfil",
        currentPage === "profile.html"
    ));

    nav.appendChild(createSidebarLink(
        "architecture.html",
        "bi bi-diagram-3-fill",
        "Arquitetura",
        false
    ));

    return nav;
}

function createSidebarLink(href, icon, label, isActive) {
    const link = document.createElement("a");

    link.href = href;
    link.className = `menu-item sidebar-link ${isActive ? "active" : ""}`;

    link.innerHTML = `
        <i class="${icon}"></i>
        <span>${label}</span>
    `;

    return link;
}

/* =========================
   TOPBAR
========================= */

function renderTopbar() {
    const topbar = document.getElementById("topbar");
    if (!topbar) return;

    const container = document.createElement("div");
    container.className = "topbar";

    container.appendChild(createSearchBox());
    container.appendChild(createTopbarRight());

    topbar.innerHTML = "";
    topbar.appendChild(container);
}

function createSearchBox() {
    const wrapper = document.createElement("div");
    wrapper.className = "topbar-left";

    wrapper.innerHTML = `
        <div class="search-box">
            <i class="bi bi-search"></i>
            <input type="text" id="globalSearch" placeholder="Pesquisar usuários...">
        </div>
    `;

    return wrapper;
}

function createTopbarRight() {
    const wrapper = document.createElement("div");
    wrapper.className = "topbar-right";

    wrapper.innerHTML = `
        <div class="user-info">
            <span id="loggedUserName">Usuário</span>
        </div>
        <button class="btn btn-logout" id="logoutBtn">
            <i class="bi bi-box-arrow-right"></i>
            Sair
        </button>
    `;

    return wrapper;
}

/* =========================
   EVENTS
========================= */

function bindLayoutEvents() {
    bindLogout();
    bindSearch();
}

function bindLogout() {
    const logoutBtn = document.getElementById("logoutBtn");
    if (!logoutBtn) return;

    logoutBtn.addEventListener("click", logout);
}

function bindSearch() {
    const searchInput = document.getElementById("globalSearch");
    if (!searchInput) return;

    searchInput.addEventListener("keydown", (e) => {
        if (e.key !== "Enter") return;

        const query = searchInput.value.trim();
        if (!query) return;

        window.location.href = `users.html?search=${encodeURIComponent(query)}`;
    });
}

/* =========================
   USER INFO
========================= */

function fillLoggedUserName() {
    const user = getUserFromToken();
    const nameEl = document.getElementById("loggedUserName");

    if (!user || !nameEl) return;

    nameEl.textContent = user.nome || "Usuário";
}