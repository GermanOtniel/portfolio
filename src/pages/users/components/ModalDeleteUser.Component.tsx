import {
  Button,
  ModalProps,
  Modal
} from 'rsuite';
import { MainButton, ParagraphStyled } from '../../../components/shared';
import { useThemeContext } from '../../../context/themeContext/Theme.Context';
import { IUser } from '../../../models';
import { SHARED, USERS } from '../../../language';


interface IModalDeleteUserProps {
  modalProps: ModalProps;
  user: IUser;
  handleDeleteUser: () => Promise<void>;
}

const ModalDeleteUser = (props: IModalDeleteUserProps) => {
  const { user, handleDeleteUser, modalProps, } = props;
  const { theme, language, } = useThemeContext();

  return (
    <Modal onClose={modalProps.onClose} {...modalProps}>
      <Modal.Header>
        <Modal.Title>
          {USERS[language].R}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ padding: "10px 5px" }}>
        <div style={{ marginBottom: "15px" }}>
          <ParagraphStyled>
            {USERS[language].S} <strong>{user?.fullName}</strong>?
          </ParagraphStyled>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <MainButton theme={theme} onClick={handleDeleteUser} appearance="ghost">
          {SHARED.BUTTONS[language].A}
        </MainButton>
        <Button onClick={modalProps.onClose} appearance="subtle">
          {SHARED.BUTTONS[language].B}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDeleteUser;