import React from 'react';
import styles from './Grids.module.scss';
import CardGrid from './Components/CardGrid';
import MasonryGrid from './Components/MasonryGrid';

const Grids: React.FC = () => {
  return (
    <div className={styles.gridsPage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Grid Layouts</h1>
          <p>Professionelle Grid-Designs als Boilerplate für deine Projekte</p>
        </header>
        
        <div className={styles.gridSection}>
          <h2>Card Grid</h2>
          <p>Responsive Karten-Layout für Content-Bereiche mit eleganten Hover-Effekten</p>
          <CardGrid />
        </div>

        <div className={styles.gridSection}>
          <h2>Masonry Grid</h2>
          <p>Pinterest-Style Layout mit optimiertem Spacing für eine saubere Darstellung</p>
          <MasonryGrid />
        </div>
      </div>
    </div>
  );
};

export default Grids;
