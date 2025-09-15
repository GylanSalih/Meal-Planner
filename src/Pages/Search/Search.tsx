import React, { useState } from 'react';
import { Search, Filter, Clock, Users, Star, X, TrendingUp } from 'lucide-react';
import styles from './Search.module.scss';

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState([
    'Pasta Rezepte',
    'Gesunde Snacks',
    'Vegetarische Gerichte',
    'Schnelle Mahlzeiten'
  ]);
  const [trendingSearches] = useState([
    'Keto Rezepte',
    'Meal Prep',
    'Low Carb',
    'Protein Shakes',
    'Smoothie Bowls',
    'One Pot Gerichte'
  ]);

  const searchSuggestions = [
    { id: 1, title: 'Pasta mit Tomaten', category: 'Mittagessen', time: '25 Min' },
    { id: 2, title: 'Gesunder Salat', category: 'Mittagessen', time: '15 Min' },
    { id: 3, title: 'Smoothie Bowl', category: 'Frühstück', time: '10 Min' },
    { id: 4, title: 'Gegrilltes Hähnchen', category: 'Abendessen', time: '45 Min' },
    { id: 5, title: 'Quinoa Bowl', category: 'Mittagessen', time: '20 Min' }
  ];

  const removeRecentSearch = (index: number) => {
    setRecentSearches(prev => prev.filter((_, i) => i !== index));
  };

  const clearAllRecent = () => {
    setRecentSearches([]);
  };

  return (
    <div className={styles.search}>
      {/* Header */}
      <div className={styles.header}>
        <h1>Suche</h1>
        <button className={styles.filterButton}>
          <Filter size={20} />
        </button>
      </div>

      {/* Search Bar */}
      <div className={styles.searchSection}>
        <div className={styles.searchBar}>
          <Search size={20} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Was möchtest du kochen?" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          {searchTerm && (
            <button 
              className={styles.clearButton}
              onClick={() => setSearchTerm('')}
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Search Results or Suggestions */}
      {searchTerm ? (
        <div className={styles.searchResults}>
          <h2>Suchergebnisse für "{searchTerm}"</h2>
          <div className={styles.resultsList}>
            {searchSuggestions
              .filter(item => 
                item.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(item => (
                <div key={item.id} className={styles.resultItem}>
                  <div className={styles.resultInfo}>
                    <h3>{item.title}</h3>
                    <div className={styles.resultMeta}>
                      <span className={styles.category}>{item.category}</span>
                      <div className={styles.time}>
                        <Clock size={14} />
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </div>
                  <button className={styles.viewButton}>Ansehen</button>
                </div>
              ))
            }
          </div>
        </div>
      ) : (
        <div className={styles.searchSuggestions}>
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>Letzte Suchen</h2>
                <button 
                  className={styles.clearAllButton}
                  onClick={clearAllRecent}
                >
                  Alle löschen
                </button>
              </div>
              <div className={styles.searchTags}>
                {recentSearches.map((search, index) => (
                  <div key={index} className={styles.searchTag}>
                    <span 
                      className={styles.tagText}
                      onClick={() => setSearchTerm(search)}
                    >
                      {search}
                    </span>
                    <button 
                      className={styles.removeButton}
                      onClick={() => removeRecentSearch(index)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trending Searches */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <TrendingUp size={20} />
              <h2>Trending Suchen</h2>
            </div>
            <div className={styles.searchTags}>
              {trendingSearches.map((search, index) => (
                <div key={index} className={styles.searchTag}>
                  <span 
                    className={styles.tagText}
                    onClick={() => setSearchTerm(search)}
                  >
                    {search}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Categories */}
          <div className={styles.section}>
            <h2>Kategorien durchsuchen</h2>
            <div className={styles.categoriesGrid}>
              <div className={styles.categoryCard}>
                <div className={styles.categoryIcon}>🍳</div>
                <h3>Frühstück</h3>
                <p>12 Rezepte</p>
              </div>
              <div className={styles.categoryCard}>
                <div className={styles.categoryIcon}>🍽️</div>
                <h3>Mittagessen</h3>
                <p>28 Rezepte</p>
              </div>
              <div className={styles.categoryCard}>
                <div className={styles.categoryIcon}>🌙</div>
                <h3>Abendessen</h3>
                <p>22 Rezepte</p>
              </div>
              <div className={styles.categoryCard}>
                <div className={styles.categoryIcon}>🍰</div>
                <h3>Desserts</h3>
                <p>15 Rezepte</p>
              </div>
              <div className={styles.categoryCard}>
                <div className={styles.categoryIcon}>🥤</div>
                <h3>Getränke</h3>
                <p>8 Rezepte</p>
              </div>
              <div className={styles.categoryCard}>
                <div className={styles.categoryIcon}>🥗</div>
                <h3>Salate</h3>
                <p>18 Rezepte</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
