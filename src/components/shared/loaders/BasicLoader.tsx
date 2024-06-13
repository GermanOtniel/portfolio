import { Loader } from "rsuite";
import { useLoaderContext } from "../../../context/loaderContext/LoaderContext";
import { useThemeContext } from "../../../context/themeContext/Theme.Context";

const LANGUAGE = {
  ES: {
    A: "Espera un momento seguimos contigo...",
  },
  EN: {
    A: "Wait a moment we continue with you..."
  }
};

const BasicLoader = () => {
  const { show } = useLoaderContext();
  const { language, } = useThemeContext();

  return (
    <>
      {show && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 10000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader 
            content={LANGUAGE[language].A}
            speed="fast" 
            backdrop 
            vertical 
          />
        </div>
      )}
    </>
  );
};

export default BasicLoader;