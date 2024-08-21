import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/Home.Page';
import { CustomProvider } from 'rsuite';
import { useThemeContext } from './context/themeContext/Theme.Context';
import "./App.css";
import NotFound404 from './NotFound.Page';
import { LayoutProvider } from './context/layoutContext/Layout.Context';
import { ParallaxProvider } from 'react-scroll-parallax';
import { LoaderProvider } from './context/loaderContext/LoaderContext';
import UsersPage from './pages/users/Users.Page';
import TardiGamePage from './pages/tardi-game/TardiGame.Page';
import ExcelsPage from './pages/excels/Excels.Page';
import OcrPage from './pages/ocr/Ocr.Page';

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
                path='/users'
                Component={UsersPage}
              />
              <Route
                path='/tardi-game'
                Component={TardiGamePage}
              />
              <Route
                path='/excels'
                Component={ExcelsPage}
              />
              <Route
                path='/ocr'
                Component={OcrPage}
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
