import { Loader } from "rsuite";
import { useLoaderContext } from "../../../context/loaderContext/LoaderContext";

const BasicLoader = () => {
  const { show } = useLoaderContext();

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
            zIndex: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader content="Loading..." speed="fast" backdrop vertical />
        </div>
      )}
    </>
  );
};

export default BasicLoader;