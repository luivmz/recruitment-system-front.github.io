// =======================
// ESTADO GLOBAL
// =======================
let currentUser = null;
let currentEmpresaId = null;
let currentOfertaId = null;

document.addEventListener("DOMContentLoaded", () => {
    // 1. Validar Sesión
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || currentUser.rol !== "empresa") {
        alert("Acceso denegado. Debes iniciar sesión como Empresa.");
        window.location.href = "../../auth/login.html"; 
        return;
    }

    cargarCategorias();
    renderMisEmpresas();

    // Event Listeners de Formularios
    document.getElementById("formNuevaEmpresa").addEventListener("submit", registrarEmpresa);
    document.getElementById("formNuevaOferta").addEventListener("submit", publicarOferta);
});

// =======================
// NAVEGACIÓN ENTRE VISTAS
// =======================
function showView(viewId) {
    document.getElementById("view-empresas").classList.add("hidden");
    document.getElementById("view-ofertas").classList.add("hidden");
    document.getElementById("view-postulantes").classList.add("hidden");
    
    document.getElementById(viewId).classList.remove("hidden");
}

// =======================
// VISTA 1: MIS EMPRESAS
// =======================
function renderMisEmpresas() {
    const empresas = JSON.parse(localStorage.getItem("empresas")) || [];
    const container = document.getElementById("empresasList");
    container.innerHTML = "";

    // Filtrar empresas que pertenecen al usuario logueado
    const misEmpresas = empresas.filter(e => e.user_id === currentUser.id);

    if (misEmpresas.length === 0) {
        container.innerHTML = "<p>No tienes empresas registradas. ¡Registra una para empezar a publicar ofertas!</p>";
        return;
    }

    misEmpresas.forEach(emp => {
        container.innerHTML += `
            <div class="card">
                <div class="card-header">
                    <img src="${emp.logo || 'https://via.placeholder.com/50'}" alt="Logo" class="card-logo">
                    <div>
                        <h3 class="card-title">${emp.nombre}</h3>
                        <p class="card-subtitle">${emp.sector} | ${emp.ubicacion}</p>
                    </div>
                </div>
                <div class="card-body">
                    <p><strong>RUC:</strong> ${emp.ruc}</p>
                    <p><strong>Contacto:</strong> ${emp.contacto_nombre}</p>
                </div>
                <div class="card-actions">
                    <button class="btn btn-primary btn-sm" onclick="verOfertas(${emp.id}, '${emp.nombre}')">Ver Ofertas Publicadas</button>
                </div>
            </div>
        `;
    });
}

function registrarEmpresa(e) {
    e.preventDefault();
    let empresas = JSON.parse(localStorage.getItem("empresas")) || [];
    
    const nuevaEmpresa = {
        id: Date.now(), // ID único
        user_id: currentUser.id, // Vinculación directa
        ruc: document.getElementById("empRuc").value,
        razon_social: document.getElementById("empRazon").value,
        nombre: document.getElementById("empNombre").value,
        sector: document.getElementById("empSector").value,
        tamano: document.getElementById("empTamano").value,
        ubicacion: document.getElementById("empUbicacion").value,
        telefono: document.getElementById("empTelefono").value,
        web: document.getElementById("empWeb").value,
        contacto_nombre: document.getElementById("empContacto").value,
        contacto_cargo: document.getElementById("empCargo").value,
        descripcion: document.getElementById("empDesc").value,
        logo: document.getElementById("empLogo").value || `https://api.dicebear.com/7.x/initials/svg?seed=${document.getElementById("empNombre").value}`
    };

    empresas.push(nuevaEmpresa);
    localStorage.setItem("empresas", JSON.stringify(empresas));
    
    closeModal('modalNuevaEmpresa');
    document.getElementById("formNuevaEmpresa").reset();
    renderMisEmpresas();
    alert("¡Empresa registrada con éxito!");
}

// =======================
// VISTA 2: OFERTAS
// =======================
function verOfertas(empresaId, empresaNombre) {
    currentEmpresaId = empresaId;
    document.getElementById("ofertasTitle").innerText = `Ofertas de: ${empresaNombre}`;
    
    renderOfertas();
    showView('view-ofertas');
}

function renderOfertas() {
    const ofertas = JSON.parse(localStorage.getItem("ofertas")) || [];
    const postulaciones = JSON.parse(localStorage.getItem("postulaciones")) || [];
    const container = document.getElementById("ofertasList");
    container.innerHTML = "";

    const misOfertas = ofertas.filter(o => o.empresa_id === currentEmpresaId);

    if (misOfertas.length === 0) {
        container.innerHTML = "<p>No tienes ofertas publicadas para esta empresa.</p>";
        return;
    }

    misOfertas.forEach(oferta => {
        // Contar postulantes para esta oferta
        const cantPostulantes = postulaciones.filter(p => p.oferta_id === oferta.id).length;
        const badgeClass = oferta.estado === 'activa' ? 'badge-activa' : 'badge-cerrada';

        container.innerHTML += `
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">${oferta.titulo} <span class="${badgeClass}">${oferta.estado.toUpperCase()}</span></h3>
                    <p class="card-subtitle" style="margin-bottom: 10px;">📅 ${oferta.fecha_creacion} | 📍 ${oferta.ubicacion}</p>
                    <p><strong>Modalidad:</strong> ${oferta.modalidad}</p>
                    <p><strong>Sueldo:</strong> S/ ${oferta.sueldo}</p>
                    <p style="margin-top:10px; color:var(--primary); font-weight:bold;">👤 ${cantPostulantes} Candidatos postulados</p>
                </div>
                <div class="card-actions">
                    <button class="btn btn-secondary btn-sm" onclick="verPostulantes(${oferta.id}, '${oferta.titulo}')">Revisar Candidatos</button>
                </div>
            </div>
        `;
    });
}

function publicarOferta(e) {
    e.preventDefault();
    let ofertas = JSON.parse(localStorage.getItem("ofertas")) || [];
    
    const nuevaOferta = {
        id: Date.now(), // ID único temporal
        empresa_id: currentEmpresaId, // Vinculada a la empresa actual
        titulo: document.getElementById("ofTitulo").value,
        categoria_id: parseInt(document.getElementById("ofCategoria").value),
        descripcion: document.getElementById("ofDesc").value,
        sueldo: parseFloat(document.getElementById("ofSueldo").value),
        modalidad: document.getElementById("ofModalidad").value,
        ubicacion: document.getElementById("ofUbicacion").value,
        estado: "activa",
        fecha_creacion: new Date().toISOString().split('T')[0] // YYYY-MM-DD
    };

    ofertas.push(nuevaOferta);
    localStorage.setItem("ofertas", JSON.stringify(ofertas));
    
    closeModal('modalNuevaOferta');
    document.getElementById("formNuevaOferta").reset();
    renderOfertas();
    alert("¡Oferta publicada exitosamente!");
}

// =======================
// VISTA 3: POSTULANTES
// =======================
function verPostulantes(ofertaId, ofertaTitulo) {
    currentOfertaId = ofertaId;
    document.getElementById("postulantesTitle").innerText = `Candidatos para: ${ofertaTitulo}`;
    
    renderPostulantes();
    showView('view-postulantes');
}

function renderPostulantes() {
    const postulaciones = JSON.parse(localStorage.getItem("postulaciones")) || [];
    const postulantesData = JSON.parse(localStorage.getItem("postulantes")) || [];
    const container = document.getElementById("postulantesList");
    container.innerHTML = "";

    const postulacionesOferta = postulaciones.filter(p => p.oferta_id === currentOfertaId);

    if (postulacionesOferta.length === 0) {
        container.innerHTML = "<p>Aún no hay candidatos postulados para esta oferta.</p>";
        return;
    }

    postulacionesOferta.forEach(postulacion => {
        const candidato = postulantesData.find(p => p.id === postulacion.postulante_id);
        if(!candidato) return;

        container.innerHTML += `
            <div class="applicant-card">
                <div class="applicant-info">
                    <img src="${candidato.foto || 'https://via.placeholder.com/60'}" class="applicant-foto" alt="Foto">
                    <div class="applicant-details">
                        <h3>${candidato.nombre} ${candidato.apellidos}</h3>
                        <p><strong>Profesión:</strong> ${candidato.profesion} | <strong>Exp:</strong> ${candidato.experiencia_anios} años</p>
                        <p><strong>Educación:</strong> ${candidato.nivel_educacion}</p>
                        <div style="margin-top: 5px;">
                            <a href="${candidato.cv_url}" target="_blank" class="btn btn-outline btn-sm">Ver CV</a>
                            <a href="${candidato.linkedin}" target="_blank" class="btn btn-outline btn-sm">LinkedIn</a>
                        </div>
                    </div>
                </div>
                <div class="applicant-actions">
                    <label>Estado del proceso:</label>
                    <select onchange="cambiarEstadoPostulacion(${postulacion.id}, this.value)" 
                        style="border-color: ${getColorEstado(postulacion.estado)}">
                        <option value="pendiente" ${postulacion.estado === 'pendiente' ? 'selected' : ''}>Pendiente</option>
                        <option value="visto" ${postulacion.estado === 'visto' ? 'selected' : ''}>Visto</option>
                        <option value="entrevista" ${postulacion.estado === 'entrevista' ? 'selected' : ''}>Entrevista</option>
                        <option value="rechazado" ${postulacion.estado === 'rechazado' ? 'selected' : ''}>Rechazado</option>
                    </select>
                </div>
            </div>
        `;
    });
}

function cambiarEstadoPostulacion(postulacionId, nuevoEstado) {
    let postulaciones = JSON.parse(localStorage.getItem("postulaciones")) || [];
    const index = postulaciones.findIndex(p => p.id === postulacionId);
    
    if (index !== -1) {
        postulaciones[index].estado = nuevoEstado;
        localStorage.setItem("postulaciones", JSON.stringify(postulaciones));
        renderPostulantes(); // Re-renderizar para actualizar el color
    }
}

function getColorEstado(estado) {
    if(estado === 'visto') return '#3498db';
    if(estado === 'entrevista') return '#2ecc71';
    if(estado === 'rechazado') return '#e74c3c';
    return '#f39c12'; // Pendiente
}

// =======================
// UTILIDADES (MODALES Y SELECTS)
// =======================
function cargarCategorias() {
    const categorias = JSON.parse(localStorage.getItem("categorias")) || [];
    const select = document.getElementById("ofCategoria");
    categorias.forEach(cat => {
        select.innerHTML += `<option value="${cat.id}">${cat.nombre}</option>`;
    });
}

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
    document.getElementById(modalId).classList.remove('hidden');
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.getElementById(modalId).classList.add('hidden');
}