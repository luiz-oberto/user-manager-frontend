document.addEventListener("DOMContentLoaded", () => {
    if (!checkAuth()) return;
    if (!checkSuperUserAccess()) return;

    bindCreateUser();
});

/* =========================
   EVENTS
========================= */

function bindCreateUser() {
    const btn = document.getElementById("createUserBtn");
    if (!btn) return;

    btn.addEventListener("click", createUser);
}