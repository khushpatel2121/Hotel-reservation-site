import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css';
import Home from "./components/home/home";
import List from "./components/list/List";
import Hotels from "./components/hotels/hotels";
import Login from "./login/Login";


function App() {
  return (
   <>
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/hotels" element={<List/>}/>
    <Route path="/hotels/:id" element={<Hotels/>}/>
    <Route path="/login" element={<Login/>}/>
  </Routes>
</BrowserRouter>
   </>
  );
}

export default App;
