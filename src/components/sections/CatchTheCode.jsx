import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Trophy, Heart } from 'lucide-react';

const TECH_WORDS = [
  { text: 'React', color: '#61dafb' },
  { text: 'C++', color: '#00599c' },
  { text: 'JS', color: '#f7df1e' },
  { text: 'Git', color: '#f05032' },
  { text: 'AWS', color: '#ff9900' },
  { text: 'HTML', color: '#e34f26' },
];

const GAME_WIDTH = 380;
const GAME_HEIGHT = 440;
const PADDLE_W = 76;
const PADDLE_H = 14;

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

export default function CatchTheCode() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const spawnRef = useRef(null);

  const [gameState, setGameState] = useState('idle'); // idle | playing | over
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [bestScore, setBestScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('catch_code_best') || '0', 10);
    } catch {
      return 0;
    }
  });

  const stateRef = useRef({
    paddleX: GAME_WIDTH / 2 - PADDLE_W / 2,
    items: [],
    score: 0,
    lives: 3,
    bestScore: 0,
  });

  // Track key presses: Left/Right and A/D
  const keysRef = useRef({ left: false, right: false });

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
      keysRef.current.left = true;
    }
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
      keysRef.current.right = true;
    }
  }, []);

  const handleKeyUp = useCallback((e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
      keysRef.current.left = false;
    }
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
      keysRef.current.right = false;
    }
  }, []);

  // Touch / pointer drag
  const handlePointerMove = useCallback((e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    if (clientX === undefined) return;
    const relativeX = clientX - rect.left;
    stateRef.current.paddleX = clamp(relativeX - PADDLE_W / 2, 0, GAME_WIDTH - PADDLE_W);
  }, []);

  // Spawn item (either a Tech Word or a Bug)
  const spawnItem = useCallback(() => {
    const isBug = Math.random() < 0.28;
    const wordObj = TECH_WORDS[Math.floor(Math.random() * TECH_WORDS.length)];
    
    // Speed increases with score
    const speedMultiplier = 1 + Math.min(2.2, stateRef.current.score / 120);
    const baseSpeed = isBug ? 2.8 : 2.2;

    stateRef.current.items.push({
      text: isBug ? '🐛 BUG' : wordObj.text,
      isBug,
      color: isBug ? '#ef4444' : wordObj.color,
      x: 20 + Math.random() * (GAME_WIDTH - 80),
      y: -24,
      speed: (baseSpeed + Math.random() * 1.2) * speedMultiplier,
      w: isBug ? 52 : 46,
      h: 22,
    });
  }, []);

  // Game loop
  const loop = useCallback(() => {
    const s = stateRef.current;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Subtle background grid
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < GAME_WIDTH; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, GAME_HEIGHT);
      ctx.stroke();
    }

    // Move paddle with keys
    if (keysRef.current.left) s.paddleX = clamp(s.paddleX - 6.5, 0, GAME_WIDTH - PADDLE_W);
    if (keysRef.current.right) s.paddleX = clamp(s.paddleX + 6.5, 0, GAME_WIDTH - PADDLE_W);

    // Draw paddle
    const paddleY = GAME_HEIGHT - PADDLE_H - 12;
    const gradient = ctx.createLinearGradient(s.paddleX, 0, s.paddleX + PADDLE_W, 0);
    gradient.addColorStop(0, '#c084fc');
    gradient.addColorStop(0.5, '#a855f7');
    gradient.addColorStop(1, '#fbbf24');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.roundRect(s.paddleX, paddleY, PADDLE_W, PADDLE_H, 6);
    ctx.fill();

    // Glow for paddle
    ctx.shadowColor = '#a855f7';
    ctx.shadowBlur = 8;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Update and draw items
    const nextItems = [];
    for (const item of s.items) {
      item.y += item.speed;

      // Hit test with paddle
      const collidesX = item.x + item.w > s.paddleX && item.x < s.paddleX + PADDLE_W;
      const collidesY = item.y + item.h >= paddleY && item.y <= paddleY + PADDLE_H;

      if (collidesX && collidesY) {
        if (item.isBug) {
          s.lives -= 1;
          setLives(s.lives);
          if (s.lives <= 0) {
            setGameState('over');
            return;
          }
        } else {
          s.score += 10;
          setScore(s.score);
          if (s.score > s.bestScore) {
            s.bestScore = s.score;
            setBestScore(s.score);
            try {
              localStorage.setItem('catch_code_best', String(s.score));
            } catch {}
          }
        }
        continue; // Consumed
      }

      // Check boundary bottom
      if (item.y > GAME_HEIGHT) {
        continue;
      }

      // Draw item capsule
      ctx.fillStyle = item.isBug ? 'rgba(239, 68, 68, 0.2)' : 'rgba(168, 85, 247, 0.2)';
      ctx.strokeStyle = item.color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(item.x, item.y, item.w, item.h, 6);
      ctx.fill();
      ctx.stroke();

      // Text inside capsule
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(item.text, item.x + item.w / 2, item.y + item.h / 2);

      nextItems.push(item);
    }
    s.items = nextItems;

    rafRef.current = requestAnimationFrame(loop);
  }, []);

  const startGame = useCallback(() => {
    stateRef.current = {
      paddleX: GAME_WIDTH / 2 - PADDLE_W / 2,
      items: [],
      score: 0,
      lives: 3,
      bestScore: bestScore,
    };
    setScore(0);
    setLives(3);
    setGameState('playing');
  }, [bestScore]);

  // Handle active game session
  useEffect(() => {
    if (gameState !== 'playing') return;

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    rafRef.current = requestAnimationFrame(loop);
    spawnRef.current = setInterval(spawnItem, 750);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(rafRef.current);
      clearInterval(spawnRef.current);
    };
  }, [gameState, handleKeyDown, handleKeyUp, loop, spawnItem]);

  return (
    <section
      id="play"
      className="section-padding bg-purple-50/20 dark:bg-cinematic-900/40 relative"
      aria-labelledby="play-heading"
    >
      <div className="container-max">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-mono font-semibold text-gold-500 tracking-widest uppercase">
            Mini Game
          </span>
          <h2
            id="play-heading"
            className="text-4xl sm:text-5xl font-serif text-gray-900 dark:text-white mt-1 mb-2"
          >
            Catch the Code
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-sans">
            Catch my stack words for +10 points. Dodge the bugs. You have 3 lives.
          </p>
        </div>

        <div className="flex flex-col items-center">
          {/* Game HUD */}
          <div className="flex items-center justify-between w-full max-w-[380px] mb-3 px-2 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-red-500">
              {[...Array(3)].map((_, i) => (
                <Heart
                  key={i}
                  className={`w-4 h-4 ${
                    i < lives ? 'fill-red-500 text-red-500' : 'text-gray-400 opacity-40'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-purple-600 dark:text-purple-300 font-bold">
                Score: {score}
              </span>
              <span className="text-gold-500 font-bold">
                Best: {bestScore}
              </span>
            </div>
          </div>

          {/* Game Canvas Container */}
          <div
            className="relative rounded-3xl border-2 border-purple-300/60 dark:border-purple-800/60 overflow-hidden bg-white dark:bg-cinematic-950 shadow-2xl"
            style={{ width: GAME_WIDTH, height: GAME_HEIGHT, touchAction: 'none' }}
            onPointerMove={gameState === 'playing' ? handlePointerMove : undefined}
          >
            <canvas
              ref={canvasRef}
              width={GAME_WIDTH}
              height={GAME_HEIGHT}
              className="block w-full h-full"
              aria-label="Catch the Code game area"
            />

            {/* Overlays */}
            {gameState !== 'playing' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-white/90 dark:bg-cinematic-950/90 backdrop-blur-md text-center">
                {gameState === 'over' ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center"
                  >
                    <Trophy className="w-12 h-12 text-gold-400 mb-2 animate-bounce" />
                    <h3 className="text-3xl font-serif text-gray-900 dark:text-white mb-1">
                      Game Over!
                    </h3>
                    <p className="text-sm font-mono text-purple-600 dark:text-purple-300 mb-1">
                      Final Score: {score}
                    </p>
                    <p className="text-xs font-mono text-gold-500 mb-5">
                      All-time Best: {bestScore}
                    </p>
                    <button
                      onClick={startGame}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-purple-700 hover:from-brand-500 hover:to-purple-600 text-white font-medium text-sm transition-all shadow-lg shadow-purple-900/30"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Play Again
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center"
                  >
                    <span className="text-4xl mb-3" aria-hidden="true">🎮</span>
                    <h3 className="text-3xl font-serif text-gray-900 dark:text-white mb-1">
                      Ready to Play?
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 max-w-[260px] leading-relaxed mb-6 font-sans">
                      Catch React, C++, JS, Git, AWS, HTML with your paddle. Avoid the bugs.
                    </p>
                    <button
                      onClick={startGame}
                      className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-purple-700 hover:from-brand-500 hover:to-purple-600 text-white font-medium text-sm transition-all shadow-lg shadow-purple-900/30"
                    >
                      <Play className="w-4 h-4" />
                      Start Game
                    </button>
                  </motion.div>
                )}
              </div>
            )}
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 font-mono">
            Controls: Left / Right arrows or A / D keys &bull; Drag on mobile
          </p>
        </div>
      </div>
    </section>
  );
}
