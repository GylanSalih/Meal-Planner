import React, { useState } from 'react';
import { ShoppingCart, Plus, Check, Tag, Filter, Search, Trash2, Edit3, ChevronDown, ChevronRight } from 'lucide-react';
import { useShopping } from '../../contexts/ShoppingContext';
import EditItemModal from '../../components/EditItemModal/EditItemModal';
import styles from './Shopping.module.scss';

const Shopping: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'recipes'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('alle');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isNewItem, setIsNewItem] = useState(false);

  const { 
    shoppingItems, 
    shoppingRecipes,
    recipeGroups,
    addItem,
    addIndividualIngredients,
    removeRecipeFromCart,
    toggleRecipeGroup,
    toggleItem, 
    editItem, 
    deleteItem, 
    clearCheckedItems 
  } = useShopping();

  const tags = [
    { id: 'alle', name: 'Alle', count: shoppingItems.length },
    { id: 'obst', name: 'Obst', count: shoppingItems.filter(item => item.category === 'obst').length },
    { id: 'gemuese', name: 'Gemüse', count: shoppingItems.filter(item => item.category === 'gemuese').length },
    { id: 'fleisch', name: 'Fleisch', count: shoppingItems.filter(item => item.category === 'fleisch').length },
    { id: 'milchprodukte', name: 'Milchprodukte', count: shoppingItems.filter(item => item.category === 'milchprodukte').length },
    { id: 'backwaren', name: 'Backwaren', count: shoppingItems.filter(item => item.category === 'backwaren').length }
  ];


  // Separate regular items from recipe items
  const regularItems = shoppingItems.filter(item => !item.isFromRecipe);

  const filteredRegularItems = regularItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'alle' || item.category === selectedTag;
    return matchesSearch && matchesTag;
  });

  const checkedItems = filteredRegularItems.filter(item => item.isChecked);
  const uncheckedItems = filteredRegularItems.filter(item => !item.isChecked);

  // Calculate total items including recipe items
  const allItems = shoppingItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'alle' || item.category === selectedTag;
    return matchesSearch && matchesTag;
  });
  
  const allCheckedItems = allItems.filter(item => item.isChecked);

  // Handle adding individual ingredients from recipe
  const handleAddIngredients = (recipeId: number) => {
    addIndividualIngredients(recipeId);
  };

  // Handle removing recipe from cart
  const handleRemoveRecipe = (recipeId: number) => {
    removeRecipeFromCart(recipeId);
  };

  const handleEditItem = (item: any) => {
    setEditingItem(item);
    setIsNewItem(false);
    setEditModalOpen(true);
  };

  const handleAddNewItem = () => {
    setEditingItem(null);
    setIsNewItem(true);
    setEditModalOpen(true);
  };

  const handleSaveItem = (itemData: { name: string; quantity: string; unit: string; category: string }) => {
    if (isNewItem) {
      addItem({
        name: itemData.name,
        quantity: itemData.quantity,
        unit: itemData.unit,
        category: itemData.category,
        isChecked: false,
        isFromRecipe: false
      });
    } else if (editingItem) {
      editItem(editingItem.id, {
        name: itemData.name,
        quantity: itemData.quantity,
        unit: itemData.unit,
        category: itemData.category
      });
    }
    setEditModalOpen(false);
    setEditingItem(null);
    setIsNewItem(false);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setEditingItem(null);
    setIsNewItem(false);
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
          <button className={styles.addButton} onClick={handleAddNewItem}>
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
              <span className={styles.summaryValue}>{allItems.length} Artikel</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Erledigt:</span>
              <span className={styles.summaryValue}>{allCheckedItems.length}</span>
            </div>
            <div className={styles.clearButtons}>
              {checkedItems.length > 0 && (
                <button 
                  className={styles.clearButton}
                  onClick={clearCheckedItems}
                >
                  Erledigte löschen
                </button>
              )}
              {filteredRegularItems.length > 0 && (
                <button 
                  className={styles.clearAllButton}
                  onClick={() => {
                    if (window.confirm('Möchten Sie wirklich alle Items löschen?')) {
                      filteredRegularItems.forEach(item => deleteItem(item.id));
                    }
                  }}
                >
                  Alle löschen
                </button>
              )}
            </div>
          </div>

          {/* Shopping Items */}
          <div className={styles.itemsList}>
            {/* Recipe Groups */}
            {recipeGroups.map(group => (
              <div key={group.recipeId} className={styles.recipeGroup}>
                <div className={styles.recipeGroupHeader} onClick={() => toggleRecipeGroup(group.recipeId)}>
                  <div className={styles.recipeGroupInfo}>
                    <div className={styles.recipeGroupImage}>
                      <img src={group.recipeImage} alt={group.recipeName} />
                    </div>
                    <div className={styles.recipeGroupDetails}>
                      <h3 className={styles.recipeGroupName}>{group.recipeName}</h3>
                      <span className={styles.recipeGroupCount}>{group.items.length} Zutaten</span>
                    </div>
                  </div>
                  <div className={styles.recipeGroupToggle}>
                    {group.isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  </div>
                </div>
                
                {group.isExpanded && (
                  <div className={styles.recipeGroupItems}>
                    {group.items.map(item => (
                      <div key={item.id} className={`${styles.shoppingItem} ${item.isChecked ? styles.checked : ''}`}>
                        <button 
                          className={styles.checkButton}
                          onClick={() => toggleItem(item.id)}
                        >
                          <div className={`${styles.checkbox} ${item.isChecked ? styles.checked : ''}`}>
                            {item.isChecked && <Check size={12} />}
                          </div>
                        </button>
                        
                        <div className={styles.itemInfo}>
                          <h3 className={styles.itemName}>{item.name}</h3>
                          <div className={styles.itemDetails}>
                            <span className={styles.quantity}>{item.quantity} {item.unit}</span>
                          </div>
                        </div>
                        
                        <div className={styles.itemActions}>
                          <div className={styles.actionButtons}>
                            <button 
                              className={styles.editButton}
                              onClick={() => handleEditItem(item)}
                            >
                              <Edit3 size={16} />
                            </button>
                            <button 
                              className={styles.deleteButton}
                              onClick={() => deleteItem(item.id)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Regular Unchecked Items */}
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
                    <span className={styles.quantity}>{item.quantity} {item.unit}</span>
                  </div>
                </div>
                
                <div className={styles.itemActions}>
                  <div className={styles.actionButtons}>
                    <button 
                      className={styles.editButton}
                      onClick={() => handleEditItem(item)}
                    >
                      <Edit3 size={16} />
                    </button>
                    <button 
                      className={styles.deleteButton}
                      onClick={() => deleteItem(item.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Regular Checked Items */}
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
                    <span className={styles.quantity}>{item.quantity} {item.unit}</span>
                  </div>
                </div>
                
                <div className={styles.itemActions}>
                  <div className={styles.actionButtons}>
                    <button 
                      className={styles.editButton}
                      onClick={() => handleEditItem(item)}
                    >
                      <Edit3 size={16} />
                    </button>
                    <button 
                      className={styles.deleteButton}
                      onClick={() => deleteItem(item.id)}
                    >
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
            {shoppingRecipes.length > 0 ? (
              shoppingRecipes.map(recipe => (
                <div key={recipe.id} className={styles.recipeCard}>
                  <div className={styles.recipeImage}>
                    <img src={recipe.image} alt={recipe.title} />
                  </div>
                  
                  <div className={styles.recipeInfo}>
                    <h3 className={styles.recipeName}>{recipe.title}</h3>
                    <div className={styles.recipeDetails}>
                      <span className={styles.itemCount}>{recipe.ingredients.length} Zutaten</span>
                      <span className={styles.servings}>{recipe.servings} Portionen</span>
                    </div>
                  </div>
                  
                  <div className={styles.recipeActions}>
                    <button 
                      className={styles.addIngredientsButton}
                      onClick={() => handleAddIngredients(recipe.id)}
                    >
                      <Plus size={16} />
                      Zutaten hinzufügen
                    </button>
                    <button 
                      className={styles.deleteRecipeButton}
                      onClick={() => handleRemoveRecipe(recipe.id)}
                    >
                      <Trash2 size={16} />
                      Entfernen
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>
                <ShoppingCart size={48} />
                <h3>Keine Rezepte hinzugefügt</h3>
                <p>Gehen Sie zu den Rezepten und fügen Sie Rezepte zur Einkaufsliste hinzu.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      <EditItemModal
        isOpen={editModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveItem}
        initialData={editingItem ? {
          name: editingItem.name,
          quantity: editingItem.quantity,
          unit: editingItem.unit,
          category: editingItem.category
        } : {
          name: '',
          quantity: '',
          unit: 'g',
          category: 'alle'
        }}
        isNewItem={isNewItem}
      />
    </div>
  );
};

export default Shopping;
