// App.jsx
import { BrowserRouter as Router } from 'react-router-dom'
import Nav from './component/Nav'
import Hero from './component/Hero'
import HowWork from './component/HowWork'

function App() {
  return (
    <Router>
      <Nav />
      <main>
        <Hero />
      </main>
      <section>
        <HowWork />
      </section>
    </Router>
  )
}

export default App
