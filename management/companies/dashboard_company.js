// =======================
// ESTADO GLOBAL
// =======================
let currentUser = null;
let currentEmpresaId = null;
let currentOfertaId = null;
let questionCount = 0; 

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
    const misEmpresas = empresas.filter(e => e.user_id === currentUser.id);
    const container = document.getElementById("empresasList");
    
    container.innerHTML = "";

    if (misEmpresas.length === 0) {
        container.innerHTML = "<p>No tienes empresas registradas.</p>";
        return;
    }

    misEmpresas.forEach(emp => {
        // SEMÁNTICA: Usamos <article> para englobar el resumen de la empresa
        container.innerHTML += `
            <article class="card">
                <div style="display:flex; gap:15px; align-items:center; margin-bottom:15px;">
                    <img src="${emp.logo || 'https://via.placeholder.com/60'}" style="width:60px; height:60px; border-radius:8px; object-fit:cover;">
                    <div>
                        <h3 style="margin:0; color:var(--primary);">${emp.nombre}</h3>
                        <p style="margin:0; color:#666; font-size:13px;">${emp.sector} | ${emp.ubicacion}</p>
                    </div>
                </div>
                <p style="font-size:14px;">${emp.descripcion}</p>
                <hr style="border:0; border-top:1px solid #eee; margin:15px 0;">
                <button class="btn btn-primary" style="width:100%" onclick="verOfertas(${emp.id}, '${emp.nombre}')">Ver Ofertas</button>
            </article>
        `;
    });
}

function registrarEmpresa(e) {
    e.preventDefault();
    let empresas = JSON.parse(localStorage.getItem("empresas")) || [];
    
    const nuevaEmpresa = {
        id: Date.now(),
        user_id: currentUser.id,
        nombre: document.getElementById("empNombre").value,
        sector: document.getElementById("empSector").value,
        ubicacion: document.getElementById("empUbicacion").value,
        descripcion: document.getElementById("empDesc").value,
        logo: document.getElementById("empLogo").value
    };

    empresas.push(nuevaEmpresa);
    localStorage.setItem("empresas", JSON.stringify(empresas));
    
    closeModal('modalNuevaEmpresa');
    document.getElementById("formNuevaEmpresa").reset();
    renderMisEmpresas();
}

// =======================
// VISTA 2: OFERTAS POR EMPRESA
// =======================
function verOfertas(empresaId, empresaNombre) {
    currentEmpresaId = empresaId;
    document.getElementById("ofertasTitle").innerText = `Ofertas de ${empresaNombre}`;
    renderOfertas();
    showView('view-ofertas');
}

function renderOfertas() {
    const ofertas = JSON.parse(localStorage.getItem("ofertas")) || [];
    const postulaciones = JSON.parse(localStorage.getItem("postulaciones")) || [];
    const misOfertas = ofertas.filter(o => o.empresa_id === currentEmpresaId);
    const container = document.getElementById("ofertasList");
    
    container.innerHTML = "";

    if (misOfertas.length === 0) {
        container.innerHTML = "<p>No has publicado ofertas para esta empresa.</p>";
        return;
    }

    misOfertas.forEach(oferta => {
        const postulantesCount = postulaciones.filter(p => p.oferta_id === oferta.id).length;
        const statusClass = oferta.estado === "activa" ? "status-activa" : "status-cerrada";
        
        const badgeExamen = (oferta.cuestionario && oferta.cuestionario.length > 0) 
            ? `<span style="font-size:12px; color:#e67e22; font-weight:bold; display:block; margin-top:5px;">📝 Incluye Evaluación</span>` 
            : '';

        // SEMÁNTICA: <article> para englobar el resumen de la oferta laboral
        container.innerHTML += `
            <article class="card">
                <div style="display:flex; justify-content:space-between;">
                    <h3 style="margin:0; color:var(--primary);">${oferta.titulo}</h3>
                    <span class="status-badge ${statusClass}">${oferta.estado.toUpperCase()}</span>
                </div>
                <p style="margin:5px 0; color:#666; font-size:13px;">📍 ${oferta.ubicacion} | 💼 ${oferta.modalidad}</p>
                <p style="font-weight:bold; color:#16a34a; margin-top:10px;">S/ ${oferta.sueldo}</p>
                ${badgeExamen}
                <hr style="border:0; border-top:1px solid #eee; margin:15px 0;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-size:14px; font-weight:bold;">👥 ${postulantesCount} Postulantes</span>
                    <button class="btn btn-primary btn-sm" onclick="verPostulantes(${oferta.id}, '${oferta.titulo}')">Revisar CVs</button>
                </div>
            </article>
        `;
    });
}

function abrirModalNuevaOferta() {
    document.getElementById("formNuevaOferta").reset();
    document.getElementById("preguntasContainer").innerHTML = "";
    questionCount = 0;
    openModal('modalNuevaOferta');
}

// =======================
// LÓGICA DEL CREADOR DE CUESTIONARIOS
// =======================
function agregarPreguntaUI() {
    questionCount++;
    const container = document.getElementById("preguntasContainer");
    
    // SEMÁNTICA: <article> encapsula cada pregunta independiente que forma el cuestionario
    const preguntaHTML = `
        <article class="pregunta-box" id="qBox_${questionCount}">
            <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                <strong>Pregunta ${questionCount}</strong>
                <button type="button" onclick="eliminarPreguntaUI(${questionCount})" style="background:none; border:none; color:red; cursor:pointer; font-weight:bold;">X</button>
            </div>
            <input type="text" class="q-texto" placeholder="Ej: ¿Qué significa HTML?" style="width:100%; padding:8px; margin-bottom:10px;" required>
            
            <div class="opciones-container">
                <div class="opcion-row">
                    <input type="radio" name="correcta_${questionCount}" value="0" required title="Marcar como correcta">
                    <input type="text" class="q-opcion" placeholder="Opción 1" style="flex:1; padding:6px;" required>
                </div>
                <div class="opcion-row">
                    <input type="radio" name="correcta_${questionCount}" value="1" required title="Marcar como correcta">
                    <input type="text" class="q-opcion" placeholder="Opción 2" style="flex:1; padding:6px;" required>
                </div>
                <div class="opcion-row">
                    <input type="radio" name="correcta_${questionCount}" value="2" required title="Marcar como correcta">
                    <input type="text" class="q-opcion" placeholder="Opción 3" style="flex:1; padding:6px;" required>
                </div>
            </div>
        </article>
    `;
    
    container.insertAdjacentHTML('beforeend', preguntaHTML);
}

function eliminarPreguntaUI(id) {
    document.getElementById(`qBox_${id}`).remove();
}

function publicarOferta(e) {
    e.preventDefault();
    let ofertas = JSON.parse(localStorage.getItem("ofertas")) || [];
    
    // Recopilar el cuestionario si existe
    const cuestionario = [];
    const preguntasUI = document.querySelectorAll(".pregunta-box");
    
    let cuestionarioValido = true;

    preguntasUI.forEach((box, index) => {
        const preguntaTexto = box.querySelector(".q-texto").value;
        const opcionesInputs = box.querySelectorAll(".q-opcion");
        const correctaRadio = box.querySelector(`input[type="radio"]:checked`);
        
        if (!correctaRadio) {
            alert(`Por favor, selecciona cuál es la respuesta correcta en la pregunta ${index + 1}`);
            cuestionarioValido = false;
            return;
        }

        const opciones = Array.from(opcionesInputs).map(inp => inp.value);
        const indiceCorrecta = parseInt(correctaRadio.value);

        cuestionario.push({
            id: `q${Date.now()}_${index}`,
            pregunta: preguntaTexto,
            opciones: opciones,
            respuesta_correcta: opciones[indiceCorrecta]
        });
    });

    if (!cuestionarioValido) return;

    const nuevaOferta = {
        id: Date.now(),
        empresa_id: currentEmpresaId,
        categoria_id: parseInt(document.getElementById("ofCategoria").value),
        titulo: document.getElementById("ofTitulo").value,
        descripcion: document.getElementById("ofDesc").value,
        modalidad: document.getElementById("ofModalidad").value,
        ubicacion: document.getElementById("ofUbicacion").value,
        sueldo: parseFloat(document.getElementById("ofSueldo").value),
        fecha_creacion: new Date().toISOString().split('T')[0],
        estado: "activa",
        cuestionario: cuestionario 
    };

    ofertas.push(nuevaOferta);
    localStorage.setItem("ofertas", JSON.stringify(ofertas));
    
    closeModal('modalNuevaOferta');
    renderOfertas();
}

// =======================
// VISTA 3: GESTIÓN DE POSTULANTES
// =======================
function verPostulantes(ofertaId, ofertaTitulo) {
    currentOfertaId = ofertaId;
    document.getElementById("postulantesTitle").innerText = `Postulantes para: ${ofertaTitulo}`;
    renderPostulantes();
    showView('view-postulantes');
}

function renderPostulantes() {
    const postulaciones = JSON.parse(localStorage.getItem("postulaciones")) || [];
    const postulantesDb = JSON.parse(localStorage.getItem("postulantes")) || [];
    const container = document.getElementById("postulantesList");
    
    let misPostulantes = postulaciones.filter(p => p.oferta_id === currentOfertaId);
    
    container.innerHTML = "";

    if (misPostulantes.length === 0) {
        container.innerHTML = "<p>Aún no hay postulantes para esta oferta.</p>";
        return;
    }

    // RANKING INTELIGENTE: Ordenar por nota del examen (de mayor a menor)
    misPostulantes.sort((a, b) => {
        const notaA = a.puntaje_cuestionario || 0;
        const notaB = b.puntaje_cuestionario || 0;
        return notaB - notaA;
    });

    misPostulantes.forEach((post, index) => {
        const perfil = postulantesDb.find(p => p.id === post.postulante_id);
        if (!perfil) return;

        // Asignar medallas a los 3 mejores
        let rankClass = "";
        let rankBadge = "";
        if (post.puntaje_cuestionario !== undefined) {
            if (index === 0) { rankClass = "rank-gold"; rankBadge = "🥇 Top 1"; }
            else if (index === 1) { rankClass = "rank-silver"; rankBadge = "🥈 Top 2"; }
            else if (index === 2) { rankClass = "rank-bronze"; rankBadge = "🥉 Top 3"; }
        }

        const puntajeTexto = post.puntaje_cuestionario !== undefined 
            ? `<span style="color:#16a34a; font-weight:bold;">📝 Nota Técnica: ${post.puntaje_cuestionario} pts</span>` 
            : `<span style="color:#888;">Sin evaluación técnica</span>`;
            
        const btnVerExamen = post.puntaje_cuestionario !== undefined 
            ? `<button class="btn btn-secondary btn-sm" style="margin-top:10px; width:100%;" onclick="verExamenPostulante(${post.id})">Ver Respuestas del Examen</button>` 
            : '';

        // SEMÁNTICA: <article> encapsula a cada candidato
        container.innerHTML += `
            <article class="card ${rankClass}">
                <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                    <div style="display:flex; gap:15px; align-items:center;">
                        <img src="${perfil.foto || 'https://via.placeholder.com/50'}" style="width:50px; height:50px; border-radius:50%; object-fit:cover;">
                        <div>
                            <h3 style="margin:0; font-size:16px;">${perfil.nombre} ${perfil.apellidos}</h3>
                            <p style="margin:0; font-size:12px; color:#666;">${perfil.profesion} | ${perfil.experiencia_anios} años exp.</p>
                            ${rankBadge ? `<span style="font-weight:bold; font-size:12px; color:#b8860b;">${rankBadge}</span>` : ''}
                        </div>
                    </div>
                </div>
                
                <div style="margin-top:15px; background:#f8fafc; padding:10px; border-radius:6px; font-size:13px;">
                    ${puntajeTexto}
                    ${btnVerExamen}
                </div>

                <hr style="border:0; border-top:1px solid #eee; margin:15px 0;">
                
                <label style="font-size:12px; font-weight:bold; color:#555;">Estado del proceso:</label>
                <select onchange="cambiarEstadoPostulacion(${post.id}, this.value)" style="width:100%; padding:8px; margin-top:5px; border-radius:4px; font-weight:bold; color:white; background:${getColorEstado(post.estado)}; border:none; outline:none;">
                    <option value="pendiente" ${post.estado === 'pendiente' ? 'selected' : ''}>Pendiente</option>
                    <option value="visto" ${post.estado === 'visto' ? 'selected' : ''}>Visto</option>
                    <option value="entrevista" ${post.estado === 'entrevista' ? 'selected' : ''}>En Entrevista</option>
                    <option value="rechazado" ${post.estado === 'rechazado' ? 'selected' : ''}>Rechazado</option>
                </select>
                
                <div style="display:flex; gap:10px; margin-top:15px;">
                    <a href="${perfil.cv_url}" target="_blank" class="btn btn-secondary btn-sm" style="flex:1; text-align:center;">Ver CV</a>
                    <a href="${perfil.linkedin}" target="_blank" class="btn btn-secondary btn-sm" style="flex:1; text-align:center;">LinkedIn</a>
                </div>
            </article>
        `;
    });
}

// =======================
// LÓGICA DE CORRECCIÓN (EMPRESA VE EL EXAMEN DEL CANDIDATO)
// =======================
function verExamenPostulante(postulacionId) {
    const postulaciones = JSON.parse(localStorage.getItem("postulaciones")) || [];
    const ofertas = JSON.parse(localStorage.getItem("ofertas")) || [];
    
    const postulacion = postulaciones.find(p => p.id === postulacionId);
    const oferta = ofertas.find(o => o.id === postulacion.oferta_id);
    
    const container = document.getElementById("detalleCuestionarioContenido");
    container.innerHTML = "";
    
    const totalPreguntas = oferta.cuestionario.length;
    const aciertos = postulacion.puntaje_cuestionario;
    const porcentaje = Math.round((aciertos / totalPreguntas) * 100);

    container.innerHTML += `
        <div class="evaluacion-score-box">
            <p class="evaluacion-score">
                Nota del Candidato: ${aciertos} de ${totalPreguntas} aciertos (${porcentaje}%)
            </p>
        </div>
    `;

    oferta.cuestionario.forEach((q, index) => {
        const respuestaCandidato = postulacion.respuestas_cuestionario.find(r => r.pregunta_id === q.id);
        const acerto = respuestaCandidato ? respuestaCandidato.es_correcta : false;
        
        const icono = acerto ? "✅ Correcto" : "❌ Incorrecto";
        const colorMarco = acerto ? "border-left: 4px solid #16a34a;" : "border-left: 4px solid #dc2626;";

        // SEMÁNTICA: <article> para los bloques de preguntas resueltas
        let htmlPregunta = `
            <article class="q-detail-box" style="${colorMarco}">
                <p style="margin-top:0; font-weight:bold;">${index + 1}. ${q.pregunta} <span style="float:right; font-size:12px;">${icono}</span></p>
                <ul style="list-style:none; padding:0; margin:10px 0 0 0; font-size:13px;">
        `;

        q.opciones.forEach(opt => {
            let colorTexto = "#555";
            let fontWeight = "normal";
            let extra = "";

            if (opt === q.respuesta_correcta) {
                colorTexto = "#16a34a";
                fontWeight = "bold";
                extra = " (Respuesta Correcta)";
            }
            
            if (respuestaCandidato && opt === respuestaCandidato.respuesta_usuario) {
                if (!acerto) {
                    colorTexto = "#dc2626";
                    fontWeight = "bold";
                    extra = " (Marcó el candidato - Incorrecto)";
                } else {
                    extra = " (Marcó el candidato - ¡Correcto!)";
                }
            }

            htmlPregunta += `<li style="padding:4px 0; color:${colorTexto}; font-weight:${fontWeight};">- ${opt} ${extra}</li>`;
        });

        htmlPregunta += `</ul></article>`;
        container.innerHTML += htmlPregunta;
    });

    openModal('modalDetalleCuestionario');
}

function cambiarEstadoPostulacion(postulacionId, nuevoEstado) {
    let postulaciones = JSON.parse(localStorage.getItem("postulaciones")) || [];
    const index = postulaciones.findIndex(p => p.id === postulacionId);
    
    if (index !== -1) {
        postulaciones[index].estado = nuevoEstado;
        localStorage.setItem("postulaciones", JSON.stringify(postulaciones));
        renderPostulantes(); 
    }
}

function getColorEstado(estado) {
    if(estado === 'visto') return '#3498db';
    if(estado === 'entrevista') return '#2ecc71';
    if(estado === 'rechazado') return '#e74c3c';
    return '#f39c12'; 
}

// =======================
// UTILIDADES (MODALES Y SELECTS)
// =======================
function cargarCategorias() {
    const categorias = JSON.parse(localStorage.getItem("categorias")) || [];
    const select = document.getElementById("ofCategoria");
    if(!select) return;
    categorias.forEach(cat => {
        select.innerHTML += `<option value="${cat.id}">${cat.nombre}</option>`;
    });
}

function openModal(modalId) {
    document.getElementById(modalId).classList.remove("hidden");
    document.getElementById(modalId).style.display = "flex";
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add("hidden");
    document.getElementById(modalId).style.display = "none";
}