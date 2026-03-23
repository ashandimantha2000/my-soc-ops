import { useBingoGame } from './hooks/useBingoGame';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { BingoModal } from './components/BingoModal';
import { ScavengerModal } from './components/ScavengerModal';

function App() {
  const {
    gameState,
    mode,
    board,
    scavengerItems,
    winningSquareIds,
    showBingoModal,
    showScavengerModal,
    startGame,
    handleSquareClick,
    handleItemToggle,
    resetGame,
    dismissModal,
  } = useBingoGame();

  if (gameState === 'start') {
    return <StartScreen onStart={startGame} />;
  }

  return (
    <>
      <GameScreen
        mode={mode}
        board={board}
        scavengerItems={scavengerItems}
        winningSquareIds={winningSquareIds}
        hasBingo={gameState === 'bingo'}
        onSquareClick={handleSquareClick}
        onItemToggle={handleItemToggle}
        onReset={resetGame}
      />
      {showBingoModal && (
        <BingoModal onDismiss={dismissModal} />
      )}
      {showScavengerModal && (
        <ScavengerModal onDismiss={dismissModal} />
      )}
    </>
  );
}

export default App;
