async function loadProfile() {
    checkAuth();

    const userId = parseInt(localStorage.getItem("user_id"));

    if (!userId) {
        alert("Usuário não identificado");
        return;
    }

    const response = await fetch(`${API_URL}/users/${userId}`, {
        headers: getHeaders()
    });

    const user = await response.json();

    document.getElementById("profile").innerHTML = `
        <p><strong>Nome:</strong> ${user.nome}</p>
        <p><strong>Email:</strong> ${user.email}</p>
    `;
}