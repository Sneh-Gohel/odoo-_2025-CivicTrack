// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './component/Nav';
import Hero from './component/Hero';
import HowWork from './component/HowWork';
import Footer from './component/Footer';
import Thought from './component/Thought';
import Register from './component/Register'; 

function App() {
  return (
    <Router>
      <Nav />
      <main>
        <Routes>
          {/* Homepage Route */}
          <Route path="/" element={
            <>
              <Hero />
              <HowWork />
              <Thought />
            </>
          } />

          {/* Register Page Route */}
          <Route path="/register" element={<Register />} />
          
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;