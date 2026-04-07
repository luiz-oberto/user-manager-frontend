function initDashboard() {
    if (!checkAuth()) return;
    if (!checkSuperUserAccess()) return;

    loadUsers();
}

async function loadUsers() {
    checkAuth();

    const response = await fetch(`${API_URL}/users/`, {
        headers: getHeaders()
    });

    const users = await response.json();

    const table = document.getElementById("userTable");
    table.innerHTML = "";

    users.forEach(user => {
        table.innerHTML += `
            <tr>
                <td>${user.nome}</td>
                <td>${user.email}</td>
                <td>
                    <a href="edit.html?id=${user.id_usuario}" class="btn btn-sm btn-warning">Editar</a>
                </td>
            </tr>
        `;
    });
}