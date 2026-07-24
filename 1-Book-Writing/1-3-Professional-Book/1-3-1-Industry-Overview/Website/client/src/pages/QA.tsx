// DESIGN: Editorial Finance — Q&A log page
// Date-grouped questions and answers, styled to match the book's editorial aesthetic
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown, ChevronUp, BookOpen, ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';

interface QAEntry {
  id: string;
  date: string;         // e.g. "April 5"
  dateISO: string;      // for sorting, e.g. "2026-04-05"
  question: string;
  answer: string;
  relatedChapter?: string;
}

const QA_DATA: QAEntry[] = [
  {
    id: 'q1',
    date: 'April 5',
    dateISO: '2026-04-05',
    question: 'Verisk是一家什么公司？',
    answer:
      'A data analytics company that helps businesses — especially insurers — assess risk and make decisions using large-scale data and predictive models.',
    relatedChapter: 'Chapter 14: Professional and Business Services',
  },
  {
    id: 'q2',
    date: 'May 25',
    dateISO: '2026-05-25',
    question: 'Why do some companies use "Inc." and others use "Corp."?',
    answer:
      'Both mean exactly the same thing — the company is legally incorporated with limited liability for shareholders. The choice between "Incorporated" and "Corporation" is purely stylistic; founders just pick whichever sounds better for their brand. Other suffixes like LLC, Ltd., N.V., and Oyj represent genuinely different legal structures or are country-specific equivalents.',
    relatedChapter: 'Chapter 2: The Anatomy of a Company',
  },
];

// Group entries by date label
function groupByDate(entries: QAEntry[]) {
  const map = new Map<string, QAEntry[]>();
  const sorted = [...entries].sort((a, b) => a.dateISO.localeCompare(b.dateISO));
  for (const entry of sorted) {
    if (!map.has(entry.date)) map.set(entry.date, []);
    map.get(entry.date)!.push(entry);
  }
  return map;
}

function QACard({ entry }: { entry: QAEntry }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border border-border rounded-lg overflow-hidden transition-all duration-200"
      style={{ background: 'var(--card)' }}
    >
      <button
        className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 hover:bg-accent/40 transition-colors duration-150"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span
          className="font-semibold text-base leading-snug flex-1"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--foreground)' }}
        >
          {entry.question}
        </span>
        <span className="mt-0.5 shrink-0 text-muted-foreground">
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>

      {open && (
        <div className="px-6 pb-5 border-t border-border">
          <p className="text-sm text-muted-foreground leading-relaxed mt-4">
            {entry.answer}
          </p>
          {entry.relatedChapter && (
            <div className="mt-4 flex items-center gap-2">
              <BookOpen size={13} className="shrink-0" style={{ color: 'var(--amber-accent)' }} />
              <span
                className="text-xs font-medium tracking-wide"
                style={{ color: 'var(--amber-accent)' }}
              >
                {entry.relatedChapter}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function QAPage() {
  const { language } = useLanguage();
  const [, navigate] = useLocation();
  const grouped = groupByDate(QA_DATA);

  const pageTitle = language === 'zh' ? '问答记录' : 'Q&A Log';
  const pageSubtitle =
    language === 'zh'
      ? '阅读过程中的问题与解答，按日期整理。'
      : 'Questions and answers collected during reading, organized by date.';
  const backLabel = language === 'zh' ? '返回首页' : 'Back to Home';
  const totalLabel =
    language === 'zh'
      ? `共 ${QA_DATA.length} 条记录`
      : `${QA_DATA.length} entries`;

  return (
    <div
      className="min-h-screen"
      style={{ background: 'var(--background)', fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      {/* Header */}
      <div
        className="border-b border-border"
        style={{ background: 'var(--card)' }}
      >
        <div className="container py-10 pt-24">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft size={15} />
            {backLabel}
          </button>

          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-2"
                style={{ color: 'var(--amber-accent)' }}
              >
                {language === 'zh' ? '知识积累' : 'Knowledge Log'}
              </p>
              <h1
                className="text-4xl font-bold tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {pageTitle}
              </h1>
              <p className="text-muted-foreground mt-2 text-sm max-w-xl">{pageSubtitle}</p>
            </div>
            <span
              className="text-xs font-semibold px-3 py-1.5 rounded-full border"
              style={{ borderColor: 'var(--amber-accent)', color: 'var(--amber-accent)' }}
            >
              {totalLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12">
        <div className="max-w-3xl">
          {Array.from(grouped.entries()).map(([date, entries]) => (
            <div key={date} className="mb-12">
              {/* Date divider */}
              <div className="flex items-center gap-4 mb-5">
                <span
                  className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded"
                  style={{
                    background: 'var(--amber-accent)',
                    color: '#1a1200',
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                  }}
                >
                  {date}
                </span>
                <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
                <span className="text-xs text-muted-foreground">
                  {entries.length} {entries.length === 1 ? (language === 'zh' ? '条' : 'entry') : (language === 'zh' ? '条' : 'entries')}
                </span>
              </div>

              {/* Q&A cards */}
              <div className="flex flex-col gap-3">
                {entries.map((entry) => (
                  <QACard key={entry.id} entry={entry} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
