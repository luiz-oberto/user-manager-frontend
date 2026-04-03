const params = new URLSearchParams(window.location.search);
const userId = params.get("id");

async function loadUser() {
    if (!userId) return;

    const response = await fetch(`${API_URL}/users/${userId}`, {
        headers: getHeaders()
    });

    const user = await response.json();

    document.getElementById("nome").value = user.nome;
    document.getElementById("email").value = user.email;
}

async function createUser() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const confirmSenha = document.getElementById("confirmSenha").value;
 
    if (senha !== confirmSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    await fetch(`${API_URL}/users/`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ nome, email, senha })
    });

    alert("Usuário criado!");
    window.location.href = "dashboard.html";
}

async function updateUser() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    await fetch(`${API_URL}/users/${userId}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ nome, email })
    });

    alert("Atualizado!");
}

async function deleteUser() {
    await fetch(`${API_URL}/users/${userId}`, {
        method: "DELETE",
        headers: getHeaders()
    });

    alert("Deletado!");
    window.location.href = "dashboard.html";
}