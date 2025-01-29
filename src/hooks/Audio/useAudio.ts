import React, { useEffect, useRef, useState } from 'react';

export function useAudio(source: string): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  const [isPlaying, setIsPlaying] = useState(true);

  const audio = useRef(new Audio(source))

  useEffect(() => {
    console.log('tes sound')
    if (isPlaying) {
      audio.current.play()
        .then(() => {
          return;
        })
        .catch((err) => {
          setIsPlaying(!isPlaying);
          throw err;
        });
    }
    audio.current.pause();
  }, [audio, isPlaying]);

  return [isPlaying, setIsPlaying];
}
