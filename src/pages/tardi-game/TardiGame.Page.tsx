import { Breadcrumb, Panel } from "rsuite";
import { GeneralLayout } from "../../components/shared/layout";
import { ParagraphStyled } from "../../components/shared";
import { Link } from "react-router-dom";
import BoardGame from "./components/BoardGame.Component";
import { TardiGameProvider } from "./context/TardiGame.Context";

const TardiGamePage = () => {

  return (
    <>
      <GeneralLayout>
        <Panel
          header={
            <>
              <ParagraphStyled size="lg" bold>
                Tardi Game
              </ParagraphStyled>
              <Breadcrumb>
                <Link to="/"><Breadcrumb.Item style={{ fontWeight: "lighter" }}>
                  Home
                </Breadcrumb.Item></Link>
                <Breadcrumb.Item active>
                  Tardi Game
                </Breadcrumb.Item>
              </Breadcrumb>
            </>
          }
        >
          <TardiGameProvider>
            <BoardGame />
          </TardiGameProvider>
        </Panel>
      </GeneralLayout>
    </>
  );
};

export default TardiGamePage;