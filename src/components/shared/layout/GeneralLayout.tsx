import { useLayoutContext } from "../../../context/layoutContext/Layout.Context";
import BasicLoader from "../loaders/BasicLoader";
import SidebarShared from "./Sidebar.Shared";

interface IGeneralLayoutProps {
  children: React.ReactNode;
};

const GeneralLayout: React.FC<IGeneralLayoutProps> = ({
  children
}) => {
  const { onChangeLayout, layoutConfig, } = useLayoutContext();

  return (
    <>
      <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
        <SidebarShared/>
        <div
          style={{
            width: "calc(100vw - 56px)",
            marginLeft: "56px"
          }}
          onClick={() => onChangeLayout({ ...layoutConfig, isExpandedSidebar: false })}
        >
          {children}
        </div>
      </div>
      <BasicLoader />
    </>
  );
};

export default GeneralLayout;