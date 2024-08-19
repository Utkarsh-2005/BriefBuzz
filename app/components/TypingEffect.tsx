import { marked } from 'marked';
import { useState, useEffect } from 'react';

interface TypingEffectProps {
  text: string;
  speed?: number;
  isClicked: number;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text, speed = 50, isClicked }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
  }, [isClicked]);

  useEffect(() => {
    const words = text.split(' '); // Split the text into words
    let index = 0;
    
    const interval = setInterval(() => {
      if (index < words.length) {
        setDisplayedText((prev) => prev + (index > 0 ? ' ' : '') + words[index]);
        index += 1;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span dangerouslySetInnerHTML={{ __html: marked(displayedText) }} />;
};

export default TypingEffect;
