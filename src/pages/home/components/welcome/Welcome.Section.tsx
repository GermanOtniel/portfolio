import { Col, Grid } from "rsuite";
import { RowResponsive } from "./Welcome.Styled";
import { ImageResponsive, MainButton, TitleStyled } from "../../../../components/shared";
import { useParallax } from "react-scroll-parallax";
import { useThemeContext } from "../../../../context/themeContext/Theme.Context";

const WelcomeSection = () => {
  const { theme } = useThemeContext();
  const parallax = useParallax<HTMLImageElement>({
    rotate: [-15, 360],
    scale: [1.2, .3, 'easeInQuad'],
  });
  const parallax2 = useParallax<HTMLDivElement>({
    scale: [1.2, .5, 'easeInQuad'],
  });

  return (
    <>
      <code 
        style={{ 
          marginLeft: "10px", 
          fontSize: "10px", 
          color: "#c0c0c0"
        }}
        id="welcome"
      >
        {"<body>"}
      </code>
      <Grid
        fluid
        style={{
          width: "100%",
          height: "94vh",
          justifyContent: "center",
          display: "flex"
        }}
      >
        <RowResponsive>
          <Col
            xs={24}
            sm={24}
            md={12}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
            ref={parallax2.ref}
          >
            <div>
              <span 
                style={{ 
                  fontSize: "10px",
                  color: "#c0c0c0"
                }}
              ><code>{"<h1>"}</code></span>
              <TitleStyled>Hi,</TitleStyled>
              <TitleStyled>I'm 
                <span
                  style={{
                    marginLeft: "10px",
                    marginRight: "1.5px",
                    textShadow: "4px 2px #ff0000",
                    color: "#00ffff"
                  }}
                >
                  0
                </span>tniel,
              </TitleStyled>
              <div style={{ display: "flex", alignItems: "end" }}>
                <TitleStyled>web developer.</TitleStyled>
                <span 
                  style={{ 
                    marginLeft: "15px", 
                    fontSize: "10px",
                    color: "#c0c0c0"
                  }}>
                  <code>{"</h1>"}</code>
                </span>
              </div>
              <p style={{ color: theme === "dark" ? "#00ffff" : "inherit", fontWeight: "lighter" }}>
                Back End Developer{"   |   "}Front End Developer{"   |   "}Freelancer
              </p>
              <a href="/#contact">
                <MainButton
                  appearance="ghost" 
                  style={{ marginTop: "10px", width: "100%" }}
                  theme={theme}
                >
                  CONTACT ME
                </MainButton>
              </a>
            </div>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={12}
            style={{ display: "flex" }}
          >
            <ImageResponsive
              src='/images/port-o1.png'
              alt='Portfolio logo'
              style={{
                margin: "0px auto"
              }}
              xs={{ width: "200px", height: "auto" }}
              sm={{ width: "200px", height: "auto" }}
              ref={parallax.ref}
            />
          </Col>
        </RowResponsive>
      </Grid>
      <code 
        style={{ 
          marginLeft: "10px", 
          fontSize: "10px",
          color: "#c0c0c0"
        }}
      >
        {"</body>"}
      </code>
    </>
  );
};

export default WelcomeSection;