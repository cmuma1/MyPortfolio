// client/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Login from "./components/Login";
import About from "./components/About";
import Qualifications from "./components/Qualifications";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />

          {/* URL is /education but it shows the Qualifications page */}
          <Route path="/education" element={<Qualifications />} />

          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
