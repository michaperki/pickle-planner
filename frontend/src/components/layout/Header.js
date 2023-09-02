import { useTheme } from '../../contexts/ThemeContext';
import Navigation from './Navigation';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={theme}>
      <Navigation />
      <button onClick={toggleTheme}>
        {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      </button>
    </header>
  );
};

export default Header;
