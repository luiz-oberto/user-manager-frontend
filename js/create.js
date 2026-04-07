function initCreatePage() {
    if (!checkAuth()) return;
    if (!checkSuperUserAccess()) return;
}