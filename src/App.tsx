import { Navigate, Route, Routes } from "react-router-dom";

import AppNavbar from "./components/AppNavbar";
import Movies from "./pages/Movies";
import Sandbox from "./pages/Sandbox";

import "./App.scss";

function App() {
  return (
    <>
      <AppNavbar className="m-lg-5 m-2">
        <Routes>
          <Route path="/" element={<Navigate to="/movies" />} />
          <Route path="/sandbox" element={<Sandbox />} />
          <Route path="/movies" element={<Movies />} />
        </Routes>
      </AppNavbar>
    </>
  );
}

export default App;
