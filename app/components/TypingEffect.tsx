// TypingEffect.tsx
import { marked } from 'marked';
import { useState, useEffect } from 'react';

interface TypingEffectProps {
  text: string;
  speed?: number;
  isClicked: number;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text, speed = 5, isClicked}) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    setDisplayedText("");
  }, [isClicked])

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index += 1;
      if (index === text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span dangerouslySetInnerHTML={{ __html: marked(displayedText) }} />;
};

export default TypingEffect;
