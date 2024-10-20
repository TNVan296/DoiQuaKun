import Header from '~/components/Header/Header'
import HomeContent from '~/pages/Home/HomeContent/HomeContent'
import Footer from '~/components/Footer/Footer'

function Home() {
  return (
    <div className='container mx-auto'>
      <Header />
      <HomeContent />
      <Footer />
    </div>
  )
}

export default Home