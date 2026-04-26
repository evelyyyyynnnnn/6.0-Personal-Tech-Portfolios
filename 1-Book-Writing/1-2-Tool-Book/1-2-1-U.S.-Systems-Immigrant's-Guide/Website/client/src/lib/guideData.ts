// ============================================================
// GUIDE DATA — Encyclopedia of U.S. Systems: An Immigrant's Guide
// Full bilingual content (EN + ZH) for all 8 chapters
// ============================================================

export interface SubSection {
  id: string;
  en: { title: string; content: string };
  zh: { title: string; content: string };
}

export interface Section {
  id: string;
  en: { title: string };
  zh: { title: string };
  subsections: SubSection[];
}

export interface Chapter {
  id: string;
  number: number;
  en: { title: string; subtitle: string };
  zh: { title: string; subtitle: string };
  sections: Section[];
}

export const chapters: Chapter[] = [
  {
    id: "ch1",
    number: 1,
    en: { title: "U.S. Law and Immigration System", subtitle: "Pathways, processes, and rights for immigrants" },
    zh: { title: "美国法律与移民体系", subtitle: "移民途径、申请流程与法律权利" },
    sections: [
      {
        id: "ch1-s1",
        en: { title: "1.1 Immigration Types and Pathways" },
        zh: { title: "1.1 移民类型与途径" },
        subsections: [
          {
            id: "ch1-s1-1",
            en: {
              title: "1.1.1 Employment-Based Immigration (EB-1, EB-2, EB-3, NIW)",
              content: `Employment-based immigration is one of the primary pathways for skilled foreign nationals to obtain permanent residence in the United States. The U.S. Citizenship and Immigration Services (USCIS) administers several preference categories:\n\n**EB-1 (First Preference)** is reserved for persons of extraordinary ability in sciences, arts, education, business, or athletics; outstanding professors and researchers; and certain multinational managers or executives. No labor certification (PERM) is required.\n\n**EB-2 (Second Preference)** covers professionals holding advanced degrees or persons of exceptional ability. A key sub-category is the **National Interest Waiver (NIW)**, which allows applicants to self-petition without employer sponsorship if their work is in the national interest of the United States.\n\n**EB-3 (Third Preference)** includes skilled workers (positions requiring at least two years of training), professionals (bachelor's degree or equivalent), and unskilled workers. Labor certification through the PERM process is generally required.\n\n**Key Forms:** I-140 (Immigrant Petition for Alien Workers), I-485 (Adjustment of Status), I-765 (Employment Authorization), I-131 (Travel Document), I-907 (Premium Processing).`,
            },
            zh: {
              title: "1.1.1 职业移民 (EB-1, EB-2, EB-3, NIW)",
              content: `职业移民是技术型外籍人士在美国获得永久居留权的主要途径之一。美国公民及移民服务局（USCIS）管理多个优先类别：\n\n**EB-1（第一优先）** 适用于在科学、艺术、教育、商业或体育领域具有杰出能力的人士；杰出教授和研究人员；以及特定跨国公司经理或高管。无需劳工证明（PERM）。\n\n**EB-2（第二优先）** 涵盖持有高级学位的专业人士或具有特殊能力的人士。其中重要的子类别是**国家利益豁免（NIW）**，允许申请人在无需雇主担保的情况下自行申请，前提是其工作符合美国国家利益。\n\n**EB-3（第三优先）** 包括技术工人（需要至少两年培训的职位）、专业人士（学士学位或同等学历）和非技术工人。通常需要通过PERM流程进行劳工认证。\n\n**关键表格：** I-140（外籍工人移民申请）、I-485（身份调整）、I-765（就业授权）、I-131（旅行证件）、I-907（加急处理）。`,
            },
          },
          {
            id: "ch1-s1-2",
            en: {
              title: "1.1.2 Family-Based Immigration",
              content: `Family-based immigration allows U.S. citizens and lawful permanent residents (LPRs) to sponsor certain family members for immigrant visas. There are two main categories:\n\n**Immediate Relatives of U.S. Citizens** — spouses, unmarried children under 21, and parents — are not subject to annual numerical limits and generally have shorter wait times.\n\n**Family Preference Categories** are subject to annual caps and include: F1 (unmarried adult children of U.S. citizens), F2A/F2B (spouses, children, and unmarried adult children of LPRs), F3 (married children of U.S. citizens), and F4 (siblings of U.S. citizens).\n\nWait times vary significantly by country of birth and preference category. The monthly **Visa Bulletin** published by the U.S. Department of State tracks priority dates and determines when a visa number becomes available.`,
            },
            zh: {
              title: "1.1.2 亲属移民",
              content: `亲属移民允许美国公民和合法永久居民（绿卡持有者）为特定家庭成员申请移民签证。主要分为两大类：\n\n**美国公民的直系亲属** — 配偶、21岁以下未婚子女和父母 — 不受年度数量限制，等待时间通常较短。\n\n**家庭优先类别** 受年度上限限制，包括：F1（美国公民的成年未婚子女）、F2A/F2B（绿卡持有者的配偶、子女和成年未婚子女）、F3（美国公民的已婚子女）和F4（美国公民的兄弟姐妹）。\n\n等待时间因出生国和优先类别不同而差异显著。美国国务院每月发布的**签证公告**追踪优先日期，确定签证号何时可用。`,
            },
          },
          {
            id: "ch1-s1-3",
            en: {
              title: "1.1.3 Other Immigration Categories",
              content: `Beyond employment and family pathways, the U.S. immigration system includes several other categories:\n\n**Diversity Visa (DV) Lottery** — The annual DV program makes up to 55,000 immigrant visas available to persons from countries with historically low rates of immigration to the United States.\n\n**Refugee and Asylum Status** — Individuals who have suffered persecution or have a well-founded fear of persecution based on race, religion, nationality, political opinion, or membership in a particular social group may qualify for refugee or asylum status.\n\n**Special Immigrant Visas** — These cover religious workers, certain broadcasters, employees of international organizations, and others.\n\n**Temporary Protected Status (TPS)** — Provides temporary protection from deportation to nationals of designated countries experiencing ongoing armed conflict, environmental disasters, or other extraordinary conditions.`,
            },
            zh: {
              title: "1.1.3 其他移民类别",
              content: `除职业和亲属移民途径外，美国移民体系还包括其他几个类别：\n\n**多元化签证（DV）抽签** — 年度DV项目向历史上移民美国比例较低的国家的人士提供最多55,000个移民签证。\n\n**难民和庇护身份** — 因种族、宗教、国籍、政治观点或特定社会群体成员身份而遭受迫害或有合理迫害恐惧的个人，可能有资格获得难民或庇护身份。\n\n**特殊移民签证** — 涵盖宗教工作者、特定广播人员、国际组织雇员等。\n\n**临时保护身份（TPS）** — 为来自因持续武装冲突、环境灾难或其他特殊情况而被指定国家的公民提供临时免遣返保护。`,
            },
          },
        ],
      },
      {
        id: "ch1-s2",
        en: { title: "1.2 Immigration Application Process" },
        zh: { title: "1.2 移民申请流程" },
        subsections: [
          {
            id: "ch1-s2-1",
            en: {
              title: "1.2.1 Application Forms and Documents",
              content: `Navigating USCIS forms is a critical skill for immigrants. Key forms include:\n\n**I-140** — Immigrant Petition for Alien Workers. Filed by an employer (or self-petitioned for NIW/EB-1A) to classify a foreign national under an employment-based preference category.\n\n**I-485** — Application to Register Permanent Residence or Adjust Status. Filed when a visa number is immediately available to change status to lawful permanent resident without leaving the U.S.\n\n**I-765** — Application for Employment Authorization Document (EAD). Allows certain non-citizens to work legally in the U.S. while their immigration case is pending.\n\n**I-131** — Application for Travel Document (Advance Parole). Allows individuals with pending I-485 to travel outside the U.S. without abandoning their application.\n\n**G-1145** — E-Notification of Application/Petition Acceptance. Requests email/text notification when USCIS accepts a filing.\n\n**I-907** — Request for Premium Processing Service. Pays an additional fee for USCIS to adjudicate a petition within 15 business days.`,
            },
            zh: {
              title: "1.2.1 申请表格与材料",
              content: `熟悉USCIS表格是移民的关键技能。主要表格包括：\n\n**I-140** — 外籍工人移民申请。由雇主提交（或NIW/EB-1A自行申请），将外籍人士归类于职业移民优先类别。\n\n**I-485** — 申请登记永久居留或调整身份。当签证号立即可用时提交，无需离开美国即可将身份调整为合法永久居民。\n\n**I-765** — 就业授权文件（EAD）申请。允许特定非公民在移民案件待决期间在美国合法工作。\n\n**I-131** — 旅行证件申请（预先假释）。允许I-485待决的个人出境美国而不放弃申请。\n\n**G-1145** — 申请/请愿接受的电子通知。请求USCIS接受申请时发送电子邮件/短信通知。\n\n**I-907** — 加急处理服务申请。支付额外费用，USCIS将在15个工作日内裁定请愿。`,
            },
          },
          {
            id: "ch1-s2-2",
            en: {
              title: "1.2.2 Application Status Inquiry and Adjustment",
              content: `After filing, applicants can track their case status through multiple channels:\n\n**USCIS Online Case Status** — Visit uscis.gov and enter your receipt number (e.g., EAC, WAC, LIN, SRC, NBC, MSC, IOE followed by 10 digits) to check current status.\n\n**USCIS Contact Center** — Call 1-800-375-5283 for case-specific inquiries. Have your receipt number ready.\n\n**InfoPass / USCIS Appointments** — For in-person inquiries at a local USCIS field office, schedule an appointment through the online system.\n\n**Case Status Updates:** Common statuses include "Case Received," "Case Is Being Actively Reviewed," "Request for Evidence" (RFE), "Interview Scheduled," "Case Approved," and "Card Was Mailed."\n\n**Priority Date Tracking** — Monitor the monthly Visa Bulletin to understand when your priority date becomes current, which determines when you can file I-485 or proceed with consular processing.`,
            },
            zh: {
              title: "1.2.2 申请状态查询与调整",
              content: `提交申请后，申请人可通过多种渠道追踪案件状态：\n\n**USCIS在线案件状态** — 访问uscis.gov，输入收据号（如EAC、WAC、LIN、SRC、NBC、MSC、IOE后跟10位数字）查看当前状态。\n\n**USCIS联系中心** — 拨打1-800-375-5283进行案件咨询，请准备好收据号。\n\n**InfoPass / USCIS预约** — 如需在当地USCIS现场办公室进行面对面咨询，请通过在线系统预约。\n\n**案件状态更新：** 常见状态包括"案件已收到"、"案件正在积极审查"、"证据请求"（RFE）、"面试已安排"、"案件已批准"和"卡片已邮寄"。\n\n**优先日期追踪** — 监控每月签证公告，了解优先日期何时到期，这决定了何时可以提交I-485或进行领事处理。`,
            },
          },
          {
            id: "ch1-s2-3",
            en: {
              title: "1.2.3 Green Card and Citizenship",
              content: `**Green Card (Lawful Permanent Residence)** grants the right to live and work permanently in the United States. Green cards are typically valid for 10 years (permanent residents) or 2 years (conditional residents) and must be renewed.\n\n**Naturalization** is the process by which a lawful permanent resident becomes a U.S. citizen. General requirements include:\n- Continuous residence for 5 years (3 years if married to a U.S. citizen)\n- Physical presence for at least 30 months out of the past 5 years\n- Good moral character\n- English language proficiency\n- Knowledge of U.S. history and government (civics test)\n\n**Form N-400** — Application for Naturalization. After approval, applicants attend a naturalization ceremony and take the Oath of Allegiance.\n\n**Dual Citizenship** — The U.S. does not formally recognize dual citizenship but does not require citizens to renounce other nationalities.`,
            },
            zh: {
              title: "1.2.3 绿卡与公民身份",
              content: `**绿卡（合法永久居留权）** 赋予在美国永久生活和工作的权利。绿卡通常有效期为10年（永久居民）或2年（有条件居民），需要续签。\n\n**入籍** 是合法永久居民成为美国公民的过程。一般要求包括：\n- 连续居住5年（与美国公民结婚则为3年）\n- 过去5年内在美国实际居住至少30个月\n- 良好的道德品质\n- 英语语言能力\n- 了解美国历史和政府（公民知识测试）\n\n**N-400表格** — 入籍申请。批准后，申请人参加入籍仪式并宣誓效忠。\n\n**双重国籍** — 美国不正式承认双重国籍，但也不要求公民放弃其他国籍。`,
            },
          },
        ],
      },
      {
        id: "ch1-s3",
        en: { title: "1.3 Legal Rights and Obligations" },
        zh: { title: "1.3 法律权利与义务" },
        subsections: [
          {
            id: "ch1-s3-1",
            en: {
              title: "1.3.1 Constitutional Rights",
              content: `Immigrants in the United States — regardless of status — are protected by many constitutional rights:\n\n**Due Process (5th & 14th Amendments)** — No person shall be deprived of life, liberty, or property without due process of law. This applies to all persons, not just citizens.\n\n**Equal Protection (14th Amendment)** — All persons within U.S. jurisdiction are entitled to equal protection under the law.\n\n**4th Amendment** — Protection against unreasonable searches and seizures. You have the right to refuse a search without a warrant.\n\n**5th Amendment** — The right to remain silent and not incriminate yourself. You are not required to answer questions from law enforcement or immigration officers.\n\n**6th Amendment** — The right to an attorney in criminal proceedings. Note: in immigration proceedings (civil), there is no government-appointed attorney, but you may hire one.\n\n**1st Amendment** — Freedom of speech, religion, press, and assembly applies to all persons in the U.S.`,
            },
            zh: {
              title: "1.3.1 宪法权利",
              content: `在美国的移民 — 无论身份如何 — 都受到许多宪法权利的保护：\n\n**正当程序（第5条和第14条修正案）** — 任何人不得在未经正当法律程序的情况下被剥夺生命、自由或财产。这适用于所有人，而不仅仅是公民。\n\n**平等保护（第14条修正案）** — 美国司法管辖范围内的所有人都有权获得法律的平等保护。\n\n**第4条修正案** — 保护免受无理搜查和扣押。您有权在没有搜查令的情况下拒绝搜查。\n\n**第5条修正案** — 保持沉默、不自证其罪的权利。您无需回答执法人员或移民官员的问题。\n\n**第6条修正案** — 在刑事诉讼中获得律师帮助的权利。注意：在移民诉讼（民事）中，没有政府指定律师，但您可以自行聘请。\n\n**第1条修正案** — 言论自由、宗教自由、新闻自由和集会自由适用于美国境内所有人。`,
            },
          },
          {
            id: "ch1-s3-2",
            en: {
              title: "1.3.2 Legal Aid and Consultation",
              content: `Access to legal assistance is crucial for navigating the U.S. legal system:\n\n**Immigration Attorneys** — Licensed attorneys specializing in immigration law can provide advice, prepare applications, and represent clients in immigration court. The American Immigration Lawyers Association (AILA) maintains a directory at aila.org.\n\n**Accredited Representatives** — Non-attorneys recognized by the Board of Immigration Appeals (BIA) to provide immigration legal services, often through non-profit organizations.\n\n**Legal Aid Organizations** — Many non-profit organizations provide free or low-cost legal services to low-income immigrants. Examples include the International Rescue Committee (IRC), Catholic Charities, and local legal aid societies.\n\n**Law School Clinics** — Many law schools operate immigration clinics where supervised law students provide free legal assistance.\n\n**Warning: Notario Fraud** — In Latin American countries, "notarios" are licensed legal professionals. In the U.S., this title has no legal meaning. Beware of non-attorneys who claim to provide immigration legal services — this is illegal and can result in serious harm to your case.`,
            },
            zh: {
              title: "1.3.2 法律援助与咨询",
              content: `获得法律援助对于应对美国法律体系至关重要：\n\n**移民律师** — 专门从事移民法的持牌律师可以提供建议、准备申请材料，并在移民法庭代理客户。美国移民律师协会（AILA）在aila.org维护律师目录。\n\n**认可代表** — 经移民上诉委员会（BIA）认可的非律师人员，可提供移民法律服务，通常通过非营利组织提供。\n\n**法律援助组织** — 许多非营利组织为低收入移民提供免费或低成本法律服务，例如国际救援委员会（IRC）、天主教慈善机构和当地法律援助协会。\n\n**法学院诊所** — 许多法学院开设移民诊所，由受监督的法学生提供免费法律援助。\n\n**警告：公证人欺诈** — 在拉丁美洲国家，"notarios"是持牌法律专业人士。在美国，这个头衔没有法律意义。警惕声称提供移民法律服务的非律师人员 — 这是违法的，可能对您的案件造成严重损害。`,
            },
          },
          {
            id: "ch1-s3-3",
            en: {
              title: "1.3.3 Crime and Legal Consequences",
              content: `Criminal convictions can have severe immigration consequences, including deportation (removal), inadmissibility, and bars to naturalization:\n\n**Aggravated Felonies** — A broad category under immigration law that includes murder, rape, drug trafficking, firearms offenses, fraud over $10,000, and many others. Conviction generally results in mandatory removal and permanent bar to re-entry.\n\n**Crimes Involving Moral Turpitude (CIMT)** — Crimes reflecting dishonesty or base conduct. Even a single CIMT conviction can make a non-citizen removable or inadmissible.\n\n**Drug Offenses** — Any drug conviction (except a single offense of simple possession of 30g or less of marijuana) can result in permanent inadmissibility.\n\n**Domestic Violence** — Convictions for domestic violence, stalking, or violation of protective orders can result in removal.\n\n**Key Advice:** Always consult an immigration attorney before pleading guilty to any criminal charge, even a misdemeanor. What seems like a minor offense can have life-altering immigration consequences.`,
            },
            zh: {
              title: "1.3.3 犯罪与法律后果",
              content: `刑事定罪可能产生严重的移民后果，包括驱逐出境（遣返）、不可入境和入籍障碍：\n\n**加重重罪** — 移民法下的广泛类别，包括谋杀、强奸、毒品走私、枪支犯罪、超过10,000美元的欺诈等。定罪通常导致强制遣返和永久禁止再入境。\n\n**涉及道德败坏的犯罪（CIMT）** — 反映不诚实或卑劣行为的犯罪。即使是单次CIMT定罪也可能使非公民面临可被驱逐或不可入境的风险。\n\n**毒品犯罪** — 任何毒品定罪（除单次持有30克或以下大麻外）都可能导致永久不可入境。\n\n**家庭暴力** — 家庭暴力、跟踪或违反保护令的定罪可能导致被遣返。\n\n**重要建议：** 在对任何刑事指控认罪之前，务必咨询移民律师，即使是轻罪。看似轻微的违法行为可能产生改变人生的移民后果。`,
            },
          },
        ],
      },
    ],
  },
  {
    id: "ch2",
    number: 2,
    en: { title: "U.S. Employment and Labor System", subtitle: "Job market, contracts, wages, and benefits" },
    zh: { title: "美国就业与劳工制度", subtitle: "就业市场、劳动合同、薪资与福利" },
    sections: [
      {
        id: "ch2-s1",
        en: { title: "2.1 Job Market and Job Search" },
        zh: { title: "2.1 就业市场与求职" },
        subsections: [
          {
            id: "ch2-s1-1",
            en: {
              title: "2.1.1 Industry Overview and Trends",
              content: `The U.S. labor market is the world's largest, with diverse opportunities across sectors:\n\n**Technology** — Silicon Valley, Seattle, Austin, and New York lead in software engineering, data science, AI/ML, and cybersecurity. Major employers include Google, Amazon, Microsoft, Apple, and Meta.\n\n**Healthcare** — One of the fastest-growing sectors, driven by an aging population. Roles range from physicians and nurses to healthcare administrators and medical coders.\n\n**Finance** — New York City is the global financial hub. Roles include investment banking, asset management, accounting, and fintech.\n\n**Manufacturing & Engineering** — Strong in the Midwest and Southeast. Aerospace, automotive, and advanced manufacturing offer stable careers.\n\n**Education** — K-12 teachers, university professors, and education administrators are in demand, particularly in STEM fields.\n\n**Current Trends:** Remote and hybrid work have expanded geographic flexibility. AI is transforming many industries. Green energy and sustainability roles are growing rapidly.`,
            },
            zh: {
              title: "2.1.1 行业概况与趋势",
              content: `美国劳动力市场是全球最大的，各行业机会多样：\n\n**科技** — 硅谷、西雅图、奥斯汀和纽约在软件工程、数据科学、人工智能/机器学习和网络安全领域处于领先地位。主要雇主包括谷歌、亚马逊、微软、苹果和Meta。\n\n**医疗保健** — 受老龄化人口驱动，增长最快的行业之一。职位涵盖医生、护士到医疗管理员和医疗编码员。\n\n**金融** — 纽约市是全球金融中心。职位包括投资银行、资产管理、会计和金融科技。\n\n**制造业与工程** — 在中西部和东南部实力强劲。航空航天、汽车和先进制造业提供稳定的职业机会。\n\n**教育** — K-12教师、大学教授和教育管理员需求旺盛，尤其是STEM领域。\n\n**当前趋势：** 远程和混合工作扩大了地理灵活性。人工智能正在改变许多行业。绿色能源和可持续发展职位快速增长。`,
            },
          },
          {
            id: "ch2-s1-2",
            en: {
              title: "2.1.2 Job Search Channels and Techniques",
              content: `Effective job searching in the U.S. requires a multi-channel approach:\n\n**Online Job Boards:** LinkedIn is the dominant professional network and job board. Indeed aggregates listings from across the web. Glassdoor provides salary data and company reviews. Specialized boards include Dice (tech), Idealist (non-profit), and USAJobs (federal government).\n\n**Networking:** Studies consistently show that 70-80% of jobs are filled through networking. Attend industry conferences, professional association meetings, and alumni events. Informational interviews are a powerful tool.\n\n**Company Websites:** Apply directly through company career pages, especially for large employers who post positions exclusively there.\n\n**Recruiters and Staffing Agencies:** Technical recruiters (headhunters) can be valuable, especially in tech and finance. Staffing agencies like Robert Half and Adecco place candidates in temporary and permanent roles.\n\n**Work Authorization:** Ensure you have proper work authorization (EAD, H-1B, OPT, etc.) before applying. Many employers require sponsorship disclosure upfront.`,
            },
            zh: {
              title: "2.1.2 求职渠道与技巧",
              content: `在美国有效求职需要多渠道方法：\n\n**在线招聘平台：** LinkedIn是主要的专业社交网络和招聘平台。Indeed汇聚全网职位信息。Glassdoor提供薪资数据和公司评价。专业平台包括Dice（科技）、Idealist（非营利）和USAJobs（联邦政府）。\n\n**人脉网络：** 研究一致表明，70-80%的职位通过人脉关系填补。参加行业会议、专业协会会议和校友活动。信息性面试是强有力的工具。\n\n**公司官网：** 直接通过公司招聘页面申请，尤其是大型雇主，他们可能在那里独家发布职位。\n\n**猎头和人才中介：** 技术猎头在科技和金融领域尤其有价值。Robert Half和Adecco等人才中介为候选人提供临时和永久职位。\n\n**工作授权：** 申请前确保您有适当的工作授权（EAD、H-1B、OPT等）。许多雇主要求提前披露签证担保需求。`,
            },
          },
          {
            id: "ch2-s1-3",
            en: {
              title: "2.1.3 Resume and Interview Preparation",
              content: `**U.S. Resume Standards:**\n- Length: 1 page for under 10 years of experience; 2 pages maximum\n- No photo, age, marital status, or national origin (anti-discrimination norms)\n- Reverse chronological format is standard\n- Quantify achievements: "Increased sales by 35%" rather than "Improved sales"\n- Tailor your resume to each job description using keywords from the posting\n- Use action verbs: led, developed, implemented, optimized, managed\n\n**Cover Letter:** A concise (3-4 paragraph) letter expressing interest and connecting your experience to the role. Increasingly optional but still valued.\n\n**Interview Types:**\n- **Phone Screen:** 15-30 minute initial screening with HR\n- **Technical Interview:** Coding challenges (LeetCode-style for software roles), case studies (consulting), or skills assessments\n- **Behavioral Interview:** STAR method (Situation, Task, Action, Result) for questions like "Tell me about a time when..."\n- **Panel Interview:** Multiple interviewers simultaneously\n- **Offer Negotiation:** Salary negotiation is expected. Research market rates on Glassdoor, Levels.fyi, and LinkedIn Salary.`,
            },
            zh: {
              title: "2.1.3 简历与面试准备",
              content: `**美国简历标准：**\n- 长度：工作经验不足10年为1页；最多2页\n- 不附照片、年龄、婚姻状况或国籍（反歧视规范）\n- 标准采用倒序时间格式\n- 量化成就："销售额提升35%"而非"改善了销售"\n- 针对每个职位描述使用招聘信息中的关键词定制简历\n- 使用行动动词：领导、开发、实施、优化、管理\n\n**求职信：** 简洁（3-4段）的信件，表达兴趣并将您的经验与职位联系起来。越来越可选，但仍受重视。\n\n**面试类型：**\n- **电话筛选：** 与HR进行15-30分钟的初步筛选\n- **技术面试：** 编程挑战（软件职位的LeetCode风格）、案例研究（咨询）或技能评估\n- **行为面试：** STAR方法（情境、任务、行动、结果）用于"请讲述一次..."类问题\n- **小组面试：** 多位面试官同时在场\n- **薪资谈判：** 薪资谈判是预期的。在Glassdoor、Levels.fyi和LinkedIn薪资上研究市场薪资。`,
            },
          },
        ],
      },
      {
        id: "ch2-s2",
        en: { title: "2.2 Employment Contracts and Rights" },
        zh: { title: "2.2 劳动合同与权益" },
        subsections: [
          {
            id: "ch2-s2-1",
            en: {
              title: "2.2.1 Employment Types and Contracts",
              content: `**At-Will Employment** — The default in most U.S. states. Either the employer or employee can terminate the employment relationship at any time, for any reason (or no reason), with or without notice, as long as the reason is not illegal (e.g., discrimination).\n\n**Employment Contract** — A written agreement specifying terms of employment including salary, benefits, job duties, duration, and termination conditions. More common for executives and specialized professionals.\n\n**W-2 Employee** — A traditional employee whose employer withholds taxes and provides benefits. The employer pays half of Social Security and Medicare taxes.\n\n**1099 Independent Contractor** — Self-employed individuals who provide services to clients. Responsible for paying all self-employment taxes (15.3%). No employer-provided benefits. Greater flexibility but less security.\n\n**Non-Compete Agreements** — Clauses restricting employees from working for competitors after leaving. Enforceability varies significantly by state; California generally does not enforce them.`,
            },
            zh: {
              title: "2.2.1 雇佣类型与合同",
              content: `**随意雇佣** — 大多数美国州的默认规则。雇主或雇员可以随时以任何理由（或无理由）终止雇佣关系，有无通知均可，只要原因不违法（如歧视）。\n\n**雇佣合同** — 规定雇佣条款的书面协议，包括薪资、福利、工作职责、期限和终止条件。在高管和专业人士中更为常见。\n\n**W-2雇员** — 传统雇员，雇主代扣税款并提供福利。雇主支付一半的社会保障和医疗保险税。\n\n**1099独立承包商** — 向客户提供服务的自雇人士。负责缴纳全部自雇税（15.3%）。无雇主提供的福利。灵活性更大但安全性较低。\n\n**竞业禁止协议** — 限制员工离职后为竞争对手工作的条款。可执行性因州而异；加利福尼亚州通常不执行此类协议。`,
            },
          },
          {
            id: "ch2-s2-2",
            en: {
              title: "2.2.2 Minimum Wage and Working Hours",
              content: `**Federal Minimum Wage** — $7.25 per hour (unchanged since 2009). Many states and cities have set higher minimums.\n\n**State Minimums (Selected):**\n- California: $16.00/hour (2024)\n- New York: $16.00/hour (NYC metro)\n- Washington: $16.28/hour\n- Texas: $7.25/hour (federal minimum)\n\n**Overtime (FLSA)** — The Fair Labor Standards Act requires non-exempt employees to receive 1.5x their regular rate for hours worked over 40 in a workweek. Many salaried workers earning above $684/week are classified as exempt.\n\n**Meal and Rest Breaks** — Federal law does not require meal breaks, but most states mandate a 30-minute unpaid meal break for shifts over 5-6 hours. Short rest breaks (5-20 minutes) must be paid.\n\n**FMLA** — The Family and Medical Leave Act provides eligible employees up to 12 weeks of unpaid, job-protected leave per year for qualifying family and medical reasons.`,
            },
            zh: {
              title: "2.2.2 最低工资与工时",
              content: `**联邦最低工资** — 每小时7.25美元（自2009年起未变）。许多州和城市设定了更高的最低工资。\n\n**部分州最低工资：**\n- 加利福尼亚州：每小时16.00美元（2024年）\n- 纽约州：每小时16.00美元（纽约市都会区）\n- 华盛顿州：每小时16.28美元\n- 德克萨斯州：每小时7.25美元（联邦最低工资）\n\n**加班（FLSA）** — 《公平劳动标准法》要求非豁免雇员在一周工作超过40小时的部分获得1.5倍正常工资。许多每周收入超过684美元的受薪工人被归类为豁免。\n\n**餐饮和休息时间** — 联邦法律不要求餐饮休息，但大多数州规定轮班超过5-6小时须有30分钟无薪餐饮休息。短暂休息（5-20分钟）必须付薪。\n\n**FMLA** — 《家庭和医疗休假法》为符合条件的雇员提供每年最多12周的无薪、受保护的假期，用于符合条件的家庭和医疗原因。`,
            },
          },
          {
            id: "ch2-s2-3",
            en: {
              title: "2.2.3 Anti-Discrimination and Workplace Safety",
              content: `**Federal Anti-Discrimination Laws:**\n- **Title VII (Civil Rights Act)** — Prohibits discrimination based on race, color, religion, sex, or national origin\n- **Age Discrimination in Employment Act (ADEA)** — Protects workers 40 and older\n- **Americans with Disabilities Act (ADA)** — Prohibits discrimination against qualified individuals with disabilities\n- **Equal Pay Act** — Requires equal pay for equal work regardless of sex\n\n**EEOC** — The Equal Employment Opportunity Commission enforces federal anti-discrimination laws. File a charge at eeoc.gov within 180-300 days of the discriminatory act.\n\n**Workplace Safety (OSHA)** — The Occupational Safety and Health Administration sets and enforces safety standards. Employees have the right to a safe workplace, to report hazards, and to refuse dangerous work. File complaints at osha.gov.\n\n**Harassment** — Sexual harassment and hostile work environment claims are actionable under Title VII. Document incidents, report to HR, and consult an employment attorney if needed.`,
            },
            zh: {
              title: "2.2.3 反歧视与工作场所安全",
              content: `**联邦反歧视法律：**\n- **第七章（民权法案）** — 禁止基于种族、肤色、宗教、性别或国籍的歧视\n- **就业年龄歧视法（ADEA）** — 保护40岁及以上的工人\n- **美国残疾人法（ADA）** — 禁止歧视有资格的残疾人\n- **同工同酬法** — 要求无论性别，同等工作获得同等报酬\n\n**EEOC** — 平等就业机会委员会执行联邦反歧视法律。在歧视行为发生后180-300天内在eeoc.gov提交投诉。\n\n**工作场所安全（OSHA）** — 职业安全与健康管理局制定并执行安全标准。雇员有权享有安全的工作场所，举报危险，并拒绝危险工作。在osha.gov提交投诉。\n\n**骚扰** — 性骚扰和敌对工作环境索赔依据第七章可提起诉讼。记录事件，向HR报告，必要时咨询劳动律师。`,
            },
          },
        ],
      },
      {
        id: "ch2-s3",
        en: { title: "2.3 Salary and Benefits" },
        zh: { title: "2.3 薪资与福利" },
        subsections: [
          {
            id: "ch2-s3-1",
            en: {
              title: "2.3.1 Salary Structure and Calculation",
              content: `Understanding your compensation package is essential:\n\n**Base Salary** — Fixed annual or hourly compensation. Negotiated at hire and during performance reviews.\n\n**Gross vs. Net Pay** — Gross pay is your total earnings before deductions. Net pay (take-home pay) is after federal/state income tax withholding, Social Security (6.2%), Medicare (1.45%), and benefit premiums are deducted.\n\n**Pay Stub Components:** Gross wages, federal income tax withheld, state income tax withheld, Social Security tax, Medicare tax, health insurance premium, 401(k) contribution, and net pay.\n\n**Bonus Structures:** Sign-on bonus (one-time at hire), annual performance bonus (percentage of base salary), spot bonus (ad hoc recognition), and equity compensation (RSUs, stock options).\n\n**Total Compensation** — Always evaluate the full package: base salary + bonus + equity + benefits (health insurance, 401k match, PTO) + perks (remote work, gym, meals).`,
            },
            zh: {
              title: "2.3.1 薪资结构与计算",
              content: `了解您的薪酬待遇至关重要：\n\n**基本工资** — 固定的年薪或时薪。在入职和绩效评估时协商。\n\n**税前与税后工资** — 税前工资是扣除前的总收入。税后工资（实得工资）是扣除联邦/州所得税预扣、社会保障税（6.2%）、医疗保险税（1.45%）和福利保费后的金额。\n\n**工资单组成部分：** 总工资、联邦所得税预扣、州所得税预扣、社会保障税、医疗保险税、医疗保险费、401(k)缴款和净工资。\n\n**奖金结构：** 入职奖金（入职时一次性）、年度绩效奖金（基本工资的百分比）、即时奖金（临时认可）和股权薪酬（RSU、股票期权）。\n\n**总薪酬** — 始终评估完整待遇：基本工资+奖金+股权+福利（医疗保险、401k匹配、带薪假期）+额外福利（远程工作、健身房、餐饮）。`,
            },
          },
          {
            id: "ch2-s3-2",
            en: {
              title: "2.3.2 Health Insurance (1095-A, 1095-B, 1095-C, HSA, FSA)",
              content: `Health insurance is a critical benefit in the U.S., where medical costs can be extremely high:\n\n**Employer-Sponsored Insurance** — Most full-time employees receive health insurance through their employer. The employer typically pays 70-80% of the premium.\n\n**Plan Types:**\n- **HMO (Health Maintenance Organization)** — Requires a primary care physician (PCP) and referrals for specialists. Lower premiums, limited network.\n- **PPO (Preferred Provider Organization)** — More flexibility to see specialists without referrals. Higher premiums, broader network.\n- **HDHP (High-Deductible Health Plan)** — Lower premiums, higher deductibles. Pairs with HSA.\n\n**HSA (Health Savings Account)** — Tax-advantaged account for medical expenses paired with an HDHP. Contributions are pre-tax, grow tax-free, and withdrawals for qualified medical expenses are tax-free. 2024 limits: $4,150 (individual), $8,300 (family).\n\n**FSA (Flexible Spending Account)** — Pre-tax account for medical or dependent care expenses. "Use it or lose it" — funds generally must be used within the plan year.\n\n**Tax Forms:** 1095-A (Marketplace coverage), 1095-B (other coverage), 1095-C (employer-sponsored coverage). Used to verify coverage when filing taxes.`,
            },
            zh: {
              title: "2.3.2 医疗保险 (1095-A, 1095-B, 1095-C, HSA, FSA)",
              content: `在医疗费用极高的美国，医疗保险是一项关键福利：\n\n**雇主提供的保险** — 大多数全职雇员通过雇主获得医疗保险。雇主通常支付70-80%的保费。\n\n**保险计划类型：**\n- **HMO（健康维护组织）** — 需要初级保健医生（PCP）和专科医生转诊。保费较低，网络有限。\n- **PPO（优选提供者组织）** — 无需转诊即可灵活就诊专科医生。保费较高，网络更广。\n- **HDHP（高免赔额健康计划）** — 保费较低，免赔额较高。与HSA配合使用。\n\n**HSA（健康储蓄账户）** — 与HDHP配合使用的医疗费用税收优惠账户。缴款税前扣除，免税增长，合格医疗费用提款免税。2024年限额：4,150美元（个人），8,300美元（家庭）。\n\n**FSA（弹性支出账户）** — 用于医疗或家属护理费用的税前账户。"用完或失去" — 资金通常必须在计划年度内使用。\n\n**税务表格：** 1095-A（市场保险）、1095-B（其他保险）、1095-C（雇主提供的保险）。报税时用于核实保险覆盖情况。`,
            },
          },
          {
            id: "ch2-s3-3",
            en: {
              title: "2.3.3 Retirement Plans (401K, Roth IRA)",
              content: `Building retirement savings is essential in the U.S., where Social Security alone is insufficient:\n\n**401(k) Plan** — Employer-sponsored retirement savings plan. Contributions are pre-tax (traditional) or post-tax (Roth). 2024 contribution limit: $23,000 ($30,500 if 50+). Many employers match contributions (e.g., 50% of contributions up to 6% of salary) — always contribute enough to get the full match (free money).\n\n**Traditional IRA** — Individual Retirement Account with pre-tax contributions (if eligible). 2024 limit: $7,000 ($8,000 if 50+). Contributions may be tax-deductible depending on income and workplace plan coverage.\n\n**Roth IRA** — Contributions are post-tax, but qualified withdrawals in retirement are completely tax-free. 2024 income limits: phase out at $146,000-$161,000 (single), $230,000-$240,000 (married filing jointly).\n\n**Vesting** — Employer 401(k) match contributions may be subject to a vesting schedule (e.g., cliff vesting after 3 years, or graded vesting over 6 years). Leaving before fully vested means forfeiting unvested employer contributions.`,
            },
            zh: {
              title: "2.3.3 退休计划 (401K, Roth IRA)",
              content: `在仅靠社会保障不足以维持生活的美国，积累退休储蓄至关重要：\n\n**401(k)计划** — 雇主提供的退休储蓄计划。缴款可税前（传统型）或税后（罗斯型）。2024年缴款上限：23,000美元（50岁以上为30,500美元）。许多雇主提供匹配缴款（例如，匹配薪资6%以内缴款的50%）— 务必缴纳足够金额以获得全额匹配（免费资金）。\n\n**传统IRA** — 税前缴款的个人退休账户（如符合条件）。2024年限额：7,000美元（50岁以上为8,000美元）。根据收入和工作场所计划覆盖情况，缴款可能可以税前扣除。\n\n**罗斯IRA** — 税后缴款，但退休时的合格提款完全免税。2024年收入限制：单身146,000-161,000美元逐步取消，已婚联合申报230,000-240,000美元逐步取消。\n\n**归属** — 雇主401(k)匹配缴款可能受归属时间表约束（例如，3年后悬崖式归属，或6年内逐步归属）。在完全归属前离职意味着放弃未归属的雇主缴款。`,
            },
          },
          {
            id: "ch2-s3-4",
            en: {
              title: "2.3.4 Other Employee Benefits (ESPP, Dental, Vision, Gym, Discounts)",
              content: `Beyond health insurance and retirement, U.S. employers offer various additional benefits:\n\n**ESPP (Employee Stock Purchase Plan)** — Allows employees to purchase company stock at a discount (typically 15%) through payroll deductions. Shares are purchased at the end of each offering period at the lower of the beginning or ending price minus the discount.\n\n**Dental Insurance** — Covers preventive care (cleanings, X-rays), basic restorative care (fillings), and major restorative care (crowns, root canals) at different coverage levels (100%/80%/50%).\n\n**Vision Insurance** — Covers eye exams and provides allowances for glasses or contact lenses. Typically low-cost and high-value.\n\n**Life Insurance** — Many employers provide basic life insurance (1-2x annual salary) at no cost. Supplemental coverage can be purchased.\n\n**PTO (Paid Time Off)** — Vacation, sick leave, and personal days. The U.S. has no federal mandate for paid vacation. Average is 10-15 days/year for new employees.\n\n**Other Perks:** Commuter benefits (pre-tax transit/parking), gym membership subsidies, employee discounts, tuition reimbursement, and childcare assistance.`,
            },
            zh: {
              title: "2.3.4 其他员工福利 (ESPP, 牙科、眼科、健身、折扣)",
              content: `除医疗保险和退休计划外，美国雇主还提供各种额外福利：\n\n**ESPP（员工股票购买计划）** — 允许员工通过工资扣除以折扣价（通常为15%）购买公司股票。股票在每个发行期结束时以期初或期末价格中较低者减去折扣后购买。\n\n**牙科保险** — 以不同覆盖比例（100%/80%/50%）覆盖预防性护理（洁牙、X光）、基础修复护理（补牙）和主要修复护理（牙冠、根管治疗）。\n\n**眼科保险** — 覆盖眼科检查并提供眼镜或隐形眼镜的补贴。通常费用低廉且价值高。\n\n**人寿保险** — 许多雇主免费提供基本人寿保险（年薪的1-2倍）。可以购买补充保险。\n\n**PTO（带薪休假）** — 假期、病假和个人假。美国没有联邦强制带薪假期规定。新员工平均每年10-15天。\n\n**其他福利：** 通勤福利（税前交通/停车）、健身房会员补贴、员工折扣、学费报销和儿童保育援助。`,
            },
          },
        ],
      },
    ],
  },
  {
    id: "ch3",
    number: 3,
    en: { title: "U.S. Tax System", subtitle: "Federal and state taxes, filing process, and tax planning" },
    zh: { title: "美国税务制度", subtitle: "联邦税与州税、报税流程与税务规划" },
    sections: [
      {
        id: "ch3-s1",
        en: { title: "3.1 Federal and State Taxes" },
        zh: { title: "3.1 联邦税与州税" },
        subsections: [
          {
            id: "ch3-s1-1",
            en: {
              title: "3.1.1 Federal Income Tax",
              content: `The U.S. federal income tax system is progressive — higher income is taxed at higher rates. For 2024:\n\n**Tax Brackets (Single Filers):**\n- 10%: $0 – $11,600\n- 12%: $11,601 – $47,150\n- 22%: $47,151 – $100,525\n- 24%: $100,526 – $191,950\n- 32%: $191,951 – $243,725\n- 35%: $243,726 – $609,350\n- 37%: Over $609,350\n\n**Marginal vs. Effective Rate** — The marginal rate is the rate on your last dollar of income. The effective rate is your total tax divided by total income, always lower than the marginal rate.\n\n**Standard Deduction (2024):** $14,600 (single), $29,200 (married filing jointly), $21,900 (head of household).\n\n**Resident Alien Tax Status** — Immigrants who pass the Substantial Presence Test are taxed as U.S. residents on worldwide income. Non-resident aliens are taxed only on U.S.-source income.`,
            },
            zh: {
              title: "3.1.1 联邦所得税",
              content: `美国联邦所得税制度是累进制的 — 收入越高，税率越高。2024年：\n\n**税率档次（单身申报）：**\n- 10%：0 – 11,600美元\n- 12%：11,601 – 47,150美元\n- 22%：47,151 – 100,525美元\n- 24%：100,526 – 191,950美元\n- 32%：191,951 – 243,725美元\n- 35%：243,726 – 609,350美元\n- 37%：超过609,350美元\n\n**边际税率与有效税率** — 边际税率是最后一美元收入的税率。有效税率是总税额除以总收入，始终低于边际税率。\n\n**标准扣除额（2024年）：** 14,600美元（单身），29,200美元（已婚联合申报），21,900美元（户主）。\n\n**居民外籍人士税务身份** — 通过实质存在测试的移民作为美国居民对全球收入征税。非居民外籍人士仅对美国来源收入征税。`,
            },
          },
          {
            id: "ch3-s1-2",
            en: {
              title: "3.1.2 State Income Tax and Local Taxes",
              content: `State income taxes vary widely across the U.S.:\n\n**No State Income Tax:** Alaska, Florida, Nevada, New Hampshire (wages only), South Dakota, Tennessee (wages only), Texas, Washington (wages only), Wyoming.\n\n**High State Income Tax States:** California (up to 13.3%), Hawaii (up to 11%), New Jersey (up to 10.75%), Oregon (up to 9.9%), Minnesota (up to 9.85%).\n\n**New York** has both state (up to 10.9%) and New York City income taxes (up to 3.876%), making it one of the highest combined tax burdens.\n\n**Local Taxes** — Some cities and counties impose additional income taxes. Philadelphia, for example, charges a wage tax of approximately 3.75% for residents.\n\n**State Tax Filing** — Most states require a separate state tax return in addition to the federal return. Many states conform to federal definitions but have their own deductions and credits.`,
            },
            zh: {
              title: "3.1.2 州所得税与地方税",
              content: `美国各州所得税差异很大：\n\n**无州所得税：** 阿拉斯加、佛罗里达、内华达、新罕布什尔（仅工资）、南达科他、田纳西（仅工资）、德克萨斯、华盛顿（仅工资）、怀俄明。\n\n**高州所得税州：** 加利福尼亚（最高13.3%）、夏威夷（最高11%）、新泽西（最高10.75%）、俄勒冈（最高9.9%）、明尼苏达（最高9.85%）。\n\n**纽约州** 同时征收州税（最高10.9%）和纽约市所得税（最高3.876%），是综合税负最高的地区之一。\n\n**地方税** — 一些城市和县征收额外所得税。例如，费城对居民征收约3.75%的工资税。\n\n**州税申报** — 大多数州除联邦申报外还需要单独的州税申报。许多州遵循联邦定义，但有自己的扣除项和抵免项。`,
            },
          },
          {
            id: "ch3-s1-3",
            en: {
              title: "3.1.3 Sales Tax and Property Tax",
              content: `**Sales Tax** — Imposed at the state and local level on retail purchases. Rates vary:\n- No sales tax: Oregon, Montana, New Hampshire, Delaware, Alaska (no state tax)\n- Highest combined rates: Tennessee (~9.55%), Louisiana (~9.55%), Arkansas (~9.47%)\n- California: 7.25% state rate + local additions (up to ~10.75% in some areas)\n\nSales tax is generally not included in displayed prices (unlike most countries). It is added at checkout.\n\n**Property Tax** — Annual tax on real estate ownership, assessed by local governments. Rates vary enormously by location:\n- New Jersey: ~2.2% effective rate (highest)\n- Hawaii: ~0.3% (lowest)\n- Texas: ~1.7% (high, but no state income tax)\n\nProperty taxes fund local schools, fire departments, and other services. Homeowners receive an annual property tax bill and may pay through an escrow account with their mortgage.`,
            },
            zh: {
              title: "3.1.3 销售税与财产税",
              content: `**销售税** — 由州和地方对零售购买征收。税率各异：\n- 无销售税：俄勒冈、蒙大拿、新罕布什尔、特拉华、阿拉斯加（无州税）\n- 最高综合税率：田纳西（约9.55%）、路易斯安那（约9.55%）、阿肯色（约9.47%）\n- 加利福尼亚：7.25%州税率+地方附加税（某些地区最高约10.75%）\n\n销售税通常不包含在标价中（与大多数国家不同），在结账时添加。\n\n**财产税** — 由地方政府评估的房地产所有权年度税。税率因地点差异极大：\n- 新泽西州：约2.2%有效税率（最高）\n- 夏威夷：约0.3%（最低）\n- 德克萨斯州：约1.7%（较高，但无州所得税）\n\n财产税为当地学校、消防部门和其他服务提供资金。房主每年收到财产税账单，可通过抵押贷款的托管账户支付。`,
            },
          },
        ],
      },
      {
        id: "ch3-s2",
        en: { title: "3.2 Tax Filing Process and Forms" },
        zh: { title: "3.2 报税流程与表格" },
        subsections: [
          {
            id: "ch3-s2-1",
            en: {
              title: "3.2.1 Taxpayer Status and Identification (W-2, 1099 Series)",
              content: `**Tax Identification Numbers:**\n- **SSN (Social Security Number)** — Primary tax ID for U.S. citizens and authorized workers\n- **ITIN (Individual Taxpayer Identification Number)** — For individuals who need to file taxes but are not eligible for an SSN (Form W-7)\n- **EIN (Employer Identification Number)** — For businesses and self-employed individuals\n\n**W-2 (Wage and Tax Statement)** — Issued by employers by January 31. Shows total wages paid and taxes withheld during the year. Essential for filing your federal and state returns.\n\n**1099 Series:**\n- **1099-NEC** — Non-employee compensation (freelance/contractor income over $600)\n- **1099-INT** — Interest income from banks\n- **1099-DIV** — Dividend income from investments\n- **1099-B** — Proceeds from broker transactions (stock sales)\n- **1099-G** — Government payments (unemployment compensation, state tax refunds)\n- **1099-R** — Distributions from retirement accounts`,
            },
            zh: {
              title: "3.2.1 报税主体与身份 (W-2, 1099 系列)",
              content: `**税务识别号码：**\n- **SSN（社会安全号）** — 美国公民和授权工作者的主要税务ID\n- **ITIN（个人纳税人识别号）** — 需要报税但没有资格申请SSN的个人（W-7表格）\n- **EIN（雇主识别号）** — 用于企业和自雇人士\n\n**W-2（工资和税务申报表）** — 由雇主在1月31日前发出。显示当年支付的总工资和预扣税款。申报联邦和州税的必要文件。\n\n**1099系列：**\n- **1099-NEC** — 非雇员薪酬（超过600美元的自由职业/承包商收入）\n- **1099-INT** — 银行利息收入\n- **1099-DIV** — 投资股息收入\n- **1099-B** — 经纪商交易收益（股票销售）\n- **1099-G** — 政府付款（失业补偿、州税退款）\n- **1099-R** — 退休账户分配`,
            },
          },
          {
            id: "ch3-s2-2",
            en: {
              title: "3.2.2 Common Tax Forms (Form 1040, W-4, State Forms)",
              content: `**Form 1040** — The primary federal income tax return form. All individual taxpayers use this form (or its variants 1040-SR for seniors, 1040-NR for non-residents). Schedules are attached for additional income types.\n\n**W-4 (Employee's Withholding Certificate)** — Completed when starting a new job. Tells your employer how much federal income tax to withhold from each paycheck. Updated after major life changes (marriage, new child, second job).\n\n**State Withholding Forms:**\n- New York: IT-2104 (Employee's Withholding Allowance Certificate)\n- California: DE 4\n- Other states have similar forms\n\n**Filing Deadlines:**\n- Federal: April 15 (extension to October 15 available with Form 4868)\n- Most states: April 15 or within a few days\n\n**Filing Methods:** IRS Free File (income under $79,000), tax software (TurboTax, H&R Block, TaxAct), professional tax preparer (CPA), or paper filing.`,
            },
            zh: {
              title: "3.2.2 常用报税表格 (Form 1040, W-4, 州预扣表格)",
              content: `**Form 1040** — 主要的联邦所得税申报表。所有个人纳税人使用此表格（或其变体1040-SR用于老年人，1040-NR用于非居民）。附加附表用于其他收入类型。\n\n**W-4（雇员预扣证明）** — 开始新工作时填写。告知雇主每次发薪时预扣多少联邦所得税。重大生活变化后更新（结婚、新生子女、第二份工作）。\n\n**州预扣表格：**\n- 纽约州：IT-2104（雇员预扣免税额证明）\n- 加利福尼亚州：DE 4\n- 其他州有类似表格\n\n**申报截止日期：**\n- 联邦：4月15日（可通过4868表格延期至10月15日）\n- 大多数州：4月15日或几天内\n\n**申报方式：** IRS免费申报（收入低于79,000美元）、税务软件（TurboTax、H&R Block、TaxAct）、专业税务师（CPA）或纸质申报。`,
            },
          },
          {
            id: "ch3-s2-3",
            en: {
              title: "3.2.3 Special Tax Situations (1098-T, 1098-E, 1099-NEC)",
              content: `**1098-T (Tuition Statement)** — Issued by educational institutions. Reports tuition paid and scholarships received. Used to claim the American Opportunity Credit (up to $2,500/year for first 4 years of college) or Lifetime Learning Credit (up to $2,000/year).\n\n**1098-E (Student Loan Interest Statement)** — Reports student loan interest paid. Up to $2,500 of student loan interest may be deductible (income limits apply).\n\n**1099-NEC (Non-Employee Compensation)** — If you earned $600+ as a freelancer or contractor, you'll receive this form. You must report this income and pay self-employment tax (15.3%) in addition to income tax.\n\n**Foreign Income and FBAR** — U.S. tax residents must report worldwide income. If you have foreign bank accounts with aggregate value over $10,000, you must file an FBAR (FinCEN Form 114) by April 15. FATCA (Form 8938) reporting may also apply.\n\n**Treaty Benefits** — The U.S. has tax treaties with many countries that may reduce withholding rates or exempt certain income. Check IRS Publication 901 for treaty details.`,
            },
            zh: {
              title: "3.2.3 特殊报税情况 (1098-T, 1098-E, 1099-NEC)",
              content: `**1098-T（学费申报表）** — 由教育机构发出。报告已支付的学费和获得的奖学金。用于申请美国机会抵免（大学前4年每年最高2,500美元）或终身学习抵免（每年最高2,000美元）。\n\n**1098-E（学生贷款利息申报表）** — 报告已支付的学生贷款利息。最多2,500美元的学生贷款利息可以扣除（有收入限制）。\n\n**1099-NEC（非雇员薪酬）** — 如果您作为自由职业者或承包商赚取600美元以上，将收到此表格。您必须申报此收入并缴纳自雇税（15.3%）以及所得税。\n\n**境外收入和FBAR** — 美国税务居民必须申报全球收入。如果您的境外银行账户总价值超过10,000美元，必须在4月15日前提交FBAR（FinCEN 114表格）。FATCA（8938表格）申报可能也适用。\n\n**税收协定优惠** — 美国与许多国家签有税收协定，可能降低预扣税率或豁免某些收入。查阅IRS出版物901了解协定详情。`,
            },
          },
        ],
      },
      {
        id: "ch3-s3",
        en: { title: "3.3 Tax Savings and Planning" },
        zh: { title: "3.3 节税与税务规划" },
        subsections: [
          {
            id: "ch3-s3-1",
            en: {
              title: "3.3.1 Personal Exemptions and Deductions",
              content: `**Standard Deduction vs. Itemized Deductions** — Choose whichever is higher:\n\n**Standard Deduction (2024):** $14,600 (single), $29,200 (MFJ), $21,900 (HoH). Most taxpayers take the standard deduction.\n\n**Itemized Deductions (Schedule A):**\n- State and local taxes (SALT): Deductible up to $10,000 cap\n- Mortgage interest: On first $750,000 of mortgage debt\n- Charitable contributions: Cash donations up to 60% of AGI\n- Medical expenses: Exceeding 7.5% of AGI\n\n**Above-the-Line Deductions (reduce AGI regardless of standard/itemized choice):**\n- Student loan interest (up to $2,500)\n- Educator expenses (up to $300)\n- Self-employed health insurance premiums\n- Alimony paid (pre-2019 agreements)\n- IRA contributions (if eligible)\n\n**Tax Credits vs. Deductions** — Credits directly reduce your tax bill dollar-for-dollar; deductions reduce taxable income. A $1,000 credit is worth more than a $1,000 deduction.`,
            },
            zh: {
              title: "3.3.1 个人免税额与抵扣项",
              content: `**标准扣除额与逐项扣除** — 选择较高的一项：\n\n**标准扣除额（2024年）：** 14,600美元（单身），29,200美元（已婚联合申报），21,900美元（户主）。大多数纳税人选择标准扣除额。\n\n**逐项扣除（附表A）：**\n- 州和地方税（SALT）：最高10,000美元上限可扣除\n- 抵押贷款利息：前750,000美元抵押贷款债务的利息\n- 慈善捐款：现金捐款最高可达调整后总收入（AGI）的60%\n- 医疗费用：超过AGI 7.5%的部分\n\n**线上扣除（无论选择标准/逐项扣除都可减少AGI）：**\n- 学生贷款利息（最高2,500美元）\n- 教育工作者费用（最高300美元）\n- 自雇人士健康保险费\n- 赡养费（2019年前协议）\n- IRA缴款（如符合条件）\n\n**税收抵免与扣除** — 抵免直接按美元减少税单；扣除减少应税收入。1,000美元的抵免比1,000美元的扣除更有价值。`,
            },
          },
          {
            id: "ch3-s3-2",
            en: {
              title: "3.3.2 Retirement Account Tax Savings (401K, IRA)",
              content: `Retirement accounts offer powerful tax advantages:\n\n**Traditional 401(k)/IRA Strategy:** Contributions reduce your taxable income today. Best if you expect to be in a lower tax bracket in retirement.\n\n**Roth 401(k)/IRA Strategy:** Pay taxes now, but all future growth and withdrawals are tax-free. Best if you expect to be in a higher tax bracket in retirement or are early in your career.\n\n**Backdoor Roth IRA:** High earners who exceed Roth IRA income limits can make a non-deductible Traditional IRA contribution and then convert it to a Roth IRA. Consult a tax advisor for the pro-rata rule.\n\n**Mega Backdoor Roth:** Some 401(k) plans allow after-tax contributions up to the total limit ($69,000 in 2024) which can then be converted to Roth.\n\n**Required Minimum Distributions (RMDs)** — Traditional IRA and 401(k) holders must begin taking RMDs at age 73. Roth IRAs have no RMDs during the owner's lifetime.`,
            },
            zh: {
              title: "3.3.2 退休账户节税 (401K, IRA)",
              content: `退休账户提供强大的税收优惠：\n\n**传统401(k)/IRA策略：** 缴款减少今天的应税收入。如果您预计退休时处于较低税率档次，则最为合适。\n\n**罗斯401(k)/IRA策略：** 现在缴税，但未来所有增长和提款均免税。如果您预计退休时处于较高税率档次或处于职业早期，则最为合适。\n\n**后门罗斯IRA：** 超过罗斯IRA收入限制的高收入者可以进行不可扣除的传统IRA缴款，然后将其转换为罗斯IRA。咨询税务顾问了解按比例规则。\n\n**超级后门罗斯：** 一些401(k)计划允许税后缴款达到总限额（2024年为69,000美元），然后可以转换为罗斯。\n\n**最低提款要求（RMD）** — 传统IRA和401(k)持有人必须在73岁时开始提取RMD。罗斯IRA在所有者有生之年没有RMD要求。`,
            },
          },
          {
            id: "ch3-s3-3",
            en: {
              title: "3.3.3 Education and Medical Expense Tax Savings (529 Plan, HSA, FSA)",
              content: `**529 Education Savings Plan** — State-sponsored investment account for education expenses. Contributions are not federally deductible (some states offer deductions). Earnings grow tax-free, and withdrawals for qualified education expenses (tuition, books, room and board) are tax-free. Can be used for K-12 (up to $10,000/year) and college. Unused funds can be rolled over to a Roth IRA (up to $35,000 lifetime, starting 2024).\n\n**HSA (Health Savings Account)** — Triple tax advantage: contributions are pre-tax, growth is tax-free, and qualified medical expense withdrawals are tax-free. After age 65, withdrawals for any purpose are taxed as ordinary income (like a Traditional IRA) but not penalized. HSA funds roll over indefinitely — no "use it or lose it."\n\n**FSA (Flexible Spending Account)** — Pre-tax contributions for medical or dependent care. Medical FSA: up to $3,200 (2024). Dependent Care FSA: up to $5,000 per household. Generally "use it or lose it" with a grace period or $640 rollover option.`,
            },
            zh: {
              title: "3.3.3 教育与医疗支出节税 (529 Plan, HSA, FSA)",
              content: `**529教育储蓄计划** — 州政府支持的教育费用投资账户。缴款在联邦层面不可扣除（部分州提供扣除）。收益免税增长，合格教育费用（学费、书本费、住宿餐饮）提款免税。可用于K-12（每年最高10,000美元）和大学。未使用资金可转入罗斯IRA（终身最高35,000美元，自2024年起）。\n\n**HSA（健康储蓄账户）** — 三重税收优惠：缴款税前扣除，增长免税，合格医疗费用提款免税。65岁后，任何目的的提款按普通收入征税（如传统IRA）但不受罚款。HSA资金无限期结转 — 无"用完或失去"规定。\n\n**FSA（弹性支出账户）** — 用于医疗或家属护理的税前缴款。医疗FSA：最高3,200美元（2024年）。家属护理FSA：每户最高5,000美元。通常"用完或失去"，有宽限期或640美元结转选项。`,
            },
          },
        ],
      },
    ],
  },
  {
    id: "ch4",
    number: 4,
    en: { title: "U.S. Education and Social Security", subtitle: "Education system, healthcare, and social benefits" },
    zh: { title: "美国教育与社会保障", subtitle: "教育体系、医疗保健与社会福利" },
    sections: [
      {
        id: "ch4-s1",
        en: { title: "4.1 Education System" },
        zh: { title: "4.1 教育体系" },
        subsections: [
          {
            id: "ch4-s1-1",
            en: {
              title: "4.1.1 K-12 Education",
              content: `The U.S. K-12 system spans kindergarten through 12th grade (ages 5-18):\n\n**Structure:** Elementary school (K-5 or K-6), middle school (6-8 or 7-8), and high school (9-12). Public schools are free and funded by local property taxes and state/federal funds.\n\n**School Districts** — Each district is governed by a local school board. Quality varies significantly by district, often correlated with local property values. Parents can research schools at GreatSchools.org.\n\n**Enrollment:** Children must be enrolled in school (public, private, or homeschool) through age 16-18 depending on state. Proof of residency, immunization records, and birth certificate are typically required.\n\n**Special Education** — The Individuals with Disabilities Education Act (IDEA) guarantees free appropriate public education (FAPE) for children with disabilities. Request an evaluation from the school district if you have concerns.\n\n**Gifted Programs, AP, and IB** — Advanced Placement (AP) courses allow high school students to earn college credit. The International Baccalaureate (IB) program offers rigorous international curriculum.`,
            },
            zh: {
              title: "4.1.1 K-12 教育",
              content: `美国K-12体系涵盖幼儿园至12年级（5-18岁）：\n\n**结构：** 小学（K-5或K-6）、初中（6-8或7-8）和高中（9-12）。公立学校免费，由地方财产税和州/联邦资金资助。\n\n**学区** — 每个学区由地方学校委员会管理。质量因学区差异显著，通常与当地房产价值相关。家长可在GreatSchools.org查询学校信息。\n\n**入学：** 根据州的不同，儿童必须在16-18岁前就读学校（公立、私立或家庭教育）。通常需要居住证明、免疫记录和出生证明。\n\n**特殊教育** — 《残疾人教育法》（IDEA）保障残疾儿童获得免费适当公共教育（FAPE）。如有顾虑，请向学区申请评估。\n\n**天才项目、AP和IB** — 大学先修课程（AP）允许高中生获得大学学分。国际文凭（IB）项目提供严格的国际课程。`,
            },
          },
          {
            id: "ch4-s1-2",
            en: {
              title: "4.1.2 Higher Education and Financial Aid",
              content: `The U.S. higher education system is world-renowned:\n\n**Types of Institutions:** Community colleges (2-year, associate degrees), liberal arts colleges, research universities (4-year bachelor's and graduate programs), and professional schools (law, medical, business).\n\n**Admissions:** Competitive universities consider GPA, standardized tests (SAT/ACT), extracurriculars, essays, and recommendations. Common App is used by 900+ colleges.\n\n**Financial Aid:**\n- **FAFSA** — Free Application for Federal Student Aid. Must be filed annually to access federal grants, loans, and work-study. Available to eligible non-citizens.\n- **Federal Pell Grant** — Need-based grant up to $7,395/year (2024-25). Does not need to be repaid.\n- **Federal Student Loans** — Subsidized (no interest while in school) and unsubsidized. Lower interest rates than private loans.\n- **Scholarships** — Merit-based, need-based, and identity-based scholarships from universities, corporations, and foundations.\n\n**For International Students:** F-1 visa required. OPT (Optional Practical Training) allows 12 months of work after graduation (24-month STEM extension available).`,
            },
            zh: {
              title: "4.1.2 高等教育与助学金",
              content: `美国高等教育体系享誉全球：\n\n**机构类型：** 社区学院（2年制，副学士学位）、文理学院、研究型大学（4年制本科和研究生项目）和专业学院（法律、医学、商业）。\n\n**招生：** 竞争性大学考量GPA、标准化考试（SAT/ACT）、课外活动、文书和推荐信。Common App被900多所大学使用。\n\n**助学金：**\n- **FAFSA** — 联邦学生援助免费申请。必须每年提交以获得联邦助学金、贷款和勤工俭学。符合条件的非公民可申请。\n- **联邦佩尔助学金** — 需求型助学金，每年最高7,395美元（2024-25年）。无需偿还。\n- **联邦学生贷款** — 补贴型（在校期间不计利息）和非补贴型。利率低于私人贷款。\n- **奖学金** — 来自大学、企业和基金会的基于成绩、需求和身份的奖学金。\n\n**国际学生：** 需要F-1签证。OPT（可选实习培训）允许毕业后工作12个月（STEM专业可延长24个月）。`,
            },
          },
          {
            id: "ch4-s1-3",
            en: {
              title: "4.1.3 Adult Education and Vocational Training",
              content: `Continuing education options for adults:\n\n**Community Colleges** — Offer affordable continuing education, certificate programs, English as a Second Language (ESL), and workforce development courses. Many offer evening and online classes.\n\n**Vocational/Trade Schools** — Train students for skilled trades: electrician, plumber, HVAC technician, medical assistant, culinary arts, cosmetology. Programs typically 1-2 years. Often lead to higher-paying jobs than 4-year degrees in certain fields.\n\n**Online Learning** — Platforms like Coursera, edX, LinkedIn Learning, and Udemy offer courses and certificates from top universities and companies. Google, Amazon, and Microsoft offer professional certificates.\n\n**English Language Learning** — ESL classes are widely available at community colleges, libraries, and non-profit organizations, often free or low-cost. Duolingo and other apps supplement formal instruction.\n\n**GED (General Educational Development)** — Equivalent to a high school diploma. Available for adults who did not complete high school.`,
            },
            zh: {
              title: "4.1.3 成人教育与职业培训",
              content: `成人继续教育选择：\n\n**社区学院** — 提供实惠的继续教育、证书项目、英语作为第二语言（ESL）和劳动力发展课程。许多提供夜间和在线课程。\n\n**职业/技工学校** — 培训技术工人：电工、水管工、暖通空调技术员、医疗助理、烹饪艺术、美容。项目通常1-2年。在某些领域往往比4年制学位带来更高薪酬的工作。\n\n**在线学习** — Coursera、edX、LinkedIn Learning和Udemy等平台提供顶尖大学和公司的课程和证书。谷歌、亚马逊和微软提供专业证书。\n\n**英语语言学习** — ESL课程在社区学院、图书馆和非营利组织广泛提供，通常免费或低成本。Duolingo和其他应用程序补充正式教学。\n\n**GED（普通教育发展）** — 相当于高中文凭。适用于未完成高中学业的成年人。`,
            },
          },
        ],
      },
      {
        id: "ch4-s2",
        en: { title: "4.2 Healthcare System" },
        zh: { title: "4.2 医疗保健系统" },
        subsections: [
          {
            id: "ch4-s2-1",
            en: {
              title: "4.2.1 Types of Health Insurance (Medicare, Medicaid, Private Insurance)",
              content: `**Medicare** — Federal health insurance for people 65+ and certain younger people with disabilities. Four parts:\n- Part A: Hospital insurance (generally premium-free if you worked 10+ years)\n- Part B: Medical insurance ($174.70/month standard premium in 2024)\n- Part C: Medicare Advantage (private plans bundling A+B+D)\n- Part D: Prescription drug coverage\n\n**Medicaid** — Joint federal-state program for low-income individuals and families. Eligibility and benefits vary by state. Covers doctor visits, hospital stays, long-term care, and more.\n\n**CHIP (Children's Health Insurance Program)** — Provides low-cost health coverage to children in families that earn too much for Medicaid but cannot afford private insurance.\n\n**Marketplace/Exchange Plans** — Available through healthcare.gov for individuals without employer coverage. Plans categorized as Bronze, Silver, Gold, Platinum based on cost-sharing. Premium Tax Credits available for incomes 100-400% of federal poverty level.\n\n**COBRA** — Allows continuation of employer health coverage for up to 18 months after leaving a job. Employee pays full premium (often expensive).`,
            },
            zh: {
              title: "4.2.1 医疗保险类型 (Medicare, Medicaid, 私人保险)",
              content: `**Medicare** — 联邦医疗保险，适用于65岁以上人士和某些残疾年轻人。四个部分：\n- A部分：住院保险（工作10年以上通常免保费）\n- B部分：医疗保险（2024年标准保费每月174.70美元）\n- C部分：Medicare优势计划（将A+B+D捆绑的私人计划）\n- D部分：处方药保险\n\n**Medicaid** — 联邦-州联合项目，面向低收入个人和家庭。资格和福利因州而异。覆盖医生就诊、住院、长期护理等。\n\n**CHIP（儿童健康保险计划）** — 为收入超过Medicaid资格但负担不起私人保险的家庭儿童提供低成本健康保险。\n\n**市场/交易所计划** — 通过healthcare.gov向没有雇主保险的个人提供。计划按成本分担分为铜、银、金、铂级。联邦贫困线100-400%收入可获得保费税收抵免。\n\n**COBRA** — 允许在离职后继续享受雇主健康保险最多18个月。员工支付全额保费（通常较贵）。`,
            },
          },
          {
            id: "ch4-s2-2",
            en: {
              title: "4.2.2 Medical Services and Treatment Process",
              content: `**Primary Care Physician (PCP)** — Your main doctor for routine care, preventive services, and referrals. Establish care with a PCP soon after arriving. HMO plans require a PCP; PPO plans allow direct specialist access.\n\n**Specialist Care** — Cardiologists, dermatologists, orthopedists, etc. May require a referral (HMO) or pre-authorization from insurance.\n\n**Urgent Care** — For non-emergency situations that need same-day attention (minor injuries, infections, flu). Less expensive than emergency rooms. No appointment needed.\n\n**Emergency Room (ER)** — For life-threatening emergencies. Very expensive. Under EMTALA, ERs must treat all patients regardless of ability to pay.\n\n**Telehealth** — Video or phone consultations with doctors. Expanded significantly during COVID-19. Convenient for minor issues and follow-ups.\n\n**Medical Bills** — Always review bills for errors. Request an itemized bill. Ask about financial assistance programs (charity care). Negotiate payment plans. Medical debt is common and negotiable.`,
            },
            zh: {
              title: "4.2.2 医疗服务与就医流程",
              content: `**初级保健医生（PCP）** — 您的常规护理、预防服务和转诊的主要医生。到达后尽快与PCP建立就医关系。HMO计划需要PCP；PPO计划允许直接就诊专科医生。\n\n**专科护理** — 心脏科、皮肤科、骨科等。可能需要转诊（HMO）或保险预授权。\n\n**紧急护理** — 用于需要当天处理的非紧急情况（轻伤、感染、流感）。比急诊室便宜。无需预约。\n\n**急诊室（ER）** — 用于危及生命的紧急情况。费用非常高。根据EMTALA，急诊室必须治疗所有患者，无论其支付能力。\n\n**远程医疗** — 与医生进行视频或电话咨询。在COVID-19期间大幅扩展。对于小问题和随访很方便。\n\n**医疗账单** — 始终检查账单是否有错误。要求逐项账单。询问财务援助项目（慈善护理）。协商付款计划。医疗债务很常见且可协商。`,
            },
          },
          {
            id: "ch4-s2-3",
            en: {
              title: "4.2.3 Medications and Prescriptions",
              content: `**Prescription System** — Most medications require a prescription from a licensed provider. Prescriptions can be filled at pharmacies (CVS, Walgreens, Rite Aid, Walmart, Costco) or via mail-order.\n\n**Generic vs. Brand-Name** — Generic drugs contain the same active ingredients as brand-name drugs but cost significantly less. Always ask your pharmacist about generic alternatives.\n\n**Formulary** — Your insurance plan's list of covered drugs. Drugs are tiered by cost: Tier 1 (generics, lowest copay) through Tier 4-5 (specialty drugs, highest cost).\n\n**GoodRx and Discount Programs** — GoodRx offers coupons that can reduce prescription costs significantly, sometimes below your insurance copay. Manufacturer patient assistance programs offer free or reduced-cost medications for qualifying patients.\n\n**Controlled Substances** — Medications like opioids, stimulants (Adderall), and benzodiazepines are regulated under the Controlled Substances Act. Prescriptions have strict rules and cannot be refilled early.\n\n**Over-the-Counter (OTC)** — Many medications available without prescription: pain relievers (Tylenol, Advil), cold medicines, antacids, etc.`,
            },
            zh: {
              title: "4.2.3 药品与处方",
              content: `**处方系统** — 大多数药物需要持牌医疗提供者的处方。处方可在药房（CVS、Walgreens、Rite Aid、沃尔玛、Costco）或通过邮购配药。\n\n**仿制药与品牌药** — 仿制药含有与品牌药相同的活性成分，但成本显著更低。始终询问药剂师是否有仿制药替代品。\n\n**药品目录** — 您保险计划的覆盖药物列表。药物按成本分层：第1层（仿制药，最低自付额）到第4-5层（特种药物，最高成本）。\n\n**GoodRx和折扣项目** — GoodRx提供可显著降低处方成本的优惠券，有时低于您的保险自付额。制造商患者援助项目为符合条件的患者提供免费或低价药物。\n\n**管制物质** — 阿片类药物、兴奋剂（Adderall）和苯二氮䓬类药物等受《管制物质法》监管。处方有严格规定，不能提前续药。\n\n**非处方药（OTC）** — 许多药物无需处方：止痛药（泰诺、布洛芬）、感冒药、抗酸药等。`,
            },
          },
        ],
      },
      {
        id: "ch4-s3",
        en: { title: "4.3 Social Security and Benefits" },
        zh: { title: "4.3 社会保障与福利" },
        subsections: [
          {
            id: "ch4-s3-1",
            en: {
              title: "4.3.1 Social Security Number (SSN)",
              content: `The Social Security Number (SSN) is a 9-digit number issued by the Social Security Administration (SSA) that serves as the primary identification number for U.S. residents:\n\n**Who Can Get an SSN:** U.S. citizens, permanent residents, and certain work-authorized non-immigrants (H-1B, L-1, O-1, F-1 with OPT/CPT, etc.).\n\n**How to Apply:** Visit a local Social Security office with proof of identity, age, and immigration status. Allow 2-4 weeks for the card to arrive.\n\n**Uses:** Employment (required by employers for payroll), tax filing, opening bank accounts, applying for credit, renting an apartment, and many government services.\n\n**Protecting Your SSN:** Never carry your Social Security card in your wallet. Be cautious about sharing your SSN — only provide it when legally required. Monitor your credit report for signs of identity theft.\n\n**ITIN Alternative:** If you're not eligible for an SSN but need to file taxes, apply for an Individual Taxpayer Identification Number (ITIN) using Form W-7.`,
            },
            zh: {
              title: "4.3.1 社会安全号 (SSN)",
              content: `社会安全号（SSN）是由社会保障局（SSA）颁发的9位数字，是美国居民的主要身份识别号码：\n\n**谁可以获得SSN：** 美国公民、永久居民和特定有工作授权的非移民（H-1B、L-1、O-1、有OPT/CPT的F-1等）。\n\n**如何申请：** 携带身份、年龄和移民身份证明前往当地社会保障办公室。卡片到达需要2-4周。\n\n**用途：** 就业（雇主工资发放所需）、报税、开设银行账户、申请信用、租房和许多政府服务。\n\n**保护您的SSN：** 不要将社会保障卡放在钱包里。谨慎分享您的SSN — 只在法律要求时提供。监控您的信用报告以发现身份盗窃迹象。\n\n**ITIN替代方案：** 如果您没有资格申请SSN但需要报税，请使用W-7表格申请个人纳税人识别号（ITIN）。`,
            },
          },
          {
            id: "ch4-s3-2",
            en: {
              title: "4.3.2 Social Security Benefits",
              content: `Social Security provides retirement, disability, and survivor benefits:\n\n**Retirement Benefits** — Based on your 35 highest-earning years. Full retirement age (FRA) is 67 for those born after 1960. You can claim as early as 62 (reduced benefits) or delay until 70 (increased benefits — 8% per year after FRA).\n\n**Earning Credits** — You earn up to 4 credits per year based on earnings. 40 credits (10 years of work) are required for retirement benefits. Immigrants who have worked in countries with Social Security totalization agreements may combine credits.\n\n**SSDI (Social Security Disability Insurance)** — For workers who become disabled before retirement age and have sufficient work credits.\n\n**SSI (Supplemental Security Income)** — Need-based program for disabled, blind, or elderly individuals with limited income and resources. Does not require work history.\n\n**Spousal and Survivor Benefits** — Spouses can claim up to 50% of their partner's benefit. Widows/widowers can claim 100% of the deceased spouse's benefit.`,
            },
            zh: {
              title: "4.3.2 社会保障福利",
              content: `社会保障提供退休、残疾和遗属福利：\n\n**退休福利** — 基于您35个最高收入年份。1960年后出生者的完全退休年龄（FRA）为67岁。您可以最早在62岁申请（减少福利）或延迟至70岁（增加福利 — FRA后每年增加8%）。\n\n**工作积分** — 您每年根据收入最多获得4个积分。退休福利需要40个积分（10年工作）。在与美国签有社会保障总化协议国家工作过的移民可以合并积分。\n\n**SSDI（社会保障残疾保险）** — 适用于在退休年龄前残疾且有足够工作积分的工人。\n\n**SSI（补充保障收入）** — 面向收入和资源有限的残疾、失明或老年人的需求型项目。不需要工作历史。\n\n**配偶和遗属福利** — 配偶可以申请其伴侣福利的50%。寡妇/鳏夫可以申请已故配偶福利的100%。`,
            },
          },
          {
            id: "ch4-s3-3",
            en: {
              title: "4.3.3 Unemployment Insurance and Workers' Compensation",
              content: `**Unemployment Insurance (UI)** — State-administered program providing temporary income replacement for workers who lose their jobs through no fault of their own:\n- Eligibility: Must have worked a minimum period, earned sufficient wages, be actively seeking work, and be available for work\n- Benefit amount: Typically 40-50% of previous wages, up to a state maximum\n- Duration: Usually 26 weeks (may be extended during high unemployment periods)\n- Application: File with your state's unemployment agency immediately after job loss\n\n**Workers' Compensation** — Insurance providing wage replacement and medical benefits to employees injured on the job:\n- Covers medical treatment, temporary disability payments, permanent disability compensation, and death benefits\n- No-fault system — you don't need to prove employer negligence\n- Report workplace injuries immediately to your employer\n- Each state administers its own program\n\n**Important:** Undocumented immigrants are generally not eligible for unemployment insurance but may be eligible for workers' compensation in most states.`,
            },
            zh: {
              title: "4.3.3 失业保险与工人赔偿",
              content: `**失业保险（UI）** — 州政府管理的项目，为非因本人过失而失业的工人提供临时收入补偿：\n- 资格：必须有最低工作期限、足够的工资收入、积极求职且可以工作\n- 福利金额：通常为前工资的40-50%，最高不超过州上限\n- 期限：通常26周（高失业期间可能延长）\n- 申请：失业后立即向您所在州的失业机构提交申请\n\n**工人赔偿** — 为在工作中受伤的雇员提供工资补偿和医疗福利的保险：\n- 覆盖医疗治疗、临时残疾付款、永久残疾补偿和死亡福利\n- 无过失制度 — 您无需证明雇主疏忽\n- 立即向雇主报告工作场所伤害\n- 每个州管理自己的项目\n\n**重要：** 无证件移民通常没有资格获得失业保险，但在大多数州可能有资格获得工人赔偿。`,
            },
          },
        ],
      },
    ],
  },
  {
    id: "ch5",
    number: 5,
    en: { title: "U.S. Daily Life and Culture", subtitle: "Housing, finance, culture, time zones, and fashion" },
    zh: { title: "美国日常生活与文化", subtitle: "住房、金融、文化、时区与时尚" },
    sections: [
      {
        id: "ch5-s1",
        en: { title: "5.1 Housing and Transportation" },
        zh: { title: "5.1 住房与交通" },
        subsections: [
          {
            id: "ch5-s1-1",
            en: {
              title: "5.1.1 Renting and Buying a Home",
              content: `**Renting:**\n- **Lease Agreement** — Typically 12 months. Read carefully before signing. Key terms: rent amount, due date, late fees, pet policy, maintenance responsibilities, and early termination clause.\n- **Security Deposit** — Usually 1-2 months' rent. Must be returned within 14-30 days of move-out (varies by state) minus legitimate deductions.\n- **Tenant Rights** — Landlords must provide habitable conditions, cannot discriminate (Fair Housing Act), and must follow proper eviction procedures.\n- **Renter's Insurance** — Highly recommended. Covers personal property, liability, and additional living expenses. Typically $15-30/month.\n\n**Buying a Home:**\n- **Pre-approval** — Get mortgage pre-approval before house hunting to know your budget\n- **Down Payment** — Conventional loans: 20% (to avoid PMI) or as low as 3-5%. FHA loans: 3.5% minimum.\n- **Closing Costs** — 2-5% of purchase price (title insurance, appraisal, lender fees, etc.)\n- **Process:** Offer → Inspection → Appraisal → Underwriting → Closing (30-60 days typical)\n- **Non-citizen Buyers** — LPRs can generally get conventional mortgages. Non-resident aliens may need larger down payments and higher rates.`,
            },
            zh: {
              title: "5.1.1 租房与购房",
              content: `**租房：**\n- **租赁协议** — 通常12个月。签字前仔细阅读。关键条款：租金金额、到期日、滞纳金、宠物政策、维护责任和提前终止条款。\n- **押金** — 通常1-2个月租金。搬出后14-30天内退还（因州而异），扣除合理损失。\n- **租户权利** — 房东必须提供适宜居住的条件，不得歧视（《公平住房法》），必须遵循正当驱逐程序。\n- **租客保险** — 强烈推荐。覆盖个人财产、责任和额外生活费用。通常每月15-30美元。\n\n**购房：**\n- **预批准** — 在找房前获得抵押贷款预批准，了解您的预算\n- **首付** — 传统贷款：20%（避免PMI）或低至3-5%。FHA贷款：最低3.5%。\n- **过户费用** — 购买价格的2-5%（产权保险、评估、贷款方费用等）\n- **流程：** 报价→检查→评估→承保→过户（通常30-60天）\n- **非公民买家** — 绿卡持有者通常可以获得传统抵押贷款。非居民外籍人士可能需要更大的首付和更高的利率。`,
            },
          },
          {
            id: "ch5-s1-2",
            en: {
              title: "5.1.2 Driver's License and Vehicle Purchase",
              content: `**Driver's License:**\n- Apply at your state's DMV (Department of Motor Vehicles) within 30-90 days of establishing residency\n- Requirements: Proof of identity, SSN (or ITIN), proof of residency, and passing written and driving tests\n- International Driving Permit (IDP): Valid for a limited period; convert to a U.S. license promptly\n- REAL ID: Federal requirement for domestic air travel and federal facilities. Check if your state's license is REAL ID compliant.\n\n**Vehicle Purchase:**\n- **New vs. Used:** New cars come with warranties but depreciate quickly. Used cars are more affordable; check vehicle history (Carfax, AutoCheck).\n- **Financing:** Dealer financing, bank loans, or credit union loans. Credit unions often offer the best rates.\n- **Insurance:** Required in all states. Minimum liability coverage required; comprehensive and collision optional.\n- **Registration:** Register your vehicle with the state DMV. Annual registration fees and emissions testing may apply.\n- **Rideshare:** Uber and Lyft are widely available in urban areas. Useful before getting a car.`,
            },
            zh: {
              title: "5.1.2 驾驶执照与车辆购买",
              content: `**驾驶执照：**\n- 在建立居住地后30-90天内在州DMV（机动车辆管理局）申请\n- 要求：身份证明、SSN（或ITIN）、居住证明，以及通过笔试和驾驶考试\n- 国际驾驶许可证（IDP）：有效期有限；尽快转换为美国驾照\n- REAL ID：国内航空旅行和联邦设施的联邦要求。检查您所在州的驾照是否符合REAL ID要求。\n\n**车辆购买：**\n- **新车与二手车：** 新车附带保修但贬值快。二手车更实惠；检查车辆历史（Carfax、AutoCheck）。\n- **融资：** 经销商融资、银行贷款或信用合作社贷款。信用合作社通常提供最优利率。\n- **保险：** 所有州均要求。最低责任险是必须的；综合险和碰撞险是可选的。\n- **注册：** 在州DMV注册您的车辆。可能需要缴纳年度注册费和排放检测。\n- **网约车：** Uber和Lyft在城市地区广泛提供。在买车前很有用。`,
            },
          },
          {
            id: "ch5-s1-3",
            en: {
              title: "5.1.3 Public Transportation",
              content: `Public transportation varies significantly across U.S. cities:\n\n**Cities with Strong Transit Systems:**\n- **New York City:** Subway (24/7), buses, commuter rail (Metro-North, LIRR, NJ Transit). MTA subway covers all 5 boroughs.\n- **Chicago:** 'L' train system, buses, Metra commuter rail\n- **Washington D.C.:** Metro (subway), buses, bike-share (Capital Bikeshare)\n- **San Francisco Bay Area:** BART, Muni, Caltrain, AC Transit\n- **Boston:** MBTA (T) subway, buses, commuter rail\n\n**Payment:** Most systems use reloadable transit cards (MetroCard in NYC, Clipper in SF, SmarTrip in DC). Many now accept contactless credit/debit cards and phone payments.\n\n**Car-Dependent Areas:** Most suburban and rural areas have minimal public transit. A car is essential in cities like Los Angeles, Houston, Phoenix, and most of the South and Midwest.\n\n**Amtrak** — National passenger rail service. Best for Northeast Corridor (Boston-NYC-DC). Less practical for cross-country travel compared to flying.`,
            },
            zh: {
              title: "5.1.3 公共交通",
              content: `美国各城市的公共交通差异很大：\n\n**公共交通发达的城市：**\n- **纽约市：** 地铁（全天候）、公共汽车、通勤铁路（Metro-North、LIRR、NJ Transit）。MTA地铁覆盖全部5个行政区。\n- **芝加哥：** 'L'列车系统、公共汽车、Metra通勤铁路\n- **华盛顿特区：** 地铁、公共汽车、共享单车（Capital Bikeshare）\n- **旧金山湾区：** BART、Muni、Caltrain、AC Transit\n- **波士顿：** MBTA（T）地铁、公共汽车、通勤铁路\n\n**支付：** 大多数系统使用可充值交通卡（纽约的MetroCard、旧金山的Clipper、华盛顿特区的SmarTrip）。许多现在接受非接触式信用卡/借记卡和手机支付。\n\n**依赖汽车的地区：** 大多数郊区和农村地区公共交通极少。在洛杉矶、休斯顿、凤凰城以及南部和中西部大部分城市，汽车是必需品。\n\n**Amtrak** — 全国客运铁路服务。最适合东北走廊（波士顿-纽约-华盛顿特区）。与飞行相比，跨国旅行实用性较差。`,
            },
          },
        ],
      },
      {
        id: "ch5-s2",
        en: { title: "5.2 Finance and Banking" },
        zh: { title: "5.2 金融与银行" },
        subsections: [
          {
            id: "ch5-s2-1",
            en: {
              title: "5.2.1 Opening Bank Accounts and Financial Services",
              content: `**Opening a Bank Account:**\n- **Requirements:** Government-issued photo ID (passport acceptable), SSN or ITIN, initial deposit, and proof of address\n- **Without SSN:** Some banks (Bank of America, Citibank, Wells Fargo) accept ITIN or passport + foreign address\n- **Types:** Checking account (for daily transactions, debit card), savings account (for saving, earns interest)\n\n**Major Banks:** Chase, Bank of America, Wells Fargo, Citibank, U.S. Bank (large national banks with extensive ATM networks)\n\n**Online Banks:** Ally, Marcus (Goldman Sachs), Discover Bank — typically offer higher interest rates on savings accounts\n\n**Credit Unions:** Member-owned, non-profit financial cooperatives. Often offer better rates and lower fees than big banks.\n\n**FDIC Insurance** — Bank deposits are insured up to $250,000 per depositor per bank by the Federal Deposit Insurance Corporation.\n\n**Wire Transfers and Remittances:** For sending money internationally, compare services: Wise (TransferWise), Remitly, Western Union, Zelle (domestic), Venmo (domestic).`,
            },
            zh: {
              title: "5.2.1 银行开户与金融服务",
              content: `**开设银行账户：**\n- **要求：** 政府颁发的带照片身份证（护照可接受）、SSN或ITIN、初始存款和地址证明\n- **没有SSN：** 一些银行（美国银行、花旗银行、富国银行）接受ITIN或护照+境外地址\n- **类型：** 支票账户（用于日常交易、借记卡）、储蓄账户（用于储蓄，赚取利息）\n\n**主要银行：** 摩根大通、美国银行、富国银行、花旗银行、美国合众银行（拥有广泛ATM网络的大型全国性银行）\n\n**网络银行：** Ally、Marcus（高盛）、Discover Bank — 通常提供更高的储蓄账户利率\n\n**信用合作社：** 会员所有的非营利金融合作社。通常比大银行提供更好的利率和更低的费用。\n\n**FDIC保险** — 联邦存款保险公司为每位存款人在每家银行的存款提供最高250,000美元的保险。\n\n**电汇和汇款：** 国际汇款，比较服务：Wise（TransferWise）、Remitly、西联汇款、Zelle（国内）、Venmo（国内）。`,
            },
          },
          {
            id: "ch5-s2-2",
            en: {
              title: "5.2.2 Credit System and Credit Report",
              content: `The U.S. credit system is central to financial life:\n\n**Credit Score** — A numerical representation (300-850) of your creditworthiness. The most widely used is the FICO score. Ranges: Poor (300-579), Fair (580-669), Good (670-739), Very Good (740-799), Exceptional (800-850).\n\n**Factors Affecting Credit Score:**\n1. Payment history (35%) — Pay all bills on time\n2. Credit utilization (30%) — Keep balances below 30% of credit limits\n3. Length of credit history (15%) — Older accounts help\n4. Credit mix (10%) — Variety of account types\n5. New credit (10%) — Limit hard inquiries\n\n**Building Credit as a New Immigrant:**\n- Secured credit card (deposit as collateral)\n- Become an authorized user on a family member's card\n- Credit-builder loans from credit unions\n- Report rent payments through services like Experian Boost\n\n**Free Credit Reports** — AnnualCreditReport.com provides free reports from all three bureaus (Equifax, Experian, TransUnion) weekly. Review for errors and dispute inaccuracies.\n\n**Credit Freeze** — Free service to prevent new credit accounts from being opened in your name. Recommended if you suspect identity theft.`,
            },
            zh: {
              title: "5.2.2 信用体系与信用报告",
              content: `美国信用体系是金融生活的核心：\n\n**信用评分** — 您信用状况的数字表示（300-850）。最广泛使用的是FICO评分。范围：差（300-579）、一般（580-669）、良好（670-739）、很好（740-799）、优秀（800-850）。\n\n**影响信用评分的因素：**\n1. 还款历史（35%）— 按时支付所有账单\n2. 信用使用率（30%）— 保持余额低于信用额度的30%\n3. 信用历史长度（15%）— 较老的账户有帮助\n4. 信用组合（10%）— 多种账户类型\n5. 新信用（10%）— 限制硬查询\n\n**作为新移民建立信用：**\n- 担保信用卡（存款作为抵押）\n- 成为家庭成员卡的授权用户\n- 信用合作社的信用建立贷款\n- 通过Experian Boost等服务报告租金支付\n\n**免费信用报告** — AnnualCreditReport.com每周提供三大信用局（Equifax、Experian、TransUnion）的免费报告。检查错误并对不准确之处提出异议。\n\n**信用冻结** — 免费服务，防止以您的名义开设新信用账户。如果您怀疑身份盗窃，建议使用。`,
            },
          },
          {
            id: "ch5-s2-3",
            en: {
              title: "5.2.3 Basic Investment and Financial Management Knowledge",
              content: `**Investment Basics:**\n- **Stocks** — Ownership shares in companies. Higher potential returns, higher risk. Invest through brokerage accounts (Fidelity, Schwab, Vanguard, Robinhood).\n- **Bonds** — Loans to governments or corporations. Lower risk, lower returns. U.S. Treasury bonds are the safest.\n- **Index Funds/ETFs** — Diversified funds tracking market indices (S&P 500). Low fees, broad diversification. Recommended by most financial advisors for long-term investing.\n- **Mutual Funds** — Professionally managed diversified funds. Higher fees than index funds.\n\n**Key Principles:**\n1. Start early — compound interest is powerful\n2. Diversify — don't put all eggs in one basket\n3. Keep costs low — expense ratios matter\n4. Stay the course — don't panic-sell during downturns\n5. Emergency fund first — 3-6 months of expenses in cash before investing\n\n**Robo-Advisors** — Automated investment services (Betterment, Wealthfront) that manage portfolios based on your risk tolerance. Good for beginners.\n\n**Financial Advisors** — Look for fee-only fiduciary advisors (CFP designation) who are legally required to act in your best interest.`,
            },
            zh: {
              title: "5.2.3 投资理财基础知识",
              content: `**投资基础：**\n- **股票** — 公司所有权份额。潜在回报较高，风险较高。通过经纪账户投资（富达、嘉信、先锋、Robinhood）。\n- **债券** — 向政府或公司提供的贷款。风险较低，回报较低。美国国债是最安全的。\n- **指数基金/ETF** — 追踪市场指数（标普500）的多元化基金。费用低，广泛分散。大多数理财顾问推荐用于长期投资。\n- **共同基金** — 专业管理的多元化基金。费用高于指数基金。\n\n**关键原则：**\n1. 尽早开始 — 复利的力量是强大的\n2. 多元化 — 不要把所有鸡蛋放在一个篮子里\n3. 保持低成本 — 费用率很重要\n4. 坚持到底 — 市场下跌时不要恐慌性抛售\n5. 先建立应急基金 — 投资前先在现金中保留3-6个月的支出\n\n**智能投顾** — 自动化投资服务（Betterment、Wealthfront），根据您的风险承受能力管理投资组合。适合初学者。\n\n**理财顾问** — 寻找仅收费的受托顾问（CFP认证），他们在法律上被要求以您的最佳利益行事。`,
            },
          },
        ],
      },
      {
        id: "ch5-s3",
        en: { title: "5.3 Culture and Customs" },
        zh: { title: "5.3 文化与习俗" },
        subsections: [
          {
            id: "ch5-s3-1",
            en: {
              title: "5.3.1 American Values and Social Etiquette",
              content: `**Core American Values:**\n- **Individualism** — Personal freedom, self-reliance, and individual achievement are highly prized\n- **Equality** — Belief in equal opportunity (though not always equal outcomes)\n- **Informality** — Americans tend to be casual; first names are used quickly, even with supervisors\n- **Directness** — Communication tends to be direct and explicit. "Yes" means yes; "no" means no.\n- **Time** — Punctuality is valued. Being late to meetings or appointments is considered disrespectful.\n\n**Social Etiquette:**\n- **Greetings:** A firm handshake is standard in professional settings. Hugs among friends. "How are you?" is a greeting, not a genuine inquiry — respond with "Fine, thanks!"\n- **Tipping:** Expected in restaurants (15-20%), taxis/rideshare (15-20%), hair salons (15-20%), hotel housekeeping ($2-5/night). Not typically expected in fast food or counter service.\n- **Personal Space:** Americans value personal space — typically 2-4 feet in conversation\n- **Queuing:** Standing in line is strictly observed. Cutting in line is considered very rude.\n- **Smoking:** Prohibited in most indoor public spaces and many outdoor areas.`,
            },
            zh: {
              title: "5.3.1 美国价值观与社会礼仪",
              content: `**美国核心价值观：**\n- **个人主义** — 个人自由、自力更生和个人成就受到高度重视\n- **平等** — 相信机会平等（尽管结果不总是平等）\n- **非正式性** — 美国人倾向于随意；很快就会使用名字，即使对上司也是如此\n- **直接性** — 沟通倾向于直接和明确。"是"意味着是；"不"意味着不。\n- **时间** — 守时受到重视。开会或约会迟到被认为是不尊重的。\n\n**社交礼仪：**\n- **问候：** 在专业场合握手是标准。朋友间拥抱。"你好吗？"是问候语，不是真正的询问 — 回答"很好，谢谢！"\n- **小费：** 在餐厅（15-20%）、出租车/网约车（15-20%）、美发沙龙（15-20%）、酒店客房服务（每晚2-5美元）是预期的。快餐或柜台服务通常不需要。\n- **个人空间：** 美国人重视个人空间 — 交谈时通常保持2-4英尺\n- **排队：** 严格遵守排队规则。插队被认为非常无礼。\n- **吸烟：** 在大多数室内公共场所和许多室外区域禁止吸烟。`,
            },
          },
          {
            id: "ch5-s3-2",
            en: {
              title: "5.3.2 Holidays and Traditions",
              content: `**Federal Holidays (Banks and government offices closed):**\n- New Year's Day (Jan 1)\n- Martin Luther King Jr. Day (3rd Monday in January)\n- Presidents' Day (3rd Monday in February)\n- Memorial Day (Last Monday in May)\n- Juneteenth (June 19)\n- Independence Day (July 4)\n- Labor Day (1st Monday in September)\n- Columbus Day/Indigenous Peoples' Day (2nd Monday in October)\n- Veterans Day (November 11)\n- Thanksgiving (4th Thursday in November)\n- Christmas Day (December 25)\n\n**Cultural Celebrations:**\n- **Halloween (Oct 31)** — Costumes, trick-or-treating, decorations\n- **Thanksgiving** — Family gathering, turkey dinner, gratitude. Followed by Black Friday shopping.\n- **Christmas** — Gift-giving, decorations, family gatherings (secular and religious)\n- **Super Bowl Sunday** — Major cultural event; parties, food, commercials\n- **Fourth of July** — Fireworks, barbecues, patriotic celebrations`,
            },
            zh: {
              title: "5.3.2 节假日与传统",
              content: `**联邦假日（银行和政府办公室关闭）：**\n- 元旦（1月1日）\n- 马丁·路德·金纪念日（一月第三个星期一）\n- 总统日（二月第三个星期一）\n- 阵亡将士纪念日（五月最后一个星期一）\n- 六月节（6月19日）\n- 独立日（7月4日）\n- 劳动节（九月第一个星期一）\n- 哥伦布日/原住民日（十月第二个星期一）\n- 退伍军人节（11月11日）\n- 感恩节（十一月第四个星期四）\n- 圣诞节（12月25日）\n\n**文化庆典：**\n- **万圣节（10月31日）** — 服装、要糖、装饰\n- **感恩节** — 家庭聚会、火鸡晚餐、感恩。随后是黑色星期五购物。\n- **圣诞节** — 赠礼、装饰、家庭聚会（世俗和宗教）\n- **超级碗星期日** — 重要文化活动；派对、食物、广告\n- **7月4日** — 烟火、烧烤、爱国庆典`,
            },
          },
          {
            id: "ch5-s3-3",
            en: {
              title: "5.3.3 Community Involvement and Civic Responsibility",
              content: `**Voting** — U.S. citizens 18+ can vote in federal, state, and local elections. Register to vote at vote.gov. Voting is a right and civic duty, though not legally mandatory.\n\n**Jury Duty** — U.S. citizens may be summoned for jury service. Respond promptly; ignoring a summons can result in fines or contempt of court. Non-citizens are not eligible for jury duty.\n\n**Community Organizations** — Neighborhood associations, PTAs, religious organizations, and civic clubs (Rotary, Lions) are important social institutions. Volunteering builds community connections and can enhance your resume.\n\n**Local Government** — City council meetings, school board meetings, and planning commissions are open to the public. Residents can speak during public comment periods.\n\n**Charitable Giving** — Americans give generously to charities. Donations to 501(c)(3) organizations are tax-deductible. Platforms like GoFundMe, United Way, and local food banks are common.\n\n**Neighborhood Watch** — Community safety programs where residents look out for each other and report suspicious activity to police.`,
            },
            zh: {
              title: "5.3.3 社区参与与公民责任",
              content: `**投票** — 18岁以上的美国公民可以参加联邦、州和地方选举。在vote.gov注册投票。投票是权利和公民义务，尽管法律上不是强制性的。\n\n**陪审义务** — 美国公民可能被传唤参加陪审服务。及时回应；忽视传票可能导致罚款或藐视法庭。非公民没有资格担任陪审员。\n\n**社区组织** — 邻里协会、家长教师协会、宗教组织和公民俱乐部（扶轮社、狮子会）是重要的社会机构。志愿服务建立社区联系，并可以增强您的简历。\n\n**地方政府** — 市议会会议、学校董事会会议和规划委员会对公众开放。居民可以在公众评论期间发言。\n\n**慈善捐款** — 美国人慷慨地向慈善机构捐款。向501(c)(3)组织的捐款可以税前扣除。GoFundMe、联合劝募和当地食物银行等平台很常见。\n\n**邻里守望** — 社区安全项目，居民互相关注并向警察报告可疑活动。`,
            },
          },
        ],
      },
      {
        id: "ch5-s4",
        en: { title: "5.4 Time, Time Zones, and Daily Communication" },
        zh: { title: "5.4 时间、时区与日常沟通" },
        subsections: [
          {
            id: "ch5-s4-1",
            en: {
              title: "5.4.1 Major Time Zones in the United States",
              content: `The contiguous United States spans four main time zones:\n\n| Time Zone | Abbreviation | States (Selected) | UTC Offset (Standard) |\n|-----------|-------------|-------------------|----------------------|\n| Eastern | ET (EST/EDT) | NY, FL, GA, PA, OH, MA | UTC-5 |\n| Central | CT (CST/CDT) | TX, IL, MN, MO, TN | UTC-6 |\n| Mountain | MT (MST/MDT) | CO, AZ*, NM, UT, MT | UTC-7 |\n| Pacific | PT (PST/PDT) | CA, WA, OR, NV | UTC-8 |\n\n*Arizona does not observe Daylight Saving Time (except the Navajo Nation).\n\n**Additional Zones:**\n- Alaska Time (AKST): UTC-9\n- Hawaii-Aleutian Time (HST): UTC-10 (Hawaii does not observe DST)\n\n**Practical Tips:**\n- When scheduling meetings across time zones, always specify the time zone\n- New York (ET) is 3 hours ahead of Los Angeles (PT)\n- Most business communications default to the recipient's local time`,
            },
            zh: {
              title: "5.4.1 美国主要时区",
              content: `美国本土跨越四个主要时区：\n\n| 时区 | 缩写 | 主要州 | UTC偏移（标准时间）|\n|------|------|--------|-------------------|\n| 东部 | ET (EST/EDT) | 纽约、佛罗里达、乔治亚、宾夕法尼亚、俄亥俄、马萨诸塞 | UTC-5 |\n| 中部 | CT (CST/CDT) | 德克萨斯、伊利诺伊、明尼苏达、密苏里、田纳西 | UTC-6 |\n| 山地 | MT (MST/MDT) | 科罗拉多、亚利桑那*、新墨西哥、犹他、蒙大拿 | UTC-7 |\n| 太平洋 | PT (PST/PDT) | 加利福尼亚、华盛顿、俄勒冈、内华达 | UTC-8 |\n\n*亚利桑那州不实行夏令时（纳瓦霍族除外）。\n\n**其他时区：**\n- 阿拉斯加时间（AKST）：UTC-9\n- 夏威夷-阿留申时间（HST）：UTC-10（夏威夷不实行夏令时）\n\n**实用提示：**\n- 跨时区安排会议时，务必注明时区\n- 纽约（东部时间）比洛杉矶（太平洋时间）早3小时\n- 大多数商务沟通默认使用收件人的当地时间`,
            },
          },
          {
            id: "ch5-s4-2",
            en: {
              title: "5.4.2 Daylight Saving Time (DST) and Standard Time",
              content: `**Daylight Saving Time (DST)** — Most of the U.S. observes DST, moving clocks forward 1 hour in spring and back 1 hour in fall:\n\n- **"Spring Forward":** Second Sunday in March at 2:00 AM → clocks advance to 3:00 AM\n- **"Fall Back":** First Sunday in November at 2:00 AM → clocks revert to 1:00 AM\n\n**Memory Aid:** "Spring forward, fall back"\n\n**States NOT Observing DST:**\n- Arizona (except Navajo Nation)\n- Hawaii\n- U.S. territories: Puerto Rico, U.S. Virgin Islands, American Samoa, Guam, Northern Mariana Islands\n\n**Impact on International Communication:**\nDST changes affect time differences with other countries. For example:\n- During U.S. EDT (summer): New York is UTC-4, so 12 hours behind Beijing (UTC+8)\n- During U.S. EST (winter): New York is UTC-5, so 13 hours behind Beijing\n\n**Note:** The U.S. Congress has considered making DST permanent (Sunshine Protection Act), but as of 2024, no change has been enacted.`,
            },
            zh: {
              title: "5.4.2 夏令时与冬令时",
              content: `**夏令时（DST）** — 美国大部分地区实行夏令时，春季将时钟拨快1小时，秋季拨回1小时：\n\n- **"春天拨快"：** 三月第二个星期日凌晨2:00 → 时钟拨至3:00\n- **"秋天拨回"：** 十一月第一个星期日凌晨2:00 → 时钟拨回1:00\n\n**记忆口诀：** "春天向前拨，秋天向后拨"\n\n**不实行夏令时的州：**\n- 亚利桑那州（纳瓦霍族除外）\n- 夏威夷\n- 美国领地：波多黎各、美属维尔京群岛、美属萨摩亚、关岛、北马里亚纳群岛\n\n**对国际沟通的影响：**\n夏令时变化影响与其他国家的时差。例如：\n- 美国EDT期间（夏季）：纽约为UTC-4，比北京（UTC+8）晚12小时\n- 美国EST期间（冬季）：纽约为UTC-5，比北京晚13小时\n\n**注意：** 美国国会曾考虑永久实行夏令时（阳光保护法案），但截至2024年，尚未颁布任何变更。`,
            },
          },
          {
            id: "ch5-s4-3",
            en: {
              title: "5.4.3 Common International Time Differences",
              content: `Key time differences from U.S. Eastern Time (ET):\n\n| City/Country | Standard Time (EST, UTC-5) | Daylight Time (EDT, UTC-4) |\n|-------------|--------------------------|---------------------------|\n| Beijing/Shanghai (UTC+8) | +13 hours | +12 hours |\n| London (GMT/BST) | +5 hours | +4/5 hours* |\n| Dubai (UTC+4) | +9 hours | +8 hours |\n| Tokyo (UTC+9) | +14 hours | +13 hours |\n| Sydney (AEST, UTC+10) | +15/16 hours** | +14/15 hours** |\n| Paris/Berlin (CET, UTC+1) | +6 hours | +5/6 hours* |\n\n*UK and Europe also observe their own DST (different dates than U.S.)\n**Australia observes DST in the Southern Hemisphere summer (Oct-Apr)\n\n**Quick Reference for China-U.S. Communication:**\n- 9 AM Beijing = 8 PM previous day New York (EST) / 9 PM (EDT)\n- Best overlap window: 8-10 AM Beijing = 7-9 PM ET (previous evening)`,
            },
            zh: {
              title: "5.4.3 国际沟通常用时差",
              content: `与美国东部时间（ET）的主要时差：\n\n| 城市/国家 | 标准时间（EST，UTC-5）| 夏令时（EDT，UTC-4）|\n|---------|---------------------|-------------------|\n| 北京/上海（UTC+8）| +13小时 | +12小时 |\n| 伦敦（GMT/BST）| +5小时 | +4/5小时* |\n| 迪拜（UTC+4）| +9小时 | +8小时 |\n| 东京（UTC+9）| +14小时 | +13小时 |\n| 悉尼（AEST，UTC+10）| +15/16小时** | +14/15小时** |\n| 巴黎/柏林（CET，UTC+1）| +6小时 | +5/6小时* |\n\n*英国和欧洲也实行自己的夏令时（日期与美国不同）\n**澳大利亚在南半球夏季（10月-4月）实行夏令时\n\n**中美沟通快速参考：**\n- 北京上午9点 = 纽约前一天晚上8点（EST）/ 晚上9点（EDT）\n- 最佳重叠时段：北京上午8-10点 = 美国东部时间前一天晚上7-9点`,
            },
          },
          {
            id: "ch5-s4-4",
            en: {
              title: "5.4.4 Scheduling Across Time Zones",
              content: `**Best Practices for Cross-Time-Zone Scheduling:**\n\n1. **Always specify the time zone** — Write "3:00 PM ET" not just "3:00 PM"\n2. **Use scheduling tools** — Calendly, World Time Buddy, and Google Calendar automatically handle time zone conversions\n3. **Consider business hours** — Standard U.S. business hours are 9 AM–5 PM local time. For coast-to-coast calls, 10 AM–2 PM PT / 1–5 PM ET works for both coasts.\n4. **Meeting invitations** — Calendar invites (Google Calendar, Outlook) automatically convert to each attendee's local time zone\n5. **Confirm the date** — When scheduling across the International Date Line (e.g., U.S. to China), confirm the date as well as the time, as it may be a different calendar day\n\n**Common Scheduling Scenarios:**\n- U.S. West Coast + East Coast: 10 AM–2 PM PT is ideal\n- U.S. + China: Very limited overlap; early morning U.S. or evening China\n- U.S. + Europe: Morning U.S. ET / afternoon Europe works well\n\n**Time Zone Abbreviation Reference:**\nEST/EDT (Eastern), CST/CDT (Central), MST/MDT (Mountain), PST/PDT (Pacific)`,
            },
            zh: {
              title: "5.4.4 跨时区工作与会议安排技巧",
              content: `**跨时区安排的最佳实践：**\n\n1. **始终注明时区** — 写"下午3:00 ET"而不仅仅是"下午3:00"\n2. **使用日程安排工具** — Calendly、World Time Buddy和Google日历自动处理时区转换\n3. **考虑工作时间** — 美国标准工作时间为当地时间上午9点至下午5点。对于跨海岸通话，太平洋时间上午10点至下午2点/东部时间下午1点至5点对两个海岸都适用。\n4. **会议邀请** — 日历邀请（Google日历、Outlook）自动转换为每位与会者的当地时区\n5. **确认日期** — 跨国际日期变更线安排时（如美国至中国），确认日期和时间，因为可能是不同的日历日\n\n**常见安排场景：**\n- 美国西海岸+东海岸：太平洋时间上午10点至下午2点最理想\n- 美国+中国：重叠时间非常有限；美国清晨或中国傍晚\n- 美国+欧洲：美国东部时间上午/欧洲下午效果很好\n\n**时区缩写参考：**\nEST/EDT（东部），CST/CDT（中部），MST/MDT（山地），PST/PDT（太平洋）`,
            },
          },
        ],
      },
      {
        id: "ch5-s5",
        en: { title: "5.5 Fashion" },
        zh: { title: "5.5 时尚" },
        subsections: [
          {
            id: "ch5-s5-1",
            en: {
              title: "5.5.1 Clothing Culture and Dress Codes",
              content: `**American Dress Code Culture:**\n\n- **Business Formal:** Suit and tie for men; business suit or formal dress for women. Required in law firms, finance, and formal events.\n- **Business Casual:** Dress pants/chinos, collared shirt (no tie), blazer optional for men; blouses, slacks, or modest dresses for women. Most corporate offices.\n- **Smart Casual:** Clean jeans, polo shirts, casual blazers. Tech companies, creative agencies.\n- **Casual:** Jeans, t-shirts, sneakers. Startups, weekends, most social settings.\n- **Athleisure:** Yoga pants, athletic wear worn in everyday settings. Widely accepted in many contexts.\n\n**Regional Differences:**\n- New York and Los Angeles tend to be more fashion-forward\n- The South and Midwest tend toward more conservative dress\n- Silicon Valley is famously casual (hoodies and jeans even in boardrooms)\n\n**Dress for the Weather:** The U.S. has extreme climate variation. Layer clothing in transitional seasons. Air conditioning is very strong indoors — always carry a light layer in summer.`,
            },
            zh: {
              title: "5.5.1 服装文化与着装规范",
              content: `**美国着装规范文化：**\n\n- **商务正装：** 男士西装领带；女士商务套装或正式礼服。律师事务所、金融机构和正式活动必备。\n- **商务休闲：** 男士西裤/卡其裤、有领衬衫（不系领带）、可选西装外套；女士衬衫、长裤或保守连衣裙。大多数企业办公室。\n- **精致休闲：** 干净牛仔裤、Polo衫、休闲西装外套。科技公司、创意机构。\n- **休闲：** 牛仔裤、T恤、运动鞋。初创公司、周末、大多数社交场合。\n- **运动休闲：** 瑜伽裤、运动服在日常场合穿着。在许多情境中被广泛接受。\n\n**地区差异：**\n- 纽约和洛杉矶往往更时尚前卫\n- 南部和中西部往往更保守\n- 硅谷以休闲著称（即使在董事会也穿连帽衫和牛仔裤）\n\n**根据天气着装：** 美国气候变化极大。换季时分层穿衣。室内空调非常强劲 — 夏季始终携带轻薄外套。`,
            },
          },
          {
            id: "ch5-s5-2",
            en: {
              title: "5.5.2 Common Clothing Retail Stores",
              content: `**Department Stores:** Nordstrom (upscale), Macy's (mid-range), JCPenney (value), Kohl's (value)\n\n**Fast Fashion / Affordable:** H&M, Zara, SHEIN (online), Forever 21, Old Navy, Gap, Banana Republic\n\n**American Classics:** Ralph Lauren, Tommy Hilfiger, Calvin Klein, Levi's (jeans), Wrangler\n\n**Outdoor / Activewear:** REI (outdoor gear), Patagonia, The North Face, Columbia, Under Armour, Nike, Adidas, Lululemon\n\n**Discount / Off-Price:** TJ Maxx, Marshalls, Ross Dress for Less, Burlington — offer brand-name clothing at 20-60% off retail\n\n**Luxury:** Neiman Marcus, Saks Fifth Avenue, Bloomingdale's\n\n**Online:** Amazon Fashion, ASOS, Zappos (shoes + clothing), ThredUp (secondhand), Poshmark (secondhand)\n\n**Warehouse Clubs:** Costco and Sam's Club carry basic clothing at low prices\n\n**Tip:** Sign up for store email lists to receive coupons and sale notifications. Most stores offer student discounts with a valid .edu email address.`,
            },
            zh: {
              title: "5.5.2 常见服装零售商店",
              content: `**百货商店：** Nordstrom（高端）、Macy's（中档）、JCPenney（实惠）、Kohl's（实惠）\n\n**快时尚/平价：** H&M、Zara、SHEIN（在线）、Forever 21、Old Navy、Gap、Banana Republic\n\n**美国经典品牌：** Ralph Lauren、Tommy Hilfiger、Calvin Klein、Levi's（牛仔裤）、Wrangler\n\n**户外/运动服：** REI（户外装备）、Patagonia、The North Face、Columbia、Under Armour、Nike、Adidas、Lululemon\n\n**折扣/特价：** TJ Maxx、Marshalls、Ross Dress for Less、Burlington — 以低于零售价20-60%的价格提供品牌服装\n\n**奢侈品：** Neiman Marcus、Saks Fifth Avenue、Bloomingdale's\n\n**在线：** Amazon Fashion、ASOS、Zappos（鞋类+服装）、ThredUp（二手）、Poshmark（二手）\n\n**仓储会员店：** Costco和Sam's Club以低价销售基本服装\n\n**提示：** 订阅商店电子邮件列表以接收优惠券和促销通知。大多数商店凭有效的.edu电子邮件地址提供学生折扣。`,
            },
          },
          {
            id: "ch5-s5-3",
            en: {
              title: "5.5.3 Shoes Stores and Footwear Shopping",
              content: `**Major Shoe Retailers:**\n- **DSW (Designer Shoe Warehouse)** — Wide selection of brand-name shoes at moderate prices. Good for dress shoes and casual footwear.\n- **Famous Footwear** — Family-oriented, affordable. Good for everyday and athletic shoes.\n- **Nordstrom Rack** — Off-price Nordstrom. Excellent deals on quality footwear.\n- **Saks Off 5th** — Off-price Saks. Designer shoes at reduced prices.\n- **Fleet Feet** — Specialty running store with professional fitting services. Staff analyze your gait to recommend the right running shoe.\n\n**Athletic Footwear:** Nike, Adidas, New Balance, Brooks, ASICS, Saucony (running), HOKA (cushioned running/walking)\n\n**Work/Dress Shoes:** Allen Edmonds, Johnston & Murphy, Cole Haan, Steve Madden\n\n**Boot Brands:** Timberland, UGG, Sorel (winter), Ariat (western/work)\n\n**Online:** Zappos (excellent return policy — free returns within 365 days), Amazon, 6pm.com (Zappos outlet)`,
            },
            zh: {
              title: "5.5.3 鞋店与鞋类购物",
              content: `**主要鞋类零售商：**\n- **DSW（设计师鞋仓）** — 以适中价格提供品牌鞋的广泛选择。适合正装鞋和休闲鞋。\n- **Famous Footwear** — 面向家庭，价格实惠。适合日常和运动鞋。\n- **Nordstrom Rack** — Nordstrom特价店。优质鞋类的优惠。\n- **Saks Off 5th** — Saks特价店。折扣价设计师鞋。\n- **Fleet Feet** — 专业跑步鞋店，提供专业试穿服务。工作人员分析您的步态以推荐合适的跑步鞋。\n\n**运动鞋：** Nike、Adidas、New Balance、Brooks、ASICS、Saucony（跑步）、HOKA（缓震跑步/步行）\n\n**工作/正装鞋：** Allen Edmonds、Johnston & Murphy、Cole Haan、Steve Madden\n\n**靴子品牌：** Timberland、UGG、Sorel（冬季）、Ariat（西部/工作）\n\n**在线：** Zappos（优秀退货政策 — 365天内免费退货）、Amazon、6pm.com（Zappos折扣店）`,
            },
          },
          {
            id: "ch5-s5-4",
            en: {
              title: "5.5.4 Clothing Sizes and Fitting",
              content: `**U.S. Clothing Size Systems:**\n\n**Women's Tops/Dresses:** XS, S, M, L, XL, XXL or numeric (0, 2, 4, 6, 8, 10, 12, 14...)\n\n**Men's Dress Shirts:** Neck size (inches) + sleeve length (e.g., 15.5/32-33)\n\n**Pants:** Waist (inches) × Inseam length (e.g., 32×30)\n\n**Shoes:**\n| U.S. Men's | U.S. Women's | EU | UK | CM |\n|-----------|-------------|----|----|----|\n| 7 | 8.5 | 40 | 6 | 25 |\n| 8 | 9.5 | 41 | 7 | 26 |\n| 9 | 10.5 | 42 | 8 | 27 |\n| 10 | 11.5 | 43 | 9 | 28 |\n| 11 | 12.5 | 44 | 10 | 29 |\n| 12 | 13.5 | 46 | 11 | 30 |\n\n**Tip:** Sizes vary significantly between brands. Always try before buying or check the brand's specific size chart. Many stores offer free alterations on dress clothes.`,
            },
            zh: {
              title: "5.5.4 服装尺码与试穿",
              content: `**美国服装尺码系统：**\n\n**女装上衣/连衣裙：** XS、S、M、L、XL、XXL或数字（0、2、4、6、8、10、12、14...）\n\n**男士正装衬衫：** 领围（英寸）+袖长（例如15.5/32-33）\n\n**裤子：** 腰围（英寸）×内缝长度（例如32×30）\n\n**鞋码：**\n| 美国男码 | 美国女码 | 欧码 | 英码 | 厘米 |\n|--------|--------|------|------|------|\n| 7 | 8.5 | 40 | 6 | 25 |\n| 8 | 9.5 | 41 | 7 | 26 |\n| 9 | 10.5 | 42 | 8 | 27 |\n| 10 | 11.5 | 43 | 9 | 28 |\n| 11 | 12.5 | 44 | 10 | 29 |\n| 12 | 13.5 | 46 | 11 | 30 |\n\n**提示：** 不同品牌之间尺码差异显著。购买前务必试穿或查看品牌的具体尺码表。许多商店对正装提供免费修改服务。`,
            },
          },
          {
            id: "ch5-s5-5",
            en: {
              title: "5.5.5 Seasonal Sales and Shopping Tips",
              content: `**Major U.S. Shopping Events:**\n- **Black Friday** (day after Thanksgiving) — Biggest shopping day of the year. Massive discounts on electronics, clothing, appliances.\n- **Cyber Monday** (Monday after Thanksgiving) — Online deals, often better than Black Friday for tech.\n- **Amazon Prime Day** (July) — 48-hour sale for Prime members. Electronics and home goods.\n- **End-of-Season Sales** — January (winter clearance), July (summer clearance). Best time to buy off-season clothing at 50-70% off.\n- **Back to School** (August) — Clothing, shoes, and school supplies discounted.\n- **Memorial Day / Labor Day / Presidents' Day** — Major sales on furniture, mattresses, appliances, and cars.\n\n**Smart Shopping Tips:**\n- Use price tracking tools: CamelCamelCamel (Amazon), Honey browser extension\n- Stack coupons: Store coupon + manufacturer coupon + cashback app (Rakuten, Ibotta)\n- Price match: Many stores (Target, Best Buy, Walmart) will match competitor prices\n- Return policies: Know the return window before buying. Most stores: 30-90 days with receipt.`,
            },
            zh: {
              title: "5.5.5 季节性促销与购物技巧",
              content: `**美国主要购物活动：**\n- **黑色星期五**（感恩节次日）— 一年中最大的购物日。电子产品、服装、家电大幅折扣。\n- **网络星期一**（感恩节后的星期一）— 在线优惠，科技产品往往比黑色星期五更好。\n- **亚马逊Prime Day**（7月）— Prime会员48小时特卖。电子产品和家居用品。\n- **季末清仓** — 1月（冬季清仓）、7月（夏季清仓）。以5-7折购买反季服装的最佳时机。\n- **返校季**（8月）— 服装、鞋类和学习用品打折。\n- **阵亡将士纪念日/劳动节/总统日** — 家具、床垫、家电和汽车大促销。\n\n**聪明购物技巧：**\n- 使用价格追踪工具：CamelCamelCamel（亚马逊）、Honey浏览器扩展\n- 叠加优惠券：商店优惠券+制造商优惠券+返现应用（Rakuten、Ibotta）\n- 价格匹配：许多商店（Target、Best Buy、沃尔玛）会匹配竞争对手价格\n- 退货政策：购买前了解退货时限。大多数商店：凭收据30-90天。`,
            },
          },
          {
            id: "ch5-s5-6",
            en: {
              title: "5.5.6 Personal Style and Self-Expression",
              content: `American fashion culture strongly values individual self-expression:\n\n**Diversity of Styles:** The U.S. is a melting pot of fashion influences — from preppy East Coast to laid-back West Coast, from Southern charm to urban streetwear. There is no single "American style."\n\n**Cultural Dress:** Wearing traditional clothing from your home country is generally respected and celebrated in multicultural communities. Cultural events and festivals are great occasions to showcase traditional dress.\n\n**Workplace Dress Code Evolution:** Post-COVID, many workplaces have adopted more casual dress codes. When in doubt, observe what colleagues wear and ask HR about the dress code policy.\n\n**Sustainable Fashion:** Growing movement toward secondhand shopping (ThredUp, Poshmark, Depop), clothing swaps, and ethical brands. Younger Americans particularly value sustainability.\n\n**Body Positivity:** American fashion increasingly embraces diverse body types. Plus-size fashion is widely available at mainstream retailers.\n\n**Hair and Grooming:** Natural hairstyles, including locs, braids, and afros, are protected from discrimination in many states under the CROWN Act.`,
            },
            zh: {
              title: "5.5.6 个人风格与自我表达",
              content: `美国时尚文化强烈重视个人自我表达：\n\n**风格多样性：** 美国是时尚影响的大熔炉 — 从东海岸的学院风到西海岸的休闲风，从南部魅力到城市街头风。没有单一的"美国风格"。\n\n**文化服装：** 在多元文化社区，穿着来自故乡的传统服装通常受到尊重和赞赏。文化活动和节日是展示传统服装的好时机。\n\n**职场着装规范演变：** COVID后，许多工作场所采用了更休闲的着装规范。如有疑问，观察同事的穿着并向HR询问着装规范政策。\n\n**可持续时尚：** 二手购物（ThredUp、Poshmark、Depop）、服装交换和道德品牌的运动日益增长。年轻美国人尤其重视可持续性。\n\n**身体积极性：** 美国时尚越来越接受多样化的体型。加大码时尚在主流零售商中广泛提供。\n\n**发型与仪容：** 包括锁辫、辫子和自然卷发在内的自然发型在许多州受到CROWN法案的歧视保护。`,
            },
          },
        ],
      },
    ],
  },
  {
    id: "ch6",
    number: 6,
    en: { title: "Common Sense", subtitle: "Practical knowledge for everyday life in the U.S." },
    zh: { title: "常识", subtitle: "美国日常生活的实用知识" },
    sections: [
      {
        id: "ch6-s1",
        en: { title: "6.1 Political and Civic Basics" },
        zh: { title: "6.1 政治与公民基础" },
        subsections: [
          {
            id: "ch6-s1-1",
            en: {
              title: "6.1.1 State Governors and Political Landscape",
              content: `**U.S. Political Structure:**\nThe United States has a federal system with power divided between the federal government and 50 state governments. Each state has its own governor, legislature, and court system.\n\n**Political Parties:**\n- **Republican Party (GOP)** — Generally favors limited government, lower taxes, traditional values, and strong national defense\n- **Democratic Party** — Generally favors expanded government services, progressive social policies, and environmental regulation\n\n**Current Landscape (as of late 2025):**\nThe U.S. has 26 Republican governors and 24 Democratic governors, reflecting a roughly even national political balance.\n\n**Key Elected Offices:**\n- President and Vice President (federal, 4-year term)\n- U.S. Senators (2 per state, 6-year terms)\n- U.S. Representatives (based on population, 2-year terms)\n- State Governors (4-year terms in most states)\n- State Legislators, Mayors, City Council Members, School Board Members\n\n**Non-Partisan Offices:** Many local positions (judges, school boards) are officially non-partisan, though candidates may have party affiliations.`,
            },
            zh: {
              title: "6.1.1 州长与政治格局",
              content: `**美国政治结构：**\n美国实行联邦制，权力在联邦政府和50个州政府之间分配。每个州都有自己的州长、立法机构和法院系统。\n\n**政党：**\n- **共和党（GOP）** — 通常支持有限政府、降低税收、传统价值观和强大的国防\n- **民主党** — 通常支持扩大政府服务、进步的社会政策和环境监管\n\n**当前格局（截至2025年底）：**\n美国有26位共和党州长和24位民主党州长，反映了大致均衡的全国政治格局。\n\n**主要选举职位：**\n- 总统和副总统（联邦，4年任期）\n- 美国参议员（每州2名，6年任期）\n- 美国众议员（基于人口，2年任期）\n- 州长（大多数州4年任期）\n- 州立法委员、市长、市议会成员、学校委员会成员\n\n**非党派职位：** 许多地方职位（法官、学校委员会）官方上是非党派的，尽管候选人可能有党派关系。`,
            },
          },
        ],
      },
    ],
  },
  {
    id: "ch7",
    number: 7,
    en: { title: "Professional Knowledge", subtitle: "Industry-specific knowledge and professional insights" },
    zh: { title: "专业知识", subtitle: "行业专业知识与职业洞察" },
    sections: [
      {
        id: "ch7-s1",
        en: { title: "7.1 Aviation" },
        zh: { title: "7.1 航空" },
        subsections: [
          {
            id: "ch7-s1-1",
            en: {
              title: "7.1.1 Major U.S. Airlines and Aviation Basics",
              content: `**Major U.S. Airlines:**\n- **United Airlines** — Hub-and-spoke network centered on Chicago O'Hare, Houston, Newark, Denver, San Francisco, Los Angeles\n- **Delta Air Lines** — Hubs in Atlanta (world's busiest airport), Minneapolis, Detroit, New York (JFK/LGA), Seattle, Salt Lake City\n- **American Airlines** — Hubs in Dallas/Fort Worth, Charlotte, Philadelphia, Miami, Chicago O'Hare, Phoenix, New York (JFK/LGA)\n\n**Aviation Safety Knowledge:**\n\n**PAPI (Precision Approach Path Indicator):** A visual approach slope indicator system using four lights to guide pilots on the correct glide path:\n- **4 White lights** — Too high (significantly above glide path)\n- **2 White + 2 Red** — Correct glide path ("2 white, 2 red, you're ahead")\n- **4 Red lights** — Too low (dangerously below glide path)\n\n**Glide Slope:** The standard instrument approach glide slope is typically 3 degrees. The PAPI system helps visual confirmation of this angle.\n\n**Airport Codes:** U.S. airports use 3-letter IATA codes (JFK = John F. Kennedy, LAX = Los Angeles, ORD = Chicago O'Hare, ATL = Atlanta, SFO = San Francisco).`,
            },
            zh: {
              title: "7.1.1 美国主要航空公司与航空基础知识",
              content: `**美国主要航空公司：**\n- **美联航（United Airlines）** — 枢纽网络以芝加哥奥黑尔、休斯顿、纽瓦克、丹佛、旧金山、洛杉矶为中心\n- **达美航空（Delta Air Lines）** — 枢纽在亚特兰大（全球最繁忙机场）、明尼阿波利斯、底特律、纽约（JFK/LGA）、西雅图、盐湖城\n- **美国航空（American Airlines）** — 枢纽在达拉斯/沃思堡、夏洛特、费城、迈阿密、芝加哥奥黑尔、凤凰城、纽约（JFK/LGA）\n\n**航空安全知识：**\n\n**PAPI（精密进近坡度指示器）：** 使用四盏灯引导飞行员在正确下滑道上的视觉进近坡度指示系统：\n- **4白灯** — 过高（明显高于下滑道）\n- **2白+2红** — 正确下滑道（"2白2红，位置正确"）\n- **4红灯** — 过低（危险地低于下滑道）\n\n**下滑道：** 标准仪表进近下滑道通常为3度。PAPI系统帮助视觉确认此角度。\n\n**机场代码：** 美国机场使用3字母IATA代码（JFK=肯尼迪、LAX=洛杉矶、ORD=芝加哥奥黑尔、ATL=亚特兰大、SFO=旧金山）。`,
            },
          },
        ],
      },
    ],
  },
  {
    id: "ch8",
    number: 8,
    en: { title: "Geographical Knowledge", subtitle: "U.S. regions, states, cities, climate, and navigation" },
    zh: { title: "地理知识", subtitle: "美国区域、各州、城市、气候与导航" },
    sections: [
      {
        id: "ch8-s1",
        en: { title: "8.1 U.S. Regions and Major Cities" },
        zh: { title: "8.1 美国区域与主要城市" },
        subsections: [
          {
            id: "ch8-s1-1",
            en: {
              title: "8.1.1 The Northeast",
              content: `**The Northeast** is the most densely populated region, home to the original colonies and major financial/cultural centers:\n\n**New England:** Maine, New Hampshire, Vermont, Massachusetts, Rhode Island, Connecticut\n- Known for fall foliage, colonial history, prestigious universities (Harvard, MIT, Yale)\n- Major cities: Boston (MA), Providence (RI), Hartford (CT)\n\n**Mid-Atlantic:** New York, New Jersey, Pennsylvania, Delaware, Maryland\n- **New York City** — The largest U.S. city (8.3M city, 20M metro). Global financial, media, and cultural capital. Five boroughs: Manhattan, Brooklyn, Queens, The Bronx, Staten Island.\n- **Philadelphia** — "The City of Brotherly Love." Historic significance (Independence Hall, Liberty Bell). Major healthcare and education hub.\n- **Washington D.C.** — Federal capital (not a state). Home to the White House, Congress, Supreme Court, Smithsonian museums (free admission).\n- **Baltimore** — Major port city in Maryland, known for the Inner Harbor and Johns Hopkins University.`,
            },
            zh: {
              title: "8.1.1 东北部",
              content: `**东北部**是人口最密集的地区，是最初殖民地和主要金融/文化中心的所在地：\n\n**新英格兰：** 缅因州、新罕布什尔州、佛蒙特州、马萨诸塞州、罗德岛州、康涅狄格州\n- 以秋叶景色、殖民地历史、著名大学（哈佛、麻省理工、耶鲁）闻名\n- 主要城市：波士顿（马萨诸塞州）、普罗维登斯（罗德岛州）、哈特福德（康涅狄格州）\n\n**中大西洋：** 纽约州、新泽西州、宾夕法尼亚州、特拉华州、马里兰州\n- **纽约市** — 美国最大城市（城市830万，都会区2000万）。全球金融、媒体和文化之都。五个行政区：曼哈顿、布鲁克林、皇后区、布朗克斯、斯塔滕岛。\n- **费城** — "兄弟之爱之城"。历史意义重大（独立厅、自由钟）。主要医疗和教育中心。\n- **华盛顿特区** — 联邦首都（非州）。白宫、国会、最高法院、史密森尼博物馆（免费入场）所在地。\n- **巴尔的摩** — 马里兰州主要港口城市，以内港和约翰斯·霍普金斯大学闻名。`,
            },
          },
          {
            id: "ch8-s1-2",
            en: {
              title: "8.1.2 The South and Midwest",
              content: `**The South** (Virginia, North Carolina, South Carolina, Georgia, Florida, Alabama, Mississippi, Tennessee, Kentucky, Arkansas, Louisiana, Texas, Oklahoma):\n- **Atlanta, GA** — Major business hub, home to Delta Air Lines, Coca-Cola, CNN, CDC. Hartsfield-Jackson is the world's busiest airport.\n- **Miami, FL** — Gateway to Latin America. Diverse, bilingual city. Major finance, tourism, and arts scene.\n- **Houston, TX** — Energy capital of the world. NASA Johnson Space Center. Extremely diverse population.\n- **Dallas/Fort Worth, TX** — Major business and logistics hub. American Airlines headquarters.\n- **Nashville, TN** — Country music capital. Growing tech and healthcare hub.\n\n**The Midwest** (Ohio, Michigan, Indiana, Illinois, Wisconsin, Minnesota, Iowa, Missouri, North Dakota, South Dakota, Nebraska, Kansas):\n- **Chicago, IL** — Third-largest U.S. city. Major financial, cultural, and transportation hub. Known for architecture, deep-dish pizza, and the Blues.\n- **Detroit, MI** — Automotive industry capital. Home to Ford, GM, Stellantis.\n- **Minneapolis-St. Paul, MN** — Twin Cities. Major corporate headquarters (Target, Best Buy, 3M, General Mills).\n- **St. Louis, MO** — Gateway Arch, major transportation crossroads. Note: St. Louis is in Missouri, not Illinois.`,
            },
            zh: {
              title: "8.1.2 南部与中西部",
              content: `**南部**（弗吉尼亚州、北卡罗来纳州、南卡罗来纳州、乔治亚州、佛罗里达州、阿拉巴马州、密西西比州、田纳西州、肯塔基州、阿肯色州、路易斯安那州、德克萨斯州、俄克拉荷马州）：\n- **亚特兰大（乔治亚州）** — 主要商业中心，达美航空、可口可乐、CNN、疾控中心所在地。哈茨菲尔德-杰克逊是全球最繁忙机场。\n- **迈阿密（佛罗里达州）** — 通往拉丁美洲的门户。多元化、双语城市。主要金融、旅游和艺术场景。\n- **休斯顿（德克萨斯州）** — 世界能源之都。NASA约翰逊航天中心。人口极为多元化。\n- **达拉斯/沃思堡（德克萨斯州）** — 主要商业和物流中心。美国航空总部。\n- **纳什维尔（田纳西州）** — 乡村音乐之都。不断发展的科技和医疗中心。\n\n**中西部**（俄亥俄州、密歇根州、印第安纳州、伊利诺伊州、威斯康星州、明尼苏达州、爱荷华州、密苏里州、北达科他州、南达科他州、内布拉斯加州、堪萨斯州）：\n- **芝加哥（伊利诺伊州）** — 美国第三大城市。主要金融、文化和交通中心。以建筑、深盘披萨和蓝调音乐闻名。\n- **底特律（密歇根州）** — 汽车工业之都。福特、通用汽车、斯特兰蒂斯所在地。\n- **明尼阿波利斯-圣保罗（明尼苏达州）** — 双子城。主要企业总部（Target、Best Buy、3M、通用磨坊）。\n- **圣路易斯（密苏里州）** — 拱门、主要交通枢纽。注意：圣路易斯在密苏里州，不在伊利诺伊州。`,
            },
          },
          {
            id: "ch8-s1-3",
            en: {
              title: "8.1.3 The West",
              content: `**The Mountain West** (Montana, Idaho, Wyoming, Colorado, Utah, Nevada, Arizona, New Mexico):\n- **Denver, CO** — Mile-High City. Gateway to Rocky Mountain skiing and outdoor recreation. Growing tech hub.\n- **Las Vegas, NV** — Entertainment capital. Major conventions (CES, NAB). No state income tax.\n- **Phoenix, AZ** — One of the fastest-growing cities. Hot desert climate. No state income tax.\n- **Salt Lake City, UT** — Headquarters of The Church of Jesus Christ of Latter-day Saints. Outdoor recreation gateway.\n\n**The Pacific Coast** (Washington, Oregon, California, Alaska, Hawaii):\n- **Los Angeles, CA** — Entertainment industry (Hollywood). Second-largest U.S. city. Sprawling, car-dependent.\n- **San Francisco Bay Area, CA** — Silicon Valley (tech industry). High cost of living. Includes San Jose, Oakland, Berkeley.\n- **Seattle, WA** — Amazon, Microsoft, Boeing headquarters. Coffee culture (Starbucks founded here). Rainy climate.\n- **Portland, OR** — Known for progressive culture, craft beer, and outdoor lifestyle.\n- **Honolulu, HI** — State capital of Hawaii. Tropical paradise, major tourism.\n- **Anchorage, AK** — Largest city in Alaska. Extreme wilderness and wildlife.`,
            },
            zh: {
              title: "8.1.3 西部",
              content: `**山地西部**（蒙大拿州、爱达荷州、怀俄明州、科罗拉多州、犹他州、内华达州、亚利桑那州、新墨西哥州）：\n- **丹佛（科罗拉多州）** — 英里高城。通往落基山滑雪和户外休闲的门户。不断发展的科技中心。\n- **拉斯维加斯（内华达州）** — 娱乐之都。主要会议（CES、NAB）。无州所得税。\n- **凤凰城（亚利桑那州）** — 增长最快的城市之一。炎热沙漠气候。无州所得税。\n- **盐湖城（犹他州）** — 耶稣基督后期圣徒教会总部。户外休闲门户。\n\n**太平洋海岸**（华盛顿州、俄勒冈州、加利福尼亚州、阿拉斯加州、夏威夷州）：\n- **洛杉矶（加利福尼亚州）** — 娱乐产业（好莱坞）。美国第二大城市。广阔、依赖汽车。\n- **旧金山湾区（加利福尼亚州）** — 硅谷（科技产业）。生活成本高。包括圣何塞、奥克兰、伯克利。\n- **西雅图（华盛顿州）** — 亚马逊、微软、波音总部。咖啡文化（星巴克在此创立）。多雨气候。\n- **波特兰（俄勒冈州）** — 以进步文化、精酿啤酒和户外生活方式闻名。\n- **火奴鲁鲁（夏威夷州）** — 夏威夷州首府。热带天堂，主要旅游目的地。\n- **安克雷奇（阿拉斯加州）** — 阿拉斯加最大城市。极端荒野和野生动物。`,
            },
          },
        ],
      },
      {
        id: "ch8-s2",
        en: { title: "8.2 States and Their Characteristics" },
        zh: { title: "8.2 各州特点概述" },
        subsections: [
          {
            id: "ch8-s2-1",
            en: {
              title: "8.2.1 Key State Facts for Immigrants",
              content: `**States Most Popular with Immigrants:**\n\n| State | Key Cities | Notable For | State Tax |\n|-------|-----------|-------------|----------|\n| California | LA, SF, San Jose | Tech, entertainment, agriculture | Up to 13.3% |\n| Texas | Houston, Dallas, Austin | Energy, tech, no income tax | None |\n| New York | NYC, Buffalo | Finance, media, culture | Up to 10.9% |\n| Florida | Miami, Orlando, Tampa | Tourism, retirees, no income tax | None |\n| New Jersey | Newark, Jersey City | NYC suburb, pharma | Up to 10.75% |\n| Illinois | Chicago | Finance, manufacturing | Up to 4.95% |\n| Washington | Seattle, Bellevue | Tech (Amazon, Microsoft) | None |\n| Massachusetts | Boston, Cambridge | Education, biotech, finance | 5% flat |\n| Virginia | Northern VA, Richmond | Federal contractors, tech | Up to 5.75% |\n| Georgia | Atlanta | Business hub, film industry | Up to 5.75% |\n\n**Note:** State selection significantly impacts your tax burden, cost of living, job market, and quality of life. Research thoroughly before relocating.`,
            },
            zh: {
              title: "8.2.1 移民重要州份概况",
              content: `**移民最多的州：**\n\n| 州 | 主要城市 | 特点 | 州税 |\n|----|---------|------|------|\n| 加利福尼亚 | 洛杉矶、旧金山、圣何塞 | 科技、娱乐、农业 | 最高13.3% |\n| 德克萨斯 | 休斯顿、达拉斯、奥斯汀 | 能源、科技、无所得税 | 无 |\n| 纽约 | 纽约市、布法罗 | 金融、媒体、文化 | 最高10.9% |\n| 佛罗里达 | 迈阿密、奥兰多、坦帕 | 旅游、退休人员、无所得税 | 无 |\n| 新泽西 | 纽瓦克、泽西城 | 纽约郊区、制药 | 最高10.75% |\n| 伊利诺伊 | 芝加哥 | 金融、制造业 | 最高4.95% |\n| 华盛顿 | 西雅图、贝尔维尤 | 科技（亚马逊、微软） | 无 |\n| 马萨诸塞 | 波士顿、剑桥 | 教育、生物科技、金融 | 5%统一税率 |\n| 弗吉尼亚 | 北弗吉尼亚、里士满 | 联邦承包商、科技 | 最高5.75% |\n| 乔治亚 | 亚特兰大 | 商业中心、电影产业 | 最高5.75% |\n\n**注意：** 州的选择对您的税负、生活成本、就业市场和生活质量有重大影响。搬迁前请彻底研究。`,
            },
          },
        ],
      },
      {
        id: "ch8-s3",
        en: { title: "8.3 Maps and Navigation Basics" },
        zh: { title: "8.3 地图与基础导航知识" },
        subsections: [
          {
            id: "ch8-s3-1",
            en: {
              title: "8.3.1 Navigation Tools and Address System",
              content: `**Navigation Apps:**\n- **Google Maps** — Most comprehensive. Real-time traffic, transit directions, street view, business reviews.\n- **Apple Maps** — Integrated with iOS. Improving rapidly. Good for iPhone users.\n- **Waze** — Community-based traffic and navigation. Best for driving in heavy traffic.\n- **Transit** — Best app for public transportation navigation in cities.\n\n**U.S. Address System:**\nU.S. addresses follow a structured format:\n[House Number] [Street Name] [Street Type], [City], [State Abbreviation] [ZIP Code]\n\nExample: 123 Main Street, Springfield, IL 62701\n\n**Street Types:** St (Street), Ave (Avenue), Blvd (Boulevard), Dr (Drive), Rd (Road), Ln (Lane), Ct (Court), Pl (Place), Hwy (Highway)\n\n**ZIP Codes:** 5-digit postal codes identifying delivery areas. ZIP+4 (e.g., 62701-1234) provides more precise location.\n\n**Interstate Highway System:** Odd-numbered interstates run north-south (I-95 on East Coast, I-5 on West Coast). Even-numbered run east-west (I-10 in the South, I-90 in the North). Three-digit interstates (I-495, I-285) are beltways or spurs around cities.`,
            },
            zh: {
              title: "8.3.1 导航工具与地址系统",
              content: `**导航应用：**\n- **Google地图** — 最全面。实时交通、公共交通路线、街景、商业评价。\n- **苹果地图** — 与iOS集成。快速改进中。适合iPhone用户。\n- **Waze** — 基于社区的交通和导航。最适合在拥堵交通中驾驶。\n- **Transit** — 城市公共交通导航的最佳应用。\n\n**美国地址系统：**\n美国地址遵循结构化格式：\n[门牌号] [街道名称] [街道类型], [城市], [州缩写] [邮政编码]\n\n示例：123 Main Street, Springfield, IL 62701\n\n**街道类型：** St（街道）、Ave（大道）、Blvd（林荫大道）、Dr（车道）、Rd（公路）、Ln（小巷）、Ct（庭院）、Pl（广场）、Hwy（高速公路）\n\n**邮政编码：** 5位数字邮政编码，标识投递区域。ZIP+4（如62701-1234）提供更精确的位置。\n\n**州际公路系统：** 奇数州际公路南北走向（东海岸I-95，西海岸I-5）。偶数州际公路东西走向（南部I-10，北部I-90）。三位数州际公路（I-495、I-285）是城市周围的环形公路或支线。`,
            },
          },
        ],
      },
      {
        id: "ch8-s4",
        en: { title: "8.4 Climate and Natural Features" },
        zh: { title: "8.4 气候与自然地理特征" },
        subsections: [
          {
            id: "ch8-s4-1",
            en: {
              title: "8.4.1 U.S. Climate Zones",
              content: `The U.S. encompasses virtually every climate type:\n\n**Northeast/Midwest:** Humid continental climate. Hot summers, cold winters with significant snowfall. Four distinct seasons.\n\n**Southeast:** Humid subtropical. Hot, humid summers; mild winters. Hurricane season June-November (Florida, Gulf Coast, Carolinas).\n\n**Florida:** Subtropical to tropical. Two seasons: wet (May-October) and dry (November-April). Hurricane risk.\n\n**Great Plains:** Semi-arid. Extreme temperature swings. "Tornado Alley" (Kansas, Oklahoma, Texas, Nebraska) — peak tornado season April-June.\n\n**Southwest:** Desert climate (Arizona, Nevada, New Mexico). Very hot summers (Phoenix regularly exceeds 110°F/43°C), mild winters. Low humidity.\n\n**Pacific Coast:** Mediterranean climate in California (dry summers, mild wet winters). Marine climate in Pacific Northwest (Seattle, Portland) — mild, cloudy, rainy.\n\n**Mountain West:** Alpine climate at elevation. Cold winters with heavy snow (great for skiing). Mild summers.\n\n**Alaska:** Subarctic to arctic. Extreme cold winters. Midnight sun in summer.\n\n**Hawaii:** Tropical. Warm year-round. Trade winds moderate temperatures.`,
            },
            zh: {
              title: "8.4.1 美国气候带",
              content: `美国几乎涵盖所有气候类型：\n\n**东北部/中西部：** 湿润大陆性气候。夏季炎热，冬季寒冷多雪。四季分明。\n\n**东南部：** 湿润亚热带气候。夏季炎热潮湿，冬季温和。飓风季节6月至11月（佛罗里达、墨西哥湾沿岸、卡罗来纳）。\n\n**佛罗里达：** 亚热带至热带气候。两个季节：雨季（5月至10月）和旱季（11月至4月）。飓风风险。\n\n**大平原：** 半干旱气候。温度变化极端。"龙卷风走廊"（堪萨斯、俄克拉荷马、德克萨斯、内布拉斯加）— 龙卷风高峰季节4月至6月。\n\n**西南部：** 沙漠气候（亚利桑那、内华达、新墨西哥）。夏季非常炎热（凤凰城经常超过110°F/43°C），冬季温和。湿度低。\n\n**太平洋海岸：** 加利福尼亚地中海气候（夏季干燥，冬季温和多雨）。太平洋西北部（西雅图、波特兰）海洋性气候 — 温和、多云、多雨。\n\n**山地西部：** 高海拔高山气候。冬季寒冷多雪（滑雪胜地）。夏季温和。\n\n**阿拉斯加：** 亚北极至北极气候。冬季极寒。夏季极昼。\n\n**夏威夷：** 热带气候。全年温暖。信风调节气温。`,
            },
          },
        ],
      },
      {
        id: "ch8-s5",
        en: { title: "8.5 Understanding Locations: States and Cities (Case Study)" },
        zh: { title: "8.5 地理位置认知：州与城市（案例学习）" },
        subsections: [
          {
            id: "ch8-s5-1",
            en: {
              title: "8.5.1 Case Study: St. Louis and Missouri",
              content: `**St. Louis, Missouri — A Geographic Case Study:**\n\nSt. Louis is a major city in the state of Missouri, located on the western bank of the Mississippi River, directly across from Illinois. This is a common source of geographic confusion because:\n\n1. **The Gateway Arch** (officially the Gateway Arch National Park) sits on the Missouri side of the Mississippi River, in St. Louis, Missouri — not in Illinois\n2. **East St. Louis** is a separate, smaller city located in Illinois, across the river from St. Louis, Missouri\n3. The Mississippi River forms the border between Missouri (west) and Illinois (east) at this location\n\n**Key Facts about St. Louis:**\n- Population: ~2.8 million (metro area)\n- Known for: Gateway Arch, Cardinals baseball, Blues hockey, Anheuser-Busch (Budweiser), Washington University, Saint Louis University\n- Time Zone: Central Time (CST/CDT)\n- Airport: Lambert-St. Louis International Airport (STL)\n\n**Lesson:** When someone says "St. Louis," they mean the city in Missouri. "East St. Louis" refers to the Illinois city across the river. Always verify which state a city is in when planning travel or business.`,
            },
            zh: {
              title: "8.5.1 案例学习：圣路易斯与密苏里州",
              content: `**圣路易斯，密苏里州 — 地理案例学习：**\n\n圣路易斯是密苏里州的主要城市，位于密西西比河西岸，与伊利诺伊州直接相对。这是一个常见的地理混淆来源，因为：\n\n1. **拱门**（正式名称为拱门国家公园）位于密西西比河密苏里州一侧，在密苏里州圣路易斯 — 不在伊利诺伊州\n2. **东圣路易斯**是位于伊利诺伊州的一个独立的较小城市，在密苏里州圣路易斯对岸\n3. 密西西比河在此处形成密苏里州（西）和伊利诺伊州（东）的边界\n\n**圣路易斯关键事实：**\n- 人口：约280万（都会区）\n- 以以下闻名：拱门、红雀棒球队、蓝调冰球队、安海斯-布希（百威啤酒）、华盛顿大学、圣路易斯大学\n- 时区：中部时间（CST/CDT）\n- 机场：兰伯特-圣路易斯国际机场（STL）\n\n**教训：** 当有人说"圣路易斯"时，他们指的是密苏里州的城市。"东圣路易斯"指的是河对岸的伊利诺伊州城市。规划旅行或商务时，务必核实城市所在的州。`,
            },
          },
        ],
      },
    ],
  },
];

export function getChapterById(id: string): Chapter | undefined {
  return chapters.find((c) => c.id === id);
}

export function getSectionById(chapterId: string, sectionId: string) {
  const chapter = getChapterById(chapterId);
  return chapter?.sections.find((s) => s.id === sectionId);
}
