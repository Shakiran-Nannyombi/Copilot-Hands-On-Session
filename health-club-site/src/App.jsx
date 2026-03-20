import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './pages/Hero';
import Events from './pages/Events';
import Organizers from './pages/Organizers';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Events />
        <Organizers />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
