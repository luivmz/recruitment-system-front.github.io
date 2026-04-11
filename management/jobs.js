// =======================
// ESTADO GLOBAL
// =======================
let ofertas = [];
let empresas = [];
let categorias = [];
let currentOfertaIdForExam = null; // Guarda el ID de la oferta para el examen

document.addEventListener("DOMContentLoaded", () => {
    loadData();
    loadFiltersOptions();
    readURLParams(); // Lee lo que viene del index.html
    renderOfertas(); // Dibuja la pantalla inicial
    setupEventListeners();

    // Evento para el botón de enviar el cuestionario
    document.getElementById("btnEnviarExamen").addEventListener("click", procesarExamenYPostular);
});

// =======================
// CARGAR DATA
// =======================
function loadData() {
    ofertas = JSON.parse(localStorage.getItem("ofertas")) || [];
    empresas = JSON.parse(localStorage.getItem("empresas")) || [];
    categorias = JSON.parse(localStorage.getItem("categorias")) || [];
}

// =======================
// LLENAR SELECTS DINÁMICOS
// =======================
function loadFiltersOptions() {
    const categoriaSelect = document.getElementById("categoriaFilter");
    const empresaSelect = document.getElementById("empresaFilter");

    categorias.forEach(cat => {
        categoriaSelect.innerHTML += `<option value="${cat.id}">${cat.nombre}</option>`;
    });

    empresas.forEach(emp => {
        empresaSelect.innerHTML += `<option value="${emp.id}">${emp.nombre}</option>`;
    });
}

// =======================
// LEER URL DESDE INDEX.HTML
// =======================
function readURLParams() {
    const params = new URLSearchParams(window.location.search);
    
    if (params.has("q")) document.getElementById("searchInput").value = params.get("q");
    if (params.has("cat")) document.getElementById("categoriaFilter").value = params.get("cat");
    if (params.has("loc")) {
        const ubicacionValue = params.get("loc");
        const ubicacionSelect = document.getElementById("ubicacionFilter");
        const exists = Array.from(ubicacionSelect.options).some(opt => opt.value === ubicacionValue);
        
        if (!exists) {
            ubicacionSelect.innerHTML += `<option value="${ubicacionValue}">${ubicacionValue} (Detectado)</option>`;
        }
        ubicacionSelect.value = ubicacionValue;
    }
}

// =======================
// EVENT LISTENERS DE FILTROS
// =======================
function setupEventListeners() {
    document.getElementById("searchInput").addEventListener("input", renderOfertas);
    document.getElementById("ubicacionFilter").addEventListener("change", renderOfertas);
    document.getElementById("categoriaFilter").addEventListener("change", renderOfertas);
    document.getElementById("modalidadFilter").addEventListener("change", renderOfertas);
    document.getElementById("empresaFilter").addEventListener("change", renderOfertas);
    document.getElementById("fechaFilter").addEventListener("change", renderOfertas);
}

// =======================
// RENDERIZAR OFERTAS
// =======================
function renderOfertas() {
    const container = document.getElementById("jobsContainer");
    container.innerHTML = "";

    const searchQ = document.getElementById("searchInput").value.toLowerCase();
    const locFilter = document.getElementById("ubicacionFilter").value;
    const catFilter = document.getElementById("categoriaFilter").value;
    const modFilter = document.getElementById("modalidadFilter").value;
    const empFilter = document.getElementById("empresaFilter").value;
    const sortFilter = document.getElementById("fechaFilter").value;

    let filtradas = ofertas.filter(o => o.estado === "activa");

    if (searchQ) {
        filtradas = filtradas.filter(o => 
            o.titulo.toLowerCase().includes(searchQ) || 
            o.descripcion.toLowerCase().includes(searchQ)
        );
    }

    if (locFilter) filtradas = filtradas.filter(o => o.ubicacion.includes(locFilter));
    if (catFilter) filtradas = filtradas.filter(o => o.categoria_id == catFilter);
    if (modFilter) filtradas = filtradas.filter(o => o.modalidad === modFilter);
    if (empFilter) filtradas = filtradas.filter(o => o.empresa_id == empFilter);

    if (sortFilter === "recientes") {
        filtradas.sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion));
    } else {
        filtradas.sort((a, b) => new Date(a.fecha_creacion) - new Date(b.fecha_creacion));
    }

    document.getElementById("resultados-resumen").innerText = `Se encontraron ${filtradas.length} vacantes disponibles.`;

    if (filtradas.length === 0) {
        container.innerHTML = "<p>No se encontraron ofertas con esos filtros.</p>";
        return;
    }

    filtradas.forEach(o => {
        const empresa = empresas.find(e => e.id === o.empresa_id);
        const cat = categorias.find(c => c.id === o.categoria_id);
        
        // Etiqueta visual si tiene cuestionario
        const tieneExamen = (o.cuestionario && o.cuestionario.length > 0) ? `<span style="color:#e67e22; font-weight:bold; font-size:12px;">📝 Requiere Evaluación</span>` : '';

        container.innerHTML += `
            <div class="job-card">
                <div>
                    <div class="job-header">
                        <img src="${empresa?.logo || 'https://via.placeholder.com/50'}" alt="Logo" class="company-logo">
                        <div>
                            <h3 class="job-title">${o.titulo}</h3>
                            <p class="company-name">${empresa?.nombre || 'Empresa Confidencial'}</p>
                        </div>
                    </div>
                    <div class="job-details">
                        <span class="job-tag">📍 ${o.ubicacion}</span>
                        <span class="job-tag">💼 ${o.modalidad}</span>
                        <span class="job-tag">🏷️ ${cat?.nombre || 'General'}</span>
                        <p class="job-salary">S/ ${o.sueldo}</p>
                        ${tieneExamen}
                    </div>
                </div>
                <button class="btn-details" onclick="verDetalles(${o.id})">Ver Detalles</button>
            </div>
        `;
    });
}

// =======================
// VER DETALLES (MODAL ORIGINAL)
// =======================
function verDetalles(id) {
    const oferta = ofertas.find(o => o.id === id);
    const empresa = empresas.find(e => e.id === oferta.empresa_id);
    const cat = categorias.find(c => c.id === oferta.categoria_id);

    // Si tiene cuestionario, cambiamos el texto del botón
    const btnTexto = (oferta.cuestionario && oferta.cuestionario.length > 0) 
        ? "Postular y dar Evaluación" 
        : "Postular Rápidamente";

    document.getElementById("modalBody").innerHTML = `
        <span class="close" onclick="closeModal()">&times;</span>
        <h2 style="color:var(--primary);">${oferta.titulo}</h2>
        <h4 style="color:#666;">${empresa?.nombre}</h4>
        <hr>
        <p><strong>Ubicación:</strong> ${oferta.ubicacion} | <strong>Modalidad:</strong> ${oferta.modalidad}</p>
        <p><strong>Categoría:</strong> ${cat?.nombre}</p>
        <p><strong>Sueldo Ofrecido:</strong> S/ ${oferta.sueldo}</p>
        <p><strong>Fecha de Publicación:</strong> ${oferta.fecha_creacion}</p>
        <hr>
        <h3>Descripción del Puesto</h3>
        <p style="line-height: 1.6;">${oferta.descripcion}</p>
        
        <button style="margin-top:20px; width:100%; padding:15px; background:var(--accent); color:white; border:none; border-radius:8px; font-weight:bold; cursor:pointer;" 
                onclick="iniciarPostulacion(${oferta.id})">
            ${btnTexto}
        </button>
    `;
    
    document.getElementById("jobModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("jobModal").style.display = "none";
}

// =======================
// FLUJO DE POSTULACIÓN
// =======================
function iniciarPostulacion(ofertaId) {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    // 1. Validar que esté logueado
    if (!user) {
        alert("Para postular, primero debes iniciar sesión.");
        window.location.href = "../auth/login.html";
        return;
    }

    // 2. Validar Rol
    if (user.rol !== "postulante") {
        alert("¡Aviso! Solo los usuarios con rol 'postulante' pueden aplicar a las ofertas.");
        return;
    }

    const postulantes = JSON.parse(localStorage.getItem("postulantes")) || [];
    let postulaciones = JSON.parse(localStorage.getItem("postulaciones")) || [];
    const postulante = postulantes.find(p => p.user_id === user.id);

    if (!postulante) {
        alert("Error de perfil. Actualiza tus datos en tu panel.");
        return;
    }

    // 3. Validar Postulación Duplicada
    const yaPostulo = postulaciones.find(p => p.oferta_id === ofertaId && p.postulante_id === postulante.id);
    if (yaPostulo) {
        alert("Ya estás postulando a esta oferta.");
        return;
    }

    // 4. Validar Cuestionario
    const oferta = ofertas.find(o => o.id === ofertaId);
    
    if (oferta && oferta.cuestionario && oferta.cuestionario.length > 0) {
        // Tiene examen -> Levanta modal
        abrirExamenModal(ofertaId);
    } else {
        // No tiene examen -> Postula directo
        registrarPostulacionOficial(ofertaId, [], 0);
    }
}

// =======================
// LÓGICA DEL CUESTIONARIO
// =======================
function abrirExamenModal(ofertaId) {
    const oferta = ofertas.find(o => o.id === ofertaId);
    currentOfertaIdForExam = ofertaId;
    
    closeModal(); // Cerrar modal detalles
    
    const container = document.getElementById("examenContainer");
    container.innerHTML = "";
    document.getElementById("examenDesc").innerText = `Estás a un paso de postular a "${oferta.titulo}". Responde estas preguntas para evaluar tu conocimiento.`;
    
    oferta.cuestionario.forEach((q, index) => {
        let html = `
            <div class="q-box">
                <p><strong>${index + 1}. ${q.pregunta}</strong></p>
        `;
        
        q.opciones.forEach(opt => {
            html += `
                <label>
                    <input type="radio" name="resp_${q.id}" value="${opt}" required>
                    ${opt}
                </label>
            `;
        });
        
        html += `</div>`;
        container.innerHTML += html;
    });
    
    document.getElementById("examenModal").style.display = "flex";
}

function closeExamenModal() {
    document.getElementById("examenModal").style.display = "none";
    currentOfertaIdForExam = null;
}

function procesarExamenYPostular() {
    const oferta = ofertas.find(o => o.id === currentOfertaIdForExam);
    const respuestasUsuario = [];
    let puntajeObtenido = 0;
    let todasRespondidas = true;
    
    // Validar y calificar
    for (let q of oferta.cuestionario) {
        const seleccionada = document.querySelector(`input[name="resp_${q.id}"]:checked`);
        
        if (!seleccionada) {
            todasRespondidas = false;
            break;
        }
        
        const esCorrecta = (seleccionada.value === q.respuesta_correcta);
        if (esCorrecta) puntajeObtenido++;
        
        respuestasUsuario.push({
            pregunta_id: q.id,
            respuesta_usuario: seleccionada.value,
            es_correcta: esCorrecta
        });
    }
    
    if (!todasRespondidas) {
        alert("⚠️ Por favor, selecciona una respuesta para todas las preguntas antes de enviar.");
        return;
    }
    
    // Todo respondido, registramos
    registrarPostulacionOficial(currentOfertaIdForExam, respuestasUsuario, puntajeObtenido);
    closeExamenModal();
}

// =======================
// REGISTRO FINAL DE POSTULACIÓN
// =======================
function registrarPostulacionOficial(ofertaId, arrayRespuestas, nota) {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const postulantes = JSON.parse(localStorage.getItem("postulantes")) || [];
    let postulaciones = JSON.parse(localStorage.getItem("postulaciones")) || [];
    const postulante = postulantes.find(p => p.user_id === user.id);
    
    const nuevaPostulacion = {
        id: Date.now(), 
        oferta_id: ofertaId,
        postulante_id: postulante.id,
        fecha_postulacion: new Date().toISOString().split('T')[0],
        estado: "pendiente",
        comentario: "Postulación recibida",
        puntaje_cuestionario: nota,
        respuestas_cuestionario: arrayRespuestas
    };

    postulaciones.push(nuevaPostulacion);
    localStorage.setItem("postulaciones", JSON.stringify(postulaciones));
    
    alert("🎉 ¡Postulación enviada con éxito! La empresa revisará tu perfil y resultados pronto.");
    renderOfertas();
}