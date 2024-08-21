import { Breadcrumb, Panel } from 'rsuite';
import { GeneralLayout } from '../../components/shared/layout';
import { ParagraphStyled } from '../../components/shared';
import { Link } from 'react-router-dom';
import ExcelReader from './sections/ExcelReader';

const ExcelsPage: React.FC = () => {


  return (
    <>
      <GeneralLayout>
        <Panel
          header={
            <>
              <ParagraphStyled size="lg" bold>
                Lectura de Excel
              </ParagraphStyled>
              <Breadcrumb>
                <Link to="/"><Breadcrumb.Item style={{ fontWeight: "lighter" }}>
                  Inicio
                </Breadcrumb.Item></Link>
                <Breadcrumb.Item active>
                  Lectura de Excel
                </Breadcrumb.Item>
              </Breadcrumb>
            </>
          }
        >
          <ExcelReader />
        </Panel>
      </GeneralLayout>
    </>
  );
};

export default ExcelsPage;
