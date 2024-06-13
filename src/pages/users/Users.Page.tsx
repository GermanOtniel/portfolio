import { Breadcrumb, Panel } from 'rsuite';
import { GeneralLayout } from '../../components/shared/layout';
import { Link } from 'react-router-dom';
import UsersTable from './components/UsersTable.Component';

const UsersPage = () => {

  return (
    <>
      <GeneralLayout>
        <Panel
          header={
            <>
              <h3 className="title">Registro de Usuarios</h3>
              <Breadcrumb>
                <Link to="/"><Breadcrumb.Item style={{ fontWeight: "lighter" }}>Inicio</Breadcrumb.Item></Link>
                <Breadcrumb.Item active>Registro de Usuarios</Breadcrumb.Item>
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