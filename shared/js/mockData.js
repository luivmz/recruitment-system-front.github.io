// ==========================================
// MOCK DATABASE COMPLETA - DATOS AMPLIADOS
// ==========================================

const DB = {
    roles: ["admin", "empresa", "postulante"],

    usuarios: [
        { id: 1, email: "admin@talentohub.com", password: "123456", rol: "admin" },
        // Usuarios Empresa (4 empresas)
        { id: 2, email: "rrhh@techcorp.com", password: "123456", rol: "empresa" },
        { id: 4, email: "contacto@creativeagency.io", password: "123456", rol: "empresa" },
        { id: 7, email: "talento@globaldata.pe", password: "123456", rol: "empresa" },
        { id: 8, email: "jobs@cloudnet.com", password: "123456", rol: "empresa" },
        // Usuarios Postulantes (5 postulantes)
        { id: 3, email: "juan.perez@email.com", password: "123456", rol: "postulante" },
        { id: 5, email: "m.garcia@gmail.com", password: "123456", rol: "postulante" },
        { id: 6, email: "l.vargas@outlook.com", password: "123456", rol: "postulante" },
        { id: 9, email: "c.ramirez@email.com", password: "123456", rol: "postulante" },
        { id: 10, email: "d.castro@email.com", password: "123456", rol: "postulante" }
    ],

    empresas: [
        {
            id: 1, user_id: 2,
            ruc: "20543219876", razon_social: "TechCorp Solutions S.A.C.",
            nombre: "TechCorp Solutions", sector: "Desarrollo de Software",
            tamano: "51-200", ubicacion: "Huancayo, Perú",
            telefono: "064-234567", web: "https://techcorp.pe",
            contacto_nombre: "Carlos Mendoza", contacto_cargo: "Jefe de RRHH",
            descripcion: "Líderes en soluciones ERP para el sector minero.",
            logo: "https://api.dicebear.com/7.x/initials/svg?seed=TechCorp"
        },
        {
            id: 2, user_id: 4,
            ruc: "20123456789", razon_social: "Creative Agency IO E.I.R.L.",
            nombre: "Creative Agency IO", sector: "Marketing & Diseño",
            tamano: "11-50", ubicacion: "Lima, Perú",
            telefono: "01-4445555", web: "https://creativeagency.io",
            contacto_nombre: "Lucía Fernández", contacto_cargo: "Directora Creativa",
            descripcion: "Agencia boutique enfocada en branding digital.",
            logo: "https://api.dicebear.com/7.x/initials/svg?seed=Creative"
        },
        {
            id: 3, user_id: 7,
            ruc: "20987654321", razon_social: "Global Data Analytics S.A.",
            nombre: "Global Data Analytics", sector: "Data Science & IA",
            tamano: "200+", ubicacion: "Arequipa, Perú",
            telefono: "054-987654", web: "https://globaldata.pe",
            contacto_nombre: "Fernando Ríos", contacto_cargo: "Talent Acquisition",
            descripcion: "Transformamos datos en decisiones estratégicas.",
            logo: "https://api.dicebear.com/7.x/initials/svg?seed=GlobalData"
        },
        {
            id: 4, user_id: 8,
            ruc: "20334455667", razon_social: "CloudNet Systems S.R.L.",
            nombre: "CloudNet Systems", sector: "Telecomunicaciones",
            tamano: "51-200", ubicacion: "Trujillo, Perú",
            telefono: "044-223344", web: "https://cloudnet.com",
            contacto_nombre: "Ana Torres", contacto_cargo: "Gerente de Operaciones",
            descripcion: "Infraestructura cloud y ciberseguridad corporativa.",
            logo: "https://api.dicebear.com/7.x/initials/svg?seed=CloudNet"
        }
    ],

    postulantes: [
        {
            id: 20, user_id: 3, 
            nombre: "Juan", apellidos: "Pérez", 
            fecha_nacimiento: "1995-08-15", dni: "70123456", telefono: "999111222", ubicacion: "Lima, Perú",
            nivel_educacion: "Universitario Completo", institucion: "Universidad Nacional de Ingeniería (UNI)", profesion: "Ingeniero de Sistemas",
            experiencia_anios: 4, disponibilidad_viajar: "Si", habilidades: ["React", "Node.js", "SQL"], 
            linkedin: "https://linkedin.com/in/juanperez", expectativa_salarial: 4500,
            cv_url: "/cv/juan_perez.pdf", foto: "https://i.pravatar.cc/150?u=3"
        },
        {
            id: 21, user_id: 5, 
            nombre: "Maria", apellidos: "García", 
            fecha_nacimiento: "1998-03-22", dni: "71234567", telefono: "988222333", ubicacion: "Arequipa, Perú",
            nivel_educacion: "Universitario Completo", institucion: "Universidad Católica San Pablo", profesion: "Diseñadora UX/UI",
            experiencia_anios: 3, disponibilidad_viajar: "No", habilidades: ["Figma", "Adobe XD", "User Research"], 
            linkedin: "https://linkedin.com/in/mariagarcia", expectativa_salarial: 3500,
            cv_url: "/cv/m_garcia.pdf", foto: "https://i.pravatar.cc/150?u=5"
        },
        {
            id: 22, user_id: 6, 
            nombre: "Luis", apellidos: "Vargas", 
            fecha_nacimiento: "2000-11-05", dni: "72345678", telefono: "977333444", ubicacion: "Huancayo, Perú",
            nivel_educacion: "Técnico Completo", institucion: "Senati", profesion: "Desarrollador Frontend",
            experiencia_anios: 2, disponibilidad_viajar: "Si", habilidades: ["Vue.js", "Tailwind CSS", "JavaScript"], 
            linkedin: "https://linkedin.com/in/luisvargas", expectativa_salarial: 2500,
            cv_url: "/cv/l_vargas.pdf", foto: "https://i.pravatar.cc/150?u=6"
        },
        {
            id: 23, user_id: 9, 
            nombre: "Carlos", apellidos: "Ramírez", 
            fecha_nacimiento: "1992-07-10", dni: "40123456", telefono: "966444555", ubicacion: "Trujillo, Perú",
            nivel_educacion: "Postgrado/Maestría", institucion: "Universidad Nacional de Trujillo", profesion: "Data Scientist",
            experiencia_anios: 6, disponibilidad_viajar: "Si", habilidades: ["Python", "Machine Learning", "Power BI"], 
            linkedin: "https://linkedin.com/in/carlosramirez", expectativa_salarial: 7000,
            cv_url: "/cv/c_ramirez.pdf", foto: "https://i.pravatar.cc/150?u=9"
        },
        {
            id: 24, user_id: 10, 
            nombre: "Diana", apellidos: "Castro", 
            fecha_nacimiento: "1996-01-30", dni: "74561230", telefono: "955555666", ubicacion: "Lima, Perú",
            nivel_educacion: "Universitario Completo", institucion: "Universidad de Lima", profesion: "Especialista en Marketing",
            experiencia_anios: 4, disponibilidad_viajar: "No", habilidades: ["SEO", "Google Ads", "Content Strategy"], 
            linkedin: "https://linkedin.com/in/dianacastro", expectativa_salarial: 4000,
            cv_url: "/cv/d_castro.pdf", foto: "https://i.pravatar.cc/150?u=10"
        }
    ],

    categorias: [
        { id: 1, nombre: "Programación", icono: "code" },
        { id: 2, nombre: "Diseño UX/UI", icono: "palette" },
        { id: 3, nombre: "Marketing Digital", icono: "trending-up" },
        { id: 4, nombre: "Ciberseguridad", icono: "shield-check" },
        { id: 5, nombre: "Data Science", icono: "database" }
    ],

    ofertas: [
        {
            id: 501, empresa_id: 1, titulo: "Backend Developer Senior", categoria_id: 1,
            descripcion: "Buscamos experto en microservicios y bases de datos relacionales.",
            sueldo: 5500, modalidad: "Remoto", ubicacion: "Remoto", estado: "activa", fecha_creacion: "2026-04-01"
        },
        {
            id: 502, empresa_id: 1, titulo: "Analista de Sistemas Jr", categoria_id: 1,
            descripcion: "Oportunidad para egresados con ganas de aprender arquitecturas cloud.",
            sueldo: 2500, modalidad: "Híbrido", ubicacion: "Huancayo, Perú", estado: "activa", fecha_creacion: "2026-04-05"
        },
        {
            id: 503, empresa_id: 2, titulo: "UX Designer Pro", categoria_id: 2,
            descripcion: "Rediseño de plataformas e-commerce a gran escala.",
            sueldo: 4200, modalidad: "Presencial", ubicacion: "Lima, Perú", estado: "activa", fecha_creacion: "2026-04-07"
        },
        {
            id: 504, empresa_id: 1, titulo: "Especialista en Redes", categoria_id: 4,
            descripcion: "Configuración de firewalls y seguridad perimetral.",
            sueldo: 3800, modalidad: "Híbrido", ubicacion: "Huancayo, Perú", estado: "cerrada", fecha_creacion: "2026-03-20"
        },
        {
            id: 505, empresa_id: 3, titulo: "Data Scientist", categoria_id: 5,
            descripcion: "Modelado predictivo y análisis de grandes volúmenes de datos.",
            sueldo: 6000, modalidad: "Presencial", ubicacion: "Arequipa, Perú", estado: "activa", fecha_creacion: "2026-04-08"
        },
        {
            id: 506, empresa_id: 4, titulo: "Frontend Developer (Angular)", categoria_id: 1,
            descripcion: "Desarrollo de interfaces dinámicas para aplicaciones bancarias.",
            sueldo: 4500, modalidad: "Remoto", ubicacion: "Remoto", estado: "activa", fecha_creacion: "2026-04-02"
        },
        {
            id: 507, empresa_id: 2, titulo: "Digital Marketing Manager", categoria_id: 3,
            descripcion: "Gestión de pautas digitales y estrategia de contenidos.",
            sueldo: 3500, modalidad: "Híbrido", ubicacion: "Lima, Perú", estado: "activa", fecha_creacion: "2026-04-06"
        },
        {
            id: 508, empresa_id: 4, titulo: "Técnico Soporte IT", categoria_id: 1,
            descripcion: "Soporte técnico a usuarios internos y mantenimiento de equipos.",
            sueldo: 1800, modalidad: "Presencial", ubicacion: "Trujillo, Perú", estado: "activa", fecha_creacion: "2026-04-08"
        }
    ],

    postulaciones: [
        { id: 9001, oferta_id: 501, postulante_id: 20, fecha_postulacion: "2026-04-08T08:50", estado: "pendiente", comentario: "Me interesa el stack." },
        { id: 9002, oferta_id: 503, postulante_id: 21, fecha_postulacion: "2026-04-08T10:20", estado: "visto", comentario: "Tengo experiencia previa." },
        { id: 9003, oferta_id: 501, postulante_id: 22, fecha_postulacion: "2026-04-08T11:45", estado: "rechazado", comentario: "Busco nuevos retos." },
        { id: 9004, oferta_id: 502, postulante_id: 20, fecha_postulacion: "2026-04-08T12:00", estado: "entrevista", comentario: "Disponibilidad híbrida." },
        { id: 9005, oferta_id: 505, postulante_id: 23, fecha_postulacion: "2026-04-08T14:00", estado: "pendiente", comentario: "Experiencia en Machine Learning." },
        { id: 9006, oferta_id: 507, postulante_id: 24, fecha_postulacion: "2026-04-08T15:30", estado: "visto", comentario: "Vivo en Lima, disponibilidad inmediata." }
    ]
};

// =======================
// INIT LOCAL STORAGE
// =======================

function initDB() {
    let resetNeeded = false;
    
    Object.keys(DB).forEach(key => {
        const savedData = localStorage.getItem(key);
        if (!savedData || savedData === "[]" || savedData === "null") {
            resetNeeded = true;
        }
    });

    if (resetNeeded) {
        console.log("Inicializando base de datos mock completa...");
        Object.keys(DB).forEach(key => {
            localStorage.setItem(key, JSON.stringify(DB[key]));
        });
    }
}

window.resetDB = function() {
    console.log("Limpiando LocalStorage y reseteando base de datos...");
    localStorage.clear();
    initDB();
    location.reload(); 
}

initDB();