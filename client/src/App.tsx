import { useState } from 'react'
import DropdownComponent from './components/DropdownComponent'
import ModalComponent from './components/ModalComponent'
import Gallery from './components/Gallery'
import { Calendar } from 'primereact/calendar';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
       <ModalComponent />
      <div>
       
        {/* <Calendar value={new Date()} onChange={() => { }} /> */}

        <div className="">
          {/* <h2 className="text-lg font-bold">Main</h2>
          <p>Text</p>
          <div className="relative"><DropdownComponent /></div> */}

          <Gallery />
        </div>
      </div>
    </div>
  )
}

export default App
