import ringtone from "../assets/audio/ringtone.mp3";
/**
 *
 * @param date
 * @param onRing
 * @returns unregister function
 */
export function registerAlarm(date: Date, onRing: () => void): () => void {
  const now = new Date();
  const timeout = date.getTime() - now.getTime();
  if (timeout < 0) {
    return () => {};
  }
  const id = setTimeout(() => {
    onRing();
  }, timeout);
  return () => {
    clearTimeout(id);
  };
}

/**
 * @returns stop function
 */
export function ring(): () => void {
  const audio = new Audio(ringtone);
  audio.loop = true;
  audio.play();

  const interval = setInterval(() => {
    navigator?.vibrate?.([500, 500]);
  }, 1000);

  return () => {
    audio.pause();
    clearInterval(interval);
  };
}
