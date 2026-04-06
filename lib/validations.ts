import { z } from 'zod';

// Models
export const ModelSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  stageName: z.string().optional().nullable(),
  slug: z.string().min(2, 'Slug must be at least 2 characters'),
  profileImage: z.string().url('Invalid profile image URL'),
  gallery: z.array(z.string().url('Invalid gallery image URL')).default([]),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  height: z.string().min(1, 'Height is required'),
  measurements: z.object({
    bust: z.string().optional().nullable(),
    waist: z.string().optional().nullable(),
    hips: z.string().optional().nullable(),
    shoes: z.string().optional().nullable(),
  }).optional().nullable(),
  location: z.string().min(2, 'Location is required'),
  specialties: z.array(z.string()).default([]),
  categories: z.array(z.string()).default([]),
  experience: z.string(), // Allowing string for flexibility in admin
  availability: z.string(), // Allowing string for flexibility in admin
  featured: z.boolean().default(false),
  gender: z.string(), // Avoiding enum to reduce strictness during initial data entry
  socialLinks: z.object({
    instagram: z.string().optional().nullable(),
    tiktok: z.string().optional().nullable(),
    website: z.string().optional().nullable(),
  }).optional().nullable(),
});

// Bookings
export const BookingSchema = z.object({
  modelId: z.string().optional().nullable(),
  modelName: z.string().optional().nullable(),
  clientName: z.string().min(2, 'Name is required'),
  clientEmail: z.string().email('Invalid email address'),
  clientPhone: z.string().optional().nullable(),
  clientCompany: z.string().min(2, 'Company name is required'),
  eventType: z.string().min(2, 'Event type is required'),
  date: z.string().min(1, 'Date is required'),
  endDate: z.string().optional().nullable(),
  location: z.string().min(2, 'Location is required'),
  budget: z.string().min(1, 'Budget range is required'),
  notes: z.string().optional().nullable(),
});

// Applications
export const ApplicationSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(5, 'Valid phone number is required'),
  gender: z.string().min(1, 'Gender is required'),
  height: z.string().min(1, 'Height is required'),
  bust: z.string().optional(),
  waist: z.string().optional(),
  hips: z.string().optional(),
  shoeSize: z.string().optional(),
  location: z.string().min(2, 'Location is required'),
  experience: z.string().min(1, 'Experience level is required'),
  categories: z.array(z.string()).min(1, 'Select at least one category'),
  instagramHandle: z.string().min(1, 'Instagram handle is required'),
  about: z.string().min(20, 'Introduction must be at least 20 characters'),
  photos: z.array(z.string().url()).min(1, 'At least one photo is required'),
});

// Editorials
export const EditorialSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  slug: z.string().min(5, 'Slug must be at least 5 characters'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters'),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  coverImage: z.string().url('Invalid cover image URL'),
  gallery: z.array(z.string().url('Invalid gallery image URL')).default([]),
  category: z.enum(['campaign', 'editorial', 'news', 'spotlight']),
  featured: z.boolean().default(false),
  author: z.string().min(2, 'Author name is required'),
  modelIds: z.array(z.string()).default([]),
});

// Settings
export const SettingsSchema = z.object({
  agencyName: z.string().min(2, 'Agency name is required'),
  contactEmail: z.string().email('Invalid email address'),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  socialLinks: z.object({
    instagram: z.string().url('Invalid URL').or(z.literal('')).optional().nullable(),
    tiktok: z.string().url('Invalid URL').or(z.literal('')).optional().nullable(),
    twitter: z.string().url('Invalid URL').or(z.literal('')).optional().nullable(),
    linkedin: z.string().url('Invalid URL').or(z.literal('')).optional().nullable(),
  }).optional().nullable(),
  footerText: z.string().optional().nullable(),
  maintenance: z.boolean().default(false),
});
