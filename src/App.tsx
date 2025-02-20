import { useCharacter } from './module/characters/hooks/useCharacter'
import './App.css'
import InputTag from './module/core/components/InputTag';


function App() {

  const { characters } = useCharacter();

  return (
    <>
      <div>

      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <InputTag />
        {JSON.stringify(characters)}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
