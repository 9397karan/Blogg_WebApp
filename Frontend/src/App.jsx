
import { Button } from "@/components/ui/button"
import { Route, Router, Routes } from "react-router"
import Login from "./pages/Login"
import Home from "./pages/Home"
function App() {
 
  return (
    <div>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </div>
  )
}

export default App
