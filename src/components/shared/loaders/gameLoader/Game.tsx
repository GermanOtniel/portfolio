import React, { useEffect, useRef, useState } from 'react';
import { Engine, Render, World, Bodies, Body, Composite } from 'matter-js';
import Ball from './Ball';
import Paddle from './Paddle';

const Game: React.FC = () => {
  const scene = useRef<HTMLDivElement>(null);
  const engine = useRef(Engine.create());
  const [paddle, setPaddle] = useState<Body | null>(null);

  useEffect(() => {
    const width = window.innerWidth;

    const render = Render.create({
      element: scene.current!,
      engine: engine.current,
      options: {
        width: width,
        height: 600,
        wireframes: false,
      },
    });

    Render.run(render);
    Engine.run(engine.current);

    const ground = Bodies.rectangle(width - (width / 2), 610, width + 10, 60, { isStatic: true });
    const leftWall = Bodies.rectangle(10, 300, 60, 600, { isStatic: true });
    const rightWall = Bodies.rectangle(width - 10, 300, 60, 600, { isStatic: true });
    const topWall = Bodies.rectangle(width - (width / 2), -10, width + 10, 60, { isStatic: true });

    World.add(engine.current.world, [ground, leftWall, rightWall, topWall]);

    return () => {
      Render.stop(render);
      Composite.clear(engine.current.world, false);
      // eslint-disable-next-line
      Engine.clear(engine.current);
    };
  }, []);

  const handleMouseMove = (event: MouseEvent) => {
    let { clientX, clientY } = event;
    if (window.innerWidth < 600) {
      clientX = clientX - 10;
      clientY = clientY - 10;
    } else {
      clientX = clientX - 60;
      clientY = clientY - 60;
    }

    if (paddle) {
      Body.setPosition(paddle, { x: clientX, y: clientY });
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
    // eslint-disable-next-line
  }, [paddle]);

  return (
    <div>
      <div ref={scene} />
      <Ball engine={engine.current} />
      <Paddle engine={engine.current} x={window.innerWidth - (window.innerWidth / 2)} y={500} setPaddleRef={setPaddle} />
    </div>
  );
};

export default Game;
