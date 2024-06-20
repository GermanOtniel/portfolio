import { useState } from "react";
import { useLoaderContext } from "../../../../context/loaderContext/LoaderContext";
import Game from "./Game";
import { Button, Modal } from "rsuite";
import { MainButton } from "../../styled";
import { useThemeContext } from "../../../../context/themeContext/Theme.Context";
import { SHARED } from "../../../../language";

const GameLoader = () => {
  const { theme, language, } = useThemeContext();
  const { showGameLoader, } = useLoaderContext();
  const [start, setStart] = useState<"start" | "notStart" | "preferWait">("notStart");

  return (
    <>
      {(showGameLoader && start !== "preferWait") && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 10001,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
        <Modal open={start === "notStart"} style={{ zIndex: 10002 }}>
          <Modal.Header>
            <Modal.Title style={{ fontWeight: "bold" }}>
              {SHARED.GAME_LOADER[language].A}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {SHARED.GAME_LOADER[language].B}
          </Modal.Body>
          <Modal.Footer>
            <MainButton theme={theme} onClick={() => setStart("start")} appearance="ghost">
              {SHARED.GAME_LOADER[language].C}
            </MainButton>
            <Button onClick={() => setStart("preferWait")} appearance="subtle">
              {SHARED.GAME_LOADER[language].D}
            </Button>
          </Modal.Footer>
        </Modal>
        {start === "start" && (
          <Game />
        )}
        </div>
      )}
    </>
  );
};

export default GameLoader;