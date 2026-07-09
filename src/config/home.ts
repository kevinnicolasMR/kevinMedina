import { site } from './site';

/**
 * Contenido editable de la home.
 * Actualiza stats, servicios y testimonios antes de publicar.
 */
export const home = {
  hero: {
    headline:
      'Aprende a programar con proyectos, SQL real y mentalidad de dev.',
    tagline:
      'Backend developer desde Uruguay. Te enseño Java, SQL Server y buenas prácticas con ejemplos simples, directos y aplicables.',
    primaryCta: {
      label: 'Ver tutoriales',
      href: site.youtube.channelUrl,
      external: true,
    },
    secondaryCta: {
      label: 'Explorar recursos',
      href: '/recursos',
    },
  },
  stats: [
    { value: '+5', label: 'Años de experiencia' },
    { value: 'Int.', label: 'Proyectos internacionales' },
    { value: '—', label: 'Suscriptores' }, // TODO: actualizar cifra real
    { value: '—', label: 'Videos publicados' }, // TODO: actualizar cifra real
  ],
  about: {
    id: 'sobre-mi',
    title: 'Sobre mí',
    paragraphs: site.developer.bio,
  },
  videos: {
    id: 'youtube',
    title: 'Tutoriales para codear mejor',
    description:
      'Videos cortos, prácticos y con guía escrita para que puedas pausar, copiar, probar y entender.',
  },
  pillars: {
    title: 'Tu ruta para mejorar como programador',
    description:
      'El contenido está organizado como una caja de herramientas: bases de datos, backend, recursos y carrera.',
    items: [
      {
        icon: 'SQL',
        title: 'SQL Server',
        description: 'Consultas, relaciones, backups, GROUP BY, HAVING y casos reales de bases de datos.',
        href: '/sql',
      },
      {
        icon: 'JAV',
        title: 'Java backend',
        description: 'Ejercicios, lógica, buenas prácticas y fundamentos para construir mejor.',
        href: '/java',
      },
      {
        icon: 'DEV',
        title: 'Carrera IT',
        description: 'Consejos de trabajo, entrevistas, portfolio y hábitos para crecer como dev.',
        href: '/carrera',
      },
      {
        icon: 'DOC',
        title: 'Recursos',
        description: 'Apuntes, ejemplos y explicaciones escritas para estudiar con calma.',
        href: '/recursos',
      },
    ],
  },
  experience: {
    id: 'experiencia',
    title: 'Experiencia y autoridad',
    description:
      'Trayectoria profesional y tecnologías con las que trabajo en proyectos reales.',
    timeline: [
      {
        period: '2021 — Actualidad',
        role: 'Desarrollador Fullstack',
        company: 'Empresas internacionales',
      },
      {
        period: 'En curso',
        role: 'Estudiante de Analista en IT',
        company: 'Formación continua',
      },
      {
        period: '2020 — Actualidad',
        role: 'Creador de contenido',
        company: 'Canal de YouTube',
      },
    ],
    technologies: [
      'Java',
      'SQL',
      'SQL Server',
      'Spring Boot',
      'JavaScript',
      'Git',
      'APIs REST',
    ],
  },
  services: {
    id: 'servicios',
    title: 'Servicios o colaboración',
    description:
      '¿Quieres trabajar conmigo o necesitas ayuda con tu carrera? Estas son algunas formas de colaborar.',
    items: [
      {
        icon: '🎯',
        title: 'Mentoría 1-on-1',
        description: 'Sesiones personalizadas para resolver dudas técnicas o de carrera.',
      },
      {
        icon: '📋',
        title: 'Consultoría',
        description: 'Revisión de arquitectura, código o procesos de desarrollo.',
      },
      {
        icon: '⚙️',
        title: 'Desarrollo freelance',
        description: 'Proyectos backend, APIs y soluciones con Java y SQL.',
      },
      {
        icon: '📝',
        title: 'Revisión de CV / Portfolio',
        description: 'Feedback para mejorar tu perfil y prepararte para oportunidades.',
      },
    ],
  },
  blog: {
    id: 'blog',
    title: 'Últimos artículos del blog',
    description: 'Guías escritas que complementan los videos del canal.',
    limit: 3,
  },
  testimonials: {
    title: 'Testimonios / Resultados',
    description: 'Lo que dicen quienes han seguido el contenido o trabajado conmigo.',
    items: [
      {
        quote:
          'Los tutoriales de SQL me ayudaron a entender conceptos que no lograba con otros recursos.',
        author: 'Estudiante de desarrollo',
        rating: 5,
      },
      {
        quote:
          'Contenido claro, directo y con ejemplos reales. Ideal para aprender en español.',
        author: 'Desarrollador junior',
        rating: 5,
      },
      {
        quote:
          'La combinación de video y artículo escrito hace que retenga mucho mejor lo aprendido.',
        author: 'Profesional en transición a IT',
        rating: 5,
      },
    ],
  },
  finalCta: {
    id: 'contacto',
    title: '¿Listo para aprender o colaborar?',
    items: [
      {
        icon: '▶',
        title: 'Suscríbete al canal',
        description: 'Nuevos tutoriales cada semana en YouTube.',
        href: site.youtube.channelUrl,
        external: true,
        variant: 'primary',
      },
      {
        icon: '📚',
        title: 'Explora el blog',
        description: 'Artículos con pasos detallados y recursos.',
        href: '#blog',
        variant: 'secondary',
      },
      {
        icon: '✉',
        title: 'Escríbeme',
        description: 'Proyectos, mentoría o colaboraciones.',
        href: 'mailto:contacto@kevinmedinarobles.com', // TODO: email real
        external: true,
        variant: 'secondary',
      },
    ],
  },
} as const;
