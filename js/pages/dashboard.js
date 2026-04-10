async function loadUsers() {
    if (!checkAuth()) return;

    const response = await fetch(`${API_URL}/users/`, {
        headers: getHeaders()
    });

    const users = await response.json();
    const table = document.getElementById("userTable");

    table.innerHTML = "";

    users.forEach(user => {
        const tr = document.createElement("tr");

        const nomeTd = document.createElement("td");
        nomeTd.textContent = user.nome;

        const emailTd = document.createElement("td");
        emailTd.textContent = user.email;

        const actionTd = document.createElement("td");

        const div = document.createElement("div");
        div.className = "d-flex justify-content-end";

        const link = document.createElement("a");
        link.href = `edit.html?id=${user.id_usuario}`;
        link.className = "btn btn-sm btn-outline-primary";
        link.textContent = "Editar";

        div.appendChild(link);
        actionTd.appendChild(div);

        tr.appendChild(nomeTd);
        tr.appendChild(emailTd);
        tr.appendChild(actionTd);

        table.appendChild(tr);
    });
}