import { useCallback, useEffect, useState } from "react";
import { useTardiGameContext } from "../context/TardiGame.Context";

const BoardGame = () => {
  const { canvasCtx, config, } = useTardiGameContext();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [start, setStart] = useState(false);
  const [tardi, setTardi] = useState({
    width: 150,
    height: 90,
    x: 20,
    y: 150,
  });

  const renderBoard = useCallback(() => {
    if (canvasCtx) {
      const img = new Image();
      img.src = "https://cdn.pixabay.com/photo/2017/09/12/11/56/universe-2742113_1280.jpg";
      const img2 = new Image();
      img2.src = "https://cdn.pixabay.com/photo/2017/09/12/11/56/universe-2742113_1280.jpg";

      canvasCtx.save();
      canvasCtx.clearRect(0, 0, Number(config.width), Number(config.height));
      canvasCtx.restore();

      img.onload = () => {
        canvasCtx.save();
        canvasCtx.drawImage(img, position.x, 0, Number(config.width), Number(config.height));
        canvasCtx.restore();
      };

      img2.onload = () => {
        canvasCtx.save();
        canvasCtx.translate((Number(config.width) * 2 + (Number(config.width))), 0);
        canvasCtx.scale(-1, 1);
        canvasCtx.drawImage(img2, position.x > 0 ? ((Number(config.width) * 2) + (Number(config.width) - position.x)) : Number(config.width) - position.x, 0,  Number(config.width), Number(config.height));
        canvasCtx.restore();
      };

      const tardiImg = new Image();
      tardiImg.src = "./images/tardi.png";

      tardiImg.onload = () => {
        canvasCtx.save();
        canvasCtx.drawImage(tardiImg, tardi.x, tardi.y, tardi.width, tardi.height);
        canvasCtx.restore();
      };
    }
    // eslint-disable-next-line
  }, [position, config, tardi]);

  useEffect(() => {
    renderBoard();
  }, [renderBoard]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Enter':
          setStart(true);
          break;
        case "ArrowUp":
          setTardi((prevState) => ({ ...prevState, y: prevState.y - 10 }));
          break;
        case "ArrowDown":
          setTardi((prevState) => ({ ...prevState, y: prevState.y + 10 }));
          break;
        case "ArrowRight":
          setTardi((prevState) => ({ ...prevState, x: prevState.x + 10 }));
          break;
        case "ArrowLeft":
          setTardi((prevState) => ({ ...prevState, x: prevState.x - 10 }));
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setTardi, setStart]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (start) {
        const velocity = 6;
        setPosition(prev => ({
          x: prev.x < -Number(config.width) ? (Number(config.width) - (velocity * 2)) : prev.x - velocity,
          y: 0,
        }));
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, [start]);

  return (
    <> 
    </>
  );
};

export default BoardGame;