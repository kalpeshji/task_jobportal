import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideBar from "./components/layout/SideBar";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <SideBar />
        <Routes>
            <Route path="/" element={<Profile />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
