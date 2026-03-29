// Mock data for the modeling agency platform

export interface Model {
  id: string
  name: string
  stageName?: string
  slug: string
  profileImage: string
  gallery: string[]
  bio: string
  height: string
  measurements: {
    bust?: string
    waist?: string
    hips?: string
    shoes?: string
  }
  location: string
  specialties: string[]
  categories: string[]
  experience: 'new' | 'intermediate' | 'experienced' | 'elite'
  availability: 'available' | 'limited' | 'unavailable'
  featured: boolean
  gender: 'female' | 'male' | 'non-binary'
  socialLinks: {
    instagram?: string
    tiktok?: string
    website?: string
  }
}

export interface Booking {
  id: string
  modelId: string | null
  modelName: string | null
  clientName: string
  clientEmail: string
  clientCompany: string
  eventType: string
  date: string
  location: string
  budget: string
  notes: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt: string
}

export interface Application {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  height: string
  measurements: {
    bust?: string
    waist?: string
    hips?: string
  }
  location: string
  experience: string
  categories: string[]
  instagramHandle: string
  photos: string[]
  about: string
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected'
  createdAt: string
}

export interface Photoshoot {
  id: string
  title: string
  modelId: string
  modelName: string
  photographer?: string
  stylist?: string
  date: string
  time: string
  location: string
  notes: string
  moodboard?: string[]
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
  createdAt: string
}

export interface Editorial {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  category: 'campaign' | 'editorial' | 'news' | 'spotlight'
  featured: boolean
  author: string
  publishedAt: string
  modelIds?: string[]
}

// Mock data placeholders - use server actions instead
export const models: Model[] = []
export const bookings: Booking[] = []
export const applications: Application[] = []
export const photoshoots: Photoshoot[] = []
export const editorials: Editorial[] = []

// Service offerings
export const services = [
  {
    id: '1',
    title: 'Talent Scouting',
    description: 'We actively search for new and unique faces with potential across different backgrounds and styles.',
    icon: 'Search',
    features: ['Face scouting', 'Background diversity', 'Unique style identification', 'Global potential'],
  },
  {
    id: '2',
    title: 'Model Development',
    description: 'We train and guide our models in posing, movement, confidence, branding, and industry standards.',
    icon: 'TrendingUp',
    features: ['Posing & movement', 'Confidence building', 'Personal branding', 'Industry standards'],
  },
  {
    id: '3',
    title: 'Portfolio Building',
    description: 'We create high-quality portfolios including test shoots, editorial-style content, digitals, and comp cards.',
    icon: 'BookOpen',
    features: ['Test shoots', 'Editorial content', 'Digitals', 'Comp cards'],
  },
  {
    id: '4',
    title: 'Brand & Client Connections',
    description: 'We connect models with fashion brands, photographers, stylists, and campaign/commercial opportunities.',
    icon: 'Link',
    features: ['Fashion brands', 'Photographers & stylists', 'Creative directors', 'Campaign opportunities'],
  },
  {
    id: '5',
    title: 'Creative Direction',
    description: 'Through T21’s creative network, we produce editorial shoots, campaign visuals, and lookbooks.',
    icon: 'Palette',
    features: ['Editorial shoots', 'Campaign visuals', 'Lookbooks', 'Fashion content'],
  },
]

// Categories for filtering
export const modelCategories = [
  'All',
  'Fashion',
  'Beauty',
  'Commercial',
  'Editorial',
  'Runway',
  'Fitness',
  'Lifestyle',
  'Luxury',
  'Streetwear',
  'Corporate',
]

export const experienceLevels = [
  { value: 'all', label: 'All Experience' },
  { value: 'new', label: 'New Faces' },
  { value: 'intermediate', label: 'Rising Talent' },
  { value: 'experienced', label: 'Experienced' },
  { value: 'elite', label: 'Elite' },
]

export const availabilityOptions = [
  { value: 'all', label: 'All Availability' },
  { value: 'available', label: 'Available' },
  { value: 'limited', label: 'Limited' },
  { value: 'unavailable', label: 'Unavailable' },
]

export const genderOptions = [
  { value: 'all', label: 'All Genders' },
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'non-binary', label: 'Non-Binary' },
]

export const eventTypes = [
  'Fashion Campaign',
  'Product Launch',
  'Commercial Shoot',
  'Runway Show',
  'Editorial',
  'Brand Ambassador',
  'Event Hosting',
  'Other',
]

export const budgetRanges = [
  'Under ₦1,000,000',
  '₦1,000,000 - ₦5,000,000',
  '₦5,000,000 - ₦10,000,000',
  '₦10,000,000 - ₦25,000,000',
  '₦25,000,000 - ₦50,000,000',
  '₦50,000,000+',
  'Open to Discussion',
]
