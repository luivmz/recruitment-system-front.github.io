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
    document.getElementById("profileProfession").innerText = currentPostulante.profesion || "Profesión no especificada";
    
    document.getElementById("profileLocation").innerText = currentPostulante.ubicacion || "No registrada";
    document.getElementById("profilePhone").innerText = currentPostulante.telefono || "No registrado";
    document.getElementById("profileEducation").innerText = `${currentPostulante.nivel_educacion} en ${currentPostulante.institucion}`;
    document.getElementById("profileExperience").innerText = currentPostulante.experiencia_anios || 0;
    document.getElementById("profileSalary").innerText = currentPostulante.expectativa_salarial || "A tratar";

    const skillsContainer = document.getElementById("profileSkills");
    skillsContainer.innerHTML = "";
    if (currentPostulante.habilidades && currentPostulante.habilidades.length > 0) {
        currentPostulante.habilidades.forEach(skill => {
            skillsContainer.innerHTML += `<span class="skill-badge">${skill}</span>`;
        });
    } else {
        skillsContainer.innerHTML = "<span class='text-muted'>No se agregaron habilidades.</span>";
    }
}

// =======================
// RENDERIZAR LISTA DE POSTULACIONES
// =======================
function renderMisPostulaciones() {
    const postulaciones = JSON.parse(localStorage.getItem("postulaciones")) || [];
    const ofertas = JSON.parse(localStorage.getItem("ofertas")) || [];
    const empresas = JSON.parse(localStorage.getItem("empresas")) || [];
    
    const container = document.getElementById("postulacionesList");
    container.innerHTML = "";

    const misPostulaciones = postulaciones.filter(p => p.postulante_id === currentPostulante.id);

    if (misPostulaciones.length === 0) {
        container.innerHTML = `
            <div class="no-eval-msg">
                <p>Aún no has postulado a ninguna oferta laboral.</p>
                <button class="btn btn-primary" onclick="window.location.href='../jobs.html'">Explorar Ofertas</button>
            </div>
        `;
        return;
    }

    // Ordenar de la más reciente a la más antigua
    misPostulaciones.sort((a, b) => new Date(b.fecha_postulacion) - new Date(a.fecha_postulacion));

    misPostulaciones.forEach(post => {
        const oferta = ofertas.find(o => o.id === post.oferta_id);
        if (!oferta) return;
        
        const empresa = empresas.find(e => e.id === oferta.empresa_id);

        let statusClass = `status-${post.estado.toLowerCase()}`;
        let statusText = post.estado.charAt(0).toUpperCase() + post.estado.slice(1);

        // Si tiene nota del examen, la mostramos en miniatura
        let badgeExamen = "";
        if (oferta.cuestionario && oferta.cuestionario.length > 0) {
            const nota = post.puntaje_cuestionario || 0;
            const total = oferta.cuestionario.length;
            badgeExamen = `<span class="badge-examen">📝 Examen: ${nota}/${total}</span>`;
        }

        // SEMÁNTICA: <article> para la tarjeta de postulación
        container.innerHTML += `
            <article class="postulacion-card">
                <div class="postulacion-info">
                    <span class="status-badge ${statusClass}">${statusText}</span>
                    <h3>${oferta.titulo} ${badgeExamen}</h3>
                    <p>🏢 ${empresa ? empresa.nombre : 'Confidencial'} | 📍 ${oferta.ubicacion}</p>
                    <span class="postulacion-date">Postulado el: ${post.fecha_postulacion.split('T')[0]}</span>
                </div>
                <div>
                    <button class="btn btn-secondary btn-sm" onclick="verDetallePostulacion(${post.id})">Ver Detalles y Examen</button>
                </div>
            </article>
        `;
    });
}

// =======================
// VER DETALLES Y EXAMEN (MODAL NEUTRO)
// =======================
function verDetallePostulacion(postulacionId) {
    const postulaciones = JSON.parse(localStorage.getItem("postulaciones")) || [];
    const ofertas = JSON.parse(localStorage.getItem("ofertas")) || [];
    const empresas = JSON.parse(localStorage.getItem("empresas")) || [];

    const post = postulaciones.find(p => p.id === postulacionId);
    const oferta = ofertas.find(o => o.id === post.oferta_id);
    const empresa = empresas.find(e => e.id === oferta.empresa_id);

    const statusText = post.estado.toUpperCase();
    const statusClass = `status-${post.estado.toLowerCase()}`;

    // SEMÁNTICA: <header> interno y <section> 
    let html = `
        <header class="company-header-modal">
            <img src="${empresa?.logo || 'https://via.placeholder.com/60'}" alt="Logo Empresa">
            <div>
                <h3>${empresa?.nombre || 'Empresa Confidencial'}</h3>
                <p>Sector: ${empresa?.sector || 'No especificado'} | Ubicación: ${empresa?.ubicacion || 'Remoto'}</p>
            </div>
        </header>

        <section class="postulacion-details-box">
            <h2 class="oferta-title-modal">${oferta.titulo}</h2>
            <span class="status-badge ${statusClass} mt-5">ESTADO DEL PROCESO: ${statusText}</span>
            <p class="mt-5"><strong>Modalidad:</strong> ${oferta.modalidad} | <strong>Sueldo:</strong> S/ ${oferta.sueldo}</p>
            <p class="comentario-text"><strong>Comentario del Reclutador:</strong> <em>"${post.comentario || 'En revisión...'}"</em></p>
        </section>
    `;

    // Bloque de Resultados del Cuestionario (NEUTRO)
    if (oferta.cuestionario && oferta.cuestionario.length > 0) {
        
        const puntaje = post.puntaje_cuestionario || 0;
        const total = oferta.cuestionario.length;
        const porcentaje = Math.round((puntaje / total) * 100);

        html += `
            <div class="evaluacion-score-box">
                <p class="score-text">🎯 Resultado de tu Evaluación Técnica: ${puntaje} / ${total} aciertos (${porcentaje}%)</p>
            </div>
            <h3 class="respuestas-title">Detalle de tus Respuestas</h3>
            <p class="respuestas-warning">Por motivos de seguridad y confidencialidad, solo se muestra la opción que seleccionaste durante el examen.</p>
        `;

        // Renderizar pregunta por pregunta
        oferta.cuestionario.forEach((q, index) => {
            const respuestaMia = (post.respuestas_cuestionario || []).find(r => r.pregunta_id === q.id);

            // SEMÁNTICA: <article> para englobar el detalle de una pregunta resuelta
            html += `
                <article class="q-detail-box">
                    <h4 class="q-title">${index + 1}. ${q.pregunta}</h4>
                    <ul class="q-list">
            `;

            // Opciones de cada pregunta
            q.opciones.forEach(opt => {
                let itemClass = "q-item ";
                let labelExtra = "";

                const fueMiRespuesta = respuestaMia && (opt === respuestaMia.respuesta_usuario);

                if (fueMiRespuesta) {
                    itemClass += "q-item-selected";
                    labelExtra = " <strong>(Tu elección) 📌</strong>";
                } else {
                    itemClass += "q-item-normal";
                }

                html += `<li class="${itemClass}">${opt} ${labelExtra}</li>`;
            });

            html += `</ul></article>`;
        });
    } else {
        html += `<p class="no-eval-msg">No hubo evaluación técnica para esta postulación.</p>`;
    }

    document.getElementById("modalBody").innerHTML = html;
    document.getElementById("postulacionModal").style.display = "flex";
    document.getElementById("postulacionModal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("postulacionModal").style.display = "none";
}

// =======================
// LÓGICA DE EDICIÓN DE PERFIL
// =======================
function toggleEditMode() {
    const viewPostulaciones = document.getElementById("view-postulaciones");
    const viewEditar = document.getElementById("view-editar");

    if (viewEditar.classList.contains("hidden")) {
        viewPostulaciones.classList.add("hidden");
        viewEditar.classList.remove("hidden");
    } else {
        viewEditar.classList.add("hidden");
        viewPostulaciones.classList.remove("hidden");
    }
}

function setupEditForm() {
    document.getElementById("editNombre").value = currentPostulante.nombre;
    document.getElementById("editApellidos").value = currentPostulante.apellidos;
    document.getElementById("editTelefono").value = currentPostulante.telefono || "";
    document.getElementById("editUbicacion").value = currentPostulante.ubicacion || "";
    document.getElementById("editNivelEducacion").value = currentPostulante.nivel_educacion || "";
    document.getElementById("editInstitucion").value = currentPostulante.institucion || "";
    document.getElementById("editProfesion").value = currentPostulante.profesion || "";
    document.getElementById("editExperiencia").value = currentPostulante.experiencia_anios || 0;
    document.getElementById("editViajar").value = currentPostulante.disponibilidad_viajar || "No";
    document.getElementById("editSueldo").value = currentPostulante.expectativa_salarial || "";
    
    document.getElementById("editHabilidades").value = currentPostulante.habilidades ? currentPostulante.habilidades.join(", ") : "";
    document.getElementById("editLinkedin").value = currentPostulante.linkedin || "";
    document.getElementById("editFoto").value = currentPostulante.foto || "";
    document.getElementById("editCV").value = currentPostulante.cv_url || "";

    document.getElementById("formEditProfile").addEventListener("submit", function(e) {
        e.preventDefault();

        const habString = document.getElementById("editHabilidades").value;
        const habilidadesArray = habString.split(",").map(item => item.trim()).filter(item => item !== "");

        currentPostulante.nombre = document.getElementById("editNombre").value;
        currentPostulante.apellidos = document.getElementById("editApellidos").value;
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