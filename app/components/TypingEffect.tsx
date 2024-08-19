import { marked } from 'marked';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface TypingEffectProps {
  text: string;
  speed?: number;
  isClicked: number;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text = '', speed = 50, isClicked }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setTypingComplete(false);
  }, [isClicked]);

  useEffect(() => {
    if (!text) {
      console.error("The 'text' prop is undefined or empty.");
      return;
    }
    
    const words = text.split(' ').filter(word => word.trim() !== ''); // Ensure valid words
    let index = 0;

    const interval = setInterval(() => {
      if (index < words.length-1) {
        setDisplayedText((prev) => prev + (index > 0 ? ' ' : '') + words[index]);
        index += 1;
      } else {
        clearInterval(interval);
        setTypingComplete(true); // Mark typing as complete
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap' }}>
      <span dangerouslySetInnerHTML={{ __html: marked(displayedText) }} />
      {!typingComplete && (
        <Image
          src="/circle.png"
          alt="circle"
          width={20}
          height={20}
          style={{ display: 'inline-block', verticalAlign: 'middle' }}
        />
      )}
    </div>
  );
};

export default TypingEffect;
