import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth";
import Homepage from "./pages/home";
import useToken from "./hooks/useToken";

function App() {
  // const [token] = useToken();
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
