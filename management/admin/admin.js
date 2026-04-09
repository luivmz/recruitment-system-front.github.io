let usuarios = [];
let postulantes = [];
let empresas = [];
let ofertas = [];

document.addEventListener("DOMContentLoaded", () => {
    cargarDatos();
    renderResumen();
    renderUsuarios();
    renderEmpresas();
});

function cargarDatos() {
    usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    postulantes = JSON.parse(localStorage.getItem("postulantes")) || [];
    empresas = JSON.parse(localStorage.getItem("empresas")) || [];
    ofertas = JSON.parse(localStorage.getItem("ofertas")) || [];
}

function showSection(sectionId) {
    document.querySelectorAll('.admin-section').forEach(s => s.classList.add('hidden'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    
    document.getElementById(`sec-${sectionId}`).classList.remove('hidden');
    event.currentTarget.classList.add('active');
}

// --- GESTIÓN DE USUARIOS/POSTULANTES ---
function renderUsuarios() {
    const tbody = document.getElementById("tableUsers");
    tbody.innerHTML = "";

    postulantes.forEach(p => {
        const userAuth = usuarios.find(u => u.id === p.user_id);
        tbody.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td><strong>${p.nombre} ${p.apellidos}</strong></td>
                <td>${userAuth ? userAuth.email : 'N/A'}</td>
                <td>${p.profesion}</td>
                <td>
                    <button class="btn-action btn-view" onclick="verDetallePostulante(${p.id})">Ver Datos</button>
                    <button class="btn-action btn-delete" onclick="eliminarUsuario(${p.user_id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

// --- GESTIÓN DE EMPRESAS ---
function renderEmpresas() {
    const tbody = document.getElementById("tableCompanies");
    tbody.innerHTML = "";

    empresas.forEach(e => {
        const userAuth = usuarios.find(u => u.id === e.user_id);
        const totalOfertas = ofertas.filter(o => o.empresa_id === e.id).length;

        tbody.innerHTML += `
            <tr>
                <td>${e.id}</td>
                <td><strong>${e.nombre}</strong></td>
                <td>${e.sector}</td>
                <td>${userAuth ? userAuth.email : 'N/A'} (ID: ${e.user_id})</td>
                <td><span class="badge">${totalOfertas} ofertas</span></td>
                <td>
                    <button class="btn-action btn-view" onclick="verDetalleEmpresa(${e.id})">Detalles</button>
                    <button class="btn-action btn-delete" onclick="eliminarEmpresa(${e.id})">Baja</button>
                </td>
            </tr>
        `;
    });
}

// --- ACCIONES ---
function verDetallePostulante(id) {
    const p = postulantes.find(x => x.id === id);
    const modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = `
        <h3>Ficha del Postulante</h3>
        <hr>
        <p><strong>Nombre:</strong> ${p.nombre} ${p.apellidos}</p>
        <p><strong>Ubicación:</strong> ${p.ubicacion}</p>
        <p><strong>Teléfono:</strong> ${p.telefono}</p>
        <p><strong>Educación:</strong> ${p.nivel_educacion}</p>
        <p><strong>Habilidades:</strong> ${p.habilidades.join(", ")}</p>
        <p><strong>Expectativa:</strong> S/ ${p.expectativa_salarial}</p>
    `;
    document.getElementById("adminModal").classList.remove("hidden");
}

function verDetalleEmpresa(id) {
    const e = empresas.find(x => x.id === id);
    const modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = `
        <h3>Ficha de Empresa</h3>
        <hr>
        <p><strong>Razón Social:</strong> ${e.nombre}</p>
        <p><strong>Sector:</strong> ${e.sector}</p>
        <p><strong>Web:</strong> <a href="${e.web}" target="_blank">${e.web}</a></p>
        <p><strong>Ubicación:</strong> ${e.ubicacion}</p>
        <p><strong>Descripción:</strong> ${e.descripcion}</p>
    `;
    document.getElementById("adminModal").classList.remove("hidden");
}

function closeAdminModal() {
    document.getElementById("adminModal").classList.add("hidden");
}

function renderResumen() {
    const metrics = document.getElementById("metrics");
    metrics.innerHTML = `
        <div class="card-metric"><h3>${usuarios.length}</h3><p>Usuarios Totales</p></div>
        <div class="card-metric"><h3>${empresas.length}</h3><p>Empresas</p></div>
        <div class="card-metric"><h3>${ofertas.length}</h3><p>Ofertas Activas</p></div>
    `;
}

// Implementación simple de eliminar
function eliminarUsuario(userId) {
    if(confirm("¿Estás seguro de eliminar este usuario? Se perderán todos sus datos.")) {
        usuarios = usuarios.filter(u => u.id !== userId);
        postulantes = postulantes.filter(p => p.user_id !== userId);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        localStorage.setItem("postulantes", JSON.stringify(postulantes));
        renderUsuarios();
        renderResumen();
    }
}