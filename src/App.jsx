import Home from "./Pages/Home.jsx";
import { ToastContainer } from "react-toastify";
import Game from "./Pages/Game.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<Home />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={4999} theme="dark" />
    </BrowserRouter>
  );
};

export default App;
