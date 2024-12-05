import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { Main } from "../pages/main";
import { StompSessionProvider } from "react-stomp-hooks";

function App() {
  return (
    <StompSessionProvider url='http://localhost:8080/ws'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </StompSessionProvider>
  );
}

export default App;
