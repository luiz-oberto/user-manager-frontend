function getUserId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

let currentUser = null;

/* =========================
   LOAD USER
========================= */

async function loadUser() {
    const userId = getUserId();
    if (!userId) return;

    try {
        const user = await getUserById(userId);

        currentUser = user;

        fillUserForm(user);

    } catch {
        showError("Erro ao carregar dados do usuário.");
    }
}

/* =========================
   UI
========================= */

function fillUserForm(user) {
    document.getElementById("nome").value = user.nome;
    document.getElementById("email").value = user.email;
}

/* =========================
   CREATE
========================= */

async function createUser() {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (!validateUser({ nome, email, senha })) return;

    try {
        await createUserRequest({ nome, email, senha });

        showSuccess("Usuário criado com sucesso!");

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1200);

    } catch (error) {
        showError(error.message || "Erro ao criar usuário.");
    }
}

/* =========================
   UPDATE
========================= */

async function updateUser() {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();

    try {
        await updateUserRequest(getUserId(), {
            nome,
            email,
            is_superuser: currentUser?.is_superuser || false
        });

        showSuccess("Usuário atualizado com sucesso!");

    } catch (error) {
        showError("Erro ao atualizar usuário.");
    }
}

/* =========================
   DELETE
========================= */

async function deleteUser() {
    try {
        await deleteUserRequest(getUserId());

        showSuccess("Usuário deletado!");

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1200);

    } catch {
        showError("Erro ao deletar usuário.");
    }
}

/* =========================
   VALIDATION
========================= */

function validateUser({ nome, email, senha }) {
    if (!nome || !email) {
        showWarning("Nome e email são obrigatórios.");
        return false;
    }

    if (!email.includes("@")) {
        showWarning("Email inválido.");
        return false;
    }

    if (!senha || senha.length < 4) {
        showWarning("Senha deve ter pelo menos 4 caracteres.");
        return false;
    }

    return true;
}