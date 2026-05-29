/**
 * Configuración global del sitio.
 * Actualiza `url` antes de desplegar a producción.
 */
export const site = {
  name: 'Kevin Medina Dev',
  title: 'Kevin Medina Dev — Programación y SQL',
  description:
    'Tutoriales de programación y SQL en español. Aprende con artículos claros y videos en YouTube.',
  url: 'https://tudominio.com',
  lang: 'es',
  locale: 'es_ES',
  author: {
    name: 'Kevin Medina',
    url: 'https://www.youtube.com/@kevinmedinarobles', // TODO: verificar URL oficial del canal
  },
  developer: {
    name: 'Kevin Medina',
    role: 'Backend Developer & Analista en It',
    image: '/images/developer.png', // TODO: reemplazar por tu foto real (ej. /images/developer.jpg)
    imageAlt: 'Kevin Medina, desarrollador de software',
    headline: 'Kevin Medina',
    bio: [
      'Programador con 5 años de experiencia, programando para empresas a nivel internacional desde Uruguay. Actualmente programador fullstack y estudiante de Analista en It.',
      'En este sitio encontraras tutoriales de programacion en español de Java, SQL entre otras tecnologias.',
    ],
    ctaLabel: 'Tutoriales',
    ctaHref: '#tutoriales',
  },
  youtube: {
    channelUrl: 'https://www.youtube.com/@kevinmedinarobles', // TODO: verificar URL oficial del canal
    channelName: 'Kevin Medina',
  },
  defaultOgImage: '/og-default.png',
  navigation: [
    { label: 'Inicio', href: '/' },
    { label: 'SQL', href: '/sql' },
  ],
} as const;

export type SiteConfig = typeof site;
