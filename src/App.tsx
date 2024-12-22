import { Suspense } from 'react'
import './App.css'
import MainCanvas from './components/main-canvas'
import { GiTireIronCross } from 'react-icons/gi'

function App() {
  const LoadingScreen = () => <div className='flex justify-center items-center w-screen h-screen bg-black '>
    <GiTireIronCross className='w-32 h-32 animate-spin fill-yellow-300' />
  </div>
  return (
    <Suspense fallback={<LoadingScreen />}>
      <MainCanvas />
    </Suspense>
  )
}

export default App
