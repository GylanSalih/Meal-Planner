import React, { useState } from 'react';
import { ShoppingCart, Plus, Check, Tag, Filter, Search, Trash2, Edit3 } from 'lucide-react';
import styles from './Shopping.module.scss';

const Shopping: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'recipes'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('alle');

  const tags = [
    { id: 'alle', name: 'Alle', count: 24 },
    { id: 'obst', name: 'Obst', count: 8 },
    { id: 'gemuese', name: 'Gemüse', count: 12 },
    { id: 'fleisch', name: 'Fleisch', count: 6 },
    { id: 'milchprodukte', name: 'Milchprodukte', count: 4 },
    { id: 'backwaren', name: 'Backwaren', count: 3 }
  ];

  const shoppingItems = [
    {
      id: 1,
      name: 'Tomaten',
      quantity: '500g',
      category: 'gemuese',
      isChecked: false,
      recipe: 'Mediterrane Pasta',
      price: '2.50€'
    },
    {
      id: 2,
      name: 'Mozzarella',
      quantity: '250g',
      category: 'milchprodukte',
      isChecked: true,
      recipe: 'Caprese Salat',
      price: '3.20€'
    },
    {
      id: 3,
      name: 'Basilikum',
      quantity: '1 Bund',
      category: 'gemuese',
      isChecked: false,
      recipe: 'Pesto Pasta',
      price: '1.80€'
    },
    {
      id: 4,
      name: 'Spaghetti',
      quantity: '500g',
      category: 'backwaren',
      isChecked: false,
      recipe: 'Mediterrane Pasta',
      price: '1.20€'
    },
    {
      id: 5,
      name: 'Olivenöl',
      quantity: '1 Flasche',
      category: 'alle',
      isChecked: true,
      recipe: 'Verschiedene',
      price: '4.50€'
    },
    {
      id: 6,
      name: 'Knoblauch',
      quantity: '3 Zehen',
      category: 'gemuese',
      isChecked: false,
      recipe: 'Pasta Aglio e Olio',
      price: '0.50€'
    }
  ];

  const recipes = [
    {
      id: 1,
      name: 'Mediterrane Pasta',
      image: '/assets/img/Projects/project1.webp',
      items: 4,
      totalPrice: '7.40€',
      isAdded: true
    },
    {
      id: 2,
      name: 'Caprese Salat',
      image: '/assets/img/Projects/project2.jpg',
      items: 3,
      totalPrice: '5.50€',
      isAdded: false
    },
    {
      id: 3,
      name: 'Pesto Pasta',
      image: '/assets/img/Projects/project3.webp',
      items: 5,
      totalPrice: '8.20€',
      isAdded: true
    }
  ];

  const filteredItems = shoppingItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'alle' || item.category === selectedTag;
    return matchesSearch && matchesTag;
  });

  const checkedItems = filteredItems.filter(item => item.isChecked);
  const uncheckedItems = filteredItems.filter(item => !item.isChecked);
  const totalPrice = filteredItems.reduce((sum, item) => {
    return sum + parseFloat(item.price.replace('€', '').replace(',', '.'));
  }, 0);

  const toggleItem = (id: number) => {
    // In a real app, this would update the state
    console.log('Toggle item:', id);
  };

  const addRecipeToList = (recipeId: number) => {
    // In a real app, this would add recipe items to shopping list
    console.log('Add recipe to list:', recipeId);
  };

  return (
    <div className={styles.shopping}>
      {/* Header */}
      <div className={styles.header}>
        <h1>Einkaufsliste</h1>
        <div className={styles.headerActions}>
          <button className={styles.filterButton}>
            <Filter size={20} />
          </button>
          <button className={styles.addButton}>
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className={styles.searchSection}>
        <div className={styles.searchBar}>
          <Search size={20} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Artikel suchen..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === 'list' ? styles.active : ''}`}
          onClick={() => setActiveTab('list')}
        >
          Einkaufsliste
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'recipes' ? styles.active : ''}`}
          onClick={() => setActiveTab('recipes')}
        >
          Aus Rezepten
        </button>
      </div>

      {/* Shopping List Tab */}
      {activeTab === 'list' && (
        <div className={styles.listTab}>
          {/* Tags */}
          <div className={styles.tags}>
            {tags.map(tag => (
              <button
                key={tag.id}
                className={`${styles.tag} ${selectedTag === tag.id ? styles.active : ''}`}
                onClick={() => setSelectedTag(tag.id)}
              >
                <Tag size={14} />
                {tag.name}
                <span className={styles.count}>({tag.count})</span>
              </button>
            ))}
          </div>

          {/* Summary */}
          <div className={styles.summary}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Gesamt:</span>
              <span className={styles.summaryValue}>{filteredItems.length} Artikel</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Erledigt:</span>
              <span className={styles.summaryValue}>{checkedItems.length}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Preis:</span>
              <span className={styles.summaryValue}>{totalPrice.toFixed(2)}€</span>
            </div>
          </div>

          {/* Shopping Items */}
          <div className={styles.itemsList}>
            {/* Unchecked Items */}
            {uncheckedItems.map(item => (
              <div key={item.id} className={styles.shoppingItem}>
                <button 
                  className={styles.checkButton}
                  onClick={() => toggleItem(item.id)}
                >
                  <div className={styles.checkbox}></div>
                </button>
                
                <div className={styles.itemInfo}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <div className={styles.itemDetails}>
                    <span className={styles.quantity}>{item.quantity}</span>
                    <span className={styles.recipe}>aus {item.recipe}</span>
                  </div>
                </div>
                
                <div className={styles.itemActions}>
                  <span className={styles.price}>{item.price}</span>
                  <div className={styles.actionButtons}>
                    <button className={styles.editButton}>
                      <Edit3 size={16} />
                    </button>
                    <button className={styles.deleteButton}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Checked Items */}
            {checkedItems.map(item => (
              <div key={item.id} className={`${styles.shoppingItem} ${styles.checked}`}>
                <button 
                  className={styles.checkButton}
                  onClick={() => toggleItem(item.id)}
                >
                  <div className={`${styles.checkbox} ${styles.checked}`}>
                    <Check size={12} />
                  </div>
                </button>
                
                <div className={styles.itemInfo}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <div className={styles.itemDetails}>
                    <span className={styles.quantity}>{item.quantity}</span>
                    <span className={styles.recipe}>aus {item.recipe}</span>
                  </div>
                </div>
                
                <div className={styles.itemActions}>
                  <span className={styles.price}>{item.price}</span>
                  <div className={styles.actionButtons}>
                    <button className={styles.editButton}>
                      <Edit3 size={16} />
                    </button>
                    <button className={styles.deleteButton}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recipes Tab */}
      {activeTab === 'recipes' && (
        <div className={styles.recipesTab}>
          <div className={styles.recipesList}>
            {recipes.map(recipe => (
              <div key={recipe.id} className={styles.recipeCard}>
                <div className={styles.recipeImage}>
                  <img src={recipe.image} alt={recipe.name} />
                </div>
                
                <div className={styles.recipeInfo}>
                  <h3 className={styles.recipeName}>{recipe.name}</h3>
                  <div className={styles.recipeDetails}>
                    <span className={styles.itemCount}>{recipe.items} Artikel</span>
                    <span className={styles.recipePrice}>{recipe.totalPrice}</span>
                  </div>
                </div>
                
                <button 
                  className={`${styles.addRecipeButton} ${recipe.isAdded ? styles.added : ''}`}
                  onClick={() => addRecipeToList(recipe.id)}
                >
                  {recipe.isAdded ? (
                    <>
                      <Check size={16} />
                      Hinzugefügt
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      Hinzufügen
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Shopping;
