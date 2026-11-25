import { useEffect, useRef, useState } from 'react';

export default function useCountdown(endAt, onExpire) {
  const [left, setLeft] = useState(null);
  const callback = useRef(onExpire);
  callback.current = onExpire; 
  useEffect(() => {
    if (!endAt) return;
    let fired = false;

    const tick = () => {
      const s = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
      setLeft(s);
      if (s === 0 && !fired) {
        fired = true;
        callback.current();
      }
    };

    tick();
    const id = setInterval(tick, 500);
    return () => clearInterval(id);
  }, [endAt]);

  return left;
}