'use server'

import prisma from '@/lib/prisma';
import { BookingSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function createBooking(prevState: any, formData: FormData) {
  // 1. Extract and Validate Input
  const rawData = {
    clientName: formData.get('clientName'),
    clientEmail: formData.get('clientEmail'),
    clientPhone: formData.get('clientPhone'),
    clientCompany: formData.get('clientCompany'),
    modelId: formData.get('modelId'),
    eventType: formData.get('eventType'),
    date: formData.get('date'),
    endDate: formData.get('endDate'),
    location: formData.get('location'),
    budget: formData.get('budget'),
    notes: formData.get('notes'),
  };

  const validatedFields = BookingSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields. Please check your input.',
      details: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    // 2. Logical RLS Check (In this public action, any user can create, but only with valid data)
    // 3. Database Operation
    const booking = await prisma.booking.create({
      data: {
        ...validatedFields.data,
        modelId: validatedFields.data.modelId || undefined,
        date: new Date(validatedFields.data.date),
        endDate: validatedFields.data.endDate ? new Date(validatedFields.data.endDate) : null,
      },
    });

    // 4. Notify Agency via Resend
    try {
      await resend.emails.send({
        from: 'THE 21ST <noreply@the21st.agency>',
        to: process.env.AGENCY_EMAIL || 'admin@the21st.com',
        subject: `New Booking Request: ${validatedFields.data.clientCompany}`,
        html: `
          <h1>New Booking Request</h1>
          <p><strong>Client:</strong> ${validatedFields.data.clientName}</p>
          <p><strong>Company:</strong> ${validatedFields.data.clientCompany}</p>
          <p><strong>Email:</strong> ${validatedFields.data.clientEmail}</p>
          <p><strong>Campaign:</strong> ${validatedFields.data.eventType}</p>
          <p><strong>Budget:</strong> ${validatedFields.data.budget}</p>
          <p><strong>Location:</strong> ${validatedFields.data.location}</p>
          <p><strong>Notes:</strong> ${validatedFields.data.notes || 'N/A'}</p>
          <hr />
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/bookings">View in Dashboard</a>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send booking notification email:', emailError);
    }

    revalidatePath('/admin/bookings');
    return { success: true, id: booking.id };
  } catch (error) {
    console.error('Database error in createBooking:', error);
    return { error: 'Failed to submit booking request. Please try again later.' };
  }
}

export async function updateBookingStatus(id: string, status: string) {
  // 1. Auth Validation (Logical RLS)
  // This would normally check the session here or in the calling component
  try {
    await prisma.booking.update({
      where: { id },
      data: { status },
    });
    revalidatePath('/admin/bookings');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to update booking status.' };
  }
}
