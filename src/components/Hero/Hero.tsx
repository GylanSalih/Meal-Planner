import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import styles from './Hero.module.scss';

const Hero: React.FC = () => {
  const displayCode = `import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ModernApp: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ApiData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await api.getData();
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="app-container"
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <DataGrid data={data} />
      )}
    </motion.div>
  );
};

export default ModernApp;`;

  const highlightSyntax = (code: string) => {
    return code
      .replace(/(import|export|default|const|let|var|function|async|await|return|if|else|try|catch|finally|useEffect|useState|useCallback|class|interface|type|enum)/g, 
        '<span class="keyword">$1</span>')
      .replace(/(React|useState|useEffect|useCallback)/g, 
        '<span class="react">$1</span>')
      .replace(/'([^']*)'/g, 
        '<span class="string">\'$1\'</span>')
      .replace(/"([^"]*)"/g, 
        '<span class="string">"$1"</span>')
      .replace(/`([^`]*)`/g, 
        '<span class="string">`$1`</span>')
      .replace(/(\w+)(?=\s*:)/g, 
        '<span class="property">$1</span>')
      .replace(/(\/\/.*$)/gm, 
        '<span class="comment">$1</span>')
      .replace(/(\w+)(?=\()/g, 
        '<span class="function">$1</span>');
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroBadge}>
          <Sparkles size={16} />
          <span>Modern React TypeScript Boilerplate</span>
        </div>
        
        <h1 className={styles.heroTitle}>
          Build Beautiful Apps
          <span className={styles.gradientText}> Faster</span>
        </h1>
        
        <p className={styles.heroDescription}>
          A modern, production-ready React TypeScript boilerplate with beautiful UI/UX, 
          smooth animations, and a comprehensive design system. Built for developers who 
          care about code quality and user experience.
        </p>
        
        <div className={styles.ctaButtons}>
          <Link to="/page-1" className={styles.primaryButton}>
            Get Started
            <ArrowRight size={20} />
          </Link>
          <Link to="/page-2" className={styles.secondaryButton}>
            View Examples
          </Link>
        </div>
      </div>
      
      <div className={styles.heroVisual}>
        <div className={styles.heroCard}>
          <div className={styles.cardHeader}>
            <div className={styles.cardDots}>
              <span className={styles.dotClose}></span>
              <span className={styles.dotMinimize}></span>
              <span className={styles.dotMaximize}></span>
            </div>
            <div className={styles.windowTitle}>
              ModernApp.tsx — React TypeScript
            </div>
          </div>
          <div className={styles.editorTabs}>
            <div className={`${styles.tab} ${styles.active}`}>
              <span className={styles.tabIcon}>⚛️</span>
              App.tsx
            </div>
            <div className={styles.tab}>
              <span className={styles.tabIcon}>🎣</span>
              hooks.ts
              <span className={styles.tabClose}>×</span>
            </div>
            <div className={styles.tab}>
              <span className={styles.tabIcon}>🌐</span>
              api.ts
              <span className={styles.tabClose}>×</span>
            </div>
            <div className={styles.tab}>
              <span className={styles.tabIcon}>📋</span>
              types.ts
              <span className={styles.tabClose}>×</span>
            </div>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.lineNumbers}>
              {displayCode.split('\n').map((_, index) => (
                <div key={index} className={styles.lineNumber}>
                  {index + 1}
                </div>
              ))}
            </div>
            <div className={styles.codeArea}>
              <pre className={styles.codeBlock}>
                <code 
                  dangerouslySetInnerHTML={{ 
                    __html: highlightSyntax(displayCode) 
                  }} 
                />
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
