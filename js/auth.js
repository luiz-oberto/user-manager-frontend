let isLoading = false;

async function login() {
    if (isLoading) return;

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const btn = document.getElementById("loginBtn");

    if (!email || !senha) {
        showWarning("Preencha todos os campos.");
        return;
    }

    if (!email.includes("@")) {
        showWarning("Informe um email válido.");
        return;
    }

    try {
        isLoading = true;

        btn.disabled = true;
        btn.textContent = "Entrando...";

        const response = await fetch(`${API_URL}/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                username: email,
                password: senha
            })
        });

        if (!response.ok) {
            throw new Error();
        }

        const data = await response.json();
        localStorage.setItem("token", data.access_token);

        showSuccess("Login realizado com sucesso!");

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 800);

    } catch {
        showError("Email ou senha inválidos.");
    } finally {
        isLoading = false;
        btn.disabled = false;
        btn.textContent = "Entrar";
    }
}

/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // evita reload da página
        login();
    });
});