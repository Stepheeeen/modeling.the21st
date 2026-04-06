import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, User, Share2 } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { getEditorialBySlug } from '@/lib/actions/editorial'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getEditorialBySlug(slug)
  
  if (!article) return { title: 'Article Not Found | THE 21ST' }
  
  return {
    title: `${article.title} | THE 21ST Editorial`,
    description: article.excerpt,
  }
}

export default async function EditorialDetailPage({ params }: Props) {
  const { slug } = await params
  const article = await getEditorialBySlug(slug)

  if (!article) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Back Button */}
        <div className="bg-background border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
            <Link
              href="/editorial"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors font-sans"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Editorial
            </Link>
          </div>
        </div>

        <article className="py-16 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            {/* Header */}
            <header className="mb-12 text-center">
              <div className="flex justify-center gap-4 mb-6 text-xs uppercase tracking-[0.2em] text-muted-foreground font-sans">
                <span>{article.category}</span>
                <span className="w-1 h-1 bg-border rounded-full mt-1.5" />
                <span>
                  {new Date(article.publishedAt || article.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight mb-8 leading-tight">
                {article.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed italic max-w-2xl mx-auto font-sans">
                {article.excerpt}
              </p>
            </header>

            {/* Cover Image */}
            <div className="aspect-video relative overflow-hidden bg-muted mb-16 shadow-2xl">
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Content Meta */}
            <div className="flex flex-wrap justify-between items-center gap-6 py-8 border-y border-border mb-16 font-sans">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">8 min read</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="prose prose-lg prose-stone dark:prose-invert max-w-none font-sans mb-24">
              {article.content.split('\n').map((para, i) => (
                para ? <p key={i}>{para}</p> : <br key={i} />
              ))}
            </div>

            {/* Gallery Section */}
            {article.gallery && article.gallery.length > 0 && (
              <div className="space-y-12">
                <div className="flex items-center gap-4">
                  <div className="h-px bg-border flex-1" />
                  <h2 className="text-2xl font-serif italic text-muted-foreground">Gallery Results</h2>
                  <div className="h-px bg-border flex-1" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {article.gallery.map((image, index) => (
                    <div 
                      key={index} 
                      className={`relative overflow-hidden bg-muted shadow-lg hover:shadow-xl transition-shadow ${
                        index % 3 === 0 ? 'md:col-span-2 aspect-[16/10]' : 'aspect-[4/5]'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${article.title} - Galllery Image ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer CTA */}
            <footer className="mt-24 pt-16 border-t border-border text-center">
              <h3 className="text-2xl font-serif mb-6">Ready to make your mark?</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/apply">
                  <Button size="lg" className="w-full sm:w-auto font-sans">Apply as Talent</Button>
                </Link>
                <Link href="/booking">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto font-sans">Book a Model</Button>
                </Link>
              </div>
            </footer>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
