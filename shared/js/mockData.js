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
            sueldo: 5500, modalidad: "Remoto", ubicacion: "Remoto", estado: "activa", fecha_creacion: "2026-04-01",
            cuestionario: [
                {
                    id: "q1_501",
                    pregunta: "¿Qué patrón es fundamental para la comunicación asíncrona entre microservicios?",
                    opciones: ["Llamadas síncronas HTTP", "Arquitectura dirigida por eventos (Mensajería)", "Uso de una base de datos centralizada", "WebSockets exclusivos"],
                    respuesta_correcta: "Arquitectura dirigida por eventos (Mensajería)"
                },
                {
                    id: "q2_501",
                    pregunta: "¿Qué significan las siglas ACID en el contexto de bases de datos relacionales?",
                    opciones: ["Asynchronous, Concurrent, Isolated, Distributed", "Atomicidad, Consistencia, Aislamiento, Durabilidad", "Array, Cache, Integer, Double", "Access, Control, Identity, Data"],
                    respuesta_correcta: "Atomicidad, Consistencia, Aislamiento, Durabilidad"
                },
                {
                    id: "q3_501",
                    pregunta: "¿Qué herramienta se usa comúnmente para la orquestación de contenedores?",
                    opciones: ["Docker Compose", "Kubernetes", "Jenkins", "Ansible"],
                    respuesta_correcta: "Kubernetes"
                },
                {
                    id: "q4_501",
                    pregunta: "¿Cuál es el propósito principal de un API Gateway en una arquitectura de microservicios?",
                    opciones: ["Crear bases de datos", "Enrutar, autorizar y gestionar el tráfico hacia los microservicios", "Escribir el código frontend", "Compilar las imágenes de Docker"],
                    respuesta_correcta: "Enrutar, autorizar y gestionar el tráfico hacia los microservicios"
                },
                {
                    id: "q5_501",
                    pregunta: "¿Qué significa la 'normalización' en una base de datos relacional?",
                    opciones: ["Convertir todos los textos a minúsculas", "Hacer copias de seguridad diarias", "Organizar datos para reducir la redundancia e integridad de datos", "Aumentar la velocidad de lectura duplicando datos"],
                    respuesta_correcta: "Organizar datos para reducir la redundancia e integridad de datos"
                },
                {
                    id: "q6_501",
                    pregunta: "¿Qué patrón de diseño permite a un servicio manejar fallos en dependencias externas sin bloquearse o agotar recursos?",
                    opciones: ["Singleton", "Circuit Breaker", "Factory Method", "Observer"],
                    respuesta_correcta: "Circuit Breaker"
                }
            ]
        },
        {
            id: 502, empresa_id: 1, titulo: "Analista de Sistemas Jr", categoria_id: 1,
            descripcion: "Oportunidad para egresados con ganas de aprender arquitecturas cloud.",
            sueldo: 2500, modalidad: "Híbrido", ubicacion: "Huancayo, Perú", estado: "activa", fecha_creacion: "2026-04-05",
            cuestionario: [
                {
                    id: "q1_502",
                    pregunta: "¿Qué significan las siglas IaaS en Cloud Computing?",
                    opciones: ["Internet as a Service", "Infrastructure as a Service", "Integration as a System", "Identity as a Service"],
                    respuesta_correcta: "Infrastructure as a Service"
                },
                {
                    id: "q2_502",
                    pregunta: "¿Cuál es el modelo principal de despliegue en la nube donde los recursos se comparten entre varios clientes sobre internet?",
                    opciones: ["Nube Privada", "Nube Pública", "On-Premise", "Servidor Local"],
                    respuesta_correcta: "Nube Pública"
                },
                {
                    id: "q3_502",
                    pregunta: "¿Qué lenguaje estándar se usa ampliamente para el modelado visual de sistemas y procesos?",
                    opciones: ["HTML", "UML", "CSS", "SQL"],
                    respuesta_correcta: "UML"
                },
                {
                    id: "q4_502",
                    pregunta: "¿Cuál es el propósito del levantamiento de requerimientos en el desarrollo de software?",
                    opciones: ["Codificar la base de datos", "Diseñar los colores de la aplicación", "Entender y documentar qué debe hacer el sistema para satisfacer al cliente", "Comprar servidores físicos"],
                    respuesta_correcta: "Entender y documentar qué debe hacer el sistema para satisfacer al cliente"
                },
                {
                    id: "q5_502",
                    pregunta: "¿Qué es la escalabilidad horizontal?",
                    opciones: ["Añadir más memoria RAM a un servidor", "Añadir más instancias o servidores para distribuir la carga", "Cambiar el monitor por uno más ancho", "Reducir el tamaño de la base de datos"],
                    respuesta_correcta: "Añadir más instancias o servidores para distribuir la carga"
                },
                {
                    id: "q6_502",
                    pregunta: "¿Qué metodología ágil utiliza 'Sprints' como iteraciones de trabajo?",
                    opciones: ["Cascada (Waterfall)", "Scrum", "V-Model", "RUP"],
                    respuesta_correcta: "Scrum"
                }
            ]
        },
        {
            id: 503, empresa_id: 2, titulo: "UX Designer Pro", categoria_id: 2,
            descripcion: "Rediseño de plataformas e-commerce a gran escala.",
            sueldo: 4200, modalidad: "Presencial", ubicacion: "Lima, Perú", estado: "activa", fecha_creacion: "2026-04-07",
            cuestionario: [
                {
                    id: "q1_503",
                    pregunta: "¿Qué métrica es fundamental para medir el éxito de diseño en un e-commerce?",
                    opciones: ["Cantidad de colores usados", "Tasa de conversión", "Líneas de código CSS", "Número de animaciones"],
                    respuesta_correcta: "Tasa de conversión"
                },
                {
                    id: "q2_503",
                    pregunta: "¿Cuál de los siguientes es un principio heurístico de usabilidad de Jakob Nielsen?",
                    opciones: ["Uso exclusivo de iconos sin texto", "Visibilidad del estado del sistema", "Ocultar botones importantes", "Música de fondo automática"],
                    respuesta_correcta: "Visibilidad del estado del sistema"
                },
                {
                    id: "q3_503",
                    pregunta: "¿Qué es el 'Card Sorting'?",
                    opciones: ["Una técnica de investigación para descubrir cómo los usuarios agrupan la información", "Un juego de cartas para programadores", "Un plugin de Figma", "Una paleta de colores"],
                    respuesta_correcta: "Una técnica de investigación para descubrir cómo los usuarios agrupan la información"
                },
                {
                    id: "q4_503",
                    pregunta: "¿Por qué es crucial el enfoque 'Mobile First' en e-commerce actualmente?",
                    opciones: ["Porque programar para móviles es más rápido", "Porque la mayoría del tráfico de usuarios proviene de dispositivos móviles", "Porque los monitores de PC están obsoletos", "Porque Apple lo exige"],
                    respuesta_correcta: "Porque la mayoría del tráfico de usuarios proviene de dispositivos móviles"
                },
                {
                    id: "q5_503",
                    pregunta: "¿Qué elemento es crítico optimizar en la página de 'Checkout' para reducir el abandono del carrito?",
                    opciones: ["Un proceso claro, seguro y sin distracciones innecesarias", "Añadir pop-ups promocionales", "Poner enlaces a redes sociales", "Obligar al usuario a leer términos legales largos"],
                    respuesta_correcta: "Un proceso claro, seguro y sin distracciones innecesarias"
                },
                {
                    id: "q6_503",
                    pregunta: "¿Qué evalúa principalmente un mapa de calor (Heatmap)?",
                    opciones: ["La temperatura del servidor", "Las zonas de la pantalla donde los usuarios hacen más clic o prestan más atención", "La velocidad de carga de la web", "El tamaño de las imágenes"],
                    respuesta_correcta: "Las zonas de la pantalla donde los usuarios hacen más clic o prestan más atención"
                }
            ]
        },
        {
            id: 504, empresa_id: 1, titulo: "Especialista en Redes", categoria_id: 4,
            descripcion: "Configuración de firewalls y seguridad perimetral.",
            sueldo: 3800, modalidad: "Híbrido", ubicacion: "Huancayo, Perú", estado: "cerrada", fecha_creacion: "2026-03-20",
            cuestionario: [
                {
                    id: "q1_504",
                    pregunta: "¿En qué capa del modelo OSI opera principalmente un router?",
                    opciones: ["Capa 1 (Física)", "Capa 2 (Enlace de datos)", "Capa 3 (Red)", "Capa 7 (Aplicación)"],
                    respuesta_correcta: "Capa 3 (Red)"
                },
                {
                    id: "q2_504",
                    pregunta: "¿Qué protocolo se utiliza comúnmente para asignar direcciones IP de forma dinámica en una LAN?",
                    opciones: ["DNS", "FTP", "DHCP", "SMTP"],
                    respuesta_correcta: "DHCP"
                },
                {
                    id: "q3_504",
                    pregunta: "¿Qué es una DMZ en arquitectura de redes de seguridad?",
                    opciones: ["Una red local sin contraseñas", "Una zona desmilitarizada que expone servicios externos y aísla la red interna protegida", "Un software antivirus", "Un cable de fibra óptica"],
                    respuesta_correcta: "Una zona desmilitarizada que expone servicios externos y aísla la red interna protegida"
                },
                {
                    id: "q4_504",
                    pregunta: "¿Qué tipo de firewall tiene la capacidad de inspeccionar el estado de las conexiones activas?",
                    opciones: ["Packet Filtering", "Proxy Firewall", "Stateful Inspection Firewall", "Antivirus Local"],
                    respuesta_correcta: "Stateful Inspection Firewall"
                },
                {
                    id: "q5_504",
                    pregunta: "¿Cuál es el propósito principal de una VPN (Virtual Private Network)?",
                    opciones: ["Crear una conexión segura y cifrada a través de una red pública (como internet)", "Aumentar la velocidad de descarga", "Bloquear anuncios web", "Reemplazar al router Wi-Fi"],
                    respuesta_correcta: "Crear una conexión segura y cifrada a través de una red pública (como internet)"
                },
                {
                    id: "q6_504",
                    pregunta: "¿Qué comando de consola se utiliza para rastrear la ruta que toman los paquetes desde el origen hasta el destino?",
                    opciones: ["ping", "ipconfig", "traceroute (o tracert)", "netstat"],
                    respuesta_correcta: "traceroute (o tracert)"
                }
            ]
        },
        {
            id: 505, empresa_id: 3, titulo: "Data Scientist", categoria_id: 5,
            descripcion: "Modelado predictivo y análisis de grandes volúmenes de datos.",
            sueldo: 6000, modalidad: "Presencial", ubicacion: "Arequipa, Perú", estado: "activa", fecha_creacion: "2026-04-08",
            cuestionario: [
                {
                    id: "q1_505",
                    pregunta: "¿Qué algoritmo estadístico es el más adecuado para resolver problemas de clasificación binaria?",
                    opciones: ["Regresión Lineal", "K-Means", "Regresión Logística", "PCA"],
                    respuesta_correcta: "Regresión Logística"
                },
                {
                    id: "q2_505",
                    pregunta: "¿Qué significa el concepto de 'Overfitting' (Sobreajuste) al entrenar un modelo?",
                    opciones: ["Cuando el modelo es muy simple y no aprende", "Cuando el modelo memoriza los datos de entrenamiento y falla al predecir datos nuevos", "Cuando la base de datos es muy grande", "Cuando el modelo tarda poco en entrenar"],
                    respuesta_correcta: "Cuando el modelo memoriza los datos de entrenamiento y falla al predecir datos nuevos"
                },
                {
                    id: "q3_505",
                    pregunta: "¿Cuál es la librería más utilizada en Python para la manipulación y análisis de estructuras de datos (DataFrames)?",
                    opciones: ["TensorFlow", "Django", "Pandas", "Flask"],
                    respuesta_correcta: "Pandas"
                },
                {
                    id: "q4_505",
                    pregunta: "¿Para qué sirve el algoritmo PCA (Análisis de Componentes Principales)?",
                    opciones: ["Para conectarse a bases de datos SQL", "Para reducir la dimensionalidad de un conjunto de datos perdiendo la menor información posible", "Para entrenar redes neuronales profundas", "Para crear gráficos de barras"],
                    respuesta_correcta: "Para reducir la dimensionalidad de un conjunto de datos perdiendo la menor información posible"
                },
                {
                    id: "q5_505",
                    pregunta: "¿Qué métrica es más representativa para evaluar un modelo de clasificación si las clases están muy desbalanceadas?",
                    opciones: ["Accuracy (Exactitud)", "F1-Score", "Mean Squared Error (MSE)", "R2"],
                    respuesta_correcta: "F1-Score"
                },
                {
                    id: "q6_505",
                    pregunta: "¿Qué plataforma o framework se utiliza comúnmente para el procesamiento de Big Data en clústeres distribuidos?",
                    opciones: ["Apache Spark", "Excel", "SQLite", "Jupyter Notebook"],
                    respuesta_correcta: "Apache Spark"
                }
            ]
        },
        {
            id: 506, empresa_id: 4, titulo: "Frontend Developer (Angular)", categoria_id: 1,
            descripcion: "Desarrollo de interfaces dinámicas para aplicaciones bancarias.",
            sueldo: 4500, modalidad: "Remoto", ubicacion: "Remoto", estado: "activa", fecha_creacion: "2026-04-02",
            cuestionario: [
                {
                    id: "q1_506",
                    pregunta: "¿Qué lenguaje es la base principal y recomendada para desarrollar aplicaciones en Angular?",
                    opciones: ["JavaScript puro", "TypeScript", "Python", "PHP"],
                    respuesta_correcta: "TypeScript"
                },
                {
                    id: "q2_506",
                    pregunta: "¿Qué decorador se utiliza en Angular para definir la clase de un componente?",
                    opciones: ["@Injectable", "@NgModule", "@Component", "@Directive"],
                    respuesta_correcta: "@Component"
                },
                {
                    id: "q3_506",
                    pregunta: "¿Qué patrón de diseño utiliza Angular de manera nativa para proveer servicios a los componentes?",
                    opciones: ["MVC Clásico", "Dependency Injection (Inyección de Dependencias)", "Singleton global", "Factory Method"],
                    respuesta_correcta: "Dependency Injection (Inyección de Dependencias)"
                },
                {
                    id: "q4_506",
                    pregunta: "¿Qué método del ciclo de vida (Lifecycle hook) se ejecuta justo después de que Angular inicializa las propiedades enlazadas a datos (Inputs)?",
                    opciones: ["ngOnDestroy", "ngAfterViewInit", "ngOnInit", "ngDoCheck"],
                    respuesta_correcta: "ngOnInit"
                },
                {
                    id: "q5_506",
                    pregunta: "¿Qué biblioteca integra Angular por defecto para manejar la programación reactiva y operaciones asíncronas?",
                    opciones: ["Redux", "Axios", "RxJS", "jQuery"],
                    respuesta_correcta: "RxJS"
                },
                {
                    id: "q6_506",
                    pregunta: "¿Cuál es la sintaxis correcta en el HTML de Angular para enlazar un evento (Event Binding) como un clic a una función?",
                    opciones: ["onclick='metodo()'", "(click)='metodo()'", "[click]='metodo()'", "{{ click: metodo() }}"],
                    respuesta_correcta: "(click)='metodo()'"
                }
            ]
        },
        {
            id: 507, empresa_id: 2, titulo: "Digital Marketing Manager", categoria_id: 3,
            descripcion: "Gestión de pautas digitales y estrategia de contenidos.",
            sueldo: 3500, modalidad: "Híbrido", ubicacion: "Lima, Perú", estado: "activa", fecha_creacion: "2026-04-06",
            cuestionario: [
                {
                    id: "q1_507",
                    pregunta: "¿Qué indica la métrica CTR (Click-Through Rate)?",
                    opciones: ["El costo de la campaña", "El porcentaje de usuarios que hicieron clic en un enlace respecto al total de impresiones", "La cantidad de ventas realizadas", "El tiempo que un usuario pasa en la web"],
                    respuesta_correcta: "El porcentaje de usuarios que hicieron clic en un enlace respecto al total de impresiones"
                },
                {
                    id: "q2_507",
                    pregunta: "¿Cuál es la diferencia principal entre SEO y SEM?",
                    opciones: ["El SEO es para redes sociales y el SEM para web", "El SEO busca posicionamiento orgánico gratuito y el SEM involucra anuncios pagados", "El SEM es más lento que el SEO", "Ambos son exactamente lo mismo"],
                    respuesta_correcta: "El SEO busca posicionamiento orgánico gratuito y el SEM involucra anuncios pagados"
                },
                {
                    id: "q3_507",
                    pregunta: "¿Qué representa el 'Funnel' o Embudo de Conversión?",
                    opciones: ["Una herramienta de diseño gráfico", "Las etapas por las que pasa un usuario desde que conoce la marca hasta que realiza una compra", "El algoritmo de Google", "La base de datos de clientes"],
                    respuesta_correcta: "Las etapas por las que pasa un usuario desde que conoce la marca hasta que realiza una compra"
                },
                {
                    id: "q4_507",
                    pregunta: "¿Qué es una 'Landing Page' (Página de aterrizaje)?",
                    opciones: ["La página de 'Quiénes somos'", "Una página web diseñada específicamente para convertir visitantes en leads o ventas", "El perfil de Instagram de la empresa", "La página de error 404"],
                    respuesta_correcta: "Una página web diseñada específicamente para convertir visitantes en leads o ventas"
                },
                {
                    id: "q5_507",
                    pregunta: "¿Qué indicador mide el Costo de Adquisición de Cliente?",
                    opciones: ["CAC", "ROI", "LTV", "ROAS"],
                    respuesta_correcta: "CAC"
                },
                {
                    id: "q6_507",
                    pregunta: "¿Cuál de estas herramientas se usa comúnmente para la gestión unificada de redes sociales?",
                    opciones: ["Google Search Console", "Hootsuite (o Buffer)", "Figma", "Visual Studio Code"],
                    respuesta_correcta: "Hootsuite (o Buffer)"
                }
            ]
        },
        {
            id: 508, empresa_id: 4, titulo: "Técnico Soporte IT", categoria_id: 1,
            descripcion: "Soporte técnico a usuarios internos y mantenimiento de equipos.",
            sueldo: 1800, modalidad: "Presencial", ubicacion: "Trujillo, Perú", estado: "activa", fecha_creacion: "2026-04-08",
            cuestionario: [
                {
                    id: "q1_508",
                    pregunta: "¿Qué significan las siglas RAM?",
                    opciones: ["Read Access Module", "Random Access Memory", "Run Action Mode", "Routing Application Manager"],
                    respuesta_correcta: "Random Access Memory"
                },
                {
                    id: "q2_508",
                    pregunta: "¿Cuál es el primer paso recomendado en la metodología de resolución de problemas (troubleshooting)?",
                    opciones: ["Formatear la computadora", "Reemplazar el disco duro", "Identificar el problema comunicándose con el usuario y replicando el error", "Comprar una licencia de software nuevo"],
                    respuesta_correcta: "Identificar el problema comunicándose con el usuario y replicando el error"
                },
                {
                    id: "q3_508",
                    pregunta: "¿Qué herramienta nativa de Windows se utiliza para monitorear procesos bloqueados y el uso de recursos del sistema?",
                    opciones: ["Panel de Control", "Administrador de Tareas (Task Manager)", "Explorador de Archivos", "Paint"],
                    respuesta_correcta: "Administrador de Tareas (Task Manager)"
                },
                {
                    id: "q4_508",
                    pregunta: "¿Qué tipo de cable físico es el más utilizado para conectar estaciones de trabajo a un Switch en una red LAN local?",
                    opciones: ["Cable Coaxial", "Cable UTP (Par trenzado Cat 5e/6)", "Cable HDMI", "Cable USB-C"],
                    respuesta_correcta: "Cable UTP (Par trenzado Cat 5e/6)"
                },
                {
                    id: "q5_508",
                    pregunta: "¿Qué indica comúnmente el error HTTP 404 en el navegador de un usuario?",
                    opciones: ["Problema con la tarjeta de video", "El recurso o página web solicitada no fue encontrada", "El servidor está apagado", "Error de contraseña incorrecta"],
                    respuesta_correcta: "El recurso o página web solicitada no fue encontrada"
                },
                {
                    id: "q6_508",
                    pregunta: "¿Qué comando de la consola de Windows se utiliza para solicitar una nueva dirección IP al servidor DHCP?",
                    opciones: ["ping localhost", "chkdsk", "ipconfig /renew", "sfc /scannow"],
                    respuesta_correcta: "ipconfig /renew"
                }
            ]
        }
    ],

    postulaciones: [
        { 
            id: 9001, oferta_id: 501, postulante_id: 20, fecha_postulacion: "2026-04-08T08:50", estado: "pendiente", comentario: "Perfil excelente, falló 1 pregunta.",
            puntaje_cuestionario: 5, // Acertó 5 de 6
            respuestas_cuestionario: [
                { pregunta_id: "q1_501", respuesta_usuario: "Arquitectura dirigida por eventos (Mensajería)", es_correcta: true },
                { pregunta_id: "q2_501", respuesta_usuario: "Atomicidad, Consistencia, Aislamiento, Durabilidad", es_correcta: true },
                { pregunta_id: "q3_501", respuesta_usuario: "Docker Compose", es_correcta: false }, // Falló aquí
                { pregunta_id: "q4_501", respuesta_usuario: "Enrutar, autorizar y gestionar el tráfico hacia los microservicios", es_correcta: true },
                { pregunta_id: "q5_501", respuesta_usuario: "Organizar datos para reducir la redundancia e integridad de datos", es_correcta: true },
                { pregunta_id: "q6_501", respuesta_usuario: "Circuit Breaker", es_correcta: true }
            ]
        },
        { 
            id: 9002, oferta_id: 503, postulante_id: 21, fecha_postulacion: "2026-04-08T10:20", estado: "visto", comentario: "Buen conocimiento de UX.",
            puntaje_cuestionario: 6, // Acertó 6 de 6 (Puntaje Perfecto)
            respuestas_cuestionario: [
                { pregunta_id: "q1_503", respuesta_usuario: "Tasa de conversión", es_correcta: true },
                { pregunta_id: "q2_503", respuesta_usuario: "Visibilidad del estado del sistema", es_correcta: true },
                { pregunta_id: "q3_503", respuesta_usuario: "Una técnica de investigación para descubrir cómo los usuarios agrupan la información", es_correcta: true },
                { pregunta_id: "q4_503", respuesta_usuario: "Porque la mayoría del tráfico de usuarios proviene de dispositivos móviles", es_correcta: true },
                { pregunta_id: "q5_503", respuesta_usuario: "Un proceso claro, seguro y sin distracciones innecesarias", es_correcta: true },
                { pregunta_id: "q6_503", respuesta_usuario: "Las zonas de la pantalla donde los usuarios hacen más clic o prestan más atención", es_correcta: true }
            ]
        },
        { 
            id: 9003, oferta_id: 501, postulante_id: 22, fecha_postulacion: "2026-04-08T11:45", estado: "rechazado", comentario: "Falta conocimiento técnico para ser Senior.",
            puntaje_cuestionario: 2, // Acertó 2 de 6
            respuestas_cuestionario: [
                { pregunta_id: "q1_501", respuesta_usuario: "Llamadas síncronas HTTP", es_correcta: false },
                { pregunta_id: "q2_501", respuesta_usuario: "Atomicidad, Consistencia, Aislamiento, Durabilidad", es_correcta: true },
                { pregunta_id: "q3_501", respuesta_usuario: "Ansible", es_correcta: false },
                { pregunta_id: "q4_501", respuesta_usuario: "Crear bases de datos", es_correcta: false },
                { pregunta_id: "q5_501", respuesta_usuario: "Convertir todos los textos a minúsculas", es_correcta: false },
                { pregunta_id: "q6_501", respuesta_usuario: "Circuit Breaker", es_correcta: true }
            ]
        },
        { 
            id: 9004, oferta_id: 502, postulante_id: 20, fecha_postulacion: "2026-04-08T12:00", estado: "entrevista", comentario: "Disponibilidad híbrida.",
            puntaje_cuestionario: 5,
            respuestas_cuestionario: [
                { pregunta_id: "q1_502", respuesta_usuario: "Infrastructure as a Service", es_correcta: true },
                { pregunta_id: "q2_502", respuesta_usuario: "Nube Pública", es_correcta: true },
                { pregunta_id: "q3_502", respuesta_usuario: "UML", es_correcta: true },
                { pregunta_id: "q4_502", respuesta_usuario: "Codificar la base de datos", es_correcta: false },
                { pregunta_id: "q5_502", respuesta_usuario: "Añadir más instancias o servidores para distribuir la carga", es_correcta: true },
                { pregunta_id: "q6_502", respuesta_usuario: "Scrum", es_correcta: true }
            ]
        },
        { 
            id: 9005, oferta_id: 505, postulante_id: 23, fecha_postulacion: "2026-04-08T14:00", estado: "pendiente", comentario: "Experiencia en Machine Learning comprobada.",
            puntaje_cuestionario: 6,
            respuestas_cuestionario: [
                { pregunta_id: "q1_505", respuesta_usuario: "Regresión Logística", es_correcta: true },
                { pregunta_id: "q2_505", respuesta_usuario: "Cuando el modelo memoriza los datos de entrenamiento y falla al predecir datos nuevos", es_correcta: true },
                { pregunta_id: "q3_505", respuesta_usuario: "Pandas", es_correcta: true },
                { pregunta_id: "q4_505", respuesta_usuario: "Para reducir la dimensionalidad de un conjunto de datos perdiendo la menor información posible", es_correcta: true },
                { pregunta_id: "q5_505", respuesta_usuario: "F1-Score", es_correcta: true },
                { pregunta_id: "q6_505", respuesta_usuario: "Apache Spark", es_correcta: true }
            ]
        },
        { 
            id: 9006, oferta_id: 507, postulante_id: 24, fecha_postulacion: "2026-04-08T15:30", estado: "visto", comentario: "Vivo en Lima, disponibilidad inmediata.",
            puntaje_cuestionario: 4,
            respuestas_cuestionario: [
                { pregunta_id: "q1_507", respuesta_usuario: "El porcentaje de usuarios que hicieron clic en un enlace respecto al total de impresiones", es_correcta: true },
                { pregunta_id: "q2_507", respuesta_usuario: "Ambos son exactamente lo mismo", es_correcta: false },
                { pregunta_id: "q3_507", respuesta_usuario: "Las etapas por las que pasa un usuario desde que conoce la marca hasta que realiza una compra", es_correcta: true },
                { pregunta_id: "q4_507", respuesta_usuario: "Una página web diseñada específicamente para convertir visitantes en leads o ventas", es_correcta: true },
                { pregunta_id: "q5_507", respuesta_usuario: "LTV", es_correcta: false },
                { pregunta_id: "q6_507", respuesta_usuario: "Hootsuite (o Buffer)", es_correcta: true }
            ]
        },
        
        // Postulaciones de los candidatos avanzados
        { 
            id: 9007, oferta_id: 501, postulante_id: 25, fecha_postulacion: "2026-04-09T09:15", estado: "entrevista", comentario: "Perfil excelente, agendar entrevista técnica.",
            puntaje_cuestionario: 6,
            respuestas_cuestionario: [
                { pregunta_id: "q1_501", respuesta_usuario: "Arquitectura dirigida por eventos (Mensajería)", es_correcta: true },
                { pregunta_id: "q2_501", respuesta_usuario: "Atomicidad, Consistencia, Aislamiento, Durabilidad", es_correcta: true },
                { pregunta_id: "q3_501", respuesta_usuario: "Kubernetes", es_correcta: true },
                { pregunta_id: "q4_501", respuesta_usuario: "Enrutar, autorizar y gestionar el tráfico hacia los microservicios", es_correcta: true },
                { pregunta_id: "q5_501", respuesta_usuario: "Organizar datos para reducir la redundancia e integridad de datos", es_correcta: true },
                { pregunta_id: "q6_501", respuesta_usuario: "Circuit Breaker", es_correcta: true }
            ]
        },
        { 
            id: 9008, oferta_id: 506, postulante_id: 26, fecha_postulacion: "2026-04-09T10:30", estado: "visto", comentario: "Revisando portafolio en Frontend.",
            puntaje_cuestionario: 5,
            respuestas_cuestionario: [
                { pregunta_id: "q1_506", respuesta_usuario: "TypeScript", es_correcta: true },
                { pregunta_id: "q2_506", respuesta_usuario: "@Component", es_correcta: true },
                { pregunta_id: "q3_506", respuesta_usuario: "Dependency Injection (Inyección de Dependencias)", es_correcta: true },
                { pregunta_id: "q4_506", respuesta_usuario: "ngDoCheck", es_correcta: false },
                { pregunta_id: "q5_506", respuesta_usuario: "RxJS", es_correcta: true },
                { pregunta_id: "q6_506", respuesta_usuario: "(click)='metodo()'", es_correcta: true }
            ]
        },
        { 
            id: 9009, oferta_id: 502, postulante_id: 28, fecha_postulacion: "2026-04-09T11:00", estado: "pendiente", comentario: "Junior con motivación.",
            puntaje_cuestionario: 4,
            respuestas_cuestionario: [
                { pregunta_id: "q1_502", respuesta_usuario: "Internet as a Service", es_correcta: false },
                { pregunta_id: "q2_502", respuesta_usuario: "Nube Pública", es_correcta: true },
                { pregunta_id: "q3_502", respuesta_usuario: "HTML", es_correcta: false },
                { pregunta_id: "q4_502", respuesta_usuario: "Entender y documentar qué debe hacer el sistema para satisfacer al cliente", es_correcta: true },
                { pregunta_id: "q5_502", respuesta_usuario: "Añadir más instancias o servidores para distribuir la carga", es_correcta: true },
                { pregunta_id: "q6_502", respuesta_usuario: "Scrum", es_correcta: true }
            ]
        }
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