import { useState, useCallback, useMemo, useEffect } from 'react';
import type { BingoSquareData, BingoLine, GameState, GameMode, ScavengerItem } from '../types';
import {
  generateBoard,
  toggleSquare,
  checkBingo,
  getWinningSquareIds,
} from '../utils/bingoLogic';
import {
  generateScavengerItems,
  toggleScavengerItem,
  isScavengerComplete,
} from '../utils/scavengerLogic';

export interface BingoGameState {
  gameState: GameState;
  mode: GameMode;
  board: BingoSquareData[];
  winningLine: BingoLine | null;
  winningSquareIds: Set<number>;
  showBingoModal: boolean;
  scavengerItems: ScavengerItem[];
  showScavengerModal: boolean;
}

export interface BingoGameActions {
  startGame: (mode: GameMode) => void;
  handleSquareClick: (squareId: number) => void;
  handleItemToggle: (itemId: number) => void;
  resetGame: () => void;
  dismissModal: () => void;
}

const STORAGE_KEY = 'bingo-game-state';
const STORAGE_VERSION = 1;

interface StoredGameData {
  version: number;
  gameState: GameState;
  mode?: GameMode;
  board: BingoSquareData[];
  winningLine: BingoLine | null;
  scavengerItems?: ScavengerItem[];
}

function validateStoredData(data: unknown): data is StoredGameData {
  if (!data || typeof data !== 'object') {
    return false;
  }
  
  const obj = data as Record<string, unknown>;
  
  if (obj.version !== STORAGE_VERSION) {
    return false;
  }
  
  if (
    typeof obj.gameState !== 'string' ||
    !['start', 'playing', 'bingo', 'scavenger-complete'].includes(obj.gameState)
  ) {
    return false;
  }

  // mode is optional for backward compatibility; defaults to 'bingo'
  if (obj.mode !== undefined && !['bingo', 'scavenger'].includes(obj.mode as string)) {
    return false;
  }
  
  if (!Array.isArray(obj.board) || (obj.board.length !== 0 && obj.board.length !== 25)) {
    return false;
  }
  
  const validSquares = obj.board.every((sq: unknown) => {
    if (!sq || typeof sq !== 'object') return false;
    const square = sq as Record<string, unknown>;
    return (
      typeof square.id === 'number' &&
      typeof square.text === 'string' &&
      typeof square.isMarked === 'boolean' &&
      typeof square.isFreeSpace === 'boolean'
    );
  });
  
  if (!validSquares) {
    return false;
  }
  
  if (obj.winningLine !== null) {
    if (typeof obj.winningLine !== 'object') {
      return false;
    }
    const line = obj.winningLine as Record<string, unknown>;
    if (
      typeof line.type !== 'string' ||
      !['row', 'column', 'diagonal'].includes(line.type) ||
      typeof line.index !== 'number' ||
      !Array.isArray(line.squares)
    ) {
      return false;
    }
  }

  // scavengerItems is optional; validate shape if present
  if (obj.scavengerItems !== undefined) {
    if (!Array.isArray(obj.scavengerItems)) return false;
    const validItems = obj.scavengerItems.every((item: unknown) => {
      if (!item || typeof item !== 'object') return false;
      const i = item as Record<string, unknown>;
      return (
        typeof i.id === 'number' &&
        typeof i.text === 'string' &&
        typeof i.isChecked === 'boolean'
      );
    });
    if (!validItems) return false;
  }
  
  return true;
}

function loadGameState(): Pick<
  BingoGameState,
  'gameState' | 'mode' | 'board' | 'winningLine' | 'scavengerItems'
> | null {
  // SSR guard
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return null;
    }

    const parsed = JSON.parse(saved);
    
    if (validateStoredData(parsed)) {
      return {
        gameState: parsed.gameState,
        mode: parsed.mode ?? 'bingo',
        board: parsed.board,
        winningLine: parsed.winningLine,
        scavengerItems: parsed.scavengerItems ?? [],
      };
    } else {
      console.warn('Invalid game state data in localStorage, clearing...');
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.warn('Failed to load game state:', error);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  return null;
}

function saveGameState(
  gameState: GameState,
  mode: GameMode,
  board: BingoSquareData[],
  winningLine: BingoLine | null,
  scavengerItems: ScavengerItem[],
): void {
  // SSR guard
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const data: StoredGameData = {
      version: STORAGE_VERSION,
      gameState,
      mode,
      board,
      winningLine,
      scavengerItems,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save game state:', error);
  }
}

export function useBingoGame(): BingoGameState & BingoGameActions {
  const loadedState = useMemo(() => loadGameState(), []);

  const [gameState, setGameState] = useState<GameState>(
    () => loadedState?.gameState || 'start'
  );
  const [mode, setMode] = useState<GameMode>(
    () => loadedState?.mode || 'bingo'
  );
  const [board, setBoard] = useState<BingoSquareData[]>(
    () => loadedState?.board || []
  );
  const [winningLine, setWinningLine] = useState<BingoLine | null>(
    () => loadedState?.winningLine || null
  );
  const [showBingoModal, setShowBingoModal] = useState(false);
  const [scavengerItems, setScavengerItems] = useState<ScavengerItem[]>(
    () => loadedState?.scavengerItems || []
  );
  const [showScavengerModal, setShowScavengerModal] = useState(false);

  const winningSquareIds = useMemo(
    () => getWinningSquareIds(winningLine),
    [winningLine]
  );

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    saveGameState(gameState, mode, board, winningLine, scavengerItems);
  }, [gameState, mode, board, winningLine, scavengerItems]);

  const startGame = useCallback((selectedMode: GameMode) => {
    setMode(selectedMode);
    setWinningLine(null);
    setShowBingoModal(false);
    setShowScavengerModal(false);
    if (selectedMode === 'bingo') {
      setBoard(generateBoard());
      setScavengerItems([]);
    } else {
      setBoard([]);
      setScavengerItems(generateScavengerItems());
    }
    setGameState('playing');
  }, []);

  const handleSquareClick = useCallback((squareId: number) => {
    setBoard((currentBoard) => {
      const newBoard = toggleSquare(currentBoard, squareId);
      
      // Check for bingo after toggling
      const bingo = checkBingo(newBoard);
      if (bingo && !winningLine) {
        // Schedule state updates to avoid synchronous setState in effect
        queueMicrotask(() => {
          setWinningLine(bingo);
          setGameState('bingo');
          setShowBingoModal(true);
        });
      }
      
      return newBoard;
    });
  }, [winningLine]);

  const handleItemToggle = useCallback((itemId: number) => {
    setScavengerItems((currentItems) => {
      const newItems = toggleScavengerItem(currentItems, itemId);
      if (isScavengerComplete(newItems)) {
        queueMicrotask(() => {
          setGameState('scavenger-complete');
          setShowScavengerModal(true);
        });
      }
      return newItems;
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState('start');
    setMode('bingo');
    setBoard([]);
    setWinningLine(null);
    setShowBingoModal(false);
    setScavengerItems([]);
    setShowScavengerModal(false);
  }, []);

  const dismissModal = useCallback(() => {
    setShowBingoModal(false);
    setShowScavengerModal(false);
  }, []);

  return {
    gameState,
    mode,
    board,
    winningLine,
    winningSquareIds,
    showBingoModal,
    scavengerItems,
    showScavengerModal,
    startGame,
    handleSquareClick,
    handleItemToggle,
    resetGame,
    dismissModal,
  };
}
