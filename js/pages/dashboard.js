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
        const users = await fetchUsers(); // 🔥 agora usa service
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

        const link = document.createElement("a");
        link.href = `edit.html?id=${user.id_usuario}`;
        link.className = "btn btn-sm btn-outline-primary";
        link.textContent = "Editar";

        actionTd.appendChild(link);

        tr.appendChild(nomeTd);
        tr.appendChild(emailTd);
        tr.appendChild(actionTd);

        table.appendChild(tr);
    });
}