'use client'

import { useState, useEffect, useActionState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { eventTypes, budgetRanges } from '@/lib/data'
import { createBooking } from '@/lib/actions/booking'
import { useToast } from '@/hooks/use-toast'

export function BookingForm({ models }: { models: any[] }) {
  const searchParams = useSearchParams()
  const preselectedModelId = searchParams.get('model')

  const [step, setStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [state, formAction, isPending] = useActionState(createBooking, null as any)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientCompany: '',
    modelId: preselectedModelId || '',
    needsRecommendation: false,
    eventType: '',
    projectDescription: '',
    date: '',
    endDate: '',
    location: '',
    budget: '',
    moodboardUrl: '',
    notes: '',
    agreedToTerms: false,
  })

  useEffect(() => {
    if (preselectedModelId) {
      setFormData((prev) => ({ ...prev, modelId: preselectedModelId }))
    }
  }, [preselectedModelId])

  useEffect(() => {
    if (state?.success) {
      toast({
        title: 'Booking Request Submitted',
        description: 'Thank you for your interest. Our team will contact you within 24-48 hours.',
      })
      setIsSubmitted(true)
    } else if (state?.error) {
      toast({
        title: 'Error',
        description: state.error,
        variant: 'destructive',
      })
    }
  }, [state, toast])

  const canProceedToStep2 = 
    formData.clientName && 
    formData.clientEmail && 
    formData.clientCompany

  const canProceedToStep3 = 
    (formData.modelId || formData.needsRecommendation) && 
    formData.eventType

  const canSubmit = 
    formData.date && 
    formData.location && 
    formData.budget && 
    formData.agreedToTerms

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center py-16"
      >
        <div className="w-20 h-20 bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-8">
          <Check className="h-10 w-10" />
        </div>
        <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4">
          Booking Request Submitted
        </h2>
        <p className="text-muted-foreground mb-8 font-sans">
          Thank you for your interest. Our team will review your request and 
          contact you within 24-48 hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/models">
            <Button variant="outline" className="font-sans">Browse Models</Button>
          </Link>
          <Link href="/">
            <Button className="font-sans">Return Home</Button>
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-center gap-4 mb-12">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div className={`w-10 h-10 flex items-center justify-center text-sm font-sans ${s === step ? 'bg-primary text-primary-foreground' : s < step ? 'bg-primary/20' : 'bg-muted text-muted-foreground'}`}>
              {s < step ? <Check className="h-4 w-4" /> : s}
            </div>
            {s < 3 && <div className={`w-16 md:w-24 h-px mx-2 ${s < step ? 'bg-primary' : 'bg-border'}`} />}
          </div>
        ))}
      </div>

      <form action={formAction}>
        {/* Hidden inputs to ensure data from all steps is sent */}
        <input type="hidden" name="clientName" value={formData.clientName} />
        <input type="hidden" name="clientEmail" value={formData.clientEmail} />
        <input type="hidden" name="clientPhone" value={formData.clientPhone} />
        <input type="hidden" name="clientCompany" value={formData.clientCompany} />
        <input type="hidden" name="modelId" value={formData.modelId} />
        <input type="hidden" name="eventType" value={formData.eventType} />
        <input type="hidden" name="budget" value={formData.budget} />
        <input type="hidden" name="date" value={formData.date} />
        <input type="hidden" name="endDate" value={formData.endDate} />
        <input type="hidden" name="location" value={formData.location} />
        <input type="hidden" name="notes" value={formData.notes} />

        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="clientName">Full Name *</Label>
                <Input name="clientName" id="clientName" value={formData.clientName} onChange={(e) => setFormData({ ...formData, clientName: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientEmail">Email *</Label>
                <Input name="clientEmail" id="clientEmail" type="email" value={formData.clientEmail} onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientPhone">Phone Number</Label>
                <Input name="clientPhone" id="clientPhone" type="tel" value={formData.clientPhone} onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientCompany">Company / Brand *</Label>
                <Input name="clientCompany" id="clientCompany" value={formData.clientCompany} onChange={(e) => setFormData({ ...formData, clientCompany: e.target.value })} required />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="button" onClick={() => setStep(2)} disabled={!canProceedToStep2}>Continue</Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="space-y-4">
              <Label>Model Selection *</Label>
              <div className="flex items-center gap-2 mb-4">
                <Checkbox id="needsRecommendation" checked={formData.needsRecommendation} onCheckedChange={(c) => setFormData({ ...formData, needsRecommendation: !!c, modelId: c ? '' : formData.modelId })} />
                <Label htmlFor="needsRecommendation" className="cursor-pointer">I&apos;d like The 21st to recommend talent</Label>
              </div>
              {!formData.needsRecommendation && (
                <>
                  <Input type="hidden" name="modelId" value={formData.modelId} />
                  <Select value={formData.modelId} onValueChange={(v) => setFormData({ ...formData, modelId: v })}>
                    <SelectTrigger><SelectValue placeholder="Select a model" /></SelectTrigger>
                    <SelectContent>
                      {models.map((m) => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventType">Campaign Type *</Label>
              <Input type="hidden" name="eventType" value={formData.eventType} />
              <Select value={formData.eventType} onValueChange={(v) => setFormData({ ...formData, eventType: v })}>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  {eventTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button type="button" onClick={() => setStep(3)} disabled={!canProceedToStep3}>Continue</Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date">Start Date *</Label>
                <Input name="date" id="date" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input name="endDate" id="endDate" type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input name="location" id="location" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Budget *</Label>
                <Input type="hidden" name="budget" value={formData.budget} />
                <Select value={formData.budget} onValueChange={(v) => setFormData({ ...formData, budget: v })}>
                  <SelectTrigger><SelectValue placeholder="Select budget" /></SelectTrigger>
                  <SelectContent>
                    {budgetRanges.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea name="notes" id="notes" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="agreedToTerms" checked={formData.agreedToTerms} onCheckedChange={(c) => setFormData({ ...formData, agreedToTerms: !!c })} />
              <Label htmlFor="agreedToTerms">I agree to terms</Label>
            </div>
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => setStep(2)}>Back</Button>
              <Button type="submit" disabled={!canSubmit || isPending}>{isPending ? 'Submitting...' : 'Submit Request'}</Button>
            </div>
          </motion.div>
        )}
      </form>
    </div>
  )
}
