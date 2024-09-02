'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Link from 'next/link';
import styles from './snake-game.module.css';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

function getRandomPastelColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 80%)`;
}

export default function SnakeGame() {
  const [snake, setSnake] = useState(() => [{ x: 10, y: 10, color: getRandomPastelColor() }]);
  const [food, setFood] = useState(() => ({ x: 5, y: 5 }));
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameState, setGameState] = useState<'playing' | 'over' | 'won'>('playing');
  const [highScore, setHighScore] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const gameContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedHighScore = localStorage.getItem('snakeHighScore');
    setHighScore(storedHighScore ? parseInt(storedHighScore, 10) : 0);
  }, []);

  useEffect(() => {
    const currentGameContainer = gameContainerRef.current;
    if (currentGameContainer) {
      currentGameContainer.focus();
    }

    return () => {
      if (currentGameContainer) {
        currentGameContainer.blur();
      }
    };
  }, []);

  const updateHighScore = useCallback((newScore: number) => {
    setHighScore((prevHighScore) => {
      if (newScore > prevHighScore) {
        localStorage.setItem('snakeHighScore', newScore.toString());
        return newScore;
      }
      return prevHighScore;
    });
  }, []);

  const moveSnake = useCallback(() => {
    if (gameState !== 'playing') return;
    setSnake((prevSnake) => {
      const newSnake = [...prevSnake];
      const head = { ...newSnake[0], color: getRandomPastelColor() };

      const newHead = {
        x: (head.x + (direction === 'RIGHT' ? 1 : direction === 'LEFT' ? -1 : 0) + 20) % 20,
        y: (head.y + (direction === 'DOWN' ? 1 : direction === 'UP' ? -1 : 0) + 20) % 20,
        color: head.color,
      };

      if (newSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameState('over');
        return prevSnake;
      }

      if (newHead.x === food.x && newHead.y === food.y) {
        newSnake.unshift(newHead);
        setScore(newSnake.length - 1);
        updateHighScore(newSnake.length - 1);
        if (newSnake.length === 400) {
          setGameState('won');
          return newSnake;
        }
        setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
      } else {
        newSnake.pop();
        newSnake.unshift(newHead);
      }
      return newSnake;
    });
  }, [direction, food, gameState, updateHighScore]);

  useEffect(() => {
    if (!gameStarted) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      const validKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
      if (validKeys.includes(e.key)) {
        e.preventDefault();
        const newDirection = {
          ArrowUp: 'UP',
          ArrowDown: 'DOWN',
          ArrowLeft: 'LEFT',
          ArrowRight: 'RIGHT',
        }[e.key] as Direction | undefined;

        if (newDirection) {
          setDirection((prev) => {
            const opposites: Record<Direction, Direction> = {
              UP: 'DOWN',
              DOWN: 'UP',
              LEFT: 'RIGHT',
              RIGHT: 'LEFT',
            };
            return opposites[prev] !== newDirection ? newDirection : prev;
          });
        }
      }
    };

    const preventScroll = (e: WheelEvent) => {
      e.preventDefault();
    };

    const currentGameContainer = gameContainerRef.current;

    if (!isPaused) {
      document.addEventListener('keydown', handleKeyPress);
      currentGameContainer?.addEventListener('wheel', preventScroll, { passive: false });
    }

    const gameInterval = setInterval(() => {
      if (!isPaused) {
        moveSnake();
      }
    }, 200);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      currentGameContainer?.removeEventListener('wheel', preventScroll);
      clearInterval(gameInterval);
    };
  }, [moveSnake, gameStarted, isPaused]);

  const togglePause = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPaused(prev => !prev);
  }, []);

  const handleContainerClick = useCallback(() => {
    if (gameStarted && gameState === 'playing') {
      setIsPaused(true);
    }
  }, [gameStarted, gameState]);

  const startGame = useCallback(() => {
    if (gameState === 'playing' && !gameStarted) {
      setGameStarted(true);
      setIsPaused(false);
    }
  }, [gameState, gameStarted]);

  const resetGame = useCallback(() => {
    setGameState('playing');
    setSnake([{ x: 10, y: 10, color: getRandomPastelColor() }]);
    setDirection('RIGHT');
    setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
    setScore(0);
    setGameStarted(false);
  }, []);

  const boardCells = useMemo(
    () =>
      Array(20)
        .fill(0)
        .map((_, y) =>
          Array(20)
            .fill(0)
            .map((_, x) => {
              const snakeSegment = snake.find((s) => s.x === x && s.y === y);
              const isSnake = !!snakeSegment;
              const isHead = snake[0].x === x && snake[0].y === y;
              return (
                <div
                  key={`${x}-${y}`}
                  className={`${styles.cell} ${isSnake ? styles.snake : ''} ${isHead ? styles.head : ''} ${food.x === x && food.y === y ? styles.food : ''}`}
                  style={{ backgroundColor: snakeSegment ? snakeSegment.color : '' }}
                />
              );
            })
        ),
    [snake, food]
  );

  return (
    <div className={styles.gameContainer} ref={gameContainerRef} onClick={handleContainerClick}>
      <div className={styles.contentWrapper}>
        <header className={styles.header}>
          <h1 className={styles.title}>404 - Page Not Found</h1>
        </header>
        <div className={styles.contentContainer}>
          <div className={styles.leftSection}>
            <div>
              <h2 className={styles.subtitle}>So here&apos;s a Snake Game!</h2>
              <div className={styles.scoreDisplay}>Score: {score}</div>
              <div className={styles.highScoreDisplay}>High Score: {highScore}</div>
            </div>
            <div className={styles.rulesSection}>
              <h2 className={styles.rulesTitle}>Game Rules</h2>
              <ul className={styles.rulesList}>
                <li className="mb-1">Use arrow keys to move the snake</li>
                <li className="mb-1">Eat food to grow longer</li>
                <li className="mb-1">Avoid colliding with walls or yourself</li>
                <li className="mb-1">Fill the entire board to win!</li>
                <li className="mb-1">Click outside the game board to pause</li>
              </ul>
            </div>
          </div>
          <div className={styles.rightSection}>
            <div className={styles.gameBoard} onClick={(e) => {
              e.stopPropagation();
              startGame();
            }}>
              {boardCells}
              {!gameStarted && gameState === 'playing' && (
                <div className={styles.startOverlay}>
                  <button className={styles.overlayButton} onClick={(e) => {
                    e.stopPropagation();
                    startGame();
                  }}>Click to Start</button>
                </div>
              )}
              {isPaused && (
                <div className={styles.pauseOverlay} onClick={togglePause}>
                  <button className={styles.overlayButton} onClick={togglePause}>Resume Game</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {gameState !== 'playing' && (
        <div className={styles.gameOverlay}>
          <div className={styles.gameOverModal}>
            <h2>{gameState === 'won' ? 'Congratulations!' : 'Game Over'}</h2>
            <div className={styles.scoreSection}>
              <p>
                {gameState === 'won'
                  ? 'You filled the entire board! Amazing job!'
                  : `Your final score: ${score}`}
              </p>
              <p>
                {score > highScore ? (
                  <span className={styles.newHighScore}>New High Score: {score}!</span>
                ) : (
                  `High Score: ${highScore}`
                )}
              </p>
            </div>
            <div className={styles.buttonGroup}>
              <button onClick={resetGame} className={`${styles.button} ${styles.active}`}>
                <span>Play Again</span>
              </button>
              <Link href="/" passHref>
                <a className={styles.button}>
                  <span>Back to Home</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
