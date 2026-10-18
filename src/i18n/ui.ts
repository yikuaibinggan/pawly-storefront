import type { Lang } from '../data/site';

const en = {
  meta: {
    home: {
      title: 'PAWLY — Thoughtful pet essentials for everyday adventures',
      description:
        'Thoughtful pet essentials for walks, meals, play, and the quiet moments in between. Discover PAWLY, a considered collection for dogs and cats.'
    },
    products: {
      title: 'The collection — PAWLY',
      description:
        'Explore PAWLY pet essentials for walks, mealtime, play, rest, grooming, and everyday care. Filter by routine or search the collection.'
    },
    about: {
      title: 'Our story — PAWLY',
      description:
        'PAWLY is a small pet goods studio making fewer, better essentials for the everyday rituals of life with dogs and cats.'
    },
    wholesale: {
      title: 'Wholesale, OEM & private label — PAWLY',
      description:
        'Partner with PAWLY for pet product development, private label, flexible MOQs, sampling, quality control, and global logistics.'
    },
    contact: {
      title: 'Contact — PAWLY',
      description:
        'Questions about products, wholesale, samples, or partnerships? Get in touch with the PAWLY studio.'
    },
    legal: {
      title: 'Privacy & terms — PAWLY',
      description: 'How PAWLY handles enquiry information, and the terms that apply to this website.'
    },
    notFound: {
      title: 'Page not found — PAWLY',
      description: 'The page you are looking for could not be found.'
    }
  },
  common: {
    brand: 'PAWLY',
    menu: 'Menu',
    close: 'Close',
    language: 'Language',
    english: 'English',
    chinese: '中文',
    viewAll: 'View all',
    viewDetails: 'View details',
    explore: 'Explore',
    learnMore: 'Learn more',
    getQuote: 'Get a quote',
    backHome: 'Back to home',
    backToTop: 'Back to top',
    home: 'Home',
    products: 'Products',
    skipToContent: 'Skip to content',
    opensInNewTab: 'Opens in a new tab',
    image: 'Image',
    since: 'Thoughtfully made for everyday life'
  },
  header: {
    announcement: 'New: The Everyday Edit — 12 essentials for every kind of day.',
    announcementLink: 'Meet the collection',
    cta: 'Get a quote',
    navLabel: 'Main navigation',
    mobileNavLabel: 'Mobile navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu'
  },
  footer: {
    intro:
      'Thoughtful essentials for the ones who follow you everywhere. A small, considered collection for walks, meals, play, and care.',
    shopHeading: 'Shop',
    companyHeading: 'Studio',
    followHeading: 'Follow along',
    contactHeading: 'Say hello',
    allProducts: 'All products',
    about: 'Our story',
    wholesale: 'Wholesale',
    contact: 'Contact',
    legal: 'Privacy & terms',
    copyright: '© 2026 PAWLY Pet Goods. All rights reserved.',
    ctaTitle: 'Have a product in mind?',
    ctaText: 'We love a good collaboration. Tell us what you are working on.',
    ctaButton: 'Start a conversation',
    languageLabel: '语言 / Language'
  },
  home: {
    hero: {
      eyebrow: 'Thoughtful pet essentials',
      title: 'Made for the ones who',
      accent: 'follow you everywhere.',
      text:
        'Thoughtful pet essentials for walks, meals, play, and the quiet moments in between. Designed to feel good in your hand — and even better in their everyday.',
      primaryCta: 'Explore the collection',
      secondaryCta: 'Wholesale inquiry',
      note: 'Pet-safe materials · Everyday design · Worldwide wholesale',
      cardLabel: 'Best seller',
      cardName: 'CloudStep Harness',
      cardMeta: '4-point adjustable · XS–XL',
      cardCta: 'View product',
      orbit: 'PET-SAFE · GOOD DAYS · '
    },
    trust: [
      {
        title: 'Pet-safe by default',
        text: 'We choose materials we would be comfortable using on our own pets.'
      },
      {
        title: 'Details that do more',
        text: 'Thoughtful touches that make daily routines feel a little easier.'
      },
      {
        title: 'Made for the long run',
        text: 'Built to be used, washed, packed, and loved for years.'
      }
    ],
    categories: {
      eyebrow: 'Shop by routine',
      title: 'Four little rituals, one happy day.',
      text: 'From the first stretch of the morning to the last slow blink at night.',
      cta: 'Browse all products',
      cardCta: 'Explore'
    },
    bestsellers: {
      eyebrow: 'The everyday edit',
      title: 'Loved for the little things.',
      text:
        'The pieces our community reaches for again and again — and the ones we would pack first.',
      cta: 'View all products'
    },
    story: {
      eyebrow: 'Our way',
      title: 'Less stuff. More everyday.',
      paragraphOne:
        'We started PAWLY because the pet aisle felt louder than it needed to be. Too many products, too many claims, not enough things that simply worked.',
      paragraphTwo:
        'So we set a quieter brief: make a small collection of essentials that earns its place in your home. Soft where it matters. Strong where it counts. Easy to clean, easy to live with, and made to stay.',
      points: [
        {
          title: 'Fewer, better pieces',
          text: 'A considered core collection, not an endless catalogue.'
        },
        {
          title: 'Tested in real routines',
          text: 'Prototypes go home with pet parents before they go to production.'
        },
        {
          title: 'Designed to last',
          text: 'Repairable details, washable covers, and materials that age well.'
        }
      ],
      cta: 'Read our story',
      stats: [
        { value: '12', label: 'core essentials' },
        { value: '4', label: 'everyday rituals' },
        { value: '1', label: 'thoughtful standard' }
      ]
    },
    values: {
      eyebrow: 'The PAWLY standard',
      title: 'Good design should feel like second nature.',
      cards: [
        {
          title: 'Soft where it matters',
          text: 'Padded contact points, rounded edges, and fabrics that feel as good as they look.'
        },
        {
          title: 'Simple to live with',
          text: 'Washable covers, wipe-clean surfaces, and details that do not need a manual.'
        },
        {
          title: 'A lighter footprint',
          text: 'Recycled materials, fewer components, and packaging designed to be recycled again.'
        }
      ]
    },
    wholesale: {
      eyebrow: 'Wholesale & private label',
      title: 'Your next bestseller starts here.',
      text:
        'A flexible manufacturing partner for pet brands, retailers, and distributors. From a first sample to a full private-label launch, we make the process clear.',
      points: [
        'OEM / ODM & private label',
        'Flexible MOQs and custom colourways',
        'Sampling, QC, and global logistics'
      ],
      cta: 'Explore wholesale',
      imageBadge: 'OEM / ODM / Private label'
    },
    gallery: {
      eyebrow: 'Good days, lately',
      title: 'A little more everyday joy.',
      handle: '@pawly.pets',
      captions: ['Slow mornings', 'Trail days', 'The best seat in the house']
    },
    cta: {
      title: "Let's make everyday better.",
      text:
        "Looking for a retail partner, a private-label collection, or just the right harness? We would love to hear from you.",
      primary: 'Start a conversation',
      secondary: 'Browse products'
    }
  },
  products: {
    eyebrow: 'The collection',
    title: 'Everyday essentials, thoughtfully made.',
    text:
      'A small, considered collection for walks, meals, play, and care. Filter by routine, or search for exactly what you need.',
    all: 'All products',
    searchLabel: 'Search products',
    searchPlaceholder: 'Search products…',
    filterLabel: 'Filter by routine',
    results: 'products',
    resultSingular: 'product',
    noResultsTitle: 'Nothing here yet.',
    noResultsText: 'Try another search, or clear the filters to see the whole collection.',
    clearFilters: 'Clear filters',
    emptyBadge: 'The full collection',
    categoryLabel: 'Routine',
    viewProduct: 'View product',
    moqShort: 'MOQ',
    filtersAria: 'Product filters',
    productCountAria: 'Number of products shown'
  },
  product: {
    breadcrumbHome: 'Home',
    breadcrumbProducts: 'Products',
    detailsEyebrow: 'Product details',
    detailsTitle: 'Thoughtful by design.',
    detailsText:
      'A closer look at the materials, construction, and small decisions that make this piece work harder.',
    featuresTitle: 'Why it works',
    specsTitle: 'The details',
    careTitle: 'Care & keeping',
    colorsTitle: 'Colours',
    suitableLabel: 'Made for',
    moqLabel: 'Wholesale',
    inquire: 'Inquire about this product',
    requestSample: 'Request a sample',
    shippingNote: 'Wholesale orders ship worldwide. Ask us about samples, lead times, and custom colours.',
    galleryLabel: 'Product gallery',
    thumbnailLabel: 'View image',
    relatedEyebrow: 'Complete the routine',
    relatedTitle: 'You might also like',
    relatedText: 'A few more pieces that fit the same everyday moment.',
    backToProducts: 'Back to all products',
    categoryLink: 'Explore this routine',
    nextProduct: 'Next product'
  },
  about: {
    eyebrow: 'Our story',
    title: 'We make everyday gear for the ones who',
    accent: 'never leave your side.',
    text:
      'PAWLY is a small pet goods studio with a simple belief: the best products disappear into the rhythm of everyday life. They should feel natural, work hard, and look good doing it.',
    heroCaption: 'A good day, according to PAWLY.',
    introEyebrow: 'Why PAWLY',
    introTitle: 'It started with a simple question.',
    introParagraphOne:
      'What would we actually want in our own homes? Not another gadget. Not another trend. Just a handful of well-made things that made the daily routine with our pets feel calmer, softer, and more fun.',
    introParagraphTwo:
      'So we began with the rituals: the morning walk, the messy meal, the rainy-day nap, the weekly brush. Each product starts there — with the moment it needs to make better.',
    valuesEyebrow: 'What we believe',
    valuesTitle: 'Three rules we keep coming back to.',
    values: [
      {
        number: '01',
        title: 'Start with the animal',
        text: 'Comfort, safety, and dignity come before trends. Every shape is tested on real bodies and real routines.'
      },
      {
        number: '02',
        title: 'Choose fewer materials',
        text: 'We pare back components and favour recycled, washable, and responsibly sourced materials.'
      },
      {
        number: '03',
        title: 'Design for the long run',
        text: 'Replaceable covers, repairable details, and timeless colours that do not need replacing next season.'
      }
    ],
    processEyebrow: 'How we work',
    processTitle: 'Slow enough to get it right.',
    processText:
      'We are a small team, and we like it that way. Fewer projects mean more attention on every seam, surface, and snap.',
    process: [
      {
        number: '01',
        title: 'Listen',
        text: 'We spend time with pet parents, groomers, and retail partners to understand what is actually missing.'
      },
      {
        number: '02',
        title: 'Prototype',
        text: 'Rough samples become real products through repeated fittings, washes, and everyday testing.'
      },
      {
        number: '03',
        title: 'Refine',
        text: 'We check materials, construction, packaging, and the small details that make a difference.'
      },
      {
        number: '04',
        title: 'Produce',
        text: 'Approved samples move into small-batch production with clear QC checkpoints.'
      }
    ],
    materialsEyebrow: 'Materials',
    materialsTitle: 'A lighter footprint, without a lighter product.',
    materialsText:
      'We look for materials that can take everyday life and come back for more — then we use less of them. The result is gear that feels considered, not compromised.',
    materialsList: [
      'Recycled fabrics where performance allows',
      'Food-safe ceramics and silicone',
      'Responsibly sourced beech and bamboo',
      'Recyclable, right-sized packaging'
    ],
    materialsCaption: 'Less waste. More use.',
    ctaEyebrow: 'Come say hello',
    ctaTitle: 'Good products start with a good conversation.',
    ctaText: 'Whether you are shopping for one dog or planning a whole collection, we are glad you are here.',
    ctaPrimary: 'Browse the collection',
    ctaSecondary: 'Work with us'
  },
  wholesale: {
    eyebrow: 'Wholesale & OEM',
    title: 'Your next bestseller',
    accent: 'starts here.',
    text:
      'We partner with pet brands, independent retailers, and distributors to turn good ideas into products that sell — and stay sold.',
    cta: 'Start a conversation',
    secondaryCta: 'View the collection',
    stats: [
      { value: 'Flexible MOQ', label: 'Start with a test run, then scale.' },
      { value: 'OEM / ODM', label: 'Your brand, your colours, your packaging.' },
      { value: 'Sample-first', label: 'Approve the details before production.' }
    ],
    capabilitiesEyebrow: 'What we do',
    capabilitiesTitle: 'From first idea to retail shelf.',
    capabilitiesText:
      'A clear, practical partnership for brands that care about how things are made — and how they sell.',
    capabilities: [
      {
        number: '01',
        title: 'Product development',
        text: 'Bring a sketch, a reference, or a gap in the market. We will help shape it into a producible product.'
      },
      {
        number: '02',
        title: 'Private label',
        text: 'Your logo, colours, and packaging on our proven core shapes.'
      },
      {
        number: '03',
        title: 'Custom colourways',
        text: 'Low-minimum colour matching across fabrics, webbing, and ceramics.'
      },
      {
        number: '04',
        title: 'Packaging design',
        text: 'Retail-ready cartons, inserts, and barcode support.'
      },
      {
        number: '05',
        title: 'Quality control',
        text: 'Inline checks and pre-shipment inspections with photo reports.'
      },
      {
        number: '06',
        title: 'Global logistics',
        text: 'FOB, EXW, or door-to-door coordination with your freight partner.'
      }
    ],
    processEyebrow: 'How it works',
    processTitle: 'A clear path to launch.',
    processText: 'No black boxes. You will know what happens next, who is doing it, and when.',
    process: [
      {
        number: '01',
        title: 'Share your brief',
        text: 'Tell us about your brand, product idea, target price, and timeline.'
      },
      {
        number: '02',
        title: 'Sample & quote',
        text: 'We confirm materials, MOQ, and tooling, then send a sample for approval.'
      },
      {
        number: '03',
        title: 'Refine the details',
        text: 'Colours, packaging, labels, and compliance documents are locked in.'
      },
      {
        number: '04',
        title: 'Produce & inspect',
        text: 'Production begins after deposit, with QC checkpoints along the way.'
      },
      {
        number: '05',
        title: 'Ship & launch',
        text: 'We coordinate inspection, documentation, and handover to your freight forwarder.'
      }
    ],
    customizeEyebrow: 'Make it yours',
    customizeTitle: 'The details that make it your brand.',
    customizeText:
      'Mix and match finishes, packaging, and small touches. We will help you choose what matters for your market — and skip what does not.',
    customizeItems: [
      'Colour matching',
      'Logo embossing',
      'Woven labels',
      'Hangtags',
      'Retail packaging',
      'Bilingual inserts',
      'Barcode & FNSKU',
      'Sample sets'
    ],
    partnerEyebrow: 'The partnership',
    partnerTitle: 'A partner for the long run.',
    partnerTextOne:
      'We are not a marketplace and we are not a middleman. We develop, source, and produce with a small, stable team — so the person who quotes your project is close to the people making it.',
    partnerTextTwo:
      'That means honest timelines, practical problem-solving, and a product that still makes sense after the first season.',
    faqEyebrow: 'Good to know',
    faqTitle: 'Questions we hear often.',
    faqs: [
      {
        question: 'What is your minimum order quantity?',
        answer:
          'It depends on the product and customization. Most core products start at 100–300 pieces, and we are happy to quote a smaller test run where possible.'
      },
      {
        question: 'Can you produce under our brand?',
        answer:
          'Yes. We support OEM, ODM, and private label, including custom colours, labels, packaging, and bilingual inserts.'
      },
      {
        question: 'How long does sampling take?',
        answer:
          'Timing depends on materials and customization. Once details are confirmed, we will share a clear sample schedule with your quote.'
      },
      {
        question: 'Do you provide compliance documents?',
        answer:
          'We can provide available material and test documentation for your market. Requirements vary by country, so tell us where you sell.'
      },
      {
        question: 'Can we start with a small trial order?',
        answer:
          'Often, yes. We can structure a smaller first run before scaling into full production.'
      },
      {
        question: 'Which markets do you ship to?',
        answer:
          'We work with partners worldwide and can coordinate with your freight forwarder or recommend a logistics route.'
      }
    ],
    formEyebrow: 'Start a project',
    formTitle: "Tell us what you're working on.",
    formText:
      'Share a few details and we will come back with next steps, sample options, and an initial quote.',
    directLabel: 'Prefer email?',
    directText: 'Write to us directly at'
  },
  contact: {
    eyebrow: 'Contact',
    title: "Let's talk about better everyday.",
    text:
      'Product questions, wholesale enquiries, or a good pet photo — we are here for all of it.',
    emailLabel: 'Email',
    whatsappLabel: 'WhatsApp',
    studioLabel: 'Studio',
    socialLabel: 'Social',
    responseTitle: 'A real person will reply.',
    responseText:
      'We are a small team, so every message gets read by someone who knows the products. We usually reply within two business days.',
    formEyebrow: 'Send a note',
    formTitle: 'What can we help with?',
    formText:
      'Tell us a little about your question or project. The more context, the better we can help.',
    faqLink: 'Looking for wholesale information?',
    faqCta: 'Visit the wholesale page'
  },
  form: {
    name: 'Your name',
    namePlaceholder: 'Alex Morgan',
    company: 'Company',
    companyOptional: 'Company (optional)',
    companyPlaceholder: 'Your studio or store',
    email: 'Email',
    emailPlaceholder: 'alex@company.com',
    country: 'Country / region',
    countryPlaceholder: 'United States',
    interest: 'I am interested in',
    interestOptions: [
      { value: 'general', label: 'General question' },
      { value: 'wholesale', label: 'Wholesale' },
      { value: 'sample', label: 'Samples' },
      { value: 'press', label: 'Press & collaborations' }
    ],
    product: 'Product of interest',
    productPlaceholder: 'Not sure yet',
    message: 'Message',
    messagePlaceholder: 'Tell us a little about what you are looking for…',
    consent: 'I agree to be contacted about this enquiry.',
    consentLink: 'Privacy & terms',
    submit: 'Send inquiry',
    optional: 'Optional',
    required: 'Please fill in this field.',
    emailError: 'Please enter a valid email address.',
    consentError: 'Please agree before sending.',
    successTitle: 'Your email app should open now.',
    successText:
      'Your inquiry is ready to send. If your email app did not open, write to us directly at',
    fallback: 'Or email us directly',
    privacyNote: 'We only use your details to respond to this enquiry.',
    subjectPrefix: 'PAWLY inquiry',
    wholesaleSubject: 'Wholesale inquiry',
    generalSubject: 'Website inquiry',
    sampleSubject: 'Sample request',
    labels: {
      name: 'Name',
      company: 'Company',
      email: 'Email',
      country: 'Country / region',
      interest: 'Interest',
      product: 'Product',
      message: 'Message'
    }
  },
  legal: {
    eyebrow: 'The small print',
    title: 'Privacy & terms',
    updated: 'Last updated: October 2026',
    intro:
      'This page explains how PAWLY handles the information you share through this website, and the terms that apply when you use it. This is a demo policy and should be reviewed by your legal advisor before launch.',
    sections: [
      {
        title: 'Who we are',
        body:
          'PAWLY Pet Goods is a pet product studio. You can reach us at hello@pawly.example for any privacy question.'
      },
      {
        title: 'What we collect',
        body:
          'When you send an enquiry, we receive the details you choose to share, such as your name, company, email, country, product interest, and message. This demo site does not use analytics or advertising cookies.'
      },
      {
        title: 'How we use it',
        body:
          'We use your details to respond to your enquiry and, where relevant, to prepare a quote or sample arrangement. We do not sell personal information.'
      },
      {
        title: 'Your choices',
        body:
          'You can ask us to access, correct, or delete the information you have shared by emailing hello@pawly.example. We will respond within a reasonable timeframe.'
      },
      {
        title: 'Website terms',
        body:
          'This website is a product showcase. Product availability, specifications, pricing, and lead times are confirmed in a written quote. Demo content and imagery are for presentation purposes and should be reviewed and replaced before launch.'
      },
      {
        title: 'Contact',
        body: 'Questions about this page? Email hello@pawly.example.'
      }
    ]
  },
  notFound: {
    eyebrow: '404',
    title: 'This trail ends here.',
    text:
      'The page you are looking for has wandered off. Let us get you back to the good stuff.',
    primary: 'Back to home',
    secondary: 'Browse products'
  }
};

type Dictionary = typeof en;

const zh: Dictionary = {
  meta: {
    home: {
      title: 'PAWLY 派利 — 为日常而生的宠物好物',
      description:
        '从散步、用餐到玩耍与安睡，PAWLY 为猫犬准备恰到好处的日常好物。少而精的产品系列，让相处更轻松。'
    },
    products: {
      title: '产品系列 — PAWLY',
      description:
        '探索 PAWLY 的散步、用餐、玩耍、休息、美容与日常护理产品。按场景筛选，或直接搜索。'
    },
    about: {
      title: '品牌故事 — PAWLY',
      description:
        'PAWLY 是一个小型宠物用品工作室，专注做少而好的日常必需品，让与猫犬相处的每一个瞬间更自然。'
    },
    wholesale: {
      title: '批发、OEM 与贴牌合作 — PAWLY',
      description:
        '与 PAWLY 一起开发宠物产品：支持 OEM/ODM、贴牌、灵活起订量、打样、质检与全球物流。'
    },
    contact: {
      title: '联系我们 — PAWLY',
      description: '产品咨询、批发合作、样品申请或媒体联络，欢迎联系 PAWLY 工作室。'
    },
    legal: {
      title: '隐私与条款 — PAWLY',
      description: '了解 PAWLY 如何处理询盘信息，以及本网站的使用条款。'
    },
    notFound: {
      title: '页面未找到 — PAWLY',
      description: '你访问的页面不存在。'
    }
  },
  common: {
    brand: 'PAWLY',
    menu: '菜单',
    close: '关闭',
    language: '语言',
    english: 'English',
    chinese: '中文',
    viewAll: '查看全部',
    viewDetails: '查看详情',
    explore: '探索',
    learnMore: '了解更多',
    getQuote: '获取报价',
    backHome: '返回首页',
    backToTop: '回到顶部',
    home: '首页',
    products: '产品',
    skipToContent: '跳到主要内容',
    opensInNewTab: '在新标签页打开',
    image: '图片',
    since: '为日常用心而作'
  },
  header: {
    announcement: '新品：Daily Edit 系列——为每一种日常准备的 12 件好物。',
    announcementLink: '看看新系列',
    cta: '获取报价',
    navLabel: '主导航',
    mobileNavLabel: '移动端导航',
    openMenu: '打开菜单',
    closeMenu: '关闭菜单'
  },
  footer: {
    intro:
      '为那个总跟着你的小家伙，准备恰到好处的好物。少而精的系列，覆盖散步、用餐、玩耍与护理。',
    shopHeading: '选购',
    companyHeading: '工作室',
    followHeading: '关注我们',
    contactHeading: '打个招呼',
    allProducts: '全部产品',
    about: '品牌故事',
    wholesale: '批发合作',
    contact: '联系我们',
    legal: '隐私与条款',
    copyright: '© 2026 PAWLY Pet Goods. 保留所有权利。',
    ctaTitle: '有想做的产品？',
    ctaText: '我们喜欢好的合作。告诉我们你正在筹备什么。',
    ctaButton: '开始聊聊',
    languageLabel: '语言 / Language'
  },
  home: {
    hero: {
      eyebrow: '为日常而生的宠物好物',
      title: '为那个总跟着你的',
      accent: '小家伙。',
      text:
        '从散步、用餐到玩耍与安睡，给 TA 恰到好处的陪伴。握在手里舒服，放进日常更自然。',
      primaryCta: '探索全系列',
      secondaryCta: '批发合作',
      note: '宠物友好材质 · 为日常设计 · 全球批发支持',
      cardLabel: '热卖',
      cardName: '云步胸背带',
      cardMeta: '四点调节 · XS–XL',
      cardCta: '查看产品',
      orbit: '宠物友好 · 好日常 · '
    },
    trust: [
      {
        title: '安全是默认选项',
        text: '只选愿意用在自己宠物身上的材料。'
      },
      {
        title: '细节多做一点',
        text: '用恰到好处的设计，让日常照顾更轻松。'
      },
      {
        title: '为长久使用而做',
        text: '经得起使用、清洗、打包，也经得起日复一日的喜欢。'
      }
    ],
    categories: {
      eyebrow: '按日常场景选购',
      title: '四种小日常，拼成毛孩子的好日子。',
      text: '从清晨的第一个懒腰，到夜里最后一个慢悠悠的眨眼。',
      cta: '浏览全部产品',
      cardCta: '去看看'
    },
    bestsellers: {
      eyebrow: 'Daily Edit',
      title: '因为细节，被反复选择。',
      text: '被大家反复拿起的好物，也是我们出门时最先装进包里的那几件。',
      cta: '查看全部产品'
    },
    story: {
      eyebrow: '我们的方式',
      title: '少一点堆砌，多一点日常。',
      paragraphOne:
        '做 PAWLY，是因为宠物货架上的声音太吵了。太多产品、太多概念，真正好用、经得起日常的东西却不够多。',
      paragraphTwo:
        '于是我们给自己定了一个更安静的目标：做一个小而精的系列，每一件都值得留在家里。该软的地方软，该稳的地方稳，好清洗，也好相处。',
      points: [
        {
          title: '少一点，好一点',
          text: '一个有取舍的核心系列，而不是无止境的产品目录。'
        },
        {
          title: '在真实日常里测试',
          text: '打样阶段就交给真实养宠家庭使用，再进入生产。'
        },
        {
          title: '为长久使用设计',
          text: '可替换的细节、可清洗的外套，以及经得起时间的材质。'
        }
      ],
      cta: '读我们的故事',
      stats: [
        { value: '12', label: '件核心好物' },
        { value: '4', label: '种日常场景' },
        { value: '1', label: '套用心标准' }
      ]
    },
    values: {
      eyebrow: 'PAWLY 标准',
      title: '好的设计，应该像本能一样自然。',
      cards: [
        {
          title: '该软的地方，足够柔软',
          text: '加厚接触面、圆润边角，以及看起来好看、摸起来也舒服的面料。'
        },
        {
          title: '融入生活，而不是增加负担',
          text: '可拆洗外套、易擦表面，还有不需要看说明书的细节。'
        },
        {
          title: '更轻的足迹',
          text: '再生材料、更少的零件，以及可再次回收的包装。'
        }
      ]
    },
    wholesale: {
      eyebrow: '批发与贴牌',
      title: '下一款热卖，从这里开始。',
      text:
        '为宠物品牌、零售店与经销商提供灵活的制造合作。从第一只样品到完整贴牌上市，流程清楚，沟通直接。',
      points: ['OEM / ODM 与贴牌定制', '灵活起订量与定制配色', '打样、质检与全球物流'],
      cta: '了解批发合作',
      imageBadge: 'OEM / ODM / 贴牌'
    },
    gallery: {
      eyebrow: '最近的好日子',
      title: '再多一点，日常的快乐。',
      handle: '@pawly.pets',
      captions: ['慢悠悠的早晨', '一起去撒野', '家里最好的位置']
    },
    cta: {
      title: '让日常，再好一点。',
      text: '无论你在找零售合作、贴牌系列，还是只想挑一条合适的胸背带，都欢迎来聊聊。',
      primary: '开始聊聊',
      secondary: '浏览产品'
    }
  },
  products: {
    eyebrow: '产品系列',
    title: '为日常认真做的好物。',
    text: '一个少而精的系列，覆盖散步、用餐、玩耍与护理。按场景筛选，或直接搜索你需要的。',
    all: '全部产品',
    searchLabel: '搜索产品',
    searchPlaceholder: '搜索产品…',
    filterLabel: '按场景筛选',
    results: '件产品',
    resultSingular: '件产品',
    noResultsTitle: '暂时没有找到。',
    noResultsText: '换个关键词，或清除筛选看看完整系列。',
    clearFilters: '清除筛选',
    emptyBadge: '完整系列',
    categoryLabel: '场景',
    viewProduct: '查看产品',
    moqShort: '起订',
    filtersAria: '产品筛选',
    productCountAria: '当前展示的产品数量'
  },
  product: {
    breadcrumbHome: '首页',
    breadcrumbProducts: '产品',
    detailsEyebrow: '产品详情',
    detailsTitle: '每一处，都为日常想过。',
    detailsText: '从材质、结构到那些不起眼的小决定，看看它为什么更好用。',
    featuresTitle: '好用在哪里',
    specsTitle: '产品参数',
    careTitle: '养护与保存',
    colorsTitle: '配色',
    suitableLabel: '适用',
    moqLabel: '批发',
    inquire: '咨询这款产品',
    requestSample: '申请样品',
    shippingNote: '批发订单支持全球发货。欢迎咨询样品、交期与定制配色。',
    galleryLabel: '产品图片',
    thumbnailLabel: '查看图片',
    relatedEyebrow: '配齐同一场景',
    relatedTitle: '你可能也会喜欢',
    relatedText: '同一段日常里，还差这一件。',
    backToProducts: '返回全部产品',
    categoryLink: '探索这个场景',
    nextProduct: '下一款产品'
  },
  about: {
    eyebrow: '品牌故事',
    title: '为那个从不离开你身边的',
    accent: '小家伙，做更好的日常。',
    text:
      'PAWLY 是一个小型宠物用品工作室。我们相信，最好的产品会悄悄融入生活：自然、耐用，也好看。',
    heroCaption: 'PAWLY 心目中，好日子该有的样子。',
    introEyebrow: '为什么是 PAWLY',
    introTitle: '一切从一个很简单的问题开始。',
    introParagraphOne:
      '我们自己家里，真正想要的是什么？不是又一个新奇的玩意儿，也不是下一阵风潮。只是几件做得足够好的东西，让和宠物相处的日常更从容、更柔软、也更有趣。',
    introParagraphTwo:
      '所以我们从具体的日常出发：早晨的散步、会弄脏的饭桌、雨天的午睡、每周一次的梳理。每件产品都从这些时刻开始，先想清楚它要让哪一刻变得更好。',
    valuesEyebrow: '我们相信',
    valuesTitle: '三条会一直坚持的原则。',
    values: [
      {
        number: '01',
        title: '从动物本身出发',
        text: '舒适、安全与体面，排在潮流之前。每一个形状，都在真实的身体与真实的日常里测试过。'
      },
      {
        number: '02',
        title: '少用一点材料',
        text: '减少零件，优先选择再生、可清洗、来源负责的材料。'
      },
      {
        number: '03',
        title: '为长久使用设计',
        text: '可替换的外套、可修补的细节，以及不需要下一季就换掉的耐看颜色。'
      }
    ],
    processEyebrow: '我们如何工作',
    processTitle: '慢一点，才能做对。',
    processText: '我们是一个小团队，也喜欢这样。项目少一点，才能把每一条缝线、每一处表面、每一个卡扣都看仔细。',
    process: [
      {
        number: '01',
        title: '倾听',
        text: '和养宠家庭、美容师、零售伙伴聊天，弄清楚真正缺少的是什么。'
      },
      {
        number: '02',
        title: '打样',
        text: '从粗糙的样品开始，在反复试穿、清洗与日常使用中，慢慢变成真正的产品。'
      },
      {
        number: '03',
        title: '打磨',
        text: '检查材质、结构、包装，以及那些看起来很小、用起来却很重要的细节。'
      },
      {
        number: '04',
        title: '生产',
        text: '样品确认后进入小批量生产，每一个关键节点都有明确的质检。'
      }
    ],
    materialsEyebrow: '材质',
    materialsTitle: '更轻的足迹，不减分的好用。',
    materialsText:
      '我们会寻找经得起日常、也经得起反复使用的材料，然后尽量少用一点。最终得到的是更克制的设计，而不是妥协的产品。',
    materialsList: ['在性能允许的地方使用再生面料', '食品级陶瓷与硅胶', '来源负责的榉木与竹材', '可回收、尺寸合适的包装'],
    materialsCaption: '少一点浪费，多一点使用。',
    ctaEyebrow: '来聊聊',
    ctaTitle: '好产品，从一次好的对话开始。',
    ctaText: '无论你是在为一只狗挑选日常用品，还是在筹备一整个系列，都欢迎联系我们。',
    ctaPrimary: '浏览产品系列',
    ctaSecondary: '与我们合作'
  },
  wholesale: {
    eyebrow: '批发与 OEM',
    title: '下一款热卖',
    accent: '从这里开始。',
    text:
      '我们与宠物品牌、独立零售店和经销商合作，把好想法变成卖得动、也留得住的产品。',
    cta: '开始聊聊',
    secondaryCta: '查看产品系列',
    stats: [
      { value: '灵活起订', label: '可以先小批量试单，再逐步放量。' },
      { value: 'OEM / ODM', label: '你的品牌、你的配色、你的包装。' },
      { value: '样品先行', label: '确认细节，再进入生产。' }
    ],
    capabilitiesEyebrow: '我们能做什么',
    capabilitiesTitle: '从第一个想法，到零售货架。',
    capabilitiesText: '为在意品质、也在意销售的品牌，提供清楚、务实的合作方式。',
    capabilities: [
      {
        number: '01',
        title: '产品开发',
        text: '带着草图、参考，或一个市场空白来找我们，一起把它变成可生产的产品。'
      },
      {
        number: '02',
        title: '贴牌定制',
        text: '在成熟的版型上，加入你的标志、配色与包装。'
      },
      {
        number: '03',
        title: '定制配色',
        text: '低起订量配色服务，覆盖面料、织带与陶瓷。'
      },
      {
        number: '04',
        title: '包装设计',
        text: '适合零售陈列的彩盒、内衬与条码支持。'
      },
      {
        number: '05',
        title: '质量管控',
        text: '生产中检查与出货前验货，附照片报告。'
      },
      {
        number: '06',
        title: '全球物流',
        text: 'FOB、EXW，或与你的货代配合门到门。'
      }
    ],
    processEyebrow: '合作流程',
    processTitle: '一条清楚的上市路径。',
    processText: '没有黑箱。接下来做什么、谁来做、什么时候做，都会说清楚。',
    process: [
      {
        number: '01',
        title: '告诉我们你的想法',
        text: '聊聊你的品牌、产品方向、目标价格与时间计划。'
      },
      {
        number: '02',
        title: '打样与报价',
        text: '确认材质、起订量与模具，再寄样确认。'
      },
      {
        number: '03',
        title: '确定细节',
        text: '锁定配色、包装、标签与合规文件。'
      },
      {
        number: '04',
        title: '生产与验货',
        text: '收到定金后开始生产，关键节点同步质检。'
      },
      {
        number: '05',
        title: '出货与上市',
        text: '安排验货、单证，并与你的货代完成交接。'
      }
    ],
    customizeEyebrow: '做成你的样子',
    customizeTitle: '那些让它成为你品牌的细节。',
    customizeText: '从表面处理、包装到小配件，自由组合。我们会帮你选出对市场真正重要的，省略不必要的。',
    customizeItems: ['配色', '压印标志', '织唛标签', '吊牌', '零售包装', '双语说明卡', '条码与 FNSKU', '样品套装'],
    partnerEyebrow: '合作关系',
    partnerTitle: '一起走得更久的伙伴。',
    partnerTextOne:
      '我们不是平台，也不是中间商。我们用自己的小团队开发、采购与生产，所以给你报价的人，离真正做产品的人很近。',
    partnerTextTwo: '这意味着更诚实的时间表、更务实的问题解决方式，以及一个过了第一季仍然成立的产品。',
    faqEyebrow: '你可能想知道',
    faqTitle: '常见问题。',
    faqs: [
      {
        question: '起订量是多少？',
        answer: '取决于产品与定制内容。多数核心产品 100–300 件起订，条件允许时也可以安排更小的试单。'
      },
      {
        question: '可以做我们的品牌吗？',
        answer: '可以。支持 OEM、ODM 与贴牌，包括定制配色、标签、包装与双语说明卡。'
      },
      {
        question: '打样需要多久？',
        answer: '时间取决于材质与定制复杂度。细节确认后，我们会在报价中给出明确的打样时间表。'
      },
      {
        question: '可以提供合规文件吗？',
        answer: '我们可以提供适用于目标市场的现有材质与测试文件。不同国家要求不同，请告诉我们销售地区。'
      },
      {
        question: '可以先小批量试单吗？',
        answer: '通常可以。在进入大批量生产前，我们可以一起设计一个更小的首单。'
      },
      {
        question: '发货到哪些市场？',
        answer: '我们与全球伙伴合作，可以配合你的货代，也可以协助推荐物流路线。'
      }
    ],
    formEyebrow: '开始一个项目',
    formTitle: '告诉我们，你正在筹备什么。',
    formText: '留下一些基本信息，我们会带着下一步建议、样品方案与初步报价回复你。',
    directLabel: '更喜欢邮件？',
    directText: '也可以直接写信到'
  },
  contact: {
    eyebrow: '联系我们',
    title: '聊聊，怎么让日常更好。',
    text: '产品问题、批发咨询，或一张你家毛孩子的照片，都欢迎。',
    emailLabel: '邮箱',
    whatsappLabel: 'WhatsApp',
    studioLabel: '工作室',
    socialLabel: '社交媒体',
    responseTitle: '会有真实的人回复。',
    responseText: '我们团队不大，每一条消息都会被熟悉产品的人认真读到。通常会在两个工作日内回复。',
    formEyebrow: '写封信',
    formTitle: '有什么可以帮你？',
    formText: '简单说说你的问题或项目。背景越清楚，我们越能帮上忙。',
    faqLink: '想看批发合作信息？',
    faqCta: '前往批发合作页'
  },
  form: {
    name: '你的名字',
    namePlaceholder: 'Alex Morgan',
    company: '公司',
    companyOptional: '公司（选填）',
    companyPlaceholder: '你的工作室或店铺',
    email: '邮箱',
    emailPlaceholder: 'alex@company.com',
    country: '国家 / 地区',
    countryPlaceholder: '中国',
    interest: '我想了解',
    interestOptions: [
      { value: 'general', label: '一般咨询' },
      { value: 'wholesale', label: '批发合作' },
      { value: 'sample', label: '样品申请' },
      { value: 'press', label: '媒体与合作' }
    ],
    product: '感兴趣的产品',
    productPlaceholder: '还没确定',
    message: '留言',
    messagePlaceholder: '简单说说你正在寻找什么…',
    consent: '我同意就本次咨询接受联系。',
    consentLink: '隐私与条款',
    submit: '发送咨询',
    optional: '选填',
    required: '请填写这一栏。',
    emailError: '请输入有效的邮箱地址。',
    consentError: '请先勾选同意。',
    successTitle: '邮件应用应该已经打开。',
    successText: '你的咨询内容已准备好。如果没有自动打开邮件应用，可以直接写信到',
    fallback: '或直接发邮件给我们',
    privacyNote: '我们只会使用你的信息来回复本次咨询。',
    subjectPrefix: 'PAWLY 咨询',
    wholesaleSubject: '批发合作咨询',
    generalSubject: '网站咨询',
    sampleSubject: '样品申请',
    labels: {
      name: '姓名',
      company: '公司',
      email: '邮箱',
      country: '国家 / 地区',
      interest: '咨询类型',
      product: '产品',
      message: '留言'
    }
  },
  legal: {
    eyebrow: '小小说明',
    title: '隐私与条款',
    updated: '最后更新：2026 年 10 月',
    intro:
      '本页说明 PAWLY 如何处理你通过本网站分享的信息，以及使用本网站时适用的条款。这是一份演示版政策，正式上线前请交由法律顾问审阅。',
    sections: [
      {
        title: '我们是谁',
        body: 'PAWLY Pet Goods 是一个宠物用品工作室。如对隐私有任何疑问，可写信至 hello@pawly.example。'
      },
      {
        title: '我们收集什么',
        body:
          '当你发送咨询时，我们会收到你主动填写的信息，例如姓名、公司、邮箱、国家/地区、感兴趣的产品与留言。本演示网站不使用分析或广告 Cookie。'
      },
      {
        title: '我们如何使用',
        body: '这些信息仅用于回复你的咨询，并在需要时准备报价或样品安排。我们不会出售个人信息。'
      },
      {
        title: '你的选择',
        body:
          '你可以写信至 hello@pawly.example，要求查询、更正或删除你提供的信息。我们会在合理时间内处理。'
      },
      {
        title: '网站条款',
        body:
          '本网站用于产品展示。产品供应情况、规格、价格与交期以书面报价为准。演示文案与图片仅用于展示，正式上线前应审阅并替换。'
      },
      {
        title: '联系我们',
        body: '如对本页有疑问，请写信至 hello@pawly.example。'
      }
    ]
  },
  notFound: {
    eyebrow: '404',
    title: '这条路，走到这里啦。',
    text: '你找的页面可能跑出去玩了。我们带你回到正轨。',
    primary: '返回首页',
    secondary: '浏览产品'
  }
};

export const ui: Record<Lang, Dictionary> = { en, zh };

export type UI = Dictionary;
