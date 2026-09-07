'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { InteractiveGrid } from '@/components/InteractiveGrid';
import { Accordion } from '@/components/Accordion';

export default function FabricationShopPage() {
  const { t, lang } = useLanguage();

  useEffect(() => {
    // Scroll reveal setup
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          if (!el.classList.contains('in-view')) {
            el.style.setProperty('--delay', `${index * 150}ms`);
            el.classList.add('in-view');
          }
        } else {
          el.classList.remove('in-view');
          el.style.removeProperty('--delay');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    const items = document.querySelectorAll('.reveal-section, .reveal-card');
    items.forEach(item => revealObserver.observe(item));

    return () => {
      revealObserver.disconnect();
    };
  }, []);

  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAB_FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.qEn,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.aEn
      }
    }))
  };

  return (
    <main className="flex-grow">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />

      {/* HERO SECTION */}
      <section className="fab-hero">
        <div className="fab-hero-bg"></div>
        <div className="hero-infinite-grid" aria-hidden="true"></div>
        <InteractiveGrid />
        <div className="container fab-hero-content">
          <div className="page-breadcrumb">
            <Link href="/" style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
              {t('Home', 'الرئيسية')}
            </Link> &nbsp;/&nbsp;
            <span>{t('Fabrication Shop', 'ورشة التصنيع')}</span>
          </div>
          <h1 dangerouslySetInnerHTML={{ __html: t('Steel <span>Fabrication Shop</span> in Dammam, Saudi Arabia', 'ورشة <span>تصنيع الفولاذ</span> في الدمام، المملكة العربية السعودية') }}></h1>
          <p>
            {t(
              "NexGen runs a 4,000 m² fabrication shop in Dammam, built for the Kingdom's oil and gas, petrochemical, utility, and heavy construction sectors. We convert engineering drawings into structural steel, ASME piping spools, pressure vessels, and precision-machined parts.",
              "تدير نكست جن ورشة تصنيع تبلغ مساحتها 4,000 متر مربع في الدمام، مخصصة لقطاعات النفط والغاز والبتروكيماويات والمرافق والبناء الثقيل في المملكة. نحن نحول الرسومات الهندسية إلى هياكل فولاذية، ووصلات أنابيب ASME، وأوعية ضغط، وأجزاء تشغيل آلي."
            )}
          </p>
          <div className="fab-hero-badges">
            <div className="hero-pill">🏭 <span>Dammam</span> — 4,000 m² Workshop</div>
            <div className="hero-pill">📜 ASME &amp; AWS Certified</div>
            <div className="hero-pill">💼 Aramco Vendor Approved #10119021</div>
          </div>
          <div style={{ marginTop: '30px' }}>
            <Link className="workshop-hero-btn" href="/contact" style={{ display: 'inline-block', padding: '16px 36px', fontSize: '16px', fontWeight: 700, background: 'var(--orange)', color: 'white', textDecoration: 'none', borderRadius: '8px', boxShadow: 'var(--shadow-md)', transition: 'all 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              {t('Request a Fabrication Quote →', 'اطلب عرض سعر تصنيع ←')}
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT WE BUILD SECTION */}
      <section className="section" style={{ background: 'var(--white)', padding: '90px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 48px' }}>
            <div className="section-label" style={{ display: 'inline-flex' }}>{t('Our Products', 'منتجاتنا')}</div>
            <h2 className="section-title" style={{ marginTop: '12px' }} dangerouslySetInnerHTML={{ __html: t('What Our <span>Fabrication Shop</span> Builds', 'ماذا تصنع <span>ورشة تصنيع</span> نكست جن بيلد') }}></h2>
            <p className="section-subtitle" style={{ margin: '16px auto 0', maxWidth: '720px' }}>
              {t(
                'We fabricate four core product lines under one roof, so clients don\'t split a single project across multiple vendors.',
                'نقوم بتصنيع أربعة خطوط إنتاج أساسية تحت سقف واحد، بحيث لا يضطر عملاؤنا إلى تقسيم المشروع بين موردين متعددين.'
              )}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }} className="responsive-split-grid">
            
            {/* Structural Steel */}
            <div style={{ background: 'var(--cream)', border: '1px solid var(--gray-200)', borderRadius: '16px', padding: '32px' }} className="reveal-card">
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>🏗️</div>
              <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--navy)', marginBottom: '12px', marginTop: 0 }}>
                {t('Structural Steel Fabrication', 'تصنيع الفولاذ الهيكلي')}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--gray-600)', lineHeight: '1.7', margin: 0 }}>
                {t(
                  'We build columns, platform structures, walkways, crane girders, building frames, and custom support frameworks. Our team handles heavy and light structural steel for industrial and commercial projects alike.',
                  'نقوم بتصنيع الأعمدة، هياكل المنصات، الممرات، روافد الكرينات، إطارات المباني، وهياكل الدعم المخصصة. يتعامل فريقنا مع الفولاذ الهيكلي الثقيل والخفيف للمشاريع الصناعية والتجارية على حد سواء.'
                )}
              </p>
            </div>

            {/* ASME Piping */}
            <div style={{ background: 'var(--cream)', border: '1px solid var(--gray-200)', borderRadius: '16px', padding: '32px' }} className="reveal-card">
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>🧪</div>
              <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--navy)', marginBottom: '12px', marginTop: 0 }}>
                {t('ASME Piping Spools', 'أنابيب ووصلات ASME')}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--gray-600)', lineHeight: '1.7', margin: 0 }}>
                {t(
                  'We manufacture piping spools, manifold systems, and header connections to ASME B31.1 and B31.3. Every spool ships with a documented QA package, ready for site installation without rework.',
                  'نصنع وصلات الأنابيب، أنظمة التشعب، والروابط الرئيسية وفقاً لـ ASME B31.1 و B31.3. تشحن كل وصلة مع حزمة تأكيد جودة كاملة، جاهزة للتركيب في الموقع بدون إعادة عمل.'
                )}
              </p>
            </div>

            {/* Tanks & Vessels */}
            <div style={{ background: 'var(--cream)', border: '1px solid var(--gray-200)', borderRadius: '16px', padding: '32px' }} className="reveal-card">
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>🛢️</div>
              <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--navy)', marginBottom: '12px', marginTop: 0 }}>
                {t('Industrial Tanks and Pressure Vessels', 'الخزانات الصناعية وأوعية الضغط')}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--gray-600)', lineHeight: '1.7', margin: 0 }}>
                {t(
                  'We fabricate storage tanks, pressure vessels, silos, and process columns engineered for high-pressure limits and aggressive industrial environments.',
                  'نصنع خزانات التخزين، أوعية الضغط، الصوامع، وأعمدة المعالجة المصممة هندسياً للتعامل مع حدود الضغط العالي والبيئات الصناعية القاسية.'
                )}
              </p>
            </div>

            {/* Sheet Metal & Ductwork */}
            <div style={{ background: 'var(--cream)', border: '1px solid var(--gray-200)', borderRadius: '16px', padding: '32px' }} className="reveal-card">
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>📐</div>
              <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--navy)', marginBottom: '12px', marginTop: 0 }}>
                {t('Sheet Metal and Ductwork', 'أعمال الصاج ومجاري الهواء')}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--gray-600)', lineHeight: '1.7', margin: 0 }}>
                {t(
                  'We produce ventilation ducting, hoppers, transition chutes, electrical enclosure cabinets, and architectural partitions, cut and formed to tight tolerances.',
                  'ننتج مجاري التهوية، القواديس، قنوات الانتقال، خزائن اللوحات الكهربائية، والقواطع المعمارية، المقطوعة والمشكلة بتفاوتات ضيقة.'
                )}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CAPACITY & EQUIPMENT SECTION */}
      <section className="section" style={{ background: 'var(--cream)', padding: '90px 0', borderTop: '1px solid var(--gray-200)', borderBottom: '1px solid var(--gray-200)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 48px' }}>
            <div className="section-label" style={{ display: 'inline-flex' }}>{t('Capabilities', 'إمكانياتنا')}</div>
            <h2 className="section-title" style={{ marginTop: '12px' }} dangerouslySetInnerHTML={{ __html: t('Fabrication Shop <span>Capacity &amp; Equipment</span>', 'قدرات ومعدات <span>ورشة التصنيع</span>') }}></h2>
            <p className="section-subtitle" style={{ margin: '16px auto 0', maxWidth: '720px' }}>
              {t(
                'Our Dammam facility runs four systems side by side, so structural, piping, and machining jobs move in parallel instead of queuing.',
                'تعمل منشأتنا بالدمام بأربعة أنظمة متوازية لضمان تحرك مشاريع الهياكل والأنابيب والتشغيل الآلي في نفس الوقت دون تأخير.'
              )}
            </p>
          </div>

          <div className="premium-table-container" style={{ overflowX: 'auto' }}>
            <table className="premium-table">
              <thead>
                <tr>
                  <th style={{ width: '35%' }}>{t('Capability', 'القدرة والعملية')}</th>
                  <th>{t('Detail & Capacity Specification', 'التفاصيل ومواصفات السعة')}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { enCap: 'Workshop floor space', arCap: 'مساحة أرضية الورشة', enDet: '4,000 m², with heavy overhead cranes and dedicated fabrication bays', arDet: '4,000 متر مربع، مع رافعات علوية ثقيلة وخلايا تصنيع مخصصة' },
                  { enCap: 'Fiber laser cutting', arCap: 'القطع بليزر الألياف', enDet: 'Cuts steel, stainless steel, aluminum, and brass up to 25 mm thick', arDet: 'يقطع الفولاذ، الستانلس، الألمنيوم، والنحاس بسماكة تصل إلى 25 مم' },
                  { enCap: 'CNC machining', arCap: 'التشغيل الآلي CNC', enDet: 'Milling, turning, and thread cutting for replacement and custom parts', arDet: 'فرز، خراطة، تسنين لقطع الغيار والقطع المخصصة' },
                  { enCap: 'Welding processes', arCap: 'عمليات اللحام المعتمدة', enDet: 'FCAW, SMAW, GTAW (TIG), GMAW (MIG) — AWS and ASME certified', arDet: 'FCAW, SMAW, GTAW (TIG), GMAW (MIG) — معتمدة من AWS و ASME' },
                  { enCap: 'Weld rejection rate', arCap: 'معدل رفض اللحام', enDet: 'Below 1%, verified by third-party testing', arDet: 'أقل من 1٪، معتمد عبر اختبارات جهات مستقلة NDT' },
                  { enCap: 'Painting and assembly', arCap: 'الطلاء والتجميع', enDet: 'Dedicated painting yard and clean assembly areas for large builds', arDet: 'ساحة طلاء مخصصة ومناطق تجميع نظيفة للتجميعات الضخمة' }
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td><strong>{t(row.enCap, row.arCap)}</strong></td>
                    <td>{t(row.enDet, row.arDet)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* QUALITY STANDARDS & CERTIFICATIONS */}
      <section className="section" style={{ background: 'var(--white)', padding: '90px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'center' }} className="responsive-split-grid">
            
            {/* Left side: Content */}
            <div className="reveal-section">
              <div className="section-label">{t('Quality & Standards', 'الجودة والمعايير')}</div>
              <h2 className="section-title" style={{ marginTop: '12px' }} dangerouslySetInnerHTML={{ __html: t('Quality Standards &amp; <span>Certifications</span>', 'معايير الجودة و<span>الشهادات المعتمدة</span>') }}></h2>
              <p style={{ fontSize: '15px', color: 'var(--gray-600)', lineHeight: '1.8', marginTop: '20px', marginBottom: '24px' }}>
                {t(
                  "We document every job the way an EPC contractor or oil and gas operator expects. This paper trail matters for audits, commissioning, and warranty claims — many fabrication shops in the region skip it or charge extra for it. We include it as standard.",
                  "نحن نوثق كل مشروع بالطريقة التي يتوقعها مقاولو الهندسة والشراء والتشييد (EPC) أو مشغلو النفط والغاز. هذا التوثيق الورقي ضروري لأعمال التدقيق، التشغيل التجريبي، ومطالبات الضمان — العديد من ورش التصنيع في المنطقة تتجاهلها أو تفرض رسوماً إضافية عليها. نحن نقدمها كمعيار قياسي."
                )}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '10px' }}>
                {[
                  { en: 'ISO 9001:2015 certified facility, audited regularly by oil and gas authorities', ar: 'منشأة معتمدة بشهادة ISO 9001:2015، وتخضع لتدقيق دوري من سلطات النفط والغاز' },
                  { en: 'AWS D1.1 compliant structural welding', ar: 'لحام هياكل متوافق مع معايير الجمعية الأمريكية للحام AWS D1.1' },
                  { en: 'ASME Section IX qualified welding procedures', ar: 'إجراءات لحام مؤهلة وفقاً لمعايير ASME القسم التاسع' },
                  { en: 'Saudi Aramco approved vendor status (#10119021)', ar: 'حالة مورد معتمد ومسجل لدى أرامكو السعودية بالرمز #10119021' },
                  { en: 'Full documentation: Mill Test Certificates (MTCs), WPS, WQR, and NDT reports (Radiography, UT, MPI, PT)', ar: 'توثيق كامل: شهادات اختبار المواد (MTC)، مواصفات إجراءات اللحام (WPS)، سجلات تأهيل اللحامين (WQR)، وتقارير NDT' }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '10px', fontSize: '13.5px', color: 'var(--gray-600)', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--orange)', fontWeight: 'bold', lineHeight: 1 }}>✓</span>
                    <span>{t(item.en, item.ar)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Image */}
            <div className="reveal-section">
              <div className="about-photo fill" style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
                <img 
                  src="/Picture21.jpg" 
                  alt="ASME piping spool fabrication and quality control checking in NexGen Dammam fabrication shop" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '380px' }} 
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section why-section" style={{ padding: '90px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 48px' }}>
            <div className="section-label" style={{ display: 'inline-flex', color: 'var(--orange-light)' }}>{t('Why Us', 'لماذا تختارنا')}</div>
            <h2 className="section-title" style={{ marginTop: '12px', color: 'white' }} dangerouslySetInnerHTML={{ __html: t('Why Choose NexGen\'s <span>Fabrication Shop</span>', 'لماذا تختار ورشة <span>تصنيع نكست جن بيلد</span>') }}></h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            
            {/* One Shop */}
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '32px' }} className="reveal-card">
              <div style={{ fontSize: '28px', marginBottom: '16px' }}>⚙️</div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'white', margin: '0 0 12px 0' }}>
                {t('One shop, four disciplines', 'منشأة واحدة، أربعة تخصصات')}
              </h3>
              <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.65', margin: 0 }}>
                {t(
                  'Structural steel, piping, vessels, and machining run under one QA/QC system, so you get one point of contact instead of four subcontractors.',
                  'يعمل الفولاذ الهيكلي، الأنابيب، الأوعية، والتشغيل الآلي تحت نظام جودة موحد، مما يوفر نقطة اتصال واحدة للعميل بدلاً من أربعة مقاولين فرعيين.'
                )}
              </p>
            </div>

            {/* Certified Capacity */}
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '32px' }} className="reveal-card">
              <div style={{ fontSize: '28px', marginBottom: '16px' }}>📜</div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'white', margin: '0 0 12px 0' }}>
                {t('Certified capacity, not just claims', 'قدرة معتمدة، وليست مجرد ادعاءات')}
              </h3>
              <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.65', margin: 0 }}>
                {t(
                  'ASME, AWS, AISC, and ISO 9001 credentials back every quote, backed by a sub-1% weld rejection rate you can verify against our NDT reports.',
                  'تدعم اعتمادات ASME, AWS, AISC, ISO 9001 كل عرض سعر، مع معدل رفض لحام أقل من 1٪ يمكن التحقق منه مباشرة من سجلات الاختبارات غير الإتلافية.'
                )}
              </p>
            </div>

            {/* Approved Vendor */}
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '32px' }} className="reveal-card">
              <div style={{ fontSize: '28px', marginBottom: '16px' }}>💼</div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'white', margin: '0 0 12px 0' }}>
                {t('Approved vendor status', 'حالة مورد معتمد ومسجل')}
              </h3>
              <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.65', margin: 0 }}>
                {t(
                  'Saudi Aramco Vendor #10119021 and Saudi Energy SAP Ariba registration mean we already meet the Kingdom\'s toughest procurement checks.',
                  'رمز مورد أرامكو السعودية #10119021 والتسجيل في SAP Ariba يعني أننا متوافقون تماماً مع متطلبات المشتريات الأكثر صرامة في المملكة.'
                )}
              </p>
            </div>

            {/* Serving Eastern Province */}
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '32px' }} className="reveal-card">
              <div style={{ fontSize: '28px', marginBottom: '16px' }}>📍</div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'white', margin: '0 0 12px 0' }}>
                {t('Serving the Eastern Province', 'نخدم المنطقة الشرقية بأكملها')}
              </h3>
              <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.65', margin: 0 }}>
                {t(
                  'We fabricate for projects across Dammam, Jubail, Al Khobar, and Ras Tanura, with logistics built for oil and gas site delivery.',
                  'نصنع للمشاريع في الدمام، الجبيل، الخبر، ورأس تنورة، مع دعم لوجستي متكامل لضمان التسليم الآمن في مواقع العمل للنفط والغاز.'
                )}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="section" style={{ background: 'var(--cream)', padding: '90px 0', borderTop: '1px solid var(--gray-200)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="section-label" style={{ display: 'inline-flex' }}>{t('FAQ', 'الأسئلة الشائعة')}</div>
            <h2 className="section-title" style={{ marginTop: '12px' }} dangerouslySetInnerHTML={{ __html: t('Frequently Asked <span>Questions</span>', 'الأسئلة <span>الشائعة حول ورشة التصنيع</span>') }}></h2>
          </div>

          <Accordion items={FAB_FAQS} />
        </div>
      </section>

      {/* CLOSING CTA SECTION */}
      <section className="section" style={{ background: 'var(--navy)', color: 'white', padding: '90px 0', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="section-title" style={{ color: 'white' }} dangerouslySetInnerHTML={{ __html: t('Get a <span>Fabrication Quote</span>', 'احصل على <span>تسعير وتكلفة التصنيع</span>') }}></h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '16.5px', marginTop: '16px', marginBottom: '36px', lineHeight: 1.7 }}>
              {t(
                'Send us your drawings and specifications, and our engineering team will confirm feasibility, timeline, and cost within one business day.',
                'أرسل لنا مخططاتك الفنية ومواصفات المشروع، وسيقوم فريقنا الهندسي بدراسة الجدوى والجدول الزمني والتكلفة والرد عليك خلال يوم عمل واحد.'
              )}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/contact" style={{ display: 'inline-block', padding: '16px 36px', fontSize: '16px', fontWeight: 700, background: 'var(--orange)', color: 'white', textDecoration: 'none', borderRadius: '8px', boxShadow: 'var(--shadow-md)', transition: 'all 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                {t('Request a Quote', 'اطلب عرض سعر')}
              </Link>
              <Link href="/contact" style={{ display: 'inline-block', padding: '16px 36px', fontSize: '16px', fontWeight: 700, border: '2px solid white', color: 'white', textDecoration: 'none', borderRadius: '8px', transition: 'all 0.3s ease' }} onMouseOver={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'var(--navy)'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'white'; }}>
                {t('Schedule a Workshop Visit', 'جدول زيارة لورشة العمل')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

const FAB_FAQS = [
  {
    qEn: "What does a fabrication shop do?",
    qAr: "ماذا تفعل ورشة التصنيع؟",
    aEn: "A fabrication shop cuts, bends, welds, and assembles raw metal into finished components — structural steel, piping spools, tanks, and machined parts — built from engineering drawings to project specifications.",
    aAr: "تقوم ورشة التصنيع بقطع وثني ولحام وتجميع المعادن الخام وتحويلها إلى مكونات نهائية — هياكل فولاذية، وصلات أنابيب، خزانات، وأجزاء تشغيل آلي — مبنية من الرسومات الهندسية إلى مواصفات المشروع."
  },
  {
    qEn: "Is NexGen's fabrication shop Aramco-approved?",
    qAr: "هل ورشة تصنيع نكست جن معتمدة من أرامكو؟",
    aEn: "Yes. NexGen holds Saudi Aramco Vendor #10119021 status and is a registered Saudi Energy supplier on SAP Ariba.",
    aAr: "نعم. تمتلك نكست جن حالة مورد معتمد لدى أرامكو السعودية بالرمز #10119021 وهي مورد مسجل لدى الطاقة السعودية في SAP Ariba."
  },
  {
    qEn: "What welding codes does NexGen follow?",
    qAr: "ما هي أكواد اللحام التي تتبعها نكست جن؟",
    aEn: "We weld to AWS D1.1 for structural work and ASME Section IX for pressure piping and vessels, using FCAW, SMAW, GTAW, and GMAW processes.",
    aAr: "نقوم باللحام وفقاً لـ AWS D1.1 للأعمال الهيكلية و ASME القسم التاسع لأنابيب وأوعية الضغط، باستخدام عمليات FCAW و SMAW و GTAW و GMAW."
  },
  {
    qEn: "Can NexGen fabricate ASME-code piping spools?",
    qAr: "هل يمكن لنكست جن تصنيع وصلات أنابيب مطابقة لكود ASME؟",
    aEn: "Yes. We manufacture piping spools, manifolds, and header connections to ASME B31.1 and B31.3, with full material traceability.",
    aAr: "نعم. نصنع وصلات الأنابيب، المشعبات، ووصلات الرؤوس وفقاً لـ ASME B31.1 و B31.3، مع تتبع كامل وموثق للمواد."
  },
  {
    qEn: "Where is the fabrication shop located?",
    qAr: "أين تقع ورشة التصنيع؟",
    aEn: "Our main fabrication shop is in Dammam, Saudi Arabia, serving the Eastern Province including Jubail, Al Khobar, and Ras Tanura.",
    aAr: "تقع ورشة التصنيع الرئيسية لدينا في الدمام، المملكة العربية السعودية، ونخدم المنطقة الشرقية بما في ذلك الجبيل، الخبر، ورأس تنورة."
  },
  {
    qEn: "What is NexGen's weld rejection rate?",
    qAr: "ما هو معدل رفض اللحام في نكست جن؟",
    aEn: "Below 1%, verified through NDT testing including Radiography, UT, MPI, and Dye Penetrant methods.",
    aAr: "أقل من 1٪، ويتم التحقق منه من خلال اختبارات NDT بما في ذلك التصوير بالأشعة، والموجات فوق الصوتية، واختبار الجسيمات المغناطيسية PT."
  }
];
