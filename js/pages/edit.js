document.addEventListener("DOMContentLoaded", () => {
    if (!checkAuth()) return;
    if (!checkSuperUserAccess()) return;

    initEditEvents();
    loadUser(); // vem do user.js
});

/* =========================
   EVENTS
========================= */

function initEditEvents() {
    document.getElementById("updateUserBtn")?.addEventListener("click", updateUser);

    document.getElementById("deleteUserBtn")?.addEventListener("click", confirmDelete);
}

/* =========================
   DELETE CONFIRM
========================= */

function confirmDelete() {
    if (!confirm("Tem certeza que deseja deletar este usuário?")) return;

    deleteUser(); // vem do user.js
}