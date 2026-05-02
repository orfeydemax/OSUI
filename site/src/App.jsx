import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileBar from './components/MobileBar';

import HomePage from './pages/HomePage';
import BeginnerPage from './pages/BeginnerPage';
import SnorkelingPage from './pages/SnorkelingPage';
import CouplesPage from './pages/CouplesPage';
import FamilyPage from './pages/FamilyPage';
import CoursesPage from './pages/CoursesPage';
import AboutPage from './pages/AboutPage';
import ReviewsPage from './pages/ReviewsPage';
import ContactsPage from './pages/ContactsPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// Intersection Observer for fade-up animations
function AnimationObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <AnimationObserver />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/beginner-diving-nha-trang" element={<BeginnerPage />} />
          <Route path="/snorkeling-nha-trang" element={<SnorkelingPage />} />
          <Route path="/diving-for-couples-nha-trang" element={<CouplesPage />} />
          <Route path="/family-diving-snorkeling-nha-trang" element={<FamilyPage />} />
          <Route path="/diving-courses-nha-trang" element={<CoursesPage />} />
          <Route path="/about-victor" element={<AboutPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
