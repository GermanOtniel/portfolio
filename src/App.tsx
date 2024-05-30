import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/Home.Page';
import { CustomProvider } from 'rsuite';
import { useThemeContext } from './context/themeContext/Theme.Context';
import "./App.css";
import NotFound404 from './NotFound.Page';
import { LayoutProvider } from './context/layoutContext/Layout.Context';
import { ParallaxProvider } from 'react-scroll-parallax';
import { LoaderProvider } from './context/loaderContext/LoaderContext';

const App = () => {
  const { theme } = useThemeContext();

  return (
    <CustomProvider theme={theme}>
      <LoaderProvider>
        <ParallaxProvider>
          <LayoutProvider>
            <Routes>
              <Route
                path='/'
                Component={HomePage}
              />
              <Route
                path='*'
                Component={NotFound404}
              />
            </Routes>
          </LayoutProvider>
        </ParallaxProvider>
      </LoaderProvider>
    </CustomProvider>
  );
}

export default App;
