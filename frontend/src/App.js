import './App.css';
import Navbar1 from './Components/Navbar/Navbar1';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar2 from './Components/Navbar/Navbar2';
import 'react-slideshow-image/dist/styles.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Shop from './Pages/Shop';
import WomenBg from './Components/Assets/women-bg.png'
import MenBg from './Components/Assets/men-bg.png'
import KidsBg from './Components/Assets/kid-bg.png'
import AccessBg from './Components/Assets/kid-bg.png'
import Product from './Pages/Product'
import LoginSignup from './Pages/LoginSignup'
import Cart from './Pages/Cart';
import Footer1 from './Components/Footer/Footer1';
import Footer2 from './Components/Footer/Footer2';
import ShopCategory from './Pages/ShopCategory';


function App() {
  return (
    <div>
      <Router>
        <Navbar1 />
        <Navbar2 />

        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/women' element={<ShopCategory category='women' title="Women Collection" bg={WomenBg} />} />
          <Route path='/men' element={<ShopCategory category='men' title="Men Collection" bg={MenBg} />} />
          <Route path='/kids' element={<ShopCategory category='kids' title="Kids Collection" bg={KidsBg} />} />
          <Route path='/accessories' element={<ShopCategory category='access' title="Accessories" bg={AccessBg} />} />
          <Route path="/product" element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/login' element={<LoginSignup />} />
          <Route path='/cart' element={<Cart />} />


        </Routes>
      </Router>

      <Footer1 />
      <Footer2 />
    </div>
  );
}

export default App;
