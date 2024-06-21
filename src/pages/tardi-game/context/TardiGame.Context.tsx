import { createContext, useContext, useLayoutEffect, useRef, useState } from "react";


interface ITardiGameState {
  canvasCtx: CanvasRenderingContext2D | null;
  onCanvasCtx: (newCanvasCtx: CanvasRenderingContext2D | null) => void;
  config: React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>;
  setConfig: (newConfig: React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>) => void;
};

const TardiGameContext = createContext<ITardiGameState | undefined>(undefined);

export const TardiGameProvider = ({ children }: { children: React.ReactNode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasCtx, setCanvasCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [config, setConfig] = useState<React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>>({
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (context) {
      setCanvasCtx(context);
    }

    const handleUpdateSize = () => {
      setConfig({
        width: window.innerWidth - 100,
        height: window.innerHeight - 140,
      });
    };
    handleUpdateSize();

    window.addEventListener("resize", () => handleUpdateSize());
    return () => {
      window.removeEventListener("resize", () => handleUpdateSize());
    };
  }, [setCanvasCtx, setConfig]);

  const value = {
    canvasCtx,
    onCanvasCtx: setCanvasCtx,
    config,
    setConfig,
  };

  return (
    <>
      <TardiGameContext.Provider value={value}>
        {children}
        <canvas 
          ref={canvasRef} 
          width={config.width} 
          height={config.height} 
          style={{ border: '1px solid gray' }} 
        />
      </TardiGameContext.Provider>
    </>
  );
};

export const useTardiGameContext = () => {
  const context = useContext(TardiGameContext);
  if (!context) {
    throw new Error(
      'useTardiGameContext must be used within a TardiGameContext'
    );
  }
  return context;
};