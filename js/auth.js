let isLoading = false;

async function login() {
    if (isLoading) return; // evita múltiplos cliques

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const btn = document.querySelector("button");

    // 🔹 validação básica
    if (!email || !senha) {
        showWarning("Preencha todos os campos.");
        return;
    }

    // 🔹 validação simples de email
    if (!email.includes("@")) {
        showWarning("Informe um email válido.");
        return;
    }

    try {
        isLoading = true;

        // 🔹 estado de loading
        btn.disabled = true;
        const originalText = btn.innerText;
        btn.innerText = "Entrando...";

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
            throw new Error("Credenciais inválidas");
        }

        const data = await response.json();
        localStorage.setItem("token", data.access_token);

        showSuccess("Login realizado com sucesso!");

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 800);

    } catch (error) {
        showError("Email ou senha inválidos.");
    } finally {
        // 🔹 volta estado do botão
        isLoading = false;
        btn.disabled = false;
        btn.innerText = "Entrar";
    }
}

/* 🔥 ENTER PARA LOGAR */
document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            login();
        }
    });
});