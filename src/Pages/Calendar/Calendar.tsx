import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Plus, Heart, Grid } from 'lucide-react';
import styles from './Calendar.module.scss';

const Calendar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'calendar'>('calendar');

  return (
    <div className={styles.calendar}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.header}>
          <Link to="/" className={styles.backButton}>
            <ArrowLeft size={20} />
          </Link>
          <h1 className={styles.title}>Hauptmenü</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Navigation Tabs */}
        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'list' ? styles.active : ''}`}
            onClick={() => setActiveTab('list')}
          >
            Liste
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'calendar' ? styles.active : ''}`}
            onClick={() => setActiveTab('calendar')}
          >
            Kalender
          </button>
        </div>

        {/* Calendar View */}
        {activeTab === 'calendar' && (
          <div className={styles.calendarView}>
            {/* Calendar Header */}
            <div className={styles.calendarHeader}>
              <button className={styles.navButton}>
                <ArrowLeft size={20} />
              </button>
              <h2 className={styles.monthYear}>Januar 2025</h2>
              <button className={styles.navButton}>
                <ArrowRight size={20} />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className={styles.calendarGrid}>
              <div className={styles.weekDays}>
                <span>Mo</span>
                <span>Di</span>
                <span>Mi</span>
                <span>Do</span>
                <span>Fr</span>
                <span>Sa</span>
                <span>So</span>
              </div>
              
              <div className={styles.days}>
                <span className={styles.day}>27</span>
                <span className={styles.day}>28</span>
                <span className={`${styles.day} ${styles.active}`}>29</span>
                <span className={styles.day}>30</span>
                <span className={styles.day}>31</span>
                <span className={styles.day}>1</span>
                <span className={styles.day}>2</span>
              </div>
            </div>

            {/* Calendar Illustration */}
            <div className={styles.calendarIllustration}>
              <div className={styles.deskCalendar}>
                <div className={styles.calendarTop}>
                  <div className={styles.clock}>🕐</div>
                </div>
                <div className={styles.calendarGrid}>
                  <div className={styles.gridItem}>
                    <Plus size={16} />
                  </div>
                  <div className={styles.gridItem}>
                    <Heart size={16} />
                  </div>
                  <div className={styles.gridItem}>
                    <Grid size={16} />
                  </div>
                  <div className={styles.gridItem}></div>
                  <div className={styles.gridItem}></div>
                  <div className={styles.gridItem}></div>
                  <div className={styles.gridItem}></div>
                  <div className={styles.gridItem}></div>
                  <div className={styles.gridItem}></div>
                </div>
              </div>
            </div>

            {/* No Recipe Message */}
            <div className={styles.noRecipeMessage}>
              <p>Heute ist kein Rezept geplant. Füge die Rezepte hinzu, die du planen möchtest.</p>
              <button className={styles.addRecipeButton}>
                <Plus size={16} />
                Rezept hinzufügen
              </button>
            </div>
          </div>
        )}

        {/* List View */}
        {activeTab === 'list' && (
          <div className={styles.listView}>
            <p>Liste-Ansicht wird hier angezeigt</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
