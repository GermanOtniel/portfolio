import { Avatar, Button, ButtonGroup, Col, Grid, Panel, Placeholder, Row, Stack } from "rsuite"
import { RowResponsive } from "../welcome/Welcome.Styled"
import { useState } from "react";
import { useThemeContext } from "../../../../context/themeContext/Theme.Context";
import { useParallax } from "react-scroll-parallax";

const MeSection = () => {
  const [imageReady, setImageReady] = useState<"loading" | "done" | "error">("loading"); 
  const { theme } = useThemeContext();
  const parallax = useParallax<HTMLImageElement>({
    rotateY: [180, -180],
  });
  const [activeTab, setActiveTab] = useState<"professional" | "personal" | "other">("professional");


  const tabs: { [key: string]: JSX.Element } = {
    "professional": (
      <>
        <p>
          Hello, my name is Otniel Gutiérrez and I work as a Full Stack Web Developer. Since June 2018, 
          I've been involved in 4 different startups, alongside some personal projects. <br />
          These startups span various industries including restaurants, government, fintech, and 
          digital marketing.
        </p>
        <p>
          I am skilled at both initiating projects from the ground up and integrating into existing ones.
        </p>
        <p>
          Those I've collaborated with describe me as detail-oriented, making minimal errors, and adaptable 
          to change. I view myself as persistent, proactive, and accountable. Additionally, 
          I highly value reciprocity in interpersonal relationships.
        </p>
      </>
    ),
    "personal": (
      <>
        <p>My full name is Germán Otniel Gutiérrez Serrano, and I'm originally from Mexico City. 
        I'm 29 years old and happily married to Ilse ❤️, the love of my life.</p>
        
        <p>I consider myself a calm person; I prefer staying at home watching a good series rather 
        than going to a shopping mall, although I also enjoy walking in a beautiful, tree-lined park.</p>
        
        <p>I'm a fan of soccer, and my favorite team is Chivas de Guadalajara, as I believe this team 
        represents Mexican culture excellently.</p>
        
        <p>My favorite foods are aguachile, pozole, and the chicharron with cheese quesadillas that my mom makes.</p>
        
        <p>I am a believer in God and trust that the Bible is the word of God, but I respect the beliefs of any person.</p>
      </>
    ),
    "other": (
      <>
        <p>Some fun facts about me are that when I was little, a turkey 🦃 chased me in front of my whole family, and I ran 
        away screaming, "Mom, mom, a big bird wants to eat me!".</p> 
        <p>Then, on another occasion, while playing with a marble, I somehow managed to get it into my mouth and started 
        choking on it. I almost died until my dad helped me, and I ended up swallowing the marble. Needless to say, it 
        was my favorite one, and unfortunately, after a few days, I had to say goodbye to it as it went down the bathroom drain.</p>
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
                  <h3>About me</h3>
                  <ButtonGroup>
                    <Button
                      active={activeTab === "professional"}
                      onClick={() => setActiveTab("professional")}
                    >
                      Professional
                    </Button>
                    <Button
                      active={activeTab === "personal"}
                      onClick={() => setActiveTab("personal")}
                    >
                      Personal
                    </Button>
                    <Button
                      active={activeTab === "other"}
                      onClick={() => setActiveTab("other")}
                    >
                      Other
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