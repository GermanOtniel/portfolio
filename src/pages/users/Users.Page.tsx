import { Breadcrumb, Panel } from 'rsuite';
import { GeneralLayout } from '../../components/shared/layout';
import { Link } from 'react-router-dom';
import UsersTable from './components/UsersTable.Component';
import { ParagraphStyled } from '../../components/shared';
import { useThemeContext } from '../../context/themeContext/Theme.Context';
import { USERS } from '../../language';

const UsersPage = () => {
  const { language } = useThemeContext();

  return (
    <>
      <GeneralLayout>
        <Panel
          header={
            <>
              <ParagraphStyled size="lg" bold>
                {USERS[language].A}
              </ParagraphStyled>
              <Breadcrumb>
                <Link to="/"><Breadcrumb.Item style={{ fontWeight: "lighter" }}>
                  {USERS[language].B}
                </Breadcrumb.Item></Link>
                <Breadcrumb.Item active>
                  {USERS[language].A}
                </Breadcrumb.Item>
              </Breadcrumb>
            </>
          }
        >
          <UsersTable />
        </Panel>
      </GeneralLayout>
    </>
  );
};

export default UsersPage;