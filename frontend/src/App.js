import "./App.css";
import HomePage from "./HomePage/HomePage";
import SignUppage from "./pages/SignUppage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<SignUppage />} />
      </Routes>
    </div>
  );
}

export default App;
