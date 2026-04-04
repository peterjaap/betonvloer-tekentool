export interface ComponentType {
  id: string
  label: string
  description: string
  category: 'riool' | 'hemelwater' | 'elektra' | 'water' | 'overig'
  color: string
  icon: string
  size: number
}

export const COMPONENT_TYPES: ComponentType[] = [
  // Rioolafvoer
  {
    id: 'riool-put',
    label: 'Rioolput',
    description: 'Inspectie/aansluitput',
    category: 'riool',
    color: '#8B4513',
    icon: '🕳️',
    size: 40,
  },
  {
    id: 'riool-bocht',
    label: 'Bocht 90°',
    description: 'Riool bocht',
    category: 'riool',
    color: '#8B4513',
    icon: '↪️',
    size: 30,
  },
  {
    id: 'riool-t-stuk',
    label: 'T-stuk',
    description: 'Riool T-aansluiting',
    category: 'riool',
    color: '#8B4513',
    icon: '⊤',
    size: 30,
  },
  {
    id: 'riool-aansluiting',
    label: 'Afvoeraansluiting',
    description: 'Aansluiting voor afvoer',
    category: 'riool',
    color: '#8B4513',
    icon: '⊙',
    size: 30,
  },
  {
    id: 'riool-wc',
    label: 'WC afvoer',
    description: 'Toilet aansluiting Ø110',
    category: 'riool',
    color: '#8B4513',
    icon: '🚽',
    size: 45,
  },
  {
    id: 'riool-douche',
    label: 'Douche afvoer',
    description: 'Doucheput Ø50',
    category: 'riool',
    color: '#8B4513',
    icon: '🚿',
    size: 40,
  },

  // Hemelwaterafvoer
  {
    id: 'hemelwater-put',
    label: 'Hemelwaterput',
    description: 'Opvangput hemelwater',
    category: 'hemelwater',
    color: '#4169E1',
    icon: '🌧️',
    size: 40,
  },
  {
    id: 'hemelwater-afvoer',
    label: 'Regenpijp',
    description: 'Aansluiting regenpijp',
    category: 'hemelwater',
    color: '#4169E1',
    icon: '⬇️',
    size: 30,
  },
  {
    id: 'hemelwater-kolk',
    label: 'Kolk',
    description: 'Straatkolk/afvoerkolk',
    category: 'hemelwater',
    color: '#4169E1',
    icon: '▦',
    size: 35,
  },

  // Elektra
  {
    id: 'elektra-doos',
    label: 'Centraaldoos',
    description: 'Verdeeldoos elektra',
    category: 'elektra',
    color: '#FFD700',
    icon: '⚡',
    size: 30,
  },
  {
    id: 'elektra-wandcontactdoos',
    label: 'Wandcontactdoos',
    description: 'Stopcontact',
    category: 'elektra',
    color: '#FFD700',
    icon: '🔌',
    size: 25,
  },
  {
    id: 'elektra-schakelaar',
    label: 'Schakelaar',
    description: 'Lichtschakelaar',
    category: 'elektra',
    color: '#FFD700',
    icon: '🔘',
    size: 25,
  },
  {
    id: 'elektra-groepenkast',
    label: 'Groepenkast',
    description: 'Meterkast/groepenkast',
    category: 'elektra',
    color: '#FFD700',
    icon: '🗄️',
    size: 50,
  },
  {
    id: 'elektra-lamp',
    label: 'Lichtpunt',
    description: 'Plafond/wandlamp',
    category: 'elektra',
    color: '#FFD700',
    icon: '💡',
    size: 25,
  },

  // Wateraanvoer
  {
    id: 'water-aansluiting',
    label: 'Wateraansluiting',
    description: 'Hoofdaansluiting water',
    category: 'water',
    color: '#00CED1',
    icon: '🚰',
    size: 35,
  },
  {
    id: 'water-kraan',
    label: 'Kraan',
    description: 'Koud/warm water kraan',
    category: 'water',
    color: '#00CED1',
    icon: '🔵',
    size: 25,
  },
  {
    id: 'water-boiler',
    label: 'Boiler',
    description: 'Warmwaterboiler',
    category: 'water',
    color: '#00CED1',
    icon: '♨️',
    size: 45,
  },
  {
    id: 'water-meter',
    label: 'Watermeter',
    description: 'Watermeter',
    category: 'water',
    color: '#00CED1',
    icon: '📊',
    size: 30,
  },

  // Overig
  {
    id: 'overig-muur',
    label: 'Muur/wand',
    description: 'Binnenmuur',
    category: 'overig',
    color: '#888888',
    icon: '▬',
    size: 30,
  },
  {
    id: 'overig-deur',
    label: 'Deur',
    description: 'Deuropening',
    category: 'overig',
    color: '#888888',
    icon: '🚪',
    size: 35,
  },
  {
    id: 'overig-raam',
    label: 'Raam',
    description: 'Raam/venster',
    category: 'overig',
    color: '#888888',
    icon: '🪟',
    size: 30,
  },
]

export const CATEGORIES: { id: ComponentType['category']; label: string; color: string }[] = [
  { id: 'riool', label: 'Rioolafvoer', color: '#8B4513' },
  { id: 'hemelwater', label: 'Hemelwaterafvoer', color: '#4169E1' },
  { id: 'elektra', label: 'Elektra', color: '#FFD700' },
  { id: 'water', label: 'Wateraanvoer', color: '#00CED1' },
  { id: 'overig', label: 'Overig', color: '#888888' },
]
