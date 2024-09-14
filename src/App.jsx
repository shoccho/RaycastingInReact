import { useState } from 'react'
import { Game } from './components/Game'

function App() {
  const [player, setPlayer] = useState({
    x: 500,
    y: 500,
    a: 0,
  });

  return (
    <Game player={player} setPlayer={setPlayer} />
  )
}

export default App
