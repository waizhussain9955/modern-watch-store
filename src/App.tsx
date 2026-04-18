import { BrowserRouter, Route, Routes } from "react-router-dom"
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Internationalbrands from './pages/Internationalbrands'
import Allwatches from './pages/Allwatches'
import Men from './pages/Men'
import Women from './pages/Women'
import Store from './pages/Store'
import Smart from './pages/Smart'
import Offers from './pages/Offers'
import Brands from './pages/Brands'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Search from "./pages/Search"
import Footer from './components/Footer'

const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/internationalbrands' element={<Internationalbrands />} />
              <Route path='/allwatches' element={<Allwatches />} />
              <Route path='/men' element={<Men />} />
              <Route path='/women' element={<Women />} />
              <Route path='/store' element={<Store />} />
              <Route path='/smart' element={<Smart />} />
              <Route path='/offers' element={<Offers />} />
              <Route path='/brands' element={<Brands />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/search' element={<Search />} />
            </Routes>
          </main>
          <Footer />
        </div>
        
        {/* Floating WhatsApp Button */}
        <a 
          href="https://wa.me/923272051549?text=Hi!%20I'm%20interested%20in%20your%20watch%20collection.%20Can%20we%20discuss%20further?" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-wayne-teal text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 z-50 group md:bottom-8 md:right-8 md:p-5"
          aria-label="Chat on WhatsApp"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="md:w-6 md:h-6"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-wayne-black text-white px-3 py-1 rounded text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Chat on WhatsApp
          </span>
        </a>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App