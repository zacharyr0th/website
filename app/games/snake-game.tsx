'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Link from 'next/link';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const pulseAnimation = keyframes`
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
`;

const GameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #121212;
  color: #f0f0f0;
  font-family: var(--font-family);
  padding: 2rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
  border-radius: 20px;
  overflow: hidden;
  background-color: inherit;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 2rem;
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-right: 2rem;
  justify-content: space-between;
`;

const TopLeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HomeLink = styled(Link)`
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all var(--transition-duration);
  background-color: var(--color-accent);
  color: white;
  text-decoration: none;
  align-self: flex-start;
  margin-top: auto;
  
  &:hover {
    background-color: transparent;
    color: var(--color-secondary);
  }
`;

const ScoreDisplay = styled.div`
  font-size: 1.5rem;
  color: var(--color-text-secondary);
`;

const HighScoreDisplay = styled.div`
  font-size: 1.2rem;
  color: var(--color-accent);
`;

const DifficultySelect = styled.select`
  margin-top: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  background-color: var(--color-background-secondary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
`;

const RulesSection = styled.div`
  background-color: rgba(26, 26, 26, 0.5);
  border-radius: 15px;
  padding: 1.5rem;
`;

const RulesTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: var(--color-text-secondary);
  text-align: center;
`;

const RulesList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const RuleItem = styled.li`
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  font-size: 1rem;

  &:before {
    content: '•';
    margin-right: 0.8rem;
    color: var(--color-accent);
    font-size: 1.4rem;
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const GameBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  grid-template-rows: repeat(20, 1fr);
  gap: 1px;
  background-color: rgba(26, 26, 26, 0.5);
  border: 2px solid var(--color-border);
  border-radius: 15px;
  aspect-ratio: 1 / 1;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

const Cell = styled.div<{ $isSnake: boolean; $isFood: boolean; $isHead: boolean; $color: string }>`
  aspect-ratio: 1 / 1;
  background-color: ${(props) =>
    props.$isSnake ? props.$color : props.$isFood ? 'var(--color-accent)' : 'transparent'};
  border-radius: 4px;
  transition: all 0.1s ease;
  ${(props) =>
    props.$isFood &&
    css`
      animation: ${pulseAnimation} 2s ease-in-out infinite;
    `}
`;

const GameOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const modalAnimation = keyframes`
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const GameOverModal = styled.div`
  background-color: #121212;
  padding: 3rem;
  border-radius: 15px;
  text-align: center;
  animation: ${modalAnimation} 0.3s ease-out;
  color: white;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--color-accent);
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: #d0d0d0;
  }
`;

const ScoreSection = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 2rem;

  p {
    margin: 0.5rem 0;
  }

  .new-high-score {
    color: #ffd700;
    font-weight: bold;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all var(--transition-duration);
  background-color: var(--color-accent);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &:hover {
    background-color: white;
    color: var(--color-accent);
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &.active {
    background-color: white;
    color: var(--color-accent);
  }

  &.active:hover {
    background-color: var(--color-accent);
    color: white;
  }
`;

function getRandomPastelColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 80%)`; // Increased saturation and lightness for pastel effect
}

export default function SnakeGame() {
  const [snake, setSnake] = useState(() => [{ x: 10, y: 10, color: getRandomPastelColor() }]);
  const [food, setFood] = useState(() => ({ x: 5, y: 5 }));
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameState, setGameState] = useState<'playing' | 'over' | 'won'>('playing');
  const [highScore, setHighScore] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const storedHighScore = localStorage.getItem('snakeHighScore');
    setHighScore(storedHighScore ? parseInt(storedHighScore, 10) : 0);
  }, []);

  const updateHighScore = useCallback((newScore: number) => {
    setHighScore(prevHighScore => {
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
    const handleKeyPress = (e: KeyboardEvent) => {
      const newDirection = {
        ArrowUp: 'UP',
        ArrowDown: 'DOWN',
        ArrowLeft: 'LEFT',
        ArrowRight: 'RIGHT',
      }[e.key] as Direction | undefined;

      if (newDirection) {
        setDirection((prev) => {
          const opposites: Record<Direction, Direction> = {
            UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT',
          };
          return opposites[prev] !== newDirection ? newDirection : prev;
        });
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    const gameInterval = setInterval(moveSnake, 200);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      clearInterval(gameInterval);
    };
  }, [moveSnake]);

  const resetGame = useCallback(() => {
    setGameState('playing');
    setSnake([{ x: 10, y: 10, color: getRandomPastelColor() }]);
    setDirection('RIGHT');
    setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
    setScore(0);
  }, []);

  const boardCells = useMemo(() => (
    Array(20).fill(0).map((_, y) =>
      Array(20).fill(0).map((_, x) => {
        const snakeSegment = snake.find((s) => s.x === x && s.y === y);
        const isSnake = !!snakeSegment;
        const isHead = snake[0].x === x && snake[0].y === y;
        return (
          <Cell
            key={`${x}-${y}`}
            $isSnake={isSnake}
            $isFood={food.x === x && food.y === y}
            $isHead={isHead}
            $color={snakeSegment ? snakeSegment.color : ''}
          />
        );
      })
    )
  ), [snake, food]);

  return (
    <GameContainer>
      <ContentWrapper>
        <header className="py-6 mb-8">
          <div className="container flex justify-between items-center">
            <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
            <nav className="navbar-links">
              <ul className="flex gap-4">
                <li>
                  <Link href="/" className="nav-link">
                    <span>Back to the Homepage</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <ContentContainer>
          <LeftSection>
            <TopLeftSection>
              <p>So here&apos;s a snake game.</p>
              <ScoreDisplay>Score: {score}</ScoreDisplay>
              <HighScoreDisplay>High Score: {highScore}</HighScoreDisplay>
            </TopLeftSection>
            <RulesSection>
              <RulesTitle>Game Rules</RulesTitle>
              <RulesList>
                <RuleItem>Use arrow keys to move the snake</RuleItem>
                <RuleItem>Eat food to grow longer</RuleItem>
                <RuleItem>
                  The game ends when you fill the entire board or collide with your own body
                </RuleItem>
              </RulesList>
            </RulesSection>
          </LeftSection>
          <RightSection>
            <GameBoard>{boardCells}</GameBoard>
          </RightSection>
        </ContentContainer>
      </ContentWrapper>

      {gameState !== 'playing' && (
        <GameOverlay>
          <GameOverModal>
            <h2>{gameState === 'won' ? 'Congratulations!' : 'Game Over'}</h2>
            <ScoreSection>
              <p>
                {gameState === 'won' 
                  ? 'You filled the entire board! Amazing job!' 
                  : `Your final score: ${score}`}
              </p>
              <p>
                {score > highScore 
                  ? <span className="new-high-score">New High Score: {score}!</span>
                  : `High Score: ${highScore}`}
              </p>
            </ScoreSection>
            <ButtonGroup>
              <Button onClick={resetGame} className="active">
                <span>Play Again</span>
              </Button>
              <Link href="/" passHref>
                <Button as="a">
                  <span>Back to Home</span>
                </Button>
              </Link>
            </ButtonGroup>
          </GameOverModal>
        </GameOverlay>
      )}
    </GameContainer>
  );
}