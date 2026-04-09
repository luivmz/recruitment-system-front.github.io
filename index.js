// =======================
// INIT APP
// =======================
document.addEventListener("DOMContentLoaded", () => {
    loadCategorias();
});


// =======================
// CARGAR CATEGORIAS
// =======================
function loadCategorias() {

    const categorias = JSON.parse(localStorage.getItem("categorias")) || [];
    const select = document.getElementById("categoriaSelect");

    if (!select) return;

    categorias.forEach(cat => {
        select.innerHTML += `
            <option value="${cat.id}">${cat.nombre}</option>
        `;
    });
}


// =======================
// OBTENER UBICACIÓN REAL
// =======================
function getUserLocation() {

    return new Promise((resolve, reject) => {

        if (!navigator.geolocation) {
            reject("Geolocalización no soportada");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                console.log("📍 Coordenadas:", lat, lon);

                resolve({ lat, lon });
            },
            error => {
                console.error("Error ubicación:", error);
                reject("No se pudo obtener ubicación");
            }
        );
    });
}


// =======================
// CONVERTIR COORDENADAS A CIUDAD (API REAL)
// =======================
async function getCityFromCoords(lat, lon) {

    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
        );

        const data = await response.json();

        const ciudad =
            data.address.city ||
            data.address.town ||
            data.address.state ||
            "Lima"; // fallback

        console.log("📍 Ciudad detectada:", ciudad);

        return ciudad;

    } catch (error) {
        console.error("Error obteniendo ciudad:", error);
        return "Lima"; // fallback
    }
}



// =======================
// BUSCADOR 
// =======================
function buscarOfertas() {
    const inputTexto = document.getElementById("searchInput").value.trim();
    const categoria = document.getElementById("categoriaSelect").value;
    const ubicacion = document.getElementById("ubicacionSelect").value;

    // Usamos URLSearchParams para armar la URL fácilmente
    const params = new URLSearchParams();

    if (inputTexto) params.append("q", inputTexto);
    if (categoria) params.append("cat", categoria);
    
    // Solo enviamos la ubicación si seleccionó una válida (ignoramos la opción por defecto)
    if (ubicacion && !ubicacion.includes("Todo el Perú")) {
        params.append("loc", ubicacion);
    }

    // AQUI ESTÁ EL CAMBIO: Agregamos "pages/" a la ruta
    window.location.href = `management/jobs.html?${params.toString()}`;
}

// =======================
// MOSTRAR RESULTADOS
// =======================
function mostrarResultados(ofertas) {

    let container = document.getElementById("results");

    // Crear contenedor si no existe
    if (!container) {
        container = document.createElement("div");
        container.id = "results";
        document.body.appendChild(container);
    }

    const empresas = JSON.parse(localStorage.getItem("empresas")) || [];
    const categorias = JSON.parse(localStorage.getItem("categorias")) || [];

    container.innerHTML = "<h2>Resultados</h2>";

    if (ofertas.length === 0) {
        container.innerHTML += "<p>No se encontraron resultados</p>";
        return;
    }

    ofertas.forEach(o => {

        const empresa = empresas.find(e => e.id === o.empresa_id);
        const cat = categorias.find(c => c.id === o.categoria_id);

        container.innerHTML += `
            <div class="job-card">
                <h3>${o.titulo}</h3>
                <p><strong>${empresa?.nombre}</strong></p>
                <p>${cat?.nombre}</p>
                <p>${o.modalidad}</p>
                <p>${empresa?.ubicacion}</p>
                <p>S/ ${o.sueldo}</p>
            </div>
        `;
    });
}