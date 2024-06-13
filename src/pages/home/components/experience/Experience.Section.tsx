import { Col, Grid } from "rsuite";
import { RowResponsive } from "../welcome/Welcome.Styled";
import StepperWithDescription, { IStepItemOfStepper } from "../../../../components/shared/steppers/StepperWithDescription";
import { useExperience } from "./hooks/useExperience";
import { EXPERIENCE } from "../../../../language";
import { useThemeContext } from "../../../../context/themeContext/Theme.Context";
import { useSearchParams } from "react-router-dom";
import { useEffect, useRef } from "react";

export const stepperItems: IStepItemOfStepper[] = [
  { title: "1puntocinco", description: "", },
  { title: "Agilgob", description: "", },
  { title: "Atrato Pago", description: "", },
  { title: "Lizza", description: "", },
];

const ExperienceSection = () => {
  const [searchParams] = useSearchParams();
  const ref = useRef<HTMLDivElement | null>(null);
  const { step, onStep, vertical, } = useExperience();
  const { language } = useThemeContext();

  useEffect(() => {
    if (ref.current) {
      if (searchParams.get("s") === "experience") {
        ref.current.scrollIntoView({
          behavior: "smooth"
        });
      }
    }
  }, [ref, searchParams]);

  const stepsInfo = [
      <>
        <img src="/images/1puntocinco.png" width={70} height={70} style={{ marginBottom: "10px" }} alt="1puntocinvo logo" />
        <p>
          <a href="https://www.f6s.com/company/1puntocinco#about" target="_blank" rel="noopener noreferrer">1puntocinco</a> {EXPERIENCE[language].B}
        </p>
      </>
    ,
      <>
        <img src="/images/AgilGob.png" width={100} height={40} style={{ marginBottom: "10px" }} alt="agilgob logo" />
        <p>
          <a href="https://agilgob.com/" target="_blank" rel="noopener noreferrer">Agilgob</a> {EXPERIENCE[language].C} <br />
          {EXPERIENCE[language].D}
        </p>
      </>
    ,
      <>
        <img src="/images/atrato.jpeg" width={90} height={50} style={{ marginBottom: "10px" }} alt="atrato logo" />
        <p>
          <a href="https://www.atratopago.com/" target="_blank" rel="noopener noreferrer">Atrato Pago</a> {EXPERIENCE[language].E}
        </p>
      </>
    ,
      <>
        <img src="/images/lizza.jpeg" width={120} height={70} style={{ marginBottom: "10px" }} alt="lizza logo" />
        <p>
          <a href="https://www.lizza.link/" target="_blank" rel="noopener noreferrer">Lizza</a> {EXPERIENCE[language].F}
        </p>
      </>
    ,
  ];

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
        id="experience"
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
            <h3 style={{ textAlign: "left", width: "100%", marginBottom: "20px" }}>
              {EXPERIENCE[language].A}
            </h3>
            <div style={{ width: "100%", }}>
              <StepperWithDescription
                stepItems={stepperItems}
                step={step}
                onStep={onStep}
                vertical={vertical}
                content={stepsInfo[step]}
              />
            </div>
          </Col>
        </RowResponsive>
      </Grid>
    </>
  );
};

export default ExperienceSection;