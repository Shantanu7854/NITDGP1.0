import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth";
import Homepage from "./pages/home/home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </>
  );
}

export default App;
