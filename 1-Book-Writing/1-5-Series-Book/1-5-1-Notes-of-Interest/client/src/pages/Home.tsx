import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface Note {
  date: string;
  title: string;
  subtitle?: string;
  highlight?: string;
  link?: string;
}

const CATEGORIES = [
  { id: 'psychology', label: 'Psychology', color: 'bg-[oklch(0.70_0.12_130)]' },
  { id: 'industry', label: 'Industry', color: 'bg-[oklch(0.72_0.14_70)]' },
  { id: 'life', label: 'Enjoy the Life', color: 'bg-[oklch(0.68_0.12_20)]' },
  { id: 'relationship', label: 'Relationship', color: 'bg-[oklch(0.68_0.10_10)]' },
  { id: 'knowledge', label: 'Knowledge', color: 'bg-[oklch(0.60_0.10_260)]' },
];

const NOTES: Record<string, Note[]> = {
  psychology: [
    { date: '05.25', title: 'What things in my life can trigger me to cry?' },
    { date: '04.29', title: 'What suggestions to youngsters' },
  ],
  industry: [
    { date: '06.19', title: 'One systematic portfolio manager', link: 'http://qiaozhou.org/' },
    { date: '04.28', title: 'The different characteristics I notice from people working in different industries', highlight: 'Fun fact: A man at Best Buy asked if we had met before—he realized it was because I\'m familiar with the TV\'s framework.' },
  ],
  life: [
    { date: '06.14', title: 'How to deal with personal relationship', subtitle: 'Choose the topic that all are comfortable' },
    { date: '06.13', title: 'Apple Pay linking with WeChat for app payments like Didi' },
    { date: '05.18', title: 'Conversation about shoes and clothes', highlight: 'Your demand market is way weaker than the supply market from your mom.' },
    { date: '04.30', title: 'Life is all about choices', subtitle: 'All the small choices and small actions accumulating towards where we\'re today' },
    { date: '04.25', title: 'The small and beautiful things noticed from everyday life in the U.S.' },
  ],
  relationship: [
    { date: '04.29', title: 'For Girls', subtitle: 'Always find the guy who strongly shows interest and who never makes you feel self-consumed' },
    { date: '04.29', title: 'How I can successfully start one relationship', subtitle: 'At least lasting for 4 months with my ideal type' },
  ],
  knowledge: [
    { date: '04.21', title: 'More than 80% of women-man relationships are built by dating app', subtitle: 'Or at least started with dating intention among office workers' },
  ],
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredNotes = selectedCategory
    ? NOTES[selectedCategory as keyof typeof NOTES] || []
    : Object.values(NOTES).flat();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663692576894/Na4h25vjRQ6UfmBj5vuJZP/logo-icon-9Uipn2GM2TCBYbsYghqjRm.webp"
              alt="Notes of Interest"
              className="w-10 h-10"
            />
            <h1 className="font-display text-xl text-foreground">Notes of Interest</h1>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">About</a>
            <a href="#notes" className="text-sm font-medium hover:text-primary transition-colors">Reflections</a>
            <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Connect</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Image */}
          <div className="h-96 lg:h-screen relative">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663692576894/Na4h25vjRQ6UfmBj5vuJZP/hero-reflection-7F5QGR9B9wgEGNUVDxARpy.webp"
              alt="Reflection and introspection"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center px-6 md:px-12 py-12 lg:py-0 bg-background">
            <div className="max-w-md">
              <div className="inline-block mb-4 px-3 py-1 bg-secondary/50 rounded-full">
                <span className="text-xs font-medium text-foreground">Personal Portfolio</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl mb-4 text-foreground leading-tight">
                Observations on Life, Work & Growth
              </h2>
              <p className="text-lg text-muted-foreground mb-8 font-accent">
                A collection of thoughtful reflections on psychology, industry, relationships, and the beautiful moments we often overlook.
              </p>
              <Button
                size="lg"
                className="w-fit bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => document.getElementById('notes')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Reflections
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-background">
        <div className="container max-w-3xl">
          <h3 className="font-display text-3xl mb-6 text-foreground">About This Space</h3>
          <p className="text-lg text-muted-foreground mb-4 font-accent">
            This is a personal notebook of interesting observations from my life and work. Over time, I've noticed patterns in how we think, connect, and grow—and I wanted to share those insights.
          </p>
          <p className="text-lg text-muted-foreground font-accent">
            Whether it's a question about what triggers emotion, an observation about different industries, or a reflection on modern relationships, these notes represent my ongoing journey of understanding myself and the world around me.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-secondary/30">
        <div className="container">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === null
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background text-foreground border border-border hover:border-primary'
              }`}
            >
              All Reflections
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === cat.id
                    ? `${cat.color} text-white`
                    : 'bg-background text-foreground border border-border hover:border-primary'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Notes Section */}
      <section id="notes" className="py-20 bg-background">
        <div className="container max-w-4xl">
          <h3 className="font-display text-3xl mb-12 text-foreground">Reflections</h3>

          <div className="space-y-8">
            {filteredNotes.map((note, idx) => {
              const categoryId = selectedCategory || Object.keys(NOTES).find(
                (key) => NOTES[key as keyof typeof NOTES].includes(note)
              );
              const category = CATEGORIES.find((c) => c.id === categoryId);

              return (
                <div
                  key={idx}
                  className="group border-l-4 border-primary pl-6 py-4 hover:bg-secondary/20 transition-colors rounded-r-lg"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">{note.date}</span>
                    {category && (
                      <span className={`text-xs font-medium px-2 py-1 rounded-full text-white ${category.color}`}>
                        {category.label}
                      </span>
                    )}
                  </div>
                  <h4 className="font-display text-xl mb-2 text-foreground group-hover:text-primary transition-colors">
                    {note.title}
                  </h4>
                  {note.subtitle && (
                    <p className="text-muted-foreground mb-2 font-accent">{note.subtitle}</p>
                  )}
                  {note.highlight && (
                    <p className="text-foreground font-accent-italic bg-secondary/40 px-4 py-3 rounded-lg border-l-2 border-primary">
                      "{note.highlight}"
                    </p>
                  )}
                  {note.link && (
                    <a
                      href={note.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:underline mt-3 font-medium"
                    >
                      Visit →
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-12 bg-secondary/30 border-t border-border">
        <div className="container max-w-3xl">
          <div className="mb-8">
            <h4 className="font-display text-xl mb-4 text-foreground">Let's Connect</h4>
            <p className="text-muted-foreground mb-6 font-accent">
              I'm always interested in thoughtful conversations about life, work, and personal growth.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <a
              href="https://github.com/evelyyyyynnnnn"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              GitHub
            </a>
            <a
              href="https://www.notion.so"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-secondary/50 transition-colors font-medium"
            >
              Notion
            </a>
          </div>

          <div className="text-sm text-muted-foreground border-t border-border pt-6">
            <p>Built with reflection and care. © 2026</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
