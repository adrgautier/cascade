import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Card } from './components/Card'
import { Logo } from './components/Logo'
import './App.css';

function App() {

  return (
    <Card.Cascade className={['font-bold', { 'flex': 'bg-slate-800 text-xl'}]}>
      <Card.Cascade className='text-white p-5 my-5'>
        <Card className='flex flex-col'>
          <div className='flex justify-center'>
            <Logo href="https://vitejs.dev" src={viteLogo} alt="Vite logo" />
            <Logo.Cascade className="animate react">
              <Logo href="https://react.dev" src={reactLogo} alt="React logo" />
            </Logo.Cascade>
          </div>
          <h1>Vite + React</h1>
        </Card>
      </Card.Cascade>
    
      <Card className='p-5'>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </Card>
    </Card.Cascade>
  )
}

export default App
