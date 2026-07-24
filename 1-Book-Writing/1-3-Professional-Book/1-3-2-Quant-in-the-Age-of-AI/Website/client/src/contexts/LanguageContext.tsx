/*
 * DESIGN PHILOSOPHY: Editorial Finance
 * Language context for EN/ZH bilingual toggle
 */
import React, { createContext, useContext, useState, useCallback } from 'react';

type Language = 'en' | 'zh';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.curriculum': 'Curriculum',
    'nav.about': 'About',
    'nav.cta': 'Get Started',
    'nav.lang': '中文',

    // Hero
    'hero.badge': 'New Release',
    'hero.title': 'Quant in the\nAge of AI',
    'hero.subtitle': 'From Mortgage Models to Machine Intelligence',
    'hero.desc': 'A comprehensive, practitioner-oriented guide that bridges quantitative finance and artificial intelligence — covering financial markets, mathematical models, deep learning, and real-world engineering applications.',
    'hero.cta.primary': 'Explore the Curriculum',
    'hero.cta.secondary': 'Learn More',
    'hero.stat1.num': '4',
    'hero.stat1.label': 'Core Parts',
    'hero.stat2.num': '200+',
    'hero.stat2.label': 'Topics Covered',
    'hero.stat3.num': '3',
    'hero.stat3.label': 'Disciplines United',

    // Parts overview
    'parts.title': 'Four Pillars of Modern Finance',
    'parts.subtitle': 'A structured journey from market fundamentals to AI-powered applications',
    'part1.badge': 'Part I',
    'part1.title': 'Finance',
    'part1.subtitle': 'How is the World Running?',
    'part1.desc': 'Master the architecture of global financial markets — from public equities and fixed income to private credit, hedge funds, and alternative assets. Understand the macro forces and risk factors that drive every asset class.',
    'part1.topics': 'Public Equity · Fixed Income · Private Credit · Hedge Funds · Macro Risk Factors · Interest Rates · Structured Finance',
    'part2.badge': 'Part II',
    'part2.title': 'Models',
    'part2.subtitle': 'How Quants Understand the World?',
    'part2.desc': 'Dive into the mathematical models that power quantitative finance — prepayment models, yield curve construction, risk factor decomposition, and the statistical foundations that underpin every trading strategy.',
    'part2.topics': 'Prepayment Models · Yield Curves · Risk Decomposition · Statistical Foundations · Pricing Models',
    'part3.badge': 'Part III',
    'part3.title': 'Artificial Intelligence',
    'part3.subtitle': 'How AI Changes the World?',
    'part3.desc': 'From foundational mathematics to cutting-edge LLMs — explore the full AI stack. Understand transformers, foundation models, RAG systems, AI agents, and how they are reshaping quantitative research and trading.',
    'part3.topics': 'Machine Learning · Deep Learning · Transformers · LLMs · RAG · AI Agents · AI Governance',
    'part4.badge': 'Part IV',
    'part4.title': 'Engineering',
    'part4.subtitle': 'Business Application',
    'part4.desc': 'Bridge theory and practice — learn how to build production-ready AI systems for finance. From data pipelines to model deployment, understand the engineering stack that powers modern quantitative firms.',
    'part4.topics': 'Data Pipelines · Model Deployment · Vector Databases · AI Infrastructure · Production Systems',

    // Why section
    'why.title': 'Why This Course?',
    'why.subtitle': 'Built for practitioners who need depth, not just breadth',
    'why.card1.title': 'Practitioner-First',
    'why.card1.desc': 'Written by professionals who have worked across buy-side, sell-side, and technology — every concept is grounded in real-world application.',
    'why.card2.title': 'Cross-Disciplinary',
    'why.card2.desc': 'The only resource that seamlessly connects financial markets, quantitative models, and AI — the three skills every modern quant needs.',
    'why.card3.title': 'Market-Ready',
    'why.card3.desc': 'From SOFR transitions to LLM-powered research tools — content stays current with the rapidly evolving landscape of AI in finance.',
    'why.card4.title': 'Structured Learning',
    'why.card4.desc': 'A clear progression from foundational concepts to advanced applications, with a comprehensive jargon handbook and reference dictionary.',

    // Topics
    'topics.title': 'Key Topics at a Glance',
    'topics.subtitle': 'Spanning the full spectrum from market microstructure to AI governance',

    // CTA section
    'cta.title': 'Ready to Master Quant Finance in the AI Era?',
    'cta.subtitle': 'Join practitioners, researchers, and students bridging the gap between traditional finance and machine intelligence.',
    'cta.btn': 'Start Learning Today',
    'cta.note': 'Part of a comprehensive learning system',

    // Footer
    'footer.tagline': 'From Mortgage Models to Machine Intelligence',
    'footer.parts': 'Curriculum',
    'footer.part1': 'Part I: Finance',
    'footer.part2': 'Part II: Models',
    'footer.part3': 'Part III: AI',
    'footer.part4': 'Part IV: Engineering',
    'footer.rights': '© 2025 Quant in the Age of AI. All rights reserved.',
  },
  zh: {
    // Nav
    'nav.home': '首页',
    'nav.curriculum': '课程体系',
    'nav.about': '关于',
    'nav.cta': '立即开始',
    'nav.lang': 'English',

    // Hero
    'hero.badge': '全新发布',
    'hero.title': 'AI时代的\n量化金融',
    'hero.subtitle': '从抵押贷款模型到机器智能',
    'hero.desc': '一本面向从业者的综合指南，架起量化金融与人工智能之间的桥梁——涵盖金融市场、数学模型、深度学习以及真实工程应用。',
    'hero.cta.primary': '探索课程体系',
    'hero.cta.secondary': '了解更多',
    'hero.stat1.num': '4',
    'hero.stat1.label': '核心模块',
    'hero.stat2.num': '200+',
    'hero.stat2.label': '知识主题',
    'hero.stat3.num': '3',
    'hero.stat3.label': '学科融合',

    // Parts overview
    'parts.title': '现代金融的四大支柱',
    'parts.subtitle': '从市场基础到AI驱动应用的系统化学习路径',
    'part1.badge': '第一部分',
    'part1.title': '金融市场',
    'part1.subtitle': '世界如何运转？',
    'part1.desc': '掌握全球金融市场的架构——从公开市场股票、固定收益，到私募信贷、对冲基金和另类资产。理解驱动每类资产的宏观力量与风险因子。',
    'part1.topics': '公开股票 · 固定收益 · 私募信贷 · 对冲基金 · 宏观风险因子 · 利率 · 结构化金融',
    'part2.badge': '第二部分',
    'part2.title': '量化模型',
    'part2.subtitle': '量化分析师如何理解世界？',
    'part2.desc': '深入量化金融的数学模型——提前还款模型、收益率曲线构建、风险因子分解，以及支撑每一种交易策略的统计学基础。',
    'part2.topics': '提前还款模型 · 收益率曲线 · 风险分解 · 统计学基础 · 定价模型',
    'part3.badge': '第三部分',
    'part3.title': '人工智能',
    'part3.subtitle': 'AI如何改变世界？',
    'part3.desc': '从数学基础到前沿大语言模型——探索完整的AI技术栈。理解Transformer、基础模型、RAG系统、AI智能体，以及它们如何重塑量化研究与交易。',
    'part3.topics': '机器学习 · 深度学习 · Transformer · 大语言模型 · RAG · AI智能体 · AI治理',
    'part4.badge': '第四部分',
    'part4.title': '工程实践',
    'part4.subtitle': '商业应用落地',
    'part4.desc': '打通理论与实践——学习如何为金融构建生产级AI系统。从数据管道到模型部署，理解驱动现代量化公司的工程技术栈。',
    'part4.topics': '数据管道 · 模型部署 · 向量数据库 · AI基础设施 · 生产系统',

    // Why section
    'why.title': '为什么选择这门课？',
    'why.subtitle': '为需要深度而非广度的从业者而生',
    'why.card1.title': '从业者视角',
    'why.card1.desc': '由在买方、卖方和科技公司均有实战经验的专业人士撰写——每个概念都扎根于真实应用场景。',
    'why.card2.title': '跨学科融合',
    'why.card2.desc': '唯一无缝连接金融市场、量化模型与AI的资源——这正是每位现代量化人才所需的三项核心技能。',
    'why.card3.title': '紧跟市场',
    'why.card3.desc': '从SOFR利率转换到LLM驱动的研究工具——内容与AI在金融领域快速演进的格局保持同步。',
    'why.card4.title': '结构化学习',
    'why.card4.desc': '从基础概念到高级应用的清晰进阶路径，配有完整的术语手册和参考词典。',

    // Topics
    'topics.title': '核心主题一览',
    'topics.subtitle': '横跨市场微观结构到AI治理的完整知识谱系',

    // CTA section
    'cta.title': '准备好在AI时代掌握量化金融了吗？',
    'cta.subtitle': '加入正在弥合传统金融与机器智能鸿沟的从业者、研究者和学生群体。',
    'cta.btn': '立即开始学习',
    'cta.note': '综合学习系统的重要组成部分',

    // Footer
    'footer.tagline': '从抵押贷款模型到机器智能',
    'footer.parts': '课程体系',
    'footer.part1': '第一部分：金融',
    'footer.part2': '第二部分：模型',
    'footer.part3': '第三部分：AI',
    'footer.part4': '第四部分：工程',
    'footer.rights': '© 2025 AI时代的量化金融。保留所有权利。',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en');

  const toggleLang = useCallback(() => {
    setLang(prev => prev === 'en' ? 'zh' : 'en');
  }, []);

  const t = useCallback((key: string) => {
    return translations[lang][key] ?? key;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
