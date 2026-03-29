'use server'

import prisma from '@/lib/prisma';
import { ApplicationSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitApplication(prevState: any, formData: FormData) {
  try {
    // 1. Image URLs from hidden fields
    const photosJson = formData.get('photos') as string;
    let photos: string[] = [];
    
    try {
      photos = JSON.parse(photosJson);
    } catch (e) {
      console.error('Failed to parse photos JSON', e);
    }

    const categoriesJson = formData.get('categories') as string;
    let categories: string[] = [];
    try {
      categories = JSON.parse(categoriesJson);
    } catch (e) {
      console.error('Failed to parse categories JSON', e);
    }

    // 2. Validate Other Fields
    const validatedData = ApplicationSchema.parse({
      ...Object.fromEntries(formData.entries()),
      categories,
      photos,
    });

    const { bust, waist, hips, shoeSize, ...rest } = validatedData as any;

    const application = await prisma.application.create({
      data: {
        ...rest,
        measurements: { bust, waist, hips, shoeSize },
        status: 'pending',
      },
    });

    // 4. Notify Agency via Resend
    try {
      await resend.emails.send({
        from: 'THE 21ST <noreply@the21st.agency>',
        to: process.env.AGENCY_EMAIL || 'admin@the21st.com',
        subject: `New Talent Application: ${rest.firstName} ${rest.lastName}`,
        html: `
          <h1>New Talent Application</h1>
          <p><strong>Name:</strong> ${rest.firstName} ${rest.lastName}</p>
          <p><strong>Email:</strong> ${rest.email}</p>
          <p><strong>Phone:</strong> ${rest.phone}</p>
          <p><strong>Instagram:</strong> ${rest.instagramHandle}</p>
          <p><strong>Location:</strong> ${rest.location}</p>
          <hr />
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/applications/${application.id}">Review Application</a>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send application notification email:', emailError);
    }

    revalidatePath('/admin/applications');
    return { success: true, id: application.id };
  } catch (error) {
    console.error('Database error in submitApplication:', error);
    return { error: 'Failed to submit application. Please try again.' };
  }
}
