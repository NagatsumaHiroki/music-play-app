import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import TOP from './components/Top'
import NotFound from './components/NotFound'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TOP />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
