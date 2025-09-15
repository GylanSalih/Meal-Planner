import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Clock, ArrowRight } from 'lucide-react';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.statusBar}>
          <span className={styles.time}>9:41</span>
          <div className={styles.statusIcons}>
            <div className={styles.signal}></div>
            <div className={styles.wifi}></div>
            <div className={styles.battery}></div>
          </div>
        </div>
        
        <div className={styles.searchBar}>
          <Search size={20} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Suche in Meinem Mahlzeiten Planer" 
            className={styles.searchInput}
          />
          <ShoppingCart size={20} className={styles.cartIcon} />
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Recipes & Packages Section */}
        <section className={styles.recipesSection}>
          <div className={styles.sectionHeader}>
            <h2>Rezepte & Pakete</h2>
            <Link to="/recipes" className={styles.seeAllLink}>Alle anzeigen</Link>
          </div>
          
          <div className={styles.recipesGrid}>
            <div className={styles.recipeCard}>
              <div className={styles.recipeImage}>
                <img src="/assets/img/Projects/project1.webp" alt="Kebab Teller" />
              </div>
              <div className={styles.recipeInfo}>
                <div className={styles.brandLogo}>M</div>
                <ArrowRight size={16} className={styles.arrow} />
              </div>
            </div>
            
            <div className={styles.recipeCard}>
              <div className={styles.recipeImage}>
                <img src="/assets/img/Projects/project2.jpg" alt="Obst Schüssel" />
              </div>
              <div className={styles.recipeInfo}>
                <div className={styles.brandLogo}>M</div>
                <ArrowRight size={16} className={styles.arrow} />
              </div>
            </div>
            
            <div className={styles.recipeCard}>
              <div className={styles.recipeImage}>
                <img src="/assets/img/Projects/project3.webp" alt="Dessert Schüssel" />
              </div>
              <div className={styles.recipeInfo}>
                <div className={styles.brandLogo}>M</div>
                <ArrowRight size={16} className={styles.arrow} />
              </div>
            </div>
            
            <div className={styles.recipeCard}>
              <div className={styles.recipeImage}>
                <img src="/assets/img/Projects/project4.webp" alt="Wraps" />
              </div>
              <div className={styles.recipeInfo}>
                <div className={styles.brandLogo}>M</div>
                <ArrowRight size={16} className={styles.arrow} />
              </div>
            </div>
          </div>
        </section>

        {/* Recharge Express Section */}
        <section className={styles.rechargeSection}>
          <div className={styles.rechargeCard}>
            <h3>Rezepte von</h3>
            <p>Entdecke neue Inspirationen</p>
          </div>
          
          <div className={styles.rechargeCard}>
            <div className={styles.timeInfo}>
              <Clock size={20} />
              <span>Top Zeit</span>
            </div>
            <p>Schnelle Gerichte</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
