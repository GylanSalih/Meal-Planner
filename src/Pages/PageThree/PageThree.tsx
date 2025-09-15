import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Zap, Shield, Code, Rocket } from 'lucide-react';
import styles from './PageThree.module.scss';

const PageThree: React.FC = () => {
  return (
    <div className={styles.pageThree}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <Link to="/page-2" className={styles.backButton}>
            <ArrowLeft size={20} />
            Back to Page 2
          </Link>
          <h1>Page Three</h1>
          <p>Final destination showcasing the power and flexibility of our boilerplate</p>
        </div>

        {/* Feature Highlights */}
        <div className={styles.featureHighlights}>
          <div className={styles.highlightCard}>
            <div className={styles.highlightIcon}>
              <CheckCircle size={40} />
            </div>
            <h3>Production Ready</h3>
            <p>Deploy with confidence knowing your app is built with production-grade tools and configurations.</p>
          </div>

          <div className={styles.highlightCard}>
            <div className={styles.highlightIcon}>
              <Zap size={40} />
            </div>
            <h3>Lightning Fast</h3>
            <p>Optimized builds and efficient rendering ensure your application performs at its best.</p>
          </div>

          <div className={styles.highlightCard}>
            <div className={styles.highlightIcon}>
              <Shield size={40} />
            </div>
            <h3>Secure by Default</h3>
            <p>Built-in security features and best practices keep your application safe from common vulnerabilities.</p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className={styles.techStack}>
          <h2>Built with Modern Technologies</h2>
          <div className={styles.techGrid}>
            <div className={styles.techItem}>
              <Code size={24} />
              <span>React 18</span>
            </div>
            <div className={styles.techItem}>
              <Code size={24} />
              <span>TypeScript</span>
            </div>
            <div className={styles.techItem}>
              <Code size={24} />
              <span>Vite</span>
            </div>
            <div className={styles.techItem}>
              <Code size={24} />
              <span>Sass</span>
            </div>
            <div className={styles.techItem}>
              <Code size={24} />
              <span>Lucide Icons</span>
            </div>
            <div className={styles.techItem}>
              <Code size={24} />
              <span>Modern CSS</span>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className={styles.finalCta}>
          <h2>Ready to Build Something Amazing?</h2>
          <p>Start your next project with confidence using our modern React TypeScript boilerplate</p>
          <div className={styles.ctaButtons}>
            <Link to="/" className={styles.primaryButton}>
              <Rocket size={20} />
              Get Started
            </Link>
            <Link to="/page-1" className={styles.secondaryButton}>
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageThree;
