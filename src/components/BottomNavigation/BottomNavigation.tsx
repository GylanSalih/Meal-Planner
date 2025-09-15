import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChefHat, ShoppingCart, BookOpen, Calendar, User } from 'lucide-react';
import styles from './BottomNavigation.module.scss';

const BottomNavigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className={styles.bottomNavigation}>
      <Link 
        to="/recipes" 
        className={`${styles.navItem} ${isActive('/recipes') ? styles.active : ''}`}
        aria-label="Rezepte"
      >
        <ChefHat size={24} />
        <span className={styles.label}>Rezepte</span>
      </Link>

      <Link 
        to="/shopping" 
        className={`${styles.navItem} ${isActive('/shopping') ? styles.active : ''}`}
        aria-label="Einkaufen"
      >
        <ShoppingCart size={24} />
        <span className={styles.label}>Einkaufen</span>
      </Link>

      <Link 
        to="/" 
        className={`${styles.navItem} ${isActive('/') ? styles.active : ''}`}
        aria-label="Startseite"
      >
        <div className={styles.logoContainer}>
          <div className={styles.logo}>M</div>
          <div className={styles.badge}>2</div>
        </div>
        <span className={styles.label}>Startseite</span>
      </Link>

      <Link 
        to="/meal-plan" 
        className={`${styles.navItem} ${isActive('/meal-plan') ? styles.active : ''}`}
        aria-label="Mahlzeiten Plan"
      >
        <BookOpen size={24} />
        <span className={styles.label}>Plan</span>
      </Link>

      <Link 
        to="/calendar" 
        className={`${styles.navItem} ${isActive('/calendar') ? styles.active : ''}`}
        aria-label="Kalender"
      >
        <Calendar size={24} />
        <span className={styles.label}>Kalender</span>
      </Link>
    </nav>
  );
};

export default BottomNavigation;
