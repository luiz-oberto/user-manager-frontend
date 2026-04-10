const API_URL = "/api";

export function getToken() {
    return localStorage.getItem("token");
}

export function getHeaders() {
    const token = getToken();
    return {
        "Content-Type": "application/json",
        ...(token && { "Authorization": `Bearer ${token}` })
    };
}

export function checkAuth() {
    if (!getToken()) {
        window.location.href = "index.html";
        return false;
    }
    return true;
}

export function parseJwt(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch {
        return null;
    }
}

export function checkSuperUserAccess() {
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