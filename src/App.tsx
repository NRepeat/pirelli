import { Suspense } from 'react'
import './App.css'
import MainCanvas from './components/main-canvas'

function App() {

  return (
    <Suspense fallback={<span>loading...</span>}>
      <MainCanvas />
    </Suspense>
  )
}

export default App
