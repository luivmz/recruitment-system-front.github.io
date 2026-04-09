// =======================
// ESTADO GLOBAL
// =======================
let ofertas = [];
let empresas = [];
let categorias = [];

document.addEventListener("DOMContentLoaded", () => {
    loadData();
    loadFiltersOptions();
    readURLParams(); // Lee lo que viene del index.html
    renderOfertas(); // Dibuja la pantalla inicial
    setupEventListeners();
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
    if (params.has("loc")) document.getElementById("ubicacionFilter").value = params.get("loc");
}

// =======================
// EVENTOS PARA LOS FILTROS
// =======================
function setupEventListeners() {
    const inputs = ["searchInput", "categoriaFilter", "ubicacionFilter", "modalidadFilter", "empresaFilter", "fechaFilter"];
    inputs.forEach(id => {
        document.getElementById(id).addEventListener("input", renderOfertas);
    });
    
    // Cerrar modal haciendo clic afuera
    document.getElementById("jobModal").addEventListener("click", (e) => {
        if (e.target.id === "jobModal") closeModal();
    });
}

// =======================
// FILTRAR Y DIBUJAR OFERTAS
// =======================
function renderOfertas() {
    // 1. Obtener valores de los filtros
    const q = document.getElementById("searchInput").value.toLowerCase();
    const cat = document.getElementById("categoriaFilter").value;
    const loc = document.getElementById("ubicacionFilter").value.toLowerCase();
    const mod = document.getElementById("modalidadFilter").value;
    const emp = document.getElementById("empresaFilter").value;
    const orden = document.getElementById("fechaFilter").value;

    // 2. Iniciar con ofertas activas
    let filtradas = ofertas.filter(o => o.estado === "activa");

    // 3. Aplicar filtros
    if (q) filtradas = filtradas.filter(o => o.titulo.toLowerCase().includes(q) || o.descripcion.toLowerCase().includes(q));
    if (cat) filtradas = filtradas.filter(o => o.categoria_id == cat);
    if (loc) filtradas = filtradas.filter(o => o.ubicacion.toLowerCase().includes(loc));
    if (mod) filtradas = filtradas.filter(o => o.modalidad === mod);
    if (emp) filtradas = filtradas.filter(o => o.empresa_id == emp);

    // 4. Ordenar por fecha
    filtradas.sort((a, b) => {
        const dateA = new Date(a.fecha_creacion);
        const dateB = new Date(b.fecha_creacion);
        return orden === "recientes" ? dateB - dateA : dateA - dateB;
    });

    // 5. Dibujar en HTML
    const container = document.getElementById("jobsContainer");
    document.getElementById("resultados-resumen").textContent = `Mostrando ${filtradas.length} oferta(s) encontrada(s)`;
    container.innerHTML = "";

    if (filtradas.length === 0) {
        container.innerHTML = `<p style="grid-column: 1 / -1; text-align: center;">No hay ofertas que coincidan con tu búsqueda.</p>`;
        return;
    }

    filtradas.forEach(oferta => {
        const empresa = empresas.find(e => e.id === oferta.empresa_id);
        const categoria = categorias.find(c => c.id === oferta.categoria_id);

        container.innerHTML += `
            <div class="job-card" onclick="openModal(${oferta.id})">
                <div class="job-card-header">
                    <img src="${empresa.logo}" alt="Logo ${empresa.nombre}" class="empresa-logo-mini">
                    <div>
                        <h3>${oferta.titulo}</h3>
                        <p class="empresa-nombre">${empresa.nombre}</p>
                    </div>
                </div>
                <div class="job-card-body">
                    <span class="badge badge-cat">${categoria ? categoria.nombre : 'General'}</span>
                    <span class="badge badge-mod">${oferta.modalidad}</span>
                </div>
                <p class="ubicacion">📍 ${oferta.ubicacion}</p>
                <p class="sueldo">💰 S/ ${oferta.sueldo}</p>
                <button class="btn-ver-mas">Ver detalles</button>
            </div>
        `;
    });
}

// =======================
// MODAL DE DETALLES
// =======================
function openModal(ofertaId) {
    const oferta = ofertas.find(o => o.id === ofertaId);
    const empresa = empresas.find(e => e.id === oferta.empresa_id);
    const modal = document.getElementById("jobModal");

    // Construimos el interior del modal con información extendida
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            
            <div class="modal-header-info">
                <img src="${empresa.logo}" alt="Logo" class="empresa-logo-grande">
                <div>
                    <h2>${oferta.titulo}</h2>
                    <h3>${empresa.nombre} - ${empresa.sector}</h3>
                </div>
            </div>

            <div class="modal-body-info">
                <p><strong>Descripción de la Empresa:</strong> ${empresa.descripcion}</p>
                <hr>
                <p><strong>Ubicación del puesto:</strong> ${oferta.ubicacion}</p>
                <p><strong>Modalidad:</strong> ${oferta.modalidad}</p>
                <p><strong>Sueldo Ofrecido:</strong> S/ ${oferta.sueldo}</p>
                <p><strong>Publicado el:</strong> ${new Date(oferta.fecha_creacion).toLocaleDateString()}</p>
                <hr>
                <h4>Descripción del empleo:</h4>
                <p>${oferta.descripcion}</p>
            </div>

            <button class="btn-postular" onclick="postular(${oferta.id})">Postular Ahora</button>
        </div>
    `;

    modal.style.display = "flex";
}

function closeModal() {
    document.getElementById("jobModal").style.display = "none";
}

// =======================
// POSTULAR
// =======================
function postular(ofertaId) {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
        alert("Para postular, primero debes iniciar sesión.");
        window.location.href = "../auth/login.html";
        return;
    }

    if (user.rol !== "postulante") {
        alert("¡Aviso! Solo los usuarios con rol 'postulante' pueden aplicar a las ofertas.");
        return;
    }

    const postulantes = JSON.parse(localStorage.getItem("postulantes"));
    let postulaciones = JSON.parse(localStorage.getItem("postulaciones")) || [];
    const postulante = postulantes.find(p => p.user_id === user.id);

    const yaPostulo = postulaciones.find(p => p.oferta_id === ofertaId && p.postulante_id === postulante.id);

    if (yaPostulo) {
        alert("Ya estás postulando a esta oferta.");
        return;
    }

    // Registrar postulación
    postulaciones.push({
        id: Date.now(), // ID único temporal
        oferta_id: ofertaId,
        postulante_id: postulante.id,
        fecha_postulacion: new Date().toISOString(),
        estado: "pendiente",
        comentario: "Postulación rápida desde la bolsa de empleos."
    });

    localStorage.setItem("postulaciones", JSON.stringify(postulaciones));
    alert("¡Postulación enviada con éxito! Mucha suerte.");
    closeModal();
}