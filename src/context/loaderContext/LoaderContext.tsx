import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

interface ILoaderState {
  show: boolean;
  onShow: (toShow: boolean) => void;
  showGameLoader: boolean;
  onShowGameLoader: (toShow: boolean) => void;
};

const LoaderContext = createContext<ILoaderState | undefined>(undefined);

export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [show, setShow] = useState<boolean>(false);
  const [showGameLoader, setShowGameLoader] = useState(false);

  // Estado para almacenar los segundos que el valor ha estado en un estado específico
  const [secondsSpent, setSecondsSpent] = useState<number>(0);

  // Ref para almacenar el tiempo de inicio cuando el valor cambia
  const startTimeRef = useRef<number | null>(null);

  // Intervalo de tiempo
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const onShow = (toShow: boolean) => {
    setShow(toShow);
  };

  const onShowGameLoader = (toShow: boolean) => {
    setShowGameLoader(toShow);
  };

  useEffect(() => {
    const handleInterval = () => {
      if (startTimeRef.current !== null) {
        const now = Math.floor((performance.now() - startTimeRef.current) / 1000);
        setSecondsSpent(now);
      }
    };

    if (show) {
      if (startTimeRef.current === null) {
        startTimeRef.current = performance.now();
        setSecondsSpent(0); // Resetear el contador cuando el valor cambia a 'targetValue'
      }
      intervalRef.current = setInterval(handleInterval, 1000);
    } else {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      startTimeRef.current = null;
      setShowGameLoader(false);
    }

    // Cleanup function to clear the interval
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [show, setShowGameLoader]);

  useMemo(() => {
    if (secondsSpent >= 5) {
      setShowGameLoader(true);
    }
  }, [secondsSpent]);

  const value = {
    show,
    onShow,
    showGameLoader,
    onShowGameLoader,
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