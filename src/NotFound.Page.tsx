import { Stack } from 'rsuite';
import ViewsUnauthorizeIcon from '@rsuite/icons/ViewsUnauthorize';
import { ParagraphStyled, TitleStyled } from './components/shared';

const NotFound404 = () => {

  return (
    <>
      <Stack
        style={{ height: "100vh" }}
        direction='column'
        alignItems='center'
        justifyContent='center'
      >
        <ViewsUnauthorizeIcon style={{ fontSize: '10em' }} />
        <TitleStyled align="center">404 - Page Not Found</TitleStyled>
        <ParagraphStyled size='sm'>Sorry, the page you are looking for could not be found.</ParagraphStyled>
      </Stack>
    </>
  );
};

export default NotFound404;