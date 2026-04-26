// ============================================================
// DESIGN PHILOSOPHY: Editorial Finance
// Bilingual content store — English & Chinese
// ============================================================

export type Language = 'en' | 'zh';

export interface Translation {
  // Navigation
  nav: {
    title: string;
    subtitle: string;
    home: string;
    contents: string;
    sectors: string;
    regions: string;
    trends: string;
    about: string;
    langToggle: string;
    themeLight: string;
    themeDark: string;
  };
  // Hero
  hero: {
    eyebrow: string;
    title: string;
    titleLine2: string;
    subtitle: string;
    cta: string;
    ctaSecondary: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
  };
  // Table of Contents
  toc: {
    sectionLabel: string;
    title: string;
    subtitle: string;
    preface: string;
    prefaceDesc: string;
    part1: string;
    part1Desc: string;
    part2: string;
    part2Desc: string;
    part3: string;
    part3Desc: string;
    part4: string;
    part4Desc: string;
    part5: string;
    part5Desc: string;
    part6: string;
    part6Desc: string;
    part7: string;
    part7Desc: string;
    part8: string;
    part8Desc: string;
  };
  // Sectors
  sectors: {
    sectionLabel: string;
    title: string;
    subtitle: string;
    primary: {
      badge: string;
      title: string;
      desc: string;
      chapters: string[];
      trends: string[];
    };
    secondary: {
      badge: string;
      title: string;
      desc: string;
      chapters: string[];
      trends: string[];
    };
    tertiary: {
      badge: string;
      title: string;
      desc: string;
      chapters: string[];
      trends: string[];
    };
    quaternary: {
      badge: string;
      title: string;
      desc: string;
      chapters: string[];
      trends: string[];
    };
  };
  // Company Profiles
  company: {
    sectionLabel: string;
    title: string;
    subtitle: string;
    startup: {
      title: string;
      desc: string;
      tags: string[];
    };
    midmarket: {
      title: string;
      desc: string;
      tags: string[];
    };
    large: {
      title: string;
      desc: string;
      tags: string[];
    };
    soe: {
      title: string;
      desc: string;
      tags: string[];
    };
  };
  // Regions
  regions: {
    sectionLabel: string;
    title: string;
    subtitle: string;
    northAmerica: {
      title: string;
      desc: string;
      highlight: string;
    };
    europe: {
      title: string;
      desc: string;
      highlight: string;
    };
    asiaPacific: {
      title: string;
      desc: string;
      highlight: string;
    };
    emerging: {
      title: string;
      desc: string;
      highlight: string;
    };
  };
  // Future Trends
  trends: {
    sectionLabel: string;
    title: string;
    subtitle: string;
    green: {
      title: string;
      desc: string;
      points: string[];
    };
    ai: {
      title: string;
      desc: string;
      points: string[];
    };
    frontier: {
      title: string;
      desc: string;
      points: string[];
    };
  };
  // About / CTA
  about: {
    sectionLabel: string;
    title: string;
    subtitle: string;
    desc: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    cta: string;
    ctaSecondary: string;
  };
  // Footer
  footer: {
    tagline: string;
    copyright: string;
    parts: string;
    chapters: string;
    appendices: string;
  };
}

const en: Translation = {
  nav: {
    title: 'Global Industry Landscape',
    subtitle: 'A Comprehensive Guide',
    home: 'Home',
    contents: 'Contents',
    sectors: 'Sectors',
    regions: 'Regions',
    trends: 'Trends',
    about: 'About',
    langToggle: '中文',
    themeLight: 'Light',
    themeDark: 'Dark',
  },
  hero: {
    eyebrow: 'Comprehensive Reference Publication',
    title: 'The Global Industry',
    titleLine2: 'Landscape',
    subtitle: 'A definitive guide to industry classifications, company profiles, regional ecosystems, and emerging trends across the global economy — from primary extraction to frontier technology.',
    cta: 'Explore Contents',
    ctaSecondary: 'View All Sectors',
    stat1Value: '26',
    stat1Label: 'Industry Chapters',
    stat2Value: '8',
    stat2Label: 'Economic Sectors',
    stat3Value: '4',
    stat3Label: 'Global Regions',
  },
  toc: {
    sectionLabel: 'Table of Contents',
    title: 'A Structured Journey Through the Global Economy',
    subtitle: 'Eight comprehensive parts covering every dimension of the modern industrial landscape.',
    preface: 'Preface & Introduction',
    prefaceDesc: 'Why understanding industries matters and how to use this guide effectively.',
    part1: 'Part I — Foundations of Industry Analysis',
    part1Desc: 'Industry classifications (GICS, NAICS), the five-sector model, and the anatomy of a company.',
    part2: 'Part II — The Primary Sector',
    part2Desc: 'Agriculture, forestry, fishing, mining, oil & gas, and natural resources.',
    part3: 'Part III — The Secondary Sector',
    part3Desc: 'Manufacturing, construction, real estate, energy, and utilities.',
    part4: 'Part IV — The Tertiary Sector',
    part4Desc: 'Retail, financial services, healthcare, transportation, hospitality, and entertainment.',
    part5: 'Part V — The Quaternary Sector',
    part5Desc: 'Technology, software, telecommunications, professional services, and education.',
    part6: 'Part VI — Company Profiles by Classification',
    part6Desc: 'Startups, SMBs, mid-market enterprises, large corporations, SOEs, and non-profits.',
    part7: 'Part VII — Regional Industry Landscapes',
    part7Desc: 'North America, Europe, Asia-Pacific, and emerging frontier markets.',
    part8: 'Part VIII — Future Trends & Emerging Industries',
    part8Desc: 'The green economy, artificial intelligence, space, biotech, and frontier industries.',
  },
  sectors: {
    sectionLabel: 'Industry Sectors',
    title: 'Four Economic Sectors, One Complete Picture',
    subtitle: 'From raw material extraction to the knowledge economy — every major industry sector analyzed in depth.',
    primary: {
      badge: 'Part II',
      title: 'Primary Sector',
      desc: 'The foundation of all economic activity — extraction and harvesting of natural resources. Covers agriculture, forestry, fishing, mining, oil & gas, and rare earth minerals.',
      chapters: ['Ch. 3: Agriculture, Forestry & Fishing', 'Ch. 4: Mining, Oil & Gas, Natural Resources'],
      trends: ['Precision Agriculture', 'Energy Transition', 'Resource Nationalism'],
    },
    secondary: {
      badge: 'Part III',
      title: 'Secondary Sector',
      desc: 'Manufacturing and construction transform raw materials into finished goods and built environments. Covers heavy and light industry, construction, real estate, energy, and utilities.',
      chapters: ['Ch. 5: Manufacturing — Heavy & Light', 'Ch. 6: Construction & Real Estate', 'Ch. 7: Energy & Utilities'],
      trends: ['Industry 4.0 & Automation', 'PropTech & Green Building', 'Decarbonization & Smart Grids'],
    },
    tertiary: {
      badge: 'Part IV',
      title: 'Tertiary Sector',
      desc: 'Service industries that connect producers to consumers and provide essential social infrastructure. Covers retail, finance, healthcare, transportation, and hospitality.',
      chapters: ['Ch. 8: Retail & Consumer Goods', 'Ch. 9: Financial Services & Insurance', 'Ch. 10: Healthcare & Pharma', 'Ch. 11: Transportation & Logistics', 'Ch. 12: Hospitality & Entertainment'],
      trends: ['Omnichannel Retail', 'Open Banking & FinTech', 'AI Diagnostics & Telehealth'],
    },
    quaternary: {
      badge: 'Part V',
      title: 'Quaternary Sector',
      desc: 'The knowledge economy — industries built on information, expertise, and intellectual capital. Covers technology, software, telecommunications, professional services, and education.',
      chapters: ['Ch. 13: Technology, Software & Telecom', 'Ch. 14: Professional & Business Services', 'Ch. 15: Education & Research'],
      trends: ['AI & Cloud Computing', 'Digital Transformation', 'Online Learning & EdTech'],
    },
  },
  company: {
    sectionLabel: 'Company Profiles',
    title: 'Every Type of Enterprise, Analyzed',
    subtitle: 'From garage startups to state-owned giants — a complete taxonomy of business organizations.',
    startup: {
      title: 'Startups & SMBs',
      desc: 'Agile, innovative, and risk-tolerant. Covers bootstrapping, angel investment, venture capital, and regional startup ecosystems from Silicon Valley to Singapore.',
      tags: ['Bootstrapping', 'Venture Capital', 'Angel Investors', 'Lean Operations'],
    },
    midmarket: {
      title: 'Mid-Market Enterprises',
      desc: 'The "hidden champions" — stable, specialized, and growth-oriented. Covers financing structures, ownership models, and the geographic distribution of mid-market leaders.',
      tags: ['Private Equity', 'Specialization', 'Hidden Champions', 'Growth Ambition'],
    },
    large: {
      title: 'Large Corporations & MNCs',
      desc: 'Scale, complexity, and global reach. Covers corporate governance, stakeholder management, Fortune 500 profiles, and the dynamics of multinational conglomerates.',
      tags: ['Corporate Governance', 'Global Operations', 'Fortune 500', 'Stakeholder Management'],
    },
    soe: {
      title: 'State-Owned & Non-Profits',
      desc: 'Public mandate and accountability. Covers SOEs in energy, defense, and healthcare, plus non-profit organizations and their role in education and social services.',
      tags: ['Public Mandate', 'Government Ownership', 'Social Mission', 'Accountability'],
    },
  },
  regions: {
    sectionLabel: 'Regional Landscapes',
    title: 'The World Economy, Region by Region',
    subtitle: 'Dominant industries, key clusters, regulatory environments, and business culture across four major global regions.',
    northAmerica: {
      title: 'North America',
      desc: 'Innovation and scale define the North American economy. Home to Silicon Valley, Wall Street, and the world\'s largest consumer market. Dominant in technology, finance, healthcare, and defense.',
      highlight: 'Innovation & Scale',
    },
    europe: {
      title: 'Europe',
      desc: 'Tradition, regulation, and sustainability leadership. The EU Single Market creates a unique regulatory environment. Strong in manufacturing, luxury goods, financial services, and the green economy.',
      highlight: 'Tradition & Sustainability',
    },
    asiaPacific: {
      title: 'Asia-Pacific',
      desc: 'Growth, manufacturing, and digital leapfrogging. China, Japan, South Korea, India, and ASEAN represent the world\'s most dynamic economic region — from factory floors to frontier fintech.',
      highlight: 'Growth & Digital Leap',
    },
    emerging: {
      title: 'Middle East, Africa & Latin America',
      desc: 'Emerging frontiers with enormous potential. Diversification from oil dependency, Africa\'s Continental Free Trade Area, and Latin America\'s fintech revolution are reshaping these markets.',
      highlight: 'Emerging Frontiers',
    },
  },
  trends: {
    sectionLabel: 'Future Trends',
    title: 'The Forces Reshaping Global Industry',
    subtitle: 'Three megatrends that will define the next industrial era — and the companies leading the transformation.',
    green: {
      title: 'The Green Economy',
      desc: 'Renewable energy, circular economy models, and ESG investing are no longer niche — they are the new industrial mainstream. Carbon markets, green deals, and net-zero targets are reshaping every sector.',
      points: ['Renewable Energy & Storage', 'Circular Economy Models', 'ESG Investing & Carbon Markets', 'Net-Zero Corporate Targets'],
    },
    ai: {
      title: 'AI & The Next Industrial Revolution',
      desc: 'Artificial intelligence is not a single industry — it is a cross-sector force multiplier. AI-native business models, workforce transformation, and the emergence of entirely new industries are underway.',
      points: ['AI-Native Business Models', 'Cross-Industry Automation', 'Workforce Transformation', 'Emerging AI Disruptors'],
    },
    frontier: {
      title: 'Space, Biotech & Frontier Industries',
      desc: 'The commercial space economy, genomics revolution, quantum computing, and advanced materials represent the next wave of industrial creation — industries that did not exist a decade ago.',
      points: ['Commercial Space Economy', 'Biotechnology & Genomics', 'Quantum Computing', 'Advanced Materials'],
    },
  },
  about: {
    sectionLabel: 'About This Guide',
    title: 'Built for Professionals Who Need the Full Picture',
    subtitle: 'Whether you are an investor, strategist, consultant, or student — this guide delivers the structured intelligence you need.',
    desc: 'The Global Industry Landscape is designed as a comprehensive reference for anyone who needs to understand how the modern economy is organized, how industries interact, and where the most significant opportunities and risks lie.',
    feature1Title: 'Structured for Navigation',
    feature1Desc: 'Eight parts, 26 chapters, and detailed appendices — organized so you can read cover-to-cover or jump directly to what you need.',
    feature2Title: 'Bilingual Access',
    feature2Desc: 'Full English and Chinese editions ensure accessibility for professionals operating across global and Chinese-speaking markets.',
    feature3Title: 'Market-Ready Intelligence',
    feature3Desc: 'Company profiles, geographic hotspots, key trends, and financial metrics — the intelligence that drives real business decisions.',
    cta: 'Get the Full Guide',
    ctaSecondary: 'Learn More',
  },
  footer: {
    tagline: 'A Comprehensive Guide to Industry and Company Profiles',
    copyright: '© 2025 The Global Industry Landscape. All rights reserved.',
    parts: '8 Parts',
    chapters: '26 Chapters',
    appendices: '4 Appendices',
  },
};

const zh: Translation = {
  nav: {
    title: '全球产业格局',
    subtitle: '综合指南',
    home: '首页',
    contents: '目录',
    sectors: '行业板块',
    regions: '区域分析',
    trends: '未来趋势',
    about: '关于本书',
    langToggle: 'English',
    themeLight: '浅色',
    themeDark: '深色',
  },
  hero: {
    eyebrow: '权威参考出版物',
    title: '全球产业',
    titleLine2: '格局全景',
    subtitle: '一部关于行业分类、企业画像、区域生态与新兴趋势的权威指南——从初级资源开采到前沿科技，全面覆盖全球经济的每一个维度。',
    cta: '浏览目录',
    ctaSecondary: '查看所有行业',
    stat1Value: '26',
    stat1Label: '行业章节',
    stat2Value: '8',
    stat2Label: '经济板块',
    stat3Value: '4',
    stat3Label: '全球区域',
  },
  toc: {
    sectionLabel: '目录概览',
    title: '系统化解读全球经济的完整旅程',
    subtitle: '八大篇章，全面覆盖现代产业格局的每一个维度。',
    preface: '序言与导论',
    prefaceDesc: '为何理解行业至关重要，以及如何高效使用本指南。',
    part1: '第一篇 — 行业分析基础',
    part1Desc: '行业分类标准（GICS、NAICS）、五部门经济模型与企业解剖学。',
    part2: '第二篇 — 第一产业',
    part2Desc: '农业、林业、渔业、采矿业、石油天然气与自然资源。',
    part3: '第三篇 — 第二产业',
    part3Desc: '制造业、建筑业、房地产、能源与公用事业。',
    part4: '第四篇 — 第三产业',
    part4Desc: '零售、金融服务、医疗健康、交通运输、酒店与娱乐。',
    part5: '第五篇 — 第四产业',
    part5Desc: '科技、软件、电信、专业服务与教育研究。',
    part6: '第六篇 — 按类型划分的企业画像',
    part6Desc: '初创企业、中小企业、中型企业、大型跨国公司、国有企业与非营利组织。',
    part7: '第七篇 — 区域产业格局',
    part7Desc: '北美、欧洲、亚太地区与新兴前沿市场。',
    part8: '第八篇 — 未来趋势与新兴产业',
    part8Desc: '绿色经济、人工智能、航天、生物科技与前沿产业。',
  },
  sectors: {
    sectionLabel: '行业板块',
    title: '四大经济板块，构成完整图景',
    subtitle: '从原材料开采到知识经济——每一个主要行业板块的深度分析。',
    primary: {
      badge: '第二篇',
      title: '第一产业',
      desc: '所有经济活动的基础——自然资源的开采与收获。涵盖农业、林业、渔业、采矿业、石油天然气与稀土矿产。',
      chapters: ['第3章：农业、林业与渔业', '第4章：采矿业、石油天然气与自然资源'],
      trends: ['精准农业', '能源转型', '资源民族主义'],
    },
    secondary: {
      badge: '第三篇',
      title: '第二产业',
      desc: '制造业与建筑业将原材料转化为成品与建成环境。涵盖重工业与轻工业、建筑业、房地产、能源与公用事业。',
      chapters: ['第5章：制造业——重工业与轻工业', '第6章：建筑业与房地产', '第7章：能源与公用事业'],
      trends: ['工业4.0与自动化', '房产科技与绿色建筑', '脱碳化与智能电网'],
    },
    tertiary: {
      badge: '第四篇',
      title: '第三产业',
      desc: '连接生产者与消费者、提供基本社会基础设施的服务业。涵盖零售、金融、医疗、交通运输与酒店业。',
      chapters: ['第8章：零售与消费品', '第9章：金融服务与保险', '第10章：医疗健康与制药', '第11章：交通运输与物流', '第12章：酒店、旅游与娱乐'],
      trends: ['全渠道零售', '开放银行与金融科技', 'AI诊断与远程医疗'],
    },
    quaternary: {
      badge: '第五篇',
      title: '第四产业',
      desc: '知识经济——以信息、专业知识与智力资本为基础的产业。涵盖科技、软件、电信、专业服务与教育。',
      chapters: ['第13章：科技、软件与电信', '第14章：专业与商业服务', '第15章：教育与研究'],
      trends: ['人工智能与云计算', '数字化转型', '在线学习与教育科技'],
    },
  },
  company: {
    sectionLabel: '企业画像',
    title: '各类企业，全面解析',
    subtitle: '从车库创业公司到国有巨头——完整的企业组织分类体系。',
    startup: {
      title: '初创企业与中小企业',
      desc: '敏捷、创新、风险承受力强。涵盖自筹资金、天使投资、风险投资，以及从硅谷到新加坡的区域创业生态系统。',
      tags: ['自筹资金', '风险投资', '天使投资人', '精益运营'],
    },
    midmarket: {
      title: '中型企业',
      desc: '"隐形冠军"——稳定、专业化、具有增长雄心。涵盖融资结构、所有权模式，以及中型企业领导者的地理分布。',
      tags: ['私募股权', '专业化', '隐形冠军', '增长雄心'],
    },
    large: {
      title: '大型企业与跨国公司',
      desc: '规模、复杂性与全球影响力。涵盖公司治理、利益相关者管理、财富500强画像，以及跨国企业集团的运营动态。',
      tags: ['公司治理', '全球运营', '财富500强', '利益相关者管理'],
    },
    soe: {
      title: '国有企业与非营利组织',
      desc: '公共使命与问责制。涵盖能源、国防、医疗领域的国有企业，以及非营利组织在教育与社会服务中的角色。',
      tags: ['公共使命', '政府所有权', '社会使命', '问责制'],
    },
  },
  regions: {
    sectionLabel: '区域格局',
    title: '逐区解读世界经济',
    subtitle: '四大全球区域的主导产业、核心集群、监管环境与商业文化。',
    northAmerica: {
      title: '北美',
      desc: '创新与规模是北美经济的核心特征。硅谷、华尔街与全球最大消费市场的所在地。在科技、金融、医疗与国防领域占据主导地位。',
      highlight: '创新与规模',
    },
    europe: {
      title: '欧洲',
      desc: '传统、监管与可持续发展领导力。欧盟单一市场创造了独特的监管环境。在制造业、奢侈品、金融服务与绿色经济领域实力雄厚。',
      highlight: '传统与可持续',
    },
    asiaPacific: {
      title: '亚太地区',
      desc: '增长、制造与数字跨越式发展。中国、日本、韩国、印度与东盟代表着全球最具活力的经济区域——从工厂车间到前沿金融科技。',
      highlight: '增长与数字跨越',
    },
    emerging: {
      title: '中东、非洲与拉丁美洲',
      desc: '潜力巨大的新兴前沿市场。摆脱石油依赖的多元化进程、非洲大陆自由贸易区，以及拉丁美洲的金融科技革命正在重塑这些市场。',
      highlight: '新兴前沿市场',
    },
  },
  trends: {
    sectionLabel: '未来趋势',
    title: '重塑全球产业的核心力量',
    subtitle: '三大宏观趋势将定义下一个工业时代——以及引领变革的领军企业。',
    green: {
      title: '绿色经济',
      desc: '可再生能源、循环经济模式与ESG投资不再是小众议题——它们已成为新的工业主流。碳市场、绿色协议与净零目标正在重塑每一个行业。',
      points: ['可再生能源与储能', '循环经济模式', 'ESG投资与碳市场', '企业净零目标'],
    },
    ai: {
      title: '人工智能与新工业革命',
      desc: '人工智能不是单一产业——它是跨行业的力量倍增器。AI原生商业模式、劳动力转型，以及全新产业的涌现正在进行中。',
      points: ['AI原生商业模式', '跨行业自动化', '劳动力转型', '新兴AI颠覆者'],
    },
    frontier: {
      title: '航天、生物科技与前沿产业',
      desc: '商业航天经济、基因组学革命、量子计算与先进材料代表着下一波工业创造浪潮——这些产业在十年前尚不存在。',
      points: ['商业航天经济', '生物科技与基因组学', '量子计算', '先进材料'],
    },
  },
  about: {
    sectionLabel: '关于本书',
    title: '专为需要全局视野的专业人士而作',
    subtitle: '无论您是投资者、战略家、顾问还是学生——本指南为您提供所需的结构化智识。',
    desc: '《全球产业格局》旨在为所有需要了解现代经济组织方式、行业互动关系，以及最重要机遇与风险所在的人士提供全面参考。',
    feature1Title: '结构清晰，便于导航',
    feature1Desc: '八大篇章、26个章节与详尽附录——既可从头到尾通读，也可直接跳转至所需内容。',
    feature2Title: '双语版本',
    feature2Desc: '完整的英文与中文版本，确保在全球及中文市场运营的专业人士均可便捷获取。',
    feature3Title: '市场就绪的情报',
    feature3Desc: '企业画像、地理热点、关键趋势与财务指标——驱动真实商业决策的核心情报。',
    cta: '获取完整指南',
    ctaSecondary: '了解更多',
  },
  footer: {
    tagline: '行业与企业画像综合指南',
    copyright: '© 2025 全球产业格局。保留所有权利。',
    parts: '8大篇章',
    chapters: '26个章节',
    appendices: '4个附录',
  },
};

export const translations: Record<Language, Translation> = { en, zh };
