import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, Linkedin, Instagram, Youtube, Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';

const socials = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/shivv2430',
    handle: '@shivv2430',
    color: 'hover:text-gray-900 dark:hover:text-white',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/shivv2430',
    handle: 'shivv2430',
    color: 'hover:text-blue-600',
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
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:2430.shivanipal@gmail.com',
    handle: '2430.shivanipal@gmail.com',
    color: 'hover:text-brand-500',
  },
];

function FormField({ label, id, error, optional, children }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}{' '}
        {optional
          ? <span className="text-gray-400 font-normal">(optional)</span>
          : <span className="text-red-500" aria-hidden="true">*</span>
        }
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

function validate(fields) {
  const errs = {};
  if (!fields.name.trim()) errs.name = 'Name is required.';
  if (!fields.email.trim()) errs.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errs.email = 'Please enter a valid email address.';
  if (!fields.message.trim()) errs.message = 'Message is required.';
  else if (fields.message.trim().length < 20)
    errs.message = 'Message must be at least 20 characters.';
  return errs;
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields(f => ({ ...f, [name]: value }));
    if (touched[name]) {
      const updated = { ...fields, [name]: value };
      const errs = validate(updated);
      setErrors(prev => ({ ...prev, [name]: errs[name] || undefined }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(t => ({ ...t, [name]: true }));
    const errs = validate(fields);
    setErrors(prev => ({ ...prev, [name]: errs[name] || undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, message: true };
    setTouched(allTouched);
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus('submitting');
    // Simulate submission — replace with your real API / EmailJS / Formspree endpoint
    await new Promise(r => setTimeout(r, 1200));
    setStatus('success');
    setFields({ name: '', email: '', subject: '', message: '' });
    setTouched({});
    setTimeout(() => setStatus('idle'), 6000);
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl border text-sm bg-white dark:bg-gray-800/60 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent ${
      errors[field] && touched[field]
        ? 'border-red-400 dark:border-red-500'
        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
    }`;

  return (
    <section
      id="contact"
      ref={ref}
      className="section-padding bg-gray-50/50 dark:bg-gray-900/30"
      aria-labelledby="contact-heading"
    >
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-mono font-medium text-brand-500 tracking-widest uppercase">
            Get In Touch
          </span>
          <h2 id="contact-heading" className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mt-2">
            Have an Idea?
          </h2>
          <p className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mt-1">
            Let's Build Something Together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Social links sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-4"
          >
            <h3 className="text-sm font-mono font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-5">
              Find Me Online
            </h3>
            {socials.map(({ icon: Icon, label, href, handle, color }) => (
              <a
                key={label}
                href={href}
                target={label !== 'Email' ? '_blank' : undefined}
                rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
                aria-label={`${label}: ${handle}`}
                className={`flex items-center gap-4 p-4 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700/50 hover:border-brand-200 dark:hover:border-brand-800 hover:shadow-md transition-all group ${color}`}
              >
                <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50 group-hover:bg-brand-50 dark:group-hover:bg-brand-950/30 transition-colors flex-shrink-0">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-gray-400 dark:text-gray-500 font-mono">{label}</div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{handle}</div>
                </div>
              </a>
            ))}
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-6 sm:p-8">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <CheckCircle
                    className="w-14 h-14 text-emerald-500 mx-auto mb-4"
                    aria-hidden="true"
                  />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Message sent! 🎉
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Thanks for reaching out. I'll get back to you at{' '}
                    <strong className="text-brand-500">2430.shivanipal@gmail.com</strong> soon.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="Contact form"
                  className="space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormField label="Your Name" id="name" error={touched.name && errors.name}>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={fields.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputClass('name')}
                        placeholder="Jane Doe"
                        autoComplete="name"
                        required
                        aria-required="true"
                        aria-invalid={!!(touched.name && errors.name)}
                        aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
                      />
                    </FormField>

                    <FormField label="Email Address" id="email" error={touched.email && errors.email}>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={fields.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputClass('email')}
                        placeholder="hello@example.com"
                        autoComplete="email"
                        inputMode="email"
                        required
                        aria-required="true"
                        aria-invalid={!!(touched.email && errors.email)}
                        aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                      />
                    </FormField>
                  </div>

                  <FormField label="Subject" id="subject" optional>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={fields.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm bg-white dark:bg-gray-800/60 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent hover:border-gray-300 transition-colors"
                      placeholder="What's this about?"
                      autoComplete="off"
                      autoCorrect="off"
                    />
                  </FormField>

                  <FormField label="Message" id="message" error={touched.message && errors.message}>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={fields.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${inputClass('message')} resize-y min-h-[120px]`}
                      placeholder="Tell me about your project, idea, or just say hi..."
                      required
                      aria-required="true"
                      aria-invalid={!!(touched.message && errors.message)}
                      aria-describedby={
                        touched.message && errors.message ? 'message-error' : undefined
                      }
                    />
                  </FormField>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-500 hover:bg-brand-600 disabled:bg-brand-400 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0"
                    aria-busy={status === 'submitting'}
                  >
                    {status === 'submitting' ? (
                      <>
                        <svg
                          className="w-4 h-4 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                        >
                          <circle
                            className="opacity-25"
                            cx="12" cy="12" r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" aria-hidden="true" />
                      </>
                    )}
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

