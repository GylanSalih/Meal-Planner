import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  category: string;
  isChecked: boolean;
  recipe?: string;
  recipeId?: number;
  isFromRecipe: boolean;
}

export interface ShoppingRecipe {
  id: number;
  title: string;
  image: string;
  ingredients: Array<{
    name: string;
    amount: string;
    unit: string;
  }>;
  servings: number;
  isAdded: boolean;
}

export interface RecipeGroup {
  recipeId: number;
  recipeName: string;
  recipeImage: string;
  items: ShoppingItem[];
  isExpanded: boolean;
}

interface ShoppingContextType {
  shoppingItems: ShoppingItem[];
  shoppingRecipes: ShoppingRecipe[];
  recipeGroups: RecipeGroup[];
  addItem: (item: Omit<ShoppingItem, 'id'>) => void;
  addRecipeIngredients: (recipe: any) => void;
  addRecipeToCart: (recipe: any) => void;
  removeRecipeFromCart: (recipeId: number) => void;
  addIndividualIngredients: (recipeId: number) => void;
  toggleRecipeGroup: (recipeId: number) => void;
  toggleItem: (id: string) => void;
  editItem: (id: string, updates: Partial<ShoppingItem>) => void;
  deleteItem: (id: string) => void;
  deleteRecipeItems: (recipeId: number) => void;
  clearCheckedItems: () => void;
}

const ShoppingContext = createContext<ShoppingContextType | undefined>(undefined);

export const useShopping = () => {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error('useShopping must be used within a ShoppingProvider');
  }
  return context;
};

interface ShoppingProviderProps {
  children: ReactNode;
}

export const ShoppingProvider: React.FC<ShoppingProviderProps> = ({ children }) => {
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);

  const [shoppingRecipes, setShoppingRecipes] = useState<ShoppingRecipe[]>([]);
  const [recipeGroups, setRecipeGroups] = useState<RecipeGroup[]>([]);

  // Update recipe groups when shopping items change
  useEffect(() => {
    const recipeItems = shoppingItems.filter(item => item.isFromRecipe && item.recipeId);
    
    // Group items by recipe
    const groupedByRecipe = recipeItems.reduce((acc, item) => {
      if (!acc[item.recipeId!]) {
        acc[item.recipeId!] = {
          recipeId: item.recipeId!,
          recipeName: item.recipe || 'Unbekanntes Rezept',
          recipeImage: '/assets/img/Projects/project1.webp', // Default image
          items: [],
          isExpanded: true
        };
      }
      if (acc[item.recipeId!]) {
        acc[item.recipeId!].items.push(item);
      }
      return acc;
    }, {} as Record<number, RecipeGroup>);

    // Convert to array and filter out empty groups
    const groupsArray = Object.values(groupedByRecipe).filter(group => group.items.length > 0);
    setRecipeGroups(groupsArray);
  }, [shoppingItems]);

  const addItem = (item: Omit<ShoppingItem, 'id'>) => {
    const newItem: ShoppingItem = {
      ...item,
      id: Date.now().toString()
    };
    setShoppingItems(prev => [...prev, newItem]);
  };

  const addRecipeIngredients = (recipe: any) => {
    const recipeItems: ShoppingItem[] = recipe.ingredients.map((ingredient: any) => ({
      id: `${recipe.id}-${ingredient.name}-${Date.now()}`,
      name: ingredient.name,
      quantity: ingredient.amount,
      unit: ingredient.unit,
      category: getCategoryFromIngredient(ingredient.name),
      isChecked: false,
      recipe: recipe.title,
      recipeId: recipe.id,
      isFromRecipe: true
    }));

    setShoppingItems(prev => {
      // Remove existing items from this recipe first
      const filteredItems = prev.filter(item => item.recipeId !== recipe.id);
      return [...filteredItems, ...recipeItems];
    });
  };

  const addRecipeToCart = (recipe: any) => {
    const shoppingRecipe: ShoppingRecipe = {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      ingredients: recipe.ingredients,
      servings: recipe.servings,
      isAdded: true
    };

    setShoppingRecipes(prev => {
      // Remove existing recipe if it exists
      const filteredRecipes = prev.filter(r => r.id !== recipe.id);
      return [...filteredRecipes, shoppingRecipe];
    });

    // Remove any existing ingredients from this recipe to ensure clean state
    setShoppingItems(prev => prev.filter(item => item.recipeId !== recipe.id));

    // DON'T automatically add ingredients - user must click "Zutaten hinzufügen"
  };

  const removeRecipeFromCart = (recipeId: number) => {
    setShoppingRecipes(prev => prev.filter(recipe => recipe.id !== recipeId));
    // Also remove all ingredients from this recipe
    setShoppingItems(prev => prev.filter(item => item.recipeId !== recipeId));
  };

  const addIndividualIngredients = (recipeId: number) => {
    const recipe = shoppingRecipes.find(r => r.id === recipeId);
    if (!recipe) return;

    const recipeItems: ShoppingItem[] = recipe.ingredients.map((ingredient: any) => ({
      id: `${recipe.id}-${ingredient.name}-${Date.now()}`,
      name: ingredient.name,
      quantity: ingredient.amount,
      unit: ingredient.unit,
      category: getCategoryFromIngredient(ingredient.name),
      isChecked: false,
      recipe: recipe.title,
      recipeId: recipe.id,
      isFromRecipe: true
    }));

    setShoppingItems(prev => {
      // Remove existing items from this recipe first
      const filteredItems = prev.filter(item => item.recipeId !== recipeId);
      return [...filteredItems, ...recipeItems];
    });
  };


  const toggleRecipeGroup = (recipeId: number) => {
    setRecipeGroups(prev => 
      prev.map(group => 
        group.recipeId === recipeId 
          ? { ...group, isExpanded: !group.isExpanded }
          : group
      )
    );
  };

  const toggleItem = (id: string) => {
    setShoppingItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const editItem = (id: string, updates: Partial<ShoppingItem>) => {
    setShoppingItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const deleteItem = (id: string) => {
    setShoppingItems(prev => prev.filter(item => item.id !== id));
  };

  const deleteRecipeItems = (recipeId: number) => {
    setShoppingItems(prev => prev.filter(item => item.recipeId !== recipeId));
  };

  const clearCheckedItems = () => {
    setShoppingItems(prev => prev.filter(item => !item.isChecked));
  };

  const getCategoryFromIngredient = (ingredientName: string): string => {
    const name = ingredientName.toLowerCase();
    
    if (name.includes('tomate') || name.includes('gurke') || name.includes('paprika') || 
        name.includes('zwiebel') || name.includes('knoblauch') || name.includes('basilikum') ||
        name.includes('koriander') || name.includes('salat') || name.includes('karotte')) {
      return 'gemuese';
    }
    
    if (name.includes('banane') || name.includes('beere') || name.includes('apfel') ||
        name.includes('orange') || name.includes('zitrone') || name.includes('avocado')) {
      return 'obst';
    }
    
    if (name.includes('hähnchen') || name.includes('fleisch') || name.includes('wurst') ||
        name.includes('schinken') || name.includes('fisch')) {
      return 'fleisch';
    }
    
    if (name.includes('milch') || name.includes('käse') || name.includes('joghurt') ||
        name.includes('mozzarella') || name.includes('butter') || name.includes('sahne')) {
      return 'milchprodukte';
    }
    
    if (name.includes('brot') || name.includes('mehl') || name.includes('nudel') ||
        name.includes('spaghetti') || name.includes('reis') || name.includes('hafer')) {
      return 'backwaren';
    }
    
    return 'alle';
  };

  const value: ShoppingContextType = {
    shoppingItems,
    shoppingRecipes,
    recipeGroups,
    addItem,
    addRecipeIngredients,
    addRecipeToCart,
    removeRecipeFromCart,
    addIndividualIngredients,
    toggleRecipeGroup,
    toggleItem,
    editItem,
    deleteItem,
    deleteRecipeItems,
    clearCheckedItems
  };

  return (
    <ShoppingContext.Provider value={value}>
      {children}
    </ShoppingContext.Provider>
  );
};
