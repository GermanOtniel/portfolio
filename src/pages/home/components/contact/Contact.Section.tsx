import { Button, ButtonToolbar, Col, Form, Grid, Input, InputProps, Panel, Schema } from "rsuite";
import { RowResponsive } from "../welcome/Welcome.Styled";
import React from "react";
import { RsRefForwardingComponent } from "rsuite/esm/@types/common";
import { MainButton } from "../../../../components/shared";
import { useThemeContext } from "../../../../context/themeContext/Theme.Context";
import { IContactForm } from "./schemas";
import { useContact } from "./hooks/useContact";

const { StringType } = Schema.Types;
const modelContact = Schema.Model<IContactForm>({
  email: StringType()
    .isEmail('Please enter a valid email address.')
    .isRequired('This field is required.'),
  subject: StringType()
    .isRequired('This field is required.')
});

const Textarea = React.forwardRef<HTMLTextAreaElement, RsRefForwardingComponent<'input', InputProps>>((props, ref) => <Input {...props} as="textarea" rows={5} ref={ref} />);

const ContactSection = () => {
  const { theme } = useThemeContext();
  const { formValue, setFormValue, formRef, handleSubmit, timeLeft, } = useContact();

  return (
    <>
      <Grid
        fluid
        style={{
          width: "100%",
          height: "auto",
          minHeight: "100vh",
          justifyContent: "center",
          display: "flex"
        }}
        id="contact"
      >
        <RowResponsive>
          <Col
            xs={24}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Panel style={{ width: "100%" }} shaded>
              <h3 style={{ textAlign: "left", width: "100%", marginBottom: "20px" }}>Contact</h3>
              <Form 
                ref={formRef}
                fluid 
                model={modelContact}
                formValue={formValue}
                onChange={(data) => setFormValue({ ...formValue, ...data })}
              >
                <Form.Group controlId="email">
                  <Form.ControlLabel>Email </Form.ControlLabel>
                  <Form.Control name="email" type="email" />
                </Form.Group>
                <Form.Group controlId="">
                  <Form.ControlLabel>Subject </Form.ControlLabel>
                  <Form.Control name="subject" accepter={Textarea} />
                </Form.Group>
                <ButtonToolbar>
                  <MainButton 
                    appearance="ghost"
                    theme={theme}
                    onClick={handleSubmit}
                    disabled={timeLeft !== 30}
                  >
                    {timeLeft === 30 ? "Submit" : `${timeLeft} s.`}
                  </MainButton>
                  <a
                    target="_blank"
                    rel="noopener noreferrer" 
                    href="https://wa.me/+525537225854?text=¡Hola! Vi tu portafolio y me interesaría poder trabajar juntos..."
                  >
                    <Button appearance="default">Send a WhatsApp</Button>
                  </a>
                </ButtonToolbar>
              </Form>
            </Panel>
          </Col>
        </RowResponsive>
      </Grid>
    </>
  );
};

export default ContactSection;