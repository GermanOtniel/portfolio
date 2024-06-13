import { Button, ButtonToolbar, Col, Form, Grid, Input, InputProps, Panel, Schema } from "rsuite";
import { RowResponsive } from "../welcome/Welcome.Styled";
import React, { useEffect, useRef } from "react";
import { RsRefForwardingComponent } from "rsuite/esm/@types/common";
import { MainButton } from "../../../../components/shared";
import { useThemeContext } from "../../../../context/themeContext/Theme.Context";
import { IContactForm } from "./schemas";
import { useContact } from "./hooks/useContact";
import { CONTACT } from "../../../../language";
import { useSearchParams } from "react-router-dom";

const { StringType } = Schema.Types;
const Textarea = React.forwardRef<HTMLTextAreaElement, RsRefForwardingComponent<'input', InputProps>>((props, ref) => <Input {...props} as="textarea" rows={5} ref={ref} />);

const ContactSection = () => {
  const [searchParams] = useSearchParams();
  const ref = useRef<HTMLDivElement | null>(null);
  const { theme, language, } = useThemeContext();
  const { formValue, setFormValue, formRef, handleSubmit, timeLeft, } = useContact();

  const modelContact = Schema.Model<IContactForm>({
    email: StringType()
      .isEmail(CONTACT[language].D)
      .isRequired(CONTACT[language].E),
    subject: StringType()
      .isRequired(CONTACT[language].E)
  });

  useEffect(() => {
    if (ref.current) {
      if (searchParams.get("s") === "contact") {
        ref.current.scrollIntoView({
          behavior: "smooth"
        });
      }
    }
  }, [ref, searchParams]);

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
        ref={ref}
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
              <h3 style={{ textAlign: "left", width: "100%", marginBottom: "20px" }}>
                {CONTACT[language].A}
              </h3>
              <Form 
                ref={formRef}
                fluid 
                model={modelContact}
                formValue={formValue}
                onChange={(data) => setFormValue({ ...formValue, ...data })}
              >
                <Form.Group controlId="email">
                  <Form.ControlLabel>{CONTACT[language].B} </Form.ControlLabel>
                  <Form.Control name="email" type="email" />
                </Form.Group>
                <Form.Group controlId="">
                  <Form.ControlLabel>{CONTACT[language].C} </Form.ControlLabel>
                  <Form.Control name="subject" accepter={Textarea} />
                </Form.Group>
                <ButtonToolbar>
                  <MainButton 
                    appearance="ghost"
                    theme={theme}
                    onClick={handleSubmit}
                    disabled={timeLeft !== 30}
                  >
                    {timeLeft === 30 ? CONTACT[language].F : `${timeLeft} s.`}
                  </MainButton>
                  <a
                    target="_blank"
                    rel="noopener noreferrer" 
                    href={`https://wa.me/+525537225854?text=${CONTACT[language].H}`}
                  >
                    <Button appearance="default">{CONTACT[language].G}</Button>
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