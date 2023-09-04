import { useTheme } from '../../contexts/ThemeContext';
import Navigation from './Navigation';
const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={theme}>
      <Navigation />

    </header>
  );
};

export default Header;
