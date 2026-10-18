import { asset, type Lang, type LocalizedString } from './site';

export type CategoryId = 'walk' | 'meal' | 'play' | 'groom';

export interface Category {
  id: CategoryId;
  number: string;
  name: LocalizedString;
  short: LocalizedString;
  description: LocalizedString;
  image: string;
  alt: LocalizedString;
  accent: string;
}

export interface ProductImage {
  src: string;
  alt: LocalizedString;
}

export interface Colorway {
  name: LocalizedString;
  hex: string;
}

export interface Product {
  slug: string;
  order: number;
  category: CategoryId;
  name: LocalizedString;
  tagline: LocalizedString;
  description: LocalizedString;
  badge?: LocalizedString;
  suitable: LocalizedString;
  features: Record<Lang, string[]>;
  specs: Record<Lang, Array<{ label: string; value: string }>>;
  care: LocalizedString;
  moq: LocalizedString;
  colors: Colorway[];
  images: ProductImage[];
  featured?: boolean;
}

const t = (en: string, zh: string): LocalizedString => ({ en, zh });
const img = (name: string): string => asset(`/images/${name}`);

export const categories: Category[] = [
  {
    id: 'walk',
    number: '01',
    name: t('Walk & Travel', '散步与出行'),
    short: t('Walk', '散步'),
    description: t(
      'Harness, leash, and travel comfort for every adventure.',
      '胸背、牵引与出行舒适装备，陪你们走得更远。'
    ),
    image: img('category-walk.webp'),
    alt: t(
      'Golden retriever running on a beach in a green harness',
      '戴着绿色胸背带在海边奔跑的金毛犬'
    ),
    accent: '#DCE8DE'
  },
  {
    id: 'meal',
    number: '02',
    name: t('Meal Time', '用餐时光'),
    short: t('Meal', '用餐'),
    description: t(
      'Slow feeders, bowls, and hydration made for calmer meals.',
      '慢食碗、饮水与储粮好物，让每一餐更从容。'
    ),
    image: img('category-meal.webp'),
    alt: t('A ceramic bowl filled with dog kibble', '装满狗粮的陶瓷碗'),
    accent: '#F6E2C8'
  },
  {
    id: 'play',
    number: '03',
    name: t('Play & Rest', '玩耍与休息'),
    short: t('Play', '玩耍'),
    description: t(
      'Toys, scratchers, and soft places to land.',
      '玩具、猫抓与柔软睡窝，认真玩，也好好睡。'
    ),
    image: img('category-play.webp'),
    alt: t('A cat playing with a sisal scratching post', '正在玩剑麻猫抓柱的猫'),
    accent: '#DDE7E4'
  },
  {
    id: 'groom',
    number: '04',
    name: t('Groom & Care', '美容与护理'),
    short: t('Groom', '护理'),
    description: t(
      'Gentle grooming essentials for clean, happy everyday care.',
      '温和的美容与日常护理，让亲密时刻更舒服。'
    ),
    image: img('category-groom.webp'),
    alt: t('A golden retriever being gently brushed', '正在被轻柔梳理毛发的金毛犬'),
    accent: '#F3DCD3'
  }
];

export const products: Product[] = [
  {
    slug: 'cloudstep-harness',
    order: 1,
    category: 'walk',
    name: t('CloudStep Harness', '云步胸背带'),
    tagline: t(
      'Featherlight support for big little adventures.',
      '轻若无物，稳稳托住每一次出发。'
    ),
    description: t(
      'A breathable, padded harness for daily walks and weekend trails. The stepped neckline keeps pressure away from the throat, while four adjustment points create a close, comfortable fit for dogs of every shape.',
      '为日常散步与周末远足设计的透气加厚胸背带。阶梯式领口避开喉咙压力，四点调节贴合不同体型的狗狗，跑跳时也稳稳当当。'
    ),
    badge: t('Best seller', '热卖'),
    suitable: t('Dogs · XS–XL', '狗狗 · XS–XL'),
    features: {
      en: [
        'Four-point adjustable fit with a padded chest panel',
        'Breathable recycled ripstop shell',
        'Reflective trim for low-light walks',
        'Quick-release buckle and aluminium D-ring'
      ],
      zh: ['四点调节，加厚胸垫分散拉力', '透气再生防撕面料', '反光包边，弱光散步更安心', '快拆卡扣与轻量铝制 D 环']
    },
    specs: {
      en: [
        { label: 'Material', value: 'Recycled ripstop nylon, recycled polyester padding' },
        { label: 'Sizes', value: 'XS–XL (neck 24–52 cm)' },
        { label: 'Colors', value: 'Pine, Clay, Sand' },
        { label: 'Weight', value: '180–310 g' },
        { label: 'Care', value: 'Hand wash cold, air dry' }
      ],
      zh: [
        { label: '材质', value: '再生防撕尼龙、再生聚酯纤维填充' },
        { label: '尺码', value: 'XS–XL（颈围 24–52 cm）' },
        { label: '配色', value: '松林绿、陶土橙、燕麦沙' },
        { label: '重量', value: '180–310 克' },
        { label: '养护', value: '冷水手洗，自然晾干' }
      ]
    },
    care: t(
      'Hand wash in cold water with a mild detergent. Air dry away from direct heat, and check the buckles and straps regularly.',
      '使用温和洗涤剂冷水手洗，避开热源自然晾干。定期检查卡扣与织带状态。'
    ),
    moq: t('100 pcs · custom colours available', '100 件起订 · 支持定制配色'),
    colors: [
      { name: t('Pine', '松林绿'), hex: '#173F35' },
      { name: t('Clay', '陶土橙'), hex: '#C96A4B' },
      { name: t('Sand', '燕麦沙'), hex: '#D8C6A5' }
    ],
    images: [
      {
        src: img('product-cloudstep-harness.webp'),
        alt: t(
          'Golden retriever wearing a green harness on a beach',
          '戴着绿色胸背带在海边奔跑的金毛犬'
        )
      },
      {
        src: img('story-trail.webp'),
        alt: t('Two dogs running together on a trail', '两只狗在小径上一起奔跑')
      },
      {
        src: img('category-walk.webp'),
        alt: t('A dog exploring the coastline', '在海边探索的狗狗')
      }
    ],
    featured: true
  },
  {
    slug: 'everyday-leash',
    order: 2,
    category: 'walk',
    name: t('Everyday Leash', '日常牵引绳'),
    tagline: t(
      'A soft, strong leash that feels good in the hand.',
      '柔软、结实，握在手里刚刚好。'
    ),
    description: t(
      'Woven from recycled webbing with a supple handle and a lightweight swivel clip. Available in two lengths for city blocks and wide-open spaces.',
      '采用再生织带编织，搭配柔软手柄与轻量旋转挂钩。两种长度可选，从城市街区到开阔郊野都从容。'
    ),
    suitable: t('Dogs · 1.5 m / 2.2 m', '狗狗 · 1.5 米 / 2.2 米'),
    features: {
      en: [
        'Recycled nylon webbing, 20 mm width',
        'Padded handle with a soft neoprene lining',
        '360° swivel clip',
        'Two lengths for city walks and open trails'
      ],
      zh: ['20 mm 宽再生尼龙织带', '加厚手柄，柔软氯丁橡胶内衬', '360° 旋转挂钩', '两种长度，适配城市与户外']
    },
    specs: {
      en: [
        { label: 'Material', value: 'Recycled nylon, neoprene, zinc alloy' },
        { label: 'Lengths', value: '1.5 m / 2.2 m' },
        { label: 'Hardware', value: 'Lightweight zinc alloy swivel clip' },
        { label: 'Care', value: 'Hand wash, air dry' }
      ],
      zh: [
        { label: '材质', value: '再生尼龙、氯丁橡胶、锌合金' },
        { label: '长度', value: '1.5 米 / 2.2 米' },
        { label: '五金', value: '轻量锌合金旋转挂钩' },
        { label: '养护', value: '手洗，自然晾干' }
      ]
    },
    care: t(
      'Rinse after muddy walks and hang to dry. Store loosely coiled to protect the webbing.',
      '泥泞散步后清水冲洗并悬挂晾干。松散盘绕存放，保护织带。'
    ),
    moq: t('100 pcs · custom lengths available', '100 件起订 · 支持定制长度'),
    colors: [
      { name: t('Pine', '松林绿'), hex: '#173F35' },
      { name: t('Clay', '陶土橙'), hex: '#C96A4B' },
      { name: t('Sand', '燕麦沙'), hex: '#D8C6A5' }
    ],
    images: [
      {
        src: img('product-everyday-leash.webp'),
        alt: t('Golden retriever portrait outdoors', '户外的金毛犬肖像')
      },
      {
        src: img('story-trail.webp'),
        alt: t('Two dogs running together on a trail', '两只狗在小径上一起奔跑')
      },
      {
        src: img('category-walk.webp'),
        alt: t('A dog exploring the coastline', '在海边探索的狗狗')
      }
    ]
  },
  {
    slug: 'trailnap-mat',
    order: 3,
    category: 'walk',
    name: t('TrailNap Travel Mat', '随行小憩垫'),
    tagline: t(
      'A familiar place to land, wherever the day takes you.',
      '把熟悉的小窝，带到每一段旅程。'
    ),
    description: t(
      'A roll-up mat with a soft brushed surface and a water-resistant base. Light enough for a tote, cozy enough for a nap after a long walk.',
      '可卷收的随行垫，柔软刷毛表层搭配防泼水底座。轻到能塞进托特包，也舒服到能在长途散步后好好睡一觉。'
    ),
    badge: t('New', '新品'),
    suitable: t('Dogs & cats · One size', '猫犬通用 · 单一尺寸'),
    features: {
      en: [
        'Rolls up with an elastic travel strap',
        'Brushed recycled fleece top',
        'Water-resistant, wipe-clean base',
        'Machine washable'
      ],
      zh: ['弹性收纳带，轻松卷起', '刷毛再生摇粒绒表层', '防泼水易擦底座', '可机洗']
    },
    specs: {
      en: [
        { label: 'Material', value: 'Recycled polyester fleece, water-resistant base' },
        { label: 'Size', value: '60 × 45 cm' },
        { label: 'Weight', value: '420 g' },
        { label: 'Care', value: 'Machine wash cold, tumble dry low' }
      ],
      zh: [
        { label: '材质', value: '再生聚酯摇粒绒、防泼水底层' },
        { label: '尺寸', value: '60 × 45 cm' },
        { label: '重量', value: '420 克' },
        { label: '养护', value: '冷水机洗，低温烘干' }
      ]
    },
    care: t(
      'Machine wash cold on a gentle cycle. Tumble dry low and reshape while slightly damp.',
      '冷水轻柔机洗，低温烘干，微湿时整理形状。'
    ),
    moq: t('150 pcs · custom sizes available', '150 件起订 · 支持定制尺寸'),
    colors: [
      { name: t('Oat', '燕麦色'), hex: '#D8C6A5' },
      { name: t('Sage', '鼠尾草绿'), hex: '#A9C4B1' }
    ],
    images: [
      {
        src: img('product-trailnap-mat.webp'),
        alt: t('A puppy resting in a soft blanket', '在柔软毯子里休息的小狗')
      },
      {
        src: img('story-rest.webp'),
        alt: t('A cat sleeping under a duvet', '在被子下睡觉的猫')
      },
      {
        src: img('story-home.webp'),
        alt: t('A cat sitting on warm stone steps', '坐在温暖石阶上的猫')
      }
    ]
  },
  {
    slug: 'slowfeast-bowl',
    order: 4,
    category: 'meal',
    name: t('SlowFeast Bowl', '慢食碗'),
    tagline: t('A gentler pace for happier digestion.', '慢一点吃，舒服一点。'),
    description: t(
      'A shallow maze of ridges turns gulped meals into a calm, sniff-and-seek ritual. The weighted base stays put, and the food-safe ceramic is easy to clean.',
      '浅浅的迷宫纹理，把狼吞虎咽变成一场安静的寻宝游戏。加重底座稳稳不滑动，食品级陶瓷也方便清洗。'
    ),
    badge: t('Calm mealtime', '从容用餐'),
    suitable: t('Dogs & cats · 350 ml', '猫犬通用 · 350 毫升'),
    features: {
      en: [
        'Maze ridges gently slow fast eaters',
        'Weighted, non-slip base',
        'Food-safe glazed ceramic',
        'Dishwasher safe'
      ],
      zh: ['迷宫纹理，温和放慢进食速度', '加重防滑底座', '食品级釉面陶瓷', '可用洗碗机清洗']
    },
    specs: {
      en: [
        { label: 'Material', value: 'Food-safe glazed stoneware' },
        { label: 'Capacity', value: '350 ml' },
        { label: 'Dimensions', value: '22 × 22 × 5 cm' },
        { label: 'Care', value: 'Dishwasher safe' }
      ],
      zh: [
        { label: '材质', value: '食品级釉面陶瓷' },
        { label: '容量', value: '350 毫升' },
        { label: '尺寸', value: '22 × 22 × 5 cm' },
        { label: '养护', value: '可用洗碗机清洗' }
      ]
    },
    care: t(
      'Dishwasher safe on a normal cycle. Avoid sudden temperature changes to protect the glaze.',
      '可正常机洗。避免骤冷骤热，以保护釉面。'
    ),
    moq: t('120 pcs · custom glazes available', '120 件起订 · 支持定制釉色'),
    colors: [
      { name: t('Cream', '奶油白'), hex: '#F2EADB' },
      { name: t('Sage', '鼠尾草绿'), hex: '#A9C4B1' },
      { name: t('Terracotta', '陶土红'), hex: '#C96A4B' }
    ],
    images: [
      {
        src: img('product-slowfeast-bowl.webp'),
        alt: t('A ceramic bowl filled with dog kibble', '装满狗粮的陶瓷碗')
      },
      {
        src: img('category-meal.webp'),
        alt: t('A pet bowl on a warm wooden floor', '放在温暖木地板上的宠物碗')
      },
      {
        src: img('story-home.webp'),
        alt: t('A cat sitting on warm stone steps', '坐在温暖石阶上的猫')
      }
    ],
    featured: true
  },
  {
    slug: 'sipgo-bottle',
    order: 5,
    category: 'meal',
    name: t('Sip&Go Bottle', '随行饮水瓶'),
    tagline: t('Fresh water, one easy sip away.', '轻轻一按，随时喝到干净的水。'),
    description: t(
      'A leak-resistant travel bottle with a silicone trough and a one-hand release. Designed for long walks, road trips, and warm afternoons at the park.',
      '防漏随行饮水瓶，硅胶水槽搭配单手开合设计。为长途散步、公路旅行和公园里的炎热午后准备。'
    ),
    suitable: t('Dogs · 350 ml', '狗狗 · 350 毫升'),
    features: {
      en: [
        'One-hand flip-and-sip design',
        'Leak-resistant silicone seal',
        'BPA-free, food-grade materials',
        'Fits most car cup holders'
      ],
      zh: ['单手翻盖饮水设计', '防漏硅胶密封圈', '不含 BPA 的食品级材质', '适配多数车载杯架']
    },
    specs: {
      en: [
        { label: 'Capacity', value: '350 ml' },
        { label: 'Material', value: 'Food-grade PP, silicone' },
        { label: 'Dimensions', value: '24 × 7 cm' },
        { label: 'Care', value: 'Hand wash, air dry' }
      ],
      zh: [
        { label: '容量', value: '350 毫升' },
        { label: '材质', value: '食品级 PP、硅胶' },
        { label: '尺寸', value: '24 × 7 cm' },
        { label: '养护', value: '手洗，自然晾干' }
      ]
    },
    care: t(
      'Rinse the trough after each use. Hand wash with mild soap and leave open to air dry.',
      '每次使用后冲洗水槽，用温和皂液手洗，打开晾干。'
    ),
    moq: t('200 pcs · custom colours available', '200 件起订 · 支持定制配色'),
    colors: [
      { name: t('Pine', '松林绿'), hex: '#173F35' },
      { name: t('Clay', '陶土橙'), hex: '#C96A4B' }
    ],
    images: [
      {
        src: img('product-sipgo-bottle.webp'),
        alt: t('Beagle smiling outdoors', '在户外微笑的比格犬')
      },
      {
        src: img('category-walk.webp'),
        alt: t('A dog exploring the coastline', '在海边探索的狗狗')
      },
      {
        src: img('story-trail.webp'),
        alt: t('Two dogs running together on a trail', '两只狗在小径上一起奔跑')
      }
    ]
  },
  {
    slug: 'pebble-jar',
    order: 6,
    category: 'meal',
    name: t('Pebble Food Jar', '鹅卵石储粮罐'),
    tagline: t(
      'Keep every biscuit fresh, and every countertop calm.',
      '锁住新鲜，也留住台面上的从容。'
    ),
    description: t(
      'A stoneware jar with a bamboo lid and a silicone gasket. The wide mouth makes scooping easy; the matte glaze looks at home on any shelf.',
      '陶瓷储粮罐搭配竹制盖与硅胶密封圈。广口设计方便取粮，哑光釉面放在任何置物架上都自然好看。'
    ),
    badge: t('Pantry favorite', '储粮好物'),
    suitable: t('Dogs & cats · 1.2 L / 2 L', '猫犬通用 · 1.2 升 / 2 升'),
    features: {
      en: [
        'Airtight bamboo lid with silicone gasket',
        'Food-safe matte stoneware',
        'Wide mouth for easy scooping',
        'Available in two sizes'
      ],
      zh: ['竹制密封盖与硅胶圈', '食品级哑光陶瓷', '广口设计，方便取粮', '两种容量可选']
    },
    specs: {
      en: [
        { label: 'Material', value: 'Stoneware, bamboo, silicone' },
        { label: 'Capacity', value: '1.2 L / 2 L' },
        { label: 'Dimensions', value: '13 × 18 cm / 15 × 22 cm' },
        { label: 'Care', value: 'Wipe clean; do not soak the lid' }
      ],
      zh: [
        { label: '材质', value: '陶瓷、竹木、硅胶' },
        { label: '容量', value: '1.2 升 / 2 升' },
        { label: '尺寸', value: '13 × 18 cm / 15 × 22 cm' },
        { label: '养护', value: '擦拭清洁，盖子避免浸泡' }
      ]
    },
    care: t(
      'Wipe the stoneware with a damp cloth. Hand wipe the bamboo lid and let it dry completely before closing.',
      '用湿布擦拭陶瓷罐身。竹盖手工擦拭，完全干燥后再盖回。'
    ),
    moq: t('150 pcs · custom sizes available', '150 件起订 · 支持定制尺寸'),
    colors: [
      { name: t('Cream', '奶油白'), hex: '#F2EADB' },
      { name: t('Sage', '鼠尾草绿'), hex: '#A9C4B1' }
    ],
    images: [
      {
        src: img('product-pebble-jar.webp'),
        alt: t('Black and white cat against a green wall', '绿色墙面前的奶牛猫')
      },
      {
        src: img('category-meal.webp'),
        alt: t('A pet bowl on a warm wooden floor', '放在温暖木地板上的宠物碗')
      },
      {
        src: img('story-home.webp'),
        alt: t('A cat sitting on warm stone steps', '坐在温暖石阶上的猫')
      }
    ]
  },
  {
    slug: 'tug-tumble-toy',
    order: 7,
    category: 'play',
    name: t('Tug & Tumble Toy', '拔河翻滚玩具'),
    tagline: t(
      'Built for the games that never get old.',
      '为那些永远玩不腻的游戏而生。'
    ),
    description: t(
      'A durable two-texture toy for tugging, fetching, and solo gnawing. Natural rubber stands up to enthusiastic play, while the cotton rope is gentle on teeth and gums.',
      '耐玩的双材质玩具，适合拔河、寻回和独自啃咬。天然橡胶经得住热情扑腾，棉绳则对牙齿和牙龈更温和。'
    ),
    badge: t('Play tested', '玩耍认证'),
    suitable: t('Dogs · Medium & large', '狗狗 · 中型与大型'),
    features: {
      en: [
        'Natural rubber and cotton rope',
        'Two textures for different play styles',
        'Tug, fetch, and chew friendly',
        'Easy to rinse clean'
      ],
      zh: ['天然橡胶与棉绳', '双材质，适配不同玩法', '适合拔河、寻回与啃咬', '清水冲洗即可']
    },
    specs: {
      en: [
        { label: 'Material', value: 'Natural rubber, cotton rope' },
        { label: 'Size', value: '28 × 8 cm' },
        { label: 'Suitability', value: 'Medium and large dogs' },
        { label: 'Care', value: 'Rinse with water, air dry' }
      ],
      zh: [
        { label: '材质', value: '天然橡胶、棉绳' },
        { label: '尺寸', value: '28 × 8 cm' },
        { label: '适用', value: '中型犬与大型犬' },
        { label: '养护', value: '清水冲洗，自然晾干' }
      ]
    },
    care: t(
      'Rinse after outdoor play. Inspect regularly and replace at the first sign of wear.',
      '户外玩耍后清水冲洗。定期检查，出现磨损迹象时及时更换。'
    ),
    moq: t('200 pcs · custom colours available', '200 件起订 · 支持定制配色'),
    colors: [
      { name: t('Clay', '陶土橙'), hex: '#C96A4B' },
      { name: t('Pine', '松林绿'), hex: '#173F35' }
    ],
    images: [
      {
        src: img('product-tug-tumble.webp'),
        alt: t('Puppy running through a sunlit field', '在阳光草地上奔跑的小狗')
      },
      {
        src: img('story-trail.webp'),
        alt: t('Two dogs running together on a trail', '两只狗在小径上一起奔跑')
      },
      {
        src: img('category-play.webp'),
        alt: t('A cat playing with a sisal scratching post', '正在玩剑麻猫抓柱的猫')
      }
    ]
  },
  {
    slug: 'scratch-tower',
    order: 8,
    category: 'play',
    name: t('Scratch & Seek Tower', '抓抓寻宝塔'),
    tagline: t(
      'A place to stretch, scratch, and survey the room.',
      '伸个懒腰，磨磨爪子，再巡视一下领地。'
    ),
    description: t(
      'A compact sisal tower with a dangling pom-pom and a hidden treat pocket. It gives indoor cats a healthy outlet for scratching and a cozy spot to perch.',
      '紧凑型剑麻猫抓塔，配有悬挂毛球与隐藏零食袋。给室内猫一个健康磨爪的去处，也是一方舒服的观察台。'
    ),
    badge: t('Cat approved', '猫咪最爱'),
    suitable: t('Cats · Compact spaces', '猫咪 · 小空间友好'),
    features: {
      en: [
        'Dense sisal rope for satisfying scratches',
        'Dangling pom-pom and hidden treat pocket',
        'Stable weighted base',
        'Compact footprint for small spaces'
      ],
      zh: ['高密度剑麻绳，耐抓耐磨', '悬挂毛球与隐藏零食袋', '加重底座更稳固', '占地小巧，适合公寓']
    },
    specs: {
      en: [
        { label: 'Material', value: 'Sisal, recycled board, cotton' },
        { label: 'Dimensions', value: '38 × 38 × 52 cm' },
        { label: 'Weight', value: '2.4 kg' },
        { label: 'Care', value: 'Vacuum and spot clean' }
      ],
      zh: [
        { label: '材质', value: '剑麻、再生板材、棉' },
        { label: '尺寸', value: '38 × 38 × 52 cm' },
        { label: '重量', value: '2.4 千克' },
        { label: '养护', value: '吸尘与局部清洁' }
      ]
    },
    care: t(
      'Vacuum loose fibres regularly. Rotate the tower occasionally for even wear.',
      '定期吸走松散纤维。偶尔转动猫抓塔，让磨损更均匀。'
    ),
    moq: t('100 pcs · custom heights available', '100 件起订 · 支持定制高度'),
    colors: [
      { name: t('Oat', '燕麦色'), hex: '#D8C6A5' },
      { name: t('Sage', '鼠尾草绿'), hex: '#A9C4B1' }
    ],
    images: [
      {
        src: img('product-scratch-tower.webp'),
        alt: t('A cat playing with a sisal scratching post', '正在玩剑麻猫抓柱的猫')
      },
      {
        src: img('category-play.webp'),
        alt: t('A kitten reaching for a toy', '伸手够玩具的小猫')
      },
      {
        src: img('story-rest.webp'),
        alt: t('A cat sleeping under a duvet', '在被子下睡觉的猫')
      }
    ]
  },
  {
    slug: 'cloudnine-bed',
    order: 9,
    category: 'play',
    name: t('CloudNine Bed', '云端睡窝'),
    tagline: t('The soft landing they deserve.', '给 TA 一个值得的柔软落点。'),
    description: t(
      'A deep, supportive bed with a bolstered edge and a plush, removable cover. The low front makes it easy to step in; the recycled fill keeps its shape night after night.',
      '深窝设计搭配围边与柔软可拆洗外套，给身体恰到好处的承托。低门槛方便进出，再生纤维填充历经夜晚也不易塌陷。'
    ),
    badge: t('Best seller', '热卖'),
    suitable: t('Dogs & cats · S / M / L', '猫犬通用 · S / M / L'),
    features: {
      en: [
        'Bolstered edge for head-and-neck support',
        'Removable, machine-washable cover',
        'Recycled fiber fill',
        'Low front for easy entry'
      ],
      zh: ['围边设计，承托头颈', '可拆卸可机洗外套', '再生纤维填充', '低门槛，进出更方便']
    },
    specs: {
      en: [
        { label: 'Material', value: 'Recycled polyester, cotton blend' },
        { label: 'Sizes', value: 'S / M / L' },
        { label: 'Care', value: 'Cover machine wash cold; air dry' },
        { label: 'Colours', value: 'Oat, Sage, Clay' }
      ],
      zh: [
        { label: '材质', value: '再生聚酯纤维、棉混纺' },
        { label: '尺码', value: 'S / M / L' },
        { label: '养护', value: '外套冷水机洗，自然晾干' },
        { label: '配色', value: '燕麦色、鼠尾草绿、陶土橙' }
      ]
    },
    care: t(
      'Remove the cover and machine wash cold on a gentle cycle. Air dry and fluff the fill before replacing.',
      '拆下外套，冷水轻柔机洗。自然晾干后轻拍填充，再套回使用。'
    ),
    moq: t('80 pcs · custom sizes available', '80 件起订 · 支持定制尺寸'),
    colors: [
      { name: t('Oat', '燕麦色'), hex: '#D8C6A5' },
      { name: t('Sage', '鼠尾草绿'), hex: '#A9C4B1' },
      { name: t('Clay', '陶土橙'), hex: '#C96A4B' }
    ],
    images: [
      {
        src: img('product-cloudnine-bed.webp'),
        alt: t('Tabby cat sitting on warm stone steps', '坐在温暖石阶上的虎斑猫')
      },
      {
        src: img('story-rest.webp'),
        alt: t('A cat sleeping under a duvet', '在被子下睡觉的猫')
      },
      {
        src: img('story-home.webp'),
        alt: t('A cat sitting on warm stone steps', '坐在温暖石阶上的猫')
      }
    ],
    featured: true
  },
  {
    slug: 'silktouch-brush',
    order: 10,
    category: 'groom',
    name: t('SilkTouch Brush', '丝滑美容刷'),
    tagline: t(
      'A smoother coat, and a softer moment together.',
      '梳顺毛发，也梳近彼此。'
    ),
    description: t(
      'A gentle slicker brush with fine, rounded pins and a flexible head. It lifts loose fur without scratching the skin, turning grooming into a calm daily ritual.',
      '温和针梳，圆头细针搭配柔性刷头。轻松带走浮毛，不刮伤皮肤，让日常梳理变成安静的亲密时刻。'
    ),
    badge: t('Grooming ritual', '护理仪式'),
    suitable: t('Dogs & cats · Medium / Large', '猫犬通用 · 中号 / 大号'),
    features: {
      en: [
        'Rounded stainless-steel pins',
        'Flexible head follows body contours',
        'Self-cleaning retract button',
        'Ergonomic beech handle'
      ],
      zh: ['圆头不锈钢针', '柔性刷头贴合身体曲线', '一键退毛自清洁', '人体工学榉木手柄']
    },
    specs: {
      en: [
        { label: 'Material', value: 'Stainless steel, beech wood, TPR' },
        { label: 'Size', value: 'Medium / Large' },
        { label: 'Suitability', value: 'Dogs and cats' },
        { label: 'Care', value: 'Wipe pins after each use' }
      ],
      zh: [
        { label: '材质', value: '不锈钢、榉木、TPR' },
        { label: '尺寸', value: '中号 / 大号' },
        { label: '适用', value: '猫犬通用' },
        { label: '养护', value: '每次使用后擦拭针面' }
      ]
    },
    care: t(
      'Wipe the pins with a damp cloth after each use. Keep the handle dry and store with the pins protected.',
      '每次使用后用湿布擦拭针面。保持手柄干燥，收纳时保护针面。'
    ),
    moq: t('100 pcs · custom handles available', '100 件起订 · 支持定制手柄'),
    colors: [
      { name: t('Beech', '榉木色'), hex: '#C8A97E' },
      { name: t('Pine', '松林绿'), hex: '#173F35' }
    ],
    images: [
      {
        src: img('product-silktouch-brush.webp'),
        alt: t('A golden retriever being gently brushed', '正在被轻柔梳理毛发的金毛犬')
      },
      {
        src: img('category-groom.webp'),
        alt: t('A grooming moment with a golden retriever', '与金毛犬的梳理时光')
      },
      {
        src: img('story-care.webp'),
        alt: t('A dog enjoying a grooming session', '享受梳理时光的狗狗')
      }
    ],
    featured: true
  },
  {
    slug: 'gentlewash',
    order: 11,
    category: 'groom',
    name: t('GentleWash Shampoo', '温和宠物香波'),
    tagline: t(
      'A clean coat without the tight, itchy feeling.',
      '洗干净，也留住皮肤本来的舒服。'
    ),
    description: t(
      'A pH-balanced, fragrance-light shampoo with oat and aloe. It gently lifts dirt and odour while leaving the coat soft and the skin calm.',
      'pH 平衡、淡香型香波，加入燕麦与芦荟。温和带走污垢与异味，洗后毛发柔软，皮肤也不紧绷。'
    ),
    badge: t('Sensitive skin', '敏感肌友好'),
    suitable: t('Dogs & cats · 300 ml', '猫犬通用 · 300 毫升'),
    features: {
      en: [
        'pH-balanced for pets',
        'Oat and aloe blend',
        'Light, clean scent',
        'Free from harsh sulfates'
      ],
      zh: ['宠物友好 pH 平衡配方', '燕麦与芦荟复合配方', '清淡干净的自然香气', '不含刺激性硫酸盐']
    },
    specs: {
      en: [
        { label: 'Volume', value: '300 ml' },
        { label: 'Key ingredients', value: 'Oat extract, aloe vera, glycerin' },
        { label: 'Suitability', value: 'Dogs and cats' },
        { label: 'Shelf life', value: '24 months' }
      ],
      zh: [
        { label: '容量', value: '300 毫升' },
        { label: '主要成分', value: '燕麦提取物、芦荟、甘油' },
        { label: '适用', value: '猫犬通用' },
        { label: '保质期', value: '24 个月' }
      ]
    },
    care: t(
      'Shake before use. Wet the coat, massage in, and rinse thoroughly. Avoid contact with eyes and ears.',
      '使用前摇匀。打湿毛发后按摩，再彻底冲洗。避免接触眼睛与耳朵。'
    ),
    moq: t('300 pcs · private label available', '300 件起订 · 支持贴牌定制'),
    colors: [
      { name: t('Cream', '奶油白'), hex: '#F2EADB' }
    ],
    images: [
      {
        src: img('product-gentlewash.webp'),
        alt: t('French bulldog in a yellow shirt', '穿黄色衣服的法国斗牛犬')
      },
      {
        src: img('category-groom.webp'),
        alt: t('A grooming moment with a golden retriever', '与金毛犬的梳理时光')
      },
      {
        src: img('story-care.webp'),
        alt: t('A dog enjoying a grooming session', '享受梳理时光的狗狗')
      }
    ]
  },
  {
    slug: 'pawsoft-balm',
    order: 12,
    category: 'groom',
    name: t('PawSoft Balm', '柔爪护理膏'),
    tagline: t(
      'A little barrier for paws that go everywhere.',
      '给走遍世界的脚掌，多一层温柔保护。'
    ),
    description: t(
      'A rich, fast-absorbing balm for dry or rough paw pads. Shea butter and candelilla wax create a protective layer without a greasy finish.',
      '为干燥粗糙的脚掌准备的滋润护理膏。乳木果油与坎地里拉蜡形成保护层，吸收快，不黏腻。'
    ),
    badge: t('Daily care', '日常护理'),
    suitable: t('Dogs & cats · 30 g', '猫犬通用 · 30 克'),
    features: {
      en: [
        'Shea butter and candelilla wax',
        'Fast-absorbing, non-greasy finish',
        'Fragrance-free',
        'Small tin for pockets and travel bags'
      ],
      zh: ['乳木果油与坎地里拉蜡', '快速吸收，不黏腻', '无香精', '小铁盒，口袋与旅行包都能放']
    },
    specs: {
      en: [
        { label: 'Volume', value: '30 g' },
        { label: 'Key ingredients', value: 'Shea butter, candelilla wax, jojoba oil' },
        { label: 'Suitability', value: 'Dogs and cats' },
        { label: 'Care', value: 'Store below 25°C, away from direct sun' }
      ],
      zh: [
        { label: '容量', value: '30 克' },
        { label: '主要成分', value: '乳木果油、坎地里拉蜡、荷荷巴油' },
        { label: '适用', value: '猫犬通用' },
        { label: '存放', value: '25°C 以下避光保存' }
      ]
    },
    care: t(
      'Apply a small amount to clean, dry paw pads and massage gently. Use as part of a calm weekly ritual.',
      '取少量涂于清洁干燥的脚掌，轻轻按摩。可作为每周一次的安静护理仪式。'
    ),
    moq: t('200 pcs · private label available', '200 件起订 · 支持贴牌定制'),
    colors: [
      { name: t('Natural', '原色'), hex: '#E8DDC8' }
    ],
    images: [
      {
        src: img('product-pawsoft-balm.webp'),
        alt: t('Golden retriever puppy resting', '休息中的金毛幼犬')
      },
      {
        src: img('story-care.webp'),
        alt: t('A dog enjoying a grooming session', '享受梳理时光的狗狗')
      },
      {
        src: img('category-groom.webp'),
        alt: t('A grooming moment with a golden retriever', '与金毛犬的梳理时光')
      }
    ]
  }
];

export const featuredProducts = products.filter((product) => product.featured);

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getCategory(id: CategoryId): Category {
  return categories.find((category) => category.id === id) ?? categories[0];
}
