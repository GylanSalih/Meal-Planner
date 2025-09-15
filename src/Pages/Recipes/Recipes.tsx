import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Clock, Users, Star, Heart, Plus } from 'lucide-react';
import styles from './Recipes.module.scss';

const Recipes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('alle');

  const categories = [
    { id: 'alle', name: 'Alle', count: 24 },
    { id: 'fruehstueck', name: 'Frühstück', count: 8 },
    { id: 'mittagessen', name: 'Mittagessen', count: 12 },
    { id: 'abendessen', name: 'Abendessen', count: 10 },
    { id: 'snacks', name: 'Snacks', count: 6 },
    { id: 'desserts', name: 'Desserts', count: 4 }
  ];

  const recipes = [
    {
      id: 1,
      title: 'Mediterrane Pasta',
      image: '/assets/img/Projects/project1.webp',
      time: '25 Min',
      servings: 4,
      rating: 4.8,
      category: 'mittagessen',
      difficulty: 'Einfach',
      isFavorite: true
    },
    {
      id: 2,
      title: 'Gesunder Smoothie Bowl',
      image: '/assets/img/Projects/project2.jpg',
      time: '10 Min',
      servings: 2,
      rating: 4.6,
      category: 'fruehstueck',
      difficulty: 'Einfach',
      isFavorite: false
    },
    {
      id: 3,
      title: 'Gegrilltes Hähnchen',
      image: '/assets/img/Projects/project3.webp',
      time: '45 Min',
      servings: 6,
      rating: 4.9,
      category: 'abendessen',
      difficulty: 'Mittel',
      isFavorite: true
    },
    {
      id: 4,
      title: 'Quinoa Salat',
      image: '/assets/img/Projects/project4.webp',
      time: '20 Min',
      servings: 3,
      rating: 4.5,
      category: 'mittagessen',
      difficulty: 'Einfach',
      isFavorite: false
    },
    {
      id: 5,
      title: 'Schokoladen Muffins',
      image: '/assets/img/Projects/project5.webp',
      time: '30 Min',
      servings: 12,
      rating: 4.7,
      category: 'desserts',
      difficulty: 'Einfach',
      isFavorite: true
    },
    {
      id: 6,
      title: 'Avocado Toast',
      image: '/assets/img/Projects/project6.webp',
      time: '5 Min',
      servings: 1,
      rating: 4.4,
      category: 'fruehstueck',
      difficulty: 'Einfach',
      isFavorite: false
    }
  ];

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'alle' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={styles.recipes}>
      {/* Header */}
      <div className={styles.header}>
        <h1>Rezepte</h1>
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
            placeholder="Rezepte durchsuchen..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Categories */}
      <div className={styles.categories}>
        {categories.map(category => (
          <button
            key={category.id}
            className={`${styles.categoryButton} ${selectedCategory === category.id ? styles.active : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
            <span className={styles.count}>({category.count})</span>
          </button>
        ))}
      </div>

      {/* Recipes Grid */}
      <div className={styles.recipesGrid}>
        {filteredRecipes.map(recipe => (
          <div key={recipe.id} className={styles.recipeCard}>
            <div className={styles.recipeImage}>
              <img src={recipe.image} alt={recipe.title} />
              <button className={styles.favoriteButton}>
                <Heart size={16} className={recipe.isFavorite ? styles.favorited : ''} />
              </button>
              <div className={styles.difficultyBadge}>
                {recipe.difficulty}
              </div>
            </div>
            
            <div className={styles.recipeInfo}>
              <h3 className={styles.recipeTitle}>{recipe.title}</h3>
              
              <div className={styles.recipeMeta}>
                <div className={styles.metaItem}>
                  <Clock size={14} />
                  <span>{recipe.time}</span>
                </div>
                <div className={styles.metaItem}>
                  <Users size={14} />
                  <span>{recipe.servings} Portionen</span>
                </div>
                <div className={styles.metaItem}>
                  <Star size={14} />
                  <span>{recipe.rating}</span>
                </div>
              </div>
              
              <button className={styles.addButton}>
                <Plus size={16} />
                Hinzufügen
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Recipe Button */}
      <div className={styles.addRecipeSection}>
        <button className={styles.addRecipeButton}>
          <Plus size={20} />
          Neues Rezept erstellen
        </button>
      </div>
    </div>
  );
};

export default Recipes;
