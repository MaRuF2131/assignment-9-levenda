import './App.css'
import Root from './root/root'
import {DataFetch} from './mytoots/dataFetch/dataFetch'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
     <Toaster position="top-right" />
      <DataFetch>
        <Root></Root>
      </DataFetch> 
    </>
  )
}

export default App
