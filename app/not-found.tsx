'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import styled, { keyframes, css } from 'styled-components'
import Link from 'next/link'

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const pulseAnimation = keyframes`
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
`

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #121212;
  color: #f0f0f0;
  font-family: var(--font-family);
`

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  flex-grow: 1;
  gap: 2rem;
`

const Section = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 400px;
`

const TextContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: var(--color-text-secondary);
`

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: var(--color-text-secondary);
`

const RulesSection = styled.div`
  padding: 1.5rem;
  background-color: rgba(26, 26, 26, 0.7);
  border-radius: 10px;
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
`

const RulesTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--color-text-secondary);
  text-align: center;
`

const RulesList = styled.ul`
  list-style-type: none;
  padding: 0;
`

const RuleItem = styled.li`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;

  &:before {
    content: '•';
    margin-right: 0.5rem;
    color: var(--color-accent);
  }
`

const GameBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(20, 20px);
  grid-template-rows: repeat(20, 20px);
  gap: 1px;
  background-color: rgba(26, 26, 26, 0.7);
  border: 2px solid var(--color-border);
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
`

const Cell = styled.div<{ $isSnake: boolean; $isFood: boolean; $isHead: boolean; $color: string }>`
  background-color: ${props => 
    props.$isSnake ? props.$color :
    props.$isFood ? 'var(--color-accent)' : 'transparent'};
  border-radius: 2px;
  transition: all 0.1s ease;
  ${props => props.$isFood && css`
    animation: ${pulseAnimation} 2s ease-in-out infinite;
  `}
`

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
`

const modalAnimation = keyframes`
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`

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
`
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
`
const Footer = styled.footer`
  text-align: center;
  padding: 1rem;
  background-color: rgba(26, 26, 26, 0.7);
`
const getRandomColor = () => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];
  return colors[Math.floor(Math.random() * colors.length)];
}

export default function NotFound() {
  const [snake, setSnake] = useState(() => [{ x: 10, y: 10, color: getRandomColor() }])
  const [food, setFood] = useState(() => ({ x: 5, y: 5 }))
  const [direction, setDirection] = useState<Direction>('RIGHT')
  const [gameOver, setGameOver] = useState(false)
  const [gameWon, setGameWon] = useState(false)

  const moveSnake = useCallback(() => {
    if (gameOver || gameWon) return
    setSnake(prevSnake => {
      const newSnake = [...prevSnake]
      const head = { ...newSnake[0], color: getRandomColor() }

      switch (direction) {
        case 'UP': head.y = (head.y - 1 + 20) % 20; break
        case 'DOWN': head.y = (head.y + 1) % 20; break
        case 'LEFT': head.x = (head.x - 1 + 20) % 20; break
        case 'RIGHT': head.x = (head.x + 1) % 20; break
      }

      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true)
        return prevSnake
      }

      if (head.x === food.x && head.y === food.y) {
        newSnake.unshift(head)
        if (newSnake.length === 400) { 
          setGameWon(true)
          return newSnake
        }
        setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) })
      } else {
        newSnake.pop()
        newSnake.unshift(head)
      }
      return newSnake
    })
  }, [direction, food, gameOver, gameWon])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const newDirection = {
        ArrowUp: 'UP',
        ArrowDown: 'DOWN',
        ArrowLeft: 'LEFT',
        ArrowRight: 'RIGHT'
      }[e.key] as Direction | undefined;

      if (newDirection) {
        setDirection((prev: Direction) => {
          const opposites: Record<Direction, Direction> = { UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT' };
          return opposites[prev] !== newDirection ? newDirection : prev;
        });
      }
    }
    document.addEventListener('keydown', handleKeyPress)
    const gameInterval = setInterval(moveSnake, 250)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
      clearInterval(gameInterval)
    }
  }, [moveSnake])

  const closeModal = useCallback(() => {
    setGameOver(false);
    setGameWon(false);
  }, []);

  const boardCells = useMemo(() => (
    Array(20).fill(0).map((_, y) => (
      Array(20).fill(0).map((_, x) => {
        const snakeSegment = snake.find(s => s.x === x && s.y === y);
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
    ))
  ), [snake, food]);

  return (
    <GameContainer>

      <ContentContainer>

        {/* Rules */}
        <Section>
          <TextContainer>
            <Title>404 - Page Not Found</Title>
            <Subtitle>Here&apos;s a snake game to pass the time</Subtitle>
          </TextContainer>
          <RulesSection>
            <RulesTitle>Game Rules</RulesTitle>
            <RulesList>
              <RuleItem>Use arrow keys to move the snake</RuleItem>
              <RuleItem>Eat food to grow longer</RuleItem>
              <RuleItem>The game ends when you fill the entire board or collide with your own body</RuleItem>
            </RulesList>
          </RulesSection>
        </Section>

        {/* GameBoard */}
        <Section>
          <GameBoard>
            {boardCells}
          </GameBoard>
        </Section>

      </ContentContainer>
      
      {/* Game Over Modal */}
      {(gameOver || gameWon) && (
        <GameOverlay>
          <GameOverModal>
            <h2>{gameWon ? 'Congratulations' : 'Game Over'}</h2>
            <p>{gameWon ? 'You filled the entire board 💪' : `Your final score: ${snake.length}`}</p>
            <div>
              <Button onClick={() => window.location.reload()}>
                Play Again
              </Button>
              <Button onClick={closeModal}>
                Close
              </Button>
            </div>
          </GameOverModal>
        </GameOverlay>

      )}
    </GameContainer>

  )
}