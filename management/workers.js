// =======================
// ESTADO GLOBAL
// =======================
let postulantesData = [];
let usuariosData = [];

document.addEventListener("DOMContentLoaded", () => {
    // Validar que el usuario sea empresa o admin
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || (currentUser.rol !== "empresa" && currentUser.rol !== "admin")) {
        alert("Atención: Esta vista está pensada para Empresas. Es posible que algunas funciones de contacto requieran permisos.");
    }

    cargarDatos();
    configurarFiltros();
    
    // Disparamos el filtro inicial para que los ordene/rankee ni bien cargue la página
    document.getElementById("searchTexto").dispatchEvent(new Event('input'));
});

// =======================
// CARGAR DATOS
// =======================
function cargarDatos() {
    postulantesData = JSON.parse(localStorage.getItem("postulantes")) || [];
    usuariosData = JSON.parse(localStorage.getItem("usuarios")) || [];
}

// =======================
// RENDERIZAR TARJETAS CON RANKING
// =======================
function renderWorkers(data) {
    const grid = document.getElementById("workersGrid");
    grid.innerHTML = "";

    if (data.length === 0) {
        grid.innerHTML = "<p style='grid-column: 1/-1; text-align:center;'>No se encontraron talentos con esos filtros.</p>";
        return;
    }

    data.forEach((postulante, index) => {
        // Generar HTML de habilidades
        const skillsHTML = postulante.habilidades.map(skill => `<span class="skill-tag">${skill}</span>`).join("");

        // Determinar Medalla de Ranking (1, 2, 3 o Normal)
        let rankBadge = "";
        if (index === 0) {
            rankBadge = `<div class="rank-badge rank-gold">🥇 Rank #1 (${postulante.score} pts)</div>`;
        } else if (index === 1) {
            rankBadge = `<div class="rank-badge rank-silver">🥈 Rank #2 (${postulante.score} pts)</div>`;
        } else if (index === 2) {
            rankBadge = `<div class="rank-badge rank-bronze">🥉 Rank #3 (${postulante.score} pts)</div>`;
        } else {
            rankBadge = `<div class="rank-badge rank-normal">⭐ Rank #${index + 1} (${postulante.score} pts)</div>`;
        }

        grid.innerHTML += `
            <article class="worker-card">
                ${rankBadge}
                <img src="${postulante.foto || 'https://via.placeholder.com/90'}" alt="Foto de ${postulante.nombre}" class="worker-foto">
                <h3 class="worker-name">${postulante.nombre} ${postulante.apellidos}</h3>
                <p class="worker-profesion">${postulante.profesion}</p>
                
                <div class="worker-info">
                    <p>📍 ${postulante.ubicacion}</p>
                    <p>💼 ${postulante.experiencia_anios} años de exp.</p>
                </div>

                <div class="skills-tags">
                    ${skillsHTML}
                </div>

                <button class="btn-contact" onclick="abrirPerfil(${postulante.id})">Ver Perfil y Contactar</button>
            </article>
        `;
    });
}

// =======================
// FILTROS Y ALGORITMO DE RANKING
// =======================
function configurarFiltros() {
    const inputBusqueda = document.getElementById("searchTexto");
    const selectUbicacion = document.getElementById("filterUbicacion");
    const selectExperiencia = document.getElementById("filterExperiencia");

    const filtrarYRankear = () => {
        const texto = inputBusqueda.value.toLowerCase().trim();
        const ubicacion = selectUbicacion.value;
        const exp = selectExperiencia.value;

        // 1. Filtrar los que cumplen con las condiciones estrictas (ubicacion, experiencia)
        let filtrados = postulantesData.filter(p => {
            const stringBuscable = `${p.nombre} ${p.apellidos} ${p.profesion} ${p.habilidades.join(" ")}`.toLowerCase();
            const pasaTexto = texto === "" || stringBuscable.includes(texto);
            const pasaUbicacion = ubicacion === "" || p.ubicacion.includes(ubicacion);

            let pasaExp = true;
            if (exp === "0-2") pasaExp = p.experiencia_anios <= 2;
            if (exp === "3-5") pasaExp = p.experiencia_anios >= 3 && p.experiencia_anios <= 5;
            if (exp === "6+") pasaExp = p.experiencia_anios > 5;

            return pasaTexto && pasaUbicacion && pasaExp;
        });

        // 2. Sistema de Puntuación (Scoring) para el Ranking
        filtrados = filtrados.map(p => {
            let score = 0;

            // A) Puntos Base: Por experiencia y cantidad de herramientas que domina
            score += (p.experiencia_anios * 10);
            score += (p.habilidades.length * 5);

            // B) Puntos por Match Exacto (Si la empresa buscó algo específico)
            if (texto !== "") {
                const terminos = texto.split(" ").filter(t => t.length > 0);
                
                terminos.forEach(term => {
                    // Si el término está en su profesión, gana muchos puntos
                    if (p.profesion.toLowerCase().includes(term)) {
                        score += 50; 
                    }
                    // Si el término coincide con alguna habilidad específica
                    if (p.habilidades.some(h => h.toLowerCase().includes(term))) {
                        score += 40;
                    }
                });
            }

            return { ...p, score }; // Retornamos el objeto original agregándole su score
        });

        // 3. Ordenar arreglo de Mayor a Menor Puntuación
        filtrados.sort((a, b) => b.score - a.score);

        // 4. Renderizar
        renderWorkers(filtrados);
    };

    // Eventos
    inputBusqueda.addEventListener("input", filtrarYRankear);
    selectUbicacion.addEventListener("change", filtrarYRankear);
    selectExperiencia.addEventListener("change", filtrarYRankear);
}

// =======================
// MODAL DE CONTACTO
// =======================
function abrirPerfil(id) {
    const postulante = postulantesData.find(p => p.id === id);
    if (!postulante) return;

    // Buscar el correo electrónico cruzando con la tabla "usuarios" mediante el user_id
    const usuario = usuariosData.find(u => u.id === postulante.user_id);
    const correo = usuario ? usuario.email : "No disponible";

    const modal = document.getElementById("modalPerfil");
    const contenedor = document.getElementById("perfilCompleto");

    contenedor.innerHTML = `
        <div class="perfil-header">
            <img src="${postulante.foto}" alt="Foto">
            <div>
                <h2 style="margin:0;">${postulante.nombre} ${postulante.apellidos} <span style="font-size: 14px; background: #ffeeba; padding: 3px 8px; border-radius: 10px; color: #856404;">⭐ Score: ${postulante.score}</span></h2>
                <p style="color: var(--primary); font-weight:bold; margin: 5px 0;">${postulante.profesion}</p>
                <p style="margin:0; font-size: 14px; color: #666;">📍 ${postulante.ubicacion} | 🎓 ${postulante.nivel_educacion}</p>
            </div>
        </div>
        
        <div style="margin-top: 15px;">
            <p><strong>Experiencia:</strong> ${postulante.experiencia_anios} años</p>
            <p><strong>Expectativa Salarial:</strong> S/ ${postulante.expectativa_salarial}</p>
            <p><strong>Disponibilidad de Viaje:</strong> ${postulante.disponibilidad_viajar}</p>
        </div>

        <div class="contact-box">
            <h3>Información de Contacto</h3>
            <p>📧 <strong>Email:</strong> <a href="mailto:${correo}">${correo}</a></p>
            <p>📱 <strong>Teléfono:</strong> ${postulante.telefono}</p>
            <p>🔗 <strong>LinkedIn:</strong> <a href="${postulante.linkedin}" target="_blank">Ver Perfil</a></p>
            
            <div class="contact-form">
                <p style="margin-top: 15px; font-weight: bold;">Enviar mensaje directo (Simulación):</p>
                <textarea id="mensajeContacto" rows="3" placeholder="Hola ${postulante.nombre}, nos impresionó tu perfil (Score: ${postulante.score}) y nos gustaría..."></textarea>
                <button class="btn-contact" onclick="enviarMensaje('${postulante.nombre}')">Enviar Mensaje a ${postulante.nombre}</button>
            </div>
        </div>
    `;

    modal.style.display = "flex";
    modal.classList.remove("hidden");
}

function closeModal() {
    const modal = document.getElementById("modalPerfil");
    modal.style.display = "none";
    modal.classList.add("hidden");
}

function enviarMensaje(nombre) {
    const mensaje = document.getElementById("mensajeContacto").value;
    if(mensaje.trim() === "") {
        alert("Por favor, escribe un mensaje primero.");
        return;
    }
    alert(`¡Mensaje enviado exitosamente a ${nombre}!\n\n(Esto es una simulación)`);
    closeModal();
}