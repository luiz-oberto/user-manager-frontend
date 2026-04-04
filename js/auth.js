async function login() {

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {
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

        console.log("Status:", response.status);

        const text = await response.text();
        console.log("Resposta bruta:", text);

        let data;
        try {
            data = JSON.parse(text);
        } catch (e) {
            console.error("Erro ao converter JSON:", e);
            return;
        }

        console.log("JSON:", data);

        if (!response.ok) {
            alert("Login inválido");
            return;
        }

        const token = data.access_token;

        localStorage.setItem("token", token);

        // 🔥 decodificar o token
        const payload = parseJwt(token);

        console.log("Payload:", payload);

        // 🔥 buscar dados do usuário (porque o token não tem is_superuser)
        const responseUser = await fetch(`${API_URL}/users/${parseInt(payload.sub)}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const user = await responseUser.json();

        console.log("Usuário:", user);

        // 🔥 salvar dados úteis
        localStorage.setItem("user_id", user.id_usuario);
        localStorage.setItem("is_superuser", user.is_superuser);

        // 🔥 redirecionamento correto
        if (user.is_superuser) {
            window.location.href = "dashboard.html";
        } else {
            window.location.href = "profile.html";
        }

    } catch (error) {
        console.error("Erro geral:", error);
    }
}