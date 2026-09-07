'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Counter } from '@/components/Counter';
import { InteractiveGrid } from '@/components/InteractiveGrid';
import { Accordion } from '@/components/Accordion';

interface ServiceDetail {
  id: string;
  labelEn: string;
  labelAr: string;
  icon: string;
  titleEn: string;
  titleAr: string;
  overviewEn: string;
  overviewAr: string;
  statsEn: { label: string; val: string }[];
  statsAr: { label: string; val: string }[];
  comparisonEn?: { headers: string[]; rows: string[][] };
  comparisonAr?: { headers: string[]; rows: string[][] };
  subServicesEn: { title: string; desc: string }[];
  subServicesAr: { title: string; desc: string }[];
  processEn: { step: string; desc: string }[];
  processAr: { step: string; desc: string }[];
  materialsEn?: { headers: string[]; rows: string[][] };
  materialsAr?: { headers: string[]; rows: string[][] };
  specsEn: { label: string; val: string }[];
  specsAr: { label: string; val: string }[];
  pricingEn: { model: string; costs: string[] };
  pricingAr: { model: string; costs: string[] };
  qaEn: string[];
  qaAr: string[];
  whenEn: string[];
  whenAr: string[];
  images: { url: string; captionEn: string; captionAr: string }[];
}

const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'laser-cutting',
    labelEn: 'CNC Laser Cutting',
    labelAr: 'قطع ليزر CNC',
    icon: '🔆',
    titleEn: 'CNC Fiber Laser Cutting: Precision at Micron-Level',
    titleAr: 'القطع بليزر الألياف CNC: الدقة على مستوى الميكرون',
    overviewEn: 'We deliver high-precision metal cutting using advanced fiber laser technology. Our laser systems cut steel, stainless steel, aluminum, and other metals with extraordinary accuracy—perfect for architectural panels, industrial components, decorative elements, and specialized applications requiring precision tolerances.',
    overviewAr: 'نحن نقدم خدمات قطع المعادن عالية الدقة باستخدام تقنية ليزر الألياف المتقدمة. تقطع أنظمتنا الفولاذ والستانلس ستيل والألمنيوم والمعادن الأخرى بدقة استثنائية — ممتازة للألواح المعمارية والمكونات الصناعية والعناصر الزخرفية والتطبيقات المتخصصة التي تتطلب تفاوتات دقيقة.',
    statsEn: [
      { label: 'Accuracy', val: '±0.05mm (micron-level)' },
      { label: 'Materials', val: 'Steel, Stainless, Aluminum, Brass, Copper' },
      { label: 'Lead Time', val: '2-5 days typical' },
      { label: 'Availability', val: '24/7 emergency dispatch' }
    ],
    statsAr: [
      { label: 'الدقة', val: '±0.05 مم (مستوى الميكرون)' },
      { label: 'المواد', val: 'الفولاذ، الستانلس، الألمنيوم، النحاس، سبائك أخرى' },
      { label: 'مدة الإنجاز', val: '2-5 أيام نموذجية' },
      { label: 'التوفر', val: 'طوارئ 24/7' }
    ],
    comparisonEn: {
      headers: ['Factor', 'Fiber Laser', 'Oxy-Fuel', 'Plasma'],
      rows: [
        ['Accuracy', '±0.05mm', '±2mm', '±1mm'],
        ['Edge Quality', 'Smooth', 'Rough', 'Rough'],
        ['Speed', 'Fast', 'Slow', 'Medium'],
        ['Material Range', 'All metals', 'Steel/iron only', 'Conductive only'],
        ['Waste', 'Minimal', 'Significant', 'High']
      ]
    },
    comparisonAr: {
      headers: ['العامل', 'ليزر الألياف', 'الأكسجين والوقود', 'البلازما'],
      rows: [
        ['الدقة', '±0.05 مم', '±2 مم', '±1 مم'],
        ['جودة الحواف', 'ناعمة', 'خشنة', 'خشنة'],
        ['السرعة', 'سريعة', 'بطيئة', 'متوسطة'],
        ['نطاق المواد', 'جميع المعادن', 'الصلب والحديد فقط', 'الموصلة فقط'],
        ['الهدر', 'أدنى حد', 'كبير', 'مرتفع']
      ]
    },
    subServicesEn: [
      { title: 'Precision Component Cutting', desc: 'Industrial brackets, supports, connection plates, manifolds, valve bodies, and pipe fittings designed with tolerances of ±0.05mm.' },
      { title: 'Architectural & Aesthetic Cutting', desc: 'Decorative screens, geometric wall features, perforated cladding, shading elements, and custom metal signage.' },
      { title: 'Industrial Manufacturing', desc: 'Enclosure panels, equipment guards, shields, ventilation grilles, cable trays, and custom hardware assemblies.' },
      { title: 'Sheet Metal Blanking', desc: 'High-yield component nests that minimize raw material waste by 15-30% compared to traditional shears.' },
      { title: 'Engraving & Surface Marking', desc: 'Permanent etching of serial numbers, compliance codes, and branding logos directly onto parts.' }
    ],
    subServicesAr: [
      { title: 'قطع المكونات الدقيقة', desc: 'الكتائف الصناعية والدعامات وألواح التوصيل وموزعات الصمامات وأنابيب التوصيل المصممة بتفاوتات دقيقة ±0.05 مم.' },
      { title: 'القطع المعماري والجمالي', desc: 'الشاشات المزخرفة والجدران الهندسية والكسوات المثقبة وعناصر التظليل ولوحات المعالم المخصصة.' },
      { title: 'التصنيع الصناعي', desc: 'ألواح الحاويات وأغطية حماية المعدات والدروع وفتحات التهوية وحوامل الكابلات والمكونات المعدنية الخاصة.' },
      { title: 'تقطيع الألواح المعدنية', desc: 'تجميع ذكي للمكونات يقلل هدر المواد بنسبة 15-30٪ مقارنة بطرق القص التقليدية.' },
      { title: 'النقش ووسم الأسطح', desc: 'نقش دائم للأرقام التسلسلية وأكواد الامتثال والشعارات على الأجزاء المعدنية مباشرة.' }
    ],
    processEn: [
      { step: 'Step 1: Design Review (1-2 hours)', desc: 'CAD files or tech drawings are checked for dimensions, materials, and tolerances.' },
      { step: 'Step 2: Nesting Program (2-4 hours)', desc: 'Cutting paths are optimized using nesting software to maximize material utilization.' },
      { step: 'Step 3: Setup & Alignment (30 min)', desc: 'Sheet metal is loaded onto the laser bed, leveled, and safety protocols verified.' },
      { step: 'Step 4: Test Cutting (15 min)', desc: 'A pilot cut is performed to verify dimensional tolerance and clean edge profile.' },
      { step: 'Step 5: Automated Production', desc: 'High-speed fiber laser cuts the batch under monitored software control.' },
      { step: 'Step 6: Quality Inspection (1-2 hours)', desc: 'Every component is measured against design prints and edge quality is certified.' },
      { step: 'Step 7: Deburring & Delivery', desc: 'Parts are cleaned, deburred, packed, and delivered with QC compliance sheets.' }
    ],
    processAr: [
      { step: 'الخطوة 1: مراجعة التصميم (1-2 ساعة)', desc: 'فحص ملفات CAD أو الرسومات الفنية للتحقق من الأبعاد والمواد والتفاوتات المطلوبة.' },
      { step: 'الخطوة 2: برنامج التجميع (2-4 ساعات)', desc: 'تحسين مسارات القطع باستخدام برنامج التعشيش الرقمي لزيادة استغلال المواد وتقليل الهدر.' },
      { step: 'الخطوة 3: التجهيز والمحاذاة (30 دقيقة)', desc: 'تحميل الألواح المعدنية على سرير الليزر، وضبط المستويات والتحقق من أنظمة السلامة.' },
      { step: 'الخطوة 4: القطع التجريبي (15 دقيقة)', desc: 'إجراء قطع تجريبي للتحقق من أبعاد التفاوت وجودة حواف القطع.' },
      { step: 'الخطوة 5: الإنتاج الآلي', desc: 'يقوم ليزر الألياف عالي السرعة بقطع الدفعة تحت مراقبة وتحكم برمجي كامل.' },
      { step: 'الخطوة 6: فحص الجودة (1-2 ساعة)', desc: 'قياس كل قطعة منتجة بدقة مقابل الرسومات الهندسية واعتماد جودة الحواف.' },
      { step: 'الخطوة 7: التنعيم والتسليم', desc: 'تنعيم حواف القطع من النتوءات، وتنظيفها، وتعبئتها وشحنها مع شهادة مطابقة الجودة.' }
    ],
    materialsEn: {
      headers: ['Material Class', 'Thickness Range', 'Typical Lead Time', 'Cost Factor'],
      rows: [
        ['Mild Steel', '0.5mm - 25mm', '2-3 Days', 'Standard'],
        ['Stainless Steel', '0.5mm - 20mm', '3-4 Days', '20-40% Premium'],
        ['Aluminum', '0.5mm - 15mm', '2-3 Days', '15-30% Premium'],
        ['Brass & Copper', '0.5mm - 10mm', '3-5 Days', 'High Material Cost'],
        ['Specialty Alloys (Titanium)', 'Consultation Required', '3-7 Days', 'Variable Premium']
      ]
    },
    materialsAr: {
      headers: ['فئة المادة', 'نطاق السماكة', 'مدة الإنجاز النموذجية', 'مستوى التكلفة'],
      rows: [
        ['الصلب الكربوني (الأسود)', '0.5 مم - 25 مم', '2-3 أيام', 'قياسي'],
        ['الستانلس ستيل', '0.5 مم - 20 مم', '3-4 أيام', '20-40٪ إضافي'],
        ['الألمنيوم', '0.5 مم - 15 مم', '2-3 أيام', '15-30٪ إضافي'],
        ['النحاس الأصفر والأحمر', '0.5 مم - 10 مم', '3-5 أيام', 'تكلفة مواد مرتفعة'],
        ['سبائك خاصة (تيتانيوم)', 'تتطلب استشارة', '3-7 أيام', 'إضافي متغير']
      ]
    },
    specsEn: [
      { label: 'Cutting Tolerance', val: '±0.05mm precision' },
      { label: 'Maximum Bed Area', val: '3,000mm × 1,500mm' },
      { label: 'Max Load Capacity', val: '500 kg' },
      { label: 'Surface Finish (Ra)', val: '0.8 - 2.0 µm' }
    ],
    specsAr: [
      { label: 'تفاوت القطع', val: 'دقة تبلغ ±0.05 مم' },
      { label: 'الحد الأقصى لسرير القطع', val: '3,000 مم × 1,500 مم' },
      { label: 'أقصى سعة حمل للسرير', val: '500 كجم' },
      { label: 'تشطيب الأسطح (Ra)', val: '0.8 - 2.0 ميكرومتر' }
    ],
    pricingEn: {
      model: 'Calculated dynamically based on cutting length, thickness, material market index, and batch size. Large production runs (100+ units) receive significant volume discounts.',
      costs: [
        'Mild steel brackets: $50 - $150 each',
        'Complex stainless plates: $150 - $500 each',
        'Precision architectural panels: $200 - $1,000+ each'
      ]
    },
    pricingAr: {
      model: 'يتم احتسابها ديناميكياً بناءً على طول القطع، وسماكة اللوح، ونوع المادة، وحجم الدفعة. الدفعات الكبيرة (أكثر من 100 وحدة) تحصل على خصومات كبيرة.',
      costs: [
        'كتائف الفولاذ الكربوني: 50$ - 150$ للقطعة',
        'ألواح الستانلس المعقدة: 150$ - 500$ للقطعة',
        'أجهزة وألواح معمارية دقيقة: 200$ - 1,000$+ للقطعة'
      ]
    },
    qaEn: [
      'Real-time automated head calibration',
      'Optical path checks every shift',
      'Digital micro-caliper post-cut verification',
      'Edge clean profile confirmation'
    ],
    qaAr: [
      'معايرة رأس الليزر تلقائياً في الوقت الحقيقي',
      'فحص المسارات البصرية في كل نوبة عمل',
      'التحقق من الأبعاد باستخدام ميكروميتر رقمي بعد القطع',
      'تأكيد خلو الحواف من العيوب والنتوءات'
    ],
    whenEn: [
      'Precision mechanical parts require exact tolerances',
      'Complex shapes or nested sheet parts must be produced',
      'Architectural decorative screens require clean cuts',
      'Fast project turnarounds are needed with minimum waste'
    ],
    whenAr: [
      'عند الحاجة لقطع أجزاء ميكانيكية دقيقة بتفاوتات ضيقة',
      'عند الحاجة لتصنيع أشكال هندسية معقدة بأدنى حد من الهدر',
      'عند الحاجة لشاشات وقواطع معمارية مزخرفة ونظيفة',
      'عند الحاجة لتسليمات سريعة جداً للمشاريع المعدنية'
    ],
    images: [
      { url: '/Picture12.jpg', captionEn: 'Precision Laser Cutting Bed', captionAr: 'سرير القطع بالليزر عالي الدقة' },
      { url: '/Picture17.jpg', captionEn: 'Fiber Laser Calibration', captionAr: 'معايرة ليزر الألياف' },
      { url: '/Picture24.jpg', captionEn: 'Dammam Cutting Facility', captionAr: 'منشأة القطع بالدمام' }
    ]
  },
  {
    id: 'machining',
    labelEn: 'CNC Machining',
    labelAr: 'التشغيل الآلي CNC',
    icon: '⚙️',
    titleEn: 'CNC & Manual Machining: High-Precision Component Manufacturing',
    titleAr: 'التشغيل الآلي CNC واليدوي: تصنيع مكونات عالية الدقة',
    overviewEn: 'We machine precision components from metal stock using CNC machining centers and manual machine tools. Our machinists deliver tight tolerances, complex geometries, and superior surface finishes for critical applications in oil & gas, industrial, and manufacturing sectors.',
    overviewAr: 'نقوم بتشغيل المكونات المعدنية بدقة عالية باستخدام مراكز CNC المتطورة وآلات الخراطة والفرز اليدوية. يقدم فنيونا تفاوتات ضيقة وأشكالاً هندسية معقدة وتشطيبات أسطح متميزة للتطبيقات الحيوية في قطاعات النفط والغاز والصناعة والتصنيع.',
    statsEn: [
      { label: 'CNC Axis Option', val: '3-axis standard & 5-axis available' },
      { label: 'Tolerances', val: '±0.03mm (high-precision limit)' },
      { label: 'Surface Finish', val: 'Ra 0.8 - 3.2 µm typical' },
      { label: 'Capabilities', val: 'Milling, Turning, Boring, Threading' }
    ],
    statsAr: [
      { label: 'خيارات محاور CNC', val: '3 محاور قياسي ويتوفر 5 محاور' },
      { label: 'مستوى التفاوتات', val: '±0.03 مم (حد الدقة الفائقة)' },
      { label: 'تشطيب الأسطح', val: 'نموذجياً Ra 0.8 - 3.2 ميكرومتر' },
      { label: 'القدرات والعمليات', val: 'فرز، خراطة، ثقب، تسنين' }
    ],
    materialsEn: {
      headers: ['Material', 'Machinability', 'Best For', 'Standard Tolerance'],
      rows: [
        ['Mild Steel', 'Excellent', 'Heavy machinery, brackets, structural fittings', '±0.05mm'],
        ['Stainless Steel', 'Good', 'Corrosion-resistant components, marine joints', '±0.05mm'],
        ['Aluminum', 'Excellent', 'Lightweight mounts, housings, brackets', '±0.03mm'],
        ['Brass', 'Excellent', 'Valves, bushings, fittings, decorative', '±0.05mm'],
        ['Cast Iron', 'Good', 'Engine blocks, heavy housings, wear plates', '±0.10mm'],
        ['Titanium', 'Fair', 'High-strength joints, extreme environments', '±0.05mm']
      ]
    },
    materialsAr: {
      headers: ['المادة', 'سهولة التشغيل', 'الأفضل للاستخدام في', 'التفاوت القياسي'],
      rows: [
        ['الصلب الكربوني', 'ممتازة', 'الآلات الثقيلة، الكتائف، الوصلات الهيكلية', '±0.05 مم'],
        ['الستانلس ستيل', 'جيدة', 'مكونات مقاومة للتآكل، المفاصل البحرية', '±0.05 مم'],
        ['الألمنيوم', 'ممتازة', 'التركيبات خفيفة الوزن، علب التروس، الحوامل', '±0.03 مم'],
        ['النحاس الأصفر', 'ممتازة', 'الصمامات، الجلب، الوصلات، القطع الزخرفية', '±0.05 مم'],
        ['الحديد الزهر', 'جيدة', 'كتل المحركات، الهياكل الثقيلة، ألواح التآكل', '±0.10 مم'],
        ['التيتانيوم', 'مقبولة', 'الوصلات عالية القوة، البيئات القاسية', '±0.05 مم']
      ]
    },
    subServicesEn: [
      { title: 'CNC Milling', desc: 'Complex 3D features, pockets, slots, internal profiles, and precision housings using multi-axis mills.' },
      { title: 'CNC Turning (Lathe Work)', desc: 'High-accuracy shafts, spindles, bushings, coupling elements, flanges, and custom threaded fittings.' },
      { title: '5-Axis Simultaneous Machining', desc: 'Allows complete machining of intricate parts in a single setup, reducing touch-points and positioning errors.' },
      { title: 'Manual Machining Rework', desc: 'Skilled machinists handling emergency repairs, tooling reconditioning, and custom modification of existing parts.' }
    ],
    subServicesAr: [
      { title: 'الفرز الرقمي CNC Milling', desc: 'تشكيل أسطح ثلاثية الأبعاد معقدة، التجاويف، المجاري، والعلب الدقيقة باستخدام فارزات متعددة المحاور.' },
      { title: 'الخراطة الرقمية CNC Turning', desc: 'تصنيع المحاور، المغازل، الجلب، عناصر التوصيل، الفلنجات، والوصلات الملولبة بدقة متناهية.' },
      { title: 'التشغيل خماسي المحاور 5-Axis', desc: 'يسمح بتشغيل الأجزاء بالغة التعقيد في إعداد واحد، مما يقلل نقاط اللمس وأخطاء المحاذاة.' },
      { title: 'إعادة التشغيل اليدوي Rework', desc: 'فنيو خراطة مهرة يتعاملون مع إصلاحات الطوارئ، وتعديل القطع الحالية وتجديد العدة.' }
    ],
    processEn: [
      { step: 'Step 1: File Verification (1-2 hours)', desc: 'CAD file is checked in CAM software to trace coordinates and tool movements.' },
      { step: 'Step 2: Tool Path Coding (2-6 hours)', desc: 'Cutting speeds, feed rates, and tool changes are programmed and simulated.' },
      { step: 'Step 3: Setup & Calibrate (1-2 hours)', desc: 'Raw stock is mounted in fixtures, tools loaded in spindle, and offsets dialed in.' },
      { step: 'Step 4: Pilot Inspection (1 hour)', desc: 'A first-article part is machined, measured, and verified before running the batch.' },
      { step: 'Step 5: Full Run Production', desc: 'CNC center executes automatic tool passes with flood cooling active.' },
      { step: 'Step 6: Quality Lab Verification', desc: 'Critical features undergo coordinate measuring machine (CMM) dimensional checks.' },
      { step: 'Step 7: Wash & Package', desc: 'Cutting fluid is washed, parts deburred, dried, and packed with inspection logs.' }
    ],
    processAr: [
      { step: 'الخطوة 1: التحقق من الملفات (1-2 ساعة)', desc: 'مراجعة ملف CAD في برنامج CAM لتحديد الإحداثيات ومسارات العدة بدقة.' },
      { step: 'الخطوة 2: برمجة مسارات العدة (2-6 ساعات)', desc: 'برمجة سرعات القطع، معدلات التغذية، وتغيير العدد، ومحاكاة العملية رقمياً.' },
      { step: 'الخطوة 3: الإعداد والمعايرة (1-2 ساعة)', desc: 'تثبيت المادة الخام في الملزمة، تحميل العدد في المغزل، وضبط إحداثيات الصفر.' },
      { step: 'الخطوة 4: فحص العينة الأولى (1 ساعة)', desc: 'تشغيل قطعة أولى وفحص أبعادها وتفاصيلها بالكامل قبل بدء تشغيل الدفعة.' },
      { step: 'الخطوة 5: إنتاج الدفعة الكاملة', desc: 'يقوم مركز CNC بتنفيذ عمليات القطع تلقائياً مع تشغيل سائل التبريد المستمر.' },
      { step: 'الخطوة 6: فحص الجودة في المختبر', desc: 'إجراء فحص أبعاد للميزات الحرجة باستخدام جهاز قياس الإحداثيات (CMM).' },
      { step: 'الخطوة 7: الغسيل والتعبئة والتغليف', desc: 'تنظيف سائل التبريد، إزالة الزوائد والنتوءات، تجفيف القطع وتعبئتها مع سجلات الفحص.' }
    ],
    specsEn: [
      { label: 'Turning Limits', val: 'Up to 300mm diameter, 500mm length' },
      { label: 'Milling Envelope', val: 'Up to 1,000mm × 500mm travel area' },
      { label: 'Accuracy Standard', val: 'ISO 2768-m (medium) to fine' },
      { label: 'Equipment Base', val: 'Vertical Machining Centers & Precision Lathes' }
    ],
    specsAr: [
      { label: 'حدود الخراطة', val: 'قطر يصل إلى 300 مم، طول 500 مم' },
      { label: 'ظرف الفرز', val: 'مساحة حركة تصل إلى 1,000 مم × 500 مم' },
      { label: 'معيار الدقة', val: 'من ISO 2768-m (متوسط) إلى دقيق جداً' },
      { label: 'أسطول المعدات', val: 'مراكز تشغيل رأسية ومخارط دقيقة' }
    ],
    pricingEn: {
      model: 'Priced based on machine setup hours, tool wear profiles, raw material costs, and inspection complexity. Small run batches (5-20 units) receive introductory setup discounts.',
      costs: [
        'Simple turned pins/bushings: $100 - $300 per batch',
        'Medium complexity milled mounts: $300 - $800 each',
        'Intricate multi-axis pump housings: $1,000 - $5,000+ each'
      ]
    },
    pricingAr: {
      model: 'يتم احتساب السعر بناءً على ساعات إعداد الماكينة، تآكل العدد، نوع المادة الخام، وتعقيد عملية الفحص. الدفعات الصغيرة (5-20 وحدة) تحصل على تخفيضات في إعداد الماكينات.',
      costs: [
        'المحاور/الجلب البسيطة: 100$ - 300$ للدفعة',
        'حوامل الفرز متوسطة التعقيد: 300$ - 800$ للقطعة',
        'أغطية مضخات معقدة متعددة المحاور: 1,000$ - 5,000$+ للقطعة'
      ]
    },
    qaEn: [
      'In-process probe measurements',
      'Mitutoyo micrometer cross-checking',
      'Calibration of spindles and tool holding alignment',
      'Surface roughness tester verification'
    ],
    qaAr: [
      'قياسات فحص أبعاد أثناء عملية التشغيل',
      'فحص متبادل باستخدام ميكرومترات ميتوتويو الدقيقة',
      'معايرة دورية للمغازل ومحاذاة حامل العدة',
      'التحقق من خشونة السطح بجهاز قياس الخشونة المتخصص'
    ],
    whenEn: [
      'Rotational parts require tight tolerances and high finishes',
      'Castings require custom secondary machining (flange holes, bores)',
      'Legacy equipment components are worn out and require replacement',
      'High-strength structural brackets must be carved from solid blocks'
    ],
    whenAr: [
      'عند الحاجة لقطع دورانية تتطلب تفاوتات ضيقة وتشطيباً فائقاً',
      'عند الحاجة لتشغيل ثانوي للمسبوكات (ثقوب الفلنجات، التجويف الداخلي)',
      'عند الحاجة لاستبدال مكونات الآلات القديمة التي تآكلت',
      'عند الحاجة لنحت حوامل هيكلية عالية القوة من كتل معدنية صلبة'
    ],
    images: [
      { url: '/Picture13.jpg', captionEn: 'CNC Lathe Metal Turning', captionAr: 'خراطة المعادن بآلة الخراطة CNC' },
      { url: '/Picture22.jpg', captionEn: 'Jubail Machining Center', captionAr: 'مركز تشغيل المعادن بالجبيل' },
      { url: '/Picture17.jpg', captionEn: 'Precision Quality Inspection', captionAr: 'فحص الجودة الدقيق للمكونات' }
    ]
  },
  {
    id: 'welding',
    labelEn: 'Welding Services',
    labelAr: 'خدمات اللحام',
    icon: '🔥',
    titleEn: 'AWS Certified Welding: Industrial-Grade Joint Solutions',
    titleAr: 'لحام معتمد من جمعية AWS: حلول ربط صناعية متينة',
    overviewEn: 'Our AWS-certified welders deliver structural and pressure vessel welds meeting international standards. We specialize in pipe welding, structural assembly, and pressure system connections with <1% rejection rate and complete documentation for every weld.',
    overviewAr: 'يقدم لحامونا المعتمدون من جمعية AWS لحامات عالية الجودة للهياكل وأوعية الضغط متوافقة مع المعايير الدولية. نتخصص في لحام الأنابيب، التجميعات الهيكلية، ووصلات الضغط العالي مع معدل رفض أقل من 1٪ وتوثيق كامل لكل لحام.',
    statsEn: [
      { label: 'Rejection Rate', val: '<1% (exceeding industry standards)' },
      { label: 'Welder Certs', val: 'AWS D1.1 (Structural) & D1.4 (Piping)' },
      { label: 'Processes Used', val: 'GTAW (TIG), GMAW (MIG), FCAW, SMAW, SAW' },
      { label: 'Compliance Standards', val: 'ASME Section IX, API 1104, SBC Codes' }
    ],
    statsAr: [
      { label: 'معدل الرفض', val: 'أقل من 1٪ (يتجاوز معايير الصناعة)' },
      { label: 'شهادات اللحامين', val: 'AWS D1.1 (للهياكل) و D1.4 (للأنابيب)' },
      { label: 'العمليات المستخدمة', val: 'TIG, MIG, FCAW, SMAW, SAW' },
      { label: 'معايير المطابقة', val: 'ASME Section IX, API 1104, كود البناء السعودي' }
    ],
    subServicesEn: [
      { title: 'GTAW / TIG Welding', desc: 'Superior edge quality for stainless steel process lines, thin-wall pipes, and aluminum structural frames.' },
      { title: 'GMAW / MIG & FCAW', desc: 'High-speed production welding for heavy structural carbon steel joints, beams, and columns.' },
      { title: 'SMAW / Shielded Metal Arc', desc: 'Highly portable stick welding for vertical, overhead field work, onsite modifications, and heavy plate repairs.' },
      { title: 'Submerged Arc Welding (SAW)', desc: 'Automatic deep-penetration weld runs for thick plate vessel seams and heavy cylindrical structures.' }
    ],
    subServicesAr: [
      { title: 'لحام TIG / GTAW', desc: 'جودة حواف ممتازة لخطوط الستانلس ستيل، الأنابيب رقيقة الجدران، وهياكل الألمنيوم.' },
      { title: 'لحام MIG & FCAW', desc: 'لحام إنتاج عالي السرعة لوصلات الفولاذ الهيكلي الثقيل، العوارض، والأعمدة.' },
      { title: 'لحام SMAW / القوس المعدني', desc: 'لحام القوس المعدني المحمول للأعمال الميدانية الرأسية والعلوية وتعديل الموقع وإصلاح الألواح.' },
      { title: 'اللحام بالقوس المغمور (SAW)', desc: 'لحام آلي ذو اختراق عميق للحامات السفن ذات الألواح السميكة والهياكل الأسطوانية الثقيلة.' }
    ],
    processEn: [
      { step: 'Step 1: Joint Preparation', desc: 'Beveling joints, cleaning rust/oil, preheating thick plate, and setting alignment clamps.' },
      { step: 'Step 2: Root Pass Run', desc: 'Precision welder runs the initial root pass to establish the base joint integrity.' },
      { step: 'Step 3: Slag Cleaning & Visual', desc: 'Welder cleans slag, inspects root pass for cracks/porosity before building subsequent layers.' },
      { step: 'Step 4: Multi-Layer Fill Passes', desc: 'Subsequent passes are laid to fill the groove joint, maintaining correct travel speeds.' },
      { step: 'Step 5: Cap Pass & Edge Seal', desc: 'The final cap pass seals the joint, providing a clean bead pattern.' },
      { step: 'Step 6: Non-Destructive Testing', desc: 'Joint undergoes visual, dye penetrant, ultrasonic (UT), or radiographic (RT) checks.' },
      { step: 'Step 7: Data Log Signoff', desc: 'Welder ID, WPS settings, heat lot numbers, and test reports are compiled.' }
    ],
    processAr: [
      { step: 'الخطوة 1: تحضير الوصلة', desc: 'شطف حواف المعدن، تنظيف الصدأ والزيوت، التسخين المسبق للألواح السميكة، وضبط مشابك المحاذاة.' },
      { step: 'الخطوة 2: تمرير لحام الجذور', desc: 'تنفيذ تمريرة لحام الجذر الأولى لإنشاء سلامة الوصلة الأساسية.' },
      { step: 'الخطوة 3: تنظيف خبث اللحام والفحص البصري', desc: 'إزالة الخبث وتنظيف اللحام، وفحص تمريرة الجذر للتأكد من خلوها من الشقوق أو المسام.' },
      { step: 'الخطوة 4: تمريرات الملء متعددة الطبقات', desc: 'تنفيذ تمريرات متتالية لملء تجويف الوصلة بالكامل مع الحفاظ على سرعات حركة ثابتة.' },
      { step: 'الخطوة 5: تمريرة التغطية النهائية', desc: 'تمريرة اللحام النهائية التي تغلق الوصلة بالكامل وتوفر مظهراً نظيفاً ومتناسقاً.' },
      { step: 'الخطوة 6: الاختبار غير الإتلافي (NDT)', desc: 'إخضاع الوصلة للفحص البصري، فحص صبغة التغلغل (PT)، الموجات فوق الصوتية (UT)، أو الأشعة (RT).' },
      { step: 'الخطوة 7: توثيق وتسجيل البيانات', desc: 'تجميع هوية اللحام، إعدادات WPS، أرقام تتبع الشحنات، وتقارير الاختبار الهندسي.' }
    ],
    comparisonEn: {
      headers: ['Defect Type', 'Acceptance Code Limit (ASME)', 'NexGen Target Limit'],
      rows: [
        ['Cracks', '0% Tolerance (No cracks allowed)', '0% Tolerance (Zero cracks)'],
        ['Porosity', 'Max 2% of total weld area', 'Under 0.5% (strict quality)'],
        ['Undercut Depth', 'Max 1.0mm depth', 'Under 0.5mm depth'],
        ['Slag Inclusion', 'Max 3mm length cumulative', 'Zero slag inclusions allowed']
      ]
    },
    comparisonAr: {
      headers: ['نوع العيب', 'حد القبول المعتمد (ASME)', 'مستهدف الجودة لدى نكست جن'],
      rows: [
        ['الشقوق والتصدعات', 'تحمل 0٪ (غير مسموح بها إطلاقاً)', 'تحمل 0٪ (لا توجد شقوق)'],
        ['المسامية والفجوات', 'الحد الأقصى 2٪ من إجمالي منطقة اللحام', 'أقل من 0.5٪ (جودة صارمة)'],
        ['عمق القطع السفلي', 'الحد الأقصى 1.0 مم عمق', 'أقل من 0.5 مم عمق'],
        ['شوائب الخبث', 'الحد الأقصى 3 مم تراكمي', 'غير مسموح بشوائب الخبث']
      ]
    },
    specsEn: [
      { label: 'Weld Processes', val: 'SMAW, GTAW, GMAW, FCAW, SAW' },
      { label: 'Pipe Size Range', val: '1/2" up to 48" diameter' },
      { label: 'Material Specialty', val: 'Carbon Steel, Stainless, Duplex, Aluminum' },
      { label: 'AWS Certifications', val: 'AWS D1.1, D1.4, ASME Section IX' }
    ],
    specsAr: [
      { label: 'عمليات اللحام المعتمدة', val: 'SMAW, GTAW, GMAW, FCAW, SAW' },
      { label: 'نطاق أقطار الأنابيب', val: 'من 1/2 بوصة إلى 48 بوصة' },
      { label: 'تخصص المواد', val: 'الفولاذ الكربوني، الستانلس، الدوبلكس، الألمنيوم' },
      { label: 'الاعتمادات النشطة', val: 'AWS D1.1, D1.4, ASME Section IX' }
    ],
    pricingEn: {
      model: 'Based on weld length, joint profile complexity, material metallurgy, NDT inspection specifications (radiographic/ultrasonic), and field accessibility. On-call emergency welding services are billed at standard overtime rates.',
      costs: [
        'Structural steel column joint (visual test): $80 - $200 per weld',
        'Certified high-pressure pipe weld (Radiographic tested): $150 - $400 per joint',
        'Heavy cylindrical pressure vessel seam: $400 - $1,500 per meter'
      ]
    },
    pricingAr: {
      model: 'يتم احتسابه بناءً على طول خط اللحام، نوع الوصلة، نوع المعدن، متطلبات فحص NDT (الأشعة السينية/الموجات فوق الصوتية)، وسهولة الوصول للوصلة. خدمات الطوارئ تخضع لرسوم إضافية.',
      costs: [
        'وصلات الأعمدة الهيكلية (فحص بصري): 80$ - 200$ للحام',
        'لحام الأنابيب عالي الضغط (فحص الأشعة): 150$ - 400$ للوصلة',
        'لحام خطوط أوعية الضغط الثقيلة: 400$ - 1,500$ للمتر الطولي'
      ]
    },
    qaEn: [
      'Welder qualification logs updated quarterly',
      'Digital welding gauge dimensional audits',
      'Third-party NDT (RT/UT/MPI) report matching',
      'WPS sheets maintained at every station'
    ],
    qaAr: [
      'تحديث سجلات تأهيل اللحامين كل ثلاثة أشهر',
      'عمليات تدقيق أبعاد اللحام باستخدام مقاييس رقمية',
      'مطابقة تقارير فحص NDT المستقلة (الأشعة/الموجات)',
      'الالتزام الصارم بـ ورقة مواصفات اللحام (WPS) في كل محطة'
    ],
    whenEn: [
      'Certified structural joints must comply with SBC standards',
      'High-pressure process piping loops require 100% RT clearance',
      'Corroded industrial storage tank shells require heavy patch plates',
      'Specialty process equipment components (stainless/aluminum) require clean welds'
    ],
    whenAr: [
      'عند الحاجة لوصلات هيكلية معتمدة متوافقة مع كود البناء السعودي',
      'عند الحاجة لأنابيب ضغط عالية تتطلب مطابقة فحص الأشعة بنسبة 100٪',
      'عند الحاجة لإصلاح خزانات التخزين الصناعية المتآكلة بألواح تعزيز سميكة',
      'عند الحاجة لمعدات معالجة خاصة (ستانلس/ألمنيوم) تتطلب لحامات دقيقة'
    ],
    images: [
      { url: '/Picture18.jpg', captionEn: 'AWS Certified Joint Welding', captionAr: 'لحام الوصلات المعتمد من AWS' },
      { url: '/Picture19.jpg', captionEn: 'Structural Assembly Fabrication', captionAr: 'تصنيع وتجميع الهياكل الحديدية' },
      { url: '/Picture22.jpg', captionEn: 'Jubail Welding Station', captionAr: 'محطة اللحام بمنشأة الجبيل' }
    ]
  },
  {
    id: 'leak-repair',
    labelEn: 'Online Leak Repair',
    labelAr: 'إصلاح التسرب أونلاين',
    icon: '🔒',
    titleEn: 'Online Leak Repair: Equipment Protection Without Shutdown',
    titleAr: 'إصلاح التسرب الأونلاين: حماية المعدات دون إيقاف التشغيل',
    overviewEn: 'We seal leaks on operational equipment using specialized clamp technology—eliminating expensive downtime. Immediate leak containment, pressure-rated clamps, and 24/7 technician support for critical facility maintenance.',
    overviewAr: 'نقوم بسد وإغلاق التسريبات في المعدات وخطوط الأنابيب أثناء التشغيل باستخدام تقنية المشابك المخصصة — مما يلغي تماماً التوقفات المكلفة. نوفر احتواءً فورياً للتسريب ومجموعة واسعة من المشابك المعتمدة للضغط مع دعم فني على مدار الساعة.',
    statsEn: [
      { label: 'Response Time', val: 'Technician on-site in 1-2 hours' },
      { label: 'Pressure Rating', val: 'Clamps rated up to 600 psi' },
      { label: 'Downtime Logged', val: 'Zero (process runs continuously)' },
      { label: 'Technician Support', val: '24/7 priority emergency dispatch' }
    ],
    statsAr: [
      { label: 'سرعة الاستجابة', val: 'وصول الفني للموقع خلال 1-2 ساعة' },
      { label: 'تحمل الضغط', val: 'مشابك معتمدة لتحمل ضغط حتى 600 psi' },
      { label: 'وقت التوقف', val: 'صفر (تستمر العمليات التشغيلية بالكامل)' },
      { label: 'الدعم الفني', val: 'طوارئ واستجابة سريعة على مدار الساعة 24/7' }
    ],
    comparisonEn: {
      headers: ['Operating Factor', 'Online Leak Repair', 'Traditional Shutdown Repair'],
      rows: [
        ['Process Downtime', '0 Hours (Continuous operations)', '4 - 24+ Hours (Total block shutdown)'],
        ['Production Loss', '$0 (Zero loss of output)', 'Significant ($5,000 - $50,000+ lost output)'],
        ['Material Prep', 'In-house custom clamp (1-4 hours)', 'Sourcing custom replacement pipe segments'],
        ['Waste Generation', 'Zero environmental spillage', 'Draining lines, purging gases, and waste storage']
      ]
    },
    comparisonAr: {
      headers: ['عامل التشغيل', 'إصلاح التسرب الأونلاين', 'الإصلاح التقليدي بعد إيقاف التشغيل'],
      rows: [
        ['وقت توقف العمليات', '0 ساعة (العمليات مستمرة بالكامل)', '4 - 24+ ساعة (إغلاق وتوقف كامل)'],
        ['الخسائر الإنتاجية', '0$ (لا توجد خسائر في الإنتاج)', 'كبيرة جداً (5,000$ - 50,000$+ خسائر إنتاج)'],
        ['تجهيز المواد', 'مشابك مخصصة تصنع خلال 1-4 ساعات', 'شراء خطوط أنابيب وتجهيز قطع بديلة للموقع'],
        ['توليد النفايات والهدر', 'منع كامل للتسرب والانبعاثات البيئية', 'تفريغ الخطوط وتطهير الغازات وتخزين النفايات']
      ]
    },
    subServicesEn: [
      { title: 'Pipe Leak Sealing', desc: 'Custom containment enclosures bolted over pinhole corrosion leaks, weld cracks, and line damage.' },
      { title: 'Flange Joint Repair Clamps', desc: 'Heavy-duty circular clamps with custom elastomer profiles engineered to block bolt-hole weeping and joint face separation.' },
      { title: 'Valve Gland & Stem Sealing', desc: 'Custom enclosures enclosing leaking valve packing boxes with pressurized sealant injections.' },
      { title: 'Emergency Containment Catch Trays', desc: 'Rapid fabrication of spill mitigation equipment to prevent environmental chemical discharge.' }
    ],
    subServicesAr: [
      { title: 'سد تسريبات الأنابيب', desc: 'مشابك وحاويات حصر مخصصة يتم تثبيتها بمسامير فوق فتحات التآكل وتشققات اللحام.' },
      { title: 'مشابك إصلاح وصلات الفلنجات', desc: 'مشابك دائرية شديدة التحمل مع حشوات مخصصة مصممة لمنع تسرب الفلنجات.' },
      { title: 'سد حشوات وصمامات التحكم', desc: 'حقن مواد مانعة للتسرب تحت الضغط داخل صناديق حشو الصمامات المعيبة.' },
      { title: 'صواني احتواء الطوارئ', desc: 'تصنيع سريع لمعدات التخفيف من الانسكاب لمنع التصريف البيئي للمواد الكيميائية.' }
    ],
    processEn: [
      { step: 'Step 1: Emergency Call Assessment', desc: 'Client reports pressure, temperature, pipe size, and leak medium; technician dispatches.' },
      { step: 'Step 2: On-Site Inspection', desc: 'Dimensions, ultrasonic wall thickness, and precise pressure/temperature are verified.' },
      { step: 'Step 3: Clamp Design & Fab', desc: 'Custom clamp drawings generated and fabricated in Dammam/Jubail shop (1-4 hours).' },
      { step: 'Step 4: Surface Prep & Cleaning', desc: 'Pipe around the leak zone is wire-brushed and measured for secure clamp contact.' },
      { step: 'Step 5: Enclosure Install', desc: 'Technicians position the custom enclosure clamp, and torque bolts in sequence.' },
      { step: 'Step 6: Pressurized Sealant Injection', desc: 'Specialized sealants are injected into the clamp cavity to seal the gap.' },
      { step: 'Step 7: Final Test Signoff', desc: 'Line pressure is monitored to confirm a 100% leak-free containment seal.' }
    ],
    processAr: [
      { step: 'الخطوة 1: تقييم مكالمة الطوارئ', desc: 'يبلغ العميل عن الضغط، درجة الحرارة، قطر الأنبوب، نوع المادة المتسربة، ويتحرك الفني.' },
      { step: 'الخطوة 2: الفحص في الموقع', desc: 'التحقق من الأبعاد وسماكة جدار الأنبوب بالموجات فوق الصوتية والضغط ودرجة الحرارة.' },
      { step: 'الخطوة 3: تصميم وتصنيع المشبك', desc: 'إنشاء رسومات للمشبك وتصنيعه في ورشة الدمام أو الجبيل خلال 1-4 ساعات.' },
      { step: 'الخطوة 4: تنظيف وتحضير السطح', desc: 'تنظيف الأنبوب حول منطقة التسريب باستخدام فرشاة سلكية لضمان تلامس آمن للمشبك.' },
      { step: 'الخطوة 5: تركيب حاوية المشبك', desc: 'يقوم الفنيون بتركيب مشبك الحاوية المخصص وربط البراغي بالتسلسل المعتمد.' },
      { step: 'الخطوة 6: حقن مادة السد المضغوطة', desc: 'حقن مواد سد متخصصة في تجويف المشبك لسد الفجوة ومنع التسريب.' },
      { step: 'الخطوة 7: اختبار التشغيل والاعتماد', desc: 'مراقبة ضغط الخط للتأكد من سد التسريب بالكامل بنسبة 100٪ وبأمان.' }
    ],
    specsEn: [
      { label: 'Standard Pipe Clamp Sizes', val: '1/2" up to 48" diameter' },
      { label: 'Operating Pressure Limits', val: 'Up to 300 psi standard, 600 psi high-pressure' },
      { label: 'Temperature Tolerance', val: '-40°C up to +100°C' },
      { label: 'Flange Mounted Classes', val: 'ANSI 150, 300, 600, 900 patterns' }
    ],
    specsAr: [
      { label: 'أقطار المشابك القياسية', val: 'من 1/2 بوصة إلى 48 بوصة' },
      { label: 'حدود ضغط التشغيل', val: 'حتى 300 psi قياسي، 600 psi للضغط العالي' },
      { label: 'تحمل درجات الحرارة', val: 'من -40 درجة مئوية إلى +100 درجة مئوية' },
      { label: 'فئات الفلنجات المتوافقة', val: 'أنماط ANSI 150, 300, 600, 900' }
    ],
    pricingEn: {
      model: 'Includes response mobilization, custom clamp design engineering, raw workshop steel fabrication, and field installation. A single online leak seal prevents massive shutdown losses.',
      costs: [
        'Emergency response mobilization: $200 - $500',
        'Standard clamp design and fabrication: $500 - $2,000',
        'Online field install & pressure test: $300 - $800'
      ]
    },
    pricingAr: {
      model: 'تشتمل التكلفة على رسوم الانتقال، وتصميم المشبك المخصص، والتصنيع المعدني في الورشة، والتركيب والاختبار الميداني. عملية سد واحدة توفر خسائر توقف ضخمة.',
      costs: [
        'رسوم الانتقال والاستجابة للطوارئ: 200$ - 500$',
        'تصميم وتصنيع المشبك المخصص القياسي: 500$ - 2,000$',
        'التركيب الميداني واختبار الضغط: 300$ - 800$'
      ]
    },
    qaEn: [
      'Clamps engineered to ASME Section VIII formulas',
      'Ultrasonic wall thickness verify before clamp install',
      'Pressure testing of all welds on custom enclosures',
      'Grade 8 heavy carbon bolts used for securing joints'
    ],
    qaAr: [
      'تصميم المشابك وفقاً لمعادلات ASME القسم الثامن',
      'التحقق من سماكة جدار الأنبوب بالموجات فوق الصوتية قبل تركيب المشبك',
      'اختبار الضغط لجميع اللحامات في مشابك الحصر المخصصة',
      'استخدام براغي عالية الصلابة من الدرجة 8 لتأمين الوصلات'
    ],
    whenEn: [
      'Lines are fully pressurized and shutting down will halt production',
      'Process piping has developed pinhole leaks or joint weeping',
      'Flange gaskets have degraded, causing chemical weeping',
      'Temporary leakage mitigation is required until the next turnaround'
    ],
    whenAr: [
      'عند تشغيل الخطوط بالكامل وكون إيقاف التشغيل سيوقف الإنتاج',
      'عند ظهور ثقوب صغيرة أو ترشيح في وصلات الأنابيب الصناعية',
      'عند تآكل حشوات الفلنجات مما يتسبب في ترشيح المواد الكيميائية',
      'عند الحاجة لاحتواء مؤقت للتسريب حتى موعد العمرة الدورية القادمة'
    ],
    images: [
      { url: '/Picture23.jpg', captionEn: 'Pressurized Leak Repair Clamp', captionAr: 'مشابك إصلاح التسرب تحت الضغط' },
      { url: '/Picture17.jpg', captionEn: 'Custom Clamp Fabrication', captionAr: 'تصنيع المشابك المخصصة بالورشة' },
      { url: '/Picture22.jpg', captionEn: 'Jubail Pressure Testing Lab', captionAr: 'مختبر اختبار الضغط بالجبيل' }
    ]
  },
  {
    id: 'maintenance',
    labelEn: 'Maintenance & Repair',
    labelAr: 'الصيانة والإصلاح',
    icon: '🛠️',
    titleEn: 'Industrial Maintenance & Repair: Prevent Failures Before They Happen',
    titleAr: 'الصيانة والإصلاح الصناعي: منع الأعطال قبل حدوثها',
    overviewEn: 'We maintain, inspect, and repair critical industrial equipment—preventing catastrophic failures and extending equipment lifespan. Preventive maintenance contracts, emergency repairs, and equipment upgrades for 24/7 operational reliability.',
    overviewAr: 'نقوم بصيانة وفحص وإصلاح المعدات الصناعية الحيوية — لمنع الأعطال الكارثية وإطالة عمر المعدات. نقدم عقود صيانة وقائية، وإصلاحات طارئة، وترقيات للمعدات لضمان موثوقية التشغيل على مدار الساعة.',
    statsEn: [
      { label: 'Preventive Schedule', val: 'Quarterly, semi-annual, annual schedules' },
      { label: 'Services Handled', val: 'Pumps, Boilers, Exchangers, Generators' },
      { label: 'Predictive Tests', val: 'Vibration, thermal imaging, oil analysis' },
      { label: 'Downtime Savings', val: '90%+ reduction in unexpected failures' }
    ],
    statsAr: [
      { label: 'جدول الصيانة الوقائية', val: 'جداول ربع سنوية، نصف سنوية، وسنوية' },
      { label: 'المعدات التي نخدمها', val: 'مضخات، غلايات، مبادلات حرارية، مولدات' },
      { label: 'فحوصات تنبؤية', val: 'تحليل الاهتزاز، التصوير الحراري، تحليل الزيوت' },
      { label: 'توفير التوقفات', val: 'تقليل بنسبة 90٪+ في الأعطال غير المتوقعة' }
    ],
    subServicesEn: [
      { title: 'Preventative Inspection Plans', desc: 'Scheduled condition inspections, component lubrication, gasket checking, and performance logging.' },
      { title: 'Predictive Diagnostic Audits', desc: 'Vibration monitoring of bearings, infrared thermal scanning of electrical control panels, and oil metal analysis.' },
      { title: 'Pump & Rotor Rebuilding', desc: 'Re-bearing, impeller balancing, shaft sleeve turning, dynamic seal replacements, and bench verification.' },
      { title: 'Exchanger Clean & Retubing', desc: 'Hydraulic cleaning of scale build-up, tube leak testing, baffle plates, and shell inspections.' }
    ],
    subServicesAr: [
      { title: 'خطط الفحص الوقائي', desc: 'عمليات فحص دورية مجدولة، تشحيم المكونات، فحص الحشوات وسجلات كفاءة الأداء.' },
      { title: 'عمليات الفحص التنبؤية', desc: 'مراقبة اهتزاز المحامل، الفحص الحراري بالأشعة تحت الحمراء للوحات التحكم، وتحليل زيوت المحركات.' },
      { title: 'إعادة بناء المضخات والمحاور', desc: 'تركيب محامل جديدة، موازنة الدفاعات، تشغيل جلب المحاور، استبدال مانع التسرب واختبار الأداء.' },
      { title: 'تنظيف المبادلات وإعادة الأنابيب', desc: 'تنظيف هيدروليكي للترسبات الكلسية، اختبار تسرب الأنابيب، فحص حواجز التدفق والهياكل.' }
    ],
    processEn: [
      { step: 'Step 1: Diagnostics & Audit', desc: 'Vibration, temperature, and performance data are logged to pinpoint issues.' },
      { step: 'Step 2: Maintenance Plan', desc: 'An itemized repair schedule, spare parts checklist, and timeline are drafted.' },
      { step: 'Step 3: Procurement & Setup', desc: 'Required OEM seals, bearings, and parts are sourced and prepped in workshop.' },
      { step: 'Step 4: Shutdown / Isolation', desc: 'Lockout-tagout (LOTO) protocols are executed, and equipment is isolated safely.' },
      { step: 'Step 5: Overhaul & Repair', desc: 'Trained technicians replace worn components, clean seals, and align joints.' },
      { step: 'Step 6: Dynamic Commissioning', desc: 'Equipment is run, vibration levels checked, and flow metrics verified.' },
      { step: 'Step 7: Performance Signoff', desc: 'QC sheet is signed and future preventive inspection dates are logged.' }
    ],
    processAr: [
      { step: 'الخطوة 1: التشخيص والتفتيش', desc: 'تسجيل الاهتزازات، درجات الحرارة، وبيانات الأداء لتحديد نقاط الضعف بدقة.' },
      { step: 'الخطوة 2: خطة الصيانة التفصيلية', desc: 'إعداد جدول إصلاح مفصل، قائمة قطع الغيار المطلوبة، وجدول زمن العمل.' },
      { step: 'الخطوة 3: الشراء والتجهيز', desc: 'شراء قطع الغيار المعتمدة والمحامل ومانعات التسرب وتجهيزها في الورشة.' },
      { step: 'الخطوة 4: الإيقاف والعزل الآمن', desc: 'تطبيق بروتوكولات قفل وتأمين الطاقة (LOTO) وعزل المعدات بشكل آمن تماماً.' },
      { step: 'الخطوة 5: العمرة والإصلاح', desc: 'يقوم الفنيون باستبدال المكونات التالفة وتنظيف مانعات التسرب ومحاذاة المحاور.' },
      { step: 'الخطوة 6: التشغيل التجريبي والديناميكي', desc: 'تشغيل المعدات، قياس مستويات الاهتزاز، والتحقق من معدلات التدفق والكفاءة.' },
      { step: 'الخطوة 7: اعتماد الأداء والتقارير', desc: 'توقيع تقرير مطابقة الجودة وتسجيل مواعيد الفحوصات الوقائية المستقبلية.' }
    ],
    specsEn: [
      { label: 'Preventive Contracts', val: 'Level 1 (Quarterly), Level 2 (Priority), Level 3 (Premium 24/7)' },
      { label: 'Typical Pricing Range', val: '$2,000 - $30,000 / year based on equipment scope' },
      { label: 'Diagnostic Tools', val: 'Infrared Thermal Imagers, Vibration Analyzers, Ultrasonic Detectors' },
      { label: 'Emergency Dispatch Response', val: 'Guaranteed 1-hour dispatch, 2-hour on-site (Jubail/Dammam)' }
    ],
    specsAr: [
      { label: 'عقود الصيانة الوقائية', val: 'المستوى 1 (ربع سنوي)، المستوى 2 (ذو أولوية)، المستوى 3 (ممتاز 24/7)' },
      { label: 'نطاق التكلفة السنوية', val: '2,000$ - 30,000$ سنوياً حسب حجم المعدات' },
      { label: 'أدوات التشخيص المستخدمة', val: 'أجهزة التصوير الحراري، أجهزة تحليل الاهتزاز، أجهزة كشف الفراغ' },
      { label: 'سرعة استجابة الطوارئ', val: 'إرسال مضمون خلال 1 ساعة، وصول للموقع خلال ساعتين (الجبيل/الدمام)' }
    ],
    pricingEn: {
      model: 'Preventive maintenance programs are customized by equipment assets, power ratings, and run-time schedules. AMCs (Annual Maintenance Contracts) eliminate up to 90% of costly production stops.',
      costs: [
        'Small pump units & booster sets preventive service: $2,000 - $5,000/year',
        'Boilers & shell heat exchangers inspection & cleaning: $5,000 - $12,000/year',
        'Large-scale power generator units premium support: $15,000 - $30,000+/year'
      ]
    },
    pricingAr: {
      model: 'تُخصص برامج الصيانة الوقائية بناءً على أصول المعدات، وقدرتها التشغيلية، وجداول تشغيلها. تلغي عقود الصيانة السنوية (AMC) ما يصل إلى 90٪ من التوقفات المكلفة.',
      costs: [
        'مجموعات المضخات الصغيرة والمتوسطة: 2,000$ - 5,000$ سنوياً',
        'الغلايات والمبادلات الحرارية الكبيرة: 5,000$ - 12,000$ سنوياً',
        'مولدات الطاقة الكبيرة والمحطات: 15,000$ - 30,000$+ سنوياً'
      ]
    },
    qaEn: [
      'Alignment checked using digital laser tools',
      'Vibration benchmark checks compared against ISO 10816 standards',
      'Strict lockout tagout safety compliance',
      'Complete component repair histories logged'
    ],
    qaAr: [
      'التحقق من محاذاة المحاور باستخدام أجهزة الليزر الرقمية',
      'مقارنة مستويات الاهتزاز بمعيار ISO 10816 الدولي للآلات',
      'الالتزام الصارم بسلامة تأمين الطاقة وقفلها',
      'تسجيل وتوثيق كامل لتاريخ إصلاحات المكونات والأعطال'
    ],
    whenEn: [
      'Unexpected equipment failures cause production line shutdowns',
      'Boilers or heaters suffer efficiency drops or burner errors',
      'Bearing vibration levels rise, risking lockup failures',
      'Annual overhauls and seal retrofits are needed to protect equipment assets'
    ],
    whenAr: [
      'عند حدوث أعطال مفاجئة تتسبب في إيقاف خطوط الإنتاج',
      'عند انخفاض كفاءة عمل الغلايات والسخانات أو حدوث أعطال الحارق',
      'عند ارتفاع مستويات اهتزاز المحامل مما يهدد بحدوث عطل مفاجئ',
      'عند الحاجة لعمرات سنوية شاملة وتحديثات مانعات التسرب لحماية أصول المعدات'
    ],
    images: [
      { url: '/Picture19.jpg', captionEn: 'Industrial Valve Maintenance', captionAr: 'صيانة صمامات التحكم الصناعية' },
      { url: '/Picture17.jpg', captionEn: 'Workshop Machinery Maintenance', captionAr: 'صيانة خطوط الآلات بالورشة' },
      { url: '/Picture24.jpg', captionEn: 'Dammam Diagnostic Lab', captionAr: 'مختبر التشخيص بالدمام' }
    ]
  }
];

export default function WorkshopPage() {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const index = SERVICES_DATA.findIndex((s) => s.id === hash);
        if (index !== -1) {
          setActiveTab(index);
        }
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const selectTab = (idx: number) => {
    setActiveTab(idx);
    window.location.hash = SERVICES_DATA[idx].id;
  };

  const activeSvc = SERVICES_DATA[activeTab];

  return (
    <main className="flex-grow">
      {/* HERO SECTION */}
      <section className="workshop-hero">
        <div className="workshop-hero-bg"></div>
        <div className="hero-infinite-grid" aria-hidden="true"></div>
        <InteractiveGrid />
        <div className="container workshop-hero-content">
          <div className="page-breadcrumb">
            <Link href="/" style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
              {t('Home', 'الرئيسية')}
            </Link> &nbsp;/&nbsp;
            <span>{t('Workshop & Industrial Services', 'الورشة والخدمات الصناعية')}</span>
          </div>
          <h1 dangerouslySetInnerHTML={{ __html: t('CNC Laser Cutting, Machining &amp; <span>Welding Services</span>', 'القطع بليزر CNC والتشغيل الآلي و<span>خدمات اللحام</span>') }}></h1>
          <p>
            {t(
              'Precision manufacturing meets industrial expertise. Our Dammam and Jubail workshops deliver high-precision components, expert welding, and specialized repair services using state-of-the-art fiber laser technology and AWS-certified processes.',
              'دقة التصنيع تلتقي مع الخبرة الصناعية. تقدم ورش العمل لدينا بالدمام والجبيل مكونات دقيقة للغاية، لحاماً معتمداً، وخدمات إصلاح متخصصة باستخدام أحدث تقنيات ليزر الألياف وعمليات لحام معتمدة من AWS.'
            )}
          </p>
          <div style={{ marginTop: '30px' }}>
            <Link className="workshop-hero-btn" href="/contact" style={{ display: 'inline-block', padding: '16px 36px', fontSize: '16px', fontWeight: 700, background: 'var(--orange)', color: 'white', textDecoration: 'none', borderRadius: '8px', boxShadow: 'var(--shadow-md)', transition: 'all 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              {t('Request a Quote', 'اطلب عرض سعر')}
            </Link>
          </div>
        </div>
      </section>

      {/* WORKSHOP OVERVIEW SECTION */}
      <section className="section" style={{ background: 'var(--white)', padding: '90px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 48px' }}>
            <div className="section-label" style={{ display: 'inline-flex' }}>{t('Overview', 'نظرة عامة')}</div>
            <h2 className="section-title" style={{ marginTop: '12px' }} dangerouslySetInnerHTML={{ __html: t('Industrial Workshop <span>Capabilities</span>', 'قدرات وإمكانيات <span>الورشة الصناعية</span>') }}></h2>
            <p className="section-subtitle" style={{ margin: '16px auto 0', maxWidth: '720px' }}>
              {t(
                'NexGen Build operates fully-equipped industrial workshops across Dammam and Jubail—delivering precision components and specialized services for oil & gas, petrochemical, construction, and manufacturing sectors. Our fiber laser technology, CNC machining centers, and AWS-certified welders execute projects with micron-level accuracy and zero compromise on quality.',
                'تدير نكست جن بيلد ورش عمل صناعية مجهزة بالكامل في الدمام والجبيل — حيث نقدم مكونات دقيقة وخدمات متخصصة لقطاعات النفط والغاز والبتروكيماويات والبناء والتصنيع. تنفذ تقنيات ليزر الألياف ومراكز تشغيل CNC واللحام المعتمد مشاريعك بدقة متناهية.'
              )}
            </p>
          </div>

          <div className="premium-table-container" style={{ marginTop: '36px', overflowX: 'auto' }}>
            <table className="premium-table">
              <thead>
                <tr>
                  <th style={{ width: '35%' }}>{t('Capability', 'القدرة والخدمة')}</th>
                  <th>{t('Detail & Technical Specification', 'التفاصيل والمواصفات الفنية')}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { enCap: 'Fiber Laser Cutting', arCap: 'القطع بالليزر للألياف', enDet: '±0.05mm accuracy (micron-level), up to 25mm thickness', arDet: 'دقة تبلغ ±0.05 مم (مستوى الميكرون)، وسماكة تصل إلى 25 مم' },
                  { enCap: 'CNC Machining', arCap: 'التشغيل الآلي CNC', enDet: 'Multi-axis CNC centers + manual machining capabilities', arDet: 'مراكز CNC متعددة المحاور + قدرات تشغيل وخراطة يدوية' },
                  { enCap: 'Welding Certification', arCap: 'اعتمادات اللحام المعتمدة', enDet: 'AWS D1.1 & D1.4 certified processes', arDet: 'عمليات لحام معتمدة وفقاً لـ AWS D1.1 و D1.4' },
                  { enCap: 'Weld Rejection Rate', arCap: 'معدل رفض اللحامات', enDet: '<1% (industry-leading quality)', arDet: 'أقل من 1٪ (مستوى جودة رائد في الصناعة)' },
                  { enCap: 'Materials Processed', arCap: 'المواد التي يتم معالجتها', enDet: 'Steel, stainless steel, aluminum, brass, acrylic, wood', arDet: 'الصلب، الستانلس ستيل، الألمنيوم، النحاس الأصفر، الأكريليك، الخشب' },
                  { enCap: 'Facility Locations', arCap: 'مواقع الورش والمرافق', enDet: 'Dammam (laser cutting) + Jubail (machining & welding)', arDet: 'الدمام (منشأة قطع الليزر) + الجبيل (منشأة التشغيل واللحام)' },
                  { enCap: 'Emergency Support', arCap: 'دعم الطوارئ والإنقاذ', enDet: '24/7 emergency services available', arDet: 'تتوفر خدمات صيانة وإصلاح طارئة على مدار الساعة 24/7' },
                  { enCap: 'Workshop Space', arCap: 'إجمالي مساحات العمل', enDet: '4,000+ m² of modern, equipped facility', arDet: 'أكثر من 4,000 متر مربع من المرافق الصناعية الحديثة والمجهزة' }
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

      {/* DETAILED SERVICE SECTIONS (TABBED INTERFACE) */}
      <section className="section" style={{ background: 'var(--cream)', padding: '90px 0', borderTop: '1px solid var(--gray-200)', borderBottom: '1px solid var(--gray-200)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 48px' }}>
            <div className="section-label" style={{ display: 'inline-flex' }}>{t('Detailed Services', 'الخدمات التفصيلية')}</div>
            <h2 className="section-title" style={{ marginTop: '12px' }} dangerouslySetInnerHTML={{ __html: t('Specialized Workshop <span>Divisions</span>', 'أقسام <span>الورشة المتخصصة</span>') }}></h2>
          </div>

          {/* NATIVE SCROLL ANCHORS FOR FOOTER LINKS */}
          <div style={{ position: 'relative' }}>
            {SERVICES_DATA.map((s) => (
              <div key={`anchor-${s.id}`} id={s.id} style={{ position: 'absolute', top: '-100px' }} aria-hidden="true" />
            ))}
          </div>

          {/* Horizontal Tab Navigation */}
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '14px', marginBottom: '40px', borderBottom: '1px solid var(--gray-200)' }}>
            {SERVICES_DATA.map((svc, idx) => {
              const isActive = activeTab === idx;
              const isHovered = hoveredTab === idx;
              return (
                <button
                  key={svc.id}
                  onClick={() => selectTab(idx)}
                  onMouseEnter={() => setHoveredTab(idx)}
                  onMouseLeave={() => setHoveredTab(null)}
                  style={{
                    padding: '14px 28px',
                    borderRadius: '8px',
                    border: '1px solid var(--gray-300)',
                    background: isActive ? 'var(--orange)' : isHovered ? 'var(--white)' : 'rgba(255,255,255,0.6)',
                    color: isActive ? 'white' : 'var(--navy)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    boxShadow: isActive ? 'var(--shadow-md)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                  }}
                >
                  <span style={{ fontSize: '18px' }}>{svc.icon}</span>
                  <span>{t(svc.labelEn, svc.labelAr)}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Display Area */}
          <div style={{ background: 'var(--white)', borderRadius: '16px', border: '1px solid var(--gray-200)', padding: '40px', boxShadow: 'var(--shadow-lg)' }}>
            
            {/* Header / Intro block */}
            <div style={{ borderBottom: '1px solid var(--gray-100)', paddingBottom: '30px', marginBottom: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <span style={{ fontSize: '32px' }}>{activeSvc.icon}</span>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>
                  {t(activeSvc.titleEn, activeSvc.titleAr)}
                </h3>
              </div>
              <p style={{ fontSize: '15.5px', color: 'var(--gray-600)', lineHeight: '1.8', margin: 0 }}>
                {t(activeSvc.overviewEn, activeSvc.overviewAr)}
              </p>
            </div>

            {/* Image Flow Strip (Horizontal Scroll Gallery) */}
            <div 
              className="workshop-image-flow"
              style={{ 
                display: 'flex', 
                gap: '20px', 
                overflowX: 'auto', 
                margin: '0 -40px 32px', 
                padding: '0 40px 10px', 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none'
              }}
            >
              {activeSvc.images.map((img, iIdx) => (
                <div 
                  key={iIdx} 
                  style={{ 
                    flex: '0 0 280px', 
                    height: '180px', 
                    borderRadius: '10px', 
                    overflow: 'hidden', 
                    position: 'relative', 
                    boxShadow: 'var(--shadow-sm)',
                    border: '1px solid var(--gray-200)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  }}
                >
                  <img 
                    src={img.url} 
                    alt={t(img.captionEn, img.captionAr)} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                  <div 
                    style={{ 
                      position: 'absolute', 
                      bottom: 0, 
                      left: 0, 
                      right: 0, 
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.85))', 
                      padding: '12px 16px',
                      color: 'white',
                      fontSize: '11px',
                      fontWeight: 600,
                      textAlign: lang === 'ar' ? 'right' : 'left'
                    }}
                  >
                    {t(img.captionEn, img.captionAr)}
                  </div>
                </div>
              ))}
            </div>

            {/* Layout Grid: Stats & Subservices */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '40px', marginBottom: '40px' }} className="responsive-split-grid">
              
              {/* Left Column: What's Included */}
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--orange)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {t('What We Deliver', 'ما نقوم بتقديمه')}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {activeSvc.subServicesEn.map((sub, sIdx) => (
                    <div key={sIdx} style={{ background: 'var(--gray-50)', padding: '20px', borderRadius: '10px', border: '1px solid var(--gray-200)' }}>
                      <strong style={{ display: 'block', fontSize: '14.5px', color: 'var(--navy)', marginBottom: '6px' }}>
                        {t(sub.title, activeSvc.subServicesAr[sIdx].title)}
                      </strong>
                      <span style={{ fontSize: '13px', color: 'var(--gray-600)', lineHeight: '1.6' }}>
                        {t(sub.desc, activeSvc.subServicesAr[sIdx].desc)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Key Specifications & Quick Metrics */}
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--navy)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {t('Technical Specifications', 'المواصفات الفنية')}
                </h4>
                <div style={{ background: 'var(--cream)', padding: '24px', borderRadius: '12px', border: '1px solid var(--gray-200)', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {activeSvc.statsEn.map((stat, sIdx) => (
                      <div key={sIdx} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '10px' }}>
                        <span style={{ fontSize: '13px', color: 'var(--gray-600)', fontWeight: 600 }}>
                          {t(stat.label, activeSvc.statsAr[sIdx].label)}
                        </span>
                        <span style={{ fontSize: '13px', color: 'var(--navy)', fontWeight: 700 }}>
                          {t(stat.val, activeSvc.statsAr[sIdx].val)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--navy)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {t('Quality Control Checklist', 'فحوصات وضمان الجودة')}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {activeSvc.qaEn.map((qa, qIdx) => (
                    <div key={qIdx} style={{ display: 'flex', gap: '10px', fontSize: '13.5px', color: 'var(--gray-600)', alignItems: 'center' }}>
                      <span style={{ color: 'var(--orange)', fontWeight: 'bold' }}>✓</span>
                      <span>{t(qa, activeSvc.qaAr[qIdx])}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Custom Comparison or Material Tables */}
            {(activeSvc.comparisonEn || activeSvc.materialsEn) && (
              <div style={{ marginBottom: '40px', borderTop: '1px solid var(--gray-100)', paddingTop: '30px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--orange)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {activeSvc.id === 'laser-cutting'
                    ? t('Technology Comparison Matrix', 'جدول مقارنة تقنيات القطع')
                    : activeSvc.id === 'welding'
                    ? t('Weld Defect Tolerance Levels', 'مستويات قبول عيوب اللحام المعتمدة')
                    : t('Materials Machinability Guide', 'دليل سهولة تشغيل المواد')}
                </h4>
                <div className="premium-table-container" style={{ overflowX: 'auto' }}>
                  <table className="premium-table">
                    <thead>
                      <tr>
                        {(lang === 'ar'
                          ? activeSvc.comparisonAr?.headers || activeSvc.materialsAr?.headers
                          : activeSvc.comparisonEn?.headers || activeSvc.materialsEn?.headers
                        )?.map((head, hIdx) => (
                          <th key={hIdx}>{head}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {(lang === 'ar'
                        ? activeSvc.comparisonAr?.rows || activeSvc.materialsAr?.rows
                        : activeSvc.comparisonEn?.rows || activeSvc.materialsEn?.rows
                      )?.map((row, rIdx) => (
                        <tr key={rIdx}>
                          {row.map((cell, cIdx) => (
                            <td key={cIdx}>
                              {cIdx === 0 ? <strong>{cell}</strong> : cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Process/Workflow Timeline */}
            <div style={{ marginBottom: '40px', borderTop: '1px solid var(--gray-100)', paddingTop: '30px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--navy)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {t('Execution & Process Workflow', 'خطوات ومراحل تنفيذ العمل')}
              </h4>
              <div className="premium-table-container" style={{ overflowX: 'auto' }}>
                <table className="premium-table">
                  <thead>
                    <tr>
                      <th style={{ width: '25%' }}>{t('Phase / Step', 'الخطوة / المرحلة')}</th>
                      <th>{t('Activities & Quality Gates', 'الأنشطة وبوابات فحص الجودة')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeSvc.processEn.map((proc, pIdx) => (
                      <tr key={pIdx}>
                        <td><strong>{t(proc.step, activeSvc.processAr[pIdx].step)}</strong></td>
                        <td>{t(proc.desc, activeSvc.processAr[pIdx].desc)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pricing Details */}
            <div style={{ borderTop: '1px solid var(--gray-100)', paddingTop: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }} className="responsive-split-grid">
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--navy)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {t('Pricing Structure', 'هيكل وتسعير الخدمة')}
                </h4>
                <p style={{ fontSize: '13.5px', color: 'var(--gray-600)', lineHeight: '1.7', margin: 0 }}>
                  {t(activeSvc.pricingEn.model, activeSvc.pricingAr.model)}
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--orange)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {t('Typical Project Scope Estimates', 'التقديرات النموذجية لنطاق المشروع')}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {activeSvc.pricingEn.costs.map((cStr, cIdx) => (
                    <div key={cIdx} style={{ fontSize: '13px', color: 'var(--navy)', fontWeight: 600, paddingLeft: lang === 'ar' ? '0' : '12px', paddingRight: lang === 'ar' ? '12px' : '0', borderLeft: lang === 'ar' ? 'none' : '3px solid var(--orange)', borderRight: lang === 'ar' ? '3px solid var(--orange)' : 'none' }}>
                      {t(cStr, activeSvc.pricingAr.costs[cIdx])}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WORKSHOP QUALITY & SAFETY STANDARDS */}
      <section className="section" style={{ background: 'var(--white)', padding: '90px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 48px' }}>
            <div className="section-label" style={{ display: 'inline-flex' }}>{t('Standards', 'معاييرنا')}</div>
            <h2 className="section-title" style={{ marginTop: '12px' }} dangerouslySetInnerHTML={{ __html: t('Certified Quality &amp; <span>Safety Standards</span>', 'معايير الجودة و<span>السلامة المعتمدة</span>') }}></h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }} className="responsive-split-grid">
            <div style={{ background: 'var(--cream)', border: '1px solid var(--gray-200)', borderRadius: '16px', padding: '32px' }}>
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>🏆</div>
              <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--navy)', marginBottom: '12px', marginTop: 0 }}>
                {t('ISO 9001:2015 Quality Management', 'إدارة الجودة ISO 9001:2015')}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--gray-600)', lineHeight: '1.7', margin: 0 }}>
                {t(
                  'NexGen Build operates workshops running certified ISO 9001 processes. Every material delivery undergoes chemical certification checks, every CNC program is simulated beforehand, and final component deliveries are certified with full dimensional inspection records for structural trace-compliance.',
                  'تعمل نكست جن بيلد بورش عمل تطبق عمليات معتمدة بشهادة ISO 9001. تخضع جميع المواد الواردة للتحقق من شهادات التركيب الكيميائي، وتتم محاكاة جميع برامج CNC مسبقاً، وتعتمد جميع التسليمات بسجلات فحص أبعاد كاملة.'
                )}
              </p>
            </div>

            <div style={{ background: 'var(--cream)', border: '1px solid var(--gray-200)', borderRadius: '16px', padding: '32px' }}>
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>🛡️</div>
              <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--navy)', marginBottom: '12px', marginTop: 0 }}>
                {t('Strict OSHA Safety Compliance', 'الالتزام الصارم بمعايير سلامة OSHA')}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--gray-600)', lineHeight: '1.7', margin: 0 }}>
                {t(
                  'Safety is non-negotiable in our facilities. We enforce OSHA-compliant safety controls, including strict machine guarding, automatic laser screens, active gas exhaust extraction ventilation, complete personal protective equipment mandates, and regular monthly workshop safety audits.',
                  'السلامة غير قابلة للتفاوض في منشآتنا. نحن نطبق ضوابط سلامة متوافقة مع معايير OSHA، بما في ذلك الحماية الصارمة للمعدات، شاشات الليزر التلقائية، أنظمة عادم وتهوية الغازات النشطة، والتفتيشات الشهرية المنتظمة.'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WORKSHOP FACILITIES (DAMMAM & JUBAIL) */}
      <section className="section" style={{ background: 'var(--navy)', padding: '90px 0', color: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 48px' }}>
            <div className="section-label" style={{ display: 'inline-flex', color: 'var(--orange-light)' }}>{t('Facilities', 'مرافقنا')}</div>
            <h2 className="section-title" style={{ marginTop: '12px', color: 'white' }} dangerouslySetInnerHTML={{ __html: t('Our Dammam &amp; Jubail <span>Operations</span>', 'عملياتنا في <span>الدمام والجبيل</span>') }}></h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }} className="responsive-split-grid">
            
            {/* Dammam Facility */}
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
              <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                <img src="/Picture24.jpg" alt="Dammam Workshop" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '20px', left: lang === 'ar' ? 'auto' : '20px', right: lang === 'ar' ? '20px' : 'auto', background: 'var(--orange)', color: 'white', padding: '6px 14px', borderRadius: '4px', fontSize: '12px', fontWeight: 700 }}>
                  {t('Laser Specialization', 'تخصص القطع بالليزر')}
                </div>
              </div>
              <div style={{ padding: '30px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'white', marginTop: 0, marginBottom: '14px' }}>
                  {t('Dammam Workshop Facility', 'منشأة ورشة الدمام')}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px', color: 'rgba(255,255,255,0.7)' }}>
                  <div>📍 <strong>{t('Dallah Industrial Area, Dammam', 'المنطقة الصناعية دله، الدمام')}</strong></div>
                  <div>📐 <strong>{t('Facility Size:', 'مساحة المنشأة:')}</strong> {t('2,500 m² modern facility space', '2,500 متر مربع من المساحة الحديثة')}</div>
                  <div>🛠️ <strong>{t('Key Equipment:', 'المعدات الرئيسية:')}</strong> {t('High-speed Fiber Laser cutting system (±0.05mm precision), 3-axis CNC milling centers, manual lathes, and precision coordinate labs.', 'أنظمة قطع ليزر الألياف عالية السرعة، مراكز فرز CNC ثلاثية المحاور، مخارط يدوية، ومختبرات فحص الأبعاد.')}</div>
                  <div>⚡ <strong>{t('Services:', 'الخدمات المتاحة:')}</strong> {t('CNC laser cutting, general machining, metal engraving, and bracket prototyping.', 'قطع الليزر CNC، التشغيل العام، نقش المعادن، وتصنيع نماذج الكتائف.')}</div>
                  <div>⏱️ <strong>{t('Lead Times:', 'مواعيد التسليم:')}</strong> {t('Laser cutting: 1-2 days | Machining: 2-3 days', 'القطع بالليزر: 1-2 أيام | التشغيل الآلي: 2-3 أيام')}</div>
                </div>
              </div>
            </div>

            {/* Jubail Facility */}
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
              <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                <img src="/Picture22.jpg" alt="Jubail Workshop" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '20px', left: lang === 'ar' ? 'auto' : '20px', right: lang === 'ar' ? '20px' : 'auto', background: 'var(--orange)', color: 'white', padding: '6px 14px', borderRadius: '4px', fontSize: '12px', fontWeight: 700 }}>
                  {t('Heavy Machining & Welding', 'الخراطة الثقيلة واللحام')}
                </div>
              </div>
              <div style={{ padding: '30px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'white', marginTop: 0, marginBottom: '14px' }}>
                  {t('Jubail Workshop Facility', 'منشأة ورشة الجبيل')}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px', color: 'rgba(255,255,255,0.7)' }}>
                  <div>📍 <strong>{t('Jubail Industrial Area', 'المنطقة الصناعية، الجبيل')}</strong></div>
                  <div>📐 <strong>{t('Facility Size:', 'مساحة المنشأة:')}</strong> {t('1,500 m² specialized facility space', '1,500 متر مربع من المساحة المتخصصة')}</div>
                  <div>🛠️ <strong>{t('Key Equipment:', 'المعدات الرئيسية:')}</strong> {t('Large-diameter CNC turning lathes, 5-axis CNC mills, welding stations (GTAW, GMAW, FCAW, SMAW, SAW), and pressure-testing chambers.', 'مخارط CNC ذات أقطار كبيرة، فارزات خماسية المحاور، محطات لحام شاملة، وغرف اختبار الضغط.')}</div>
                  <div>⚡ <strong>{t('Services:', 'الخدمات المتاحة:')}</strong> {t('Large shaft turning, multi-axis milling, certified structural & pressure welding, ASME repairs, and leak clamp fabrication.', 'خرط المحاور الكبيرة، تفريز خماسي المحاور، لحام الهياكل والضغط المعتمد، وإصلاحات ASME.')}</div>
                  <div>⏱️ <strong>{t('Lead Times:', 'مواعيد التسليم:')}</strong> {t('CNC turning: 2-3 days | Complex machining: 3-5 days | Welding: 2-7 days', 'خراطة CNC: 2-3 أيام | تشغيل معقد: 3-5 أيام | اللحام: 2-7 أيام')}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WORKSHOP FAQ SECTION */}
      <section className="section" style={{ background: 'var(--cream)', padding: '90px 0', borderTop: '1px solid var(--gray-200)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="section-label" style={{ display: 'inline-flex' }}>{t('FAQ', 'الأسئلة الشائعة')}</div>
            <h2 className="section-title" style={{ marginTop: '12px' }} dangerouslySetInnerHTML={{ __html: t('Frequently Asked <span>Questions</span>', 'الأسئلة <span>الشائعة حول خدمات الورشة</span>') }}></h2>
          </div>

          <Accordion items={WORKSHOP_FAQS} />
        </div>
      </section>

      {/* WORKSHOP GUARANTEE */}
      <section className="section" style={{ background: 'var(--white)', padding: '90px 0', borderTop: '1px solid var(--gray-200)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="section-label" style={{ display: 'inline-flex' }}>{t('Our Commitment', 'التزامنا')}</div>
            <h2 className="section-title" style={{ marginTop: '12px' }} dangerouslySetInnerHTML={{ __html: t('Our Performance <span>Guarantees</span>', 'ضمانات <span>الأداء والكفاءة</span>') }}></h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="responsive-split-grid">
            {[
              { titleEn: 'Quality Guarantee', titleAr: 'ضمان الجودة والاعتماد', descEn: 'All components are fabricated exactly to your engineering specifications, tested, and validated before dispatch.', descAr: 'يتم تصنيع جميع المكونات تماماً وفقاً للمواصفات الهندسية الخاصة بك، واختبارها واعتمادها قبل الشحن.' },
              { titleEn: 'Accuracy Guarantee', titleAr: 'ضمان الدقة والتفاوتات', descEn: 'Dimensions are checked against digital micrometer calibrations, and compliance sheets are provided with every batch.', descAr: 'يتم فحص أبعاد جميع القطع المنتجة مقابل معايرات الميكرومتر الرقمية وتوفير سجلات المطابقة مع كل دفعة.' },
              { titleEn: 'Certification Guarantee', titleAr: 'ضمان اعتمادات اللحامين', descEn: 'All welding runs are executed by active AWS D1.1/D1.4 certified welders with fully traceable test documentation.', descAr: 'يتم تنفيذ جميع عمليات اللحام بواسطة لحامين نشطين ومعتمدين من AWS D1.1/D1.4 مع وثائق اختبار قابلة للتتبع بالكامل.' },
              { titleEn: 'Timeline Guarantee', titleAr: 'ضمان الالتزام بالمواعيد', descEn: 'We commit to firm delivery lead times. Expedited rush deliveries are completed on schedule, or we provide discounts.', descAr: 'نحن نلتزم بمواعيد تسليم ثابتة ومحددة. يتم إنجاز التسليمات العاجلة في الوقت المحدد، أو نقدم خصماً تعويضياً.' },
              { titleEn: 'OSHA Safety Guarantee', titleAr: 'ضمان معايير السلامة المهنية', descEn: 'All fabrication, handling, and operations strictly adhere to OSHA guidelines to maintain zero-accident facilities.', descAr: 'تلتزم جميع عمليات التصنيع والمناولة والتشغيل التزاماً صارماً بإرشادات OSHA لضمان بيئة خالية من الحوادث.' },
              { titleEn: 'On-Call Emergency Support', titleAr: 'دعم طوارئ على مدار الساعة', descEn: 'Our 24/7 industrial technicians respond within 1 hour in Dammam and Jubail to keep your operations running continuously.', descAr: 'يستجيب فنيونا الصناعيون على مدار الساعة طوال أيام الأسبوع في غضون ساعة واحدة بالدمام والجبيل لضمان استمرار عملياتك.' }
            ].map((g, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '16px', background: 'var(--gray-50)', padding: '24px', borderRadius: '12px', border: '1px solid var(--gray-200)' }}>
                <span style={{ fontSize: '24px', color: 'var(--orange)' }}>✓</span>
                <div>
                  <strong style={{ display: 'block', fontSize: '15px', color: 'var(--navy)', marginBottom: '6px' }}>{t(g.titleEn, g.titleAr)}</strong>
                  <span style={{ fontSize: '13px', color: 'var(--gray-600)', lineHeight: '1.65' }}>{t(g.descEn, g.descAr)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION SECTIONS */}
      <section className="section" style={{ background: 'var(--navy)', color: 'white', padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 48px' }}>
            <h2 className="section-title" style={{ color: 'white' }} dangerouslySetInnerHTML={{ __html: t('Ready to Get <span>Started?</span>', 'جاهز <span>للبدء في التعاون؟</span>') }}></h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            
            {/* Primary CTA */}
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '28px', marginBottom: '16px', display: 'block' }}>📝</span>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'white', margin: '0 0 12px 0' }}>{t('Request Workshop Quote', 'اطلب عرض سعر الورشة')}</h3>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', margin: '0 0 24px 0' }}>
                  {t('Send us your specifications, technical drawings, or describe your project. We\'ll provide an itemized quote within 24 hours.', 'أرسل لنا مواصفاتك، رسوماتك الفنية، أو صف تفاصيل مشروعك. سنقدم لك عرض سعر مفصل خلال 24 ساعة.')}
                </p>
              </div>
              <Link href="/contact" style={{ display: 'inline-block', padding: '12px 24px', background: 'var(--orange)', color: 'white', fontWeight: 700, textAlign: 'center', textDecoration: 'none', borderRadius: '6px', transition: 'background 0.3s' }} onMouseOver={(e) => e.currentTarget.style.background = 'var(--orange-dark)'} onMouseOut={(e) => e.currentTarget.style.background = 'var(--orange)'}>
                {t('Request Your Quote', 'اطلب تسعيرك الآن')}
              </Link>
            </div>

            {/* Secondary CTA */}
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '28px', marginBottom: '16px', display: 'block' }}>📞</span>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'white', margin: '0 0 12px 0' }}>{t('24/7 Emergency Repairs', 'إصلاحات طارئة 24/7')}</h3>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', margin: '0 0 24px 0' }}>
                  {t('Unexpected process leak or equipment failure? Call our emergency line directly. Industrial technician on-call.', 'تسريب مفاجئ أو عطل طارئ في المعدات؟ اتصل بخط الطوارئ الخاص بنا مباشرة. فني صناعي جاهز للتحرك.')}
                </p>
              </div>
              <a href="tel:+966534758685" style={{ display: 'inline-block', padding: '12px 24px', border: '2px solid white', color: 'white', fontWeight: 700, textAlign: 'center', textDecoration: 'none', borderRadius: '6px', transition: 'all 0.3s' }} onMouseOver={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'var(--navy)'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'white'; }}>
                {t('Call +966-53-475-8685', 'اتصل على 966534758685+')}
              </a>
            </div>

            {/* Tertiary CTA */}
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '28px', marginBottom: '16px', display: 'block' }}>🗓️</span>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'white', margin: '0 0 12px 0' }}>{t('Schedule Preventative Contract', 'جدول عقد صيانة وقائية')}</h3>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', margin: '0 0 24px 0' }}>
                  {t('Prevent catastrophic equipment failures and safeguard your factory output. Plan preventative inspections today.', 'تجنب الأعطال الكارثية للمعدات واحمِ إنتاج مصنعك. خطط لعمليات الفحص الوقائي الدورية اليوم.')}
                </p>
              </div>
              <Link href="/contact" style={{ display: 'inline-block', padding: '12px 24px', background: 'rgba(255,255,255,0.1)', color: 'white', fontWeight: 700, textAlign: 'center', textDecoration: 'none', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.2)', transition: 'background 0.3s' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'} onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
                {t('Schedule Consultation', 'جدولة موعد الاستشارة')}
              </Link>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

const WORKSHOP_FAQS = [
  {
    qEn: "What's the difference between CNC and manual machining?",
    qAr: "ما الفرق بين التشغيل الآلي باستخدام الحاسب الآلي (CNC) والتشغيل اليدوي؟",
    aEn: "CNC (Computer Numerical Control) uses computer programming to guide cutting tool movements, delivering extreme precision, high repeatability, and speed for production runs. Manual Machining relies on the machinist's direct manual control, making it ideal for custom one-off parts, quick prototype adjustments, and simple repair tasks.",
    aAr: "يستخدم CNC برمجة الكمبيوتر لتوجيه أدوات القطع، مما يوفر دقة متناهية وتكرارية عالية وسرعة لتشغيل الإنتاج. بينما يعتمد التشغيل اليدوي على التحكم اليدوي المباشر للفني، مما يجعله مثاليًا للقطع الفردية المخصصة وتعديلات النماذج الأولية السريعة ومهام الإصلاح البسيطة."
  },
  {
    qEn: "How accurate is CNC laser cutting?",
    qAr: "ما مدى دقة القطع بالليزر CNC؟",
    aEn: "Our fiber laser system achieves an accuracy of ±0.05mm (micron-level precision). This is an industry-leading tolerance that ensures components are cut exactly to design dimensions, minimizing edge variations and assembly fit issues.",
    aAr: "يحقق نظام ليزر الألياف لدينا دقة تبلغ ±0.05 مم (دقة على مستوى الميكرون). هذا التفاوت الرائد في الصناعة يضمن قطع المكونات تماماً وفقاً لأبعاد التصميم، مما يقلل من اختلافات الحواف ومشاكل ملاءمة التجميع."
  },
  {
    qEn: "What materials can you cut with the fiber laser?",
    qAr: "ما هي المواد التي يمكنكم قطعها بليزر الألياف؟",
    aEn: "Our fiber laser cuts carbon steel (mild steel), stainless steel, aluminum, brass, copper, and specialty alloys like titanium. (Note: Non-metals like wood, acrylic, or glass are processed in separate routing/machining facilities).",
    aAr: "يقطع ليزر الألياف لدينا الفولاذ الكربوني (الحديد الأسود)، الفولاذ المقاوم للصدأ (الستانلس ستيل)، الألمنيوم، النحاس الأصفر، النحاس الأحمر، والسبائك الخاصة مثل التيتانيوم. (ملاحظة: المواد غير المعدنية مثل الخشب أو الأكريليك يتم معالجتها في مرافق تشغيل أخرى)."
  },
  {
    qEn: "Can you weld aluminum? How good are aluminum welds?",
    qAr: "هل يمكنكم لحام الألمنيوم؟ ما مدى جودة لحام الألمنيوم؟",
    aEn: "Yes, we weld aluminum using TIG (GTAW) process. This delivers clean, high-tensile welds that are aesthetically pleasing, structurally sound, and suitable for marine, food-grade, or decorative architectural applications.",
    aAr: "نعم، نقوم بلحام الألمنيوم باستخدام عملية TIG (GTAW). وهذا يوفر لحامات نظيفة وعالية المقاومة، ممتازة من الناحية الجمالية والهيكلية، ومناسبة للتطبيقات البحرية، الغذائية، أو المعمارية الزخرفية."
  },
  {
    qEn: "What's your lead time for rush/urgent work?",
    qAr: "ما هو الوقت اللازم لإنجاز الأعمال المستعجلة والطارئة؟",
    aEn: "Standard lead times are 2-5 days for laser cutting and welding, and 2-7 days for machining. For urgent/rush jobs, we offer same-day rush execution or overnight priority shifts for an additional fee.",
    aAr: "أوقات التسليم القياسية هي 2-5 أيام للقطع بالليزر واللحام، و 2-7 أيام للتشغيل الآلي. بالنسبة للوظائف العاجلة، نقدم تنفيذاً عاجلاً في نفس اليوم أو نوبات عمل ليلية ذات أولوية مقابل رسوم إضافية."
  },
  {
    qEn: "Do you provide inspection reports and certifications?",
    qAr: "هل تقدمون تقارير الفحص والشهادات؟",
    aEn: "Yes, comprehensive documentation is included, including dimensional inspection records, surface finish verification, quality certificates, and material traceability. For welding, we provide full weld maps and radiographic/ultrasonic testing logs as requested.",
    aAr: "نعم، يتم تضمين توثيق شامل، بما في ذلك سجلات فحص الأبعاد، والتحقق من تشطيب الأسطح، وشهادات الجودة، وتتبع المواد. بالنسبة للحام، نوفر خرائط اللحام الكاملة وسجلات اختبار الأشعة السينية أو الموجات فوق الصوتية حسب الطلب."
  },
  {
    qEn: "Can you work to my drawings or CAD files?",
    qAr: "هل يمكنكم العمل وفقاً للرسومات الهندسية أو ملفات CAD الخاصة بي؟",
    aEn: "Absolutely. We accept CAD formats (DWG, DXF, STEP, IGES) as well as PDF drawings, sketches, and physical templates. Our engineering team converts your drawings into optimized cutting and machining paths.",
    aAr: "بالتأكيد. نقبل تنسيقات CAD (DWG، DXF، STEP، IGES) بالإضافة إلى رسومات PDF، والاسكتشات، والقوالب المادية. يقوم فريقنا الهندسي بتحويل رسوماتك إلى مسارات قطع وتشغيل محسنة."
  },
  {
    qEn: "What's included in your maintenance contracts?",
    qAr: "ما الذي تشتمل عليه عقود الصيانة الخاصة بكم؟",
    aEn: "We offer three contract levels: Level 1 (Quarterly preventative inspections and basic fluid/filter checks), Level 2 (Priority maintenance, monthly servicing, predictive vibration/thermal testing), and Level 3 (Premium 24/7 continuous support, guaranteed 2-hour emergency response, and annual overhaul coverage).",
    aAr: "نحن نقدم ثلاثة مستويات من العقود: المستوى 1 (فحوصات وقائية ربع سنوية وفحوصات السوائل والفلاتر الأساسية)، المستوى 2 (صيانة ذات أولوية، خدمة شهرية، اختبارات الاهتزاز والحرارة التنبؤية)، والمستوى 3 (دعم مستمر 24/7، استجابة طوارئ مضمونة خلال ساعتين، وتغطية العمرة السنوية الشاملة)."
  },
  {
    qEn: "Do you handle emergency repairs at night and weekends?",
    qAr: "هل تتعاملون مع الإصلاحات الطارئة خلال الليل وعطلات نهاية الأسبوع؟",
    aEn: "Yes, our emergency repair team is available 24/7. We dispatch technicians within 1 hour in Dammam and Jubail to handle equipment failures, critical pressure piping leaks, and structural breakdown containment.",
    aAr: "نعم، فريق الإصلاح الطارئ لدينا متاح على مدار الساعة طوال أيام الأسبوع. نقوم إرسال الفنيين في غضون ساعة واحدة في الدمام والجبيل للتعامل مع أعطال المعدات وتسريبات أنابيب الضغط الحرجة واحتواء الانهيارات الهيكلية."
  },
  {
    qEn: "Can you design and fabricate custom clamps for leak repair?",
    qAr: "هل يمكنكم تصميم وتصنيع مشابك مخصصة لإصلاح التسرب؟",
    aEn: "Yes, our workshop specializes in custom-designed leak repair clamps. We assess your system pressure, temperature, and pipe dimensions, fabricate the clamp in-house (typically within 1-4 hours), and execute immediate online installation to seal the leak.",
    aAr: "نعم، يتخصص مصنعنا في تصنيع مشابك إصلاح التسرب المصممة خصيصاً. نقوم بتقييم ضغط النظام ودرجة الحرارة وأبعاد الأنابيب، وتصنيع المشبك داخلياً (عادة في غضون 1-4 ساعات)، وتنفيذ التركيب الفوري لإغلاق التسرب."
  },
  {
    qEn: "Are your technicians trained and certified?",
    qAr: "هل الفنيون لديك مدربون ومعتمدون؟",
    aEn: "All welders hold active AWS certifications (D1.1 for structural and D1.4 for reinforced piping). Machinists and maintenance technicians undergo regular OEM training, safety courses, and rigorous ISO-compliant operational audits.",
    aAr: "يحمل جميع اللحامين شهادات AWS نشطة (D1.1 للهياكل و D1.4 للأنابيب المقواة). يخضع فنيو التشغيل الآلي والصيانة لتدريبات منتظمة من الجهات المصنعة للمعدات ودورات سلامة وعمليات تدقيق تشغيلية صارمة متوافقة مع معايير ISO."
  },
  {
    qEn: "How do you price services? Is there a minimum order?",
    qAr: "كيف يتم تسعير الخدمات؟ وهل هناك حد أدنى للطلب؟",
    aEn: "Pricing is calculated based on materials, complexity, and volume. We offer transparent itemized quotes before any work begins, with volume discounts for larger batches. We have no minimum order size and are happy to support single prototype fabrication.",
    aAr: "يتم احتساب التسعير بناءً على المواد والتعقيد والكمية. نحن نقدم أسعاراً مفصلة وشفافة قبل بدء أي عمل، مع خصومات على الكميات للتشغيلات الكبيرة. ليس لدينا حد أدنى لحجم الطلب ونسعد بدعم تصنيع النماذج الأولية الفردية."
  }
];
