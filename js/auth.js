async function login() {
    console.log("Botão clicado");

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

        localStorage.setItem("token", data.access_token);

        console.log("Redirecionando...");

        window.location.href = "dashboard.html";

    } catch (error) {
        console.error("Erro geral:", error);
    }
}