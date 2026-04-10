function showAlert(message, type = "info", duration = 3000) {
    const container = document.getElementById("alertContainer");
    if (!container) return;

    const alert = document.createElement("div");
    alert.className = `custom-alert alert-${type}`;

    const messageSpan = document.createElement("span");
    messageSpan.textContent = message;

    const closeBtn = document.createElement("span");
    closeBtn.className = "alert-close";
    closeBtn.innerHTML = "&times;";

    closeBtn.addEventListener("click", () => {
        alert.remove();
    });

    alert.appendChild(messageSpan);
    alert.appendChild(closeBtn);

    container.appendChild(alert);

    setTimeout(() => {
        alert.style.opacity = "0";
        alert.style.transform = "translateX(30px)";
        setTimeout(() => alert.remove(), 300);
    }, duration);
}

/* atalhos */

const showSuccess = (msg) => showAlert(msg, "success");
const showError = (msg) => showAlert(msg, "error");
const showWarning = (msg) => showAlert(msg, "warning");
const showInfo = (msg) => showAlert(msg, "info");