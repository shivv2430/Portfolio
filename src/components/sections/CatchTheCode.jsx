import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, RotateCcw, Trophy } from 'lucide-react';

const STACK_ITEMS = [
  { label: 'React', emoji: '⚛️' },
  { label: 'Node.js', emoji: '🟢' },
  { label: 'Python', emoji: '🐍' },
  { label: 'C++', emoji: '⚡' },
  { label: 'Tailwind', emoji: '💨' },
  { label: 'MongoDB', emoji: '🍃' },
  { label: 'Git', emoji: '🔀' },
  { label: 'Figma', emoji: '🎨' },
  { label: 'AWS', emoji: '☁️' },
  { label: 'Vite', emoji: '⚡' },
];

const BUG_ITEMS = [
  { label: 'Bug', emoji: '🐛' },
  { label: 'Crash', emoji: '💥' },
  { label: 'Error', emoji: '❌' },
  { label: '404', emoji: '🚫' },
];

const GAME_WIDTH = 360;
const GAME_HEIGHT = 420;
const PADDLE_W = 72;
const PADDLE_H = 16;
const ITEM_SIZE = 36;
const SPAWN_MS = 800;
const GAME_DURATION = 30; // seconds

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

export default function CatchTheCode() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const spawnRef = useRef(null);

  const [gameState, setGameState] = useState('idle'); // idle | playing | over
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [caught, setCaught] = useState([]);

  const stateRef = useRef({
    paddleX: GAME_WIDTH / 2 - PADDLE_W / 2,
    items: [],
    score: 0,
    caught: [],
    timeLeft: GAME_DURATION,
  });

  // Paddle movement — arrow keys / touch
  const keysRef = useRef({ left: false, right: false });

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft') keysRef.current.left = true;
    if (e.key === 'ArrowRight') keysRef.current.right = true;
  }, []);
  const handleKeyUp = useCallback((e) => {
    if (e.key === 'ArrowLeft') keysRef.current.left = false;
    if (e.key === 'ArrowRight') keysRef.current.right = false;
  }, []);

  const handlePointerMove = useCallback((e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX ?? e.touches?.[0]?.clientX) - rect.left;
    stateRef.current.paddleX = clamp(x - PADDLE_W / 2, 0, GAME_WIDTH - PADDLE_W);
  }, []);

  // Spawn items
  const spawnItem = useCallback(() => {
    const isBug = Math.random() < 0.25;
    const pool = isBug ? BUG_ITEMS : STACK_ITEMS;
    const chosen = pool[Math.floor(Math.random() * pool.length)];
    stateRef.current.items.push({
      ...chosen,
      isBug,
      x: Math.random() * (GAME_WIDTH - ITEM_SIZE),
      y: -ITEM_SIZE,
      speed: 2 + Math.random() * 2,
    });
  }, []);

  // Game loop
  const loop = useCallback(() => {
    const s = stateRef.current;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    // Clear
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Move paddle with keys
    if (keysRef.current.left) s.paddleX = clamp(s.paddleX - 6, 0, GAME_WIDTH - PADDLE_W);
    if (keysRef.current.right) s.paddleX = clamp(s.paddleX + 6, 0, GAME_WIDTH - PADDLE_W);

    // Draw paddle
    ctx.fillStyle = '#4a6cf7';
    ctx.beginPath();
    ctx.roundRect(s.paddleX, GAME_HEIGHT - PADDLE_H - 10, PADDLE_W, PADDLE_H, 8);
    ctx.fill();

    // Update & draw items
    const remaining = [];
    for (const item of s.items) {
      item.y += item.speed;

      // Check collision with paddle
      const hitX = item.x + ITEM_SIZE / 2 > s.paddleX && item.x + ITEM_SIZE / 2 < s.paddleX + PADDLE_W;
      const hitY = item.y + ITEM_SIZE > GAME_HEIGHT - PADDLE_H - 10 && item.y < GAME_HEIGHT - 10;

      if (hitX && hitY) {
        if (item.isBug) {
          s.score = Math.max(0, s.score - 5);
        } else {
          s.score += 10;
          if (!s.caught.includes(item.label)) s.caught.push(item.label);
        }
        setScore(s.score);
        setCaught([...s.caught]);
        continue; // consumed
      }

      // Off screen
      if (item.y > GAME_HEIGHT) continue;

      // Draw
      ctx.font = '24px system-ui';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(item.emoji, item.x + ITEM_SIZE / 2, item.y + ITEM_SIZE / 2);

      remaining.push(item);
    }
    s.items = remaining;

    rafRef.current = requestAnimationFrame(loop);
  }, []);

  // Start game
  const startGame = useCallback(() => {
    stateRef.current = {
      paddleX: GAME_WIDTH / 2 - PADDLE_W / 2,
      items: [],
      score: 0,
      caught: [],
      timeLeft: GAME_DURATION,
    };
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setCaught([]);
    setGameState('playing');
  }, []);

  // Playing lifecycle
  useEffect(() => {
    if (gameState !== 'playing') return;

    // Key listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Start loop
    rafRef.current = requestAnimationFrame(loop);

    // Spawn timer
    spawnRef.current = setInterval(spawnItem, SPAWN_MS);

    // Countdown
    const ticker = setInterval(() => {
      stateRef.current.timeLeft -= 1;
      setTimeLeft(stateRef.current.timeLeft);
      if (stateRef.current.timeLeft <= 0) {
        setGameState('over');
      }
    }, 1000);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(rafRef.current);
      clearInterval(spawnRef.current);
      clearInterval(ticker);
    };
  }, [gameState, handleKeyDown, handleKeyUp, loop, spawnItem]);

  return (
    <section
      ref={sectionRef}
      id="catch-the-code"
      className="section-padding"
      aria-labelledby="catch-heading"
    >
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="text-sm font-mono font-medium text-brand-500 tracking-widest uppercase">Interactive</span>
          <h2 id="catch-heading" className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mt-2">
            Catch the Code
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Catch my stack. Dodge the bugs. Use the arrow keys or drag.
          </p>
        </motion.div>

        <div className="flex flex-col items-center">
          {/* Game HUD */}
          <div className="flex items-center justify-between w-full max-w-[360px] mb-3 px-1">
            <span className="text-sm font-mono font-semibold text-brand-500">
              Score: {score}
            </span>
            <span className={`text-sm font-mono font-semibold ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-gray-500 dark:text-gray-400'}`}>
              {gameState === 'playing' ? `⏱ ${timeLeft}s` : `${GAME_DURATION}s`}
            </span>
          </div>

          {/* Canvas */}
          <div
            className="relative rounded-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
            style={{ width: GAME_WIDTH, height: GAME_HEIGHT, touchAction: 'none' }}
            onPointerMove={gameState === 'playing' ? handlePointerMove : undefined}
            onTouchMove={gameState === 'playing' ? (e) => {
              e.preventDefault();
              handlePointerMove(e);
            } : undefined}
          >
            <canvas
              ref={canvasRef}
              width={GAME_WIDTH}
              height={GAME_HEIGHT}
              className="block"
              aria-label="Catch the Code game canvas"
            />

            {/* Overlay: idle / over */}
            {gameState !== 'playing' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                {gameState === 'over' ? (
                  <>
                    <Trophy className="w-10 h-10 text-yellow-500 mb-3" aria-hidden="true" />
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      Game Over!
                    </p>
                    <p className="text-lg font-mono text-brand-500 font-semibold mb-1">
                      Score: {score}
                    </p>
                    {caught.length > 0 && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                        You caught: {caught.join(', ')}
                      </p>
                    )}
                    <button
                      onClick={startGame}
                      className="flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl shadow-lg transition-all"
                    >
                      <RotateCcw className="w-4 h-4" aria-hidden="true" />
                      Play Again
                    </button>
                  </>
                ) : (
                  <>
                    <span className="text-4xl mb-3" aria-hidden="true">🎮</span>
                    <p className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      Ready to play?
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 max-w-[240px] text-center">
                      Catch tech stack items (+10) &amp; dodge bugs (−5) in {GAME_DURATION} seconds!
                    </p>
                    <button
                      onClick={startGame}
                      className="flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl shadow-lg transition-all"
                    >
                      <Play className="w-4 h-4" aria-hidden="true" />
                      Start Game
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 font-mono">
            ← → arrow keys &nbsp;|&nbsp; mouse / touch to move the paddle
          </p>
        </div>
      </div>
    </section>
  );
}
