import React, { useEffect, useRef } from 'react';
import { Bodies, Body, World, Composite } from 'matter-js';

interface PaddleProps {
  engine: Matter.Engine;
  x: number;
  y: number;
  setPaddleRef: (ref: Body) => void;
}

const Paddle: React.FC<PaddleProps> = ({ engine, x, y, setPaddleRef }) => {
  const paddleRef = useRef<Body | null>(null);

  useEffect(() => {
    const paddle = Bodies.rectangle(x, y, 100, 20, { isStatic: true, label: 'paddle' });
    paddleRef.current = paddle;
    setPaddleRef(paddle);
    World.add(engine.world, paddle);

    return () => {
      if (paddleRef.current) {
        Composite.remove(engine.world, paddleRef.current);
      }
    };
  }, [engine, x, y, setPaddleRef]);

  return null;
};

export default Paddle;
