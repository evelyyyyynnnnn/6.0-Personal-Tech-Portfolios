/*
 * DESIGN PHILOSOPHY: Editorial Finance
 * Four-part curriculum cards with alternating layout and section images
 * Chapter pill badges, teal left-border callouts, fade-up animations
 */
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { TrendingUp, Calculator, Brain, Cpu } from 'lucide-react';

const FINANCE_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663527624808/9hRpYbdiGBVyCjz5FqhgCn/finance-section-QSim5incFTd5L7g4KbyjPz.webp';
const AI_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663527624808/9hRpYbdiGBVyCjz5FqhgCn/ai-section-Feg5rKqU8xBHYcXdZxeVvN.webp';
const MODELS_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663527624808/9hRpYbdiGBVyCjz5FqhgCn/models-section-3jagbRWjdh2FSRb9qhs2cp.webp';

const ICONS = [TrendingUp, Calculator, Brain, Cpu];

export default function CurriculumSection() {
  const { t, lang } = useLanguage();
  const ref = useScrollAnimation();

  const parts = [
    {
      badge: t('part1.badge'),
      title: t('part1.title'),
      subtitle: t('part1.subtitle'),
      desc: t('part1.desc'),
      topics: t('part1.topics'),
      img: FINANCE_IMG,
      imgAlt: 'Financial markets visualization',
      reverse: false,
      color: '#0F7173',
    },
    {
      badge: t('part2.badge'),
      title: t('part2.title'),
      subtitle: t('part2.subtitle'),
      desc: t('part2.desc'),
      topics: t('part2.topics'),
      img: MODELS_IMG,
      imgAlt: 'Quantitative models visualization',
      reverse: true,
      color: '#0F7173',
    },
    {
      badge: t('part3.badge'),
      title: t('part3.title'),
      subtitle: t('part3.subtitle'),
      desc: t('part3.desc'),
      topics: t('part3.topics'),
      img: AI_IMG,
      imgAlt: 'AI and neural networks visualization',
      reverse: false,
      color: '#0F7173',
    },
    {
      badge: t('part4.badge'),
      title: t('part4.title'),
      subtitle: t('part4.subtitle'),
      desc: t('part4.desc'),
      topics: t('part4.topics'),
      img: null,
      imgAlt: '',
      reverse: true,
      color: '#0F7173',
    },
  ];

  return (
    <section id="curriculum" className="py-24 lg:py-32 bg-background">
      <div className="container" ref={ref}>
        {/* Section header */}
        <div className="max-w-2xl mb-16 lg:mb-20">
          <div className="fade-up" data-delay="0">
            <span className="chapter-badge mb-4 inline-block">
              {lang === 'en' ? 'Curriculum' : '课程体系'}
            </span>
          </div>
          <h2
            className="fade-up font-display font-bold text-foreground mb-4"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
            data-delay="80"
          >
            {t('parts.title')}
          </h2>
          <p className="fade-up text-lg text-muted-foreground" data-delay="160">
            {t('parts.subtitle')}
          </p>
        </div>

        {/* Parts */}
        <div className="flex flex-col gap-20 lg:gap-28">
          {parts.map((part, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={i}
                className={`fade-up grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  part.reverse ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
                data-delay={`${i * 100}`}
              >
                {/* Content */}
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <span
                      className="chapter-badge"
                      style={{ color: 'var(--teal)', background: 'var(--accent)' }}
                    >
                      {part.badge}
                    </span>
                    <div
                      className="w-8 h-8 rounded-md flex items-center justify-center"
                      style={{ background: 'var(--accent)' }}
                    >
                      <Icon size={16} style={{ color: 'var(--teal)' }} />
                    </div>
                  </div>

                  <div>
                    <h3
                      className="font-display font-bold text-foreground"
                      style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}
                    >
                      {part.title}
                    </h3>
                    <p
                      className="font-display italic mt-1"
                      style={{ color: 'var(--teal)', fontSize: '1rem' }}
                    >
                      {part.subtitle}
                    </p>
                  </div>

                  <p className="text-base text-muted-foreground leading-relaxed">
                    {part.desc}
                  </p>

                  {/* Topics callout */}
                  <div className="teal-border-left">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <span className="font-semibold text-foreground block mb-1 text-xs font-mono uppercase tracking-wider">
                        {lang === 'en' ? 'Key Topics' : '核心主题'}
                      </span>
                      {part.topics}
                    </p>
                  </div>
                </div>

                {/* Image or placeholder */}
                {part.img ? (
                  <div className="relative rounded-xl overflow-hidden card-lift">
                    <img
                      src={part.img}
                      alt={part.imgAlt}
                      className="w-full h-auto object-cover"
                      style={{ aspectRatio: '3/2' }}
                    />
                    <div className="absolute inset-0 opacity-0 dark:opacity-30 bg-gradient-to-br from-background to-transparent pointer-events-none" />
                  </div>
                ) : (
                  /* Part IV: Engineering — decorative placeholder with tech stack */
                  <div
                    className="rounded-xl border border-border p-8 flex flex-col gap-4"
                    style={{ background: 'var(--card)', minHeight: '280px' }}
                  >
                    <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2">
                      {lang === 'en' ? 'Engineering Stack' : '工程技术栈'}
                    </div>
                    {[
                      { label: 'Data Pipeline', sub: lang === 'en' ? 'Ingestion · Transform · Load' : '采集 · 转换 · 加载' },
                      { label: 'Model Deployment', sub: lang === 'en' ? 'Inference · Monitoring · Scaling' : '推理 · 监控 · 扩展' },
                      { label: 'Vector Database', sub: lang === 'en' ? 'Embeddings · Search · RAG' : '嵌入 · 检索 · RAG' },
                      { label: 'AI Infrastructure', sub: lang === 'en' ? 'Training · Serving · Evaluation' : '训练 · 服务 · 评估' },
                    ].map((item, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                          style={{ background: 'var(--teal)' }}
                        />
                        <div>
                          <div className="font-mono text-sm font-medium text-foreground">{item.label}</div>
                          <div className="text-xs text-muted-foreground">{item.sub}</div>
                        </div>
                      </div>
                    ))}
                    <div className="mt-auto pt-4 border-t border-border">
                      <span className="text-xs font-mono text-muted-foreground">
                        {lang === 'en' ? 'Coming Soon — Full Chapter' : '即将发布 — 完整章节'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
