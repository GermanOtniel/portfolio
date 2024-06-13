import { Avatar, Button, ButtonGroup, Col, Grid, Panel, Placeholder, Row, Stack } from "rsuite"
import { RowResponsive } from "../welcome/Welcome.Styled"
import { useEffect, useRef, useState } from "react";
import { useThemeContext } from "../../../../context/themeContext/Theme.Context";
import { useParallax } from "react-scroll-parallax";
import { ME } from "../../../../language";
import { useSearchParams } from "react-router-dom";

const MeSection = () => {
  const [searchParams] = useSearchParams();
  const ref = useRef<HTMLDivElement | null>(null);
  const [imageReady, setImageReady] = useState<"loading" | "done" | "error">("loading"); 
  const { theme, language, } = useThemeContext();
  const parallax = useParallax<HTMLImageElement>({
    rotateY: [180, -180],
  });
  const [activeTab, setActiveTab] = useState<"professional" | "personal" | "other">("professional");

  useEffect(() => {
    if (ref.current) {
      if (searchParams.get("s") === "about-me") {
        ref.current.scrollIntoView({
          behavior: "smooth"
        });
      }
    }
  }, [ref, searchParams]);

  const tabs: { [key: string]: JSX.Element } = {
    "professional": (
      <>
        <p>
          {ME[language].E.a} <br />
          {ME[language].E.b}
        </p>
        <p>
        {ME[language].E.c}
        </p>
        <p>
        {ME[language].E.d}
        </p>
      </>
    ),
    "personal": (
      <>
        <p>{ME[language].F.a}</p>
        
        <p>{ME[language].F.b}</p>
        
        <p>{ME[language].F.c}</p>
        
        <p>{ME[language].F.d}</p>
        
        <p>{ME[language].F.e}</p>
      </>
    ),
    "other": (
      <>
        <p>{ME[language].G.a}</p> 
        <p>{ME[language].G.b}</p>
      </>
    ),
  };

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
        id="about-me"
        ref={ref}
      >
        <RowResponsive>
          <Col
            xs={24}
            sm={24}
            md={24}
          >
            <Panel
              ref={parallax.ref}
              bordered
              header={
                <Stack wrap justifyContent="space-between">
                  <h3>{ME[language].A}</h3>
                  <ButtonGroup>
                    <Button
                      active={activeTab === "professional"}
                      onClick={() => setActiveTab("professional")}
                    >
                      {ME[language].B}
                    </Button>
                    <Button
                      active={activeTab === "personal"}
                      onClick={() => setActiveTab("personal")}
                    >
                      {ME[language].C}
                    </Button>
                    <Button
                      active={activeTab === "other"}
                      onClick={() => setActiveTab("other")}
                    >
                      {ME[language].D}
                    </Button>
                  </ButtonGroup>
                </Stack>
              }
            >
              <Grid fluid style={{ gap: 20 }}>
                <Row>
                  <Col xs={24} md={6} lg={4} style={{ display: "flex", justifyContent: "center" }}>
                    {imageReady !== "error" && (
                      <Avatar 
                        size="xxl"
                        style={{ boxShadow: theme === "dark" ? "#00ffff 0 0 0 4px" : "#ff0000 0 0 0 4px" }}
                        bordered 
                        circle 
                        src="/images/me.jpeg"
                        onError={() => setImageReady("error")}
                      />
                    )}
                    {imageReady === "error" && (
                      <Placeholder.Paragraph rows={0} graph="image" />
                    )}
                  </Col>
                  <Col xs={24} sm={24} md={24} mdHidden lg={24} lgHidden xl={24} xlHidden xxl={24} xxlHidden style={{ height: "20px" }}> </Col>
                  <Col xs={24} md={18} lg={20}>
                    {tabs[activeTab]}
                  </Col>
                </Row>
              </Grid>
            </Panel>
          </Col>
        </RowResponsive>
      </Grid>
    </>
  );
};

export default MeSection;