import { useEffect, lazy, Suspense } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import Landing from "@/pages/Landing";
import { LangProvider } from "@/lib/i18n";
import { initAnalytics } from "@/lib/analytics";

const Admin = lazy(() => import("@/pages/Admin"));

function App() {
  useEffect(() => {
    initAnalytics();
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="App">
      <LangProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/admin"
              element={
                <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
                  <Admin />
                </Suspense>
              }
            />
          </Routes>
        </BrowserRouter>
      </LangProvider>
    </div>
  );
}

export default App;
