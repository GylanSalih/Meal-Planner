import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Code, Palette, Rocket, Sparkles } from 'lucide-react';
import Hero from '../../components/Hero/Hero';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.sectionHeader}>
          <h2>Why Choose This Boilerplate?</h2>
          <p>Everything you need to build modern, scalable applications</p>
        </div>
        
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.icon}>
              <Zap size={24} />
            </div>
            <h3>Lightning Fast</h3>
            <p>Optimized for performance with modern build tools and efficient rendering</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.icon}>
              <Shield size={24} />
            </div>
            <h3>Type Safe</h3>
            <p>Full TypeScript support with strict type checking and excellent IntelliSense</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.icon}>
              <Code size={24} />
            </div>
            <h3>Clean Code</h3>
            <p>Well-structured, maintainable code following best practices and conventions</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.icon}>
              <Palette size={24} />
            </div>
            <h3>Beautiful Design</h3>
            <p>Modern UI/UX with smooth animations and a comprehensive design system</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.icon}>
              <Rocket size={24} />
            </div>
            <h3>Ready to Deploy</h3>
            <p>Production-ready configuration with optimized builds and deployment setup</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.icon}>
              <Sparkles size={24} />
            </div>
            <h3>Modern Stack</h3>
            <p>Built with the latest technologies: React 18, TypeScript, Vite, and more</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of developers building amazing applications</p>
        <div className={styles.ctaButtons}>
          <Link to="/page-3" className={styles.primaryButton}>
            Explore More
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
