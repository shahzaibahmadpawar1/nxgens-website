'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { InteractiveGrid } from '@/components/InteractiveGrid';
import { Counter } from '@/components/Counter';

interface TimelineItem {
  yearEn: string;
  yearAr: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
}

const TIMELINE: TimelineItem[] = [
  {
    yearEn: 'Founded',
    yearAr: 'التأسيس',
    titleEn: 'NexGen Build Company Established',
    titleAr: 'تأسيس شركة نكست جن للبناء',
    descEn: 'Company founded in Dammam, Saudi Arabia with a vision to deliver integrated construction solutions.',
    descAr: 'تأسست الشركة في الدمام، المملكة العربية السعودية برؤية لتقديم حلول بناء متكاملة.',
  },
  {
    yearEn: 'Expansion',
    yearAr: 'التوسع',
    titleEn: 'Industrial & Workshop Capabilities',
    titleAr: 'القدرات الصناعية والورشة',
    descEn: 'Expanded precision fabrication with CNC laser cutting, machining, and metal works to serve construction, oil & gas, and architectural clients.',
    descAr: 'توسيع التصنيع الدقيق بقطع الليزر CNC والخراطة والأعمال المعدنية لخدمة عملاء البناء والنفط والغاز والهندسة المعمارية.',
  },
  {
    yearEn: 'Saudi Aramco',
    yearAr: 'أرامكو السعودية',
    titleEn: 'Approved Supplier Registration',
    titleAr: 'تسجيل كمورد معتمد',
    descEn: 'Registered in the Saudi Aramco Supplier Management System — Vendor Code 10119021 (approved March 30, 2026).',
    descAr: 'مسجلة في نظام إدارة الموردين لأرامكو السعودية — رمز المورد 10119021 (اعتماد 30 مارس 2026).',
  },
  {
    yearEn: 'Saudi Energy',
    yearAr: 'الطاقة السعودية',
    titleEn: 'SAP Ariba Supplier Approval',
    titleAr: 'اعتماد مورد عبر SAP Ariba',
    descEn: 'Included in the Saudi Energy supplier database via the SAP Ariba platform (April 1, 2026).',
    descAr: 'الإدراج في قاعدة بيانات موردي الطاقة السعودية عبر منصة SAP Ariba (1 أبريل 2026).',
  },
  {
    yearEn: 'Today',
    yearAr: 'اليوم',
    titleEn: 'Integrated Construction & Fabrication',
    titleAr: 'بناء وتصنيع متكامل',
    descEn: 'One team delivering civil, MEP, and industrial fabrication — trusted by major energy sector partners across the Eastern Province.',
    descAr: 'فريق واحد يقدم الأعمال المدنية والخدمات الكهروميكانيكية والتصنيع الصناعي — موثوق به لدى شركاء رئيسيين في قطاع الطاقة بالمنطقة الشرقية.',
  },
];

const VALUES = [
  {
    icon: '🎯',
    titleEn: 'Excellence in Execution',
    titleAr: 'التميز في التنفيذ',
    descEn: "We don't deliver 'good enough.' Every project reflects our commitment to exceeding specifications and client expectations. Our <8% weld rejection rate and micron-level CNC accuracy prove this commitment.",
    descAr: "لا نقدم عملاً 'مقبولاً' فحسب. يعكس كل مشروع التزامنا بتجاوز المواصفات وتوقعات العملاء. يثبت هذا الالتزام معدل رفض اللحام لدينا البالغ <8٪ ودقة CNC على مستوى الميكرون."
  },
  {
    icon: '🛡️',
    titleEn: 'Safety First, Always',
    titleAr: 'السلامة أولاً ودائماً',
    descEn: 'No project is worth risking lives. We implement strict safety protocols on every job site, train our teams continuously, and treat safety compliance as non-negotiable.',
    descAr: 'لا يوجد مشروع يستحق المخاطرة بالأرواح. نحن نطبق بروتوكولات سلامة صارمة في كل موقع عمل، وندرب فرقنا باستمرار، ونتعامل مع الامتثال للسلامة كأمر غير قابل للتفاوض.'
  },
  {
    icon: '🤝',
    titleEn: 'Integrated Accountability',
    titleAr: 'المسؤولية المتكاملة',
    descEn: 'One company. One team. No finger-pointing between contractors. You work with us; we coordinate internally and own the results.',
    descAr: 'شركة واحدة. فريق واحد. لا يوجد تبادل اتهامات بين المقاولين. أنت تعمل معنا؛ نحن ننسق داخلياً ونتحمل مسؤولية النتائج.'
  },
  {
    icon: '📊',
    titleEn: 'Transparent Communication',
    titleAr: 'تواصل شفاف',
    descEn: 'We provide regular updates, manage expectations clearly, and respond to client questions promptly. You always know project status and any challenges before they become problems.',
    descAr: 'نحن نقدم تحديثات منتظمة، وندير التوقعات بوضوح، ونستجيب لأسئلة العملاء على الفور. أنت تعرف دائماً حالة المشروع وأي تحديات قبل أن تصبح مشاكل.'
  },
  {
    icon: '🌱',
    titleEn: 'Continuous Improvement',
    titleAr: 'التحسين المستمر',
    descEn: 'We invest in training, modern equipment, and new certifications. Industry standards evolve; our capabilities evolve with them.',
    descAr: 'نحن نستثمر في التدريب، والمعدات الحديثة، والشهادات الجديدة. تتطور معايير الصناعة؛ وتتطور قدراتنا معها.'
  },
  {
    icon: '♻️',
    titleEn: 'Sustainable Solutions',
    titleAr: 'حلول مستدامة',
    descEn: 'We design HVAC systems for energy efficiency, implement water-saving plumbing systems, and use durable materials that reduce long-term environmental impact.',
    descAr: 'نصمم أنظمة التكييف لكفاءة الطاقة، وننفذ أنظمة سباكة موفرة للمياه، ونستخدم مواد متينة تقلل من التأثير البيئي على المدى الطويل.'
  }
];

const CREDENTIALS = [
  {
    titleEn: 'Saudi Aramco Approved Vendor',
    titleAr: 'مورد معتمد لدى أرامكو السعودية',
    detailEn: 'Vendor #10119021',
    detailAr: 'مورد رقم 10119021',
    whyEn: "We meet Saudi Aramco's rigorous technical and compliance standards. This is the Kingdom's most demanding approval.",
    whyAr: 'نحن نلبي المعايير الفنية والامتثال الصارمة لأرامكو السعودية. هذا هو الاعتماد الأكثر تطلباً في المملكة.'
  },
  {
    titleEn: 'Saudi Energy Registered',
    titleAr: 'مورد مسجل لدى الطاقة السعودية',
    detailEn: 'SAP Ariba certified supplier',
    detailAr: 'مورد معتمد عبر منصة SAP Ariba',
    whyEn: "We're approved for national energy sector projects and government procurement.",
    whyAr: 'نحن معتمدون لمشاريع قطاع الطاقة الوطنية والمشتريات الحكومية.'
  },
  {
    titleEn: 'ISO 9001:2015 Certified',
    titleAr: 'شهادة ISO 9001:2015',
    detailEn: 'Quality Management Systems',
    detailAr: 'نظام إدارة الجودة',
    whyEn: 'We maintain documented processes, quality control, and continuous improvement systems across all operations.',
    whyAr: 'نحافظ على عمليات موثقة، ومراقبة الجودة، وأنظمة التحسين المستمر في جميع العمليات.'
  },
  {
    titleEn: 'AWS Certified Welding',
    titleAr: 'لحام معتمد من جمعية AWS',
    detailEn: 'AWS D1.1 & D1.4 certification',
    detailAr: 'اعتمادات AWS D1.1 و D1.4',
    whyEn: 'Our welders hold active AWS certifications. We maintain rigorous welding standards and testing protocols.',
    whyAr: 'يحمل اللحامون لدينا شهادات AWS نشطة. نحن نحافظ على معايير لحام صارمة وبروتوكولات اختبار دقيقة.'
  },
  {
    titleEn: 'Vision 2030 Alignment',
    titleAr: 'التوافق مع رؤية 2030',
    detailEn: 'Kingdom infrastructure standards',
    detailAr: 'معايير البنية التحتية للمملكة',
    whyEn: "Our services align with Saudi Arabia's economic diversification and infrastructure modernization initiatives.",
    whyAr: 'تتماشى خدماتنا مع مبادرات التنويع الاقتصادي وتحديث البنية التحتية في المملكة العربية السعودية.'
  },
  {
    titleEn: 'Fiber Laser & CNC Equipped',
    titleAr: 'مجهز بليزر الألياف و CNC',
    detailEn: 'Dammam & Jubail facilities',
    detailAr: 'مرافق الدمام والجبيل',
    whyEn: 'We operate state-of-the-art fabrication equipment with micron-level precision in two strategic locations.',
    whyAr: 'نحن نشغل معدات تصنيع متطورة بدقة على مستوى الميكرون في موقعين استراتيجيين.'
  }
];

const TESTIMONIALS = [
  {
    quoteEn: "NexGen Build managed our industrial facility construction with outstanding coordination. Having civil, electrical, and HVAC teams under one roof eliminated delays completely.",
    quoteAr: "أدارت نكست جن بيلد بناء منشأتنا الصناعية بتنسيق متميز. وجود فرق الأعمال المدنية والكهرباء والتكييف تحت سقف واحد ألغى التأخيرات تماماً.",
    nameEn: "Faisal Al-Harbi",
    nameAr: "فيصل الحربي",
    roleEn: "Project Director, Industrial Infrastructure",
    roleAr: "مدير المشروع، البنية التحتية الصناعية",
  },
  {
    quoteEn: "Their Saudi Aramco Vendor approval was the primary reason we hired them, and their AWS-certified welders delivered flawless spools that passed all inspections first time.",
    quoteAr: "كان اعتمادهم كمورد لأرامكو السعودية هو السبب الرئيسي لتوظيفهم، وقدم لحاموهم المعتمدون من AWS وصلات أنابيب خالية من العيوب اجتازت جميع الفحوصات من المرة الأولى.",
    nameEn: "Eng. Layla Al-Mutairi",
    nameAr: "م. ليلى المطيري",
    roleEn: "Lead Mechanical Quality Engineer",
    roleAr: "مهندسة جودة ميكانيكية رئيسية",
  },
  {
    quoteEn: "The transparency of communication was refreshing. We received detailed weekly updates, and any piping routing conflicts were resolved internally by their team before they affected our schedule.",
    quoteAr: "كانت شفافية التواصل رائعة. تلقينا تحديثات أسبوعية مفصلة، وتم حل أي تعارضات في مسارات الأنابيب داخلياً بواسطة فريقهم قبل أن تؤثر على جدولنا الزمني.",
    nameEn: "Khalid Al-Dosari",
    nameAr: "خالد الدوسري",
    roleEn: "Operations Director, Petrochemical Plant",
    roleAr: "مدير العمليات، مصنع بتروكيماويات",
  },
  {
    quoteEn: "We engaged NexGen Build for a complex expansion project. Their team's dedication to safety and precise execution exceeded our expectations, delivering the project ahead of the deadline.",
    quoteAr: "لقد تعاقدنا مع نكست جن بيلد لمشروع توسعة معقد. تجاوز تفاني فريقهم في السلامة والتنفيذ الدقيق توقعاتنا، حيث تم تسليم المشروع قبل الموعد النهائي.",
    nameEn: "Tariq Al-Zahrani",
    nameAr: "طارق الزهراني",
    roleEn: "Senior Plant Manager",
    roleAr: "مدير مصنع أول",
  },
  {
    quoteEn: "Finding a reliable contractor for both civil and MEP works is challenging. NexGen provided a seamless experience, demonstrating exceptional technical capabilities and problem-solving skills on-site.",
    quoteAr: "العثور على مقاول موثوق لكل من الأعمال المدنية والكهروميكانيكية يمثل تحدياً. قدمت نكست جن تجربة سلسة، وأظهرت قدرات فنية استثنائية ومهارات في حل المشكلات في الموقع.",
    nameEn: "Mohammed Al-Otaibi",
    nameAr: "محمد العتيبي",
    roleEn: "VP of Engineering",
    roleAr: "نائب رئيس الهندسة",
  },
  {
    quoteEn: "Their CNC precision cutting and fabrication services are unmatched in the region. The quality of the structural steel components they delivered was phenomenal.",
    quoteAr: "خدمات القص والتصنيع الدقيقة باستخدام CNC الخاصة بهم لا مثيل لها في المنطقة. كانت جودة المكونات الفولاذية الهيكلية التي قدموها استثنائية.",
    nameEn: "Abdullah Al-Ghamdi",
    nameAr: "عبدالله الغامدي",
    roleEn: "Procurement Head, Construction",
    roleAr: "رئيس المشتريات، البناء",
  }
];

export default function AboutPage() {
  const { t, lang } = useLanguage();

  React.useEffect(() => {
    // Set dynamic browser page title
    document.title = lang === 'ar'
      ? "عن نكست جن بيلد | خبراء البناء والتصنيع في السعودية"
      : "About NexGen Build | Construction & Fabrication Experts in Saudi Arabia";

    // Observer for the timeline container (for drawing the vertical line)
    const timelineEl = document.querySelector('.timeline');
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    }, {
      threshold: 0.1
    });

    if (timelineEl) {
      timelineObserver.observe(timelineEl);
    }

    // Observer for the timeline items (staggered entry animations)
    const itemObserver = new IntersectionObserver((entries) => {
      const toAnimateIn = entries.filter(e => e.isIntersecting);
      const toAnimateOut = entries.filter(e => !e.isIntersecting);

      toAnimateIn.forEach((entry, index) => {
        const el = entry.target as HTMLElement;
        if (!el.classList.contains('in-view')) {
          el.style.setProperty('--delay', `${index * 150}ms`);
          el.classList.add('in-view');
        }
      });

      toAnimateOut.forEach((entry) => {
        const el = entry.target as HTMLElement;
        el.classList.remove('in-view');
        el.style.removeProperty('--delay');
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    const items = document.querySelectorAll('.timeline-item');
    items.forEach(item => itemObserver.observe(item));

    return () => {
      timelineObserver.disconnect();
      itemObserver.disconnect();
    };
  }, [lang]);

  return (
    <main className="flex-grow">
      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-bg"></div>
        <div className="hero-infinite-grid" aria-hidden="true"></div>
        <InteractiveGrid />
        <div className="container about-hero-content">
          <div className="page-breadcrumb">
            <Link href="/" style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
              {t('Home', 'الرئيسية')}
            </Link>
            &nbsp;/&nbsp;
            <span>{t('About Us', 'عن الشركة')}</span>
          </div>
          <h1 dangerouslySetInnerHTML={{ __html: t('About <span>NexGen Build</span>', 'عن <span>نكست جن بيلد</span>') }}></h1>
          <p>
            {t(
              "We're a Saudi Aramco-approved construction and fabrication company delivering end-to-end solutions across six integrated service divisions. Our integrated approach, certified expertise, and commitment to safety set us apart in Saudi Arabia's competitive construction market.",
              'نحن شركة بناء وتصنيع معتمدة من أرامكو السعودية نقدم حلولاً متكاملة عبر ستة أقسام خدمات متكاملة. نهجنا المتكامل وخبرتنا المعتمدة والتزامنا بالسلامة يميزنا في سوق البناء التنافسي بالمملكة العربية السعودية.'
            )}
          </p>
          <div style={{ marginTop: '24px' }}>
            <Link className="btn-primary" href="/services" style={{ display: 'inline-block', textDecoration: 'none' }}>
              {t('Explore Our Work', 'استكشف أعمالنا')}
            </Link>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="about-story" style={{ padding: '90px 0', background: 'var(--white)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center' }}>
            <div>
              <div className="section-label">{t('Our Story', 'قصتنا')}</div>
              <h2 className="section-title" style={{ marginTop: '12px', fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1.15 }} dangerouslySetInnerHTML={{ __html: t('How NexGen Build <span>Began</span>', 'كيف <span>بدأت</span> نكست جن بيلد') }}></h2>
              <div style={{ fontSize: '15px', color: 'var(--gray-600)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
                <p>
                  {t(
                    'NexGen Build was founded on a simple principle: construction and fabrication projects fail when multiple contractors don\'t communicate effectively. We saw this problem repeatedly across industrial and commercial projects in Saudi Arabia.',
                    'تأسست نكست جن بيلد على مبدأ بسيط: تفشل مشاريع البناء والتصنيع عندما لا يتواصل المقاولون المتعددون بفعالية. لقد رأينا هذه المشكلة تتكرر في المشاريع الصناعية والتجارية بالمملكة العربية السعودية.'
                  )}
                </p>
                <p>
                  {t(
                    'Our founders—engineers and project managers with decades of combined experience—decided to build something different. Instead of managing subcontractors, we built an integrated company with six specialized divisions under one roof. This approach eliminates coordination delays, ensures design compatibility, and gives clients a single point of accountability.',
                    'قرر مؤسسونا — وهم مهندسون ومدراء مشاريع يتمتعون بعقود من الخبرة المشتركة — بناء شيء مختلف. وبدلاً من إدارة مقاولين من الباطن، قمنا ببناء شركة متكاملة تضم ستة أقسام متخصصة تحت سقف واحد. يلغي هذا النهج تأخيرات التنسيق، ويضمن توافق التصميم، ويمنح العملاء نقطة مسؤولية واحدة.'
                  )}
                </p>
                <p>
                  {t(
                    'Our approval as Saudi Aramco vendor #10119021 validates our commitment to quality, safety, and compliance. We\'ve built a reputation for delivering projects on time, within budget, and to the highest standards.',
                    'إن اعتمادنا كمورد لدى أرامكو السعودية رقم 10119021 يؤكد التزامنا بالجودة والسلامة والامتثال. لقد بنينا سمعة طيبة في تسليم المشاريع في الوقت المحدد، وضمن الميزانية، ووفقاً لأعلى المعايير.'
                  )}
                </p>
              </div>
            </div>
            <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', height: '360px' }}>
              <video src="/video5.mp4" className="about-story-video" style={{ width: '100%', height: '100%', objectFit: 'cover' }} muted loop playsInline autoPlay preload="metadata" aria-label="NexGen Build — Our story preview video"></video>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VALUES */}
      <section className="about-mission-values" style={{ padding: '90px 0', background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 60px' }}>
            <div className="section-label">{t('Mission & Values', 'الرسالة والقيم')}</div>
            <h2 className="section-title" style={{ marginTop: '12px' }} dangerouslySetInnerHTML={{ __html: t('What We <span>Stand For</span>', 'ماذا <span>نمثل</span>') }}></h2>
            <div style={{ padding: '24px 32px', background: 'var(--white)', borderRadius: '12px', borderInlineStart: '4px solid var(--orange)', boxShadow: 'var(--shadow-sm)', marginTop: '24px', textAlign: lang === 'ar' ? 'right' : 'left' }}>
              <strong style={{ color: 'var(--navy)', fontSize: '15px' }}>{t('Our Mission:', 'مهمتنا:')}</strong >
              <p style={{ margin: '8px 0 0 0', fontSize: '15px', color: 'var(--gray-600)', lineHeight: '1.7' }}>
                {t(
                  "We deliver integrated construction and fabrication solutions that build the Kingdom's infrastructure reliably, safely, and sustainably.",
                  'نحن نقدم حلول بناء وتصنيع متكاملة تبني البنية التحتية للمملكة بموثوقية وأمان واستدامة.'
                )}
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {VALUES.map((item, i) => (
              <div key={i} style={{ background: 'var(--white)', padding: '32px', borderRadius: '16px', border: '1px solid var(--gray-200)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>{item.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--navy)', marginBottom: '10px', marginTop: 0 }}>
                  {t(item.titleEn, item.titleAr)}
                </h3>
                <p style={{ fontSize: '13.5px', color: 'var(--gray-600)', lineHeight: '1.65', margin: 0 }}>
                  {t(item.descEn, item.descAr)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM & SOLUTION */}
      <section className="about-problem-solution" style={{ padding: '90px 0', background: 'var(--white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 50px' }}>
            <div className="section-label">{t('The Problem We Solved', 'المشكلة التي حللناها')}</div>
            <h2 className="section-title" style={{ marginTop: '12px' }} dangerouslySetInnerHTML={{ __html: t('The Challenge of <span>Fragmented Contractors</span>', 'تحدي <span>المقاولين المتجزئين</span>') }}></h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.03)', border: '1.5px solid rgba(239, 68, 68, 0.15)', borderRadius: '16px', padding: '36px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <span style={{ fontSize: '24px' }}>❌</span>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#b91c1c', margin: 0 }}>
                  {t('The Coordination Headache', 'صداع التنسيق')}
                </h3>
              </div>
              <ul style={{ padding: 0, margin: 0, listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: 'var(--gray-600)', lineHeight: '1.6' }}>
                {[
                  { en: 'Electrical contractor designs power systems without consulting HVAC team.', ar: 'مقاول الكهرباء يصمم أنظمة الطاقة دون استشارة فريق التكييف.' },
                  { en: 'Plumbing team discovers conflicts with structural layout during piping.', ar: 'فريق السباكة يكتشف تعارضات مع المخطط الإنشائي أثناء تمديد الأنابيب.' },
                  { en: 'Fire protection systems are not integrated with building design, leading to code failures.', ar: 'أنظمة مكافحة الحرائق غير متكاملة مع تصميم المبنى، مما يؤدي إلى فشل الامتثال.' },
                  { en: 'Three different contractors mean three different schedules and conflicting standards.', ar: 'ثلاثة مقاولين مختلفين يعنون ثلاثة جداول زمنية مختلفة ومعايير متضاربة.' },
                  { en: 'Change orders multiply, costs escalate, and project handover timelines slip.', ar: 'أوامر التغيير تتضاعف، التكاليف ترتفع، وتواريخ تسليم المشاريع تتأخر.' }
                ].map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#ef4444' }}>•</span>
                    <span>{t(item.en, item.ar)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: 'rgba(16, 185, 129, 0.03)', border: '1.5px solid rgba(16, 185, 129, 0.15)', borderRadius: '16px', padding: '36px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <span style={{ fontSize: '24px' }}>✓</span>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#047857', margin: 0 }}>
                  {t('Our Integrated Solution', 'حلنا المتكامل')}
                </h3>
              </div>
              <ul style={{ padding: 0, margin: 0, listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: 'var(--gray-600)', lineHeight: '1.6' }}>
                {[
                  { en: 'Six specialized divisions working as one integrated team.', ar: 'ستة أقسام متخصصة تعمل كفريق واحد متكامل.' },
                  { en: 'Coordinated design and spatial planning from project start.', ar: 'تصميم منسق وتخطيط مكاني من بداية المشروع.' },
                  { en: 'Single point of accountability for all civil, MEP, and fabrication scopes.', ar: 'نقطة مسؤولية واحدة لجميع النطاقات المدنية والكهروميكانيكية والتصنيع.' },
                  { en: 'Faster project delivery with synchronized contractor schedules.', ar: 'تسليم أسرع للمشروع مع جداول مقاولين متزامنة.' },
                  { en: 'Predictable costs with significantly fewer change orders.', ar: 'تكاليف متوقعة مع أوامر تغيير أقل بكثير.' }
                ].map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#10b981' }}>✓</span>
                    <span>{t(item.en, item.ar)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="timeline-section" aria-labelledby="timeline-heading">
        <div className="container">
          <div className="timeline-section-header">
            <div className="section-label timeline-section-eyebrow">{t('Our Journey', 'رحلتنا')}</div>
            <h2 id="timeline-heading" className="section-title timeline-section-title" dangerouslySetInnerHTML={{ __html: t('Key <span>Milestones</span>', '<span>المحطات</span> الرئيسية') }}></h2>
          </div>
          <div className="timeline">
            {TIMELINE.map((item, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-dot" aria-hidden="true"></div>
                <div className="timeline-content">
                  <div className="timeline-year">{t(item.yearEn, item.yearAr)}</div>
                  <div className="timeline-title">{t(item.titleEn, item.titleAr)}</div>
                  <div className="timeline-desc">{t(item.descEn, item.descAr)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERTISE & CREDENTIALS */}
      <section className="about-credentials" style={{ padding: '90px 0', background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 50px' }}>
            <div className="section-label">{t('Credentials', 'الاعتمادات والشهادات')}</div>
            <h2 className="section-title" style={{ marginTop: '12px' }} dangerouslySetInnerHTML={{ __html: t('Built on <span>Expertise &amp; Certifications</span>', 'مبني على <span>الخبرة والشهادات</span>') }}></h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {CREDENTIALS.map((cred, i) => (
              <div key={i} style={{ background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: '16px', padding: '28px', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--navy)', margin: 0, maxWidth: '80%' }}>
                    {t(cred.titleEn, cred.titleAr)}
                  </h3>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--orange)', background: 'rgba(232, 96, 26, 0.08)', padding: '4px 8px', borderRadius: '4px' }}>
                    {t(cred.detailEn, cred.detailAr)}
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--gray-600)', lineHeight: '1.6', margin: 0 }}>
                  {t(cred.whyEn, cred.whyAr)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FACILITIES */}
      <section className="about-facilities" style={{ padding: '90px 0', background: 'var(--white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 60px' }}>
            <div className="section-label">{t('Workshop Infrastructure', 'مرافق ورش العمل')}</div>
            <h2 className="section-title" style={{ marginTop: '12px' }} dangerouslySetInnerHTML={{ __html: t('Infrastructure Built for <span>Precision</span>', 'بنية تحتية مبنية <span>للدقة</span>') }}></h2>
            <p className="section-subtitle" style={{ marginTop: '12px' }}>
              {t(
                'Our workshop facilities across Dammam and Jubail provide the equipment and space needed for complete project delivery—from design to finished installation.',
                'توفر مرافق ورش العمل لدينا في الدمام والجبيل المعدات والمساحة اللازمة لتسليم المشاريع بالكامل — من التصميم إلى التركيب النهائي.'
              )}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px' }}>
            <div style={{ background: 'var(--cream)', borderRadius: '16px', padding: '36px', border: '1px solid var(--gray-200)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>🏭 {t('Dammam Workshop', 'ورشة الدمام')}</h3>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gray-500)' }}>📍 {t('Dammam, Eastern Province', 'الدمام، المنطقة الشرقية')}</span>
              </div>
              <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', marginTop: 0 }}>{t('Equipment', 'المعدات والأنظمة')}</h4>
              <ul style={{ padding: 0, margin: '0 0 24px 0', listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: 'var(--gray-600)' }}>
                {['Fiber laser cutting systems (precision metal sheets & plates)', 'CNC machining centers (micron-level accuracy)', 'Metal fabrication workstations (structural steel, aluminum, stainless)', 'Welding stations (AWS-certified processes: TIG, MIG, SMAW)', 'Material testing & QA control laboratory'].map((eq, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '8px' }}><span style={{ color: 'var(--orange)' }}>•</span>{t(eq, eq)}</li>
                ))}
              </ul>
              <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', marginTop: 0 }}>{t('Capabilities', 'القدرات والإنتاجية')}</h4>
              <ul style={{ padding: 0, margin: 0, listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: 'var(--gray-600)' }}>
                {['CNC precision cutting within ±0.05mm tolerances', 'Complete welding scope (structural, pressure vessel, pipe spool)', 'Custom design-to-fabrication turnaround: 5-7 business days', 'Quality control and non-destructive testing (NDT) support'].map((cap, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '8px' }}><span style={{ color: 'var(--orange)' }}>•</span>{t(cap, cap)}</li>
                ))}
              </ul>
            </div>

            <div style={{ background: 'var(--cream)', borderRadius: '16px', padding: '36px', border: '1px solid var(--gray-200)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>🏗️ {t('Jubail Workshop', 'ورشة الجبيل')}</h3>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gray-500)' }}>📍 {t('Jubail Industrial City', 'مدينة الجبيل الصناعية')}</span>
              </div>
              <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', marginTop: 0 }}>{t('Equipment', 'المعدات والأنظمة')}</h4>
              <ul style={{ padding: 0, margin: '0 0 24px 0', listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: 'var(--gray-600)' }}>
                {['CNC fiber laser cutting systems', 'Heavy-duty industrial machining centers', 'Large-scale metal fabrication bays', 'Specialty welding structures & facilities', 'Quality assurance and calibration testing lab'].map((eq, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '8px' }}><span style={{ color: 'var(--orange)' }}>•</span>{t(eq, eq)}</li>
                ))}
              </ul>
              <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', marginTop: 0 }}>{t('Capabilities', 'القدرات والإنتاجية')}</h4>
              <ul style={{ padding: 0, margin: 0, listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: 'var(--gray-600)' }}>
                {['Large-scale structural industrial fabrication', 'Specialized heavy pressure vessel assemblies', 'Complex welded systems and skid assemblies', 'Rapid industrial prototyping and production scale manufacturing'].map((cap, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '8px' }}><span style={{ color: 'var(--orange)' }}>•</span>{t(cap, cap)}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TRACK RECORD STATISTICS */}
      <section className="about-stats" style={{ padding: '70px 0', background: 'var(--navy)', color: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '42px', fontWeight: 800, color: 'var(--orange)', fontFamily: "'Barlow Condensed', sans-serif" }}>
                <Counter to={150} suffix="+" />
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginTop: '6px' }}>{t('Completed Projects', 'مشاريع مكتملة')}</div>
            </div>
            <div>
              <div style={{ fontSize: '42px', fontWeight: 800, color: 'var(--orange)', fontFamily: "'Barlow Condensed', sans-serif" }}>
                98%
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginTop: '6px' }}>{t('On-Time Delivery Rate', 'معدل التسليم في الوقت المحدد')}</div>
            </div>
            <div>
              <div style={{ fontSize: '42px', fontWeight: 800, color: 'var(--orange)', fontFamily: "'Barlow Condensed', sans-serif" }}>
                85%
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginTop: '6px' }}>{t('Client Retention Rate', 'معدل رضا واستمرار العملاء')}</div>
            </div>
            <div>
              <div style={{ fontSize: '42px', fontWeight: 800, color: 'var(--orange)', fontFamily: "'Barlow Condensed', sans-serif" }}>
                <Counter to={5} suffix="+" />
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginTop: '6px' }}>{t('Industries Served', 'صناعات نخدمها')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="about-team" style={{ padding: '90px 0', background: 'var(--white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 60px' }}>
            <div className="section-label">{t('Our Leadership', 'فريق القيادة')}</div>
            <h2 className="section-title" style={{ marginTop: '12px' }} dangerouslySetInnerHTML={{ __html: t('Meet the People Behind <span>NexGen Build</span>', 'تعرف على الأشخاص وراء <span>نكست جن بيلد</span>') }}></h2>
            <p className="section-subtitle" style={{ marginTop: '12px' }}>
              {t('Our strength is in our people. Every team member brings proven expertise, professional certifications, and a commitment to excellence.', 'قوتنا تكمن في موظفينا. يجلب كل عضو في الفريق خبرة مثبتة وشهادات مهنية والتزاماً بالتميز.')}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              {
                nameEn: 'Eng. Hamad Zaman',
                nameAr: 'م. حمد زمان',
                roleEn: 'Founder & Managing Director',
                roleAr: 'المؤسس والمدير العام',
                bioEn: '20+ years of construction and industrial project management in Saudi Arabia. Recognized for driving structural execution and client-focused engineering solutions.',
                bioAr: 'أكثر من 20 عاماً من الخبرة في إدارة مشاريع البناء والمشاريع الصناعية في السعودية. معروف بقيادة التنفيذ الإنشائي والحلول الهندسية التي تركز على العملاء.'
              },
              {
                nameEn: 'Eng. Tariq Al-Ghamdi',
                nameAr: 'م. طارق الغامدي',
                roleEn: 'Operations Manager',
                roleAr: 'مدير العمليات',
                bioEn: '15+ years managing integrated civil and industrial fabrication sites. Specialized in workflow efficiency, AWS welding compliance, and safety auditing.',
                bioAr: 'أكثر من 15 عاماً في إدارة مواقع البناء والتصنيع الصناعي المتكاملة. متخصص في كفاءة تدفق العمل، والامتثال للـ AWS والتدقيق على السلامة.'
              },
              {
                nameEn: 'Eng. Sarah Al-Dosari',
                nameAr: 'م. سارة الدوسري',
                roleEn: 'Technical Director',
                roleAr: 'المدير الفني',
                bioEn: '12+ years leading structural design, mechanical systems integration, and international engineering standards compliance for Saudi infrastructure projects.',
                bioAr: 'أكثر من 12 عاماً في قيادة التصميم الإنشائي، وتكامل الأنظمة الميكانيكية، والامتثال لمعايير الهندسة الدولية لمشاريع البنية التحتية السعودية.'
              }
            ].map((leader, i) => (
              <div key={i} style={{ background: 'var(--cream)', border: '1px solid var(--gray-200)', borderRadius: '16px', padding: '32px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--navy)', margin: '0 0 6px 0' }}>
                  {t(leader.nameEn, leader.nameAr)}
                </h3>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>
                  {t(leader.roleEn, leader.roleAr)}
                </div>
                <p style={{ fontSize: '13.5px', color: 'var(--gray-600)', lineHeight: '1.65', margin: 0 }}>
                  {t(leader.bioEn, leader.bioAr)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAFETY & ENVIRONMENT */}
      <section className="about-safety-sustain" style={{ padding: '90px 0', background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px' }}>
            <div>
              <div className="section-label">{t('Safety Protocols', 'أنظمة السلامة')}</div>
              <h2 className="section-title" style={{ marginTop: '12px' }} dangerouslySetInnerHTML={{ __html: t('Safety Is <span>Non-Negotiable</span>', 'السلامة <span>غير قابلة للتفاوض</span>') }}></h2>
              <p style={{ fontSize: '14.5px', color: 'var(--gray-600)', lineHeight: '1.7', marginTop: '16px' }}>
                {t(
                  "At NexGen Build, safety isn't a regulation we comply with—it's a value we live. We believe every team member deserves to work on a safe job site, and every client deserves projects completed without incident.",
                  'في نكست جن بيلد، السلامة ليست لائحة نلتزم بها فحسب — بل هي قيمة نعيشها. نحن نؤمن بأن كل عضو في الفريق يستحق العمل في موقع عمل آمن، ويستحق كل عميل إنجاز المشاريع دون حوادث.'
                )}
              </p>
              <div style={{ background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: '12px', padding: '20px', marginTop: '20px', borderLeft: '4px solid var(--orange)' }}>
                <strong style={{ fontSize: '18px', color: 'var(--navy)', fontFamily: "'Barlow Condensed', sans-serif" }}>1,000,000+</strong>
                <span style={{ fontSize: '13px', color: 'var(--gray-600)', display: 'block', marginTop: '2px' }}>{t('Safe Man-Hours Executed on Sites', 'ساعة عمل آمنة منفذة في المواقع')}</span>
              </div>
            </div>

            <div>
              <div className="section-label">{t('Sustainability', 'الاستدامة والمسؤولية البيئية')}</div>
              <h2 className="section-title" style={{ marginTop: '12px' }} dangerouslySetInnerHTML={{ __html: t('Building Responsibly for <span>Future</span>', 'البناء بمسؤولية <span>للمستقبل</span>') }}></h2>
              <p style={{ fontSize: '14.5px', color: 'var(--gray-600)', lineHeight: '1.7', marginTop: '16px' }}>
                {t(
                  "As a construction company serving Saudi Arabia during Vision 2030 implementation, we take responsibility for sustainable practices—optimizing energy systems and minimizing sheet metal waste.",
                  'بصفتنا شركة إنشاءات تخدم المملكة العربية السعودية خلال تنفيذ رؤية 2030، فإننا نتحمل مسؤولية الممارسات المستدامة — تحسين أنظمة الطاقة وتقليل نفايات المعادن.'
                )}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '24px' }}>
                {['HVAC energy optimization', 'Water conservation plans', 'CNC nesting waste reduction', 'Sustainable material sourcing'].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '8px', fontSize: '13px', fontWeight: 700, color: 'var(--navy)' }}>
                    <span style={{ color: 'var(--orange)' }}>✓</span>
                    <span>{t(item, item)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="about-testimonials-scroll" aria-label="Client testimonials">
        <div className="about-ts-track">
          <div className="about-ts-group">
            {TESTIMONIALS.map((item, i) => (
              <article key={i} className="about-ts-card">
                <p className="about-ts-stars" aria-hidden="true">★★★★★</p>
                <p className="about-ts-quote">“{t(item.quoteEn, item.quoteAr)}”</p>
                <div className="about-ts-footer">
                  <span className="about-ts-name">{t(item.nameEn, item.nameAr)}</span>
                  <span className="about-ts-role">{t(item.roleEn, item.roleAr)}</span>
                </div>
              </article>
            ))}
          </div>
          <div className="about-ts-group" aria-hidden="true">
            {TESTIMONIALS.map((item, i) => (
              <article key={i} className="about-ts-card">
                <p className="about-ts-stars" aria-hidden="true">★★★★★</p>
                <p className="about-ts-quote">“{t(item.quoteEn, item.quoteAr)}”</p>
                <div className="about-ts-footer">
                  <span className="about-ts-name">{t(item.nameEn, item.nameAr)}</span>
                  <span className="about-ts-role">{t(item.roleEn, item.roleAr)}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="home-cta-strip" style={{ padding: '90px 0' }}>
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: 'white', marginBottom: '16px', lineHeight: 1.1 }}>
            {t('Ready to Work with a Proven Partner?', 'جاهز للعمل مع شريك مجرب؟')}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '17px', maxWidth: '640px', margin: '0 auto 36px', lineHeight: 1.7 }}>
            {t(
              "Whether you're planning a new project, need specialized fabrication, or want to discuss how our integrated approach can benefit your operations, we're ready to listen.",
              'سواء كنت تخطط لمشروع جديد، أو تحتاج لتصنيع متخصص، أو ترغب في مناقشة كيف يمكن لنهجنا المتكامل أن يفيد عملياتك، فنحن مستعدون للاستماع.'
            )}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link className="home-cta-btn" href="/contact" style={{ display: 'inline-block', padding: '16px 36px', fontSize: '16px', fontWeight: 700 }}>
              {t('Request Your Free Consultation', 'اطلب استشارتك المجانية')}
            </Link>
            <Link href="/services" style={{ display: 'inline-block', padding: '16px 36px', fontSize: '16px', fontWeight: 700, border: '2px solid white', borderRadius: '8px', color: 'white', textDecoration: 'none', transition: 'all 0.3s ease' }} onMouseOver={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'var(--navy)'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'white'; }}>
              {t('View Our Services', 'عرض خدماتنا')}
            </Link>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', marginTop: '16px' }}>
            📧 H.zaman@Nxgens.com | 💬 +966-555-123-456
          </div>
        </div>
      </section>
    </main>
  );
}
