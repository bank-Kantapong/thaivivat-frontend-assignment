import { useState, useRef } from "react";

const CLICK_DELAY = 300;

export const useDoubleClick = () => {
  const [likeId, setLikeId] = useState<number | null>(null);
  const lastClickTime = useRef<number>(0);

  const handleDoubleTap = (id: number) => {
    const now = Date.now();
    if (now - lastClickTime.current < CLICK_DELAY) {
      setLikeId(id);
      setTimeout(() => {
        setLikeId(null);
      }, 600);
    }
    lastClickTime.current = now;
  };

  return { likeId, handleDoubleTap };
};
