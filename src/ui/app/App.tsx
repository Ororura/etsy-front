import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { Main } from "../pages/main";
import { StompSessionProvider } from "react-stomp-hooks";
import { Support } from "../pages/support";

function App() {
  return (
    <StompSessionProvider url={`${import.meta.env.VITE_SERVER}/ws`}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/next" element={<Support />} />
        </Routes>
      </BrowserRouter>
    </StompSessionProvider>
  );
}

export default App;
