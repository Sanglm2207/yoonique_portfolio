import React from 'react';
import SEO from '../components/SEO';
import { Code, HomeLink, Sub, Title, Wrapper } from '../styles/NotFoundStyles';

const NotFound: React.FC = () => (
  <>
    <SEO
      title="404 — Page Not Found | Lại Minh Sáng"
      description="The page you're looking for doesn't exist."
    />
    <Wrapper>
      <Code
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        404
      </Code>
      <Title
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Page not found
      </Title>
      <Sub
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        This page doesn't exist or was moved.
      </Sub>
      <HomeLink
        to="/"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        ← Go Home
      </HomeLink>
    </Wrapper>
  </>
);

export default NotFound;
