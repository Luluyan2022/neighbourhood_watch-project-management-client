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
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate"
import IsAnon from "./components/IsAnon"
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/random-secondHandGoods' element={<RandomListSecondHangGoods />} />
        <Route path='/secondHandGoods' element={<IsPrivate><SecondHandGoodsList /></IsPrivate>} />
        <Route path='/secondHandGoods/:secondHandGoodId' element={<IsPrivate><SecondHandsGoodsDetails /></IsPrivate>} />
        <Route path='/discoveries' element={<IsPrivate><DiscoveriesListPage /></IsPrivate>} />
        <Route path='/discoveries/:discoveryId' element={<IsPrivate><DiscoveryDetails /></IsPrivate>} />
        <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />
        <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
