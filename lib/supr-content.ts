export const SUPR_SITE_URL = 'https://supr-holds-production.up.railway.app/'

export const suprStats = {
  macros: 120,
  holds: 522,
  volumes: 169,
}

export const suprPillars = [
  {
    title: 'Pushing the concepts',
    description:
      'Au-delà de l\'escalade. Formes, matériaux et design pour redéfinir ce que peuvent être les prises.',
    href: `${SUPR_SITE_URL}materials`,
  },
  {
    title: 'Un écosystème complet',
    description:
      'Des World Cups aux salles locales. Prises, volumes et textures conçus pour fonctionner ensemble.',
    href: `${SUPR_SITE_URL}products`,
  },
  {
    title: 'La passion du shape',
    description:
      'Des formes avec une identité. Chaque gamme raconte une histoire par la géométrie et l\'esthétique.',
    href: `${SUPR_SITE_URL}about`,
  },
]

export const suprServices = [
  {
    id: 'groupe',
    title: 'Le groupe SUP\'R',
    subtitle: 'Fondé par des route setters',
    description:
      'SUP\'R est né de la passion des grimpeurs. Co-fondé par Gautier Supper et Thibault Toussaint — plus de 30 ans d\'expérience chacun en compétition, coaching et shape.',
    highlights: [
      'Prises pensées par des ouvreurs, testées sur de vrais murs',
      'Production fibreglass in-house, gammes compétition',
      'Présent en Europe, Asie et Amériques',
    ],
    href: `${SUPR_SITE_URL}about`,
  },
  {
    id: 'consulting',
    title: 'Consulting & projets',
    subtitle: 'Gym, compétition, mur privé',
    description:
      'Accompagnement sur mesure pour salles, compétitions et murs privés. De la conception à l\'équipement — holds, volumes, textures et setting.',
    highlights: [
      'Ateliers setting avec ouvreurs professionnels',
      'Support compétitions (local → World Cup)',
      'Clinics coaching pour setters et grimpeurs',
    ],
    href: `${SUPR_SITE_URL}about#got-a-project`,
  },
  {
    id: 'world-climbing',
    title: 'World Climbing',
    subtitle: 'Fournisseur officiel',
    description:
      'SUP\'R est fournisseur officiel de produits World Climbing. Prises homologuées pour World Cups, Championnats continentaux et qualifications olympiques.',
    highlights: [
      'Label World Climbing sur les formes certifiées',
      'Support FFME, USA Climbing, Pro Climbing League',
      'Standards sécurité et qualité sans compromis',
    ],
    href: `${SUPR_SITE_URL}about`,
  },
]

export const beginnerWallSteps = [
  {
    step: 1,
    title: 'Choisis ta couleur',
    description: 'Commence par le vert (V0-V1). Une couleur = un parcours.',
  },
  {
    step: 2,
    title: 'Mains sur le départ',
    description: 'Place tes deux mains sur les prises de départ marquées.',
  },
  {
    step: 3,
    title: 'Grimpe la voie',
    description: 'Suis uniquement les prises de ta couleur, pieds et mains.',
  },
  {
    step: 4,
    title: 'Valide le bloc',
    description: 'Réussite = tenir la dernière prise avec les deux mains, en contrôle.',
  },
]

export const beginnerWallTips = [
  {
    title: 'Prises débutant SUP\'R',
    description: 'Larges, ergonomiques, texture anti-dérapante — conçues pour progresser sans frustration.',
  },
  {
    title: 'Progression par couleur',
    description: 'Vert → bleu → rouge → noir. Chaque niveau te prépare au suivant.',
  },
  {
    title: 'Zone dédiée en salle',
    description: 'Scanne le QR du mur débutant pour accéder aux tutos et suivre ta progression.',
  },
]
