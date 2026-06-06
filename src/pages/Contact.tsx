import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Section, Badge } from '../styles/GlobalStyle';
import SEO from '../components/SEO';

import FAQSchema from '../components/FAQSchema';

// Icons
import { GitHubIcon } from '../icons/GitHubIcon';
import { InstagramIcon } from '../icons/InstagramIcon';
import { LinkedInIcon } from '../icons/LinkedInIcon';

// --- Styled Components ---

const ContactHero = styled(Section)`
  padding-top: 120px;
  padding-bottom: 60px;
  text-align: center;
  position: relative;
  overflow: hidden;

  /* Ambient background glow */
  &::before {
    content: '';
    position: absolute;
    top: -20%;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(100, 255, 218, 0.03) 0%, transparent 70%);
    z-index: -1;
    pointer-events: none;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 6vw, 4rem);
  margin-bottom: var(--spacing-6);
  background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: var(--font-extrabold);
  letter-spacing: -0.025em;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: var(--text-xl);
  color: var(--dark-300);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ContactContent = styled(Container)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-12);
  align-items: start;
  padding-bottom: 100px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-12);
  }
`;

// Left Column: Contact Info
const InfoColumn = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);
`;

const InfoCard = styled(motion.div)`
  background: rgba(30, 41, 59, 0.3);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-8);
  transition: transform 0.3s ease, border-color 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(100, 255, 218, 0.2);
  }
`;

const InfoTitle = styled.h3`
  font-size: var(--text-xl);
  color: var(--dark-100);
  margin-bottom: var(--spacing-4);
  font-weight: var(--font-bold);
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
`;

const InfoText = styled.div`
  color: var(--dark-400);
  line-height: 1.6;
  font-size: var(--text-base);

  p {
    margin-bottom: var(--spacing-3);
    &:last-child {
      margin-bottom: 0;
    }
  }

  a {
    color: var(--accent-primary);
    text-decoration: none;
    transition: opacity 0.2s ease;
    &:hover {
      opacity: 0.8;
    }
  }
`;

// ... (keeping previous code flow)

const SocialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-3);
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-2);
  }
`;

const SocialCardButton = styled(motion.a)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-4);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-xl);
  color: var(--dark-300);
  text-decoration: none;
  transition: all 0.3s ease;
  gap: var(--spacing-2);

  @media (max-width: 480px) {
    padding: var(--spacing-3);
    border-radius: var(--radius-lg);
    gap: var(--spacing-1);
  }

  span {
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    
    @media (max-width: 480px) {
      font-size: var(--text-xs);
    }
  }

  svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
    margin-bottom: 4px;
    
    @media (max-width: 480px) {
      width: 20px;
      height: 20px;
      margin-bottom: 2px;
    }
  }

  &:hover {
    background: rgba(100, 255, 218, 0.1);
    border-color: var(--accent-primary);
    transform: translateY(-4px);
    color: var(--accent-primary);
    box-shadow: 0 4px 12px rgba(100, 255, 218, 0.15);
  }
`;

// Right Column: Contact Form
const FormColumn = styled(motion.div)`
  position: relative;
`;

const StyledForm = styled.form`
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(100, 255, 218, 0.1);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-8);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 640px) {
    padding: var(--spacing-6);
  }
`;

const FormGroup = styled.div`
  margin-bottom: var(--spacing-6);
  position: relative;
`;

const Label = styled.label`
  display: block;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--dark-300);
  margin-bottom: var(--spacing-2);
  margin-left: 4px;
`;

const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 14px 16px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid ${props => props.$hasError ? 'var(--error)' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: var(--radius-lg);
  color: var(--dark-100);
  font-size: var(--text-base);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? 'var(--error)' : 'var(--accent-primary)'};
    background: rgba(15, 23, 42, 0.8);
    box-shadow: 0 0 0 4px ${props => props.$hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(100, 255, 218, 0.1)'};
  }

  &::placeholder {
    color: var(--dark-500);
  }
`;

const Textarea = styled.textarea<{ $hasError?: boolean }>`
  width: 100%;
  padding: 14px 16px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid ${props => props.$hasError ? 'var(--error)' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: var(--radius-lg);
  color: var(--dark-100);
  font-size: var(--text-base);
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? 'var(--error)' : 'var(--accent-primary)'};
    background: rgba(15, 23, 42, 0.8);
    box-shadow: 0 0 0 4px ${props => props.$hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(100, 255, 218, 0.1)'};
  }

  &::placeholder {
    color: var(--dark-500);
  }
`;

const ErrorText = styled(motion.span)`
  display: block;
  color: var(--error);
  font-size: var(--text-xs);
  margin-top: 6px;
  margin-left: 4px;
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 16px;
  background: var(--accent-gradient);
  color: var(--dark-950);
  border: none;
  border-radius: var(--radius-lg);
  font-weight: var(--font-bold);
  font-size: var(--text-base);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(100, 255, 218, 0.25);
  }
`;

const StatusMessage = styled(motion.div) <{ type: 'success' | 'error' }>`
  padding: var(--spacing-4);
  border-radius: var(--radius-lg);
  margin-top: var(--spacing-6);
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  background: ${props => props.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
  border: 1px solid ${props => props.type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
  color: ${props => props.type === 'success' ? 'var(--success)' : 'var(--error)'};
  font-size: var(--text-sm);
`;


// --- Component ---

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact: React.FC = () => {

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.length < 10) newErrors.message = 'Message must be at least 10 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setStatus(null);

    try {
      // Create form data in the format Netlify expects
      const formDataToSubmit = new URLSearchParams();
      formDataToSubmit.append('form-name', 'contact');
      formDataToSubmit.append('name', formData.name);
      formDataToSubmit.append('email', formData.email);
      formDataToSubmit.append('subject', formData.subject);
      formDataToSubmit.append('message', formData.message);

      // Simulate success on localhost to verify UI
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Fake network delay
        setStatus({ type: 'success', message: 'Message sent! (Localhost simulation)' });
        setFormData({ name: '', email: '', subject: '', message: '' });
        return;
      }

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formDataToSubmit.toString()
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Message sent! I\'ll get back to you soon.' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Form submission failed:', error);
      setStatus({ type: 'error', message: 'Something went wrong. Please try again or email me directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            onSubmit={handleSubmit}
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
                aria-describedby={errors.name ? 'name-error' : undefined}
                placeholder="John Doe"
                value={formData.name}
                onChange={handleInputChange}
                $hasError={!!errors.name}
              />
              {errors.name && <ErrorText id="name-error" role="alert" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{errors.name}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email Address <span aria-hidden="true">*</span></Label>
              <Input
                type="email"
                id="email"
                name="email"
                required
                aria-required="true"
                aria-describedby={errors.email ? 'email-error' : undefined}
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleInputChange}
                $hasError={!!errors.email}
              />
              {errors.email && <ErrorText id="email-error" role="alert" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{errors.email}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="subject">Subject <span aria-hidden="true">*</span></Label>
              <Input
                type="text"
                id="subject"
                name="subject"
                required
                aria-required="true"
                aria-describedby={errors.subject ? 'subject-error' : undefined}
                placeholder="Project Inquiry"
                value={formData.subject}
                onChange={handleInputChange}
                $hasError={!!errors.subject}
              />
              {errors.subject && <ErrorText id="subject-error" role="alert" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{errors.subject}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">Message <span aria-hidden="true">*</span></Label>
              <Textarea
                id="message"
                name="message"
                required
                aria-required="true"
                aria-describedby={errors.message ? 'message-error' : undefined}
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={handleInputChange}
                $hasError={!!errors.message}
              />
              {errors.message && <ErrorText id="message-error" role="alert" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{errors.message}</ErrorText>}
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={isSubmitting}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
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
