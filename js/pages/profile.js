document.addEventListener("DOMContentLoaded", () => {
    if (!checkAuth()) return;

    loadProfile();
});

/* =========================
   LOAD PROFILE
========================= */

async function loadProfile() {
    const userToken = getUserFromToken();
    const userId = userToken?.sub;

    if (!userId) {
        showError("Usuário não identificado");
        return;
    }

    try {
        const user = await getUserById(userId);

        renderProfile(user);
        renderActions(userToken);

    } catch (error) {
        showError("Erro ao carregar perfil.");
    }
}

/* =========================
   RENDER PROFILE
========================= */

function renderProfile(user) {
    const container = document.getElementById("profile");
    if (!container) return;

    container.innerHTML = `
        <div class="profile-item">
            <div class="profile-label">Nome</div>
            <div class="profile-value">${user.nome}</div>
        </div>

        <div class="profile-item">
            <div class="profile-label">Email</div>
            <div class="profile-value">${user.email}</div>
        </div>

        <div class="profile-item">
            <div class="profile-label">Perfil</div>
            <div class="profile-value">
                ${user.is_superuser ? "Superusuário" : "Usuário comum"}
            </div>
        </div>
    `;
}

/* =========================
   ACTIONS
========================= */

function renderActions(userToken) {
    const container = document.getElementById("actionButton");
    if (!container) return;

    container.innerHTML = "";

    if (userToken.is_superuser) {
        const link = document.createElement("a");
        link.href = "dashboard.html";
        link.className = "btn btn-primary mt-3";
        link.textContent = "Voltar";

        container.appendChild(link);
    } else {
        const btn = document.createElement("button");
        btn.className = "btn btn-danger mt-3";
        btn.textContent = "Sair";

        btn.addEventListener("click", logout);

        container.appendChild(btn);
    }
}