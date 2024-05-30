import { useLayoutEffect, useState } from "react";
import { stepperItems } from "../Experience.Section";

export const useExperience = () => {
  const [step, setStep] = useState(0);
  const [vertical, setVertical] = useState(false);

  useLayoutEffect(() => {
    setVertical(window.innerWidth < 800);
    const handleResize = () => {
      setVertical(window.innerWidth < 800);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setVertical]);

  const onStep = (newStep: number) => {
    if (newStep >= 0 && newStep <= (stepperItems.length + 1)) {
      setStep(newStep);
    }
  };

  return {
    step,
    onStep,
    vertical,
  };
};