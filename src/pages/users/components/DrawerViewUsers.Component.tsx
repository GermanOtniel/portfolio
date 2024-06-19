import {
  Drawer,
  DrawerProps,
  Button,
  Form,
  InputNumber,
  InputGroup,
  Slider,
  Rate,
  Schema
} from 'rsuite';
import { ButtonResponsive, MainButton } from '../../../components/shared';
import { useThemeContext } from '../../../context/themeContext/Theme.Context';
import { useSetUser } from '../hooks/useSetUser';
import { IUser } from '../../../models';
import PeoplesCostomizeIcon from '@rsuite/icons/PeoplesCostomize';
import { SHARED, USERS } from '../../../language';

const { StringType, NumberType } = Schema.Types;

interface IDrawerViewUsersProps extends DrawerProps {
  selectedUser: IUser | null;
  onOpenDrawer: (open: boolean) => void;
  onReload: () => Promise<void>;
}

const DrawerViewUsers = (props: IDrawerViewUsersProps) => {
  const { onClose, selectedUser, onReload, ...rest } = props;
  const { theme, language, } = useThemeContext();
  const { formRef, formValue, setFormValue, handleSubmit, onAutoFill, } = useSetUser({
    user: props.selectedUser || undefined,
    onOpenDrawer: props.onOpenDrawer,
    open: !!props.open,
    onReload,
  });

  const modelContact = Schema.Model<IUser>({
    id: StringType(SHARED.FORM_ERRORS[language].C),
    avatar: StringType(SHARED.FORM_ERRORS[language].C).isRequired(SHARED.FORM_ERRORS[language].A),
    lastName: StringType(SHARED.FORM_ERRORS[language].C).isRequired(SHARED.FORM_ERRORS[language].A),
    firstName: StringType(SHARED.FORM_ERRORS[language].C).isRequired(SHARED.FORM_ERRORS[language].A),
    fullName: StringType(SHARED.FORM_ERRORS[language].C),
    skills: NumberType(SHARED.FORM_ERRORS[language].B).isRequired(SHARED.FORM_ERRORS[language].A),
    city: StringType(SHARED.FORM_ERRORS[language].C).isRequired(SHARED.FORM_ERRORS[language].A),
    street: StringType(SHARED.FORM_ERRORS[language].C).isRequired(SHARED.FORM_ERRORS[language].A),
    email: StringType(SHARED.FORM_ERRORS[language].C).isRequired(SHARED.FORM_ERRORS[language].A),
    rating: NumberType(SHARED.FORM_ERRORS[language].B).isRequired(SHARED.FORM_ERRORS[language].A),
    income: NumberType(SHARED.FORM_ERRORS[language].B).isRequired(SHARED.FORM_ERRORS[language].A),
  });

  return (
    <Drawer backdrop="static" size="xs" placement="right" onClose={onClose} {...rest}>
      <Drawer.Header>
        <Drawer.Title>
          {selectedUser?.id ? USERS[language].L : USERS[language].C}
        </Drawer.Title>
        {!props.selectedUser?.id && (
          <Drawer.Actions>
            <ButtonResponsive onClick={onAutoFill} appearance="primary" label={USERS[language].Q}>
              <PeoplesCostomizeIcon className="btn-responsive-show" />
            </ButtonResponsive>
          </Drawer.Actions>
        )}
      </Drawer.Header>

      <Drawer.Body style={{ padding: "10px 25px" }}>
        <Form 
          style={{ marginBottom: "100px" }} 
          fluid
          ref={formRef}
          formValue={formValue}
          onChange={(data) => setFormValue({ ...formValue, ...data })}
          model={modelContact}
        >
          <Form.Group controlId="firstName">
            <Form.ControlLabel>{USERS[language].M}</Form.ControlLabel>
            <Form.Control name="firstName" style={{ width: 200 }} autoFocus />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>{USERS[language].N}</Form.ControlLabel>
            <Form.Control name="lastName" style={{ width: 200 }} />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>{USERS[language].Ñ}</Form.ControlLabel>
            <Form.Control name="email" type="email" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>{USERS[language].O}</Form.ControlLabel>
            <Form.Control name="city" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>{USERS[language].P}</Form.ControlLabel>
            <Form.Control name="street" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>{USERS[language].D}</Form.ControlLabel>
            <Form.Control name="rating" value={formValue.rating} accepter={Rate} />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>{USERS[language].G}</Form.ControlLabel>
            <Form.Control name="skills" accepter={Slider} progress />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>{USERS[language].H}</Form.ControlLabel>
            <InputGroup style={{ width: '100%' }}>
              <InputGroup.Addon>$</InputGroup.Addon>
              <Form.Control name="income" accepter={InputNumber} style={{ width: '100%' }} />
            </InputGroup>
          </Form.Group>
          <div
            className='drawer-users-actions'
            style={{ 
              position: "fixed", bottom: 0, right: 0, 
              display: "flex", 
              justifyContent: "right", gap: 5, padding: "10px 15px", 
              backgroundColor: theme === "dark" ? "#292d33" : "#ffffff" 
            }}
          >
            <MainButton theme={theme} onClick={handleSubmit} appearance="ghost">
              {SHARED.BUTTONS[language].A}
            </MainButton>
            <Button onClick={onClose} appearance="subtle">
            {SHARED.BUTTONS[language].B}
            </Button>
          </div>
        </Form>
      </Drawer.Body>
    </Drawer>
  );
};

export default DrawerViewUsers;