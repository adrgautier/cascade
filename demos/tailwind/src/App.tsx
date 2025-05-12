import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Card, CardCascade } from './components/Card'
import { Logo, LogoCascade } from './components/Logo'
import './App.css';

function App() {

  return (
    <CardCascade className='font-bold text-xl'>
      <CardCascade className='text-white p-10 my-5 bg-slate-400'>
        <Card className='flex flex-col'>
          <div className='flex justify-center'>
            <Logo href="https:s//vitejs.dev" src={viteLogo} alt="Vite logo" />
            <LogoCascade.img className="animate react">
              <Logo href="https://react.dev" src={reactLogo} alt="React logo" />
            </LogoCascade.img>
          </div>
          <h1>Vite + React</h1>
        </Card>
      </CardCascade>
    
      <Card className='p-5 text-black'>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </Card>
    </CardCascade>
  )
}

export default App
