// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomNavigation from './components/BottomNavigation/BottomNavigation';
import { Moon, Sun } from 'lucide-react';
import Home from './Pages/Home/Home';
import PageOne from './Pages/PageOne/PageOne';
import PageTwo from './Pages/PageTwo/PageTwo';
import PageThree from './Pages/PageThree/PageThree';
import Calendar from './Pages/Calendar/Calendar';
import styles from './App.module.scss';

import './fonts/fonts.css';
import { DarkModeProvider, useDarkMode } from './contexts/DarkModeContext';

const AppContent: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className={styles.app}>
      <Router>
        <button
          className={styles.themeToggle}
          onClick={toggleDarkMode}
          title={isDarkMode ? 'Zu hellem Modus wechseln' : 'Zu dunklem Modus wechseln'}
          aria-label={isDarkMode ? 'Zu hellem Modus wechseln' : 'Zu dunklem Modus wechseln'}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<PageOne />} />
          <Route path="/search" element={<PageTwo />} />
          <Route path="/meal-plan" element={<PageThree />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>

        <BottomNavigation />
      </Router>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <DarkModeProvider>
      <AppContent />
    </DarkModeProvider>
  );
};

export default App;
