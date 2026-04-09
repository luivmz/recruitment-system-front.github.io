// =======================
// LOGIN
// =======================

function loginUser(email, password) {

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const user = usuarios.find(u =>
        u.email === email && u.password === password
    );

    if (!user) {
        alert("Credenciales incorrectas");
        return;
    }

    // Guardar sesión
    localStorage.setItem("currentUser", JSON.stringify(user));

    // Redirección según rol
    if (user.rol === "admin") {
        window.location.href = "../management/admin/dashboard_admin.html";
    } else if (user.rol === "empresa") {
        window.location.href = "../management/companies/dashboard_company.html";
    } else {
        window.location.href = "../management/candidates/dashboard_candidate.html";
    }
}


// =======================
// REGISTER
// =======================

function registerUser(email, password, rol) {

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const exists = usuarios.find(u => u.email === email);

    if (exists) {
        alert("Usuario ya existe");
        return;
    }

    const newUser = {
        id: usuarios.length + 1,
        email,
        password,
        rol
    };

    usuarios.push(newUser);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Registro exitoso");

    window.location.href = "login.html";
}

// =======================
// LÓGICA DE MULTI-STEP
// =======================
function nextStep() {
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    const role = document.getElementById("regRole").value;

    if (!email || !password || !role) {
        alert("Por favor completa correo, contraseña y selecciona un rol.");
        return;
    }

    // Ocultar paso 1
    document.getElementById("step1").classList.add("hidden");

    // Mostrar el paso correspondiente
    if (role === "postulante") {
        document.getElementById("step2-postulante").classList.remove("hidden");
    } else if (role === "empresa") {
        document.getElementById("step2-empresa").classList.remove("hidden");
    }
}

function prevStep() {
    document.getElementById("step2-postulante").classList.add("hidden");
    document.getElementById("step2-empresa").classList.add("hidden");
    document.getElementById("step1").classList.remove("hidden");
}

// =======================
// EVENTOS
// =======================
document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");

    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Datos Base
            const email = document.getElementById("regEmail").value;
            const password = document.getElementById("regPassword").value;
            const rol = document.getElementById("regRole").value;

            // Obtener arrays de BD local
            let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            let postulantes = JSON.parse(localStorage.getItem("postulantes")) || [];
            let empresas = JSON.parse(localStorage.getItem("empresas")) || [];

            // Validar que el usuario no exista
            if (usuarios.find(u => u.email === email)) {
                alert("Este correo ya está registrado.");
                prevStep();
                return;
            }

            // 1. Crear el nuevo usuario
            const newUserId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
            const newUser = { id: newUserId, email, password, rol };
            usuarios.push(newUser);

            // 2. Guardar el perfil detallado según el rol
            if (rol === "postulante") {
                const newPostulanteId = postulantes.length > 0 ? Math.max(...postulantes.map(p => p.id)) + 1 : 1;
                
                // NUEVO: Lógica para simular la subida del CV
                const cvInput = document.getElementById("p_cv");
                let cvUrlPath = "";
                if (cvInput.files.length > 0) {
                    // Simulamos la ruta donde se "guardaría" en un servidor real
                    cvUrlPath = `/cv/uploads/${cvInput.files[0].name}`;
                }

                const newPostulante = {
                    id: newPostulanteId,
                    user_id: newUserId,
                    nombre: document.getElementById("p_nombre").value,
                    apellidos: document.getElementById("p_apellidos").value,
                    fecha_nacimiento: document.getElementById("p_nacimiento").value,
                    dni: document.getElementById("p_dni").value,
                    telefono: document.getElementById("p_telefono").value,
                    ubicacion: document.getElementById("p_ubicacion").value,
                    nivel_educacion: document.getElementById("p_educacion").value,
                    institucion: document.getElementById("p_institucion").value,
                    profesion: document.getElementById("p_profesion").value,
                    experiencia_anios: parseInt(document.getElementById("p_experiencia").value) || 0,
                    disponibilidad_viajar: document.getElementById("p_viajar").value,
                    habilidades: document.getElementById("p_habilidades").value.split(",").map(s => s.trim()),
                    linkedin: document.getElementById("p_linkedin").value,
                    expectativa_salarial: parseFloat(document.getElementById("p_salario").value) || 0,
                    
                    // NUEVO: Guardamos la ruta del CV
                    cv_url: cvUrlPath,
                    // También podemos ponerle una foto por defecto
                    foto: `https://api.dicebear.com/7.x/initials/svg?seed=${document.getElementById("p_nombre").value}`
                };
                postulantes.push(newPostulante);
                localStorage.setItem("postulantes", JSON.stringify(postulantes));

            } else if (rol === "empresa") {
                const newEmpresaId = empresas.length > 0 ? Math.max(...empresas.map(e => e.id)) + 1 : 1;
                
                // Nota: Relacionamos esta empresa al user_id. Si el usuario luego quiere
                // agregar más empresas, podrá hacerlo desde su dashboard creando un nuevo
                // objeto en este arreglo `empresas` con su mismo `user_id`.
                const newEmpresa = {
                    id: newEmpresaId,
                    user_id: newUserId,
                    ruc: document.getElementById("e_ruc").value,
                    razon_social: document.getElementById("e_razon").value,
                    nombre: document.getElementById("e_comercial").value, // "nombre" es el nombre comercial
                    sector: document.getElementById("e_sector").value,
                    tamano: document.getElementById("e_tamano").value,
                    ubicacion: document.getElementById("e_ubicacion").value,
                    telefono: document.getElementById("e_telefono").value,
                    web: document.getElementById("e_web").value,
                    contacto_nombre: document.getElementById("e_contacto").value,
                    contacto_cargo: document.getElementById("e_cargo").value,
                    logo: document.getElementById("e_logo").value,
                    descripcion: document.getElementById("e_descripcion").value
                };
                empresas.push(newEmpresa);
                localStorage.setItem("empresas", JSON.stringify(empresas));
            }

            // 3. Actualizar usuarios y redirigir
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            alert("¡Registro exitoso! Ya puedes iniciar sesión.");
            window.location.href = "login.html";
        });
    }

    // LOGIN
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const email = loginForm.querySelector("input[type='email']").value;
            const password = loginForm.querySelector("input[type='password']").value;

            loginUser(email, password);
        });
    }

});

