import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Code, Zap, Shield, Palette } from 'lucide-react';
import styles from './PageOne.module.scss';

const PageOne: React.FC = () => {
  return (
    <div className={styles.pageOne}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <Link to="/" className={styles.backButton}>
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          <h1>Page One</h1>
          <p>Explore the features and capabilities of our modern React TypeScript boilerplate</p>
        </div>

        {/* Content Grid */}
        <div className={styles.contentGrid}>
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <Code size={32} />
            </div>
            <h3>TypeScript First</h3>
            <p>Built with TypeScript from the ground up, providing excellent type safety and developer experience.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <Zap size={32} />
            </div>
            <h3>Lightning Fast</h3>
            <p>Optimized for performance with modern build tools and efficient rendering patterns.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <Shield size={32} />
            </div>
            <h3>Production Ready</h3>
            <p>Includes all the tools and configurations needed for production deployment.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <Palette size={32} />
            </div>
            <h3>Beautiful Design</h3>
            <p>Modern UI/UX with smooth animations and a comprehensive design system.</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className={styles.cta}>
          <h2>Ready to Get Started?</h2>
          <p>Begin building your next amazing application with our boilerplate</p>
          <div className={styles.ctaButtons}>
            <Link to="/page-2" className={styles.primaryButton}>
              Continue to Page 2
            </Link>
            <Link to="/" className={styles.secondaryButton}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageOne;


