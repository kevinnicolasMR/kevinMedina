/**
 * Configuración global del sitio.
 * Actualiza `url` antes de desplegar a producción.
 */
export const site = {
  name: 'Kevin Medina',
  title: 'Kevin Medina Dev — Programación y SQL',
  description:
    'Tutoriales de programación y SQL en español. Aprende con artículos claros y videos en YouTube.',
  url: 'https://kevinmedinarobles.com/',
  lang: 'es',
  locale: 'es_ES',
  author: {
    name: 'Kevin Medina',
    url: 'https://www.youtube.com/@kevinmedinarobles',
  },
  developer: {
    name: 'Kevin Medina',
    role: 'Backend Developer & Analista en IT',
    image: '/images/developer.png',
    imageAlt: 'Kevin Medina, desarrollador de software',
    headline: 'Kevin Medina',
    bio: [
      'Programador con 5 años de experiencia, programando para empresas a nivel internacional desde Uruguay. Actualmente programador fullstack y estudiante de Analista en IT.',
      'En este sitio encontrarás tutoriales de programación en español de Java, SQL y otras tecnologías que uso en proyectos reales.',
    ],
    ctaLabel: 'Tutoriales',
    ctaHref: '#youtube',
  },
  youtube: {
    channelUrl: 'https://www.youtube.com/@kevinmedinarobles',
    channelName: 'Kevin Medina',
  },
  social: [
    {
      label: 'YouTube',
      href: 'https://www.youtube.com/@kevinmedinarobles',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/kevinnicolasmr/', // TODO: URL real de LinkedIn
    },
  ],
  defaultOgImage: '/og-default.png',
  navigation: [
    { label: 'Inicio', href: '/' },
    { label: 'Recursos', href: '/recursos' },
    { label: 'YouTube', href: 'https://www.youtube.com/@kevinmedinarobles', external: true },
    { label: 'Contacto', href: 'https://www.linkedin.com/in/kevinnicolasmr/' },
  ],
  footer: {
    newsletterNote: 'Recibe novedades sobre tutoriales y artículos nuevos.',
    legal: [
      { label: 'Política de privacidad', href: '/#contacto' }, // TODO: página legal
      { label: 'Términos', href: '/#contacto' }, // TODO: página legal
      { label: 'Sitemap', href: '/sitemap-index.xml' },
    ],
  },
} as const;

export type SiteConfig = typeof site;
