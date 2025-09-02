import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Letter {
  id: string;
  char: string;
  x: number;
  y: number;
  delay: number;
  duration: number;
  blur: number;
  opacity: number;
  size: number;
}

export function FloatingLetters() {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  // Expanded editorial vocabulary for dynamic variety
  const editorialWords = [
    'EDITORIAL', 'STUDIO', 'NARRATIVE', 'STORY', 'DESIGN', 'CONTENT', 'WORDS', 'CRAFT',
    'MEANING', 'BEAUTY', 'LASTING', 'CREATIVE', 'WRITING', 'PUBLISH', 'AUTHOR', 'TEXT',
    'BOOK', 'MAGAZINE', 'JOURNAL', 'ARTICLE', 'PROSE', 'POETRY', 'VOICE', 'STYLE',
    'EDIT', 'DRAFT', 'REVIEW', 'POLISH', 'REFINE', 'CLARITY', 'FLOW', 'RHYTHM',
    'CHARACTER', 'PLOT', 'THEME', 'DIALOGUE', 'SCENE', 'CHAPTER', 'PARAGRAPH', 'SENTENCE',
    'LANGUAGE', 'GRAMMAR', 'SYNTAX', 'METAPHOR', 'IMAGERY', 'TONE', 'MOOD', 'EMOTION'
  ];
  
  // Creative and abstract words
  const creativeWords = [
    'INSPIRE', 'CREATE', 'IMAGINE', 'DREAM', 'VISION', 'IDEA', 'CONCEPT', 'THOUGHT',
    'MIND', 'SOUL', 'HEART', 'SPIRIT', 'PASSION', 'LOVE', 'HOPE', 'FAITH',
    'TRUTH', 'WISDOM', 'KNOWLEDGE', 'LEARN', 'DISCOVER', 'EXPLORE', 'JOURNEY', 'PATH'
  ];
  
  // Combine all vocabulary
  const allWords = [...editorialWords, ...creativeWords];
  
  // Create character pool with weighted distribution
  const createCharacterPool = () => {
    const chars = [];
    
    // Select random subset of words each time for variety
    const selectedWords = allWords
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 15) + 10); // 10-25 words per generation
    
    // Add letters from selected vocabulary
    selectedWords.forEach(word => {
      chars.push(...word.split(''));
    });
    
    // Add some additional common letters for balance
    const commonLetters = ['A', 'E', 'I', 'O', 'U', 'N', 'R', 'S', 'T', 'L', 'M', 'D', 'H'];
    commonLetters.forEach(letter => {
      // Add each common letter randomly for natural distribution
      for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
        chars.push(letter);
      }
    });
    
    return chars;
  };

  useEffect(() => {
    // Start effect immediately for debugging
    const startTimer = setTimeout(() => {
      setIsVisible(true);
      generateLetters();
      console.log('FloatingLetters: Effect started'); // Debug log
    }, 500); // Much shorter delay to see effect quickly

    return () => clearTimeout(startTimer);
  }, []);

  const generateLetters = () => {
    const newLetters: Letter[] = [];
    
    // Refresh character pool for variety each generation
    const freshCharacterPool = createCharacterPool();
    
    // Generate 12-18 letters for better visibility
    for (let i = 0; i < Math.floor(Math.random() * 7) + 12; i++) {
      const char = freshCharacterPool[Math.floor(Math.random() * freshCharacterPool.length)];
      
      newLetters.push({
        id: `letter-${i}-${Date.now()}`,
        char,
        x: Math.random() * 100, // Random horizontal position (%)
        y: Math.random() * 100, // Random vertical position (%)
        delay: Math.random() * 1.5, // Faster stagger for quicker appearance
        duration: 10 + Math.random() * 8, // 10-18 seconds float time (faster for more activity)
        blur: 0.2 + Math.random() * 0.8, // 0.2-1px blur (less blur for better visibility)
        opacity: 0.15 + Math.random() * 0.20, // Higher opacity 0.15-0.35 for better visibility
        size: 0.7 + Math.random() * 0.4, // 0.7-1.1 relative size (smaller for global)
      });
    }
    
    setLetters(newLetters);
    console.log(`FloatingLetters: Generated ${newLetters.length} letters:`, newLetters.map(l => l.char).join(' ')); // Debug log
    
    // Regenerate more frequently for continuous effect
    setTimeout(() => {
      if (isVisible) generateLetters();
    }, 8000 + Math.random() * 6000); // 8-14 seconds
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <AnimatePresence>
        {isVisible && letters.map((letter) => (
          <motion.div
            key={letter.id}
            className="absolute font-serif select-none floating-particle"
            style={{
              left: `${letter.x}%`,
              top: `${letter.y}%`,
              fontSize: `${14 * letter.size}px`, // Larger for better visibility
              filter: `blur(${letter.blur}px)`,
              color: 'var(--floating-letter-secondary)', // Use CSS variable for theme support
            }}
            initial={{ 
              opacity: 0,
              scale: 0.2,
              y: 30,
            }}
            animate={{ 
              opacity: letter.opacity,
              scale: letter.size,
              y: [30, -40, 15, -50, 5, -25],
              x: [0, 15, -8, 12, -5, 8],
              rotate: [0, 3, -2, 4, -3, 1],
            }}
            transition={{
              duration: letter.duration,
              delay: letter.delay,
              ease: "easeInOut",
              y: {
                duration: letter.duration,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              },
              x: {
                duration: letter.duration * 0.8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
              rotate: {
                duration: letter.duration * 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
              opacity: {
                duration: 2,
                ease: "easeInOut",
              },
              scale: {
                duration: 1.5,
                ease: "easeOut",
              }
            }}
            exit={{ 
              opacity: 0,
              scale: 0.1,
              transition: { duration: 1.5 }
            }}
          >
            {letter.char}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}