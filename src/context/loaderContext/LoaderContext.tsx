import { createContext, useContext, useState } from "react";

interface ILoaderState {
  show: boolean;
  onShow: (toShow: boolean) => void;
};

const LoaderContext = createContext<ILoaderState | undefined>(undefined);

export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [show, setShow] = useState<boolean>(false);

  const onShow = (toShow: boolean) => {
    setShow(toShow);
  };

  const value = {
    show,
    onShow,
  };

  return (
    <LoaderContext.Provider value={value}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoaderContext = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error(
      'useLoaderContext must be used within a LoaderContext'
    );
  }
  return context;
};