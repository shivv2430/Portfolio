import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, Linkedin, Instagram, Youtube, Mail, Send, CheckCircle, AlertCircle, Copy, Check } from 'lucide-react';

const CONTACT_EMAIL = '2430.shivanipal@gmail.com';

const SOCIAL_LINKS = [
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/shivv2430',
    handle: 'shivv2430',
    color: 'hover:text-blue-500',
  },
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/shivv2430',
    handle: 'shivv2430',
    color: 'hover:text-purple-400',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    href: 'https://www.instagram.com/shivani.learns/',
    handle: '@shivani.learns',
    color: 'hover:text-pink-500',
  },
  {
    icon: Youtube,
    label: 'YouTube',
    href: 'https://www.youtube.com/@Shivani.learns',
    handle: '@Shivani.learns',
    color: 'hover:text-red-500',
  },
];

function validate(fields) {
  const errs = {};
  if (!fields.name.trim()) errs.name = 'Please enter your name.';
  if (!fields.email.trim()) {
    errs.email = 'Please enter your email.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errs.email = 'Please provide a valid email address.';
  }
  if (!fields.message.trim()) {
    errs.message = 'Please write a brief message.';
  } else if (fields.message.trim().length < 15) {
    errs.message = 'Message must be at least 15 characters.';
  }
  return errs;
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((f) => ({ ...f, [name]: value }));
    if (touched[name]) {
      const updated = { ...fields, [name]: value };
      const errs = validate(updated);
      setErrors((prev) => ({ ...prev, [name]: errs[name] || undefined }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    const errs = validate(fields);
    setErrors((prev) => ({ ...prev, [name]: errs[name] || undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, message: true };
    setTouched(allTouched);
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus('submitting');

    // Build mailto string to launch native mail client
    const subjectLine = encodeURIComponent(fields.subject.trim() || `Portfolio Inquiry from ${fields.name.trim()}`);
    const bodyContent = encodeURIComponent(
      `Name: ${fields.name.trim()}\nEmail: ${fields.email.trim()}\n\nMessage:\n${fields.message.trim()}`
    );
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${subjectLine}&body=${bodyContent}`;

    window.location.href = mailtoUrl;

    setTimeout(() => {
      setStatus('success');
      setFields({ name: '', email: '', subject: '', message: '' });
      setTouched({});
    }, 600);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl border text-sm bg-white dark:bg-cinematic-850 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent ${
      errors[field] && touched[field]
        ? 'border-red-400 dark:border-red-500'
        : 'border-purple-200/60 dark:border-purple-800/50 hover:border-purple-400'
    }`;

  return (
    <section
      id="contact"
      ref={ref}
      className="section-padding bg-purple-50/30 dark:bg-cinematic-950 relative"
      aria-labelledby="contact-heading"
    >
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono font-semibold text-gold-500 tracking-widest uppercase">
            Let's Talk
          </span>
          <h2
            id="contact-heading"
            className="text-4xl sm:text-5xl font-serif text-gray-900 dark:text-white mt-1 mb-2"
          >
            Have an idea? Let's build something together.
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-sans">
            Open for internships, collaborative projects, open source discussions, and tech community events.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 max-w-5xl mx-auto">
          {/* Social Links & Direct Email */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Direct Email Card with 1-click Copy */}
            <div className="p-5 rounded-2xl bg-white dark:bg-cinematic-900 border border-purple-200/60 dark:border-purple-800/60 shadow-sm">
              <span className="text-xs font-mono text-gold-500 uppercase tracking-wider block mb-1">
                Direct Email
              </span>
              <div className="flex items-center justify-between gap-2 mt-2">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-sm sm:text-base font-mono font-medium text-gray-900 dark:text-white hover:text-brand-500 transition-colors truncate"
                >
                  {CONTACT_EMAIL}
                </a>
                <button
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="p-2 rounded-lg bg-purple-100/60 dark:bg-cinematic-800 text-purple-700 dark:text-purple-300 hover:text-gold-400 transition-colors flex-shrink-0"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block px-1">
                Social Profiles
              </span>
              {SOCIAL_LINKS.map(({ icon: Icon, label, href, handle, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between p-4 rounded-xl bg-white dark:bg-cinematic-900 border border-purple-200/50 dark:border-purple-800/40 hover:border-gold-400 dark:hover:border-gold-400 transition-all group ${color}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-50 dark:bg-cinematic-800 text-purple-600 dark:text-purple-300 group-hover:text-gold-400 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-mono text-gray-400">{label}</span>
                      <span className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                        {handle}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-gray-400 group-hover:text-gold-400 transition-colors">
                    &rarr;
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl bg-white dark:bg-cinematic-900 border border-purple-200/60 dark:border-purple-800/60 p-6 sm:p-8 shadow-xl">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-14 h-14 text-gold-500 mx-auto mb-3" />
                  <h3 className="text-2xl font-serif text-gray-900 dark:text-white mb-2">
                    Email Client Opened
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-sans mb-6">
                    Your default mail application has been prompted with your message pre-filled for {CONTACT_EMAIL}.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-5 py-2.5 rounded-xl border border-purple-300 dark:border-purple-800 text-xs font-mono text-gray-700 dark:text-gray-300 hover:border-gold-400 transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-mono text-gray-600 dark:text-gray-300 mb-1.5">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        value={fields.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Shivani Pal"
                        className={inputClass('name')}
                        autoComplete="name"
                        required
                        aria-invalid={!!(touched.name && errors.name)}
                        aria-describedby={touched.name && errors.name ? 'contact-name-error' : undefined}
                      />
                      {touched.name && errors.name && (
                        <p id="contact-name-error" className="flex items-center gap-1 text-xs text-red-500 mt-1">
                          <AlertCircle className="w-3 h-3 flex-shrink-0" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-mono text-gray-600 dark:text-gray-300 mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        value={fields.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="name@example.com"
                        className={inputClass('email')}
                        autoComplete="email"
                        inputMode="email"
                        required
                        aria-invalid={!!(touched.email && errors.email)}
                        aria-describedby={touched.email && errors.email ? 'contact-email-error' : undefined}
                      />
                      {touched.email && errors.email && (
                        <p id="contact-email-error" className="flex items-center gap-1 text-xs text-red-500 mt-1">
                          <AlertCircle className="w-3 h-3 flex-shrink-0" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-mono text-gray-600 dark:text-gray-300 mb-1.5">
                      Subject <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="contact-subject"
                      name="subject"
                      value={fields.subject}
                      onChange={handleChange}
                      placeholder="Project collaboration, internship, or hello"
                      className="w-full px-4 py-3 rounded-xl border border-purple-200/60 dark:border-purple-800/50 bg-white dark:bg-cinematic-850 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-mono text-gray-600 dark:text-gray-300 mb-1.5">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      value={fields.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Describe what you would like to build or discuss..."
                      className={`${inputClass('message')} resize-y min-h-[110px]`}
                      required
                      aria-invalid={!!(touched.message && errors.message)}
                      aria-describedby={touched.message && errors.message ? 'contact-message-error' : undefined}
                    />
                    {touched.message && errors.message && (
                      <p id="contact-message-error" className="flex items-center gap-1 text-xs text-red-500 mt-1">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-brand-600 to-purple-700 hover:from-brand-500 hover:to-purple-600 text-white font-medium text-sm rounded-xl transition-all shadow-lg shadow-purple-900/30 hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
