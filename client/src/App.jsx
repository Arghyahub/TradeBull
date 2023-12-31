import { BrowserRouter , Routes , Route } from "react-router-dom";

import "./App.css"
import Auth from "./components/auth/Auth";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
// import Temp from "./components/test/Temp";

const App = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:stockname" element={<Home />} />
            <Route path="/auth" element={<Auth/>} />
            <Route path="/profile" element={<Profile/>} />
            {/* <Route path="/test" element={<Temp/>} /> */}
        </Routes>
        </BrowserRouter>
    )
}

export default App;
