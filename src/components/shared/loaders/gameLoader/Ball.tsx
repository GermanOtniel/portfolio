import React, { useEffect, useRef } from 'react';
import { Bodies, Body, World, Composite, Events, IEventCollision, Engine } from 'matter-js';

interface BallProps {
  engine: Engine;
}

const Ball: React.FC<BallProps> = ({ engine }) => {
  const ballRef = useRef<Body | null>(null);

  useEffect(() => {
    const ball = Bodies.circle(40, 30, (window.innerWidth < 600 ? 10 : 20), { restitution: 0.8 });
    ballRef.current = ball;
    World.add(engine.world, ball);

    // Set initial velocity
    Body.setVelocity(ball, { x: 5, y: -5 });

    const handleCollision = (event: IEventCollision<Engine>) => {
      const pairs = event.pairs;

      pairs.forEach(pair => {
        const { bodyA, bodyB } = pair;

        if (bodyA === ball || bodyB === ball) {
          const velocity = ball.velocity;
          if (velocity.y > 25) {
            velocity.y = velocity.y - (velocity.y / 3);
          } 

          // Check if collision is with paddle
          if (bodyA.label === 'paddle' || bodyB.label === 'paddle') {
            // Invert the y velocity and slightly increase speed
            Body.setVelocity(ball, { x: velocity.x, y: -velocity.y * (window.innerWidth < 600 ? 1.20 : 1.40) });
          } else {
            // Invert the x or y velocity depending on the wall hit
            if (bodyA.isStatic || bodyB.isStatic) {
              // Check which wall was hit
              if (bodyA === ball) {
                if (ball.position.x <= 20 || ball.position.x >= 780) {
                  Body.setVelocity(ball, { x: -velocity.x * 1.05, y: velocity.y });
                } else {
                  Body.setVelocity(ball, { x: velocity.x, y: -velocity.y * 1.05 });
                }
              }
              if (bodyB === ball) {
                if (ball.position.x <= 20 || ball.position.x >= 780) {
                  Body.setVelocity(ball, { x: -velocity.x * 1.05, y: velocity.y });
                } else {
                  Body.setVelocity(ball, { x: velocity.x, y: -velocity.y * 1.05 });
                }
              }
            }
          }
        }
      });
    };

    Events.on(engine, 'collisionStart', handleCollision);

    return () => {
      if (ballRef.current) {
        Composite.remove(engine.world, ballRef.current);
      }
      Events.off(engine, 'collisionStart', handleCollision);
    };
  }, [engine]);

  return null;
};

export default Ball;
