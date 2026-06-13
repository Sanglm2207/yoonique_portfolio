import React from 'react';
import { Helmet } from 'react-helmet-async';


interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  publishedAt?: string;
  modifiedAt?: string;
  tags?: string[];
  noIndex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Lai Minh Sang (Yoo) - Full Stack Developer & Software Engineer',
  description = 'Lại Minh Sáng (also known as Yoo) is a Freelance Full Stack Developer & Software Engineer specializing in security applications, mobile app development, steganography, polyglot files, and modern web development. Creator of InvisioVault, YouTube Downloader, and Sortify.',
  keywords = 'Lại Minh Sáng, Lai Minh Sang, kaidev99, yoonique, Full Stack Developer, Software Engineer, Freelance Developer, Mobile App Developer, React Native, Flutter, Freelancer India, Web Developer, Python Developer, Flask Developer, React Developer, Java Developer, SQL, InvisioVault, Database',
  image = 'https://yoonique.netlify.app/logo512.png',
  url = 'https://yoonique.netlify.app/',
  type = 'website',
  publishedAt,
  modifiedAt,
  tags,
  noIndex = false
}) => {

  const siteName = 'Lai Minh Sang (Yoo) Portfolio';
  const twitterHandle = '@kaidev99';
  ``
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Lai Minh Sang (Yoo)" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:creator" content={twitterHandle} />

      {/* Article Open Graph Tags */}
      {type === 'article' && publishedAt && (
        <meta property="article:published_time" content={publishedAt} />
      )}
      {type === 'article' && modifiedAt && (
        <meta property="article:modified_time" content={modifiedAt} />
      )}
      {type === 'article' && (
        <meta property="article:author" content="https://github.com" />
      )}
      {tags?.map(tag => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* RSS feed disabled until a GitHub README blog feed is configured */}

      {/* Additional Meta Tags */}
      {noIndex
        ? <meta name="robots" content="noindex, nofollow" />
        : <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      }
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="theme-color" content="#64ffda" />

      {/* Structured Data (JSON-LD) - Person Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Lai Minh Sang',
          alternateName: ['Yoo', 'Lai Minh Sang'],
          url: 'https://yoonique.netlify.app/',
          image: 'https://yoonique.netlify.app/logo512.png',
          sameAs: [
            'https://github.com/sanglm2207',
            'https://www.linkedin.com/in/kaidev99/'
          ],
          jobTitle: 'Full Stack Developer',
          worksFor: {
            '@type': 'Organization',
            name: 'Freelance'
          },
          address: {
            '@type': 'PostalAddress',
            addressRegion: 'Hanoi',
            addressCountry: 'Vietnam'
          },
          email: 'sanglm2207@gmail.com',
          knowsAbout: [
            'Java',
            'TypeScript',
            'React',
            'Node.js',
            'Python',
            'Flask',
            'MongoDB',
            'Desktop Applications',
            'Web Development',
            'Software Engineering',
            'Cybersecurity',
            'Data Encryption',
            'Airflow',
            'Apache Spark',
            'Machine Learning',
            'Cryptography',
            'Security Applications',
            'Mobile App Development',
            'React Native',
            'Data Engineer',
            'Freelance Development'
          ]
        })}
      </script>

      {/* Structured Data (JSON-LD) - Website Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Lai Minh Sang (Yoo) Portfolio',
          alternateName: ['Yoo Portfolio', 'Lai Minh Sang Portfolio'],
          url: 'https://yoonique.netlify.app/',
          author: {
            '@type': 'Person',
            name: 'Lai Minh Sang',
            alternateName: 'Yoo'
          }
        })}
      </script>

      {/* Structured Data (JSON-LD) - Organization Schema (Self-Branded) */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          '@id': 'https://yoonique.netlify.app/#organization',
          name: 'YOO - Lai Minh Sang Portfolio',
          alternateName: ['Yoo', 'Lai Minh Sang Portfolio'],
          url: 'https://yoonique.netlify.app/',
          logo: {
            '@type': 'ImageObject',
            url: 'https://yoonique.netlify.app/logo512.png',
            width: 512,
            height: 512
          },
          description: 'Full Stack Developer & Software Engineer specializing in modern web applications, desktop software, and security-focused solutions.',
          brand: {
            '@type': 'Brand',
            name: 'Lại Minh Sáng (Yoo)',
            alternateName: 'Lai Minh Sang (Yoo)',
            url: 'https://yoonique.netlify.app/',
            logo: {
              '@type': 'ImageObject',
              url: 'https://yoonique.netlify.app/logo512.png',
              width: 512,
              height: 512
            }
          },
          foundingDate: '2023',
          founder: {
            '@type': 'Person',
            name: 'Lai Minh Sang',
            alternateName: 'Yoo',
            url: 'https://yoonique.netlify.app/',
            image: 'https://yoonique.netlify.app/logo512.png',
            jobTitle: 'Full Stack Developer',
            worksFor: {
              '@type': 'Organization',
              name: 'YOO - Lai Minh Sang Portfolio'
            }
          },
          address: {
            '@type': 'PostalAddress',
            addressRegion: 'Hanoi',
            addressCountry: 'VN'
          },
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'sanglm2207@gmail.com',
            contactType: 'Customer Service',
            availableLanguage: ['English', 'Vietnamese']
          },
          sameAs: [
            'https://github.com/sanglm2207',
            'https://www.linkedin.com/in/kaidev99/'
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;