async function loadProfile() {
    checkAuth();

    const userId = localStorage.getItem("user_id");

    const response = await fetch(`${API_URL}/users/${userId}`, {
        headers: getHeaders()
    });

    const user = await response.json();

    document.getElementById("profile").innerHTML = `
        <p><strong>Nome:</strong> ${user.nome}</p>
        <p><strong>Email:</strong> ${user.email}</p>
    `;
}