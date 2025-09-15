import React, { useState } from 'react';
import { ArrowLeft, Clock, Users, Flame, ShoppingCart, Heart, Share2, Plus, Minus, Check } from 'lucide-react';
import { useShopping } from '../../contexts/ShoppingContext';
import styles from './RecipeDetail.module.scss';

interface RecipeDetailProps {
  recipe: {
    id: number;
    title: string;
    image: string;
    time: string;
    servings: number;
    difficulty: string;
    isFavorite: boolean;
    description: string;
    ingredients: Array<{
      name: string;
      amount: string;
      unit: string;
    }>;
    instructions: Array<{
      step: number;
      description: string;
    }>;
    nutrition: {
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
    };
    tags: string[];
  };
  onClose: () => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onClose }) => {
  const [servingCount, setServingCount] = useState(recipe.servings);
  const [isFavorite, setIsFavorite] = useState(recipe.isFavorite);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions' | 'nutrition'>('ingredients');
  const [isAddedToShopping, setIsAddedToShopping] = useState(false);
  
  // Safely get shopping context
  let addRecipeToCart: any = () => {};
  let removeRecipeFromCart: any = () => {};
  let shoppingRecipes: any[] = [];
  
  try {
    const shoppingContext = useShopping();
    addRecipeToCart = shoppingContext.addRecipeToCart;
    removeRecipeFromCart = shoppingContext.removeRecipeFromCart;
    shoppingRecipes = shoppingContext.shoppingRecipes;
  } catch (error) {
    console.warn('Shopping context not available:', error);
  }

  const adjustServings = (direction: 'increase' | 'decrease') => {
    if (direction === 'increase') {
      setServingCount(prev => prev + 1);
    } else if (direction === 'decrease' && servingCount > 1) {
      setServingCount(prev => prev - 1);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(prev => !prev);
  };

  const addToShoppingList = () => {
    if (isAddedToShopping) {
      // Remove from shopping list
      try {
        removeRecipeFromCart(recipe.id);
        setIsAddedToShopping(false);
      } catch (error) {
        console.error('Error removing recipe from shopping list:', error);
        setIsAddedToShopping(false);
      }
    } else {
      // Add to shopping list
      try {
        addRecipeToCart(recipe);
        setIsAddedToShopping(true);
      } catch (error) {
        console.error('Error adding recipe to shopping list:', error);
        // Fallback: just show success message
        setIsAddedToShopping(true);
      }
    }
  };

  // Check if recipe is already in shopping list
  React.useEffect(() => {
    try {
      const isInShoppingList = shoppingRecipes.some(recipeItem => recipeItem.id === recipe.id);
      setIsAddedToShopping(isInShoppingList);
    } catch (error) {
      console.error('Error checking shopping list:', error);
      setIsAddedToShopping(false);
    }
  }, [shoppingRecipes, recipe.id]);

  const shareRecipe = () => {
    // In a real app, this would share the recipe
    console.log('Share recipe:', recipe.title);
  };

  return (
    <div className={styles.recipeDetail}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onClose}>
          <ArrowLeft size={24} />
        </button>
        <div className={styles.headerActions}>
          <button className={styles.shareButton} onClick={shareRecipe}>
            <Share2 size={20} />
          </button>
          <button 
            className={`${styles.favoriteButton} ${isFavorite ? styles.favorited : ''}`}
            onClick={toggleFavorite}
          >
            <Heart size={20} />
          </button>
        </div>
      </div>

      {/* Recipe Image */}
      <div className={styles.recipeImage}>
        <img src={recipe.image} alt={recipe.title} />
        <div className={styles.imageOverlay}>
          <div className={styles.recipeBadges}>
            <div className={styles.difficultyBadge}>
              {recipe.difficulty}
            </div>
            <div className={styles.caloriesBadge}>
              <Flame size={16} />
              {recipe.nutrition.calories} kcal
            </div>
          </div>
        </div>
      </div>

      {/* Recipe Info */}
      <div className={styles.recipeInfo}>
        <h1 className={styles.recipeTitle}>{recipe.title}</h1>
        <p className={styles.recipeDescription}>{recipe.description}</p>

        {/* Meta Information */}
        <div className={styles.recipeMeta}>
          <div className={styles.metaItem}>
            <Clock size={20} />
            <span>{recipe.time}</span>
          </div>
          <div className={styles.metaItem}>
            <Users size={20} />
            <div className={styles.servingControl}>
              <button 
                className={styles.servingButton}
                onClick={() => adjustServings('decrease')}
                disabled={servingCount <= 1}
              >
                <Minus size={16} />
              </button>
              <span className={styles.servingCount}>{servingCount}</span>
              <button 
                className={styles.servingButton}
                onClick={() => adjustServings('increase')}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className={styles.tags}>
          {recipe.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <button 
            className={`${styles.addToShoppingButton} ${isAddedToShopping ? styles.added : ''}`}
            onClick={addToShoppingList}
          >
            {isAddedToShopping ? (
              <>
                <Check size={20} />
                Zur Einkaufsliste hinzugefügt
              </>
            ) : (
              <>
                <ShoppingCart size={20} />
                Zur Einkaufsliste hinzufügen
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === 'ingredients' ? styles.active : ''}`}
          onClick={() => setActiveTab('ingredients')}
        >
          Zutaten
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'instructions' ? styles.active : ''}`}
          onClick={() => setActiveTab('instructions')}
        >
          Zubereitung
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'nutrition' ? styles.active : ''}`}
          onClick={() => setActiveTab('nutrition')}
        >
          Nährwerte
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {activeTab === 'ingredients' && (
          <div className={styles.ingredients}>
            <h3>Zutaten für {servingCount} Portion{servingCount !== 1 ? 'en' : ''}</h3>
            <div className={styles.ingredientsList}>
              {recipe.ingredients.map((ingredient, index) => (
                <div key={index} className={styles.ingredientItem}>
                  <div className={styles.ingredientAmount}>
                    {Math.round((parseFloat(ingredient.amount) * servingCount / recipe.servings) * 10) / 10} {ingredient.unit}
                  </div>
                  <div className={styles.ingredientName}>{ingredient.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'instructions' && (
          <div className={styles.instructions}>
            <h3>Zubereitung</h3>
            <div className={styles.instructionsList}>
              {recipe.instructions.map((instruction, index) => (
                <div key={index} className={styles.instructionItem}>
                  <div className={styles.stepNumber}>{instruction.step}</div>
                  <div className={styles.stepDescription}>{instruction.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'nutrition' && (
          <div className={styles.nutrition}>
            <h3>Nährwerte pro Portion</h3>
            <div className={styles.nutritionGrid}>
              <div className={styles.nutritionItem}>
                <div className={styles.nutritionValue}>{recipe.nutrition.calories}</div>
                <div className={styles.nutritionLabel}>Kalorien</div>
              </div>
              <div className={styles.nutritionItem}>
                <div className={styles.nutritionValue}>{recipe.nutrition.protein}g</div>
                <div className={styles.nutritionLabel}>Protein</div>
              </div>
              <div className={styles.nutritionItem}>
                <div className={styles.nutritionValue}>{recipe.nutrition.carbs}g</div>
                <div className={styles.nutritionLabel}>Kohlenhydrate</div>
              </div>
              <div className={styles.nutritionItem}>
                <div className={styles.nutritionValue}>{recipe.nutrition.fat}g</div>
                <div className={styles.nutritionLabel}>Fett</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;
