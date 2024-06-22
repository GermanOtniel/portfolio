import { useEffect, useMemo, useRef, useState } from "react";
import { useTardiGameContext } from "../context/TardiGame.Context";

const BoardGame = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { config, } = useTardiGameContext();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [start, setStart] = useState(false);
  const [tardi, setTardi] = useState({
    width: 120,
    height: 80,
    x: 20,
    y: 150,
  });
  const [projectiles, setProjectiles] = useState<{ x: number; y: number; }[]>([]);

  useEffect(() => {
    if (!config) return;
    const canvas = canvasRef.current;
    if (canvas && start) {
      const context = canvas.getContext('2d');
      const backgroundImage = new Image();
      const backgroundImageReverse = new Image();
      const playerImage = new Image();
      backgroundImage.src = 'https://cdn.pixabay.com/photo/2017/09/12/11/56/universe-2742113_1280.jpg';
      backgroundImageReverse.src = 'https://cdn.pixabay.com/photo/2017/09/12/11/56/universe-2742113_1280.jpg';
      playerImage.src = './images/tardi.png';

      const draw = () => {
        // Doble buffer: Crear un canvas oculto
        const bufferCanvas = document.createElement('canvas');
        bufferCanvas.width = config.width;
        bufferCanvas.height = config.height;
        
        if (bufferCanvas) {
          const bufferContext = bufferCanvas.getContext('2d');
  
          if (bufferContext) {
          // Dibujar en el canvas del buffer
          bufferContext.clearRect(0, 0, bufferCanvas.width, bufferCanvas.height);
          bufferContext.drawImage(backgroundImage, position.x, 0, Number(config.width), Number(config.height));

          bufferContext.save();
          bufferContext.translate((Number(config.width) * 2 + (Number(config.width))), 0);
          bufferContext.scale(-1, 1);
          bufferContext.drawImage(backgroundImageReverse, position.x > 0 ? ((Number(config.width) * 2) + (Number(config.width) - position.x)) : Number(config.width) - position.x, 0,  Number(config.width), Number(config.height));
          bufferContext.restore();

          bufferContext.drawImage(playerImage, tardi.x, tardi.y, tardi.width, tardi.height);
    
          projectiles.forEach((projectile) => {
            const gradient = bufferContext.createRadialGradient(
              projectile.x, projectile.y, 5,
              projectile.x, projectile.y, 10
            );
            gradient.addColorStop(0, 'yellow');
            gradient.addColorStop(0.5, 'orange');
            gradient.addColorStop(1, 'red');
    
            bufferContext.fillStyle = gradient;
            bufferContext.beginPath();
            bufferContext.arc(projectile.x, projectile.y, 10, 0, Math.PI * 2);
            bufferContext.fill();
          });

          if (context) {
            // Copiar el contenido del buffer al canvas principal
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(bufferCanvas, 0, 0);
          }
          }
        }
      };

      const moveProjectiles = () => {
        setProjectiles((prevProjectiles) => 
          prevProjectiles
            .map((projectile) => ({ ...projectile, x: projectile.x + 5 }))
            .filter((projectile) => projectile.x < canvas.width)
        );
      };

      const intervalId = setInterval(() => {
        moveProjectiles();
        const velocity = 5;
        setPosition(prev => ({
          x: prev.x < -Number(config.width) ? (Number(config.width) - (velocity * 2)) : prev.x - velocity,
          y: 0,
        }));
        draw();
      }, 1000 / 60); // 60 FPS
  
      return () => {
        clearInterval(intervalId);
      };
    }

  }, [config, start, position, tardi, projectiles]);


  const configUpdated = useMemo(() => config, [config]);
  const tardiPosition = useMemo(() => {
    return {
      width: tardi.width,
      height: tardi.height,
      x: tardi.x,
      y: tardi.y,
    };
  }, [tardi]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Enter':
          setStart(true);
          break;
        case "ArrowUp":
          setTardi((prevState) => ({ ...prevState, y: prevState.y <= 0 ? 0 : prevState.y - 20 }));
          break;
        case "ArrowDown":
          setTardi((prevState) => ({ ...prevState, y: prevState.y >= ((configUpdated?.height || 0) - 50) ? (configUpdated?.height || 0) - 50 : prevState.y + 20 }));
          break;
        case "ArrowRight":
          setTardi((prevState) => ({ ...prevState, x: (prevState.x + 120) >= (configUpdated?.width || 0) ? ((configUpdated?.width || 0) - 120) : prevState.x + 20 }));
          break;
        case "ArrowLeft":
          setTardi((prevState) => ({ ...prevState, x: prevState.x <= 0 ? 0 : prevState.x  - 20 }));
          break;
        case " ":
          setProjectiles((prevProjectiles) => [ ...prevProjectiles, { x: tardiPosition.x + (tardiPosition.width / 2), y: tardiPosition.y + (tardiPosition.height / 2) } ]);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setTardi, setStart, tardiPosition]);

  return (
    <> 
      <canvas ref={canvasRef} width={config?.width} height={config?.height} style={{ border: "1px solid gray" }} />
    </>
  );
};

export default BoardGame;