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
        
        // Usuarios Postulantes ORIGINALES (5 postulantes)
        { id: 3, email: "juan.perez@email.com", password: "123456", rol: "postulante" },
        { id: 5, email: "m.garcia@gmail.com", password: "123456", rol: "postulante" },
        { id: 6, email: "l.vargas@outlook.com", password: "123456", rol: "postulante" },
        { id: 9, email: "c.ramirez@email.com", password: "123456", rol: "postulante" },
        { id: 10, email: "d.castro@email.com", password: "123456", rol: "postulante" },
        
        // NUEVOS Usuarios Postulantes (Para Ranking y Filtros Avanzados)
        { id: 11, email: "j.gomez@email.com", password: "123456", rol: "postulante" }, // Senior Backend
        { id: 12, email: "a.torres@email.com", password: "123456", rol: "postulante" }, // Senior Frontend
        { id: 13, email: "r.silva@email.com", password: "123456", rol: "postulante" }, // Mid Fullstack
        { id: 14, email: "l.mendoza@email.com", password: "123456", rol: "postulante" }, // Junior Data Analyst
        { id: 15, email: "p.rojas@email.com", password: "123456", rol: "postulante" }  // Senior Ciberseguridad
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
        // ORIGINALES
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
        },

        // ==========================================
        // NUEVOS POSTULANTES (Para Pruebas de Ranking)
        // ==========================================
        {
            id: 25, user_id: 11, 
            nombre: "Jorge", apellidos: "Gómez", 
            fecha_nacimiento: "1990-05-12", dni: "45871236", telefono: "911222333", ubicacion: "Lima, Perú",
            nivel_educacion: "Postgrado/Maestría", institucion: "Pontificia Universidad Católica del Perú", profesion: "Arquitecto Backend",
            experiencia_anios: 8, disponibilidad_viajar: "Si", 
            // 10 Habilidades para perfil top rankeado
            habilidades: ["Java", "Spring Boot", "Microservicios", "Docker", "Kubernetes", "AWS", "PostgreSQL", "Redis", "GraphQL", "CI/CD"], 
            linkedin: "https://linkedin.com/in/jgomez", expectativa_salarial: 8500,
            cv_url: "/cv/j_gomez.pdf", foto: "https://i.pravatar.cc/150?u=11"
        },
        {
            id: 26, user_id: 12, 
            nombre: "Andrea", apellidos: "Torres", 
            fecha_nacimiento: "1994-12-08", dni: "76543210", telefono: "922333444", ubicacion: "Arequipa, Perú",
            nivel_educacion: "Universitario Completo", institucion: "Universidad Católica San Pablo", profesion: "Senior Frontend Developer",
            experiencia_anios: 5, disponibilidad_viajar: "No", 
            // 10 Habilidades para perfil top rankeado en Frontend
            habilidades: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "Jest", "Cypress", "Figma", "Web Performance", "Git"], 
            linkedin: "https://linkedin.com/in/atorres", expectativa_salarial: 6000,
            cv_url: "/cv/a_torres.pdf", foto: "https://i.pravatar.cc/150?u=12"
        },
        {
            id: 27, user_id: 13, 
            nombre: "Roberto", apellidos: "Silva", 
            fecha_nacimiento: "1997-09-25", dni: "70981234", telefono: "933444555", ubicacion: "Trujillo, Perú",
            nivel_educacion: "Universitario Completo", institucion: "Universidad Privada Antenor Orrego", profesion: "Fullstack Developer",
            experiencia_anios: 3, disponibilidad_viajar: "Si", 
            // 7 Habilidades (Perfil intermedio)
            habilidades: ["Node.js", "Express", "MongoDB", "Vue.js", "JavaScript", "HTML5", "CSS3"], 
            linkedin: "https://linkedin.com/in/rsilva", expectativa_salarial: 4000,
            cv_url: "/cv/r_silva.pdf", foto: "https://i.pravatar.cc/150?u=13"
        },
        {
            id: 28, user_id: 14, 
            nombre: "Lucía", apellidos: "Mendoza", 
            fecha_nacimiento: "2001-04-18", dni: "78123456", telefono: "944555666", ubicacion: "Huancayo, Perú",
            nivel_educacion: "Universitario Incompleto", institucion: "Universidad Continental", profesion: "Data Analyst Jr.",
            experiencia_anios: 1, disponibilidad_viajar: "No", 
            // 4 Habilidades (Perfil Junior)
            habilidades: ["Excel Avanzado", "SQL Básico", "Power BI", "Python"], 
            linkedin: "https://linkedin.com/in/lmendoza", expectativa_salarial: 1800,
            cv_url: "/cv/l_mendoza.pdf", foto: "https://i.pravatar.cc/150?u=14"
        },
        {
            id: 29, user_id: 15, 
            nombre: "Pedro", apellidos: "Rojas", 
            fecha_nacimiento: "1991-11-03", dni: "42345678", telefono: "955666777", ubicacion: "Remoto",
            nivel_educacion: "Universitario Completo", institucion: "Universidad Nacional Mayor de San Marcos", profesion: "Especialista en Ciberseguridad",
            experiencia_anios: 7, disponibilidad_viajar: "Si", 
            // 10 Habilidades para perfil top rankeado en Seguridad
            habilidades: ["Ethical Hacking", "Penetration Testing", "Linux", "Wireshark", "Cryptography", "Python", "Bash", "OWASP", "ISO 27001", "SIEM"], 
            linkedin: "https://linkedin.com/in/projas", expectativa_salarial: 7500,
            cv_url: "/cv/p_rojas.pdf", foto: "https://i.pravatar.cc/150?u=15"
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
        // ==========================================
        // OFERTA 501: Desarrollador Frontend React
        // ==========================================
        { id: 9001, oferta_id: 501, postulante_id: 20, fecha_postulacion: "2026-04-05T10:00", estado: "entrevista", comentario: "Buen perfil fullstack, encaja con lo que buscamos." },
        { id: 9002, oferta_id: 501, postulante_id: 25, fecha_postulacion: "2026-04-06T11:30", estado: "pendiente", comentario: "Excelente dominio exclusivo de React y UI." },
        { id: 9003, oferta_id: 501, postulante_id: 28, fecha_postulacion: "2026-04-07T09:15", estado: "visto", comentario: "Perfil Junior, pero con mucho potencial y buen portafolio." },
        { id: 9004, oferta_id: 501, postulante_id: 22, fecha_postulacion: "2026-04-08T14:00", estado: "rechazado", comentario: "Su perfil está más orientado a Data, no a Frontend." },

        // ==========================================
        // OFERTA 502: Especialista en Marketing Digital
        // ==========================================
        { id: 9005, oferta_id: 502, postulante_id: 21, fecha_postulacion: "2026-04-02T16:20", estado: "entrevista", comentario: "Mucha experiencia en campañas y SEO." },
        { id: 9006, oferta_id: 502, postulante_id: 29, fecha_postulacion: "2026-04-05T08:45", estado: "visto", comentario: "Fuerte en Google Analytics y Growth Hacking." },
        { id: 9007, oferta_id: 502, postulante_id: 26, fecha_postulacion: "2026-04-08T10:10", estado: "pendiente", comentario: "Interesante cruce con UX, podría aportar valor al equipo." },

        // ==========================================
        // OFERTA 503: Diseñador UX/UI Senior
        // ==========================================
        { id: 9008, oferta_id: 503, postulante_id: 26, fecha_postulacion: "2026-04-01T09:00", estado: "entrevista", comentario: "Portafolio impecable en Figma y buen manejo de usuarios." },
        { id: 9009, oferta_id: 503, postulante_id: 21, fecha_postulacion: "2026-04-03T11:20", estado: "visto", comentario: "Sabe diseño y marketing, buen complemento." },
        { id: 9010, oferta_id: 503, postulante_id: 25, fecha_postulacion: "2026-04-06T15:40", estado: "rechazado", comentario: "Perfil demasiado técnico (programador), buscamos puro diseño visual." },

        // ==========================================
        // OFERTA 504: Ingeniero de Datos
        // ==========================================
        { id: 9011, oferta_id: 504, postulante_id: 23, fecha_postulacion: "2026-04-04T10:00", estado: "entrevista", comentario: "Seniority alto en Machine Learning y Big Data." },
        { id: 9012, oferta_id: 504, postulante_id: 22, fecha_postulacion: "2026-04-05T14:30", estado: "visto", comentario: "Buen nivel de SQL y Python, candidato sólido." },
        { id: 9013, oferta_id: 504, postulante_id: 27, fecha_postulacion: "2026-04-07T12:00", estado: "pendiente", comentario: "Es Arquitecto Backend, pero podría adaptarse a Data Engineer." },

        // ==========================================
        // OFERTA 505: Desarrollador Backend Node.js
        // ==========================================
        { id: 9014, oferta_id: 505, postulante_id: 24, fecha_postulacion: "2026-04-02T13:15", estado: "entrevista", comentario: "Experto en Node, APIs y Docker. Justo lo que pedimos." },
        { id: 9015, oferta_id: 505, postulante_id: 27, fecha_postulacion: "2026-04-04T09:45", estado: "visto", comentario: "Arquitecto Backend muy sólido, pedir pretensiones salariales." },
        { id: 9016, oferta_id: 505, postulante_id: 20, fecha_postulacion: "2026-04-06T16:20", estado: "pendiente", comentario: "Sabe Node, falta evaluar en prueba técnica." },
        { id: 9017, oferta_id: 505, postulante_id: 23, fecha_postulacion: "2026-04-08T11:10", estado: "rechazado", comentario: "Perfil enfocado en Python/Data, no maneja Node.js." },

        // ==========================================
        // OFERTA 506: Gerente de Proyectos TI
        // ==========================================
        { id: 9018, oferta_id: 506, postulante_id: 20, fecha_postulacion: "2026-04-01T08:30", estado: "visto", comentario: "Tiene liderazgo en equipos ágiles." },
        { id: 9019, oferta_id: 506, postulante_id: 27, fecha_postulacion: "2026-04-03T10:00", estado: "entrevista", comentario: "Perfil integral de arquitectura y gestión de equipos." },
        { id: 9020, oferta_id: 506, postulante_id: 24, fecha_postulacion: "2026-04-05T15:45", estado: "pendiente", comentario: "Postula para dar el salto de Dev a Management." },

        // ==========================================
        // OFERTA 507: Analista de QA
        // ==========================================
        { id: 9021, oferta_id: 507, postulante_id: 28, fecha_postulacion: "2026-04-06T09:20", estado: "entrevista", comentario: "Conoce frameworks de pruebas como Cypress y Jest." },
        { id: 9022, oferta_id: 507, postulante_id: 25, fecha_postulacion: "2026-04-07T14:10", estado: "visto", comentario: "Buen entendimiento de pruebas unitarias en Frontend." },
        { id: 9023, oferta_id: 507, postulante_id: 22, fecha_postulacion: "2026-04-09T08:00", estado: "pendiente", comentario: "Perfil analítico, podría funcionar para QA manual." },

        // ==========================================
        // OFERTA 508: Especialista en Ciberseguridad
        // ==========================================
        { id: 9024, oferta_id: 508, postulante_id: 24, fecha_postulacion: "2026-04-05T11:00", estado: "visto", comentario: "Maneja AWS y redes, buen acercamiento a la seguridad." },
        { id: 9025, oferta_id: 508, postulante_id: 27, fecha_postulacion: "2026-04-06T13:30", estado: "entrevista", comentario: "Conocimientos profundos en seguridad backend y vulnerabilidades." }
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