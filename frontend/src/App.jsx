import { Routes, Route, Link, useLocation } from "react-router-dom";
import SubmitIdea from "./pages/SubmitIdea";
import IdeaList from "./pages/IdeaList";
import IdeaDetail from "./pages/IdeaDetail";

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-50">
      
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <h1 className="text-center text-xl font-semibold tracking-tight text-slate-900">
            <Link
              to="/"
              className="hover:text-indigo-600 transition-colors duration-150"
            >
              Startup Idea Validator
            </Link>
          </h1>
        </div>
      </header>
      
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<IdeaList />} />
          <Route path="/submit" element={<SubmitIdea />} />
          <Route path="/ideas/:id" element={<IdeaDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
