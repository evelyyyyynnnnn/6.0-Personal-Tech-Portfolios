// ============================================================
// Design: "Warm Notebook" — Scrapbook stationery aesthetic
// Colors: Cream bg, terracotta accent, sage green highlight
// Fonts: Playfair Display (headings) + Nunito (body)
// Chinese: Noto Serif SC
// ============================================================

export type Lang = "en" | "zh";

export interface VocabItem {
  word: string;
  phonetic?: string;
  translation: string;
  example?: string;
  exampleZh?: string;
  note?: string;
  noteZh?: string;
}

export interface SubSection {
  id: string;
  titleEn: string;
  titleZh: string;
  descriptionEn: string;
  descriptionZh: string;
  vocab: VocabItem[];
}

export interface Chapter {
  id: string;
  titleEn: string;
  titleZh: string;
  emoji: string;
  color: string; // tailwind accent color key
  descriptionEn: string;
  descriptionZh: string;
  sections: SubSection[];
}

export const chapters: Chapter[] = [
  {
    id: "home-living",
    titleEn: "Home & Living",
    titleZh: "住家与生活",
    emoji: "🏠",
    color: "terracotta",
    descriptionEn: "Everything you need to find, rent, and maintain your home in America.",
    descriptionZh: "在美国找房、租房、维护家居所需的一切词汇。",
    sections: [
      {
        id: "finding-place",
        titleEn: "Finding a Place to Live",
        titleZh: "找房子",
        descriptionEn: "Key vocabulary for apartment hunting — from listings to move-in day.",
        descriptionZh: "从看房源到搬入当天，租房找房的核心词汇。",
        vocab: [
          { word: "Apt Exterior", phonetic: "/æpt ɪkˈstɪriər/", translation: "公寓楼外部区域", example: "The apt exterior looks clean and well-maintained.", exampleZh: "公寓楼外部看起来干净整洁。", note: "Short for 'apartment exterior' — the outside area of an apartment building.", noteZh: "apartment exterior 的缩写，指公寓楼的外部区域。" },
          { word: "Listing", phonetic: "/ˈlɪstɪŋ/", translation: "房源信息", example: "I found a great listing on Zillow.", exampleZh: "我在 Zillow 上找到了一个很好的房源。" },
          { word: "Studio", phonetic: "/ˈstuːdioʊ/", translation: "单间公寓（无独立卧室）", example: "A studio apartment is perfect for one person.", exampleZh: "单间公寓非常适合一个人住。" },
          { word: "1BR / 2BR", translation: "一室/两室公寓", example: "We need at least a 2BR for our family.", exampleZh: "我们家至少需要一套两室公寓。", note: "BR = bedroom. Common shorthand in listings.", noteZh: "BR 是 bedroom（卧室）的缩写，常见于房源广告。" },
          { word: "Security Deposit", phonetic: "/sɪˈkjʊrɪti dɪˈpɒzɪt/", translation: "押金", example: "The landlord requires a security deposit equal to one month's rent.", exampleZh: "房东要求缴纳相当于一个月租金的押金。" },
          { word: "Landlord", phonetic: "/ˈlændlɔːrd/", translation: "房东", example: "My landlord fixed the heater within 24 hours.", exampleZh: "我的房东在24小时内修好了暖气。" },
          { word: "Tenant", phonetic: "/ˈtenənt/", translation: "租客", example: "As a tenant, you have rights under local law.", exampleZh: "作为租客，你在当地法律下享有权利。" },
          { word: "Vacancy", phonetic: "/ˈveɪkənsi/", translation: "空置（有空房）", example: "The building has no vacancy right now.", exampleZh: "这栋楼目前没有空房。" },
        ],
      },
      {
        id: "lease-renting",
        titleEn: "Lease & Renting",
        titleZh: "租约与租房",
        descriptionEn: "Understanding your lease agreement before you sign.",
        descriptionZh: "签约前读懂租约的关键词汇。",
        vocab: [
          { word: "Lease", phonetic: "/liːs/", translation: "租约", example: "Please read the lease carefully before signing.", exampleZh: "签字前请仔细阅读租约。" },
          { word: "Month-to-month", translation: "按月续租", example: "After the first year, we switched to month-to-month.", exampleZh: "第一年结束后，我们改为按月续租。" },
          { word: "Utilities included", translation: "含水电费", example: "This apartment has utilities included in the rent.", exampleZh: "这套公寓的水电费包含在租金里。" },
          { word: "Pet-friendly", translation: "允许养宠物", example: "We need a pet-friendly building for our dog.", exampleZh: "我们需要一栋允许养宠物的楼，因为我们有一只狗。" },
          { word: "Notice period", translation: "提前通知期", example: "You must give 30 days' notice before moving out.", exampleZh: "搬出前必须提前30天通知。" },
        ],
      },
      {
        id: "home-maintenance",
        titleEn: "Home Maintenance & Repairs",
        titleZh: "家居维修",
        descriptionEn: "Words to use when something breaks — so you can get it fixed fast.",
        descriptionZh: "当家里出问题时，用这些词汇快速沟通维修。",
        vocab: [
          { word: "Cabinets", phonetic: "/ˈkæbɪnɪts/", translation: "橱柜", example: "The kitchen cabinets need to be repaired.", exampleZh: "厨房橱柜需要修理。" },
          { word: "Tile", phonetic: "/taɪl/", translation: "瓷砖", example: "One of the bathroom tiles is cracked.", exampleZh: "浴室有一块瓷砖裂了。" },
          { word: "Trims", phonetic: "/trɪmz/", translation: "门框/装饰线条", example: "The door trims are painted white.", exampleZh: "门框被漆成了白色。" },
          { word: "Ventilation", phonetic: "/ˌventɪˈleɪʃən/", translation: "通风", example: "Good ventilation prevents mold in the bathroom.", exampleZh: "良好的通风可以防止浴室发霉。" },
          { word: "Plumbing", phonetic: "/ˈplʌmɪŋ/", translation: "下水管/管道系统", example: "The plumbing in this building is very old.", exampleZh: "这栋楼的管道系统非常老旧。" },
          { word: "Heat Complaint", translation: "暖气问题投诉", example: "I filed a heat complaint with the building manager.", exampleZh: "我向楼管提交了暖气问题投诉。" },
          { word: "Bedbugs", phonetic: "/ˈbedbʌɡz/", translation: "臭虫", example: "If you find bedbugs, report it immediately.", exampleZh: "如果发现臭虫，请立即上报。" },
          { word: "Extermination", phonetic: "/ɪkˌstɜːrmɪˈneɪʃən/", translation: "灭虫", example: "The landlord scheduled an extermination for next week.", exampleZh: "房东安排了下周进行灭虫。" },
        ],
      },
      {
        id: "utilities",
        titleEn: "Utilities",
        titleZh: "水电煤气",
        descriptionEn: "Setting up and managing electricity, gas, and water in your new home.",
        descriptionZh: "在新家开通和管理水、电、煤气的词汇。",
        vocab: [
          { word: "Utility bill", translation: "水电账单", example: "My utility bill was higher than expected this month.", exampleZh: "这个月的水电账单比预期高。" },
          { word: "Con Edison / PG&E", translation: "电力公司（纽约/加州）", example: "Call Con Edison to set up your electricity account.", exampleZh: "致电 Con Edison 开通你的电力账户。" },
          { word: "Meter reading", translation: "电表读数", example: "The technician came to do a meter reading.", exampleZh: "技术人员来读电表了。" },
          { word: "Shut off", translation: "断电/断水", example: "They will shut off the water for repairs tomorrow.", exampleZh: "明天他们会断水进行维修。" },
        ],
      },
      {
        id: "furniture",
        titleEn: "Furniture & Household Items",
        titleZh: "家具与家居用品",
        descriptionEn: "Shopping for your first American home.",
        descriptionZh: "为你在美国的第一个家购置家具。",
        vocab: [
          { word: "Appliance", phonetic: "/əˈplaɪəns/", translation: "家用电器", example: "The apartment comes with all major appliances.", exampleZh: "这套公寓配备了所有主要家电。", note: "Includes fridge, washer, dryer, dishwasher, etc.", noteZh: "包括冰箱、洗衣机、烘干机、洗碗机等。" },
          { word: "Furnished", translation: "带家具的", example: "Is the apartment furnished or unfurnished?", exampleZh: "这套公寓是带家具还是不带家具？" },
          { word: "IKEA run", translation: "去宜家采购", example: "We did an IKEA run to furnish our new place.", exampleZh: "我们去宜家采购来布置新家。", note: "Colloquial phrase for a shopping trip to IKEA.", noteZh: "口语表达，指专程去宜家购物。" },
        ],
      },
    ],
  },
  {
    id: "food-daily",
    titleEn: "Food & Daily Needs",
    titleZh: "饮食与日常",
    emoji: "🛒",
    color: "sage",
    descriptionEn: "Navigate grocery stores, restaurants, and food delivery like a local.",
    descriptionZh: "像当地人一样逛超市、下馆子、点外卖。",
    sections: [
      {
        id: "grocery",
        titleEn: "Grocery Shopping",
        titleZh: "超市购物",
        descriptionEn: "Essential vocabulary for your weekly grocery run.",
        descriptionZh: "每周去超市购物的必备词汇。",
        vocab: [
          { word: "Produce", phonetic: "/ˈproʊduːs/", translation: "农产品（蔬菜水果区）", example: "The produce section is at the front of the store.", exampleZh: "农产品区在超市入口处。", note: "Refers to fresh fruits and vegetables.", noteZh: "指新鲜蔬菜和水果。" },
          { word: "Aisle", phonetic: "/aɪl/", translation: "货架通道", example: "The cereal is in aisle 5.", exampleZh: "麦片在第5通道。" },
          { word: "Organic", phonetic: "/ɔːrˈɡænɪk/", translation: "有机的", example: "Organic milk is more expensive but worth it.", exampleZh: "有机牛奶更贵，但物有所值。" },
          { word: "Coupon", phonetic: "/ˈkuːpɒn/", translation: "优惠券", example: "I saved $5 with this coupon.", exampleZh: "我用这张优惠券省了5美元。" },
          { word: "Checkout", translation: "结账台", example: "There's a long line at the checkout.", exampleZh: "结账台排了很长的队。" },
          { word: "Self-checkout", translation: "自助结账", example: "I prefer self-checkout for small purchases.", exampleZh: "买东西少的时候我更喜欢用自助结账。" },
        ],
      },
      {
        id: "cooking",
        titleEn: "Cooking & Kitchen Vocabulary",
        titleZh: "烹饪与厨房词汇",
        descriptionEn: "Master the language of American kitchens and ovens.",
        descriptionZh: "掌握美式厨房和烤箱的语言。",
        vocab: [
          { word: "Broil", phonetic: "/brɔɪl/", translation: "上火烤（烤箱顶部加热）", example: "Broil the chicken for 5 minutes to get a crispy top.", exampleZh: "用上火烤鸡肉5分钟，让顶部变脆。", note: "Strong heat from the TOP of the oven only. Different from 'bake'.", noteZh: "仅来自烤箱顶部的强热。与 bake（烘烤）不同。" },
          { word: "Lasagna button", translation: "烤箱预设程序（千层面模式）", example: "Use the lasagna button for even heating.", exampleZh: "使用千层面按钮可以均匀加热。", note: "A preset oven program for dishes that need consistent heat.", noteZh: "烤箱的预设程序，适合需要均匀受热的菜肴。" },
          { word: "Preheat", phonetic: "/ˌpriːˈhiːt/", translation: "预热", example: "Preheat the oven to 375°F before baking.", exampleZh: "烘烤前将烤箱预热至375华氏度。" },
          { word: "Simmer", phonetic: "/ˈsɪmər/", translation: "小火慢炖", example: "Let the soup simmer for 20 minutes.", exampleZh: "让汤小火慢炖20分钟。" },
          { word: "Sauté", phonetic: "/soʊˈteɪ/", translation: "用少量油快炒", example: "Sauté the onions until golden.", exampleZh: "将洋葱用少量油炒至金黄色。" },
        ],
      },
      {
        id: "restaurants",
        titleEn: "Restaurants & Dining",
        titleZh: "餐厅用餐",
        descriptionEn: "Order confidently and enjoy dining out in America.",
        descriptionZh: "自信点餐，享受在美国外出用餐的体验。",
        vocab: [
          { word: "Caviar", phonetic: "/ˈkæviɑːr/", translation: "鱼子酱", example: "The restaurant serves caviar as an appetizer.", exampleZh: "这家餐厅提供鱼子酱作为开胃菜。" },
          { word: "Herring", phonetic: "/ˈherɪŋ/", translation: "鲱鱼", example: "Pickled herring is popular in Scandinavian cuisine.", exampleZh: "腌鲱鱼在北欧菜中很受欢迎。" },
          { word: "To-go / Takeout", translation: "打包带走", example: "Can I get this to-go, please?", exampleZh: "请问可以打包带走吗？" },
          { word: "Check / Bill", translation: "账单", example: "Can we get the check, please?", exampleZh: "请问可以结账了吗？" },
          { word: "Tip / Gratuity", phonetic: "/ɡrəˈtjuːɪti/", translation: "小费", example: "15–20% tip is standard in the US.", exampleZh: "在美国，15–20%的小费是标准。" },
          { word: "Refill", translation: "续杯", example: "Free refills on soda are common here.", exampleZh: "这里汽水免费续杯很常见。" },
        ],
      },
      {
        id: "coffee",
        titleEn: "Coffee Shops & Cafes",
        titleZh: "咖啡店",
        descriptionEn: "Order your perfect coffee without the confusion.",
        descriptionZh: "毫不慌乱地点出你的完美咖啡。",
        vocab: [
          { word: "Drip coffee", translation: "美式滴滤咖啡", example: "I'll have a large drip coffee, please.", exampleZh: "请给我一杯大杯美式滴滤咖啡。" },
          { word: "Oat milk / Almond milk", translation: "燕麦奶/杏仁奶", example: "Can I substitute oat milk for regular milk?", exampleZh: "可以用燕麦奶代替普通牛奶吗？" },
          { word: "For here or to go?", translation: "在这里喝还是带走？", example: "For here or to go? — For here, please.", exampleZh: "在这里喝还是带走？——在这里喝。" },
          { word: "Name on the order", translation: "订单上的名字", example: "What name should I put on the order?", exampleZh: "订单上写什么名字？" },
        ],
      },
    ],
  },
  {
    id: "transportation",
    titleEn: "Transportation",
    titleZh: "出行交通",
    emoji: "🚇",
    color: "amber",
    descriptionEn: "Get around the city confidently — by subway, car, or rideshare.",
    descriptionZh: "自信出行——地铁、开车或打车都不在话下。",
    sections: [
      {
        id: "public-transit",
        titleEn: "Public Transportation",
        titleZh: "公共交通",
        descriptionEn: "Subway, bus, and commuter rail vocabulary.",
        descriptionZh: "地铁、公交和通勤铁路词汇。",
        vocab: [
          { word: "Hold on to the pole", translation: "抓住扶手杆", example: "Hold on to the pole — the train is about to move.", exampleZh: "抓住扶手杆——列车即将启动。" },
          { word: "Could you let me through?", translation: "借过一下", example: "Excuse me, could you let me through? This is my stop.", exampleZh: "打扰一下，借过一下？这是我要下的站。" },
          { word: "Tunnel", phonetic: "/ˈtʌnəl/", translation: "隧道", example: "We lose signal when the train goes through the tunnel.", exampleZh: "列车穿过隧道时信号会中断。" },
          { word: "Ramp", phonetic: "/ræmp/", translation: "斜坡/坡道", example: "Use the ramp if you have a stroller or wheelchair.", exampleZh: "如果推婴儿车或坐轮椅，请使用坡道。" },
          { word: "Mezzanine", phonetic: "/ˌmezəˈniːn/", translation: "站厅层", example: "Buy your MetroCard at the mezzanine level.", exampleZh: "在站厅层购买 MetroCard。" },
          { word: "Platform", phonetic: "/ˈplætfɔːrm/", translation: "站台", example: "Wait on the platform until the train arrives.", exampleZh: "在站台等候列车到来。" },
          { word: "Transfer", translation: "换乘", example: "Transfer to the A train at 42nd Street.", exampleZh: "在42街换乘A线。" },
        ],
      },
      {
        id: "ride-apps",
        titleEn: "Ride Apps (Uber, Lyft)",
        titleZh: "打车软件",
        descriptionEn: "Hail a ride and communicate with your driver.",
        descriptionZh: "叫车并与司机沟通的词汇。",
        vocab: [
          { word: "Surge pricing", translation: "高峰溢价", example: "Uber has surge pricing during rush hour.", exampleZh: "高峰时段 Uber 会有溢价。" },
          { word: "ETA", translation: "预计到达时间", example: "The ETA is 4 minutes.", exampleZh: "预计4分钟后到达。" },
          { word: "Pool / Share", translation: "拼车", example: "I took an Uber Pool to save money.", exampleZh: "我坐了 Uber Pool 来省钱。" },
          { word: "Drop-off point", translation: "下车地点", example: "Can you drop me off at the corner?", exampleZh: "能在路口让我下车吗？" },
        ],
      },
      {
        id: "driving",
        titleEn: "Driving & Car Vocabulary",
        titleZh: "开车词汇",
        descriptionEn: "Essential terms for driving in America.",
        descriptionZh: "在美国开车的必备词汇。",
        vocab: [
          { word: "Merge", phonetic: "/mɜːrdʒ/", translation: "并线/汇入车流", example: "Merge carefully when entering the highway.", exampleZh: "进入高速公路时要小心并线。" },
          { word: "Yield", phonetic: "/jiːld/", translation: "让行", example: "Yield to pedestrians at crosswalks.", exampleZh: "在人行横道处要让行人先过。" },
          { word: "Right of way", translation: "优先通行权", example: "Pedestrians have the right of way here.", exampleZh: "这里行人有优先通行权。" },
          { word: "Carpool lane / HOV", translation: "拼车专用道", example: "The HOV lane requires at least 2 passengers.", exampleZh: "HOV 车道要求至少2名乘客。" },
        ],
      },
    ],
  },
  {
    id: "work-career",
    titleEn: "Work & Career",
    titleZh: "工作与职场",
    emoji: "💼",
    color: "navy",
    descriptionEn: "Communicate professionally, navigate office culture, and advance your career.",
    descriptionZh: "专业沟通、融入职场文化、推进职业发展。",
    sections: [
      {
        id: "workplace-comm",
        titleEn: "Workplace Communication",
        titleZh: "职场沟通",
        descriptionEn: "The vocabulary that makes you sound natural and professional at work.",
        descriptionZh: "让你在职场听起来自然且专业的词汇。",
        vocab: [
          { word: "Tech Hub", phonetic: "/tek hʌb/", translation: "科技中心", example: "Seattle is a major tech hub on the West Coast.", exampleZh: "西雅图是西海岸的主要科技中心。" },
          { word: "XFN (Cross-Functional Partner)", translation: "跨职能合作伙伴", example: "My XFN partner from the design team joined our meeting.", exampleZh: "来自设计团队的跨职能合作伙伴参加了我们的会议。", note: "A colleague from another team or department who collaborates on a project.", noteZh: "来自另一个团队或部门、共同参与项目的同事。" },
          { word: "Heuristic", phonetic: "/hjʊˈrɪstɪk/", translation: "启发式方法", example: "We used a heuristic approach to estimate the timeline.", exampleZh: "我们使用启发式方法来估算时间线。", note: "A practical approach to problem-solving that is not guaranteed to be perfect but helps find solutions quickly.", noteZh: "一种实用的解决问题方法，不保证完美但能快速找到解决方案。" },
          { word: "Nonrigorous", phonetic: "/nɒnˈrɪɡərəs/", translation: "不严谨的", example: "This is a nonrigorous estimate, but it gives us a ballpark.", exampleZh: "这是一个不严谨的估算，但给了我们一个大概范围。", note: "Lacking strict logic, accuracy, or formal structure.", noteZh: "缺乏严格逻辑、准确性或正式结构。" },
          { word: "Bandwidth", translation: "精力/时间余量（职场俚语）", example: "I don't have the bandwidth for another project right now.", exampleZh: "我现在没有精力再接一个项目了。", note: "In tech/office culture, 'bandwidth' means available time or capacity.", noteZh: "在科技/办公室文化中，bandwidth 指可用的时间或精力。" },
          { word: "Deliverable", phonetic: "/dɪˈlɪvərəbəl/", translation: "交付物/成果", example: "What are the deliverables for this sprint?", exampleZh: "这个冲刺阶段的交付物是什么？" },
        ],
      },
      {
        id: "emails",
        titleEn: "Emails & Professional Writing",
        titleZh: "邮件与职业写作",
        descriptionEn: "Write emails that sound native and professional.",
        descriptionZh: "写出听起来地道且专业的邮件。",
        vocab: [
          { word: "Per my last email", translation: "如我上封邮件所述", example: "Per my last email, the deadline is Friday.", exampleZh: "如我上封邮件所述，截止日期是周五。", note: "Can sound passive-aggressive — use carefully!", noteZh: "有时听起来带有被动攻击意味——谨慎使用！" },
          { word: "Circle back", translation: "稍后跟进/回头再谈", example: "Let's circle back on this after the meeting.", exampleZh: "会后我们再跟进这个问题。" },
          { word: "Loop in", translation: "把某人加入邮件/讨论", example: "Can you loop in Sarah on this thread?", exampleZh: "你能把 Sarah 加入这个邮件线程吗？" },
          { word: "Action item", translation: "待办事项/行动点", example: "The action item from today's meeting is to finalize the report.", exampleZh: "今天会议的行动点是完成报告。" },
          { word: "FYI / ASAP / TBD", translation: "仅供参考 / 尽快 / 待定", example: "FYI, the meeting is moved to 3pm. Please confirm ASAP.", exampleZh: "仅供参考，会议改到下午3点。请尽快确认。" },
        ],
      },
      {
        id: "office-culture",
        titleEn: "Office Culture",
        titleZh: "办公室文化",
        descriptionEn: "Unwritten rules and social norms of American workplaces.",
        descriptionZh: "美国职场中不成文的规则和社交规范。",
        vocab: [
          { word: "Water cooler talk", translation: "茶水间闲聊", example: "I heard about the merger through water cooler talk.", exampleZh: "我是通过茶水间闲聊听说合并的事的。" },
          { word: "Touch base", translation: "简短联系/碰个头", example: "Let's touch base tomorrow morning.", exampleZh: "我们明天早上简短联系一下。" },
          { word: "Work-life balance", translation: "工作与生活的平衡", example: "This company values work-life balance.", exampleZh: "这家公司重视工作与生活的平衡。" },
          { word: "Remote / Hybrid / On-site", translation: "远程/混合/现场办公", example: "Our team is fully remote with optional on-site days.", exampleZh: "我们团队完全远程办公，可选择到现场的日子。" },
        ],
      },
    ],
  },
  {
    id: "money-finance",
    titleEn: "Money & Finance",
    titleZh: "金钱与财务",
    emoji: "💳",
    color: "green",
    descriptionEn: "Banking, credit, taxes, and financial survival in America.",
    descriptionZh: "在美国的银行、信用、税务和财务生存指南。",
    sections: [
      {
        id: "banking",
        titleEn: "Banking",
        titleZh: "银行业务",
        descriptionEn: "Open accounts, transfer money, and understand your bank.",
        descriptionZh: "开户、转账和了解你的银行。",
        vocab: [
          { word: "Checking account", translation: "支票账户（日常消费）", example: "I use my checking account for everyday expenses.", exampleZh: "我用支票账户支付日常开销。" },
          { word: "Savings account", translation: "储蓄账户", example: "Keep an emergency fund in your savings account.", exampleZh: "在储蓄账户里保留一笔紧急备用金。" },
          { word: "Routing number", translation: "银行路由号码", example: "You need the routing number to set up direct deposit.", exampleZh: "设置直接存款需要路由号码。" },
          { word: "Direct deposit", translation: "直接存款（工资直接打入账户）", example: "Set up direct deposit with your employer.", exampleZh: "与雇主设置直接存款。" },
          { word: "Overdraft", phonetic: "/ˈoʊvərdræft/", translation: "透支", example: "Avoid overdraft fees by monitoring your balance.", exampleZh: "通过监控余额来避免透支费用。" },
        ],
      },
      {
        id: "credit",
        titleEn: "Credit Cards & Credit Score",
        titleZh: "信用卡与信用分",
        descriptionEn: "Build credit from scratch as a newcomer.",
        descriptionZh: "作为新移民从零开始建立信用记录。",
        vocab: [
          { word: "Credit score", translation: "信用分", example: "A good credit score opens many financial doors.", exampleZh: "良好的信用分能打开很多财务机会。" },
          { word: "APR (Annual Percentage Rate)", translation: "年利率", example: "This card has a 0% APR for the first 12 months.", exampleZh: "这张卡前12个月年利率为0%。" },
          { word: "Minimum payment", translation: "最低还款额", example: "Always pay more than the minimum payment.", exampleZh: "每次还款额要超过最低还款额。" },
          { word: "Statement", translation: "账单/对账单", example: "Review your statement every month for errors.", exampleZh: "每月检查账单是否有错误。" },
          { word: "Secured card", translation: "担保信用卡（适合新移民建立信用）", example: "A secured card is a great way to start building credit.", exampleZh: "担保信用卡是开始建立信用的好方法。" },
        ],
      },
      {
        id: "taxes",
        titleEn: "Taxes",
        titleZh: "税务",
        descriptionEn: "Understand the basics of the American tax system.",
        descriptionZh: "了解美国税务系统的基础知识。",
        vocab: [
          { word: "W-2 / 1099", translation: "工资税表 / 自雇收入税表", example: "Your employer sends a W-2 by January 31.", exampleZh: "雇主在1月31日前寄出W-2表格。" },
          { word: "Tax return", translation: "退税/报税", example: "I filed my tax return online this year.", exampleZh: "今年我在网上报税了。" },
          { word: "Deduction", phonetic: "/dɪˈdʌkʃən/", translation: "税款扣除", example: "Student loan interest is a common deduction.", exampleZh: "学生贷款利息是常见的扣税项目。" },
          { word: "IRS", translation: "美国国税局", example: "The IRS deadline for tax filing is April 15.", exampleZh: "美国国税局的报税截止日期是4月15日。" },
        ],
      },
    ],
  },
  {
    id: "health-medical",
    titleEn: "Health & Medical",
    titleZh: "健康与医疗",
    emoji: "🏥",
    color: "rose",
    descriptionEn: "Navigate the American healthcare system with confidence.",
    descriptionZh: "自信地应对美国医疗体系。",
    sections: [
      {
        id: "doctor-visits",
        titleEn: "Doctor Visits",
        titleZh: "看医生",
        descriptionEn: "Describe symptoms and understand your doctor.",
        descriptionZh: "描述症状并理解医生说的话。",
        vocab: [
          { word: "Primary care physician (PCP)", translation: "初级保健医生（家庭医生）", example: "You need a referral from your PCP to see a specialist.", exampleZh: "看专科医生需要家庭医生的转诊。" },
          { word: "Copay", phonetic: "/ˈkoʊpeɪ/", translation: "自付额（每次就诊自费部分）", example: "My copay is $20 per visit.", exampleZh: "我每次就诊的自付额是20美元。" },
          { word: "Deductible", phonetic: "/dɪˈdʌktɪbəl/", translation: "免赔额", example: "I haven't met my deductible yet this year.", exampleZh: "我今年还没达到免赔额。" },
          { word: "In-network / Out-of-network", translation: "网络内/网络外（保险覆盖范围）", example: "Make sure your doctor is in-network to save money.", exampleZh: "确保你的医生在保险网络内，以节省费用。" },
          { word: "Prescription", phonetic: "/prɪˈskrɪpʃən/", translation: "处方", example: "The doctor gave me a prescription for antibiotics.", exampleZh: "医生给我开了抗生素处方。" },
        ],
      },
      {
        id: "emergency",
        titleEn: "Emergency Medical",
        titleZh: "紧急医疗",
        descriptionEn: "Critical phrases for medical emergencies.",
        descriptionZh: "医疗紧急情况的关键用语。",
        vocab: [
          { word: "911", translation: "紧急求助电话", example: "Call 911 immediately in any life-threatening situation.", exampleZh: "任何危及生命的情况请立即拨打911。" },
          { word: "ER (Emergency Room)", translation: "急诊室", example: "Go to the ER if symptoms are severe.", exampleZh: "如果症状严重，请去急诊室。" },
          { word: "Urgent care", translation: "紧急诊所（非急诊但需快速就医）", example: "Urgent care is cheaper than the ER for minor injuries.", exampleZh: "对于轻伤，紧急诊所比急诊室便宜。" },
          { word: "Allergic reaction", translation: "过敏反应", example: "I'm having an allergic reaction to the medication.", exampleZh: "我对这种药物有过敏反应。" },
        ],
      },
    ],
  },
  {
    id: "social-life",
    titleEn: "Social Life",
    titleZh: "社交生活",
    emoji: "🤝",
    color: "purple",
    descriptionEn: "Small talk, invitations, and building real connections in America.",
    descriptionZh: "闲聊、邀请和在美国建立真实人际关系。",
    sections: [
      {
        id: "small-talk",
        titleEn: "Small Talk",
        titleZh: "闲聊",
        descriptionEn: "The art of casual conversation — America's social glue.",
        descriptionZh: "随意聊天的艺术——美国社交的黏合剂。",
        vocab: [
          { word: "Sketchy", phonetic: "/ˈsketʃi/", translation: "阴森森的/可疑的", example: "That neighborhood feels a bit sketchy at night.", exampleZh: "那个街区晚上感觉有点阴森。" },
          { word: "Livable", phonetic: "/ˈlɪvəbəl/", translation: "宜居的", example: "The rent is high but the area is very livable.", exampleZh: "租金很高，但这个地区非常宜居。" },
          { word: "Everyone needs to get a grip", translation: "每个人都要冷静点", example: "After the news broke, everyone needed to get a grip.", exampleZh: "消息传出后，大家都需要冷静一下。", note: "Means to calm down and control one's emotions.", noteZh: "意思是冷静下来，控制情绪。" },
          { word: "How's it going?", translation: "最近怎么样？", example: "Hey! How's it going? — Pretty good, thanks!", exampleZh: "嘿！最近怎么样？——还不错，谢谢！", note: "Standard American greeting. 'Good' or 'Fine' is the expected reply.", noteZh: "标准美式问候。回答 Good 或 Fine 即可。" },
          { word: "No worries", translation: "没关系/不用担心", example: "Sorry I'm late! — No worries at all.", exampleZh: "抱歉我迟到了！——完全没关系。" },
        ],
      },
      {
        id: "hobbies",
        titleEn: "Hobbies & Entertainment",
        titleZh: "兴趣爱好与娱乐",
        descriptionEn: "Talk about what you love and connect over shared interests.",
        descriptionZh: "聊聊你热爱的事物，通过共同兴趣建立联系。",
        vocab: [
          { word: "Ball-Jointed Doll (BJD)", translation: "球形关节人偶", example: "She collects BJDs as a hobby.", exampleZh: "她以收集球形关节人偶为爱好。", note: "A type of articulated doll connected by ball joints, popular among collectors.", noteZh: "一种通过球形关节连接的可动人偶，在收藏家中很受欢迎。" },
          { word: "Binge-watch", translation: "一口气追剧", example: "I binge-watched the whole season in one weekend.", exampleZh: "我一个周末就把整季追完了。" },
          { word: "Potluck", phonetic: "/ˈpɒtlʌk/", translation: "各带一道菜的聚餐", example: "We're having a potluck — bring your favorite dish!", exampleZh: "我们要办各带一道菜的聚餐——带上你最喜欢的菜！" },
        ],
      },
    ],
  },
  {
    id: "government-legal",
    titleEn: "Government & Legal",
    titleZh: "政府与法律",
    emoji: "🏛️",
    color: "slate",
    descriptionEn: "Immigration documents, safety, and your legal rights in America.",
    descriptionZh: "移民文件、安全和你在美国的法律权利。",
    sections: [
      {
        id: "immigration",
        titleEn: "Immigration & Documents",
        titleZh: "移民与证件",
        descriptionEn: "Key terms for navigating the US immigration system.",
        descriptionZh: "应对美国移民系统的关键词汇。",
        vocab: [
          { word: "Attestation", phonetic: "/ˌætɛˈsteɪʃən/", translation: "证明/公证证明", example: "The form requires an official attestation from your employer.", exampleZh: "该表格需要雇主的官方证明。" },
          { word: "Visa status", translation: "签证状态", example: "Always check your visa status before traveling.", exampleZh: "出行前务必检查签证状态。" },
          { word: "Green card", translation: "绿卡（永久居留权）", example: "She applied for a green card after 3 years on an H-1B.", exampleZh: "她在H-1B签证3年后申请了绿卡。" },
          { word: "Notarize", phonetic: "/ˈnoʊtəraɪz/", translation: "公证", example: "You need to notarize this document before submitting.", exampleZh: "提交前需要对这份文件进行公证。" },
          { word: "USCIS", translation: "美国公民及移民服务局", example: "Check the USCIS website for the latest immigration updates.", exampleZh: "查看 USCIS 网站获取最新移民信息。" },
        ],
      },
      {
        id: "safety",
        titleEn: "Safety & Emergency",
        titleZh: "安全与紧急情况",
        descriptionEn: "Stay safe and know what to do in an emergency.",
        descriptionZh: "保持安全，了解紧急情况下的应对方法。",
        vocab: [
          { word: "911", translation: "紧急救援电话", example: "Call 911 for police, fire, or medical emergencies.", exampleZh: "警察、火灾或医疗紧急情况请拨打911。" },
          { word: "Non-emergency line", translation: "非紧急报警电话", example: "For minor issues, call the non-emergency police line.", exampleZh: "对于小问题，请拨打非紧急警察电话。" },
          { word: "Fist", phonetic: "/fɪst/", translation: "拳头", example: "He raised his fist in protest.", exampleZh: "他举起拳头表示抗议。", note: "Important body language term — know the difference between a fist and an open hand gesture.", noteZh: "重要的肢体语言词汇——了解拳头和张开手势的区别。" },
        ],
      },
    ],
  },
  {
    id: "travel",
    titleEn: "Travel",
    titleZh: "旅行",
    emoji: "✈️",
    color: "sky",
    descriptionEn: "Airports, hotels, and navigating America's travel landscape.",
    descriptionZh: "机场、酒店和美国旅行的方方面面。",
    sections: [
      {
        id: "flights",
        titleEn: "Flights & Airports",
        titleZh: "航班与机场",
        descriptionEn: "From check-in to boarding — airport vocabulary.",
        descriptionZh: "从值机到登机的机场词汇。",
        vocab: [
          { word: "Standby", phonetic: "/ˈstændbаɪ/", translation: "候补（等待空位登机）", example: "I'm on standby for the earlier flight.", exampleZh: "我在等候补上早一班的飞机。", note: "Two uses: (1) Wanting to board an earlier flight than ticketed. (2) Employee tickets — waiting for an open seat on each flight.", noteZh: "两种用法：(1) 想提前上机（买了15:00机票但想早点上飞机）；(2) 员工票：每一班飞机排 standby 等空位。" },
          { word: "Layover", phonetic: "/ˈleɪoʊvər/", translation: "中转停留", example: "I have a 3-hour layover in Chicago.", exampleZh: "我在芝加哥有3小时的中转停留。" },
          { word: "Boarding pass", translation: "登机牌", example: "Show your boarding pass at the gate.", exampleZh: "在登机口出示你的登机牌。" },
          { word: "TSA", translation: "美国运输安全管理局（安检）", example: "Allow extra time for TSA security screening.", exampleZh: "请预留额外时间通过TSA安检。" },
          { word: "Carry-on", translation: "随身行李", example: "My carry-on fits in the overhead bin.", exampleZh: "我的随身行李能放进头顶行李舱。" },
        ],
      },
      {
        id: "navigation",
        titleEn: "Directions & Navigation",
        titleZh: "方向与导航",
        descriptionEn: "Ask for and understand directions in America.",
        descriptionZh: "在美国问路和理解方向。",
        vocab: [
          { word: "Bellevue", phonetic: "/ˈbɛljuː/", translation: "美丽的景色（地名）", example: "Bellevue, WA is a beautiful city near Seattle.", exampleZh: "华盛顿州贝尔维尤是西雅图附近的一座美丽城市。", note: "From French meaning 'beautiful view'. Often used as a place name.", noteZh: "来自法语，意为'美丽的景色'，常用作地名。" },
          { word: "Block", translation: "街区", example: "The coffee shop is two blocks down on the left.", exampleZh: "咖啡店在左边两个街区处。" },
          { word: "Intersection", phonetic: "/ˌɪntərˈsekʃən/", translation: "十字路口", example: "Turn left at the next intersection.", exampleZh: "在下一个十字路口左转。" },
        ],
      },
    ],
  },
];

export const siteContent = {
  en: {
    siteTitle: "American Life English Guide",
    siteSubtitle: "Real vocabulary for real life in America",
    heroDescription: "A practical, visual vocabulary system designed for immigrants and international students. Learn the English you actually need — for renting apartments, navigating hospitals, thriving at work, and building a life here.",
    chaptersTitle: "Browse by Topic",
    chaptersSubtitle: "11 real-life categories, hundreds of practical words",
    searchPlaceholder: "Search words, topics...",
    lightMode: "Light",
    darkMode: "Dark",
    langToggle: "中文",
    backToChapters: "← All Topics",
    vocabWord: "Word",
    vocabTranslation: "Translation",
    vocabExample: "Example",
    vocabNote: "Note",
    noResults: "No results found. Try a different keyword.",
    footerText: "Part of the American Life English System — helping immigrants think, remember, and live in English.",
    proposalTitle: "About This System",
    proposalDesc: "This guide is part of a larger visual vocabulary system built for immigrants in the United States. Instead of memorizing word lists, you experience vocabulary through real-life contexts, mini stories, and bilingual bridges designed specifically for Chinese learners.",
  },
  zh: {
    siteTitle: "美国生活英语指南",
    siteSubtitle: "真实生活中的实用英语词汇",
    heroDescription: "专为移民和留学生设计的实用视觉词汇系统。学习你真正需要的英语——租房、看病、职场发展，在这里建立属于自己的生活。",
    chaptersTitle: "按主题浏览",
    chaptersSubtitle: "11个真实生活类别，数百个实用词汇",
    searchPlaceholder: "搜索词汇、主题...",
    lightMode: "浅色",
    darkMode: "深色",
    langToggle: "English",
    backToChapters: "← 所有主题",
    vocabWord: "词汇",
    vocabTranslation: "翻译",
    vocabExample: "例句",
    vocabNote: "注释",
    noResults: "未找到结果，请尝试其他关键词。",
    footerText: "美国生活英语系统的一部分——帮助移民用英语思考、记忆和生活。",
    proposalTitle: "关于本系统",
    proposalDesc: "本指南是专为美国移民设计的大型视觉词汇系统的一部分。与其死记硬背单词表，不如通过真实生活场景、迷你故事和专为中文学习者设计的双语桥梁来体验词汇。",
  },
};
