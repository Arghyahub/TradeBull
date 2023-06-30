import { BrowserRouter , Routes , Route } from "react-router-dom";

import "./App.css"
import Auth from "./components/auth/Auth";
import Home from "./components/home/Home";

const App = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:stockname" element={<Home />} />
            <Route path="/auth" element={<Auth/>} />
        </Routes>
        </BrowserRouter>
    )
}

export default App;
