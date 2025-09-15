import React, { useState, useEffect } from 'react';
import { X, Save, Plus } from 'lucide-react';
import styles from './EditItemModal.module.scss';

interface EditItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: { name: string; quantity: string; unit: string; category: string; customGroupName?: string }) => void;
  initialData?: {
    name: string;
    quantity: string;
    unit: string;
    category: string;
    customGroupName?: string;
  };
  isNewItem?: boolean;
}

const EditItemModal: React.FC<EditItemModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  isNewItem = false
}) => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    unit: 'g',
    category: 'alle',
    customGroupName: ''
  });


  const categories = [
    { id: 'alle', name: 'Alle' },
    { id: 'obst', name: 'Obst' },
    { id: 'gemuese', name: 'Gemüse' },
    { id: 'fleisch', name: 'Fleisch' },
    { id: 'milchprodukte', name: 'Milchprodukte' },
    { id: 'backwaren', name: 'Backwaren' }
  ];

  const units = ['g', 'kg', 'ml', 'l', 'Stück', 'Packung', 'EL', 'TL', 'Prise', 'Bund', 'Zweig', 'Flasche', 'Dose'];

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          name: initialData.name || '',
          quantity: initialData.quantity || '',
          unit: initialData.unit || 'g',
          category: initialData.category || 'alle',
          customGroupName: initialData.customGroupName || ''
        });
      } else {
        setFormData({
          name: '',
          quantity: '',
          unit: 'g',
          category: 'alle',
          customGroupName: ''
        });
      }
    }
  }, [isOpen, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() && formData.quantity.trim()) {
      onSave({
        name: formData.name,
        quantity: formData.quantity,
        unit: formData.unit,
        category: formData.category,
        customGroupName: formData.customGroupName
      });
      onClose();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>{isNewItem ? 'Neues Item hinzufügen' : 'Item bearbeiten'}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="z.B. Tomaten"
              required
              autoFocus
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Menge *</label>
              <input
                type="text"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                placeholder="500"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Einheit</label>
              <select
                value={formData.unit}
                onChange={(e) => handleInputChange('unit', e.target.value)}
              >
                {units.map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Kategorie</label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Gruppierung (optional)</label>
            <input
              type="text"
              value={formData.customGroupName}
              onChange={(e) => handleInputChange('customGroupName', e.target.value)}
              placeholder="z.B. Weihnachtszutaten, Party-Snacks, Backzutaten"
            />
            <small className={styles.helpText}>
              Items mit dem gleichen Gruppierungsnamen werden zusammen gruppiert
            </small>
          </div>

          <div className={styles.footer}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Abbrechen
            </button>
            <button type="submit" className={styles.saveButton}>
              {isNewItem ? (
                <>
                  <Plus size={16} />
                  Hinzufügen
                </>
              ) : (
                <>
                  <Save size={16} />
                  Speichern
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItemModal;
