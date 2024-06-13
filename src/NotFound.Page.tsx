import { Stack } from 'rsuite';
import ViewsUnauthorizeIcon from '@rsuite/icons/ViewsUnauthorize';
import { ParagraphStyled, TitleStyled } from './components/shared';
import { useThemeContext } from './context/themeContext/Theme.Context';

const LANGUAGE = {
  EN: {
    A: "404 - Page Not Found",
    B: "Sorry, the page you are looking for could not be found.",
  },
  ES: {
    A: "404 - Página no encontrada",
    B: "Lo sentimos, la página que estás buscando no fue encontrada",
  },
};

const NotFound404 = () => {
  const { language, } = useThemeContext();

  return (
    <>
      <Stack
        style={{ height: "100vh" }}
        direction='column'
        alignItems='center'
        justifyContent='center'
      >
        <ViewsUnauthorizeIcon style={{ fontSize: '10em' }} />
        <TitleStyled align="center">
          {LANGUAGE[language].A}
        </TitleStyled>
        <ParagraphStyled size='sm' style={{ textAlign: "center" }}>
          {LANGUAGE[language].B}
        </ParagraphStyled>
      </Stack>
    </>
  );
};

export default NotFound404;