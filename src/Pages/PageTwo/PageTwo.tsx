import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Star, Users, TrendingUp, Award } from 'lucide-react';
import styles from './PageTwo.module.scss';

const PageTwo: React.FC = () => {
  return (
    <div className={styles.pageTwo}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <Link to="/page-1" className={styles.backButton}>
            <ArrowLeft size={20} />
            Back to Page 1
          </Link>
          <h1>Page Two</h1>
          <p>Discover advanced features and capabilities that make development a breeze</p>
        </div>

        {/* Stats Section */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <Star size={32} />
            </div>
            <div className={styles.statNumber}>4.9/5</div>
            <div className={styles.statLabel}>User Rating</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <Users size={32} />
            </div>
            <div className={styles.statNumber}>10K+</div>
            <div className={styles.statLabel}>Active Users</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <TrendingUp size={32} />
            </div>
            <div className={styles.statNumber}>99.9%</div>
            <div className={styles.statLabel}>Uptime</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <Award size={32} />
            </div>
            <div className={styles.statNumber}>50+</div>
            <div className={styles.statLabel}>Awards</div>
          </div>
        </div>

        {/* Content Section */}
        <div className={styles.contentSection}>
          <h2>Why Developers Love This Boilerplate</h2>
          <div className={styles.contentGrid}>
            <div className={styles.contentCard}>
              <h3>Modern Architecture</h3>
              <p>Built with the latest React patterns and best practices, ensuring your code is future-proof and maintainable.</p>
            </div>
            <div className={styles.contentCard}>
              <h3>Developer Experience</h3>
              <p>Excellent tooling, hot reloading, and comprehensive error handling make development fast and enjoyable.</p>
            </div>
            <div className={styles.contentCard}>
              <h3>Performance Optimized</h3>
              <p>Lazy loading, code splitting, and optimized builds ensure your application runs smoothly at scale.</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className={styles.navigation}>
          <Link to="/page-1" className={styles.navButton}>
            Previous Page
          </Link>
          <Link to="/page-3" className={styles.navButton}>
            Next Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageTwo;


