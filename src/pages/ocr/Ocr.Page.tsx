import { Breadcrumb, Panel } from "rsuite";
import { GeneralLayout } from "../../components/shared/layout";
import { ParagraphStyled } from "../../components/shared";
import { Link } from "react-router-dom";
import OcrReader from "./components/OcrReader";

const OcrPage = () => {

  return (
    <>
      <GeneralLayout>
        <Panel
          header={
            <>
              <ParagraphStyled size="lg" bold>
                Object Character Recognizition
              </ParagraphStyled>
              <Breadcrumb>
                <Link to="/"><Breadcrumb.Item style={{ fontWeight: "lighter" }}>
                  Inicio
                </Breadcrumb.Item></Link>
                <Breadcrumb.Item active>
                  OCR
                </Breadcrumb.Item>
              </Breadcrumb>
            </>
          }
        >
          <OcrReader />
        </Panel>
      </GeneralLayout>
    </>
  );
};

export default OcrPage;