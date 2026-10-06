import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatWeDoSection from "./components/WhatWeDoSection";
import EventSection from "./components/EventSection";
import GalleryPreview from "./components/GalleryPreview";
import CoreTeamSection from "./components/CoreTeamSection";
import CustomCursor from "./utils/Cursors/CustomCursor";
import { KonfHubRegistrationProvider } from "./utils/KonfHubRegistrationWidget";
import "./portfolio-theme.css";

const GalleryPage = lazy(() => import("./components/GalleryPage"));

// const CommunityDayPage = lazy(
//   () => import("./utils/CommunityDayPageRedesign/components/CommunityDayPage"),
// );

const CommunityDayPage = lazy(() => import("./components/Communitydaypage"));

function scrollToHash(hash) {
  const id = hash.replace("#", "");
  if (!id) return;
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 80;
  const bodyRect = document.body.getBoundingClientRect().top;
  const elementRect = el.getBoundingClientRect().top;
  window.scrollTo({
    top: elementRect - bodyRect - offset,
    behavior: "smooth",
  });
}

function ClubHome() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const t = setTimeout(() => scrollToHash(location.hash), 80);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [location.hash]);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    document.documentElement.style.setProperty(
      "--prefers-reduced-motion",
      reduceMotion ? "1" : "0",
    );

    const revealTargets = document.querySelectorAll(
      "section, .card-glow, .project-card, .hero-content, .hero-visual, .section-header, .stat-card, .testimonial-card",
    );

    revealTargets.forEach((target) => target.classList.add("reveal"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.16 },
    );

    revealTargets.forEach((target) => observer.observe(target));

    let scrollFrame = 0;
    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = 0;
        const scrollY = window.scrollY;
        const maxScroll = Math.max(
          document.documentElement.scrollHeight - window.innerHeight,
          1,
        );
        document.documentElement.style.setProperty(
          "--page-scroll-normalized",
          `${scrollY / maxScroll}`,
        );
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(scrollFrame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="club-app fade-in-application">
      <main>
        <Hero />
        <About />
        <WhatWeDoSection />
        <EventSection />
        <GalleryPreview />
        <CoreTeamSection />
        <Contact />
      </main>
    </div>
  );
}

function AppShell() {
  const location = useLocation();
  const isCommunityDay = location.pathname === "/community-day";

  return (
    <KonfHubRegistrationProvider>
      <>
        {!isCommunityDay && <CustomCursor />}

        {!isCommunityDay && <Navbar />}
        <Suspense
          fallback={
            <main className="route-loading" aria-label="Loading page" />
          }
        >
          <Routes>
            <Route path="/" element={<ClubHome />} />
            <Route path="/community-day" element={<CommunityDayPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
          </Routes>
        </Suspense>
        {!isCommunityDay && <Footer />}
      </>
    </KonfHubRegistrationProvider>
  );
}

export default function App() {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
