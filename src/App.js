import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import Home from "./pages/Home"
import About from "./pages/About"
import NotFound from "./pages/NotFound"
import { GitHubProvider } from "./context/github/GithubContext"
import {AlertProvider} from "./context/alert/AlertContext"
import Alert from "./components/layout/Alert"

function App() {
  return (
    <GitHubProvider>
      <AlertProvider>
        <Router>
          <div className="flex flex-col justtify-between h-screen"> 
            <Navbar /> 
            <main className="container mx-auto px-3 pb-12"> 
              <Alert />
              <swich>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/notFound" element={<NotFound />} />
                  <Route path="/*" element={<NotFound />} />
                </Routes> 
              </swich>
            </main>
            <Footer />
          </div>
        </Router>
      </AlertProvider>
    </GitHubProvider>
  )
}

export default App;
