import { useEffect, useMemo, useRef, useState } from "react";
import { useTardiGameContext } from "../context/TardiGame.Context";
import { ParagraphGamer } from "../../../components/shared";
import { useThemeContext } from "../../../context/themeContext/Theme.Context";
import { Avatar, Button, Drawer, IconButton } from 'rsuite';
import InfoRoundIcon from '@rsuite/icons/InfoRound';
import ArrowLeftIcon from '@rsuite/icons/ArrowLeft';
import ArrowRightIcon from '@rsuite/icons/ArrowRight';
import ArrowUpIcon from '@rsuite/icons/ArrowUp';
import PauseRoundIcon from '@rsuite/icons/PauseRound';
import { ArrowDown } from '@rsuite/icons';
import PlayOutlineIcon from '@rsuite/icons/PlayOutline';
import ListIcon from '@rsuite/icons/List';
import { v4 as uuidv4 } from 'uuid';
import { ArrowKeys, ArrowKeysRow, ArrowLeft, ArrowRight, ArrowUp, ArrowDown as ArrowDownStyled, ShootButton } from "../styled/TardiGame.styled";
import OneColumnIcon from '@rsuite/icons/OneColumn';
import CloseIcon from '@rsuite/icons/Close';
import { useLoaderContext } from "../../../context/loaderContext/LoaderContext";
import { playersDB } from "../../../db/playersDB";
import { IPlayer } from "../../../models";
import { faker } from "@faker-js/faker";

const BoardGame = () => {
  const audio = useRef(new Audio("./music/tardigame.mp3"));
  const [playing, setPlaying] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { config, setConfig, } = useTardiGameContext();
  const [points, setPoints] = useState(0);
  const [timer, setTimer] = useState(45);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [pause, setPause] = useState(false);
  const [start, setStart] = useState(false);
  const [fScreen, setFScreen] = useState(false);
  const [tardi, setTardi] = useState({
    width: 120,
    height: 80,
    x: 20,
    y: 150,
  });
  const { onShow } = useLoaderContext();
  const [openScores, setOpenScores] = useState(false);
  const [scores, setScores] = useState<IPlayer[]>([]);
  const [projectiles, setProjectiles] = useState<{ id: string; x: number; y: number; }[]>([]);
  const [planets, setPlanets] = useState<{ x: number; y: number; points: number; planetIndex: number; id: string; }[]>([]);
  const [openInstructions, setOpenInstructions] = useState(false);
  const { theme } = useThemeContext();
  const [player, setPlayer] = useState<IPlayer | null>(null);
  const [gameOverText, setGameOverText] = useState("");

  useEffect(() => {
    if (!config) return;
    const canvas = canvasRef.current;
    if (canvas && start && !pause && !gameOver) {
      const context = canvas.getContext('2d');
      const backgroundImage = new Image();
      const backgroundImageReverse = new Image();
      const playerImage = new Image();
      backgroundImage.src = 'https://cdn.pixabay.com/photo/2017/09/12/11/56/universe-2742113_1280.jpg';
      backgroundImageReverse.src = 'https://cdn.pixabay.com/photo/2017/09/12/11/56/universe-2742113_1280.jpg';
      playerImage.src = './images/tardi.png';
      const marteImage = new Image();
      const mercurioImage = new Image();
      const saturnoImage = new Image();
      const jupiterImage = new Image();
      const apollo11Image = new Image();
      const astronautaImage = new Image();
      marteImage.src = './images/marte.png';
      marteImage.style.objectPosition = "contain";
      mercurioImage.src = './images/mercurio.png';
      mercurioImage.style.objectPosition = "contain";
      saturnoImage.src = './images/saturno.png';
      saturnoImage.style.objectPosition = "contain";
      jupiterImage.src = './images/jupiter.png';
      jupiterImage.style.objectPosition = "contain";
      apollo11Image.src = './images/apollo11.png';
      apollo11Image.style.objectPosition = "contain";
      astronautaImage.src = './images/astronauta.png';
      astronautaImage.style.objectPosition = "contain";
      const planetsImages = [marteImage, mercurioImage, saturnoImage, jupiterImage, apollo11Image, astronautaImage];

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
    
          projectiles.forEach((projectile) => {
            let hasCollision = false;
            if (planets.length) {
              hasCollision = planets.some((planet) => {
                const areaYPlanetInit = planet.y + 50;
                const areaYPlanetEnd = planet.y + planetsImages[planet.planetIndex].height;
    
                const areaXPlanetInit = planet.x + 150;
                const areaXPlanetEnd = planet.x + (planetsImages[planet.planetIndex].width - (planetsImages[planet.planetIndex].width / 4));
                
                const collision = (
                  (projectile.x >= areaXPlanetInit && projectile.x <= areaXPlanetEnd) &&
                  (projectile.y >= areaYPlanetInit && projectile.y <= areaYPlanetEnd)
                );
                if (collision) {
                  setPlanets((prevPlanets) => {
                    const copyPlanets = [...prevPlanets];
                    const planetIndex = copyPlanets.findIndex((currPlanet) => currPlanet.id === planet.id);
                    
                    if (planetIndex > -1) {
                      setPoints(prevPoints => {
                        return prevPoints + 1;
                      });
                      copyPlanets[planetIndex].points = copyPlanets[planetIndex].points - 1;
                      if (copyPlanets[planetIndex].points <= 0) {
                        copyPlanets.splice(planetIndex, 1);
                      }
                    }
                    return copyPlanets;
                  });
                }

                return collision;
              });
            }

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

            if (hasCollision) {
              setProjectiles(prevProjectiles => prevProjectiles.filter((currProjectile) => currProjectile.id !== projectile.id));
            }
          });

          planets.forEach((planet) => {
            const currentPlanet = planetsImages[planet.planetIndex];
            bufferContext.drawImage(
              currentPlanet, planet.x, planet.y);
            bufferContext.font = "30px Avenir"
            bufferContext.fillStyle = "white";
            bufferContext.fillText(String(planet.points), planet.x + ((currentPlanet.width / 2) - 16), planet.y + ((currentPlanet.height / 2) ));
          });
          bufferContext.drawImage(playerImage, tardi.x, tardi.y, tardi.width, tardi.height);


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

      const movePlanets = () => {
        setPlanets((prevPlanets) => prevPlanets
          .map((planet) => ({ ...planet, x: planet.x - 3 }))
          .filter((planet) => planet.x < canvas.width)
        );
      };

      const intervalId = setInterval(() => {
        moveProjectiles();
        movePlanets();
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

  }, [config, start, pause, position, tardi, projectiles, planets]);

  useEffect(() => {
    // Función para obtener un tiempo de intervalo aleatorio entre 1 y 5 segundos
    const getRandomInterval = () => {
      const min = 3500; // 1 segundo en milisegundos
      const max = 5000; // 5 segundos en milisegundos
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // Función para agregar un elemento al array
    const addItem = () => {
      setPlanets((prevPlanets) => [...prevPlanets, {
        y:  Math.floor(Math.random() * (((config?.height || 0) / 2) - 0 + 1)) + 0, 
        x: (config?.width || 0) - 10, 
        points: Math.floor(Math.random() * ((25) - 0 + 5)) + 5,
        planetIndex: Math.floor(Math.random() * 6),
        id: uuidv4(),
      }]);
    };

    // Inicializa el primer intervalo
    let intervalId = setInterval(() => {
      addItem();
      // Limpia el intervalo actual
      clearInterval(intervalId);
      // Configura un nuevo intervalo con tiempo aleatorio
      intervalId = setInterval(addItem, getRandomInterval());
    }, getRandomInterval());

    // Limpiamos el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []);
  
  useEffect(() => {
    try {
      let currentPlayer = {
        id:uuidv4(),
        nickName: faker.internet.userName(),
        avatar: faker.image.urlPicsumPhotos(),
      };

      const playerLS = localStorage.getItem("playerPOweb");
      if (playerLS) {
        currentPlayer = JSON.parse(playerLS);
      }
      if (!playerLS) {
        localStorage.setItem("playerPOweb", JSON.stringify(currentPlayer));
      }

      setPlayer({
        id: currentPlayer.id,
        avatar: currentPlayer.avatar,
        nickName: currentPlayer.nickName,
        points: 0,
      });
    } catch (error) {
      setPlayer(null);
    }
  }, []);

  const savePoints = async () => {
    try {
      if (!player) return;
      onShow(true);
      const playerFound = await playersDB.findOne(player.id);
      if (playerFound) {
        await playersDB.update({
          id: playerFound.id,
          avatar: playerFound.avatar,
          nickName: playerFound.nick_name,
          points: points,
        });
      } else {
        await playersDB.create({
          id: player.id,
          avatar: player.avatar,
          nickName: player.nickName,
          points: points,
        });
      }
      await handleOpenScores();
    } catch (error) {
      console.log(error);
    } finally {
      onShow(false);
      setPlaying(false);
      setGameOver(true);
    }
  };

  useEffect(() => {
    // Verificar si el tiempo restante ha llegado a cero para detener el intervalo
    if (timer <= 0) {
      savePoints();
      exitFullscreen();
      setFScreen(false);
      return;
    }

    if ((pause || !start)) {
      return;
    }

    // Crear un intervalo que se ejecuta cada segundo
    const intervalId = setInterval(() => {
      setTimer((prevTime) => prevTime - 1);
    }, 1000);

    // Limpiar el intervalo cuando el componente se desmonte o cuando cambie timer
    return () => clearInterval(intervalId);
  }, [timer, pause, start]);

  const configUpdated = useMemo(() => config, [config]);
  const tardiPosition = useMemo(() => {
    return {
      width: tardi.width,
      height: tardi.height,
      x: tardi.x,
      y: tardi.y,
    };
  }, [tardi]);

  const handleMove = (movement: "up" | "left" | "right" | "down") => {
    switch (movement) {
      case "up":
        setTardi((prevState) => ({ ...prevState, y: prevState.y <= 0 ? 0 : prevState.y - 20 }));
        break;

      case "left":
        setTardi((prevState) => ({ ...prevState, x: prevState.x <= 0 ? 0 : prevState.x  - 20 }));
        break;

      case "right":
        setTardi((prevState) => ({ 
          ...prevState, 
          x: (prevState.x + 120) >= (configUpdated?.width || 0) ? ((configUpdated?.width || 0) - 120) : prevState.x + 20 }
        ));
        break;

      case "down":
        setTardi((prevState) => ({ 
          ...prevState, 
          y: prevState.y >= ((configUpdated?.height || 0) - 50) ? (configUpdated?.height || 0) - 50 : prevState.y + 20 
        }));
        break;
    
      default:
        break;
    }
  };

  const handleShoot = () => {
    setProjectiles((prevProjectiles) => [
      ...prevProjectiles, 
      { x: tardiPosition.x + (tardiPosition.width / 2), y: tardiPosition.y + (tardiPosition.height / 2), id: new Date().getTime().toString() } 
    ]);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Enter':
          enterFullscreen();
          setPlaying(true);
          setStart(true);
          break;
        case "ArrowUp":
          handleMove("up");
          break;
        case "ArrowDown":
          handleMove("down");
          break;
        case "ArrowRight":
          handleMove("right");
          break;
        case "ArrowLeft":
          handleMove("left");
          break;
        case " ":
          handleShoot();
          break;

        case "Escape":
          setFScreen(false);
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

  const handleReload = () => {
    setGameOverText("");
    setPlanets([]);
    setProjectiles([]);
    setTardi({
      width: 120,
      height: 80,
      x: 20,
      y: 150,
    });
    setPosition({
      x: 0, y: 0
    });
    setProjectiles([]);
    setTimer(45);
    setPlaying(true);
    setGameOver(false);
    setPoints(0);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setFScreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    // Firefox
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    // Chrome, Safari and Opera
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    // IE/Edge
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const enterFullscreen = () => {
    if (elementRef.current && elementRef.current.requestFullscreen) {
      elementRef.current.requestFullscreen();
    } else if (elementRef.current && (elementRef.current as any).mozRequestFullScreen) { /* Firefox */
      (elementRef.current as any).mozRequestFullScreen();
    } else if (elementRef.current && (elementRef.current as any).webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      (elementRef.current as any).webkitRequestFullscreen();
    } else if (elementRef.current && (elementRef.current as any).msRequestFullscreen) { /* IE/Edge */
      (elementRef.current as any).msRequestFullscreen();
    } else {
      setConfig({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    setFScreen(true);
  };

  const exitFullscreen = async () => {
    if (document.exitFullscreen) {
      try {
        await document.exitFullscreen();
      } catch (error) {
        setFScreen(false); 
      }
    } else if ((document as any).mozCancelFullScreen) { /* Firefox */
      try {
        await (document as any).mozCancelFullScreen();
      } catch (error) {
        setFScreen(false); 
      }
    } else if ((document as any).webkitExitFullscreen) { /* Chrome, Safari and Opera */
      try {
        (document as any).webkitExitFullscreen();
      } catch (error) {
        setFScreen(false);
      }
    } else if ((document as any).msExitFullscreen) { /* IE/Edge */
      try {
        (document as any).msExitFullscreen();
      } catch (error) {
        setFScreen(false);
      }
    } else {
      setFScreen(false);
    }
  };

  const handleOpenScores = async () => {
    try {
      if (fScreen) {
        exitFullscreen();        
      }
      onShow(true);
      const allScores = await playersDB.getAll(1, 10000000);
      const newScores = allScores.players.sort((a, b) => b.points - a.points).map((playerHere, currIndex) => {
        let nickName = playerHere.nick_name;
        let points = playerHere.points;
        if (playerHere.id === player?.id) {
          nickName = "Tú";
          points = points;
        }

        return {
          id: playerHere.id,
          nickName,
          avatar: playerHere.avatar,
          points,
        };
      });
      const place = newScores.findIndex((score) => score.id === player?.id) + 1;

      setScores(newScores);

      setGameOverText(place > 0 ? `¡Alcanzaste el lugar #${place} con ${points} puntos!` : `¡Alcanzaste ${points} puntos!`);
      setOpenScores(true);
    } catch (error) {
      setScores([]); 
    } finally {
      onShow(false);
    }
  };

  useEffect(() => {
    playing ? audio.current.play() : audio.current.pause();
  }, [playing]);

  useEffect(() => {
    audio.current.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.current.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return (
    <> 
      <div ref={elementRef} style={fScreen ? {
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 10,
            width: "100vw",
            height: "100vh",
      } : { position: "relative" }}>
        <canvas 
          ref={canvasRef} 
          width={config?.width} 
          height={config?.height} 
          style={{
            border: "1px solid gray",
            opacity: gameOver ? .5 : 1
          }}
        />
        {(!start && !gameOver) && (
          <div 
            style={{ 
              position: "absolute", 
              left: 0, 
              top: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              gap: 20
            }}
          >
            <ParagraphGamer theme={theme} style={{ fontSize: "30px", textAlign: "center" }}>
              Presiona Jugar para comenzar
            </ParagraphGamer>
            <ParagraphGamer style={{ padding: "0px", margin: "0px", fontSize: "12px", textAlign: "center", color: theme === "dark" ? "white" : "black" }}>
              (Gira tu celular para una mejor experiencia)
            </ParagraphGamer>
            <div style={{ display: "flex", gap: 10 }}>
              <div
                style={{
                  width: "auto",
                  height: "auto",
                  padding: "10px 25px",
                  cursor: "pointer",
                  backgroundColor: theme === "dark" ? "#00ffff" : "#ff0000",
                  color: "white",
                  borderRadius: "10px"
                }}
                onClick={() => {
                  enterFullscreen();
                  setPlaying(true);
                  setStart(true);
                }}
              >
                <ParagraphGamer style={{ color: "white" }}>
                  Jugar
                </ParagraphGamer>
              </div>
              <IconButton onClick={() => setOpenInstructions(true)} icon={<InfoRoundIcon />} />
            </div>
          </div>
        )}
        {(start && !gameOver) && (
          <div
            style={{ 
              position: "absolute", 
              right: 0, 
              top: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
                padding: "5px",
                width: "100%"
              }}
            >
              <div style={{ display: "flex", gap: 5 }}>
                <IconButton 
                  as="div"
                  style={{ opacity: .5 }} 
                  onClick={(e) => {
                    e.preventDefault();
                    setPause(!pause);
                  }} icon={pause ? <PlayOutlineIcon /> : <PauseRoundIcon />} 
                />
                <IconButton 
                  as="div"
                  style={{ opacity: .5 }} 
                  onClick={(e) => {
                    if (fScreen) {
                      exitFullscreen();
                    } else {
                     enterFullscreen(); 
                    }
                  }} icon={fScreen ? <CloseIcon /> : <OneColumnIcon />} 
                />
              </div>

              <div
                style={{
                  width: "autp",
                  height: "auto",
                  opacity: .5,
                  borderRadius: "4px",
                  backgroundColor: "black",
                  marginRight: "15px",
                  padding: "5px"
                }}
              >
                <ParagraphGamer style={{ color: "white", fontSize: "7px" }}>
                  Puntos: {points}
                </ParagraphGamer>
                <ParagraphGamer style={{ color: "white", fontSize: "7px" }}>
                  Tiempo: {timer} seg.
                </ParagraphGamer>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "end",
                padding: "5px",
                marginBottom: ((config?.width || 0) > (config?.height || 0) && (config?.width || 0) < 1000)  ? "80px" : ((config?.width || 0) >= 1000) ? "5px" : "102px",
                width: "100%",
                height: "auto",
                opacity: .5
              }}
            >
              <ArrowKeys>
                <ArrowUp onClick={() => handleMove("up")}>↑</ArrowUp>
                <ArrowKeysRow>
                  <ArrowLeft onClick={() => handleMove("left")}>←</ArrowLeft>
                  <ArrowDownStyled onClick={() => handleMove("down")}>↓</ArrowDownStyled>
                  <ArrowRight onClick={() => handleMove("right")}>→</ArrowRight>
                </ArrowKeysRow>
              </ArrowKeys>

              <div
                style={{
                  width: "auto",
                  height: "auto",
                  opacity: .5,
                  borderRadius: "4px",
                  backgroundColor: "black",
                  marginRight: "15px",
                  padding: "5px"
                }}
              >
                <ShootButton onClick={() => handleShoot()}>Disparo</ShootButton>
              </div>
            </div>
          </div>
        )}
        {gameOver && (
          <div
            style={{
              position: "absolute", 
              left: 0, 
              top: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              gap: 20,
            }}
          >
            <ParagraphGamer theme={theme} style={{ fontSize: "30px", textAlign: "center" }}>
              Juego terminado
            </ParagraphGamer>
            <ParagraphGamer style={{ padding: "0px", margin: "0px", fontSize: "12px", textAlign: "center", color: theme === "dark" ? "white" : "black" }}>
              {gameOverText}
            </ParagraphGamer>
            <div style={{ display: "flex", gap: 10 }}>
              <div
                style={{
                  width: "auto",
                  height: "auto",
                  padding: "10px 25px",
                  cursor: "pointer",
                  backgroundColor: theme === "dark" ? "#00ffff" : "#ff0000",
                  color: "white",
                  borderRadius: "10px"
                }}
                onClick={() => handleReload()}
              >
                <ParagraphGamer style={{ color: "white" }}>
                  Reintentar
                </ParagraphGamer>
              </div>
              <IconButton onClick={() => handleOpenScores()} icon={<ListIcon />} />
            </div>
          </div>
        )}
      </div>

      <Drawer open={openInstructions} onClose={() => setOpenInstructions(false)} placement="top" size="lg">
        <Drawer.Header>
          <Drawer.Title>
            <ParagraphGamer style={{ color: "white", fontSize: "15px" }}>
              Instrucciones:
            </ParagraphGamer>
          </Drawer.Title>
          <Drawer.Actions>
            <Button onClick={() => setOpenInstructions(false)} appearance="primary">
              Entendido
            </Button>
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
          <ParagraphGamer style={{ color: "white", fontSize: "12px" }}>
            1) Da click en el botón "Jugar" o presiona la tecla "Enter".
          </ParagraphGamer>
          <ParagraphGamer style={{ color: "white", fontSize: "12px" }}>
            2) Usa las flechas para moverte: <br />
            <ArrowLeftIcon style={{ fontSize: "30px" }} /> Izquierda <br />
            <ArrowRightIcon style={{ fontSize: "30px" }} /> Derecha <br />
            <ArrowUpIcon style={{ fontSize: "30px" }} /> Arriba <br />
            <ArrowDown style={{ fontSize: "30px" }} /> Abajo <br />
          </ParagraphGamer>
          <ParagraphGamer style={{ color: "white", fontSize: "12px" }}>
            3) Dispara con "Barra de espacio" o Botón "Disparo".            
          </ParagraphGamer>
          <ParagraphGamer style={{ color: "white", fontSize: "12px" }}>
            4) Tienes 45 segundos para acumular el máximo de puntos.
          </ParagraphGamer>
        </Drawer.Body>
      </Drawer>

      <Drawer open={openScores} onClose={() => setOpenScores(false)} placement="top" size="lg">
        <Drawer.Header>
          <Drawer.Title>
            <ParagraphGamer style={{ color: "white", fontSize: "15px" }}>
              Posiciones:
            </ParagraphGamer>
          </Drawer.Title>
          <Drawer.Actions>
            <Button onClick={() => setOpenScores(false)} appearance="primary">
              Ok
            </Button>
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
          {scores.map((score, index) => (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "10px" }}>
              <Avatar src={score.avatar} circle />
              <ParagraphGamer key={score.id} style={{ color: "white", fontSize: "12px" }}>
                {index + 1}) {score.nickName} {score.points} puntos
              </ParagraphGamer>
            </div>
          ))}
        </Drawer.Body>
      </Drawer>
    </>
  );
};

export default BoardGame;