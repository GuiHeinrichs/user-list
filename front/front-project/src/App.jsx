import Cadastro from './pages/Cadastro'
import Login from './pages/Login'
import Lista from './pages/Lista'
import Header from "./components/Header.jsx";

import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<Cadastro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/lista" element={<Lista />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
