import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import styles from './RecipeForm.module.scss';

interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

interface Instruction {
  step: number;
  description: string;
}

interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface RecipeFormProps {
  onClose: () => void;
  onSave: (recipe: any) => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    time: '',
    servings: 1,
    difficulty: 'Einfach',
    category: 'mittagessen',
    image: '/assets/img/Projects/project1.webp', // Default image
    isFavorite: false
  });

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const [instructions, setInstructions] = useState<Instruction[]>([]);

  const [nutrition, setNutrition] = useState<Nutrition>({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  });

  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const categories = [
    { id: 'fruehstueck', name: 'Frühstück' },
    { id: 'mittagessen', name: 'Mittagessen' },
    { id: 'abendessen', name: 'Abendessen' },
    { id: 'snacks', name: 'Snacks' },
    { id: 'desserts', name: 'Desserts' }
  ];

  const difficulties = ['Einfach', 'Mittel', 'Schwer'];
  const units = ['g', 'kg', 'ml', 'l', 'Stück', 'EL', 'TL', 'Prise', 'Bund', 'Zweig'];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleIngredientChange = (index: number, field: keyof Ingredient, value: string) => {
    const newIngredients = [...ingredients];
    const currentIngredient = newIngredients[index];
    if (currentIngredient) {
      newIngredients[index] = { 
        ...currentIngredient, 
        [field]: value 
      };
      setIngredients(newIngredients);
    }
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: '', unit: 'g' }]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleInstructionChange = (index: number, value: string) => {
    const newInstructions = [...instructions];
    const currentInstruction = newInstructions[index];
    if (currentInstruction) {
      newInstructions[index] = { 
        ...currentInstruction, 
        description: value 
      };
      setInstructions(newInstructions);
    }
  };

  const addInstruction = () => {
    setInstructions([...instructions, { step: instructions.length + 1, description: '' }]);
  };

  const removeInstruction = (index: number) => {
    const newInstructions = instructions.filter((_, i) => i !== index);
    // Renumber steps
    const renumberedInstructions = newInstructions.map((inst, i) => ({
      ...inst,
      step: i + 1
    }));
    setInstructions(renumberedInstructions);
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleNutritionChange = (field: keyof Nutrition, value: number) => {
    setNutrition(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty ingredients and instructions
    const validIngredients = ingredients.filter(ing => ing.name.trim() && ing.amount.trim());
    const validInstructions = instructions.filter(inst => inst.description.trim());

    if (validIngredients.length === 0 || validInstructions.length === 0) {
      alert('Bitte fügen Sie mindestens eine Zutat und eine Anweisung hinzu.');
      return;
    }

    const newRecipe = {
      id: Date.now(), // Simple ID generation
      ...formData,
      ingredients: validIngredients,
      instructions: validInstructions,
      nutrition,
      tags
    };

    onSave(newRecipe);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Neues Rezept erstellen</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.scrollContent}>
            {/* Basic Information */}
            <div className={styles.section}>
              <h3>Grundinformationen</h3>
              <div className={styles.formGroup}>
                <label>Rezeptname *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="z.B. Mediterrane Pasta"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Beschreibung</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Kurze Beschreibung des Rezepts..."
                  rows={3}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Kategorie</label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Schwierigkeit</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => handleInputChange('difficulty', e.target.value)}
                  >
                    {difficulties.map(diff => (
                      <option key={diff} value={diff}>{diff}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Zubereitungszeit (Min)</label>
                  <input
                    type="number"
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    placeholder="25"
                    min="1"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Portionen</label>
                  <input
                    type="number"
                    value={formData.servings}
                    onChange={(e) => handleInputChange('servings', parseInt(e.target.value) || 1)}
                    min="1"
                  />
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className={styles.section}>
              <h3>Zutaten</h3>
              {ingredients.length === 0 ? (
                <div className={styles.emptyState}>
                  <p>Noch keine Zutaten hinzugefügt</p>
                </div>
              ) : (
                ingredients.map((ingredient, index) => (
                  <div key={index} className={styles.ingredientRow}>
                    <input
                      type="text"
                      placeholder="Zutat"
                      value={ingredient.name}
                      onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                      className={styles.ingredientName}
                    />
                    <input
                      type="text"
                      placeholder="Menge"
                      value={ingredient.amount}
                      onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                      className={styles.ingredientAmount}
                    />
                    <select
                      value={ingredient.unit}
                      onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                      className={styles.ingredientUnit}
                    >
                      {units.map(unit => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className={styles.removeButton}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
              <button
                type="button"
                onClick={addIngredient}
                className={styles.addButton}
              >
                <Plus size={16} />
                Zutat hinzufügen
              </button>
            </div>

            {/* Instructions */}
            <div className={styles.section}>
              <h3>Zubereitung</h3>
              {instructions.length === 0 ? (
                <div className={styles.emptyState}>
                  <p>Noch keine Zubereitungsschritte hinzugefügt</p>
                </div>
              ) : (
                instructions.map((instruction, index) => (
                  <div key={index} className={styles.instructionRow}>
                    <span className={styles.stepNumber}>{instruction.step}.</span>
                    <textarea
                      placeholder="Schritt beschreiben..."
                      value={instruction.description}
                      onChange={(e) => handleInstructionChange(index, e.target.value)}
                      className={styles.instructionText}
                      rows={2}
                    />
                    <button
                      type="button"
                      onClick={() => removeInstruction(index)}
                      className={styles.removeButton}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
              <button
                type="button"
                onClick={addInstruction}
                className={styles.addButton}
              >
                <Plus size={16} />
                Schritt hinzufügen
              </button>
            </div>

            {/* Nutrition */}
            <div className={styles.section}>
              <h3>Nährwerte (pro Portion)</h3>
              <div className={styles.nutritionGrid}>
                <div className={styles.formGroup}>
                  <label>Kalorien</label>
                  <input
                    type="number"
                    value={nutrition.calories}
                    onChange={(e) => handleNutritionChange('calories', parseInt(e.target.value) || 0)}
                    min="0"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Protein (g)</label>
                  <input
                    type="number"
                    value={nutrition.protein}
                    onChange={(e) => handleNutritionChange('protein', parseInt(e.target.value) || 0)}
                    min="0"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Kohlenhydrate (g)</label>
                  <input
                    type="number"
                    value={nutrition.carbs}
                    onChange={(e) => handleNutritionChange('carbs', parseInt(e.target.value) || 0)}
                    min="0"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Fett (g)</label>
                  <input
                    type="number"
                    value={nutrition.fat}
                    onChange={(e) => handleNutritionChange('fat', parseInt(e.target.value) || 0)}
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className={styles.section}>
              <h3>Tags</h3>
              <div className={styles.tagInput}>
                <input
                  type="text"
                  placeholder="Tag hinzufügen (z.B. Vegetarisch, Schnell)"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <button type="button" onClick={addTag} className={styles.addTagButton}>
                  <Plus size={16} />
                </button>
              </div>
              <div className={styles.tags}>
                {tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className={styles.removeTagButton}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.footer}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Abbrechen
            </button>
            <button type="submit" className={styles.saveButton}>
              Rezept speichern
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;
