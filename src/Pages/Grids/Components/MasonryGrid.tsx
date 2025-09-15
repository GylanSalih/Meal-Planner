import React from 'react';
import { Heart, MessageCircle, Share, Bookmark } from 'lucide-react';
import styles from './MasonryGrid.module.scss';

const MasonryGrid: React.FC = () => {
  const pins = [
    {
      id: 1,
      image: "/public/assets/img/Projects/project1.webp",
      title: "Modern Web Design Inspiration",
      description: "Kreative Ansätze für moderne Webentwicklung",
      height: 300,
      likes: 234,
      comments: 12,
      user: {
        name: "Max Designer",
        avatar: "/public/assets/img/Projects/project2.jpg"
      }
    },
    {
      id: 2,
      image: "/public/assets/img/Projects/project2.jpg",
      title: "UI/UX Best Practices",
      description: "Sammlung von bewährten Design-Prinzipien für benutzerfreundliche Interfaces",
      height: 450,
      likes: 189,
      comments: 8,
      user: {
        name: "Anna UI",
        avatar: "/public/assets/img/Projects/project3.webp"
      }
    },
    {
      id: 3,
      image: "/public/assets/img/Projects/project3.webp",
      title: "Color Palette Ideas",
      description: "Inspirierende Farbkombinationen",
      height: 250,
      likes: 567,
      comments: 23,
      user: {
        name: "Tom Colors",
        avatar: "/public/assets/img/Projects/project4.webp"
      }
    },
    {
      id: 4,
      image: "/public/assets/img/Projects/project4.webp",
      title: "Typography Trends 2024",
      description: "Die neuesten Trends in der Typografie für digitale Medien und Print-Design",
      height: 380,
      likes: 342,
      comments: 19,
      user: {
        name: "Lisa Type",
        avatar: "/public/assets/img/Projects/project5.webp"
      }
    },
    {
      id: 5,
      image: "/public/assets/img/Projects/project5.webp",
      title: "Mobile App Interface",
      description: "Elegante mobile UI Designs",
      height: 320,
      likes: 445,
      comments: 15,
      user: {
        name: "David Mobile",
        avatar: "/public/assets/img/Projects/project6.webp"
      }
    },
    {
      id: 6,
      image: "/public/assets/img/Projects/project6.webp",
      title: "Minimalist Design",
      description: "Weniger ist mehr - minimalistische Design-Ansätze für moderne Websites",
      height: 280,
      likes: 678,
      comments: 31,
      user: {
        name: "Sarah Minimal",
        avatar: "/public/assets/img/Projects/project1.webp"
      }
    },
    {
      id: 7,
      image: "/public/assets/img/Projects/project1.webp",
      title: "Icon Design Systems",
      description: "Konsistente Icon-Systeme für bessere UX",
      height: 200,
      likes: 123,
      comments: 7,
      user: {
        name: "Mike Icons",
        avatar: "/public/assets/img/Projects/project2.jpg"
      }
    },
    {
      id: 8,
      image: "/public/assets/img/Projects/project2.jpg",
      title: "Dark Mode Designs",
      description: "Elegante Dark Mode Implementierungen für verschiedene Anwendungen",
      height: 420,
      likes: 789,
      comments: 42,
      user: {
        name: "Nina Dark",
        avatar: "/public/assets/img/Projects/project3.webp"
      }
    }
  ];

  return (
    <div className={styles.masonryGrid}>
      {pins.map((pin) => (
        <div 
          key={pin.id} 
          className={styles.pin}
          style={{ height: `${pin.height}px` }}
        >
          <div className={styles.imageContainer}>
            <img src={pin.image} alt={pin.title} />
            <div className={styles.overlay}>
              <button className={styles.saveBtn}>
                <Bookmark size={18} />
                Speichern
              </button>
            </div>
          </div>
          
          <div className={styles.content}>
            <h3>{pin.title}</h3>
            <p>{pin.description}</p>
            
            <div className={styles.actions}>
              <button className={styles.actionBtn}>
                <Heart size={16} />
                <span>{pin.likes}</span>
              </button>
              <button className={styles.actionBtn}>
                <MessageCircle size={16} />
                <span>{pin.comments}</span>
              </button>
              <button className={styles.actionBtn}>
                <Share size={16} />
              </button>
            </div>
            
            <div className={styles.user}>
              <img src={pin.user.avatar} alt={pin.user.name} />
              <span>{pin.user.name}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid;
