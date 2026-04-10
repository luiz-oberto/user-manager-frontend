export function getUserFromToken() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch {
        return null;
    }
}

export function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}

export function initAuthEvents() {
    document.querySelectorAll("#logoutBtn, .logoutBtn").forEach(btn => {
        btn.addEventListener("click", logout);
    });
}

document.addEventListener("DOMContentLoaded", initAuthEvents);