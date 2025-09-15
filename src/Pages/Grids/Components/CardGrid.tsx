import React from 'react';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
import styles from './CardGrid.module.scss';

const CardGrid: React.FC = () => {
  const cards = [
    {
      id: 1,
      title: "Modern Web Development",
      description: "Entdecke die neuesten Trends und Technologien in der Webentwicklung.",
      author: "Max Mustermann",
      date: "15. März 2024",
      readTime: "5 min",
      image: "/public/assets/img/Projects/project1.webp",
      category: "Development"
    },
    {
      id: 2,
      title: "UX/UI Design Principles",
      description: "Grundlagen für benutzerfreundliche und ästhetische Designs.",
      author: "Anna Schmidt",
      date: "12. März 2024",
      readTime: "8 min",
      image: "/public/assets/img/Projects/project2.jpg",
      category: "Design"
    },
    {
      id: 3,
      title: "React Performance Optimization",
      description: "Tipps und Tricks zur Optimierung von React-Anwendungen.",
      author: "Tom Weber",
      date: "10. März 2024",
      readTime: "12 min",
      image: "/public/assets/img/Projects/project3.webp",
      category: "React"
    },
    {
      id: 4,
      title: "CSS Grid & Flexbox",
      description: "Moderne Layout-Techniken für responsive Webdesign.",
      author: "Lisa Müller",
      date: "8. März 2024",
      readTime: "6 min",
      image: "/public/assets/img/Projects/project4.webp",
      category: "CSS"
    },
    {
      id: 5,
      title: "TypeScript Best Practices",
      description: "Bewährte Methoden für typsicheren JavaScript-Code.",
      author: "David Klein",
      date: "5. März 2024",
      readTime: "10 min",
      image: "/public/assets/img/Projects/project5.webp",
      category: "TypeScript"
    },
    {
      id: 6,
      title: "Accessibility in Web Apps",
      description: "Barrierefreie Webentwicklung für alle Benutzer.",
      author: "Sarah Johnson",
      date: "3. März 2024",
      readTime: "7 min",
      image: "/public/assets/img/Projects/project6.webp",
      category: "Accessibility"
    }
  ];

  return (
    <div className={styles.cardGrid}>
      {cards.map((card) => (
        <div key={card.id} className={styles.card}>
          <div className={styles.imageContainer}>
            <img src={card.image} alt={card.title} />
            <div className={styles.category}>{card.category}</div>
          </div>
          
          <div className={styles.content}>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            
            <div className={styles.meta}>
              <div className={styles.author}>
                <User size={16} />
                <span>{card.author}</span>
              </div>
              <div className={styles.date}>
                <Calendar size={16} />
                <span>{card.date}</span>
              </div>
              <div className={styles.readTime}>
                <Clock size={16} />
                <span>{card.readTime}</span>
              </div>
            </div>
            
            <button className={styles.readMore}>
              Weiterlesen
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardGrid;
