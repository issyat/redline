import Header from './components/Header'
import Films from './components/Films'
import FeaturedMovies from './components/FeaturedMovies'
import FeaturesTvSeries from './components/FeaturesTvSeries'
import ShopMovies from './components/ShopMovies'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AgeConfirmationModal from './components/AgeConfirmationModal'
import CookiesConsent from './components/CookiesConsent'
function App() {

  return (
    <>
      <AgeConfirmationModal />
      <CookiesConsent />
      <Header />
      <Films />
      <FeaturedMovies />
      <FeaturesTvSeries />
      <ShopMovies />
      <Contact />
      <Footer />
    </>
  )
}

export default App
