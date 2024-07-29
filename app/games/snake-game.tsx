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

const Header = styled.div`
  padding: 1.5rem 2rem;
  background-color: rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
  color: var(--color-text-secondary);
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

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #f0f0f0;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: #d0d0d0;
  }
`;

const Button = styled.button`
  background-color: var(--color-accent);
  color: var(--color-text-primary);
  border: none;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all var(--transition-duration);
  margin: 0 0.5rem;

  &:hover {
    background-color: var(--color-accent-hover);
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
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    const savedHighScore = localStorage.getItem('snakeHighScore');
    return savedHighScore ? parseInt(savedHighScore, 10) : 0;
  });
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState('medium');

  const updateHighScore = useCallback((newScore: number) => {
    if (newScore > highScore) {
      setHighScore(newScore);
      localStorage.setItem('snakeHighScore', newScore.toString());
    }
  }, [highScore]);

  const moveSnake = useCallback(() => {
    if (gameOver || gameWon) return;
    setSnake((prevSnake) => {
      const newSnake = [...prevSnake];
      const head = { ...newSnake[0], color: getRandomPastelColor() };

      switch (direction) {
        case 'UP':
          head.y = (head.y - 1 + 20) % 20;
          break;
        case 'DOWN':
          head.y = (head.y + 1) % 20;
          break;
        case 'LEFT':
          head.x = (head.x - 1 + 20) % 20;
          break;
        case 'RIGHT':
          head.x = (head.x + 1) % 20;
          break;
      }

      if (newSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        return prevSnake;
      }

      if (head.x === food.x && head.y === food.y) {
        newSnake.unshift(head);
        updateHighScore(newSnake.length - 1); 
        if (newSnake.length === 400) {
          setGameWon(true);
          return newSnake;
        }
        setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
      } else {
        newSnake.pop();
        newSnake.unshift(head);
      }
      return newSnake;
    });
  }, [direction, food, gameOver, gameWon, updateHighScore]);

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
            UP: 'DOWN',
            DOWN: 'UP',
            LEFT: 'RIGHT',
            RIGHT: 'LEFT',
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

  const closeModal = useCallback(() => {
    setGameOver(false);
    setGameWon(false);
    setSnake([{ x: 10, y: 10, color: getRandomPastelColor() }]);
    setDirection('RIGHT');
    setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
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
                <Cell
                  key={`${x}-${y}`}
                  $isSnake={isSnake}
                  $isFood={food.x === x && food.y === y}
                  $isHead={isHead}
                  $color={snakeSegment ? snakeSegment.color : ''}
                />
              );
            })
        ),
    [snake, food]
  );

  return (
    <GameContainer>
      <ContentWrapper>
        <Header>
          <Title>Snake Game</Title>
        </Header>
        <ContentContainer>
          <LeftSection>
            <TopLeftSection>
              <ScoreDisplay>Score: {score}</ScoreDisplay>
              <HighScoreDisplay>High Score: {highScore}</HighScoreDisplay>
              <HomeLink href="/">Back to Home</HomeLink>
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

      {(gameOver || gameWon) && (
        <GameOverlay>
          <GameOverModal>
            <h2>{gameWon ? 'Congratulations' : 'Game Over'}</h2>
            <p>
              {gameWon ? 'You filled the entire board 💪' : `Your final score: ${score}`}
            </p>
            <p>{score > highScore ? 'New High Score!' : `High Score: ${highScore}`}</p>
            <div>
              <Button onClick={closeModal}>Play Again</Button>
              <Button onClick={() => window.location.reload()}>Reset Game</Button>
            </div>
          </GameOverModal>
        </GameOverlay>
      )}
    </GameContainer>
  );
}