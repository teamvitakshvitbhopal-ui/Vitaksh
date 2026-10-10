import { useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { AnimatePresence } from 'framer-motion'

import Nav from './components/Nav'
import Loader from './components/Loader'
import Home from './pages/Home'
import Mission from './pages/Mission'
import Team from './pages/Team'
import Contact from './pages/Contact'




function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function AppInner() {
  const lenisRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <>
      <Loader />
      <Nav />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}
