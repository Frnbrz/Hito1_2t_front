import { useState } from "react"
import api from "./services/api"

interface Bdlist {
  // Define the properties of Bdlist
}

function App() {
  const [bd, setBd] = useState<Bdlist[]>([]) // Update the type of bd and initialize it with an empty array
  api.bd.list().then(res => {
      return setBd(res)
  }
      
    )
  return (
    <div>
      {JSON.stringify(bd)}
   </div>
  )
}
export default App
