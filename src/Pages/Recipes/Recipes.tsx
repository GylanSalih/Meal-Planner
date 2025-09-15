import React, { useState } from 'react';
import { Search, Filter, Clock, Users, Flame, Heart, Plus } from 'lucide-react';
import RecipeDetail from '../../components/RecipeDetail/RecipeDetail';
import RecipeForm from '../../components/RecipeForm/RecipeForm';
import styles from './Recipes.module.scss';

const initialRecipes = [
    {
      id: 1,
      title: 'Mediterrane Pasta',
      image: '/assets/img/Projects/project1.webp',
      time: '25 Min',
      servings: 4,
      category: 'mittagessen',
      difficulty: 'Einfach',
      isFavorite: true,
      description: 'Eine köstliche mediterrane Pasta mit frischen Tomaten, Basilikum und Mozzarella. Perfekt für ein schnelles und gesundes Mittagessen.',
      ingredients: [
        { name: 'Spaghetti', amount: '400', unit: 'g' },
        { name: 'Tomaten', amount: '500', unit: 'g' },
        { name: 'Mozzarella', amount: '200', unit: 'g' },
        { name: 'Basilikum', amount: '1', unit: 'Bund' },
        { name: 'Olivenöl', amount: '3', unit: 'EL' },
        { name: 'Knoblauch', amount: '2', unit: 'Zehen' },
        { name: 'Salz', amount: '1', unit: 'TL' },
        { name: 'Pfeffer', amount: '1', unit: 'Prise' }
      ],
      instructions: [
        { step: 1, description: 'Spaghetti nach Packungsanweisung in Salzwasser kochen.' },
        { step: 2, description: 'Tomaten waschen und in kleine Würfel schneiden.' },
        { step: 3, description: 'Mozzarella in kleine Stücke schneiden.' },
        { step: 4, description: 'Knoblauch schälen und fein hacken.' },
        { step: 5, description: 'Olivenöl in einer Pfanne erhitzen und Knoblauch kurz anbraten.' },
        { step: 6, description: 'Tomaten hinzufügen und 5 Minuten köcheln lassen.' },
        { step: 7, description: 'Spaghetti abgießen und mit der Tomatensauce vermischen.' },
        { step: 8, description: 'Mozzarella und Basilikum unterheben, mit Salz und Pfeffer würzen.' }
      ],
      nutrition: {
        calories: 420,
        protein: 18,
        carbs: 65,
        fat: 12
      },
      tags: ['Vegetarisch', 'Italienisch', 'Schnell']
    },
    {
      id: 2,
      title: 'Gesunder Smoothie Bowl',
      image: '/assets/img/Projects/project2.jpg',
      time: '10 Min',
      servings: 2,
      category: 'fruehstueck',
      difficulty: 'Einfach',
      isFavorite: false,
      description: 'Eine nährstoffreiche Smoothie Bowl mit frischen Früchten und Toppings. Ideal für ein gesundes Frühstück.',
      ingredients: [
        { name: 'Bananen', amount: '2', unit: 'Stück' },
        { name: 'Beeren', amount: '150', unit: 'g' },
        { name: 'Joghurt', amount: '200', unit: 'g' },
        { name: 'Haferflocken', amount: '4', unit: 'EL' },
        { name: 'Honig', amount: '2', unit: 'TL' },
        { name: 'Chiasamen', amount: '1', unit: 'EL' },
        { name: 'Kokosflocken', amount: '2', unit: 'EL' }
      ],
      instructions: [
        { step: 1, description: 'Bananen schälen und in Stücke schneiden.' },
        { step: 2, description: 'Beeren waschen und verlesen.' },
        { step: 3, description: 'Bananen, Beeren und Joghurt in einen Mixer geben.' },
        { step: 4, description: 'Honig hinzufügen und alles pürieren.' },
        { step: 5, description: 'Smoothie in Schalen füllen.' },
        { step: 6, description: 'Mit Haferflocken, Chiasamen und Kokosflocken garnieren.' }
      ],
      nutrition: {
        calories: 280,
        protein: 12,
        carbs: 45,
        fat: 8
      },
      tags: ['Vegan', 'Gesund', 'Frühstück']
    },
    {
      id: 3,
      title: 'Gegrilltes Hähnchen',
      image: '/assets/img/Projects/project3.webp',
      time: '45 Min',
      servings: 6,
      category: 'abendessen',
      difficulty: 'Mittel',
      isFavorite: true,
      description: 'Saftiges gegrilltes Hähnchen mit mediterranen Gewürzen. Ein klassisches Gericht für den Grillabend.',
      ingredients: [
        { name: 'Hähnchenbrust', amount: '800', unit: 'g' },
        { name: 'Olivenöl', amount: '4', unit: 'EL' },
        { name: 'Zitrone', amount: '1', unit: 'Stück' },
        { name: 'Rosmarin', amount: '2', unit: 'Zweige' },
        { name: 'Thymian', amount: '2', unit: 'Zweige' },
        { name: 'Knoblauch', amount: '4', unit: 'Zehen' },
        { name: 'Salz', amount: '1', unit: 'TL' },
        { name: 'Pfeffer', amount: '1', unit: 'TL' }
      ],
      instructions: [
        { step: 1, description: 'Hähnchenbrust waschen und trocken tupfen.' },
        { step: 2, description: 'Zitrone auspressen und Saft mit Olivenöl vermischen.' },
        { step: 3, description: 'Knoblauch schälen und fein hacken.' },
        { step: 4, description: 'Rosmarin und Thymian fein hacken.' },
        { step: 5, description: 'Gewürze mit Zitronenöl vermischen und Hähnchen marinieren.' },
        { step: 6, description: 'Mindestens 30 Minuten marinieren lassen.' },
        { step: 7, description: 'Grill auf mittlere Hitze vorheizen.' },
        { step: 8, description: 'Hähnchen 6-8 Minuten pro Seite grillen.' }
      ],
      nutrition: {
        calories: 320,
        protein: 45,
        carbs: 2,
        fat: 14
      },
      tags: ['Proteinreich', 'Grillen', 'Mittelmeer']
    },
    {
      id: 4,
      title: 'Quinoa Salat',
      image: '/assets/img/Projects/project4.webp',
      time: '20 Min',
      servings: 3,
      category: 'mittagessen',
      difficulty: 'Einfach',
      isFavorite: false,
      description: 'Ein nährstoffreicher Quinoa Salat mit frischem Gemüse und einem leckeren Dressing.',
      ingredients: [
        { name: 'Quinoa', amount: '200', unit: 'g' },
        { name: 'Gurke', amount: '1', unit: 'Stück' },
        { name: 'Tomaten', amount: '2', unit: 'Stück' },
        { name: 'Paprika', amount: '1', unit: 'Stück' },
        { name: 'Zwiebel', amount: '1', unit: 'Stück' },
        { name: 'Olivenöl', amount: '3', unit: 'EL' },
        { name: 'Zitrone', amount: '1', unit: 'Stück' },
        { name: 'Kräuter', amount: '1', unit: 'Bund' }
      ],
      instructions: [
        { step: 1, description: 'Quinoa nach Packungsanweisung kochen und abkühlen lassen.' },
        { step: 2, description: 'Gurke waschen und in kleine Würfel schneiden.' },
        { step: 3, description: 'Tomaten waschen und würfeln.' },
        { step: 4, description: 'Paprika entkernen und in Streifen schneiden.' },
        { step: 5, description: 'Zwiebel schälen und fein würfeln.' },
        { step: 6, description: 'Dressing aus Olivenöl, Zitronensaft und Kräutern herstellen.' },
        { step: 7, description: 'Alle Zutaten in einer Schüssel vermischen.' },
        { step: 8, description: 'Mit Dressing beträufeln und 10 Minuten ziehen lassen.' }
      ],
      nutrition: {
        calories: 250,
        protein: 8,
        carbs: 35,
        fat: 10
      },
      tags: ['Vegan', 'Gesund', 'Salat']
    },
    {
      id: 5,
      title: 'Schokoladen Muffins',
      image: '/assets/img/Projects/project5.webp',
      time: '30 Min',
      servings: 12,
      category: 'desserts',
      difficulty: 'Einfach',
      isFavorite: true,
      description: 'Saftige Schokoladen Muffins mit einem zarten Schokoladenkern. Perfekt für den süßen Nachmittag.',
      ingredients: [
        { name: 'Mehl', amount: '250', unit: 'g' },
        { name: 'Zucker', amount: '150', unit: 'g' },
        { name: 'Kakao', amount: '50', unit: 'g' },
        { name: 'Backpulver', amount: '2', unit: 'TL' },
        { name: 'Eier', amount: '2', unit: 'Stück' },
        { name: 'Milch', amount: '200', unit: 'ml' },
        { name: 'Öl', amount: '80', unit: 'ml' },
        { name: 'Schokolade', amount: '100', unit: 'g' }
      ],
      instructions: [
        { step: 1, description: 'Backofen auf 180°C vorheizen.' },
        { step: 2, description: 'Muffinblech mit Papierförmchen auslegen.' },
        { step: 3, description: 'Mehl, Zucker, Kakao und Backpulver in einer Schüssel vermischen.' },
        { step: 4, description: 'Eier, Milch und Öl in einer anderen Schüssel verquirlen.' },
        { step: 5, description: 'Flüssige Zutaten zu den trockenen Zutaten geben und verrühren.' },
        { step: 6, description: 'Schokolade in kleine Stücke hacken und unterheben.' },
        { step: 7, description: 'Teig in die Muffinförmchen füllen.' },
        { step: 8, description: '20-25 Minuten backen und abkühlen lassen.' }
      ],
      nutrition: {
        calories: 180,
        protein: 4,
        carbs: 28,
        fat: 7
      },
      tags: ['Süß', 'Backen', 'Schokolade']
    },
    {
      id: 6,
      title: 'Avocado Toast',
      image: '/assets/img/Projects/project6.webp',
      time: '5 Min',
      servings: 1,
      category: 'fruehstueck',
      difficulty: 'Einfach',
      isFavorite: false,
      description: 'Ein schneller und gesunder Avocado Toast mit frischen Toppings. Ideal für ein schnelles Frühstück.',
      ingredients: [
        { name: 'Brot', amount: '2', unit: 'Scheiben' },
        { name: 'Avocado', amount: '1', unit: 'Stück' },
        { name: 'Zitrone', amount: '0.5', unit: 'Stück' },
        { name: 'Salz', amount: '1', unit: 'Prise' },
        { name: 'Pfeffer', amount: '1', unit: 'Prise' },
        { name: 'Chili', amount: '1', unit: 'Prise' },
        { name: 'Koriander', amount: '1', unit: 'Zweig' }
      ],
      instructions: [
        { step: 1, description: 'Brot toasten.' },
        { step: 2, description: 'Avocado halbieren und Kern entfernen.' },
        { step: 3, description: 'Avocado aus der Schale lösen und in eine Schüssel geben.' },
        { step: 4, description: 'Mit Zitronensaft, Salz, Pfeffer und Chili würzen.' },
        { step: 5, description: 'Avocado mit einer Gabel zerdrücken.' },
        { step: 6, description: 'Auf das getoastete Brot streichen.' },
        { step: 7, description: 'Mit Koriander garnieren und servieren.' }
      ],
      nutrition: {
        calories: 220,
        protein: 6,
        carbs: 25,
        fat: 12
      },
      tags: ['Vegan', 'Schnell', 'Gesund']
    }
  ];

const Recipes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('alle');
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const [recipes, setRecipes] = useState(initialRecipes);

  const categories = [
    { id: 'alle', name: 'Alle', count: 24 },
    { id: 'fruehstueck', name: 'Frühstück', count: 8 },
    { id: 'mittagessen', name: 'Mittagessen', count: 12 },
    { id: 'abendessen', name: 'Abendessen', count: 10 },
    { id: 'snacks', name: 'Snacks', count: 6 },
    { id: 'desserts', name: 'Desserts', count: 4 }
  ];

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'alle' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleViewRecipe = (recipe: any) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseRecipe = () => {
    setSelectedRecipe(null);
  };

  const handleCreateRecipe = () => {
    setShowRecipeForm(true);
  };

  const handleCloseRecipeForm = () => {
    setShowRecipeForm(false);
  };

  const handleSaveRecipe = (newRecipe: any) => {
    setRecipes(prevRecipes => [...prevRecipes, newRecipe]);
    setShowRecipeForm(false);
  };

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
                  <Flame size={14} />
                  <span>{recipe.nutrition.calories} kcal</span>
                </div>
              </div>
              
              <button 
                className={styles.viewButton}
                onClick={() => handleViewRecipe(recipe)}
              >
                Rezept anschauen
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Recipe Button */}
      <div className={styles.addRecipeSection}>
        <button className={styles.addRecipeButton} onClick={handleCreateRecipe}>
          <Plus size={20} />
          Neues Rezept erstellen
        </button>
      </div>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <RecipeDetail 
          recipe={selectedRecipe} 
          onClose={handleCloseRecipe} 
        />
      )}

      {/* Recipe Form Modal */}
      {showRecipeForm && (
        <RecipeForm 
          onClose={handleCloseRecipeForm}
          onSave={handleSaveRecipe}
        />
      )}
    </div>
  );
};

export default Recipes;
