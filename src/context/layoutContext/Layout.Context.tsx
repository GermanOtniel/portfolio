import { createContext, useContext, useState } from "react";

interface ILayoutState {
  layoutConfig: {
    isExpandedSidebar: boolean;
  };
  onChangeLayout: (newLayoutConfig: ILayoutState["layoutConfig"]) => void;
};

const LayoutContext = createContext<ILayoutState | undefined>(undefined);

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [layoutConfig, setLayoutConfig] = useState<ILayoutState["layoutConfig"]>({
    isExpandedSidebar: false
  });

  const onChangeLayout = (newLayoutConfig: ILayoutState["layoutConfig"]) => {
    setLayoutConfig(newLayoutConfig);
  };

  const value = {
    layoutConfig,
    onChangeLayout,
  };

  return (
    <LayoutContext.Provider value={value}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error(
      'useLayoutContext must be used within a LayoutContext'
    );
  }
  return context;
};