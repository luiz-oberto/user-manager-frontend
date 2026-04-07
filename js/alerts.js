function showAlert(message, type = "info", duration = 3000) {
    const container = document.getElementById("alertContainer");
    if (!container) return;

    const alert = document.createElement("div");
    alert.className = `custom-alert alert-${type}`;

    alert.innerHTML = `
        <span>${message}</span>
        <span class="alert-close">&times;</span>
    `;

    // botão fechar
    alert.querySelector(".alert-close").onclick = () => {
        alert.remove();
    };

    container.appendChild(alert);

    // auto remove
    setTimeout(() => {
        alert.style.opacity = "0";
        alert.style.transform = "translateX(30px)";
        setTimeout(() => alert.remove(), 300);
    }, duration);
}

/* atalhos */

function showSuccess(msg) {
    showAlert(msg, "success");
}

function showError(msg) {
    showAlert(msg, "error");
}

function showWarning(msg) {
    showAlert(msg, "warning");
}

function showInfo(msg) {
    showAlert(msg, "info");
}