/* =========================
   BASE REQUEST
========================= */

async function apiRequest(url, options = {}) {
    const response = await fetch(url, {
        headers: getHeaders(),
        ...options
    });

    let data;

    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (!response.ok) {
        const message = data?.detail || "Erro na requisição";
        throw new Error(message);
    }

    return data;
}

/* =========================
   USERS
========================= */

function fetchUsers() {
    return apiRequest(`${API_URL}/users/`);
}

function getUserById(id) {
    return apiRequest(`${API_URL}/users/${id}`);
}

function createUserRequest(userData) {
    return apiRequest(`${API_URL}/users/`, {
        method: "POST",
        body: JSON.stringify(userData)
    });
}

function updateUserRequest(id, userData) {
    return apiRequest(`${API_URL}/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(userData)
    });
}

function deleteUserRequest(id) {
    return apiRequest(`${API_URL}/users/${id}`, {
        method: "DELETE"
    });
}

document.addEventListener("DOMContentLoaded", () => {
    if (!checkAuth()) return;
    if (!checkSuperUserAccess()) return;

    loadUsers();
});

/* =========================
   LOAD USERS
========================= */

async function loadUsers() {
    try {
        const users = await fetchUsers();
        renderUsers(users);
    } catch (error) {
        showError(error.message || "Erro ao carregar usuários.");
    }
}

/* =========================
   RENDER
========================= */

function renderUsers(users) {
    const table = document.getElementById("userTable");
    if (!table) return;

    table.innerHTML = "";

    users.forEach(user => {
        const tr = document.createElement("tr");

        const nomeTd = document.createElement("td");
        nomeTd.textContent = user.nome;

        const emailTd = document.createElement("td");
        emailTd.textContent = user.email;

        const actionTd = document.createElement("td");
        actionTd.className = "text-end";

        const btn = document.createElement("a");
        btn.href = `edit.html?id=${user.id_usuario}`;
        btn.className = "btn btn-sm btn-outline-primary";
        btn.textContent = "Editar";

        actionTd.appendChild(btn);

        tr.appendChild(nomeTd);
        tr.appendChild(emailTd);
        tr.appendChild(actionTd);

        table.appendChild(tr);
    });
}