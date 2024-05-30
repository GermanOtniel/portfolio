import { useCallback, useEffect, useMemo, useState } from "react";

interface IUseTimerParams {
  seconds: number;
};

export const useTimer = ({ seconds, }: IUseTimerParams) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [isActive, setIsActive] = useState(false);

  const startTimer = useCallback(() => {
    setTimeLeft(prevTime => prevTime - 1);
    setIsActive(true);
  }, []);

  const timerId = useMemo(() => {
    if (!isActive) return null;

    return setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
  }, [isActive, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && isActive) {
      clearInterval(timerId!);
      setIsActive(false);
      setTimeLeft(seconds);
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [timeLeft, isActive, timerId, seconds]);

  useEffect(() => {
    setTimeLeft(seconds);
    setIsActive(false);
  }, [seconds]);

  return {
    timeLeft,
    startTimer,
    isActive,
  };
};