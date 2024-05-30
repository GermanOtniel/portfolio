import { Col, Grid } from "rsuite";
import { RowResponsive } from "../welcome/Welcome.Styled";
import StepperWithDescription, { IStepItemOfStepper } from "../../../../components/shared/steppers/StepperWithDescription";
import { useExperience } from "./hooks/useExperience";

export const stepperItems: IStepItemOfStepper[] = [
  { title: "1puntocinco", description: "", },
  { title: "Agilgob", description: "", },
  { title: "Atrato Pago", description: "", },
  { title: "Lizza", description: "", },
];

const ExperienceSection = () => {
  const { step, onStep, vertical, } = useExperience();

  const stepsInfo = [
      <>
        <img src="/images/1puntocinco.png" width={70} height={70} style={{ marginBottom: "10px" }} alt="1puntocinvo logo" />
        <p>
          <a href="https://www.f6s.com/company/1puntocinco#about" target="_blank" rel="noopener noreferrer">1puntocinco</a> was a startup aiming to be the link between major brands and their target 
          audience by using staff from consumption centers (waiters, bartenders, etc.). This 
          startup sought to incentivize consumption center staff to sell strategic products 
          through various dynamics and rewards. I had the opportunity to develop the Progressive 
          Web App for the staff and the dashboard for the brands. Unfortunately, this startup 
          did not continue due to the COVID-19 pandemic and the closure of many consumption 
          centers during this challenging period.
        </p>
      </>
    ,
      <>
        <img src="/images/AgilGob.png" width={100} height={40} style={{ marginBottom: "10px" }} alt="agilgob logo" />
        <p>
          <a href="https://agilgob.com/" target="_blank" rel="noopener noreferrer">Agilgob</a> is a startup specializing in developing custom software to meet the needs of Mexican 
          governments. Its mission is: To make every citizen feel connected to their government through 
          our technological platforms. <br />
          Its vision is that by 2025, Agilgob will be one of the top three leading companies in Mexico 
          in the field of streamlining and automating government procedures and services.
        </p>
      </>
    ,
      <>
        <img src="/images/atrato.jpeg" width={90} height={50} style={{ marginBottom: "10px" }} alt="atrato logo" />
        <p>
          <a href="https://www.atratopago.com/" target="_blank" rel="noopener noreferrer">Atrato Pago</a> is a payment method that allows you to make purchases at affiliated merchants, 
          either online or in-store, and pay for them over up to 24 months 💜.
          Through a web application, Atrato Pago aims to streamline the tedious and time-consuming 
          processes of applying for credit.
        </p>
      </>
    ,
      <>
        <img src="/images/lizza.jpeg" width={120} height={70} style={{ marginBottom: "10px" }} alt="lizza logo" />
        <p>
          <a href="https://www.lizza.link/" target="_blank" rel="noopener noreferrer">Lizza</a> is a startup that aims to connect large, medium, and small brands with the right content creators 
          to help them grow their business or position themselves in the market. Through a web and native 
          application for creators, they can apply to campaigns, which brands can create from their web 
          dashboard and use to accept and invite the content creators that best fit their target audience 
          and business.
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
            <h3 style={{ textAlign: "left", width: "100%", marginBottom: "20px" }}>My Experience</h3>
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