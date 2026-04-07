const params = new URLSearchParams(window.location.search);
const userId = params.get("id");

function initEditPage() {
    if (!checkAuth()) return;
    if (!checkSuperUserAccess()) return;

    loadUser();
}

async function loadUser() {
    if (!userId) return;

    try {
        const response = await fetch(`${API_URL}/users/${userId}`, {
            headers: getHeaders()
        });

        if (!response.ok) {
            throw new Error("Erro ao carregar usuário");
        }

        const user = await response.json();

        // guardar usuário completo
        window.currentUser = user;

        document.getElementById("nome").value = user.nome;
        document.getElementById("email").value = user.email;

    } catch (error) {
        showError("Erro ao carregar dados do usuário.");
    }
}
async function createUser() {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    try {
        const response = await fetch(`${API_URL}/users/`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({ nome, email, senha })
        });

        if (!response.ok) {
            throw new Error("Erro ao criar usuário");
        }

        showSuccess("Usuário criado com sucesso!");

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1200);

    } catch (error) {
        showError("Erro ao criar usuário.");
    }
}

async function updateUser() {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();

    const is_superuser = window.currentUser?.is_superuser || false;

    try {
        const response = await fetch(`${API_URL}/users/${userId}`, {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify({ nome, email, is_superuser })
        });

        if (!response.ok) {
            throw new Error("Erro ao atualizar");
        }

        showSuccess("Usuário atualizado com sucesso!");

    } catch (error) {
        showError("Erro ao atualizar usuário.");
    }
}

async function deleteUser() {
    try {
        const response = await fetch(`${API_URL}/users/${userId}`, {
            method: "DELETE",
            headers: getHeaders()
        });

        if (!response.ok) {
            throw new Error("Erro ao deletar");
        }

        showSuccess("Usuário deletado!");

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1200);

    } catch (error) {
        showError("Erro ao deletar usuário.");
    }
}