
import './App.css'
import CurrencyConverter from './components/CurrencyConverter'

function App() {
  

  return (
    <>
      <div className="min-h-screen bg-gray-100 items-center justify-center flex flex-col">
        <div className='container'>
          <CurrencyConverter />
        </div>
      </div>
    </>
  );
}

export default App
