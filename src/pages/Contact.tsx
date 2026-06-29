import React, { useState } from 'react';
import { useFormik, type FormikErrors, type FormikHelpers } from 'formik';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge, Container } from '../styles/GlobalStyle';
import SEO from '../components/SEO';

import FAQSchema from '../components/FAQSchema';

// Icons
import { GitHubIcon } from '../icons/GitHubIcon';
import { InstagramIcon } from '../icons/InstagramIcon';
import { LinkedInIcon } from '../icons/LinkedInIcon';

// --- Styled Components ---
import {
  ContactHero,
  HeroTitle,
  HeroSubtitle,
  ContactContent,
  InfoColumn,
  InfoCard,
  InfoTitle,
  InfoText,
  SocialGrid,
  SocialCardButton,
  FormColumn,
  StyledForm,
  FormGroup,
  Label,
  Input,
  Textarea,
  ErrorText,
  SubmitButton,
  StatusMessage
} from '../styles/ContactStyles';


// --- Component ---

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormErrors = FormikErrors<FormData>;

const Contact: React.FC = () => {

  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const validateForm = (values: FormData): FormErrors => {
    const newErrors: FormErrors = {};
    if (!values.name.trim()) newErrors.name = 'Please enter your name';
    if (!values.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) newErrors.email = 'Please enter a valid email address';
    if (!values.subject.trim()) newErrors.subject = 'Subject is required';
    if (!values.message.trim()) newErrors.message = 'Message is required';
    else if (values.message.length < 10) newErrors.message = 'Message must be at least 10 characters';

    return newErrors;
  };

  const handleSubmit = async (values: FormData, formikHelpers: FormikHelpers<FormData>) => {
    setStatus(null);

    try {
      // Create form data in the format Netlify expects
      const formDataToSubmit = new URLSearchParams();
      formDataToSubmit.append('form-name', 'contact');
      formDataToSubmit.append('name', values.name);
      formDataToSubmit.append('email', values.email);
      formDataToSubmit.append('subject', values.subject);
      formDataToSubmit.append('message', values.message);

      // Simulate success on localhost to verify UI
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Fake network delay
        setStatus({ type: 'success', message: 'Message sent! (Localhost simulation)' });
        formikHelpers.resetForm();
        return;
      }

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formDataToSubmit.toString()
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Message sent! I\'ll get back to you soon.' });
        formikHelpers.resetForm();
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Form submission failed:', error);
      setStatus({ type: 'error', message: 'Something went wrong. Please try again or email me directly.' });
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };

  const formik = useFormik<FormData>({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    },
    validate: validateForm,
    onSubmit: handleSubmit
  });

  const getFieldError = (field: keyof FormData) => (
    formik.touched[field] ? formik.errors[field] : undefined
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemSlideLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const itemSlideRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  return (
    <>
      <SEO
        title="Contact Lại Minh Sáng (YOO) - Hire Freelance Full Stack Developer"
        description="Get in touch with Lại Minh Sáng (YOO) for web development, security tools, or custom software projects."
        keywords="Contact Lại Minh Sáng, YOO, Hire Developer, Freelance Web Developer"
        url="https://yoonique.netlify.app/contact"
      />
      <FAQSchema />

      <ContactHero>
        <Container>
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Let's create something<br />extraordinary.
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Have a project in mind? Looking for a developer who cares about details?
            <br />Drop me a line and let's start a conversation.
          </HeroSubtitle>
        </Container>
      </ContactHero>

      <ContactContent
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <InfoColumn variants={itemSlideLeft}>
          <InfoCard>
            <InfoTitle><span>📧</span> Email Me</InfoTitle>
            <InfoText>
              <p>For project inquiries, collaborations, or just to say hi:</p>
              <a href="mailto:sanglm2207@gmail.com" style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                sanglm2207@gmail.com
              </a>
              <p style={{ marginTop: 'var(--spacing-2)', fontSize: '0.9em', opacity: 0.7 }}>
                I usually respond within 24 hours.
              </p>
            </InfoText>
          </InfoCard>

          <InfoCard>
            <InfoTitle><span>📍</span> Location</InfoTitle>
            <InfoText>
              <p>Based in <strong>Hanoi, Vietnam</strong></p>
              <p>Operating in <strong>ICT (UTC+07:00)</strong></p>
              <div style={{ marginTop: 'var(--spacing-3)' }}>
                <Badge variant="success">Available for new projects</Badge>
              </div>
            </InfoText>
          </InfoCard>

          <InfoCard>
            <InfoTitle><span>🌐</span> Connect</InfoTitle>
            <SocialGrid>
              <SocialCardButton
                href="https://github.com/sanglm2207"
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <GitHubIcon />
                <span>GitHub</span>
              </SocialCardButton>
              <SocialCardButton
                href="https://www.linkedin.com/in/kaidev99/"
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <LinkedInIcon />
                <span>LinkedIn</span>
              </SocialCardButton>
              <SocialCardButton
                href="https://www.instagram.com/its_yoonique99/"
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <InstagramIcon />
                <span>Instagram</span>
              </SocialCardButton>
            </SocialGrid>
          </InfoCard>
        </InfoColumn>

        <FormColumn variants={itemSlideRight}>
          <StyledForm
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <input type="hidden" name="form-name" value="contact" />
            <p hidden>
              <label>Don't fill this out: <input name="bot-field" /></label>
            </p>

            <FormGroup>
              <Label htmlFor="name">Your Name <span aria-hidden="true">*</span></Label>
              <Input
                type="text"
                id="name"
                name="name"
                required
                aria-required="true"
                aria-describedby={getFieldError('name') ? 'name-error' : undefined}
                placeholder="John Doe"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                $hasError={!!getFieldError('name')}
              />
              {getFieldError('name') && <ErrorText id="name-error" role="alert" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{getFieldError('name')}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email Address <span aria-hidden="true">*</span></Label>
              <Input
                type="email"
                id="email"
                name="email"
                required
                aria-required="true"
                aria-describedby={getFieldError('email') ? 'email-error' : undefined}
                placeholder="john@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                $hasError={!!getFieldError('email')}
              />
              {getFieldError('email') && <ErrorText id="email-error" role="alert" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{getFieldError('email')}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="subject">Subject <span aria-hidden="true">*</span></Label>
              <Input
                type="text"
                id="subject"
                name="subject"
                required
                aria-required="true"
                aria-describedby={getFieldError('subject') ? 'subject-error' : undefined}
                placeholder="Project Inquiry"
                value={formik.values.subject}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                $hasError={!!getFieldError('subject')}
              />
              {getFieldError('subject') && <ErrorText id="subject-error" role="alert" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{getFieldError('subject')}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">Message <span aria-hidden="true">*</span></Label>
              <Textarea
                id="message"
                name="message"
                required
                aria-required="true"
                aria-describedby={getFieldError('message') ? 'message-error' : undefined}
                placeholder="Tell me about your project..."
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                $hasError={!!getFieldError('message')}
              />
              {getFieldError('message') && <ErrorText id="message-error" role="alert" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{getFieldError('message')}</ErrorText>}
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={formik.isSubmitting}
              whileTap={{ scale: 0.98 }}
            >
              {formik.isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    style={{ width: 18, height: 18, border: '2px solid rgba(0,0,0,0.2)', borderTopColor: 'currentColor', borderRadius: '50%' }}
                  />
                  Sending...
                </>
              ) : (
                <>
                  Send Message <span>🚀</span>
                </>
              )}
            </SubmitButton>

            <div aria-live="polite" aria-atomic="true">
              <AnimatePresence>
                {status && (
                  <StatusMessage
                    type={status.type}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <span>{status.type === 'success' ? '✅' : '❌'}</span>
                    {status.message}
                  </StatusMessage>
                )}
              </AnimatePresence>
            </div>
          </StyledForm>
        </FormColumn>
      </ContactContent>
    </>
  );
};

export default Contact;
