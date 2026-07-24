/*
 * DESIGN PHILOSOPHY: Editorial Finance
 * Why section: 4 feature cards in a 2x2 grid
 * Topics section: tag cloud of key topics
 */
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Users, Layers, Zap, BookOpen } from 'lucide-react';

const WHY_ICONS = [Users, Layers, Zap, BookOpen];

const TOPICS_EN = [
  'Public Equity', 'Fixed Income', 'Private Credit', 'Hedge Funds',
  'Structured Finance', 'ABS / MBS / CLO', 'Yield Curve', 'SOFR',
  'Interest Rate Derivatives', 'Macro Risk Factors', 'Prepayment Models',
  'Machine Learning', 'Deep Learning', 'Transformer', 'LLMs',
  'RAG Systems', 'AI Agents', 'Vector Databases', 'AI Governance',
  'Data Pipelines', 'Model Deployment', 'Global Macro', 'Credit Spreads',
  'Equity Risk Premium', 'Inflation Dynamics', 'M2 Money Supply',
];

const TOPICS_ZH = [
  '公开股票', '固定收益', '私募信贷', '对冲基金',
  '结构化金融', 'ABS / MBS / CLO', '收益率曲线', 'SOFR利率',
  '利率衍生品', '宏观风险因子', '提前还款模型',
  '机器学习', '深度学习', 'Transformer', '大语言模型',
  'RAG系统', 'AI智能体', '向量数据库', 'AI治理',
  '数据管道', '模型部署', '全球宏观', '信用利差',
  '股票风险溢价', '通胀动态', 'M2货币供应',
];

export default function WhySection() {
  const { t, lang } = useLanguage();
  const ref = useScrollAnimation();
  const topicsRef = useScrollAnimation();

  const cards = [
    { key: 'why.card1', icon: WHY_ICONS[0] },
    { key: 'why.card2', icon: WHY_ICONS[1] },
    { key: 'why.card3', icon: WHY_ICONS[2] },
    { key: 'why.card4', icon: WHY_ICONS[3] },
  ];

  const topics = lang === 'en' ? TOPICS_EN : TOPICS_ZH;

  return (
    <>
      {/* Why section */}
      <section
        id="why"
        className="py-24 lg:py-32"
        style={{ background: 'var(--secondary)' }}
      >
        <div className="container" ref={ref}>
          <div className="max-w-2xl mb-14">
            <div className="fade-up" data-delay="0">
              <span className="chapter-badge mb-4 inline-block">
                {lang === 'en' ? 'Why This Course' : '为什么选择'}
              </span>
            </div>
            <h2
              className="fade-up font-display font-bold text-foreground mb-4"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
              data-delay="80"
            >
              {t('why.title')}
            </h2>
            <p className="fade-up text-lg text-muted-foreground" data-delay="160">
              {t('why.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={i}
                  className="fade-up card-lift bg-card border border-border rounded-xl p-6 lg:p-7"
                  data-delay={`${i * 80}`}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: 'var(--accent)' }}
                  >
                    <Icon size={20} style={{ color: 'var(--teal)' }} />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    {t(`${card.key}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(`${card.key}.desc`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Topics section */}
      <section id="topics" className="py-20 lg:py-28 bg-background">
        <div className="container" ref={topicsRef}>
          <div className="max-w-2xl mb-12">
            <h2
              className="fade-up font-display font-bold text-foreground mb-4"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
              data-delay="0"
            >
              {t('topics.title')}
            </h2>
            <p className="fade-up text-lg text-muted-foreground" data-delay="80">
              {t('topics.subtitle')}
            </p>
          </div>

          <div className="fade-up flex flex-wrap gap-2.5" data-delay="160">
            {topics.map((topic, i) => (
              <span
                key={i}
                className="inline-flex items-center px-3.5 py-1.5 rounded-full text-sm border border-border text-muted-foreground hover:border-[var(--teal)] hover:text-[var(--teal)] transition-all cursor-default"
                style={{ fontFamily: i % 4 === 0 ? 'JetBrains Mono, monospace' : undefined }}
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
