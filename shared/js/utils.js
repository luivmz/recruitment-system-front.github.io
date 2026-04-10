// ==========================
// LOAD COMPONENT
// ==========================
async function loadComponent(id, file) {
    try {
        const response = await fetch(file);
        const data = await response.text();
        const element = document.getElementById(id);
        if (element) {
            element.innerHTML = data;
        }
    } catch (error) {
        console.error("Error cargando componente:", file, error);
    }
}

// ==========================
// BASE PATH
// ==========================
function getBasePath() {
    const path = window.location.pathname;

    if (
        path.includes("/management/admin") ||
        path.includes("/management/candidates") ||
        path.includes("/management/companies") ||
        path.includes("/management/worker")
    ) {
        return "../../";
    }

    if (
        path.includes("/auth/") ||
        path.includes("/management/") ||
        path.includes("/static/")
    ) {
        return "../";
    }

    return "";
}

// ==========================
// LOGOUT
// ==========================
function logout() {
    localStorage.removeItem("currentUser");
    const base = getBasePath();
    window.location.href = base + "index.html"; 
}

// ==========================
// INIT COMPONENTS + NAVBAR
// ==========================
document.addEventListener("DOMContentLoaded", async () => {

    const base = getBasePath();

    // 🔹 1. Cargar componentes
    await loadComponent("navbar", base + "shared/components/navbar.html");
    await loadComponent("footer", base + "shared/components/footer.html");

    // 🔹 2. CONFIGURAR LOGO DINÁMICO (Para que la imagen cargue desde cualquier carpeta)
    const navBrand = document.getElementById("navBrand");
    if (navBrand) {
        navBrand.href = base + "index.html";
        navBrand.innerHTML = `
            <img src="${base}shared/assets/images/logo.png" alt="TalentoHub Logo" class="navbar-logo" onerror="this.style.display='none'">
            <span>TalentoHub</span>
        `;
    }

    // 🔹 3. CONFIGURAR ENLACE DINÁMICO DE CONTACTO EN FOOTER
    const footerContact = document.getElementById("footerContact");
    if (footerContact) {
        footerContact.href = base + "static/contact.html";
    }

    // 🔹 4. RENDERIZAR ENLACES DEL MENÚ (navLinks)
    const nav = document.getElementById("navLinks");
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!nav) return;

    // 🔓 NO LOGUEADO
    if (!user) {
        nav.innerHTML = `
            <a href="${base}index.html">Inicio</a>
            <a href="${base}auth/login.html">Iniciar sesión</a>
            <a href="${base}static/advertising.html">Publicidad</a>
            <a href="${base}management/jobs.html">Trabajos</a>
            <a href="${base}management/workers.html">Buscar Candidatos</a>
        `;
    }

    // 🔐 LOGUEADO
    else {
        let extra = "";

        if (user.rol === "admin") {
            extra = `<span class="badge">Admin (${user.email})</span>
            <a href="${base}management/admin/dashboard_admin.html">Dashboard</a>`;
        }

        if (user.rol === "empresa") {
            extra = `<span class="badge">Empresa (${user.email})</span>
            <a href="${base}management/companies/dashboard_company.html">Dashboard</a>`;
        }

        if (user.rol === "postulante") {
            extra = `<span class="badge">Postulante (${user.email})</span>
            <a href="${base}management/candidates/dashboard_candidate.html">Dashboard</a> `;
        }

        nav.innerHTML = `
            ${extra}
            <a href="${base}index.html">Inicio</a>
            <a href="${base}static/advertising.html">Publicidad</a>
            <a href="${base}management/jobs.html">Trabajos</a>
            <a href="${base}management/workers.html">Buscar Candidatos</a>
            <a href="#" onclick="logout()" style="color: #ff6b6b;">Cerrar sesión</a>
        `;
    }
});