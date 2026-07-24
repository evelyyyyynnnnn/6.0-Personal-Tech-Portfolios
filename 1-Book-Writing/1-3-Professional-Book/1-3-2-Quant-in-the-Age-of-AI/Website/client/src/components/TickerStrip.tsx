/*
 * DESIGN PHILOSOPHY: Editorial Finance
 * Ticker strip: scrolling marquee of key topics/terms
 * Adds visual rhythm between hero and curriculum sections
 */
import { useLanguage } from '@/contexts/LanguageContext';

const ITEMS_EN = [
  'Fixed Income', 'Machine Learning', 'Yield Curve', 'LLMs', 'Private Credit',
  'Transformers', 'SOFR', 'Deep Learning', 'Hedge Funds', 'RAG Systems',
  'ABS · MBS · CLO', 'AI Agents', 'Prepayment Models', 'Vector Databases',
  'Macro Risk Factors', 'Neural Networks', 'Interest Rate Derivatives', 'AI Governance',
];

const ITEMS_ZH = [
  '固定收益', '机器学习', '收益率曲线', '大语言模型', '私募信贷',
  'Transformer架构', 'SOFR利率', '深度学习', '对冲基金', 'RAG系统',
  'ABS · MBS · CLO', 'AI智能体', '提前还款模型', '向量数据库',
  '宏观风险因子', '神经网络', '利率衍生品', 'AI治理',
];

export default function TickerStrip() {
  const { lang } = useLanguage();
  const items = lang === 'en' ? ITEMS_EN : ITEMS_ZH;
  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <div
      className="overflow-hidden py-3 border-y border-border"
      style={{ background: 'var(--accent)' }}
    >
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-0 flex-shrink-0">
            <span
              className="text-xs font-mono font-medium tracking-wide px-5 whitespace-nowrap"
              style={{ color: 'var(--teal)' }}
            >
              {item}
            </span>
            <span
              className="text-xs opacity-40 flex-shrink-0"
              style={{ color: 'var(--teal)' }}
            >
              /
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
