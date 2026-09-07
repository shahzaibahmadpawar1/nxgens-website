'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { InteractiveGrid } from '@/components/InteractiveGrid';
import { useRecaptcha } from '@/context/RecaptchaContext';

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    website: '', // Honeypot field
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { executeRecaptcha } = useRecaptcha();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.email.trim()) {
      alert(
        t(
          'Please fill in your name and email.',
          'يرجى ملء الاسم والبريد الإلكتروني.'
        )
      );
      return;
    }
    
    setIsSubmitting(true);
    try {
      const token = await executeRecaptcha();

      if (!token) {
        alert(t('reCAPTCHA verification failed. Please try again.', 'فشل التحقق من reCAPTCHA. يرجى المحاولة مرة أخرى.'));
        setIsSubmitting(false);
        return;
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, recaptchaToken: token }),
      });

      if (response.ok) {
        setFormSubmitted(true);
      } else {
        alert(t('Failed to send message. Please try again.', 'فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.'));
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(t('An error occurred. Please try again later.', 'حدث خطأ. يرجى المحاولة مرة أخرى لاحقاً.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      service: '',
      message: '',
      website: '',
    });
    setFormSubmitted(false);
  };

  return (
    <main className="flex-grow">
      {/* HERO */}
      <section className="contact-hero">
        <div className="contact-hero-bg"></div>
        <div className="hero-infinite-grid" aria-hidden="true"></div>
        <InteractiveGrid />
        <div className="container">
          <div className="page-breadcrumb">
            <Link href="/" style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
              {t('Home', 'الرئيسية')}
            </Link> &nbsp;/&nbsp;
            <span>{t('Contact Us', 'تواصل معنا')}</span>
          </div>
          <h1 dangerouslySetInnerHTML={{ __html: t("Let's Build Your <span>Vision</span> Together", 'لنبني <span>رؤيتك</span> معاً') }}></h1>
          <p>
            {t(
              'Reach out for a free consultation or project quote. Our team is ready to help with any construction or fabrication requirement.',
              'تواصل معنا للحصول على استشارة مجانية أو عرض أسعار للمشروع. فريقنا جاهز للمساعدة في أي متطلبات بناء أو تصنيع.'
            )}
          </p>
        </div>
      </section>

      {/* CONTACT GRID */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">

            {/* FORM */}
            <div className="contact-form-wrap">
              {!formSubmitted ? (
                <form id="contactForm" onSubmit={handleSubmit}>
                  <div className="form-title">{t('Send Us a Message', 'أرسل لنا رسالة')}</div>
                  
                  {/* Honeypot Field - Hidden from humans, filled by bots */}
                  <div style={{ display: 'none', position: 'absolute', left: '-9999px' }} aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>{t('First Name', 'الاسم الأول')}</label>
                      <input
                        type="text"
                        id="firstName"
                        placeholder={t('John', 'أحمد')}
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>{t('Last Name', 'اسم العائلة')}</label>
                      <input
                        type="text"
                        id="lastName"
                        placeholder={t('Smith', 'المحمد')}
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>{t('Email Address', 'البريد الإلكتروني')}</label>
                    <input
                      type="email"
                      id="email"
                      placeholder={t('john@company.com', 'ahmed@company.com')}
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>{t('Phone Number', 'رقم الهاتف')}</label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="+966 5X XXX XXXX"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>{t('Service Required', 'الخدمة المطلوبة')}</label>
                    <select id="service" value={formData.service} onChange={handleInputChange}>
                      <option value="">{t('Select a service...', 'اختر خدمة...')}</option>
                      <option value="general">{t('General Construction', 'البناء العام')}</option>
                      <option value="electrical">{t('Electrical Services', 'الخدمات الكهربائية')}</option>
                      <option value="sanitary">{t('Sanitary Services', 'الخدمات الصحية')}</option>
                      <option value="hvac">{t('HVAC Services', 'خدمات التكييف')}</option>
                      <option value="waterproofing">{t('Waterproofing', 'العزل المائي')}</option>
                      <option value="fire">{t('Fire Fighting Systems', 'أنظمة الإطفاء')}</option>
                      <option value="cnc">{t('CNC Laser Cutting', 'القطع بالليزر CNC')}</option>
                      <option value="fabrication">{t('Metal Fabrication', 'التصنيع المعدني')}</option>
                      <option value="welding">{t('Welding Services', 'خدمات اللحام')}</option>
                      <option value="machining">{t('CNC Machining', 'الخراطة CNC')}</option>
                      <option value="leak">{t('Online Leak Repair', 'إصلاح التسرب الأونلاين')}</option>
                      <option value="other">{t('Other', 'أخرى')}</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>{t('Project Details', 'تفاصيل المشروع')}</label>
                    <textarea
                      id="message"
                      placeholder={t(
                        'Tell us about your project, timeline, and requirements...',
                        'أخبرنا عن مشروعك والجدول الزمني والمتطلبات...'
                      )}
                      value={formData.message}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <button type="submit" className="form-submit" disabled={isSubmitting}>
                    {isSubmitting 
                      ? t('Sending...', 'جاري الإرسال...') 
                      : t('Send Message →', 'إرسال الرسالة →')}
                  </button>
                </form>
              ) : (
                <div className="form-success show" id="formSuccess">
                  <div className="success-icon">✅</div>
                  <h3>{t('Message Sent!', 'تم الإرسال!')}</h3>
                  <p>
                    {t(
                      'Thank you for reaching out. Our team will contact you within 24 hours.',
                      'شكراً للتواصل. سيتصل بك فريقنا خلال 24 ساعة.'
                    )}
                  </p>
                  <button
                    onClick={handleReset}
                    style={{
                      marginTop: '24px',
                      padding: '12px 28px',
                      borderRadius: '10px',
                      background: 'var(--orange)',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                    }}
                  >
                    {t('Send Another Message', 'إرسال رسالة أخرى')}
                  </button>
                </div>
              )}
            </div>

            {/* INFO */}
            <div className="contact-info">
              <div>
                <div className="contact-info-title">{t('Contact Information', 'معلومات التواصل')}</div>
                <p className="contact-info-desc">
                  {t(
                    "We'd love to hear about your project. Get in touch and we'll get back to you as soon as possible.",
                    'يسعدنا سماع تفاصيل مشروعك. تواصل معنا وسنرد عليك في أقرب وقت ممكن.'
                  )}
                </p>
              </div>

              <div className="info-cards">
                <div className="info-card">
                  <div className="info-icon">📧</div>
                  <div className="info-content">
                    <h4>{t('Huzaifa Zaman — Sales Executive', 'حذيفة زمان — المدير التنفيذي للمبيعات')}</h4>
                    <p>
                      <a href="mailto:contact@nxgens.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                        contact@nxgens.com
                      </a>
                    </p>
                    <span>
                      <a href="tel:+966534758685" style={{ color: 'inherit', textDecoration: 'none' }}>
                        +966 53 475 8685
                      </a>
                    </span>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">📍</div>
                  <div className="info-content">
                    <h4>{t('Headquarters', 'المقر الرئيسي')}</h4>
                    <p>{t('Dammam, Saudi Arabia', 'الدمام، المملكة العربية السعودية')}</p>
                    <span>{t('Eastern Province', 'المنطقة الشرقية')}</span>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">🏭</div>
                  <div className="info-content">
                    <h4>{t('CNC Workshop', 'ورشة CNC')}</h4>
                    <p>{t('Dallah Industrial Area, Dammam', 'المنطقة الصناعية دله، الدمام')}</p>
                    <span>{t('Machining, Welding, Fabrication', 'تشغيل ولحام وتصنيع')}</span>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">🔆</div>
                  <div className="info-content">
                    <h4>{t('Laser Cutting Facility', 'مرفق القطع بالليزر')}</h4>
                    <p>{t('Jubail Industrial Area', 'المنطقة الصناعية، الجبيل')}</p>
                    <span>{t('CNC Laser Cutting & Engraving', 'قطع ليزر CNC ونقش')}</span>
                  </div>
                </div>
              </div>

              <div className="working-hours">
                <h4>{t('⏰ Working Hours', '⏰ ساعات العمل')}</h4>
                <div className="hour-row">
                  <span>{t('Sunday – Thursday', 'الأحد – الخميس')}</span>
                  <span>{t('7:00 AM – 6:00 PM', '7:00 ص – 6:00 م')}</span>
                </div>
                <div className="hour-row">
                  <span>{t('Saturday', 'السبت')}</span>
                  <span>{t('8:00 AM – 2:00 PM', '8:00 ص – 2:00 م')}</span>
                </div>
                <div className="hour-row">
                  <span>{t('Emergency / Industrial', 'طوارئ / صناعي')}</span>
                  <span>{t('24/7 Support', 'دعم 24/7')}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
