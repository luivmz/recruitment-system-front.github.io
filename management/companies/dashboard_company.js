// =======================
// ESTADO GLOBAL
// =======================
let currentUser = null;
let currentEmpresaId = null;
let currentOfertaId = null;
let questionCount = 0; // Contador para generar IDs únicos en el creador de cuestionarios

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
        id: Date.now(), 
        user_id: currentUser.id, 
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

// =======================
// LÓGICA DE CREADOR DE CUESTIONARIOS
// =======================
function abrirModalNuevaOferta() {
    document.getElementById("formNuevaOferta").reset();
    document.getElementById("preguntasContainer").innerHTML = ""; // Limpiar preguntas previas
    questionCount = 0;
    openModal('modalNuevaOferta');
}

function agregarPreguntaUI() {
    questionCount++;
    const container = document.getElementById("preguntasContainer");
    
    // Por defecto creamos la pregunta con 2 opciones iniciales (A y B)
    const html = `
        <div class="pregunta-box" id="cajaPregunta_${questionCount}">
            <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                <strong>Pregunta ${questionCount}</strong>
                <button type="button" style="color:red; background:none; border:none; cursor:pointer;" onclick="this.closest('.pregunta-box').remove()">Eliminar</button>
            </div>
            <input type="text" placeholder="Ej: ¿Qué es el Virtual DOM?" class="pregunta-texto full-width" required style="margin-bottom: 10px;">
            
            <label style="font-size:12px; color:#555;">Opciones (Selecciona la correcta en el botón redondo):</label>
            <div class="opciones-container" id="opciones_${questionCount}">
                <div class="opcion-row">
                    <input type="radio" name="correcta_${questionCount}" value="0" checked required>
                    <input type="text" placeholder="Opción A" class="opcion-texto full-width" required>
                </div>
                <div class="opcion-row">
                    <input type="radio" name="correcta_${questionCount}" value="1">
                    <input type="text" placeholder="Opción B" class="opcion-texto full-width" required>
                </div>
            </div>
            <button type="button" class="btn-add-option" onclick="agregarOpcionUI(${questionCount})">+ Agregar otra opción</button>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function agregarOpcionUI(preguntaId) {
    const container = document.getElementById(`opciones_${preguntaId}`);
    const numOpciones = container.children.length;
    
    if (numOpciones >= 6) {
        alert("Máximo 6 opciones por pregunta.");
        return;
    }

    const html = `
        <div class="opcion-row">
            <input type="radio" name="correcta_${preguntaId}" value="${numOpciones}" required>
            <input type="text" placeholder="Nueva Opción" class="opcion-texto full-width" required>
            <button type="button" style="color:red; background:none; border:none; font-weight:bold; cursor:pointer;" onclick="this.parentElement.remove()">X</button>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function publicarOferta(e) {
    e.preventDefault();
    let ofertas = JSON.parse(localStorage.getItem("ofertas")) || [];
    
    // Recopilar el cuestionario dinámico
    const cuestionarioFinal = [];
    const cajasPreguntas = document.querySelectorAll('.pregunta-box');
    
    cajasPreguntas.forEach((box, index) => {
        const preguntaTexto = box.querySelector('.pregunta-texto').value;
        const opcionesNodes = box.querySelectorAll('.opcion-row');
        
        const opcionesArray = [];
        let respuestaCorrecta = "";

        opcionesNodes.forEach(row => {
            const textoOp = row.querySelector('.opcion-texto').value;
            opcionesArray.push(textoOp);
            
            // Si este radio está marcado, es la respuesta correcta
            if (row.querySelector('input[type="radio"]').checked) {
                respuestaCorrecta = textoOp;
            }
        });

        cuestionarioFinal.push({
            id: `q${index + 1}_${Date.now()}`, // ID único
            pregunta: preguntaTexto,
            opciones: opcionesArray,
            respuesta_correcta: respuestaCorrecta
        });
    });

    // Guardar toda la oferta
    const nuevaOferta = {
        id: Date.now(),
        empresa_id: currentEmpresaId,
        titulo: document.getElementById("ofTitulo").value,
        categoria_id: parseInt(document.getElementById("ofCategoria").value),
        descripcion: document.getElementById("ofDesc").value,
        sueldo: parseFloat(document.getElementById("ofSueldo").value),
        modalidad: document.getElementById("ofModalidad").value,
        ubicacion: document.getElementById("ofUbicacion").value,
        estado: "activa",
        fecha_creacion: new Date().toISOString().split('T')[0],
        cuestionario: cuestionarioFinal // Se guarda el examen aquí
    };

    ofertas.push(nuevaOferta);
    localStorage.setItem("ofertas", JSON.stringify(ofertas));
    
    closeModal('modalNuevaOferta');
    renderOfertas();
    alert("¡Oferta publicada exitosamente con su cuestionario!");
}

// =======================
// VISTA 3: POSTULANTES Y RANKING
// =======================
function verPostulantes(ofertaId, ofertaTitulo) {
    currentOfertaId = ofertaId;
    document.getElementById("postulantesTitle").innerText = `Candidatos para: ${ofertaTitulo}`;
    renderPostulantes();
    showView('view-postulantes');
}

function renderPostulantes() {
    const ofertas = JSON.parse(localStorage.getItem("ofertas")) || [];
    const postulaciones = JSON.parse(localStorage.getItem("postulaciones")) || [];
    const postulantesData = JSON.parse(localStorage.getItem("postulantes")) || [];
    
    const container = document.getElementById("postulantesList");
    container.innerHTML = "";

    const ofertaActual = ofertas.find(o => o.id === currentOfertaId);
    if (!ofertaActual) return;

    let listaParaRanking = postulaciones
        .filter(p => p.oferta_id === currentOfertaId)
        .map(postulacion => {
            const perfil = postulantesData.find(p => p.id === postulacion.postulante_id);
            return { ...postulacion, perfil: perfil };
        })
        .filter(item => item.perfil);

    if (listaParaRanking.length === 0) {
        container.innerHTML = "<p>Aún no hay candidatos postulados para esta oferta.</p>";
        return;
    }

    // ALGORITMO MATCH (Se conserva intacto)
    const palabrasClave = ofertaActual.titulo.toLowerCase().split(" ").filter(word => word.length > 2);

    listaParaRanking.forEach(item => {
        let score = 0;
        const p = item.perfil;
        score += (parseInt(p.experiencia_anios) || 0) * 10;
        score += (p.habilidades ? p.habilidades.length : 0) * 5;

        palabrasClave.forEach(palabra => {
            if (p.profesion && p.profesion.toLowerCase().includes(palabra)) score += 50; 
            if (p.habilidades && p.habilidades.some(h => h.toLowerCase().includes(palabra))) score += 40;
        });
        item.score = score;
    });

    listaParaRanking.sort((a, b) => b.score - a.score);

    // RENDERIZAR
    listaParaRanking.forEach((item, index) => {
        const p = item.perfil;
        
        // Bloque del Cuestionario
        let bloqueEvaluacion = "";
        const totalPreguntas = ofertaActual.cuestionario ? ofertaActual.cuestionario.length : 0;
        
        if (totalPreguntas > 0) {
            const puntaje = item.puntaje_cuestionario || 0;
            const porcentaje = Math.round((puntaje / totalPreguntas) * 100);
            let colorScore = porcentaje >= 70 ? "green" : (porcentaje >= 40 ? "orange" : "red");

            bloqueEvaluacion = `
                <div class="evaluacion-card">
                    <div class="evaluacion-score" style="color: ${colorScore}">
                        📊 Score Cuestionario: ${puntaje} / ${totalPreguntas} aciertos (${porcentaje}%)
                    </div>
                    <button class="btn btn-secondary btn-sm" onclick="verDetalleCuestionario(${item.id})">Ver detalle de respuestas correctas/errores</button>
                </div>
            `;
        } else {
            bloqueEvaluacion = `<p style="font-size:12px; color:#999; margin-top:10px;">Sin cuestionario técnico asignado.</p>`;
        }

        // Estilos Medallas
        let rankClass = "rank-normal";
        let medalla = `#${index + 1} en Lista`;
        let borderStyle = "border: 1px solid #eee;";
        let badgeStyle = "background: #f1f1f1; color: #333;";

        if (index === 0) { 
            rankClass = "rank-gold"; medalla = "🥇 #1 Ideal"; 
            borderStyle = "border: 2px solid #ffd700; background: linear-gradient(to bottom right, #fffdf0, #ffffff);";
            badgeStyle = "background: #ffd700; color: #8a6d00;";
        } else if (index === 1) { 
            rankClass = "rank-silver"; medalla = "🥈 #2 Muy Bueno"; 
            borderStyle = "border: 2px solid #c0c0c0; background: linear-gradient(to bottom right, #f8f8f8, #ffffff);";
            badgeStyle = "background: #e0e0e0; color: #4a4a4a;";
        } else if (index === 2) { 
            rankClass = "rank-bronze"; medalla = "🥉 #3 Bueno"; 
            borderStyle = "border: 2px solid #cd7f32; background: linear-gradient(to bottom right, #fffaf0, #ffffff);";
            badgeStyle = "background: #f4d0a9; color: #8a4a00;";
        }

        container.innerHTML += `
            <div class="applicant-card ${rankClass}" style="border-radius: 10px; padding: 20px; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: flex-start; ${borderStyle}">
                
                <div class="applicant-info" style="display: flex; gap: 20px; width: 100%;">
                    <img src="${p.foto || 'https://via.placeholder.com/60'}" class="applicant-foto" alt="Foto" style="width: 70px; height: 70px; border-radius: 50%; object-fit: cover;">
                    
                    <div class="applicant-details" style="flex: 1;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <h3 style="margin: 0 0 5px 0; color: #333;">${p.nombre} ${p.apellidos}</h3>
                            <span style="font-weight: bold; padding: 4px 10px; border-radius: 12px; font-size: 13px; ${badgeStyle}">${medalla} (Match: ${item.score} pts)</span>
                        </div>
                        
                        <p style="margin: 3px 0; font-size: 14px; color: var(--primary); font-weight: bold;">${p.profesion} | Exp: ${p.experiencia_anios} años</p>
                        
                        ${bloqueEvaluacion}
                    </div>
                </div>

                <div class="applicant-actions" style="margin-left: 20px; min-width: 150px;">
                    <label style="display: block; margin-bottom: 5px; font-size: 12px; font-weight: bold; color: #555;">Estado del proceso:</label>
                    <select onchange="cambiarEstadoPostulacion(${item.id}, this.value)" 
                        style="width: 100%; padding: 8px; border-radius: 6px; font-weight: bold; outline: none; border: 2px solid ${getColorEstado(item.estado)}; color: ${getColorEstado(item.estado)};">
                        <option value="pendiente" ${item.estado === 'pendiente' ? 'selected' : ''}>⏳ Pendiente</option>
                        <option value="visto" ${item.estado === 'visto' ? 'selected' : ''}>👁️ Visto</option>
                        <option value="entrevista" ${item.estado === 'entrevista' ? 'selected' : ''}>📅 Entrevista</option>
                        <option value="rechazado" ${item.estado === 'rechazado' ? 'selected' : ''}>❌ Rechazado</option>
                    </select>
                </div>

            </div>
        `;
    });
}

// =======================
// MODAL: CORRECCIÓN DE CUESTIONARIO
// =======================
function verDetalleCuestionario(postulacionId) {
    const postulaciones = JSON.parse(localStorage.getItem("postulaciones")) || [];
    const ofertas = JSON.parse(localStorage.getItem("ofertas")) || [];
    
    const postulacion = postulaciones.find(p => p.id === postulacionId);
    const oferta = ofertas.find(o => o.id === postulacion.oferta_id);
    
    const container = document.getElementById("detalleCuestionarioContenido");
    container.innerHTML = "";

    if (!oferta.cuestionario || oferta.cuestionario.length === 0) {
        container.innerHTML = "<p>Esta oferta no contenía cuestionario técnico.</p>";
        openModal('modalDetalleCuestionario');
        return;
    }

    if (!postulacion.respuestas_cuestionario) {
        container.innerHTML = "<p>El candidato postuló antes de que se implementara el cuestionario o no lo resolvió.</p>";
        openModal('modalDetalleCuestionario');
        return;
    }

    // Dibujar cada pregunta y evaluarla
    oferta.cuestionario.forEach((preguntaDoc, index) => {
        // Buscar la respuesta que dio el usuario a esta pregunta en particular
        const respuestaUser = postulacion.respuestas_cuestionario.find(r => r.pregunta_id === preguntaDoc.id);
        const respondioCorrecto = respuestaUser ? respuestaUser.es_correcta : false;

        let iconStatus = respondioCorrecto ? "✅ CORRECTO" : "❌ INCORRECTO";
        let colorS = respondioCorrecto ? "color: green;" : "color: red;";

        let htmlPregunta = `
            <div class="q-detail-box">
                <p style="margin-top:0; font-weight:bold;">${index + 1}. ${preguntaDoc.pregunta} <span style="float:right; font-size:12px; ${colorS}">${iconStatus}</span></p>
                <ul style="list-style: none; padding: 0; margin-top: 10px;">
        `;

        // Dibujar las alternativas pintadas
        preguntaDoc.opciones.forEach(opcionTexto => {
            let itemClass = "padding: 8px; margin-bottom: 5px; border-radius: 4px; border: 1px solid #ccc; font-size: 14px;";
            let checkIcon = "";

            const esLaCorrecta = (opcionTexto === preguntaDoc.respuesta_correcta);
            const fueMarcadaPorUsuario = respuestaUser && (opcionTexto === respuestaUser.respuesta_usuario);

            if (esLaCorrecta && fueMarcadaPorUsuario) {
                // Acierto (Verde)
                itemClass += " background: #d4edda; border-color: #c3e6cb; color: #155724; font-weight: bold;";
                checkIcon = " (La eligió)";
            } else if (fueMarcadaPorUsuario && !esLaCorrecta) {
                // Se equivocó (Rojo)
                itemClass += " background: #f8d7da; border-color: #f5c6cb; color: #721c24; text-decoration: line-through;";
                checkIcon = " (Marcó esta)";
            } else if (esLaCorrecta && !fueMarcadaPorUsuario) {
                // Era la correcta pero no la marcó (Gris resaltado)
                itemClass += " background: #e2e3e5; border-color: #d6d8db; font-weight: bold;";
                checkIcon = " 👉 (Respuesta Esperada)";
            }

            htmlPregunta += `<li style="${itemClass}">${opcionTexto} ${checkIcon}</li>`;
        });

        htmlPregunta += `</ul></div>`;
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
    document.getElementById(modalId).style.display = 'flex';
    document.getElementById(modalId).classList.remove('hidden');
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.getElementById(modalId).classList.add('hidden');
}