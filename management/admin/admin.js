// =======================
// ESTADO GLOBAL
// =======================
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

// =======================
// MÉTRICAS (RESUMEN)
// =======================
function renderResumen() {
    const metrics = document.getElementById("metrics");
    // SEMÁNTICA: Usamos <article> para englobar cada métrica independiente
    metrics.innerHTML = `
        <article class="card-metric">
            <h3>${usuarios.length}</h3>
            <p>Usuarios Totales</p>
        </article>
        <article class="card-metric">
            <h3>${empresas.length}</h3>
            <p>Empresas</p>
        </article>
        <article class="card-metric">
            <h3>${ofertas.length}</h3>
            <p>Ofertas Activas</p>
        </article>
    `;
}

// =======================
// GESTIÓN DE USUARIOS / POSTULANTES
// =======================
function renderUsuarios() {
    const tbody = document.getElementById("tableUsers");
    tbody.innerHTML = "";

    postulantes.forEach(p => {
        const userAuth = usuarios.find(u => u.id === p.user_id);
        tbody.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td><strong>${p.nombre} ${p.apellidos}</strong></td>
                <td>${userAuth ? userAuth.email : "N/A"}</td>
                <td>${p.profesion}</td>
                <td>
                    <button class="btn-action" style="background:#3b82f6; color:white;" onclick="verPostulante(${p.id})">👁️ Ver</button>
                    <button class="btn-action" style="background:#ef4444; color:white;" onclick="eliminarUsuario(${p.id})">🗑️ Eliminar</button>
                </td>
            </tr>
        `;
    });
}

function filterUsers() {
    const query = document.getElementById("searchUser").value.toLowerCase();
    const rows = document.querySelectorAll("#tableUsers tr");
    
    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(query) ? "" : "none";
    });
}

function verPostulante(id) {
    const p = postulantes.find(x => x.id === id);
    const userAuth = usuarios.find(u => u.id === p.user_id);
    
    const modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = `
        <h3 style="margin-top:0; color:var(--primary);">Ficha del Postulante</h3>
        <hr style="border:0; border-top:1px solid #eee; margin:15px 0;">
        <div style="display:flex; gap:15px; align-items:center; margin-bottom:15px;">
            <img src="${p.foto || 'https://via.placeholder.com/60'}" style="width:60px; height:60px; border-radius:50%; object-fit:cover;">
            <div>
                <p style="margin:0; font-weight:bold; font-size: 18px;">${p.nombre} ${p.apellidos}</p>
                <p style="margin:0; font-size:13px; color:#666;">${userAuth?.email}</p>
            </div>
        </div>
        <p><strong>Ubicación:</strong> ${p.ubicacion}</p>
        <p><strong>Teléfono:</strong> ${p.telefono}</p>
        <p><strong>Profesión:</strong> ${p.profesion}</p>
        <p><strong>Experiencia:</strong> ${p.experiencia_anios} años</p>
        <p style="margin-top: 15px;"><a href="${p.linkedin}" target="_blank" style="color: var(--accent); font-weight:bold; text-decoration:none;">🔗 Ver Perfil LinkedIn</a></p>
    `;
    document.getElementById("adminModal").classList.remove("hidden");
}

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

// =======================
// GESTIÓN DE EMPRESAS
// =======================
function renderEmpresas() {
    const tbody = document.getElementById("tableCompanies");
    tbody.innerHTML = "";

    empresas.forEach(e => {
        const userAuth = usuarios.find(u => u.id === e.user_id);
        const ofertasDeEmpresa = ofertas.filter(o => o.empresa_id === e.id).length;
        
        tbody.innerHTML += `
            <tr>
                <td>${e.id}</td>
                <td>
                    <div style="display:flex; align-items:center; gap:10px;">
                        <img src="${e.logo || 'https://via.placeholder.com/40'}" style="width:30px; height:30px; border-radius:4px; object-fit:cover;">
                        <strong>${e.nombre}</strong>
                    </div>
                </td>
                <td>${e.sector}</td>
                <td>${userAuth ? userAuth.email : "N/A"}</td>
                <td>${ofertasDeEmpresa} activas</td>
                <td>
                    <button class="btn-action" style="background:#3b82f6; color:white;" onclick="verEmpresa(${e.id})">👁️ Ver</button>
                    <button class="btn-action" style="background:#ef4444; color:white;" onclick="eliminarEmpresa(${e.id})">🗑️ Eliminar</button>
                </td>
            </tr>
        `;
    });
}

function filterCompanies() {
    const query = document.getElementById("searchEmpresa").value.toLowerCase();
    const rows = document.querySelectorAll("#tableCompanies tr");
    
    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(query) ? "" : "none";
    });
}

function verEmpresa(id) {
    const e = empresas.find(x => x.id === id);
    
    const modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = `
        <h3 style="margin-top:0; color:var(--primary);">Ficha de Empresa</h3>
        <hr style="border:0; border-top:1px solid #eee; margin:15px 0;">
        <div style="display:flex; gap:15px; align-items:center; margin-bottom:15px;">
            <img src="${e.logo || 'https://via.placeholder.com/60'}" style="width:60px; height:60px; border-radius:8px; object-fit:cover;">
            <div>
                <p style="margin:0; font-weight:bold; font-size: 18px;">${e.nombre}</p>
                <p style="margin:0; font-size:13px; color:#666;">Sector: ${e.sector}</p>
            </div>
        </div>
        <p><strong>Ubicación:</strong> ${e.ubicacion}</p>
        <p><strong>Web:</strong> <a href="${e.web}" target="_blank" style="color:var(--accent); text-decoration:none;">${e.web}</a></p>
        <p style="margin-top:15px; line-height:1.5;"><strong>Descripción:</strong><br> ${e.descripcion}</p>
    `;
    document.getElementById("adminModal").classList.remove("hidden");
}

function eliminarEmpresa(empId) {
    if(confirm("¿Seguro de eliminar esta empresa? Se borrarán sus ofertas también.")) {
        empresas = empresas.filter(e => e.id !== empId);
        ofertas = ofertas.filter(o => o.empresa_id !== empId);
        
        localStorage.setItem("empresas", JSON.stringify(empresas));
        localStorage.setItem("ofertas", JSON.stringify(ofertas));
        
        renderEmpresas();
        renderResumen();
    }
}

// =======================
// UTILIDADES
// =======================
function closeAdminModal() {
    document.getElementById("adminModal").classList.add("hidden");
}