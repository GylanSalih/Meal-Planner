import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Twitter, Linkedin, Github, Globe } from 'lucide-react';
import styles from './DesktopHeader.module.scss';

const DesktopHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <img 
            src="/assets/img/Logo_Black.png" 
            alt="PetalStack Logo" 
            className={styles.logoLight}
            width={32}
            height={32}
          />
          <img 
            src="/assets/img/Logo_White.png" 
            alt="PetalStack Logo" 
            className={styles.logoDark}
            width={32}
            height={32}
          />
          <span>Mahlzeiten Planer</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <Link 
            to="/" 
            className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
          >
            Startseite
          </Link>
          <Link 
            to="/recipes" 
            className={`${styles.navLink} ${isActive('/recipes') ? styles.active : ''}`}
          >
            Rezepte
          </Link>
          <Link 
            to="/meal-plan" 
            className={`${styles.navLink} ${isActive('/meal-plan') ? styles.active : ''}`}
          >
            Mahlzeiten Plan
          </Link>
          <Link 
            to="/shopping-list" 
            className={`${styles.navLink} ${isActive('/shopping-list') ? styles.active : ''}`}
          >
            Einkaufsliste
          </Link>
          <Link 
            to="/profile" 
            className={`${styles.navLink} ${isActive('/profile') ? styles.active : ''}`}
          >
            Profil
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className={styles.mobileMenuButton}
          onClick={toggleMenu}
          aria-label="Mobilmenü umschalten"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        <div className={`${styles.mobileNav} ${isMenuOpen ? styles.open : ''}`}>
          {/* Close Button */}
          <button 
            className={styles.mobileCloseButton}
            onClick={toggleMenu}
            aria-label="Mobilmenü schließen"
          >
            <X size={24} />
          </button>

          <div className={styles.mobileNavContent}>
            {/* Navigation Links */}
            <div className={styles.mobileNavLinks}>
              <Link 
                to="/" 
                className={`${styles.mobileNavLink} ${isActive('/') ? styles.active : ''}`}
              >
                Startseite
              </Link>
              <Link 
                to="/recipes" 
                className={`${styles.mobileNavLink} ${isActive('/recipes') ? styles.active : ''}`}
              >
                Rezepte
              </Link>
              <Link 
                to="/meal-plan" 
                className={`${styles.mobileNavLink} ${isActive('/meal-plan') ? styles.active : ''}`}
              >
                Mahlzeiten Plan
              </Link>
              <Link 
                to="/shopping-list" 
                className={`${styles.mobileNavLink} ${isActive('/shopping-list') ? styles.active : ''}`}
              >
                Einkaufsliste
              </Link>
              <Link 
                to="/profile" 
                className={`${styles.mobileNavLink} ${isActive('/profile') ? styles.active : ''}`}
              >
                Profil
              </Link>
            </div>

            {/* Social Icons */}
            <div className={styles.socialIcons}>
              <a 
                href="#" 
                className={styles.socialIcon}
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a 
                href="#" 
                className={styles.socialIcon}
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
              <a 
                href="#" 
                className={styles.socialIcon}
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="#" 
                className={styles.socialIcon}
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a 
                href="#" 
                className={styles.socialIcon}
                aria-label="Website"
              >
                <Globe size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export { DesktopHeader };
