'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Counter } from '@/components/Counter';
import { Accordion } from '@/components/Accordion';

interface GalleryItem {
  id: number;
  idx: string;
  img: string;
  altEn: string;
  altAr: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  href: string;
  btnEn: string;
  btnAr: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 0,
    idx: '01',
    img: '/Picture1.jpg',
    altEn: 'General construction capabilities',
    altAr: 'قدرات البناء العام',
    titleEn: 'General Construction',
    titleAr: 'البناء العام',
    descEn: 'Foundations, civil site works, masonry, and reinforced concrete structures.',
    descAr: 'الأساسات، وأعمال الموقع المدنية، وأعمال البناء، والهياكل الخرسانية المسلحة.',
    href: '/services#general',
    btnEn: 'Explore →',
    btnAr: 'استكشف →',
  },
  {
    id: 1,
    idx: '02',
    img: '/Picture3.jpg',
    altEn: 'Electrical distribution systems',
    altAr: 'أنظمة التوزيع الكهربائية',
    titleEn: 'Electrical Systems',
    titleAr: 'الأنظمة الكهربائية',
    descEn: 'Power distribution engineering, panel installations, and backup power networks.',
    descAr: 'هندسة توزيع الطاقة، وتركيب اللوحات، وشبكات الطاقة الاحتياطية.',
    href: '/services#electrical',
    btnEn: 'Explore →',
    btnAr: 'استكشف →',
  },
  {
    id: 2,
    idx: '03',
    img: '/Picture4.jpg',
    altEn: 'Central HVAC and duct systems',
    altAr: 'أنظمة التكييف المركزي ومجاري الهواء',
    titleEn: 'HVAC Solutions',
    titleAr: 'حلول التكييف والتهوية',
    descEn: 'Commercial HVAC duct design, central cooling systems, and VRF technology.',
    descAr: 'تصميم مجاري الهواء للتكييف التجاري، وأنظمة التبريد المركزية، وتقنية VRF.',
    href: '/services#hvac',
    btnEn: 'Explore →',
    btnAr: 'استكشف →',
  },
  {
    id: 3,
    idx: '04',
    img: '/Picture12.jpg',
    altEn: 'Industrial CNC laser fabrication',
    altAr: 'التصنيع الصناعي بالليزر CNC',
    titleEn: 'Industrial Workshop',
    titleAr: 'الورشة الصناعية',
    descEn: 'High-precision fiber laser cutting, specialty welding, and custom fabrication.',
    descAr: 'القطع بليزر الألياف عالي الدقة، واللحام المتخصص، والتصنيع المخصص.',
    href: '/workshop',
    btnEn: 'Explore →',
    btnAr: 'استكشف →',
  },
  {
    id: 4,
    idx: '05',
    img: '/Picture5.jpg',
    altEn: 'Waterproofing and protective coating works',
    altAr: 'أعمال العزل المائي والطلاءات الواقية',
    titleEn: 'Waterproofing Work',
    titleAr: 'أعمال العزل المائي',
    descEn: 'Roof membranes, foundation sealing, and protective coatings for structural life extension.',
    descAr: 'أغشية الأسطح، وعزل الأساسات، والطلاءات الواقية لإطالة عمر المنشآت.',
    href: '/services#waterproofing',
    btnEn: 'Explore →',
    btnAr: 'استكشف →',
  },
];

const SERVICES_OPTIMIZED = [
  {
    icon: '🏗️',
    titleEn: 'General Construction',
    titleAr: 'البناء العام',
    descEn: 'Our construction team executes complete structural projects from concept through handover. We manage site preparation, excavation, reinforced concrete foundations, structural steel framing, masonry work, and comprehensive civil site development.',
    descAr: 'ينفذ فريق البناء لدينا مشاريع إنشائية كاملة من الفكرة حتى التسليم. ندير تجهيز الموقع، والحفر، والأساسات الخرسانية المسلحة، والهياكل الفولاذية، وأعمال البناء، والتطوير المدني الشامل للموقع.',
    services: [
      { en: 'Site preparation & excavation', ar: 'تجهيز الموقع والحفر' },
      { en: 'Reinforced concrete foundations', ar: 'أساسات خرسانية مسلحة' },
      { en: 'Structural steel framing', ar: 'هياكل فولاذية إنشائية' },
      { en: 'Masonry & brickwork', ar: 'أعمال البناء والطوب' },
      { en: 'Paving & site finishing', ar: 'رصف وتشطيب الموقع' },
      { en: 'Full site infrastructure', ar: 'بنية تحتية كاملة للموقع' }
    ],
    whyEn: 'We handle end-to-end construction delivery, eliminating the need to coordinate multiple contractors.',
    whyAr: 'نتولى تسليم البناء من البداية إلى النهاية، مما يلغي الحاجة إلى تنسيق مقاولين متعددين.'
  },
  {
    icon: '⚡',
    titleEn: 'Electrical Systems',
    titleAr: 'الأنظمة الكهربائية',
    descEn: 'We design and install complete electrical systems that power your operations reliably. Our scope covers load calculation, power distribution design, panel installation, lighting systems, backup power integration, and full system certification.',
    descAr: 'نقوم بتصميم وتركيب أنظمة كهربائية كاملة تشغل عملياتك بموثوقية. يشمل نطاقنا حساب الأحمال، وتصميم توزيع الطاقة، وتركيب اللوحات، وأنظمة الإضاءة، ودمج الطاقة الاحتياطية، واعتماد النظام بالكامل.',
    services: [
      { en: 'Electrical design & engineering', ar: 'التصميم والهندسة الكهربائية' },
      { en: 'Load planning & panel design', ar: 'تخطيط الأحمال وتصميم اللوحات' },
      { en: 'Power distribution installation', ar: 'تركيب شبكات توزيع الطاقة' },
      { en: 'Lighting system design & installation', ar: 'تصميم وتركيب أنظمة الإضاءة' },
      { en: 'Backup power systems (generators, UPS)', ar: 'أنظمة الطاقة الاحتياطية (المولدات و UPS)' },
      { en: 'System testing & certification', ar: 'اختبار واعتماد الأنظمة' },
      { en: 'Ongoing maintenance contracts', ar: 'عقود صيانة مستمرة' }
    ],
    whyEn: 'Certified designs ensure your electrical systems meet Saudi Arabian codes and operate safely at full capacity.',
    whyAr: 'تضمن التصاميم المعتمدة تلبية أنظمتك الكهربائية للأكواد السعودية وتشغيلها بأمان وبكامل طاقتها.'
  },
  {
    icon: '❄️',
    titleEn: 'HVAC Systems',
    titleAr: 'أنظمة التكييف والتهوية',
    descEn: "We create optimal climate control solutions tailored to Saudi Arabia's extreme heat. Our HVAC team designs central AC and VRF systems, specifies ductwork, implements energy-efficient controls, and manages preventive maintenance.",
    descAr: 'نبتكر حلولاً مثالية للتحكم في المناخ تتناسب مع الحرارة الشديدة في المملكة العربية السعودية. يصمم فريق HVAC لدينا أنظمة التكييف المركزي وVRF، ويحدد أعمال مجاري الهواء، وينفذ ضوابط موفرة للطاقة، ويدير الصيانة الوقائية.',
    services: [
      { en: 'Central AC system design', ar: 'تصميم أنظمة التكييف المركزي' },
      { en: 'Variable Refrigerant Flow (VRF) systems', ar: 'أنظمة تدفق التبريد المتغير (VRF)' },
      { en: 'Ventilation planning & ductwork', ar: 'تخطيط التهوية ومجاري الهواء' },
      { en: 'Air quality optimization', ar: 'تحسين جودة الهواء' },
      { en: 'Energy-efficient control systems', ar: 'أنظمة تحكم موفرة للطاقة' },
      { en: 'Preventive maintenance contracts', ar: 'عقود صيانة وقائية' }
    ],
    whyEn: 'We optimize systems for Saudi heat while reducing energy consumption—lowering operational costs significantly.',
    whyAr: 'نعمل على تحسين الأنظمة للحرارة السعودية مع تقليل استهلاك الطاقة — مما يقلل التكاليف التشغيلية بشكل كبير.'
  },
  {
    icon: '🔧',
    titleEn: 'Sanitary & Plumbing',
    titleAr: 'الأنظمة الصحية والسباكة',
    descEn: 'We design and install complete plumbing systems that deliver water reliably and remove waste safely. Our scope includes water supply networks, drainage systems, fixture installation, hot water circulation, and rapid leak repair services.',
    descAr: 'نقوم بتصميم وتركيب أنظمة سباكة كاملة توفر المياه بشكل موثوق وتزيل النفايات بأمان. يشمل نطاقنا شبكات إمداد المياه، وأنظمة الصرف الصحي، وتركيب التجهيزات، ودوران المياه الساخنة، وخدمات إصلاح التسرب السريع.',
    services: [
      { en: 'Water supply network design', ar: 'تصميم شبكة إمداد المياه' },
      { en: 'Drainage & sewage systems', ar: 'أنظمة الصرف الصحي ومياه الصرف' },
      { en: 'Hot water circulation systems', ar: 'أنظمة دوران المياه الساخنة' },
      { en: 'Fixture installation & connection', ar: 'تركيب وتوصيل التجهيزات الصحية' },
      { en: 'Leak detection & repair', ar: 'كشف وإصلاح التسربات' },
      { en: 'System maintenance contracts', ar: 'عقود صيانة الأنظمة' }
    ],
    whyEn: 'Properly designed plumbing systems prevent water loss, reduce maintenance costs, and ensure building compliance.',
    whyAr: 'تمنع أنظمة السباكة المصممة بشكل صحيح فقدان المياه، وتقلل تكاليف الصيانة، وتضمن امتثال المباني.'
  },
  {
    icon: '🛡️',
    titleEn: 'Waterproofing & Coatings',
    titleAr: 'العزل المائي والطلاءات الواقية',
    descEn: 'We protect your structures from water damage using proven membrane and coating systems. Our waterproofing covers foundations, roofs, wet areas, underground structures, and expansion joints with long-term guarantees.',
    descAr: 'نحمي منشآتك من أضرار المياه باستخدام أنظمة الأغشية والطلاء المجربة. يغطي العزل المائي لدينا الأساسات، والأسطح، والمناطق الرطبة، والمنشآت تحت الأرض، وفواصل التمدد مع ضمانات طويلة الأجل.',
    services: [
      { en: 'Foundation waterproofing', ar: 'عزل الأساسات' },
      { en: 'Roof membrane systems', ar: 'أنظمة أغشية الأسطح' },
      { en: 'Wet area sealing (bathrooms, etc.)', ar: 'عزل المناطق الرطبة (الحمامات، المطابخ)' },
      { en: 'Tank & pool waterproofing', ar: 'عزل الخزانات والمسابح' },
      { en: 'Joint & expansion sealing', ar: 'عزل الفواصل والتمدد' },
      { en: 'Protective coating application', ar: 'تطبيق الطلاءات الواقية' }
    ],
    whyEn: 'Waterproofing investments prevent costly structural damage and extend building lifespan by decades.',
    whyAr: 'تمنع استثمارات العزل المائي الأضرار الإنشائية المكلفة وتطيل عمر المبنى لعقود.'
  },
  {
    icon: '🔥',
    titleEn: 'Fire Protection Systems',
    titleAr: 'أنظمة مكافحة الحرائق',
    descEn: 'We engineer complete fire protection systems that save lives and protect assets. We design, install, test, and maintain sprinkler networks, detection systems, alarms, suppression systems, and compliance documentation.',
    descAr: 'نهندس أنظمة متكاملة للحماية من الحرائق تنقذ الأرواح وتحمي الأصول. نصمم ونركب ونختبر ونحافظ على شبكات الرش، وأنظمة الكشف، والإنذارات، وأنظمة الإخماد، ووثائق الامتثال.',
    services: [
      { en: 'Engineered sprinkler system design', ar: 'تصميم نظام الرش المهندس' },
      { en: 'Fire detection & alarm systems', ar: 'أنظمة إنذار وكشف الحريق' },
      { en: 'Hydrant & hose reel installation', ar: 'تركيب فوهات الحريق وبكرات الخراطيم' },
      { en: 'Gas suppression systems (FM200, CO2)', ar: 'أنظمة الإخماد بالغاز (FM200, CO2)' },
      { en: 'Control panel programming', ar: 'برمجة لوحة التحكم' },
      { en: 'Annual inspection & certification', ar: 'الفحص والاعتماد السنوي' },
      { en: 'Compliance documentation', ar: 'توثيق الامتثال والأكواد' }
    ],
    whyEn: 'Complete fire protection ensures regulatory compliance and provides comprehensive life safety coverage.',
    whyAr: 'تضمن الحماية الكاملة من الحرائق الامتثال التنظيمي وتوفر تغطية شاملة لسلامة الأرواح.'
  }
];

const WHY_CHOOSE_US = [
  {
    icon: '🏆',
    titleEn: 'Integrated Expertise',
    titleAr: 'خبرة متكاملة',
    descEn: 'One contractor handles six specialized services. You coordinate with us—we coordinate the details internally. This eliminates delays, ensures design compatibility, and simplifies project management.',
    descAr: 'يتعامل مقاول واحد مع ست خدمات متخصصة. أنت تنسق معنا ونحن ننسق التفاصيل داخلياً. هذا يلغي التأخير ويضمن توافق التصميم ويسهل إدارة المشروع.'
  },
  {
    icon: '🇸🇦',
    titleEn: 'Saudi Aramco Approved',
    titleAr: 'معتمد من أرامكو السعودية',
    descEn: "Our approval as Saudi Aramco vendor #10119021 isn't just a badge—it means we meet the Kingdom's most demanding standards. We're trusted with critical infrastructure.",
    descAr: 'اعتمادنا كمورد لأرامكو السعودية رقم 10119021 ليس مجرد شعار — بل يعني أننا نلبي المعايير الأكثر تطلباً في المملكة. نحن موثوقون في البنية التحتية الحيوية.'
  },
  {
    icon: '✅',
    titleEn: 'Certified Professional Teams',
    titleAr: 'فرق محترفة معتمدة',
    descEn: 'Our technical staff holds AWS welding certifications, electrical engineering qualifications, and industry-specific training. Experience meets credentials on every project.',
    descAr: 'يضم طاقمنا الفني شهادات لحام AWS، ومؤهلات الهندسة الكهربائية، وتدريباً خاصاً بالصناعة. تجتمع الخبرة مع الاعتمادات في كل مشروع.'
  },
  {
    icon: '🛡️',
    titleEn: 'Safety-First Approach',
    titleAr: 'منهج السلامة أولاً',
    descEn: "We implement strict safety protocols on every job site. Safety compliance isn't negotiable—it's embedded in our operations.",
    descAr: 'نحن نطبق بروتوكولات سلامة صارمة في كل موقع عمل. الامتثال للسلامة غير قابل للتفاوض — إنه متأصل في عملياتنا.'
  },
  {
    icon: '💬',
    titleEn: 'Transparent Communication',
    titleAr: 'تواصل شفاف',
    descEn: 'We provide regular project updates, manage expectations clearly, and respond to client questions promptly. You always know project status.',
    descAr: 'نحن نقدم تحديثات منتظمة للمشروع، وندير التوقعات بوضوح، ونستجيب لأسئلة العملاء على الفور. أنت تعرف دائماً حالة المشروع.'
  },
  {
    icon: '⏱️',
    titleEn: 'Preventive Maintenance',
    titleAr: 'الصيانة الوقائية',
    descEn: 'Beyond installation, we offer maintenance contracts that prevent costly emergency repairs and extend system lifespan.',
    descAr: 'بعد التركيب، نقدم عقود صيانة تمنع الإصلاحات الطارئة المكلفة وتطيل عمر النظام.'
  }
];

const FAQS = [
  {
    qEn: 'What makes NexGen Build different from other contractors?',
    qAr: 'ما الذي يجعل نكست جن بيلد مختلفة عن المقاولين الآخرين؟',
    aEn: 'We combine six specialized services under one roof, eliminating coordination hassles and ensuring design compatibility. Our Saudi Aramco approval, ISO 9001 certification, and integrated approach mean faster delivery and consistent quality.',
    aAr: 'نجمع بين ست خدمات متخصصة تحت سقف واحد، مما يلغي متاعب التنسيق ويضمن توافق التصاميم. اعتمادنا من أرامكو السعودية، وشهادة ISO 9001، ونهجنا المتكامل يعني تسليماً أسرع وجودة متسقة.'
  },
  {
    qEn: 'How long does a typical construction project take?',
    qAr: 'كم من الوقت يستغرق مشروع البناء النموذجي؟',
    aEn: "Project duration depends on scope and complexity. A residential unit typically takes 4-6 months; industrial projects vary widely. We'll provide a detailed timeline during your initial consultation.",
    aAr: 'تعتمد مدة المشروع على النطاق والتعقيد. تستغرق الوحدة السكنية عادة من 4 إلى 6 أشهر؛ تختلف المشاريع الصناعية بشكل كبير. سنقدم جدولاً زمنياً مفصلاً أثناء الاستشارة الأولية.'
  },
  {
    qEn: 'Do you provide maintenance after project completion?',
    qAr: 'هل تقدمون خدمات الصيانة بعد اكتمال المشروع؟',
    aEn: 'Yes. We offer preventive maintenance contracts for electrical, HVAC, plumbing, and fire protection systems. Regular maintenance prevents costly emergency repairs and extends system lifespan.',
    aAr: 'نعم. نحن نقدم عقود صيانة وقائية لأنظمة الكهرباء، والتكييف، والسباكة، ومكافحة الحرائق. تمنع الصيانة المنتظمة الإصلاحات الطارئة المكلفة وتطيل عمر النظام.'
  },
  {
    qEn: 'Are you certified for Saudi Aramco projects?',
    qAr: 'هل أنتم معتمدون لمشاريع أرامكو السعودية؟',
    aEn: "Yes. We're an approved Saudi Aramco vendor (#10119021) and meet all their technical and compliance standards.",
    aAr: 'نعم. نحن مورد معتمد لدى أرامكو السعودية (#10119021) ونلبي جميع المعايير الفنية والامتثال الخاصة بهم.'
  },
  {
    qEn: 'Can you handle emergency repairs?',
    qAr: 'هل يمكنكم التعامل مع الإصلاحات الطارئة؟',
    aEn: 'Yes. We provide rapid response for critical system failures including burst pipes, electrical outages, and HVAC breakdowns. Contact us immediately for emergency service.',
    aAr: 'نعم. نحن نقدم استجابة سريعة لأعطال الأنظمة الحرجة بما في ذلك انفجار الأنابيب، وانقطاع الكهرباء، وأعطال التكييف. اتصل بنا فوراً للحصول على خدمة الطوارئ.'
  },
  {
    qEn: 'What areas of Saudi Arabia do you service?',
    qAr: 'ما هي المناطق التي تخدمونها في المملكة العربية السعودية؟',
    aEn: "We primarily service the Eastern Province (Dammam, Khobar, Jubail, Dhahran). For projects outside this region, we'll discuss logistics during consultation.",
    aAr: 'نعم. نحن نخدم بشكل أساسي المنطقة الشرقية (الدمام، الخبر، الجبيل، الظهران). بالنسبة للمشاريع خارج هذه المنطقة، سنناقش الخدمات اللوجستية أثناء الاستشارة.'
  },
  {
    qEn: 'How do I get a project quote?',
    qAr: 'كيف يمكنني الحصول على عرض سعر للمشروع؟',
    aEn: "Contact us via email (contact@Nxgens.com), WhatsApp, or our online form. We'll schedule a site visit and provide a detailed, itemized quote within 2-3 business days.",
    aAr: 'تواصل معنا عبر البريد الإلكتروني (contact@Nxgens.com) أو الواتساب أو النموذج الإلكتروني. سنحدد موعداً لزيارة الموقع ونقدم عرض سعر مفصل وموضح خلال 2-3 أيام عمل.'
  }
];

export default function Home() {
  const { t, lang } = useLanguage();
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [activeService, setActiveService] = useState(0);

  const scrollNextSection = () => {
    const el = document.getElementById('home-creds');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="flex-grow">
      {/* HERO */}
      <section className="hero">
        <link rel="preload" as="image" href="/Picture1.jpg" fetchPriority="high" />
        <video className="hero-video" autoPlay muted loop playsInline preload="metadata" poster="/Picture1.jpg" aria-hidden="true">
          <source src="/video1.mp4" type="video/mp4" />
        </video>
        <div className="hero-bg"></div>

        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-badge">
              <div className="hero-badge-dot"></div>
              <span>
                {t('Saudi Aramco Registered Supplier', 'مورد معتمد لأرامكو السعودية')}
              </span>
            </div>
            <h1 style={{ lineHeight: 1.15 }}>
              {lang === 'ar' ? (
                <>
                  <span>الخدمات المتكاملة لـ </span>
                  <span className="accent">البناء والتصنيع</span><br />
                  <span>في المملكة العربية السعودية</span>
                </>
              ) : (
                <>
                  <span>Complete </span>
                  <span className="accent">Construction</span><br />
                  <span className="accent">& Fabrication</span>
                  <span> for Saudi Arabia</span>
                </>
              )}
            </h1>
            <p className="hero-desc">
              {t(
                'End-to-end construction, industrial fabrication, and maintenance solutions from foundation to finish. Trusted by Saudi Aramco. Proven expertise across 6 core specializations.',
                'حلول متكاملة للبناء والتصنيع الصناعي والصيانة من الأساس إلى التشطيب. موثوقة من أرامكو السعودية. خبرة مثبتة عبر 6 تخصصات أساسية.'
              )}
            </p>
            <div className="hero-btns">
              <Link className="btn-primary" href="/contact">
                <span>{t('Get Your Free Quote', 'احصل على عرض سعر مجاني')}</span> →
              </Link>
              <Link className="btn-outline" href="/services">
                <span>{t('Explore Our Services', 'استكشف خدماتنا')}</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="hero-scroll" onClick={scrollNextSection}>
          <div className="scroll-mouse"></div>
          <span>{t('SCROLL', 'تمرير')}</span>
        </div>
      </section>

      {/* CREDENTIALS */}
      <div className="credentials-strip" id="home-creds" role="region" aria-label="Trusted partners and certifications">
        <div className="cred-marquee-track">
          <div className="cred-marquee-group">
            <article className="cred-marquee-card" tabIndex={0}>
              <div className="cred-marquee-logo-wrap cred-marquee-logo-wrap--wide">
                <img className="cred-marquee-logo" src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Saudi_aramco_logo.svg" alt="" width="72" height="28" loading="lazy" decoding="async" />
              </div>
              <div className="cred-text">
                <strong>{t('Saudi Aramco', 'أرامكو السعودية')}</strong>
                <span>{t('Approved Vendor #10119021', 'مورد معتمد #10119021')}</span>
              </div>
            </article>
            <article className="cred-marquee-card" tabIndex={0}>
              <div className="cred-marquee-logo-wrap">
                <img className="cred-marquee-logo" src="/saudi energy.png" alt="Saudi Energy" width="56" height="44" loading="lazy" decoding="async" />
              </div>
              <div className="cred-text">
                <strong>{t('Saudi Energy', 'الطاقة السعودية')}</strong>
                <span>{t('Registered Supplier · SAP Ariba', 'مورد مسجل · SAP Ariba')}</span>
              </div>
            </article>
            <article className="cred-marquee-card" tabIndex={0}>
              <div className="cred-marquee-logo-wrap cred-marquee-logo-wrap--wide">
                <img className="cred-marquee-logo" src="/vision2030.png" alt="Vision 2030" width="72" height="36" loading="lazy" decoding="async" />
              </div>
              <div className="cred-text">
                <strong>{t('Vision 2030', 'رؤية 2030')}</strong>
                <span>{t('Kingdom infrastructure alignment', 'مواءمة البنية التحتية للمملكة')}</span>
              </div>
            </article>
            <article className="cred-marquee-card" tabIndex={0}>
              <div className="cred-marquee-logo-wrap cred-marquee-logo-wrap--wide">
                <img className="cred-marquee-logo" src="https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg" alt="" width="72" height="36" loading="lazy" decoding="async" />
              </div>
              <div className="cred-text">
                <strong>{t('SAP Ariba', 'SAP Ariba')}</strong>
                <span>{t('Supplier network & procurement', 'شبكة الموردين والمشتريات')}</span>
              </div>
            </article>
            <article className="cred-marquee-card" tabIndex={0}>
              <div className="cred-marquee-logo-wrap cred-marquee-logo-wrap--wide">
                <img className="cred-marquee-logo" src="/iso 9001.png" alt="ISO 9001" width="72" height="44" loading="lazy" decoding="async" />
              </div>
              <div className="cred-text">
                <strong>{t('ISO 9001', 'ISO 9001')}</strong>
                <span>{t('Quality management systems', 'أنظمة إدارة الجودة')}</span>
              </div>
            </article>
            <article className="cred-marquee-card" tabIndex={0}>
              <div className="cred-marquee-logo-wrap">
                <img className="cred-marquee-logo" src="/laser.jpg" alt="Fiber Laser & CNC" width="48" height="48" loading="lazy" decoding="async" />
              </div>
              <div className="cred-text">
                <strong>{t('Fiber Laser & CNC', 'ليزر ألياف و CNC')}</strong>
                <span>{t('Dammam & Jubail facilities', 'مرافق الدمام والجبيل')}</span>
              </div>
            </article>
            <article className="cred-marquee-card" tabIndex={0}>
              <div className="cred-marquee-logo-wrap">
                <img className="cred-marquee-logo" src="/AWS logo.jpg" alt="AWS Welding" width="48" height="48" loading="lazy" decoding="async" />
              </div>
              <div className="cred-text">
                <strong>{t('AWS Welding', 'لحام AWS')}</strong>
                <span>{t('Certified welding processes', 'عمليات لحام معتمدة')}</span>
              </div>
            </article>
          </div>
          {/* Duplicate row for marquee effect */}
          <div className="cred-marquee-group" aria-hidden="true">
            <article className="cred-marquee-card" tabIndex={-1}>
              <div className="cred-marquee-logo-wrap cred-marquee-logo-wrap--wide">
                <img className="cred-marquee-logo" src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Saudi_aramco_logo.svg" alt="" width="72" height="28" loading="lazy" decoding="async" />
              </div>
              <div className="cred-text">
                <strong>{t('Saudi Aramco', 'أرامكو السعودية')}</strong>
                <span>{t('Approved Vendor #10119021', 'مورد معتمد #10119021')}</span>
              </div>
            </article>
            <article className="cred-marquee-card" tabIndex={-1}>
              <div className="cred-marquee-logo-wrap">
                <img className="cred-marquee-logo" src="/saudi energy.png" alt="Saudi Energy" width="56" height="44" loading="lazy" decoding="async" />
              </div>
              <div className="cred-text">
                <strong>{t('Saudi Energy', 'الطاقة السعودية')}</strong>
                <span>{t('Registered Supplier · SAP Ariba', 'مورد مسجل · SAP Ariba')}</span>
              </div>
            </article>
            <article className="cred-marquee-card" tabIndex={-1}>
              <div className="cred-marquee-logo-wrap cred-marquee-logo-wrap--wide">
                <img className="cred-marquee-logo" src="/vision2030.png" alt="Vision 2030" width="72" height="36" loading="lazy" decoding="async" />
              </div>
              <div className="cred-text">
                <strong>{t('Vision 2030', 'رؤية 2030')}</strong>
                <span>{t('Kingdom infrastructure alignment', 'مواءمة البنية التحتية للمملكة')}</span>
              </div>
            </article>
            <article className="cred-marquee-card" tabIndex={-1}>
              <div className="cred-marquee-logo-wrap cred-marquee-logo-wrap--wide">
                <img className="cred-marquee-logo" src="https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg" alt="" width="72" height="36" loading="lazy" decoding="async" />
              </div>
              <div className="cred-text">
                <strong>{t('SAP Ariba', 'SAP Ariba')}</strong>
                <span>{t('Supplier network & procurement', 'شبكة الموردين والمشتريات')}</span>
              </div>
            </article>
            <article className="cred-marquee-card" tabIndex={-1}>
              <div className="cred-marquee-logo-wrap cred-marquee-logo-wrap--wide">
                <img className="cred-marquee-logo" src="/iso 9001.png" alt="ISO 9001" width="72" height="44" loading="lazy" decoding="async" />
              </div>
              <div className="cred-text">
                <strong>{t('ISO 9001', 'ISO 9001')}</strong>
                <span>{t('Quality management systems', 'أنظمة إدارة الجودة')}</span>
              </div>
            </article>
            <article className="cred-marquee-card" tabIndex={-1}>
              <div className="cred-marquee-logo-wrap">
                <img className="cred-marquee-logo" src="/laser.jpg" alt="Fiber Laser & CNC" width="48" height="48" loading="lazy" decoding="async" />
              </div>
              <div className="cred-text">
                <strong>{t('Fiber Laser & CNC', 'ليزر ألياف و CNC')}</strong>
                <span>{t('Dammam & Jubail facilities', 'مرافق الدمام والجبيل')}</span>
              </div>
            </article>
            <article className="cred-marquee-card" tabIndex={-1}>
              <div className="cred-marquee-logo-wrap">
                <img className="cred-marquee-logo" src="/AWS logo.jpg" alt="AWS Welding" width="48" height="48" loading="lazy" decoding="async" />
              </div>
              <div className="cred-text">
                <strong>{t('AWS Welding', 'لحام AWS')}</strong>
                <span>{t('Certified welding processes', 'عمليات لحام معتمدة')}</span>
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* TRUST SECTION */}
      <section className="section trust-section" style={{ background: 'var(--cream)', padding: '90px 0' }}>
        <div className="container">
          <div className="trust-grid" style={{ display: 'grid', gap: '60px', alignItems: 'center' }}>
            <div className="reveal-section">
              <div className="section-label">{t('Aramco Approved', 'معتمد من أرامكو')}</div>
              <h2 className="section-title" style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', lineHeight: 1.1 }} dangerouslySetInnerHTML={{ __html: t('Why Saudi Aramco &amp; <span>Saudi Energy Trust Us</span>', 'لماذا تثق بنا أرامكو السعودية و<span>الطاقة السعودية</span>') }}></h2>
              <p style={{ fontSize: '15px', color: 'var(--gray-600)', lineHeight: '1.8', marginTop: '20px', marginBottom: '28px' }}>
                {t(
                  'We deliver certified construction and fabrication solutions that meet rigorous Saudi Arabian standards. Our integrated approach combines six specialized divisions under one roof, eliminating coordination delays and ensuring consistent quality. With Saudi Aramco vendor approval and ISO 9001 certification, we guarantee compliance, safety, and timely delivery.',
                  'نحن نقدم حلول بناء وتصنيع معتمدة تلبي المعايير الصارمة للمملكة العربية السعودية. يجمع نهجنا المتكامل بين ستة أقسام متخصصة تحت سقف واحد، مما يلغي تأخيرات التنسيق ويضمن جودة متسقة. ومع اعتمادنا كمورد لدى أرامكو السعودية وشهادة ISO 9001، فإننا نضمن الامتثال والسلامة والتسليم في الوقت المحدد.'
                )}
              </p>
              <div className="trust-list-grid" style={{ display: 'grid', gap: '14px 20px', marginTop: '24px' }}>
                {[
                  { en: 'Saudi Aramco Approved Vendor #10119021', ar: 'مورد معتمد لدى أرامكو السعودية #10119021' },
                  { en: 'Saudi Energy Registered Supplier (SAP Ariba)', ar: 'مورد مسجل لدى الطاقة السعودية (SAP Ariba)' },
                  { en: 'ISO 9001 Certified (Quality Management)', ar: 'حاصل على شهادة ISO 9001 (إدارة الجودة)' },
                  { en: 'AWS Certified Welding Processes', ar: 'عمليات لحام معتمدة من جمعية AWS' },
                  { en: 'Vision 2030 Aligned Standards', ar: 'معايير متوافقة مع رؤية المملكة 2030' },
                  { en: 'Fiber Laser & CNC Equipped Facilities', ar: 'مرافق مجهزة بليزر الألياف و CNC' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--navy)' }} className="reveal-card">
                    <span style={{ color: 'var(--orange)' }}>✓</span>
                    <span>{t(item.en, item.ar)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal-section trust-stats-grid" style={{ display: 'grid', gap: '20px' }}>
              {[
                { titleEn: 'Service Divisions', titleAr: 'أقسام الخدمة', val: '6', suffixEn: ' Specialized Teams', suffixAr: ' فرق متخصصة' },
                { titleEn: 'Workshop Facilities', titleAr: 'مرافق الورشة', val: '2', suffixEn: ' Locations (Dammam & Jubail)', suffixAr: ' مواقع (الدمام والجبيل)' },
                { titleEn: 'Certifications & Approvals', titleAr: 'الشهادات والاعتمادات', val: '6', suffixEn: ' Major Approvals', suffixAr: ' اعتمادات رئيسية' },
                { titleEn: 'Weld Rejection Rate', titleAr: 'معدل رفض اللحام', val: '<8%', suffixEn: ' (Industry-leading)', suffixAr: ' (رائد في الصناعة)' },
                { titleEn: 'CNC Accuracy', titleAr: 'دقة CNC', val: 'Micron', valAr: 'ميكرون', suffixEn: '-level precision', suffixAr: ' مستوى الدقة' },
                { titleEn: 'Service Areas', titleAr: 'مناطق الخدمة', val: 'KSA', suffixEn: ' (Eastern Province)', suffixAr: ' (المنطقة الشرقية)' },
              ].map((metric, i) => (
                <div key={i} className="reveal-card trust-stat-card">
                  <div className="trust-stat-val">
                    {metric.val === 'Micron' || metric.val === 'KSA' ? t(metric.val, metric.valAr || metric.val) : <Counter to={parseInt(metric.val.replace(/[^\d]/g, ''))} prefix={metric.val.startsWith('<') ? '<' : ''} suffix={metric.val.endsWith('%') ? '%' : ''} />}
                  </div>
                  <div className="trust-stat-title">
                    {t(metric.titleEn, metric.titleAr)}
                  </div>
                  <div className="trust-stat-desc">
                    {t(metric.suffixEn, metric.suffixAr)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OUR SERVICES */}
      <section className="section" style={{ background: 'var(--white)', padding: '90px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
            <div className="section-label" style={{ display: 'inline-flex' }}>{t('What We Offer', 'ما نقدمه')}</div>
            <h2 className="section-title" style={{ marginTop: '12px' }} dangerouslySetInnerHTML={{ __html: t('Our Six <span>Service Divisions</span>', 'أقسام <span>خدماتنا الستة</span>') }}></h2>
            <p className="section-subtitle" style={{ margin: '16px auto 0' }}>
              {t(
                'We deliver comprehensive construction and industrial solutions through six integrated specialist teams. This integrated approach means faster project completion, consistent quality, and single-point accountability.',
                'نقدم حلولاً إنشائية وصناعية شاملة من خلال ستة فرق متخصصة متكاملة. يعني هذا النهج المتكامل إنجاز المشاريع بشكل أسرع، وجودة متسقة، ومسؤولية من نقطة واحدة.'
              )}
            </p>
          </div>

          {/* Interactive Honeycomb Illustration */}
          <div className="honeycomb-layout-wrapper" style={{ position: 'relative', minHeight: '520px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '48px auto 0', overflow: 'visible', maxWidth: '1200px' }}>
            
            {/* Desktop Illustration (screen width >= 1024px) */}
            <div className="desktop-honeycomb-only" style={{ width: '460px', height: '480px', position: 'relative', margin: '0 auto', overflow: 'visible' }}>
              
              {/* SVG Connecting Line */}
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
                {(() => {
                  const centers = [
                    { x: 230, y: 80, align: 'right' },   // Top: General Construction
                    { x: 346, y: 160, align: 'right' },  // Upper Right: Electrical
                    { x: 346, y: 320, align: 'right' },  // Lower Right: HVAC
                    { x: 230, y: 400, align: 'left' },   // Bottom: Sanitary (Left side)
                    { x: 114, y: 320, align: 'left' },   // Lower Left: Waterproofing (Left side)
                    { x: 114, y: 160, align: 'left' },   // Upper Left: Fire Fighting (Left side)
                  ];
                  
                  const act = centers[activeService];
                  if (!act) return null;
                  
                  const isAr = lang === 'ar';
                  const startX = isAr ? (460 - act.x) : act.x;
                  const cardOnRight = isAr ? (act.align === 'left') : (act.align === 'right');
                  
                  const hexSize = 200;
                  const edgeX = startX + (cardOnRight ? (hexSize * 0.48) : -(hexSize * 0.48));
                  
                  const targetX = cardOnRight ? 490 : -30;
                  
                  return (
                    <line
                      x1={edgeX}
                      y1={act.y}
                      x2={targetX}
                      y2={act.y}
                      stroke="var(--orange)"
                      strokeWidth="2.5"
                      strokeDasharray="4 4"
                      style={{ transition: 'all 0.35s ease' }}
                    />
                  );
                })()}
              </svg>
              
              {/* Hexagons rendering */}
              {(() => {
                const centers = [
                  { x: 230, y: 80, index: 0, srv: SERVICES_OPTIMIZED[0] }, // Top
                  { x: 346, y: 160, index: 1, srv: SERVICES_OPTIMIZED[1] }, // Upper Right
                  { x: 346, y: 320, index: 2, srv: SERVICES_OPTIMIZED[2] }, // Lower Right
                  { x: 230, y: 400, index: 3, srv: SERVICES_OPTIMIZED[3] }, // Bottom
                  { x: 114, y: 320, index: 4, srv: SERVICES_OPTIMIZED[4] }, // Lower Left
                  { x: 114, y: 160, index: 5, srv: SERVICES_OPTIMIZED[5] }, // Upper Left
                ];
                
                return centers.map((c) => {
                  const isActive = activeService === c.index;
                  const isAr = lang === 'ar';
                  const posX = isAr ? (460 - c.x) : c.x;
                  
                  return (
                    <div
                      key={c.index}
                      onMouseEnter={() => setActiveService(c.index)}
                      onClick={() => setActiveService(c.index)}
                      style={{
                        position: 'absolute',
                        left: posX,
                        top: c.y,
                        width: '200px',
                        height: '200px',
                        transform: `translate(-50%, -50%) ${isActive ? 'scale(1.06)' : 'scale(1)'}`,
                        background: isActive ? '#1a1a1a' : 'var(--orange)',
                        clipPath: 'polygon(25% 6.5%, 75% 6.5%, 96% 50%, 75% 93.5%, 25% 93.5%, 4% 50%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                        zIndex: isActive ? 5 : 3,
                      }}
                    >
                      <div
                        style={{
                          width: 'calc(100% - 6px)',
                          height: 'calc(100% - 6px)',
                          background: '#ffffff',
                          clipPath: 'polygon(25% 6.5%, 75% 6.5%, 96% 50%, 75% 93.5%, 25% 93.5%, 4% 50%)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '16px',
                          color: '#1a1a1a',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <span style={{ fontSize: '32px', marginBottom: '8px', filter: isActive ? 'none' : 'grayscale(30%)' }}>
                          {c.srv.icon}
                        </span>
                        <span style={{ fontSize: '13px', fontWeight: 800, textAlign: 'center', color: isActive ? 'var(--orange)' : 'var(--navy)', transition: 'color 0.2s ease', maxWidth: '120px', textWrap: 'balance' }}>
                          {t(c.srv.titleEn, c.srv.titleAr)}
                        </span>
                      </div>
                    </div>
                  );
                });
              })()}
              
              {/* Center Hex (NEXGEN) */}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '240px',
                  transform: 'translate(-50%, -50%)',
                  width: '200px',
                  height: '200px',
                  background: 'rgba(232, 96, 26, 0.08)',
                  clipPath: 'polygon(25% 6.5%, 75% 6.5%, 96% 50%, 75% 93.5%, 25% 93.5%, 4% 50%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    width: 'calc(100% - 4px)',
                    height: 'calc(100% - 4px)',
                    background: '#f3f4f6',
                    clipPath: 'polygon(25% 6.5%, 75% 6.5%, 96% 50%, 75% 93.5%, 25% 93.5%, 4% 50%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ fontSize: '18px', fontWeight: 900, color: 'var(--orange)', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '1.5px' }}>
                    NEXGEN
                  </span>
                </div>
              </div>
              
              {/* Display dynamic active card relative to the centered box */}
              {(() => {
                const srv = SERVICES_OPTIMIZED[activeService];
                const centers = [
                  { align: 'right', y: 80 },
                  { align: 'right', y: 160 },
                  { align: 'right', y: 320 },
                  { align: 'left', y: 400 }, // Bottom: Sanitary (Left side)
                  { align: 'left', y: 320 },  // Lower Left (Left side)
                  { align: 'left', y: 160 },  // Upper Left (Left side)
                ];
                const act = centers[activeService];
                const isAr = lang === 'ar';
                const cardOnRight = isAr ? (act.align === 'left') : (act.align === 'right');
                
                const positionStyles: React.CSSProperties = cardOnRight 
                  ? { left: '490px', top: '10px' }
                  : { right: '490px', top: '10px' };
                
                return (
                  <div
                    style={{
                      position: 'absolute',
                      width: '420px',
                      background: 'var(--white)',
                      border: '2px solid var(--orange)',
                      borderRadius: '16px',
                      padding: '28px',
                      boxShadow: 'var(--shadow-lg)',
                      zIndex: 4,
                      transition: 'all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1)',
                      boxSizing: 'border-box',
                      ...positionStyles
                    }}
                    className="honeycomb-card-detail"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <span style={{ fontSize: '28px' }}>{srv.icon}</span>
                      <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>
                        {t(srv.titleEn, srv.titleAr)}
                      </h3>
                    </div>
                    
                    <h4 style={{ fontSize: '11px', fontWeight: 700, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px', marginTop: 0 }}>
                      {t('What We Do', 'ماذا نفعل')}
                    </h4>
                    <p style={{ fontSize: '13px', color: 'var(--gray-600)', lineHeight: '1.6', marginBottom: '18px', marginTop: 0 }}>
                      {t(srv.descEn, srv.descAr)}
                    </p>
                    
                    <h4 style={{ fontSize: '11px', fontWeight: 700, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', marginTop: 0 }}>
                      {t('Key Services', 'الخدمات الرئيسية')}
                    </h4>
                    <ul style={{ padding: 0, margin: '0 0 20px 0', fontSize: '13px', color: 'var(--gray-600)', lineHeight: '1.6', listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      {srv.services.map((s, idx) => (
                        <li key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <span style={{ color: 'var(--orange)', fontWeight: 'bold' }}>•</span>
                          <span>{t(s.en, s.ar)}</span>
                        </li>
                      ))}
                    </ul>

                    <div style={{ padding: '14px 16px', background: 'var(--cream)', borderRadius: '8px', borderInlineStart: '3px solid var(--orange)' }}>
                      <h4 style={{ fontSize: '11px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px 0' }}>
                        {t('Why It Matters', 'لماذا يهم')}
                      </h4>
                      <p style={{ fontSize: '12px', color: 'var(--gray-700)', lineHeight: '1.5', margin: 0 }}>
                        {t(srv.whyEn, srv.whyAr)}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
            
            {/* Mobile Illustration & Layout (screen width < 1024px) */}
            <div className="mobile-honeycomb-only" style={{ width: '100%', flexDirection: 'column', gap: '24px' }}>
              
              {/* Hex Tabs Selection */}
              <div style={{ display: 'flex', overflowX: 'auto', gap: '12px', paddingBottom: '12px', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }} className="mobile-hex-slider">
                {SERVICES_OPTIMIZED.map((srv, index) => {
                  const isActive = activeService === index;
                  return (
                    <button
                      key={index}
                      onClick={() => setActiveService(index)}
                      style={{
                        flexShrink: 0,
                        padding: '12px 20px',
                        background: isActive ? '#1a1a1a' : 'var(--white)',
                        color: isActive ? 'var(--orange)' : 'var(--navy)',
                        border: `1.5px solid ${isActive ? '#1a1a1a' : 'var(--gray-200)'}`,
                        borderRadius: '100px',
                        fontWeight: 700,
                        fontSize: '13.5px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: isActive ? 'var(--shadow-md)' : 'none',
                        transition: 'all 0.25s ease',
                      }}
                    >
                      <span>{srv.icon}</span>
                      <span>{t(srv.titleEn, srv.titleAr)}</span>
                    </button>
                  );
                })}
              </div>
              
              {/* Active Mobile Details Card */}
              {(() => {
                const srv = SERVICES_OPTIMIZED[activeService];
                return (
                  <div
                    style={{
                      background: 'var(--white)',
                      border: '1.5px solid var(--gray-200)',
                      borderRadius: '16px',
                      padding: '24px',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                      <span style={{ fontSize: '28px' }}>{srv.icon}</span>
                      <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>
                        {t(srv.titleEn, srv.titleAr)}
                      </h3>
                    </div>
                    
                    <h4 style={{ fontSize: '11px', fontWeight: 700, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px', marginTop: 0 }}>
                      {t('What We Do', 'ماذا نفعل')}
                    </h4>
                    <p style={{ fontSize: '13px', color: 'var(--gray-600)', lineHeight: '1.6', marginBottom: '16px', marginTop: 0 }}>
                      {t(srv.descEn, srv.descAr)}
                    </p>
                    
                    <h4 style={{ fontSize: '11px', fontWeight: 700, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px', marginTop: 0 }}>
                      {t('Key Services', 'الخدمات الرئيسية')}
                    </h4>
                    <ul style={{ padding: 0, margin: '0 0 20px 0', fontSize: '13px', color: 'var(--gray-600)', lineHeight: '1.6', listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {srv.services.map((s, idx) => (
                        <li key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <span style={{ color: 'var(--orange)', fontWeight: 'bold' }}>•</span>
                          <span>{t(s.en, s.ar)}</span>
                        </li>
                      ))}
                    </ul>

                    <div style={{ padding: '14px 16px', background: 'var(--cream)', borderRadius: '8px', borderInlineStart: '3px solid var(--orange)' }}>
                      <h4 style={{ fontSize: '11px', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px 0' }}>
                        {t('Why It Matters', 'لماذا يهم')}
                      </h4>
                      <p style={{ fontSize: '12px', color: 'var(--gray-700)', lineHeight: '1.5', margin: 0 }}>
                        {t(srv.whyEn, srv.whyAr)}
                      </p>
                    </div>
                  </div>
                );
              })()}
              
            </div>
            
          </div>
        </div>
      </section>

      {/* FEATURED GALLERY */}
      <section className="section" style={{ background: 'var(--cream)', padding: '90px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px', marginBottom: '40px' }}>
            <div>
              <div className="section-label">{t('Interactive Preview', 'معاينة تفاعلية')}</div>
              <h2 className="section-title" dangerouslySetInnerHTML={{ __html: t('Recent Projects &amp; <span>Capabilities</span>', 'المشاريع والقدرات <span>الحديثة</span>') }}></h2>
              <p className="section-subtitle">
                {t(
                  "Our portfolio spans industrial facilities, commercial buildings, and specialized infrastructure projects throughout Saudi Arabia. Here's a glimpse of our capabilities in action.",
                  'تشمل محفظتنا المرافق الصناعية، والمباني التجارية، ومشاريع البنية التحتية المتخصصة في جميع أنحاء المملكة العربية السعودية. إليك لمحة عن قدراتنا قيد التنفيذ.'
                )}
              </p>
            </div>
            <Link
              style={{
                padding: '12px 24px',
                borderRadius: '10px',
                background: 'var(--white)',
                border: '1.5px solid var(--gray-200)',
                color: 'var(--gray-800)',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
                display: 'inline-block',
                textDecoration: 'none',
                boxSizing: 'border-box',
              }}
              href="/about"
            >
              {t('Learn About Us →', 'تعرف علينا →')}
            </Link>
          </div>

          <div className="gallery-hover-root" id="featured-hover-gallery">
            <div className="gallery-hover-preview">
              <div className="gallery-hover-slides">
                {GALLERY_ITEMS.map((item) => (
                  <img
                    key={item.id}
                    className={`gallery-hover-slide ${galleryIndex === item.id ? 'is-active' : ''}`}
                    src={item.img}
                    alt={t(item.altEn, item.altAr)}
                    width="960"
                    height="720"
                  />
                ))}
              </div>
              <div className="gallery-hover-vignette" aria-hidden="true"></div>
            </div>

            <div className="gallery-hover-list" role="navigation" aria-label="Featured gallery destinations">
              {GALLERY_ITEMS.map((item) => (
                <Link
                  key={item.id}
                  className={`gallery-hover-row ${galleryIndex === item.id ? 'is-active' : ''}`}
                  href={item.href}
                  aria-current={galleryIndex === item.id ? 'true' : undefined}
                  onMouseEnter={() => setGalleryIndex(item.id)}
                  onFocus={() => setGalleryIndex(item.id)}
                >
                  <span className="gallery-hover-idx" aria-hidden="true">
                    {item.idx}
                  </span>
                  <div>
                    <div className="gallery-title">{t(item.titleEn, item.titleAr)}</div>
                    <div className="gallery-desc">{t(item.descEn, item.descAr)}</div>
                  </div>
                  <span className="gallery-hover-go">
                    {t(item.btnEn, item.btnAr)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY NEXGEN */}
      <section className="section why-section" style={{ padding: '90px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
            <div className="section-label" style={{ display: 'inline-flex' }}>{t('Why Choose Us', 'لماذا تختارنا')}</div>
            <h2 className="section-title" style={{ marginTop: '12px' }} dangerouslySetInnerHTML={{ __html: t('Why Clients Choose <span>NexGen Build</span>', 'لماذا يختار العملاء <span>نكست جن بيلد</span>') }}></h2>
          </div>

          <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {WHY_CHOOSE_US.map((item, i) => (
              <div key={i} style={{ background: 'var(--cream)', borderRadius: '16px', padding: '32px', border: '1px solid var(--gray-200)', display: 'flex', flexDirection: 'column' }} className="reveal-card">
                {item.titleEn === 'Saudi Aramco Approved' ? (
                  <div style={{ height: '32px', display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Saudi_aramco_logo.svg" 
                      alt="Saudi Aramco Logo" 
                      style={{ height: '28px', width: 'auto', objectFit: 'contain' }} 
                    />
                  </div>
                ) : (
                  <div style={{ fontSize: '32px', marginBottom: '16px' }}>{item.icon}</div>
                )}
                <h4 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--navy)', marginBottom: '10px', marginTop: 0 }}>{t(item.titleEn, item.titleAr)}</h4>
                <p style={{ fontSize: '13.5px', color: 'var(--gray-600)', lineHeight: '1.65', margin: 0 }}>{t(item.descEn, item.descAr)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="section faq-section" style={{ background: 'var(--cream)', padding: '90px 0', borderTop: '1px solid var(--gray-200)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="section-label" style={{ display: 'inline-flex' }}>{t('FAQ', 'الأسئلة الشائعة')}</div>
            <h2 className="section-title" style={{ marginTop: '12px' }} dangerouslySetInnerHTML={{ __html: t('Frequently Asked <span>Questions</span>', 'الأسئلة <span>الشائعة</span>') }}></h2>
          </div>

          <Accordion items={FAQS} />
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="home-cta-strip" style={{ padding: '90px 0' }}>
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: 'white', marginBottom: '16px', lineHeight: 1.1 }}>
            {t('Ready to Bring Your Project to Life?', 'جاهز لبدء مشروعك الإنشائي؟')}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '17px', maxWidth: '640px', margin: '0 auto 36px', lineHeight: 1.7 }}>
            {t(
              "Whether you're planning a new construction project, need specialized fabrication, or require maintenance services, we're ready to deliver. Contact us today for a detailed quote and project assessment.",
              'سواء كنت تخطط لمشروع بناء جديد، أو تحتاج لتصنيع متخصص، أو تتطلب خدمات الصيانة، فنحن مستعدون للتسليم. تواصل معنا اليوم للحصول على عرض سعر مفصل وتقييم للمشروع.'
            )}
          </p>
          <div>
            <Link className="home-cta-btn" href="/contact" style={{ display: 'inline-block', padding: '16px 36px', fontSize: '16px', fontWeight: 700 }}>
              {t('Request Your Free Consultation', 'اطلب استشارتك المجانية')}
            </Link>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', marginTop: '10px' }}>
              {t('Typically respond within 2 business hours', 'نرد عادةً خلال ساعتي عمل')}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
