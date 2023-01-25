import "./App.css";
import { Routes, Route } from "react-router-dom"; 
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import RandomListSecondHangGoods from "./components/RandomListSecondHangGoods"
import SecondHandGoodsList from "./pages/SecondHandGoodsList"
import SecondHandsGoodsDetails from "./pages/SecondHandsGoodsDetails"
import Footer from "./components/Footer"
import DiscoveriesListPage from "./pages/DiscoveriesListPage"
import DiscoveryDetails from "./pages/DiscoveryDetails"
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/random-secondHandGoods' element={<RandomListSecondHangGoods />} />
        <Route path='/secondHandGoods' element={<SecondHandGoodsList />} />
        <Route path='/secondHandGoods/:secondHandGoodId' element={<SecondHandsGoodsDetails />} />
        <Route path='/discoveries' element={<DiscoveriesListPage />} />
        <Route path='/discoveries/:discoveryId' element={<DiscoveryDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
