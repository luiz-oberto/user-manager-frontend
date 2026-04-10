const API_URL = "/api";

function getToken() {
    return localStorage.getItem("token");
}

function getHeaders() {
    const token = getToken();
    return {
        "Content-Type": "application/json",
        ...(token && { "Authorization": `Bearer ${token}` })
    };
}

function checkAuth() {
    if (!getToken()) {
        window.location.href = "index.html";
        return false;
    }
    return true;
}

function parseJwt(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch {
        return null;
    }
}

function checkSuperUserAccess() {
    const user = getUserFromToken();

    if (!user) {
        window.location.href = "index.html";
        return false;
    }

    if (!user.is_superuser) {
        showWarning("Acesso restrito!");
        window.location.href = "profile.html";
        return false;
    }

    return true;
}