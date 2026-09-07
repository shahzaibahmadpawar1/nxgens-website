'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { InteractiveGrid } from '@/components/InteractiveGrid';
import { Accordion } from '@/components/Accordion';

interface IncludedCategory {
  category: string;
  items: string[];
}

interface ProcessStep {
  step: string;
  details: string;
}

interface BenefitItem {
  title: string;
  desc: string;
}

interface ServiceTabDetail {
  id: string;
  labelEn: string;
  labelAr: string;
  icon: string;
  titleEn: string;
  titleAr: string;
  overviewEn: string;
  overviewAr: string;
  includedEn: IncludedCategory[];
  includedAr: IncludedCategory[];
  processEn: ProcessStep[];
  processAr: ProcessStep[];
  benefitsEn: BenefitItem[];
  benefitsAr: BenefitItem[];
  pricingEn: string;
  pricingAr: string;
  whenEn: string[];
  whenAr: string[];
}

const SERVICES_DATA: ServiceTabDetail[] = [
  {
    id: 'general',
    labelEn: 'General Construction',
    labelAr: 'البناء العام',
    icon: '🏗️',
    titleEn: 'General Construction: Complete Structural Delivery',
    titleAr: 'البناء العام: تسليم إنشائي متكامل',
    overviewEn: 'We execute complete construction projects—from site preparation through handover. Our general construction division manages all structural work, civil infrastructure, and site development. You get one contractor accountable for the entire build.',
    overviewAr: 'نحن ننفذ مشاريع بناء كاملة — من إعداد الموقع إلى التسليم. يدير قسم البناء العام لدينا جميع الأعمال الهيكلية، والبنية التحتية المدنية، وتطوير الموقع. تحصل على مقاول واحد مسؤول عن البناء بأكمله.',
    includedEn: [
      { category: 'Pre-Construction Phase', items: ['Site survey and analysis', 'Soil testing and assessment', 'Construction planning and sequencing', 'Safety planning and protocols', 'Material procurement coordination', 'Workforce mobilization'] },
      { category: 'Foundation & Structural Phase', items: ['Excavation and site prep', 'Foundation design and installation (reinforced concrete, pile foundations)', 'Structural steel fabrication and erection (in-house capability)', 'Concrete pouring and curing', 'Structural inspections and testing', 'Quality verification against specifications'] },
      { category: 'Framing & Closure Phase', items: ['Roof system installation (steel trusses, concrete, mixed systems)', 'Wall systems (masonry, curtain walls, precast panels)', 'Floor systems (concrete slabs, composite systems)', 'Window and door installation', 'Facade and cladding installation', 'Building envelope closure and sealing'] },
      { category: 'Finishing & Completion Phase', items: ['Interior partitioning and wall finishing', 'Floor installation (concrete, tiles, other materials)', 'Interior painting and decoration', 'Cleanup and waste removal', 'Site demobilization', 'Handover documentation and training'] }
    ],
    includedAr: [
      { category: 'مرحلة ما قبل البناء', items: ['مسح وتحليل الموقع', 'فحص وتقييم التربة', 'تخطيط البناء وتسلسله', 'تخطيط بروتوكولات السلامة', 'تنسيق شراء المواد', 'تعبئة القوى العاملة'] },
      { category: 'مرحلة الأساسات والهيكل', items: ['أعمال الحفر والتهيئة', 'تصميم وتركيب الأساسات (خرسانة مسلحة، ركائز)', 'تصنيع وتركيب الهياكل الحديدية (داخلياً)', 'صب ومعالجة الخرسانة', 'عمليات الفحص والاختبار الإنشائي', 'التحقق من الجودة مقابل المواصفات'] },
      { category: 'مرحلة الهيكل الخارجي والإغلاق', items: ['تركيب أنظمة الأسطح (دعامات حديدية، خرسانة)', 'أنظمة الجدران (بناء الطوب، جدران ستائرية، ألواح مسبقة الصب)', 'أنظمة الأرضيات (بلاطات خرسانية، أنظمة مركبة)', 'تركيب الأبواب والنوافذ', 'تركيب الواجهات والكسوات', 'إغلاق وعزل غلاف المبنى'] },
      { category: 'مرحلة التشطيب والتسليم', items: ['القواطع الداخلية وتجهيز الجدران', 'تركيب الأرضيات (خرسانة، بلاط)', 'الدهان والديكور الداخلي', 'التنظيف وإزالة المخلفات', 'إخلاء الموقع', 'وثائق التسليم والتدريب'] }
    ],
    processEn: [
      { step: 'Phase 1: Planning (Week 1-3)', details: 'Site assessment, trade design review, scheduling, material coordination, safety planning.' },
      { step: 'Phase 2: Excavation & Foundation (Week 4-12)', details: 'Site excavation, foundation engineering, concrete form work, reinforcement, pouring, and curing.' },
      { step: 'Phase 3: Structural Work (Week 13-24)', details: 'In-house steel fabrication, structural steel erection, floor systems, and roof installation.' },
      { step: 'Phase 4: Building Closure (Week 25-32)', details: 'Wall systems installation, exterior facade, windows, doors, and building envelope sealing.' },
      { step: 'Phase 5: Interior Finishing (Week 33-42)', details: 'Interior partitions, flooring, painting, final site cleanup, and project handover.' }
    ],
    processAr: [
      { step: 'المرحلة 1: التخطيط (الأسبوع 1-3)', details: 'تقييم الموقع، مراجعة التصاميم، الجدولة، تنسيق المواد، وتخطيط بروتوكولات السلامة.' },
      { step: 'المرحلة 2: الأساسات (الأسبوع 4-12)', details: 'أعمال الحفر، هندسة الأساسات، القوالب الخرسانية، حديد التسليح، الصب والمعالجة.' },
      { step: 'المرحلة 3: الهيكل الإنشائي (الأسبوع 13-24)', details: 'تصنيع الحديد داخلياً، تركيب الهيكل الحديدي، أنظمة الأرضيات، وتركيب الأسطح.' },
      { step: 'المرحلة 4: الإغلاق (الأسبوع 25-32)', details: 'تركيب الجدران، الواجهات الخارجية، الأبواب والنوافذ، وعزل وتغليف المبنى.' },
      { step: 'المرحلة 5: التشطيب (الأسبوع 33-42)', details: 'القواطع الداخلية، الأرضيات، الدهانات، التنظيف النهائي للموقع، والتسليم.' }
    ],
    benefitsEn: [
      { title: 'Coordinated Design', desc: 'Direct planning with electrical, HVAC, and plumbing teams prevents ductwork and conduit clashes during framing.' },
      { title: 'In-House Steel Fabrication', desc: 'We fabricate structural steel at our Dammam & Jubail facilities, eliminating middleman markups and third-party delays.' },
      { title: 'Single Accountability', desc: 'No finger-pointing between multiple subcontractors. We own the entire civil, structural, and finishing scope.' }
    ],
    benefitsAr: [
      { title: 'تصميم منسق متكامل', desc: 'التنسيق المباشر مع فرق الكهرباء والتكييف والسباكة يمنع تعارض مسارات الهواء والأنابيب.' },
      { title: 'تصنيع الفولاذ داخلياً', desc: 'نصنع الفولاذ الإنشائي في ورشنا بالدمام والجبيل، مما يلغي هوامش الوسطاء وتأخيرات الأطراف الخارجية.' },
      { title: 'مسؤولية موحدة', desc: 'لا يوجد تبادل اتهامات بين مقاولين متعددين. نحن نملك نطاق العمل المدني والإنشائي والتشطيبات بالكامل.' }
    ],
    pricingEn: 'Detailed itemized quotes provided after comprehensive site assessment. Price depends on scale, structural specifications, materials, and schedule.',
    pricingAr: 'يتم تقديم عروض أسعار مفصلة ومبوبة بعد تقييم شامل للموقع. يعتمد السعر على الحجم والمواصفات الإنشائية والمواد والجدول الزمني.',
    whenEn: ['Building a new industrial or commercial facility from scratch', 'Major structural renovations or expansions of existing complexes', 'Timeline-sensitive builds requiring fast-tracked trade coordination', 'Projects where Saudi Aramco quality compliance is mandatory'],
    whenAr: ['بناء منشأة صناعية أو تجارية جديدة من الصفر', 'ترميمات إنشائية كبرى أو توسعة المجمعات الحالية', 'المباني ذات الجداول الزمنية الضيقة التي تتطلب تنسيقاً سريعاً', 'المشاريع التي يكون فيها الامتثال لمعايير أرامكو السعودية إلزامياً']
  },
  {
    id: 'electrical',
    labelEn: 'Electrical Systems',
    labelAr: 'الأنظمة الكهربائية',
    icon: '⚡',
    titleEn: 'Electrical Systems: Complete Power Infrastructure',
    titleAr: 'الأنظمة الكهربائية: بنية تحتية متكاملة للطاقة',
    overviewEn: 'We design, install, test, and maintain complete electrical systems that power your operations reliably. From load calculations through certification, our electrical division handles every aspect of your power infrastructure.',
    overviewAr: 'نحن نصمم ونركب ونختبر ونحافظ على أنظمة كهربائية كاملة تغذي عملياتك بموثوقية. من حسابات الأحمال إلى الاعتماد، يتعامل قسم الكهرباء لدينا مع كل جانب من جوانب البنية التحتية للطاقة.',
    includedEn: [
      { category: 'Design & Engineering Phase', items: ['Electrical load analysis and calculations', 'Power distribution system layout', 'Main & sub panel design and specifications', 'LED and emergency lighting design', 'Backup power sizing (generators, UPS systems)', 'Cable routing and conduit planning to avoid conflicts', 'Compliance verification against Saudi Electrical Code (SBC)'] },
      { category: 'Installation Phase', items: ['Main switchboards and distribution panel setup', 'Power distribution wiring and terminations', 'Interior, exterior, and emergency lighting fixtures', 'Backup power systems (generators, UPS, ATS switches)', 'Safety disconnects and surge/circuit protection', 'System grounding and earthing installation'] },
      { category: 'Testing & Certification Phase', items: ['Load testing of key equipment', 'Insulation resistance testing', 'Earth continuity and ground path testing', 'Comprehensive system load testing', 'Regulatory compliance certification', 'As-built electrical drawings delivery'] },
      { category: 'Maintenance & Support Phase', items: ['Preventive maintenance contracts', 'Emergency troubleshooting and repair services', 'Load expansion planning and system upgrades', 'Annual safety inspections and recertifications'] }
    ],
    includedAr: [
      { category: 'مرحلة التصميم والهندسة', items: ['تحليل وحسابات الأحمال الكهربائية', 'مخطط نظام توزيع الطاقة', 'تصميم ومواصفات اللوحات الرئيسية والفرعية', 'تصميم إضاءة LED وإضاءة الطوارئ', 'تحديد حجم الطاقة الاحتياطية (المولدات وأنظمة UPS)', 'تخطيط مسارات الكابلات والأنابيب لتجنب التعارض', 'التحقق من الامتثال للكود السعودي للكهرباء (SBC)'] },
      { category: 'مرحلة التركيب', items: ['تركيب لوحات المفاتيح الرئيسية ولوحات التوزيع', 'تمديد وتوصيل كابلات توزيع الطاقة', 'تركيبات الإضاءة الداخلية والخارجية وإضاءة الطوارئ', 'تركيب أنظمة الطاقة الاحتياطية (المولدات، UPS، ومفاتيح ATS)', 'تركيب قواطع الأمان والحماية من التغير المفاجئ في التيار', 'تركيب نظام التأريض الأرضي'] },
      { category: 'مرحلة الاختبار والاعتماد', items: ['اختبار أحمال المعدات الرئيسية', 'اختبار مقاومة العزل', 'اختبار استمرارية التأريض والمسار الأرضي', 'اختبار أحمال النظام الشامل', 'شهادة الامتثال التنظيمي والرموز', 'تسليم الرسومات الكهربائية المنفذة (As-built)'] },
      { category: 'مرحلة الصيانة والدعم', items: ['عقود الصيانة الوقائية', 'خدمات استكشاف الأعطال الطارئة وإصلاحها', 'تخطيط توسيع الأحمال وترقية الأنظمة', 'عمليات الفحص السنوية للسلامة وإعادة الاعتماد'] }
    ],
    processEn: [
      { step: 'Step 1: Load Analysis (Week 1)', details: 'Calculate total load across all systems, specify main service size, and plan 20% expansion buffer.' },
      { step: 'Step 2: System Design (Week 2-3)', details: 'Design power network, size panels and protection, and coordinate routing paths with civil and HVAC teams.' },
      { step: 'Step 3: Installation (Week 4-8)', details: 'Install main switchboards, lay conduits and pull distribution cables, wire backup systems and lighting.' },
      { step: 'Step 4: Testing (Week 9)', details: 'Test insulation resistance, inspect earthing paths, load test individual circuits, and verify safety controls.' },
      { step: 'Step 5: Certification (Week 10)', details: 'Deliver compliance documentation, secure municipal permits, train client operators, and supply as-built plans.' }
    ],
    processAr: [
      { step: 'الخطوة 1: تحليل الأحمال (الأسبوع 1)', details: 'حساب الحمل الإجمالي لجميع الأنظمة، تحديد حجم الخدمة الرئيسية، وتخطيط احتياطي توسع بنسبة 20٪.' },
      { step: 'الخطوة 2: تصميم النظام (الأسبوع 2-3)', details: 'تصميم شبكة الطاقة، تحديد حجم اللوحات والحمايات، وتنسيق مسارات التمديد مع الفرق المدنية والتكييف.' },
      { step: 'الخطوة 3: التركيب (الأسبوع 4-8)', details: 'تركيب لوحات المفاتيح الرئيسية، تمديد الأنابيب وسحب كابلات التوزيع، وتوصيل أنظمة الإضاءة والطاقة الاحتياطية.' },
      { step: 'الخطوة 4: الاختبار (الأسبوع 9)', details: 'اختبار مقاومة العزل، فحص مسارات التأريض، اختبار أحمال الدوائر الفردية، والتحقق من أجهزة الأمان.' },
      { step: 'الخطوة 5: الاعتماد (الأسبوع 10)', details: 'تسليم وثائق الامتثال، تأمين التصاريح البلدية، تدريب مشغلي العميل، وتقديم المخططات المنفذة.' }
    ],
    benefitsEn: [
      { title: 'SBC Code Compliance', desc: 'All electrical designs strictly adhere to Saudi Building Codes (SBC 401) for safe operations and code clearances.' },
      { title: 'Backup Power Security', desc: 'Seamless integration of automatic transfer switches (ATS), backup generators, and UPS systems protects critical hardware.' },
      { title: 'Energy System Optimization', desc: 'Power factor optimization, efficient LED controls, and high-performance panel design lower utility costs.' }
    ],
    benefitsAr: [
      { title: 'الامتثال لكود البناء السعودي SBC', desc: 'تلتزم جميع التصاميم الكهربائية بصرامة بكود البناء السعودي (SBC 401) لضمان سلامة التشغيل والتراخيص.' },
      { title: 'أمن الطاقة الاحتياطية', desc: 'تكامل سلس لمفاتيح التحويل التلقائي (ATS)، والمولدات الاحتياطية، وأنظمة UPS لحماية المعدات الحيوية.' },
      { title: 'تحسين كفاءة الطاقة', desc: 'تحسين معامل القدرة، ضوابط إضاءة LED الموفرة، وتصميم اللوحات عالي الأداء يقلل تكاليف الاستهلاك.' }
    ],
    pricingEn: 'Tailored quotes based on design classification. Standard Systems cover core distributions, Advanced Systems add energy management, and Premium Systems integrate full building automation/BMS.',
    pricingAr: 'عروض أسعار مخصصة بناءً على تصنيف التصميم. تغطي الأنظمة القياسية التوزيعات الأساسية، وتضيف الأنظمة المتقدمة إدارة الطاقة، وتدمج الأنظمة المتميزة التحكم الكامل بالبناء/BMS.',
    whenEn: ['Constructing new office, residential, or commercial buildings', 'Upgrading power capacity for heavy industrial workshop machinery', 'Installing automated safety systems and generator backups', 'Resolving electrical safety and local regulatory code failures'],
    whenAr: ['إنشاء مباني مكتبية أو سكنية أو تجارية جديدة', 'ترقية قدرة الطاقة للآلات الثقيلة في الورش والمصانع', 'تركيب أنظمة السلامة المؤتمتة ومولدات الطاقة الاحتياطية', 'حل مشكلات السلامة الكهربائية وفشل الامتثال للأكواد المحلية']
  },
  {
    id: 'hvac',
    labelEn: 'HVAC Systems',
    labelAr: 'أنظمة التكييف والتهوية',
    icon: '❄️',
    titleEn: 'HVAC Systems: Energy-Efficient Climate Control',
    titleAr: 'أنظمة التكييف: تحكم بالمناخ موفر للطاقة',
    overviewEn: "We design and install climate control systems optimized for Saudi Arabia's extreme heat. Our HVAC division creates comfortable, energy-efficient environments using central AC, VRF systems, and advanced controls.",
    overviewAr: 'نحن نصمم ونركب أنظمة التحكم بالمناخ المحسنة للحرارة الشديدة في المملكة العربية السعودية. يخلق قسم التكييف لدينا بيئات مريحة وموفرة للطاقة باستخدام التكييف المركزي وأنظمة VRF والتحكم المتقدم.',
    includedEn: [
      { category: 'Design & Engineering Phase', items: ['Thermal load calculations (cooling requirements)', 'Equipment type evaluation (Central AC vs VRF vs Split)', 'Ductwork design and airflow routing plans', 'BMS-integrated thermostat and damper planning', 'Compliance verification against Saudi Building Code (SBC 501)'] },
      { category: 'Installation Phase', items: ['Outdoor condenser unit placement and stabilization', 'Indoor evaporator unit mounting (ceiling cassettes, wall units)', 'In-house custom sheet metal ductwork fabrication and installation', 'Refrigerant copper line routing, brazing, and insulation', 'Condensate drainage system installation'] },
      { category: 'Testing & Optimization Phase', items: ['System startup, leak testing, and evacuation', 'Refrigerant charging and pressure verification', 'Airflow balancing across diffusers and grills', 'Thermostat controls programming and sensor testing', 'Energy consumption baseline configuration'] },
      { category: 'Maintenance & Support Phase', items: ['Scheduled quarterly maintenance programs', 'Filter cleaning and replacement', 'Refrigerant pressure checks and leak prevention', 'Evaporator and condenser coil cleaning'] }
    ],
    includedAr: [
      { category: 'مرحلة التصميم والهندسة', items: ['حسابات الأحمال الحرارية (متطلبات التبريد)', 'تقييم أنواع المعدات (تكييف مركزي، VRF، أو مقسم)', 'تصميم قنوات الهواء ومخططات مسارات تدفق الهواء', 'تخطيط منظمات الحرارة وخانقات الهواء المتكاملة مع BMS', 'التحقق من الامتثال لكود البناء السعودي (SBC 501)'] },
      { category: 'مرحلة التركيب', items: ['تركيب وتثبيت وحدات التكثيف الخارجية', 'تركيب وحدات التبخير الداخلية (كاسيت سقفي، وحدات جدارية)', 'تصنيع وتركيب مجاري الهواء المعدنية المخصصة داخلياً', 'تمديد، لحام وعزل أنابيب النحاس لخطوط التبريد', 'تركيب نظام تصريف مياه التكثيف'] },
      { category: 'مرحلة الاختبار والتحسين', items: ['بدء تشغيل النظام، واختبار التسرب، وتفريغ الهواء', 'شحن مركب التبريد والتحقق من الضغوط', 'موازنة تدفق الهواء عبر ناشرات الهواء والفتحات', 'برمجة ضوابط منظم الحرارة واختبار المستشعرات', 'تكوين خط أساس استهلاك الطاقة'] },
      { category: 'مرحلة الصيانة والدعم', items: ['برامج الصيانة الدورية الربع سنوية المجدولة', 'تنظيف الفلاتر واستبدالها', 'فحص ضغوط مركب التبريد ومنع التسرب', 'تنظيف ملفات المبخر والمكثف'] }
    ],
    processEn: [
      { step: 'Step 1: Thermal Load Analysis (Week 1)', details: 'Evaluate building size, occupancy, solar heat gain, and insulation to calculate total cooling load requirements.' },
      { step: 'Step 2: Equipment Specification (Week 2)', details: 'Select equipment (chilled water, VRF, package, split) matched to peak 50°C summer conditions.' },
      { step: 'Step 3: Duct & Piping Layout (Week 3)', details: 'Coordinate layout plans with construction team to route ducts and refrigerant pipes without structural interference.' },
      { step: 'Step 4: Installation & Assembly (Week 4-10)', details: 'Stabilize units, install custom fabricated sheet metal ducts, pull refrigerant lines, and wire controls.' },
      { step: 'Step 5: Balancing & Handover (Week 11)', details: 'Conduct flow balancing, pressure test piping, verify smart thermostats, and train client operators.' }
    ],
    processAr: [
      { step: 'الخطوة 1: حمل الحمل الحراري (الأسبوع 1)', details: 'تقييم حجم المبنى، الإشغال، الكسب الحراري الشمسي، والعزل لحساب متطلبات حمل التبريد الإجمالي.' },
      { step: 'الخطوة 2: مواصفات المعدات (الأسبوع 2)', details: 'تحديد المعدات (مياه مبردة، VRF، بكج، أو سبليت) لتتوافق مع ذروة ظروف الصيف عند 50 درجة مئوية.' },
      { step: 'الخطوة 3: مخطط القنوات والأنابيب (الأسبوع 3)', details: 'تنسيق مخططات التصميم مع فريق البناء لتمرير مجاري الهواء وأنابيب التبريد دون تعارض إلكتروني.' },
      { step: 'الخطوة 4: التركيب والتجميع (الأسبوع 4-10)', details: 'تثبيت الوحدات، تركيب مجاري الهواء المعدنية المصنعة، تمديد خطوط النحاس، وتوصيل لوحات التحكم.' },
      { step: 'الخطوة 5: الموازنة والتسليم (الأسبوع 11)', details: 'إجراء موازنة تدفق الهواء، اختبار ضغط الأنابيب، التحقق من منظمات الحرارة الذكية، وتدريب المشغلين.' }
    ],
    benefitsEn: [
      { title: 'Built for 50°C Peak Heat', desc: 'Our systems are custom engineered to handle extreme Gulf summer peaks without efficiency degradation or compressor shutdowns.' },
      { title: '25-35% Utility Cost Reduction', desc: 'By integrating high-efficiency compressors and demand-controlled smart dampers, we reduce total system power consumption.' },
      { title: 'In-House Duct Fabrication', desc: 'In-house sheet metal workshops customize ducts instantly to avoid construction delays and ensure perfect seals.' }
    ],
    benefitsAr: [
      { title: 'مصمم لمقاومة ذروة الحرارة عند 50°م', desc: 'تم هندسة أنظمتنا خصيصاً للتعامل مع ذروة الصيف الخليجي الحار دون انخفاض الكفاءة أو توقف الضاغط.' },
      { title: 'تقليل فواتير الكهرباء بنسبة 25-35٪', desc: 'من خلال دمج ضواغط عالية الكفاءة وخانقات ذكية متحكم بها حسب الطلب، نقلل استهلاك الطاقة الكلي.' },
      { title: 'تصنيع مجاري الهواء داخلياً', desc: 'تقوم ورش العمل المعدنية الخاصة بنا بتصنيع مجاري الهواء فوراً لتجنب تأخيرات البناء وضمان الإغلاق المحكم.' }
    ],
    pricingEn: 'Flexible tiers suited to your facility size. Options range from Split systems for small zones, Variable Refrigerant Flow (VRF) for flexible multi-zone zoning, to large Central Chilled Water networks.',
    pricingAr: 'خيارات مرنة تناسب حجم منشأتك. تتراوح الخيارات بين أنظمة سبليت للمناطق الصغيرة، وأنظمة VRF للتقسيم المتعدد المرن، إلى شبكات المياه المبردة المركزية الضخمة.',
    whenEn: ['Constructing new commercial centers, factories, or villas', 'Replacing older, inefficient HVAC units causing high utility bills', 'Upgrading industrial facility ventilation and dust control networks', 'Resolving comfort complaints (hot spots, stagnant air)'],
    whenAr: ['إنشاء مراكز تجارية أو مصانع أو فلل جديدة', 'استبدال وحدات التكييف القديمة غير الفعالة التي تسبب فواتير طاقة عالية', 'ترقية تهوية المنشآت الصناعية وشبكات التحكم في الغبار', 'حل شكاوى الراحة والمناخ (بقع حارة، ركود الهواء)']
  },
  {
    id: 'sanitary',
    labelEn: 'Sanitary & Plumbing',
    labelAr: 'السباكة والأنظمة الصحية',
    icon: '🔧',
    titleEn: 'Sanitary & Plumbing: Complete Water Infrastructure',
    titleAr: 'السباكة والأنظمة الصحية: بنية تحتية متكاملة للمياه',
    overviewEn: 'We design and install complete plumbing systems that deliver fresh water reliably and remove wastewater safely. Our sanitary division handles all aspects of building water infrastructure.',
    overviewAr: 'نحن نصمم ونركب أنظمة سباكة كاملة توفر مياهاً عذبة بموثوقية وتزيل مياه الصرف بأمان. يتعامل قسم السباكة لدينا مع كل جانب من جوانب البنية التحتية للمياه في المباني.',
    includedEn: [
      { category: 'Design & Engineering Phase', items: ['Water demand calculations and pipe sizing', 'Gravity-fed drainage and vent stack design', 'Grease interceptor/grease trap design for kitchens', 'Hot water circulation routing and pump sizing', 'SBC 701 compliance verification and permits'] },
      { category: 'Installation Phase', items: ['Main supply line and building water meter setup', 'Hot and cold water distribution pipes (copper, PEX, PPR)', 'Sanitary wastewater drainage pipes and cleanouts', 'Fixture installation (sinks, toilets, showers, faucets)', 'Hot water heaters and circulation loops'] },
      { category: 'Testing & Commissioning Phase', items: ['Hydrostatic pressure testing of supply lines', 'Drain, waste, and vent (DWV) flow testing', 'Hot water temperature and balancing verification', 'Safety vacuum breakers and backflow preventers testing'] },
      { category: 'Maintenance & Support Phase', items: ['Preventive maintenance contracts', 'Emergency leak repair and drain clearing', 'Water conservation retrofitting and audits', 'Annual inspections of safety assemblies'] }
    ],
    includedAr: [
      { category: 'مرحلة التصميم والهندسة', items: ['حسابات الطلب على المياه وتحديد حجم الأنابيب', 'تصميم الصرف الصحي بالجاذبية وأنابيب التهوية', 'تصميم مصائد الدهون للمطابخ والمطاعم', 'مسارات تدوير المياه الساخنة وحجم المضخات', 'التحقق من الامتثال لكود SBC 701 والحصول على التصاريح'] },
      { category: 'مرحلة التركيب', items: ['تركيب خط الإمداد الرئيسي وعداد مياه المبنى', 'تمديد أنابيب توزيع المياه الباردة والساخنة (نحاس، PEX، PPR)', 'تمديد أنابيب صرف مياه الصرف الصحي وفتحات التنظيف', 'تركيب الأجهزة الصحية (المغاسل، المراحيض، الاستحمام، والصنابير)', 'تركيب سخانات المياه وحلقات التدوير'] },
      { category: 'مرحلة الاختبار والتشغيل', items: ['الاختبار الهيدروستاتيكي لضغط أنابيب المياه', 'اختبار تدفق الصرف الصحي والفضلات والتهوية (DWV)', 'التحقق من درجة حرارة وتوازن المياه الساخنة', 'اختبار قواطع الفراغ الآمنة وأجهزة منع التدفق العكسي'] },
      { category: 'مرحلة الصيانة والدعم', items: ['عقود الصيانة الوقائية', 'إصلاح التسريبات الطارئة وتسليك المجاري', 'تدقيق المياه وتركيب أجهزة ترشيد الاستهلاك', 'عمليات الفحص السنوي لتجهيزات الأمان والسلامة'] }
    ],
    processEn: [
      { step: 'Step 1: Demand Assessment (Week 1)', details: 'Count fixtures, calculate total water flow rate demand, design hot water delivery, and plan septic/grease requirements.' },
      { step: 'Step 2: Flow Line Routing (Week 2-3)', details: 'Layout piping runs, check angles to ensure gravity drainage, and coordinate penetrations with structural team.' },
      { step: 'Step 3: Core Infrastructure (Week 4-7)', details: 'Lay main supply and drainage lines, mount riser pipes, and install grease interceptors or water heaters.' },
      { step: 'Step 4: Fixture Connection (Week 8)', details: 'Mount and seal toilets, sinks, faucets, and showers, completing all visible trim elements.' },
      { step: 'Step 5: Pressure Testing (Week 9)', details: 'Conduct pressure tests on water supply loops, inspect drains for leaks, and certify backflow systems.' }
    ],
    processAr: [
      { step: 'الخطوة 1: تقييم الطلب (الأسبوع 1)', details: 'حساب عدد التجهيزات والتدفق الإجمالي للمياه، تصميم توصيل المياه الساخنة، وتحديد متطلبات الصرف ومصائد الدهون.' },
      { step: 'الخطوة 2: مسارات الأنابيب (الأسبوع 2-3)', details: 'مخطط تمديد الأنابيب، فحص زوايا الميول لضمان الصرف بالجاذبية، وتنسيق الفتحات مع الفريق الإنشائي.' },
      { step: 'الخطوة 3: البنية التحتية الأساسية (الأسبوع 4-7)', details: 'تمديد خطوط التغذية والصرف الرئيسية، تركيب القوائم الرأسية، وتركيب مصائد الدهون أو سخانات المياه.' },
      { step: 'الخطوة 4: توصيل التجهيزات (الأسبوع 8)', details: 'تركيب وتثبيت المراحيض والمغاسل والصنابير والاستحمام، وإكمال جميع إكسسوارات التشطيب.' },
      { step: 'الخطوة 5: اختبار الضغط (الأسبوع 9)', details: 'إجراء اختبارات الضغط على شبكات المياه، فحص خطوط الصرف للتأكد من عدم وجود تسريب، واعتماد أنظمة التدفق العكسي.' }
    ],
    benefitsEn: [
      { title: 'Zero Leak Guarantee', desc: 'Rigorous hydrostatic pressure testing on PEX/PPR water lines ensures leaks are detected and fixed before walls are closed.' },
      { title: 'Water-Saving Designs', desc: 'Integrated water-efficient fixtures and optional greywater recycling designs lower consumption.' },
      { title: 'Odors & Blockage Prevention', desc: 'Properly engineered vent systems maintain sewer pressures, preventing trap siphonage and gas backflow.' }
    ],
    benefitsAr: [
      { title: 'ضمان عدم التسريب', desc: 'يضمن الاختبار الهيدروستاتيكي الصارم لخطوط المياه PEX/PPR اكتشاف التسريبات وإصلاحها قبل إغلاق الجدران.' },
      { title: 'تصاميم موفرة للمياه', desc: 'تدمج التركيبات الموفرة للمياه وتصاميم إعادة تدوير المياه الرمادية الاختيارية لتقليل الاستهلاك.' },
      { title: 'منع الروائح والانسدادات', desc: 'تحافظ أنظمة التهوية المصممة بشكل صحيح على ضغوط الصرف، مما يمنع شفط المصائد وعودة غازات الصرف.' }
    ],
    pricingEn: 'Quotes calculated dynamically based on total fixture count, piping length, and equipment specification (boilers, pumps, filtration). Detailed estimates delivered within 48 hours of site assessment.',
    pricingAr: 'يتم احتساب عروض الأسعار بناءً على العدد الإجمالي للتجهيزات، وطول الأنابيب، ومواصفات المعدات (الغلايات، المضخات، الفلترة). تسلم التقديرات خلال 48 ساعة من تقييم الموقع.',
    whenEn: ['Constructing new commercial complexes or multi-story buildings', 'Upgrading industrial piping networks or laboratory water lines', 'Experiencing chronic low water pressure or recurring drain backups', 'Renovating kitchens or bathrooms requiring line relocation'],
    whenAr: ['إنشاء مجمعات تجارية جديدة أو مباني متعددة الطوابق', 'ترقية شبكات الأنابيب الصناعية أو خطوط مياه المختبرات', 'المعاناة من انخفاض ضغط المياه المزمن أو انسدادات الصرف المتكررة', 'تجديد الحمامات أو المطابخ التي تتطلب إعادة تمديد خطوط الأنابيب']
  },
  {
    id: 'waterproofing',
    labelEn: 'Waterproofing',
    labelAr: 'العزل المائي والطلاءات',
    icon: '🛡️',
    titleEn: 'Waterproofing: Long-Term Structural Protection',
    titleAr: 'العزل المائي: حماية هيكلية طويلة المدى',
    overviewEn: 'We protect your structures from water damage using proven membrane and coating systems. Our waterproofing division specializes in foundations, roofs, wet areas, and specialized applications—ensuring structures remain dry and protected for decades.',
    overviewAr: 'نحن نحمي هياكل المباني من أضرار المياه باستخدام أنظمة الأغشية والطلاءات المثبتة. يتخصص قسم العزل لدينا في الأساسات والأسطح والمناطق الرطبة والتطبيقات الخاصة لضمان بقائها جافة وحمايتها لعقود.',
    includedEn: [
      { category: 'Assessment & Design Phase', items: ['Visual inspection and moisture mapping', 'Substrate check (compressive strength, expansion joints)', 'Waterproofing membrane system selection (TPO vs Liquid vs Bituminous)', 'Material compatibility and detail engineering', 'Warranty structure planning (10-15 year durations)'] },
      { category: 'Substrate Preparation Phase', items: ['Concrete substrate cleaning (dust, oil, mold removal)', 'Surface grinding and profiling for adhesion', 'Structural crack repair and cove sealant application', 'Moisture level checks before membrane application'] },
      { category: 'Application Phase', items: ['Bituminous sheet membranes hot-applied (foundation walls)', 'Liquid-applied polyurethane coating (seamless roof coating)', 'TPO/PVC single-ply membrane roofing (heat-welded seams)', 'Cementitious polymer crystalline coating (basements & water tanks)', 'Expansion joint expansion sealants and backer rods'] },
      { category: 'Quality Verification Phase', items: ['Flood testing (48-hour water test on flat roofs/wet areas)', 'Holiday testing (electronic leak/defect scanning on coatings)', 'Detailed warranty registration and inspection certificates'] }
    ],
    includedAr: [
      { category: 'مرحلة التقييم والتصميم', items: ['الفحص البصري وتخطيط مستويات الرطوبة', 'فحص السطح الخرساني (قوة الضغط، فواصل التمدد)', 'اختيار نظام العزل المائي (TPO، سائل، أو بيتوميني)', 'توافق المواد وهندسة التفاصيل والزوايا', 'تخطيط هيكل الضمان (فترات تتراوح من 10 إلى 15 سنة)'] },
      { category: 'مرحلة تجهيز السطح', items: ['تنظيف السطح الخرساني (إزالة الأتربة، الزيوت، والعفن)', 'جلي وصنفرة السطح لضمان الالتصاق والتماسك', 'إصلاح الشقوق الإنشائية ووضع سيلنت عازل للزوايا', 'فحص مستويات الرطوبة قبل وضع الغشاء العازل'] },
      { category: 'مرحلة التطبيق والتنفيذ', items: ['تطبيق لفائف البيتومين عزل حراري/مائي (جدران الأساسات)', 'تطبيق طلاء البولي يوريثان السائل (عزل أسطح خالي من الفواصل)', 'عزل أسطح بأغشية TPO/PVC أحادية الطبقة (لحام حراري للفواصل)', 'عزل أسمنتي متبلور بوليمري (الأقبية وخزانات المياه)', 'تركيب حشوات فواصل التمدد وسدادات الفواصل المرنة'] },
      { category: 'مرحلة التحقق من الجودة', items: ['اختبار الغمر بالماء (اختبار غمر لمدة 48 ساعة للأسطح والمناطق الرطبة)', 'الاختبار الإلكتروني Defect/Holiday scan (كشف الشقوق الدقيقة في الطلاء)', 'تسجيل الضمان الرسمي وشهادات الفحص المعتمدة'] }
    ],
    processEn: [
      { step: 'Step 1: Structural Assessment (Day 1-2)', details: 'Inspect concrete, run moisture tests, map crack locations, and select appropriate system (membrane vs liquid).' },
      { step: 'Step 2: Substrate Profiling (Day 3-5)', details: 'Grind concrete smooth, fill voids, repair cracks, inject polyurethane grouting, and prime.' },
      { step: 'Step 3: Coating/Membrane Laying (Day 6-9)', details: 'Roll sheet membranes or spray/apply liquid coatings in layers, welding seams to form a seamless barrier.' },
      { step: 'Step 4: Joint Sealing & Flashing (Day 10)', details: 'Seal expansion joints, install edge flashing, and reinforce penetrations around conduits and drains.' },
      { step: 'Step 5: Testing & Verification (Day 11-12)', details: 'Conduct 48-hour flood tests, perform holiday tests, check adhesion, and issue warranty certificates.' }
    ],
    processAr: [
      { step: 'الخطوة 1: تقييم الهيكل (اليوم 1-2)', details: 'فحص الخرسانة، إجراء اختبارات الرطوبة، رسم خريطة للشقوق، واختيار النظام المناسب (لفائف أو سائل).' },
      { step: 'الخطوة 2: تجهيز السطح (اليوم 3-5)', details: 'جلي السطح الخرساني لتنعيمه، ملء الفراغات، إصلاح الشقوق، حقن البولي يوريثان، ووضع الأساس.' },
      { step: 'الخطوة 3: وضع الغشاء/الطلاء (اليوم 6-9)', details: 'فرد لفائف العزل أو رش وتطبيق الطلاء السائل على طبقات، ولحام الفواصل لتشكيل حاجز مانع.' },
      { step: 'الخطوة 4: معالجة الفواصل (اليوم 10)', details: 'عزل فواصل التمدد، تركيب زوايا الألمنيوم، وتعزيز العزل حول الأنابيب ومصارف المياه.' },
      { step: 'الخطوة 5: الاختبار والاعتماد (اليوم 11-12)', details: 'إجراء اختبار الغمر بالماء لمدة 48 ساعة، إجراء الفحص الإلكتروني، التحقق من التماسك، وإصدار الضمان.' }
    ],
    benefitsEn: [
      { title: 'Prevent Structural Rot', desc: 'Water ingress corrodes concrete rebar. Our membranes stop moisture, protecting structural integrity and preventing building decay.' },
      { title: 'Mold and Algae Protection', desc: 'Eliminating moisture buildup prevents toxic black mold, surface discoloration, and paint failure in wet areas.' },
      { title: '10 to 15-Year Performance Warranties', desc: 'We stand behind our professional waterproofing systems with structured warranties backed by premium materials.' }
    ],
    benefitsAr: [
      { title: 'منع تآكل الهيكل والحديد', desc: 'تسرب المياه يصدئ حديد التسليح في الخرسانة. تمنع الأغشية لدينا الرطوبة، وتحمي سلامة البناء وتمنع التدهور.' },
      { title: 'الحماية من العفن والطحالب', desc: 'يمنع التخلص من تراكم الرطوبة تشكل العفن الأسود السام، وتغير لون الأسطح، وتلف الدهانات في المناطق الرطبة.' },
      { title: 'ضمانات أداء من 10 إلى 15 سنة', desc: 'نحن نقف خلف أنظمة العزل المائي الاحترافية لدينا بضمانات رسمية مدعومة بمواد متميزة.' }
    ],
    pricingEn: 'Pricing calculated on square-meter coverage, material selection (bituminous sheets vs high-performance polyurethane/TPO), and substrate preparation needs. Warranty periods included.',
    pricingAr: 'يتم احتساب السعر بناءً على مساحة التغطية بالمتر المربع، واختيار المواد (لفائف بيتومينية مقابل بولي يوريثان/TPO عالي الأداء)، وتجهيز السطح الخرساني. فترات الضمان متضمنة.',
    whenEn: ['Protecting deep foundations during basement excavation', 'Sealing flat concrete roofs against seasonal winter rains', 'Waterproofing high-risk interior wet areas (bathrooms, commercial kitchens)', 'Lining potable water storage reservoirs or swimming pools'],
    whenAr: ['حماية الأساسات العميقة أثناء حفر الأقبية', 'عزل الأسطح الخرسانية المستوية ضد أمطار الشتاء الموسمية', 'عزل المناطق الرطبة الداخلية عالية الخطورة (الحمامات، المطابخ التجارية)', 'تبطين وعزل خزانات مياه الشرب أو حمامات السباحة']
  },
  {
    id: 'fire',
    labelEn: 'Fire Protection',
    labelAr: 'أنظمة إطفاء ومكافحة الحريق',
    icon: '🔥',
    titleEn: 'Fire Protection: Complete Life Safety Systems',
    titleAr: 'أنظمة إطفاء الحريق: أنظمة سلامة الأرواح المتكاملة',
    overviewEn: 'We engineer complete fire protection systems that save lives and protect assets. Our fire protection division designs, installs, tests, and maintains systems that meet Saudi Arabian code requirements and provide comprehensive building safety.',
    overviewAr: 'نحن نهندس أنظمة مكافحة حرائق كاملة تحمي الأرواح والأصول. يصمم قسم الإطفاء لدينا، ويركب ويختبر ويحافظ على أنظمة تلبي متطلبات الكود السعودي وتوفر الأمان الشامل.',
    includedEn: [
      { category: 'Design & Engineering Phase', items: ['Saudi Building Code (SBC 801) life safety code review', 'Occupancy hazard hazard analysis and risk classification', 'Wet/dry/pre-action sprinkler system engineering design', 'Automatic fire alarm and intelligent detection system layout', 'Standpipe systems and fire hydrant placement design', 'Water supply pressure assessments and dedicated fire pump sizing'] },
      { category: 'Installation Phase', items: ['Fire main piping and automatic branch sprinklers setup', 'Smoke, heat, and flame detector installations', 'Fire alarm control panels (FACP), notification horns, & strobes', 'Clean agent/gas suppression systems installation (FM200, CO2)', 'Fire hose reels, cabinets, and exterior hydrants mounting'] },
      { category: 'Testing & Certification Phase', items: ['Hydrostatic pressure testing of piping network', 'Flow rate and alarm signal transmission verification', 'Control panel safety logic and BMS shutdown interfaces testing', 'Fire pump automatic startup and flow balancing', 'Civil Defense compliance documentation and certificates'] },
      { category: 'Maintenance & Compliance Phase', items: ['Annual fire safety system testing and recertification', 'Quarterly inspections and testing of valves, alarms, and pumps', 'Detector sensitivity audits and calibration', '24/7 monitoring services and emergency repair support'] }
    ],
    includedAr: [
      { category: 'مرحلة التصميم والهندسة', items: ['مراجعة كود سلامة الأرواح لكود البناء السعودي (SBC 801)', 'تحليل مخاطر الإشغال وتصنيف مستوى الخطر للمبنى', 'هندسة وتصميم أنظمة الرشاشات (الرطبة، الجافة، أو ما قبل التشغيل)', 'مخطط نظام الإنذار التلقائي والكشف الذكي عن الحريق', 'تصميم أنظمة الأنابيب القائمة وصمامات صنابير الحريق', 'تقييم ضغط إمداد المياه وتحديد حجم مضخات الحريق المخصصة'] },
      { category: 'مرحلة التركيب', items: ['تركيب شبكة الأنابيب الرئيسية والرشاشات الفرعية التلقائية', 'تركيب أجهزة الكشف عن الدخان والحرارة واللهب', 'تركيب لوحات التحكم بالإنذار (FACP)، أبواق التنبيه، والضوء الوميضي', 'تركيب أنظمة إخماد الحريق بالغاز/العامل النظيف (FM200, CO2)', 'تركيب بكرات خراطيم الحريق، الخزانات، وصنابير المياه الخارجية'] },
      { category: 'مرحلة الاختبار والاعتماد', items: ['الاخبتار الهيدروستاتيكي لضغط شبكة الأنابيب', 'التحقق من معدل تدفق المياه ونقل إشارات الإنذار', 'اختبار لوحة التحكم وربطها بإغلاق أنظمة التكييف والمصاعد BMS', 'اختبار التشغيل التلقائي لمضخة الحريق وموازنة التدفق', 'وثائق الامتثال والحصول على شهادات الدفاع المدني'] },
      { category: 'مرحلة الصيانة والامتثال', items: ['الاختبار السنوي لأنظمة السلامة وإعادة الاعتماد للدفاع المدني', 'عمليات الفحص والخدمة ربع السنوية للمحابس والإنذارات والمضخات', 'تدقيق ومعايرة حساسية أجهزة كشف الدخان والحرارة', 'عقود المراقبة على مدار الساعة 24/7 وخدمات الإصلاح الطارئة'] }
    ],
    processEn: [
      { step: 'Step 1: Risk Assessment (Week 1)', details: 'Classify occupancy hazard level, evaluate municipal water supply flow rate, and check civil defense code requirements.' },
      { step: 'Step 2: Safety Engineering (Week 2-3)', details: 'Design sprinkler pipe diameters, map alarm sensor grids, coordinate BMS integrations, and specify pumps.' },
      { step: 'Step 3: Pipeline & Cable Laying (Week 4-11)', details: 'Assemble heavy carbon steel mains, thread sprinkler pipes, pull fire-resistant alarm cables, and install detectors.' },
      { step: 'Step 4: System Integration (Week 12-13)', details: 'Install pump house assemblies, place FM200 cylinders, wire control panel (FACP), and configure BMS alarm actions.' },
      { step: 'Step 5: Civil Defense Audit (Week 14)', details: 'Conduct full pressure flow tests, perform alarm check inspections, secure compliance stamps, and hand over.' }
    ],
    processAr: [
      { step: 'الخطوة 1: تقييم المخاطر (الأسبوع 1)', details: 'تصنيف مستوى خطر المبنى، تقييم معدل تدفق مياه البلدية، ومراجعة متطلبات الدفاع المدني.' },
      { step: 'الخطوة 2: الهندسة والسلامة (الأسبوع 2-3)', details: 'تصميم أقطار أنابيب الرشاشات، توزيع أجهزة كشف الإنذار، تنسيق ربط أنظمة BMS، وتحديد مواصفات المضخات.' },
      { step: 'الخطوة 3: التمديدات والشبكة (الأسبوع 4-11)', details: 'تجميع شبكة الأنابيب الفولاذية، تسنين أنابيب الرشاشات، تمديد كابلات الحريق المقاومة للحرارة، وتركيب الكواشف.' },
      { step: 'الخطوة 4: تكامل النظام (الأسبوع 12-13)', details: 'تركيب وتجهيز غرفة مضخات الحريق، تثبيت أسطوانات FM200، توصيل لوحة FACP، وتهيئة برمجيات الإغلاق.' },
      { step: 'الخطوة 5: فحص الدفاع المدني (الأسبوع 14)', details: 'إجراء اختبار تدفق الضغط الكامل، فحص إشارات الإنذار، الحصول على اعتماد الدفاع المدني، والتسليم.' }
    ],
    benefitsEn: [
      { title: 'SBC 801 / Civil Defense Ready', desc: 'All engineering drawings and installations comply with Saudi Civil Defense and SBC requirements for rapid licensing approvals.' },
      { title: 'Prevent Accidental Discharges', desc: 'We install advanced Pre-Action and Clean Agent systems (FM200, Novec) to protect electrical and server rooms from water damage.' },
      { title: '24/7 Monitored Integrity', desc: 'Tamper switch monitoring, fire pump pressure sensors, and automated signals ensure the system is fully pressurized when needed.' }
    ],
    benefitsAr: [
      { title: 'جاهز لاعتماد الدفاع المدني SBC 801', desc: 'تتوافق جميع المخططات الهندسية والتركيبات تماماً مع متطلبات الدفاع المدني السعودي لتسهيل الترخيص.' },
      { title: 'منع تفريغ المياه العشوائي', desc: 'نركب أنظمة ما قبل التشغيل والغاز النظيف (FM200، CO2) المتطورة لحماية غرف الخوادم والكهرباء من تلف المياه.' },
      { title: 'مراقبة وحماية على مدار الساعة 24/7', desc: 'مراقبة مفاتيح العبث، ومستشعرات ضغط مضخات الحريق، والإشارات الآلية تضمن جهوزية النظام الكاملة عند الطوارئ.' }
    ],
    pricingEn: 'System costs depend on building risk classification (Light, Ordinary, Extra Hazard), total floor area, and municipal water pressure. Standard wet systems are most cost-effective; clean agent suppression systems add equipment costs.',
    pricingAr: 'تعتمد التكلفة على تصنيف خطورة المبنى (خفيف، عادي، أو خطر إضافي)، والمساحة الإجمالية، وضغط المياه. تعتبر الأنظمة الرطبة القياسية الأكثر اقتصادية، وتضيف أنظمة الإخماد بالغاز تكلفة المعدات.',
    whenEn: ['Securing mandatory Civil Defense licensing for commercial buildings', 'Installing FM200 clean agent systems in data centers and control rooms', 'Upgrading fire hose reel coverage and standpipe flow rate capacities', 'Fulfilling insurance safety audits and hazard regulations'],
    whenAr: ['تأمين تراخيص الدفاع المدني الإلزامية للمباني التجارية', 'تركيب أنظمة الغاز النظيف FM200 في مراكز البيانات وغرف التحكم', 'ترقية تغطية بكرات الخراطيم وقدرات تدفق شبكة المياه القائمة', 'تلبية متطلبات تدقيق السلامة لشركات التأمين ولوائح حماية المخاطر']
  }
];

const parseStep = (stepText: string) => {
  const parts = stepText.split(':');
  const phaseLabel = parts[0]?.trim() || '';
  let taskAndWeek = parts[1]?.trim() || '';
  
  let weekLabel = '';
  const weekMatch = taskAndWeek.match(/\(([^)]+)\)/);
  if (weekMatch) {
    weekLabel = weekMatch[1];
    taskAndWeek = taskAndWeek.replace(weekMatch[0], '').trim();
  }
  
  return {
    phase: phaseLabel,
    task: taskAndWeek,
    duration: weekLabel
  };
};

export default function ServicesPage() {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    // Set dynamic page title
    document.title = lang === 'ar' 
      ? "خدمات المقاولات والتصنيع في السعودية | نكست جن بيلد" 
      : "Construction & Fabrication Services in Saudi Arabia | NexGen Build";

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const allowed = SERVICES_DATA.map((s) => s.id);
      if (hash && allowed.includes(hash)) {
        setActiveTab(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (target && target.href && target.href.includes('/services#')) {
        const url = new URL(target.href);
        const targetHash = url.hash.replace('#', '');
        const allowed = SERVICES_DATA.map((s) => s.id);
        if (targetHash && allowed.includes(targetHash)) {
          setActiveTab(targetHash);
        }
      }
    };
    window.addEventListener('click', handleLinkClick);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('click', handleLinkClick);
    };
  }, [lang]);

  const selectTab = (tabId: string) => {
    setActiveTab(tabId);
    window.location.hash = tabId;
  };

  const activeService = SERVICES_DATA.find((s) => s.id === activeTab) || SERVICES_DATA[0];

  return (
    <main className="flex-grow">
      {/* HERO */}
      <section className="services-hero">
        <div className="services-hero-bg"></div>
        <div className="hero-infinite-grid" aria-hidden="true"></div>
        <InteractiveGrid />
        <div className="container services-hero-content">
          <div className="page-breadcrumb">
            <Link href="/" style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
              {t('Home', 'الرئيسية')}
            </Link> &nbsp;/&nbsp;
            <span>{t('Services', 'الخدمات')}</span>
          </div>
          <h1 dangerouslySetInnerHTML={{ __html: t('Complete Construction &amp; Fabrication Services', 'خدمات بناء وتصنيع متكاملة') }}></h1>
          <p>
            {t(
              'Six integrated service divisions delivering end-to-end solutions—from foundational construction through specialized industrial fabrication. One company. One team. One point of accountability.',
              'ستة أقسام خدمات متكاملة تقدم حلولاً شاملة — من بناء الأساسات إلى التصنيع الصناعي المتخصص. شركة واحدة. فريق واحد. نقطة مسؤولية واحدة.'
            )}
          </p>
          <div style={{ marginTop: '24px' }}>
            <Link className="btn-primary" href="/contact" style={{ display: 'inline-block', textDecoration: 'none' }}>
              {t('Start Your Project', 'ابدأ مشروعك')}
            </Link>
          </div>
        </div>
      </section>

      {/* WHY INTEGRATED SERVICES OVERVIEW */}
      <section className="services-overview-intro" style={{ padding: '90px 0', background: 'var(--white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 55px' }}>
            <div className="section-label">{t('Integrated Approach', 'النهج المتكامل')}</div>
            <h2 className="section-title" style={{ marginTop: '12px' }} dangerouslySetInnerHTML={{ __html: t('Why Integrated Services <span>Deliver Better Results</span>', 'لماذا تحقق الخدمات المتكاملة <span>نتائج أفضل</span>') }}></h2>
            <p className="section-subtitle" style={{ marginTop: '12px' }}>
              {t(
                'Traditional construction projects suffer from disconnected contractors working in silos. We eliminated that problem by building six specialized divisions that work as one integrated team.',
                'تعاني مشاريع البناء التقليدية من تشتت المقاولين المنعزلين. لقد لغينا هذه المشكلة ببناء ستة أقسام متخصصة تعمل كفريق واحد متكامل.'
              )}
            </p>
          </div>

          {/* Side-by-Side Comparison */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginBottom: '60px' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.02)', border: '1.5px solid rgba(239, 68, 68, 0.12)', borderRadius: '16px', padding: '32px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#b91c1c', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>⚠️</span> {t('Traditional Approach (Subcontractors)', 'النهج التقليدي (المقاولون من الباطن)')}
              </h3>
              <ul style={{ padding: 0, margin: 0, listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px', color: 'var(--gray-600)', lineHeight: '1.6' }}>
                <li>❌ {t('Electrical contractor designs power systems independently', 'مصمم الكهرباء يخطط شبكة الطاقة بشكل منفصل')}</li>
                <li>❌ {t('HVAC team sizes equipment without consulting other disciplines', 'فريق التكييف يحدد حجم المعدات دون استشارة بقية التخصصات')}</li>
                <li>❌ {t('Plumbing layout conflicts with structural elements mid-project', 'تعارض تمديدات السباكة مع العناصر الإنشائية يكتشف في منتصف العمل')}</li>
                <li>❌ {t('Three schedules + three quality standards = chaos', 'ثلاثة جداول زمنية + ثلاثة معايير جودة مختلفة = فوضى')}</li>
                <li>❌ {t('Change orders multiply; costs escalate; timelines slip', 'أوامر التغيير تتضاعف، التكاليف ترتفع، والجداول الزمنية تتأخر')}</li>
              </ul>
            </div>

            <div style={{ background: 'rgba(16, 185, 129, 0.02)', border: '1.5px solid rgba(16, 185, 129, 0.12)', borderRadius: '16px', padding: '32px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#047857', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>✓</span> {t('Our Integrated Approach', 'نهجنا المتكامل الموحد')}
              </h3>
              <ul style={{ padding: 0, margin: 0, listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px', color: 'var(--gray-600)', lineHeight: '1.6' }}>
                <li>✓ {t('All six divisions coordinate from day one', 'تنسيق متكامل لجميع الأقسام الستة من اليوم الأول')}</li>
                <li>✓ {t('Design compatibility checked before construction starts', 'التحقق من توافق التصميم قبل البدء بالبناء الفعلي')}</li>
                <li>✓ {t('Equipment routing planned together', 'تخطيط مسارات مجاري الهواء والأنابيب معاً')}</li>
                <li>✓ {t('One unified project schedule and project manager', 'جدول زمني موحد ومدير مشروع واحد للعمل بأكمله')}</li>
                <li>✓ {t('One consistent premium quality standard', 'معيار جودة متميز متسق عبر كافة المراحل')}</li>
              </ul>
            </div>
          </div>

          {/* Services Summary Table */}
          <div style={{ overflowX: 'auto', border: '1px solid var(--gray-200)', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textIndent: 0, borderColor: 'inherit', textAlign: lang === 'ar' ? 'right' : 'left' }}>
              <thead>
                <tr style={{ background: 'var(--cream)', borderBottom: '1.5px solid var(--gray-200)' }}>
                  <th style={{ padding: '16px 24px', fontWeight: 800, color: 'var(--navy)' }}>{t('Service Division', 'قسم الخدمة')}</th>
                  <th style={{ padding: '16px 24px', fontWeight: 800, color: 'var(--navy)' }}>{t('Core Scope', 'النطاق الأساسي')}</th>
                  <th style={{ padding: '16px 24px', fontWeight: 800, color: 'var(--navy)' }}>{t('Key Benefit', 'الميزة الرئيسية')}</th>
                  <th style={{ padding: '16px 24px', fontWeight: 800, color: 'var(--navy)' }}>{t('Best For', 'الأفضل لـ')}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'General Construction', scope: 'Structural work, concrete foundations, civil infrastructure', benefit: 'Complete site delivery without third-party subcontractors', best: 'Factories, warehouses, commercial complexes' },
                  { name: 'Electrical Systems', scope: 'Power design, panel distribution, LED lighting, generator backup', benefit: 'Rigorous SBC compliance + power factor optimization', best: 'All industrial and commercial building types' },
                  { name: 'HVAC Systems', scope: 'Climate control, centralized cooling, ductwork, VRF systems', benefit: 'Energy-efficient designs built for extreme Saudi heat', best: 'Offices, commercial spaces, high-heat workshops' },
                  { name: 'Sanitary & Plumbing', scope: 'Water supply lines, gravity drainage, fixtures, hot water loops', benefit: 'Leak-free guarantees and integrated pressure balancing', best: 'Residential, multi-story, and food facilities' },
                  { name: 'Waterproofing & Coatings', scope: 'Foundation membranes, seamless polyurethane roofs, wet area seals', benefit: 'Prevents structural concrete rot and costly water damage', best: 'Foundations, flat concrete roofs, water reservoirs' },
                  { name: 'Fire Protection Systems', scope: 'Sprinkler piping, smoke detectors, FM200 gas systems, pumps', benefit: 'Mandatory Saudi Civil Defense compliance and life safety', best: 'Required for all commercial and code compliance' }
                ].map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--gray-200)', background: idx % 2 === 0 ? 'white' : 'var(--cream)' }}>
                    <td style={{ padding: '16px 24px', fontWeight: 800, color: 'var(--navy)' }}>{t(row.name, row.name)}</td>
                    <td style={{ padding: '16px 24px', color: 'var(--gray-600)' }}>{t(row.scope, row.scope)}</td>
                    <td style={{ padding: '16px 24px', color: 'var(--gray-700)', fontWeight: 600 }}>{t(row.benefit, row.benefit)}</td>
                    <td style={{ padding: '16px 24px', color: 'var(--gray-600)' }}>{t(row.best, row.best)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="process-section" style={{ background: 'var(--cream)', padding: '90px 0' }} aria-labelledby="process-heading">
        <div className="container">
          <div className="process-section-header" style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div className="section-label process-section-eyebrow">{t('How We Work', 'كيف نعمل')}</div>
            <h2 id="process-heading" className="section-title process-section-title" dangerouslySetInnerHTML={{ __html: t('From Estimate to <span>Completion</span>', 'من عرض السعر إلى <span>التسليم</span>') }}></h2>
          </div>
          <div className="process-steps">
            <div className="process-step visible">
              <div className="step-num" aria-hidden="true">01</div>
              <div className="step-title">{t('Consultation', 'الاستشارة')}</div>
              <p className="step-desc">{t('Site visit, requirements mapping, and detailed itemized quote preparation.', 'زيارة الموقع وتحديد المتطلبات وإعداد عرض أسعار مفصل.')}</p>
            </div>
            <div className="process-step visible">
              <div className="step-num" aria-hidden="true">02</div>
              <div className="step-title">{t('Design & Layout', 'التصميم والمخططات')}</div>
              <p className="step-desc">{t('Engineering drawings, trade path routing, and design compatibility checks.', 'الرسومات الهندسية، تحديد مسارات التمديد، والتحقق من توافقها.')}</p>
            </div>
            <div className="process-step visible">
              <div className="step-num" aria-hidden="true">03</div>
              <div className="step-title">{t('Procurement & Setup', 'التجهيز والشراء')}</div>
              <p className="step-desc">{t('Sourcing materials, custom steel/duct fabrication, and mobilization of workforce.', 'شراء المواد، تصنيع مجاري الهواء والحديد المخصص، وتعبئة العمال.')}</p>
            </div>
            <div className="process-step visible">
              <div className="step-num" aria-hidden="true">04</div>
              <div className="step-title">{t('Installation', 'التنفيذ والتركيب')}</div>
              <p className="step-desc">{t('Synchronized division schedules deliver structural and systems installation safely.', 'فرق العمل المتزامنة تنفذ تركيب الهياكل والأنظمة بأمان.')}</p>
            </div>
            <div className="process-step visible">
              <div className="step-num" aria-hidden="true">05</div>
              <div className="step-title">{t('Commissioning', 'التشغيل والتسليم')}</div>
              <p className="step-desc">{t('Pressure flow testing, safety inspection clearances, as-built drawings and warranty.', 'اختبارات التدفق والضغط، تراخيص السلامة، تسليم المخططات والضمان.')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* NATIVE SCROLL ANCHORS FOR FOOTER LINKS */}
      <div style={{ position: 'relative' }}>
        {SERVICES_DATA.map((s) => (
          <div key={`anchor-${s.id}`} id={s.id} style={{ position: 'absolute', top: '-100px' }} aria-hidden="true" />
        ))}
      </div>

      {/* TABS SELECTOR */}
      <div className="services-tabs" style={{ background: 'var(--white)', borderBottom: '1px solid var(--gray-200)' }}>
        <div className="tabs-inner" style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '16px 24px', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
          {SERVICES_DATA.map((s) => (
            <button
              key={s.id}
              className={`tab-btn ${activeTab === s.id ? 'active' : ''}`}
              id={`tab-${s.id}`}
              onClick={() => selectTab(s.id)}
              style={{
                padding: '12px 24px',
                border: 'none',
                background: activeTab === s.id ? 'var(--navy)' : 'transparent',
                color: activeTab === s.id ? 'white' : 'var(--navy)',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '14.5px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                flexShrink: 0,
                whiteSpace: 'nowrap'
              }}
            >
              {t(s.labelEn, s.labelAr)}
            </button>
          ))}
        </div>
      </div>

      {/* DYNAMIC TAB CONTENT */}
      <div className="service-detail active" id={`detail-${activeService.id}`} style={{ padding: '80px 0', background: 'var(--white)' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            
            {/* Header / Overview */}
            <div style={{ borderBottom: '1px solid var(--gray-200)', paddingBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <span style={{ fontSize: '38px' }}>{activeService.icon}</span>
                <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 32px)', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
                  {t(activeService.titleEn, activeService.titleAr)}
                </h2>
              </div>
              <p style={{ fontSize: '15.5px', color: 'var(--gray-600)', lineHeight: '1.75', maxWidth: '850px', margin: 0 }}>
                {t(activeService.overviewEn, activeService.overviewAr)}
              </p>
            </div>

            {/* Scope details (What's Included) */}
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--navy)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>📝</span> {t("What's Included in This Service", 'ماذا تشمل هذه الخدمة')}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '30px' }}>
                {(lang === 'ar' ? activeService.includedAr : activeService.includedEn).map((cat, idx) => (
                  <div key={idx} style={{ background: 'var(--cream)', borderRadius: '12px', padding: '24px', border: '1px solid var(--gray-200)' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px', marginTop: 0 }}>
                      {cat.category}
                    </h4>
                    <ul style={{ padding: 0, margin: 0, listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'var(--gray-600)', lineHeight: '1.5' }}>
                      {cat.items.map((item, itemIdx) => (
                        <li key={itemIdx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                          <span style={{ color: 'var(--orange)' }}>•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Steps process grid */}
            <div className="premium-table-container">
              <div style={{ padding: '24px 24px 8px 24px', background: 'var(--cream)', borderBottom: '1px solid var(--gray-200)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--navy)', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>⚙️</span> {t('Execution Timeline Phases', 'مراحل التخطيط والتنفيذ')}
                </h3>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="premium-table">
                  <thead>
                    <tr>
                      <th style={{ width: '22%' }}>{t('Phase', 'المرحلة')}</th>
                      <th style={{ width: '22%' }}>{t('Timeline', 'الجدول الزمني')}</th>
                      <th style={{ width: '56%' }}>{t('Activities & Deliverables', 'الأنشطة والمهام')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(lang === 'ar' ? activeService.processAr : activeService.processEn).map((step, idx) => {
                      const parsed = parseStep(step.step);
                      return (
                        <tr key={idx}>
                          <td>
                            <span className="table-badge table-badge--navy" style={{ fontWeight: 800 }}>{parsed.phase}</span>
                          </td>
                          <td>
                            <span className="table-badge table-badge--orange" style={{ fontWeight: 800 }}>{parsed.duration || '-'}</span>
                          </td>
                          <td>
                            <strong style={{ display: 'block', color: 'var(--navy)', fontSize: '15px', marginBottom: '4px' }}>
                              {parsed.task}
                            </strong>
                            <span style={{ fontSize: '13.5px', color: 'var(--gray-600)' }}>{step.details}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Division benefits & When to Choose */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--navy)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>✓</span> {t('Benefits of Our Integrated Approach', 'فوائد نهجنا المتكامل للخدمة')}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {(lang === 'ar' ? activeService.benefitsAr : activeService.benefitsEn).map((b, idx) => (
                    <div key={idx}>
                      <strong style={{ fontSize: '14.5px', color: 'var(--navy)', display: 'block', marginBottom: '4px' }}>{b.title}</strong>
                      <span style={{ fontSize: '13px', color: 'var(--gray-600)', lineHeight: '1.6' }}>{b.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--navy)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>🎯</span> {t('When to Choose This Service', 'متى تختار هذه الخدمة')}
                </h3>
                <ul style={{ padding: 0, margin: 0, listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px', color: 'var(--gray-600)', lineHeight: '1.6' }}>
                  {(lang === 'ar' ? activeService.whenAr : activeService.whenEn).map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--orange)', fontWeight: 'bold' }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ marginTop: '30px', padding: '20px', background: 'var(--cream)', borderRadius: '12px', borderLeft: '4px solid var(--orange)' }}>
                  <h4 style={{ fontSize: '11px', fontWeight: 700, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px 0' }}>
                    {t('Pricing & Estimates', 'التسعير وتقدير التكلفة')}
                  </h4>
                  <p style={{ fontSize: '12.5px', color: 'var(--gray-700)', lineHeight: '1.5', margin: 0 }}>
                    {t(activeService.pricingEn, activeService.pricingAr)}
                  </p>
                  <Link href="/contact" style={{ display: 'inline-block', fontSize: '12px', fontWeight: 700, color: 'var(--orange)', marginTop: '12px', textDecoration: 'none' }}>
                    {t('Request Free Quote →', 'اطلب عرض سعر مجاني ←')}
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* DETAILED INTEGRATION COOPERATION GRID */}
      <section className="services-cooperation" style={{ padding: '90px 0', background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 55px' }}>
            <div className="section-label">{t('Inter-Trade Coordination', 'التنسيق بين التخصصات')}</div>
            <h2 className="section-title" style={{ marginTop: '12px' }} dangerouslySetInnerHTML={{ __html: t('How Our Services <span>Work Together</span>', 'كيف <span>تتكامل</span> خدماتنا معاً') }}></h2>
            <p className="section-subtitle" style={{ marginTop: '12px' }}>
              {t(
                'By managing civil, mechanical, electrical, and structural systems under one unified operations roof, we eliminate spatial conflicts on site.',
                'من خلال إدارة الأنظمة المدنية والميكانيكية والكهربائية والإنشائية تحت سقف عمليات موحد، نمنع حدوث أي تعارض في الفراغات بالموقع.'
              )}
            </p>
          </div>

          <div className="premium-table-container">
            <table className="premium-table">
              <thead>
                <tr>
                  <th style={{ width: '25%' }}>{t('Coordination Interface', 'نقطة التنسيق والربط')}</th>
                  <th style={{ width: '40%' }}>{t('Integration Benefit', 'الفائدة من التكامل')}</th>
                  <th style={{ width: '35%' }}>{t('Real-World Example', 'مثال من الواقع')}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Construction + Electrical', benefit: 'Conduit runs and panel positions planned during framing structural designs', example: 'No drilling through concrete beams or reinforcing rebar mid-project' },
                  { name: 'Construction + HVAC', benefit: 'Duct routing and ceiling spaces mapped with structural truss systems', example: 'HVAC ducts install without conflicting with framing layout' },
                  { name: 'Construction + Plumbing', benefit: 'Core penetrations mapped on concrete form layouts before pouring', example: 'Eliminates slab scanning and coring costs after concrete curing' },
                  { name: 'Electrical + HVAC', benefit: 'AC power demands sized and mapped to generator/backup circuits', example: 'Adequate breakers and cables are installed without secondary panel retrofits' },
                  { name: 'All Trades + Waterproofing', benefit: 'Penetrations sealed by structural waterproofing specialists', example: 'All roof/foundation sleeves are waterproofed during main membrane application' }
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 800, color: 'var(--navy)' }}>
                      {t(row.name, row.name)}
                    </td>
                    <td style={{ fontWeight: 600, color: 'var(--gray-700)' }}>
                      {t(row.benefit, row.benefit)}
                    </td>
                    <td style={{ color: 'var(--gray-600)' }}>
                      {t(row.example, row.example)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="faq-section" style={{ padding: '90px 0', background: 'var(--white)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div className="section-label">{t('FAQ', 'الأسئلة الشائعة')}</div>
            <h2 className="section-title" style={{ marginTop: '12px' }} dangerouslySetInnerHTML={{ __html: t('Frequently Asked <span>Questions</span>', 'الأسئلة <span>المتكررة</span>') }}></h2>
          </div>

          <Accordion
            items={[
              {
                qEn: 'Do I have to hire all six services, or can I use just one?',
                qAr: 'هل يجب علي استئجار جميع الخدمات الست، أم يمكنني استخدام خدمة واحدة فقط؟',
                aEn: 'You can hire individual services. We are happy to quote and execute single division scopes (e.g. only HVAC or only structural steel fabrication). However, combining services unlocks maximum coordination and removes conflict risks.',
                aAr: 'يمكنك استخدام خدمات فردية. نحن سعيدون لتقديم عروض أسعار وتنفيذ نطاقات أقسام فردية (مثل التكييف فقط أو تصنيع الحديد فقط). ومع ذلك، فإن الجمع بين الخدمات يحقق أقصى قدر من التنسيق.'
              },
              {
                qEn: "What's the difference between an integrated contractor and hiring multiple subcontractors?",
                qAr: 'ما الفرق بين المقاول المتكامل وتعيين مقاولين فرعيين متعددين؟',
                aEn: 'An integrated contractor manage all trades internally with shared accountability. Subcontractors work in isolation, which creates coordination finger-pointing, spatial clashes, scheduling delays, and expensive change orders.',
                aAr: 'يدير المقاول المتكامل جميع التخصصات داخلياً بمسؤولية مشتركة. يعمل المقاولون الفرعيون بشكل منفصل، مما يخلق تضارباً في المخططات وتأخيرات في الجدول الزمني وأوامر تغيير مكلفة.'
              },
              {
                qEn: 'Do you provide maintenance after project completion?',
                qAr: 'هل تقدمون خدمات الصيانة بعد اكتمال المشروع؟',
                aEn: 'Yes. We offer scheduled preventive maintenance contracts (AMCs) for HVAC units, electrical panels, water pumping infrastructure, and fire protection systems to maximize component lifespan.',
                aAr: 'نعم. نحن نقدم عقود صيانة وقائية مجدولة (AMCs) لوحدات التكييف واللوحات الكهربائية ومضخات المياه وأنظمة مكافحة الحرائق لزيادة عمر التجهيزات.'
              },
              {
                qEn: 'Are your designs compliant with Saudi Building Codes (SBC)?',
                qAr: 'هل تتوافق تصاميمكم مع كود البناء السعودي (SBC)؟',
                aEn: 'Yes. All systems are engineered to SBC requirements, Saudi Civil Defense guidelines, and NFPA standards. Our Saudi Aramco vendor code (#10119021) validates our absolute compliance metrics.',
                aAr: 'نعم. تم تصميم جميع الأنظمة هندسياً لتتوافق مع متطلبات كود البناء السعودي، إرشادات الدفاع المدني، ومعايير NFPA. يؤكد رمز مورد أرامكو الخاص بنا (#10119021) التزامنا.'
              }
            ]}
          />
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="home-cta-strip" style={{ padding: '90px 0' }}>
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: 'white', marginBottom: '16px', lineHeight: 1.1 }}>
            {t('Ready to Start Your Project?', 'جاهز للبدء في مشروعك؟')}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '17px', maxWidth: '640px', margin: '0 auto 36px', lineHeight: 1.7 }}>
            {t(
              "Schedule an engineering consultation today. We'll outline your project scopes and explain how NexGen Build's integrated divisions can deliver optimal results.",
              'حدد موعداً للاستشارة الهندسية اليوم. سنحدد نطاق مشروعك ونوضح كيف يمكن لأقسام نكست جن بيلد المتكاملة تقديم أفضل النتائج.'
            )}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link className="home-cta-btn" href="/contact" style={{ display: 'inline-block', padding: '16px 36px', fontSize: '16px', fontWeight: 700 }}>
              {t('Request Free Consultation', 'اطلب استشارة مجانية')}
            </Link>
            <Link href="/contact" style={{ display: 'inline-block', padding: '16px 36px', fontSize: '16px', fontWeight: 700, border: '2px solid white', borderRadius: '8px', color: 'white', textDecoration: 'none', transition: 'all 0.3s ease' }} onMouseOver={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'var(--navy)'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'white'; }}>
              {t('Get a Quote Today', 'احصل على تسعير اليوم')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
