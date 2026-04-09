// =======================
// ESTADO GLOBAL
// =======================
let currentUser = null;
let currentPostulante = null;

document.addEventListener("DOMContentLoaded", () => {
    // 1. Validar Sesión
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || currentUser.rol !== "postulante") {
        alert("Acceso denegado. Debes iniciar sesión como candidato.");
        // Ajusta la ruta del login según tu estructura real
        window.location.href = "../../auth/login.html"; 
        return;
    }

    // 2. Cargar datos del postulante logueado
    const postulantes = JSON.parse(localStorage.getItem("postulantes")) || [];
    currentPostulante = postulantes.find(p => p.user_id === currentUser.id);

    if (!currentPostulante) {
        alert("Error: Perfil de postulante no encontrado.");
        return;
    }

    renderProfileInfo();
    renderMisPostulaciones();
    setupEditForm();
});

// =======================
// RENDERIZAR PERFIL
// =======================
function renderProfileInfo() {
    document.getElementById("profileFoto").src = currentPostulante.foto || "https://via.placeholder.com/150";
    document.getElementById("profileName").innerText = `${currentPostulante.nombre} ${currentPostulante.apellidos}`;
    document.getElementById("profileProfession").innerText = currentPostulante.profesion;
    
    document.getElementById("profileLocation").innerText = currentPostulante.ubicacion;
    document.getElementById("profilePhone").innerText = currentPostulante.telefono;
    document.getElementById("profileEducation").innerText = `${currentPostulante.nivel_educacion} en ${currentPostulante.institucion}`;
    document.getElementById("profileExperience").innerText = currentPostulante.experiencia_anios;
    document.getElementById("profileSalary").innerText = currentPostulante.expectativa_salarial;

    // Renderizar habilidades
    const skillsContainer = document.getElementById("profileSkills");
    skillsContainer.innerHTML = "";
    if (currentPostulante.habilidades && currentPostulante.habilidades.length > 0) {
        currentPostulante.habilidades.forEach(skill => {
            skillsContainer.innerHTML += `<span class="tag">${skill.trim()}</span>`;
        });
    } else {
        skillsContainer.innerHTML = "<span class='text-muted'>Sin habilidades registradas</span>";
    }

    // Botones de acción
    document.getElementById("profileCV").href = currentPostulante.cv_url || "#";
    document.getElementById("profileLinkedIn").href = currentPostulante.linkedin || "#";
}

// =======================
// RENDERIZAR POSTULACIONES
// =======================
function renderMisPostulaciones() {
    const postulaciones = JSON.parse(localStorage.getItem("postulaciones")) || [];
    const ofertas = JSON.parse(localStorage.getItem("ofertas")) || [];
    const empresas = JSON.parse(localStorage.getItem("empresas")) || [];
    
    const container = document.getElementById("postulacionesContainer");
    container.innerHTML = "";

    // Filtrar solo las postulaciones de este usuario
    const misPostulaciones = postulaciones.filter(p => p.postulante_id === currentPostulante.id);

    if (misPostulaciones.length === 0) {
        container.innerHTML = "<p>Aún no te has postulado a ninguna oferta.</p>";
        return;
    }

    misPostulaciones.forEach(postulacion => {
        const oferta = ofertas.find(o => o.id === postulacion.oferta_id);
        const empresa = oferta ? empresas.find(e => e.id === oferta.empresa_id) : null;

        if(oferta && empresa) {
            let statusColor = "#f39c12"; // pendiente
            if(postulacion.estado === "visto") statusColor = "#3498db";
            if(postulacion.estado === "entrevista") statusColor = "#2ecc71";
            if(postulacion.estado === "rechazado") statusColor = "#e74c3c";

            container.innerHTML += `
                <div class="postulacion-card">
                    <div class="postulacion-header">
                        <h3>${oferta.titulo}</h3>
                        <span class="status-badge" style="background-color: ${statusColor}">
                            ${postulacion.estado.toUpperCase()}
                        </span>
                    </div>
                    <p class="empresa-name">🏢 ${empresa.nombre}</p>
                    <p class="fecha-post">📅 Postulado el: ${new Date(postulacion.fecha_postulacion).toLocaleDateString()}</p>
                    <button class="btn btn-outline btn-sm" onclick="verDetallesPostulacion(${postulacion.id})" style="margin-top: 10px;">
                        Ver Detalles
                    </button>
                </div>
            `;
        }
    });
}

// =======================
// MODAL DE DETALLES
// =======================
function verDetallesPostulacion(postulacionId) {
    const postulaciones = JSON.parse(localStorage.getItem("postulaciones")) || [];
    const ofertas = JSON.parse(localStorage.getItem("ofertas")) || [];
    const empresas = JSON.parse(localStorage.getItem("empresas")) || [];
    const categorias = JSON.parse(localStorage.getItem("categorias")) || [];

    const postulacion = postulaciones.find(p => p.id === postulacionId);
    if (!postulacion) return;

    const oferta = ofertas.find(o => o.id === postulacion.oferta_id);
    const empresa = empresas.find(e => e.id === oferta.empresa_id);
    const categoria = categorias.find(c => c.id === oferta.categoria_id);

    const modalBody = document.getElementById("modalBody");

    let statusColor = "#f39c12"; 
    if(postulacion.estado === "visto") statusColor = "#3498db";
    if(postulacion.estado === "entrevista") statusColor = "#2ecc71";
    if(postulacion.estado === "rechazado") statusColor = "#e74c3c";

    modalBody.innerHTML = `
        <h2 style="color: var(--primary); margin-top: 0;">${oferta.titulo}</h2>
        <p style="font-size: 16px; color: #555; font-weight: bold;">🏢 Empresa: ${empresa.nombre} (${empresa.sector})</p>
        <hr style="margin: 15px 0; border: 0; border-top: 1px solid #eee;">
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; font-size: 14px;">
            <p><strong>📍 Ubicación:</strong> ${oferta.ubicacion}</p>
            <p><strong>💻 Modalidad:</strong> ${oferta.modalidad}</p>
            <p><strong>💰 Sueldo:</strong> S/ ${oferta.sueldo}</p>
            <p><strong>🏷️ Categoría:</strong> ${categoria ? categoria.nombre : 'General'}</p>
        </div>

        <h3 style="font-size: 16px; margin-bottom: 5px;">Descripción del Puesto</h3>
        <p style="line-height: 1.5; color: #444; font-size: 14px;">${oferta.descripcion}</p>
        
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 25px; border-left: 5px solid ${statusColor};">
            <h3 style="margin: 0 0 10px 0; font-size: 16px;">Seguimiento de tu Postulación</h3>
            <p style="margin: 5px 0; font-size: 14px;"><strong>📅 Fecha de envío:</strong> ${new Date(postulacion.fecha_postulacion).toLocaleString()}</p>
            <p style="margin: 5px 0; font-size: 14px;"><strong>📌 Estado:</strong> <span style="color: ${statusColor}; font-weight: bold;">${postulacion.estado.toUpperCase()}</span></p>
            <p style="margin: 5px 0; font-size: 14px;">
                <strong>💬 Comentario de la Empresa:</strong> 
                ${postulacion.comentario ? `<em>"${postulacion.comentario}"</em>` : `<span style="color: #999;">Aún no hay comentarios.</span>`}
            </p>
        </div>
    `;

    const modal = document.getElementById("postulacionModal");
    modal.classList.remove("hidden");
    modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById("postulacionModal");
    modal.style.display = "none";
    modal.classList.add("hidden");
}

// Cerrar modal al hacer clic afuera
window.onclick = function(event) {
    const modal = document.getElementById("postulacionModal");
    if (event.target === modal) {
        closeModal();
    }
}

// =======================
// FORMULARIO DE EDICIÓN
// =======================
function toggleEditMode() {
    const viewSection = document.getElementById("viewPostulaciones");
    const editSection = document.getElementById("editProfileSection");

    if (editSection.classList.contains("hidden")) {
        viewSection.classList.add("hidden");
        editSection.classList.remove("hidden");
        fillEditForm(); 
    } else {
        editSection.classList.add("hidden");
        viewSection.classList.remove("hidden");
    }
}

function fillEditForm() {
    document.getElementById("editNombre").value = currentPostulante.nombre || "";
    document.getElementById("editApellidos").value = currentPostulante.apellidos || "";
    document.getElementById("editNacimiento").value = currentPostulante.fecha_nacimiento || "";
    document.getElementById("editDNI").value = currentPostulante.dni || "";
    document.getElementById("editTelefono").value = currentPostulante.telefono || "";
    document.getElementById("editUbicacion").value = currentPostulante.ubicacion || "";
    document.getElementById("editNivelEducacion").value = currentPostulante.nivel_educacion || "Universitario Completo";
    document.getElementById("editInstitucion").value = currentPostulante.institucion || "";
    document.getElementById("editProfesion").value = currentPostulante.profesion || "";
    document.getElementById("editExperiencia").value = currentPostulante.experiencia_anios || 0;
    document.getElementById("editViajar").value = currentPostulante.disponibilidad_viajar || "Si";
    document.getElementById("editSueldo").value = currentPostulante.expectativa_salarial || 0;
    document.getElementById("editHabilidades").value = (currentPostulante.habilidades || []).join(", ");
    document.getElementById("editLinkedin").value = currentPostulante.linkedin || "";
    document.getElementById("editFoto").value = currentPostulante.foto || "";
    document.getElementById("editCV").value = currentPostulante.cv_url || "";
}

function setupEditForm() {
    const form = document.getElementById("editProfileForm");
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const habilidadesArray = document.getElementById("editHabilidades").value
            .split(",")
            .map(s => s.trim())
            .filter(s => s !== "");

        currentPostulante.nombre = document.getElementById("editNombre").value;
        currentPostulante.apellidos = document.getElementById("editApellidos").value;
        currentPostulante.fecha_nacimiento = document.getElementById("editNacimiento").value;
        currentPostulante.dni = document.getElementById("editDNI").value;
        currentPostulante.telefono = document.getElementById("editTelefono").value;
        currentPostulante.ubicacion = document.getElementById("editUbicacion").value;
        currentPostulante.nivel_educacion = document.getElementById("editNivelEducacion").value;
        currentPostulante.institucion = document.getElementById("editInstitucion").value;
        currentPostulante.profesion = document.getElementById("editProfesion").value;
        currentPostulante.experiencia_anios = parseInt(document.getElementById("editExperiencia").value);
        currentPostulante.disponibilidad_viajar = document.getElementById("editViajar").value;
        currentPostulante.expectativa_salarial = parseFloat(document.getElementById("editSueldo").value);
        currentPostulante.habilidades = habilidadesArray;
        currentPostulante.linkedin = document.getElementById("editLinkedin").value;
        currentPostulante.foto = document.getElementById("editFoto").value;
        currentPostulante.cv_url = document.getElementById("editCV").value;

        let postulantes = JSON.parse(localStorage.getItem("postulantes")) || [];
        const index = postulantes.findIndex(p => p.id === currentPostulante.id);
        
        if (index !== -1) {
            postulantes[index] = currentPostulante;
            localStorage.setItem("postulantes", JSON.stringify(postulantes));
            
            alert("¡Perfil actualizado con éxito!");
            renderProfileInfo(); 
            toggleEditMode();    
        } else {
            alert("Error al guardar el perfil.");
        }
    });
}