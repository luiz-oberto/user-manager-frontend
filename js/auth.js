async function login() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const response = await fetch(`${API_URL}/token`, {
        method: "POST",
        body: new URLSearchParams({
            username: email,
            password: senha
        })
    });

    if (!response.ok) {
        alert("Login inválido");
        return;
    }

    const data = await response.json();

    localStorage.setItem("token", data.access_token);

    localStorage.setItem("user_id", data.user_id); // <-- ajuste se necessário

    window.location.href = "dashboard.html";
    console.log(data);
}