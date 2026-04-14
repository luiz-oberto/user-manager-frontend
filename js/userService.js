/* =========================
   BASE REQUEST
========================= */

async function apiRequest(url, options = {}) {
    const response = await fetch(url, {
        headers: getHeaders(),
        ...options
    });

    let data;

    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (!response.ok) {
        const message = data?.detail || "Erro na requisição";
        throw new Error(message);
    }

    return data;
}

/* =========================
   USERS
========================= */

function fetchUsers() {
    return apiRequest(`${API_URL}/users/`);
}

function getUserById(id) {
    return apiRequest(`${API_URL}/users/${id}`);
}

function createUserRequest(userData) {
    return apiRequest(`${API_URL}/users/`, {
        method: "POST",
        body: JSON.stringify(userData)
    });
}

function updateUserRequest(id, userData) {
    return apiRequest(`${API_URL}/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(userData)
    });
}

function deleteUserRequest(id) {
    return apiRequest(`${API_URL}/users/${id}`, {
        method: "DELETE"
    });
}