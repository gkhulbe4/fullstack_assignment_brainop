import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Posts from "./components/Posts";
import Dashboard from "./components/Dashboard";
import ResetPass from "./components/ResetPass";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/posts" element={<Posts/>} />
          <Route path="/dashboard/:userId" element={<Dashboard/>}/>
          <Route path="/resetpass" element={<ResetPass/>}/>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
