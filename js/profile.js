async function loadProfile() {
    if (!checkAuth()) return;

    const userToken = getUserFromToken();
    const userId = userToken?.sub;

    if (!userId) {
        showError("Usuário não identificado");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/users/${userId}`, {
            headers: getHeaders()
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar usuário");
        }

        const user = await response.json();

        document.getElementById("profile").innerHTML = `
            <p><strong>Nome:</strong> ${user.nome}</p>
            <p><strong>Email:</strong> ${user.email}</p>
        `;

        const actionDiv = document.getElementById("actionButton");

        if (userToken.is_superuser) {
            actionDiv.innerHTML = `
                <a href="dashboard.html" class="btn btn-primary mt-3">Voltar</a>
            `;
        } else {
            actionDiv.innerHTML = `
                <button onclick="logout()" class="btn btn-danger mt-3">Sair</button>
            `;
        }

    } catch (error) {
        showError("Erro ao carregar perfil.");
    }
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("is_superuser");

    window.location.href = "index.html";
}

function renderProfile(user) {
    const container = document.getElementById("profile");

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