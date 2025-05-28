import { useState } from 'react'
import InputBlock from "./conponent/InputBlock.tsx"


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <InputBlock />
    </>
  )
}

export default App
