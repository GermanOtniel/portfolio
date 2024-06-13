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

const { StringType, NumberType } = Schema.Types;

const modelContact = Schema.Model<IUser>({
  id: StringType(),
  avatar: StringType().isRequired(),
  lastName: StringType().isRequired(),
  firstName: StringType().isRequired("Es requerido apa!"),
  fullName: StringType(),
  skills: NumberType().isRequired(),
  city: StringType().isRequired(),
  street: StringType().isRequired(),
  email: StringType().isRequired(),
  rating: NumberType().isRequired(),
  income: NumberType().isRequired(),
});

interface IDrawerViewUsersProps extends DrawerProps {
  selectedUser: IUser | null;
  onOpenDrawer: (open: boolean) => void;
}

const DrawerViewUsers = (props: IDrawerViewUsersProps) => {
  const { onClose, selectedUser, ...rest } = props;
  const { theme } = useThemeContext();
  const { formRef, formValue, setFormValue, handleSubmit, } = useSetUser({
    user: props.selectedUser || undefined,
    onOpenDrawer: props.onOpenDrawer
  });

  return (
    <Drawer backdrop="static" size="xs" placement="right" onClose={onClose} {...rest}>
      <Drawer.Header>
        <Drawer.Title>
          {selectedUser?.id ? "Update user:" : "Add new user:"}
        </Drawer.Title>
        <Drawer.Actions>
          <ButtonResponsive appearance="primary">
            <PeoplesCostomizeIcon className="btn-responsive-show" />
          </ButtonResponsive>
        </Drawer.Actions>
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
            <Form.ControlLabel>First Name</Form.ControlLabel>
            <Form.Control name="firstName" style={{ width: 200 }} />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Last Name</Form.ControlLabel>
            <Form.Control name="lastName" style={{ width: 200 }} />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Email</Form.ControlLabel>
            <Form.Control name="email" type="email" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>City</Form.ControlLabel>
            <Form.Control name="city" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Street</Form.ControlLabel>
            <Form.Control name="street" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Rating</Form.ControlLabel>
            <Form.Control name="rating" accepter={Rate} />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Skill Proficiency</Form.ControlLabel>
            <Form.Control name="skills" accepter={Slider} progress />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Income</Form.ControlLabel>
            <InputGroup style={{ width: '100%' }}>
              <InputGroup.Addon>$</InputGroup.Addon>
              <Form.Control name="income" accepter={InputNumber} style={{ width: '100%' }} />
            </InputGroup>
          </Form.Group>
          <Drawer.Actions 
            style={{ 
              position: "fixed", bottom: 0, right: 0, 
              width: "94%", display: "flex", 
              justifyContent: "right", gap: 5, padding: "10px 15px", 
              backgroundColor: theme === "dark" ? "#292d33" : "#ffffff" 
            }}
          >
            <MainButton theme={theme} onClick={handleSubmit} appearance="ghost">
              Confirm
            </MainButton>
            <Button onClick={onClose} appearance="subtle">
              Cancel
            </Button>
          </Drawer.Actions>
        </Form>
      </Drawer.Body>
    </Drawer>
  );
};

export default DrawerViewUsers;