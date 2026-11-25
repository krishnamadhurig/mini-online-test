import { formatTime } from '../utils/formatTime';

export default function Timer({ seconds }) {
  const low = seconds !== null && seconds <= 60;
  return (
    <span className={'timer' + (low ? ' low' : '')} role="timer" aria-label="Time left">
      {formatTime(seconds)}
    </span>
  );
}