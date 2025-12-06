
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";


function riskColor(risk) {
  if (!risk) return "bg-slate-100 text-slate-600 border-slate-200";
  const r = risk.toLowerCase();
  if (r.includes("low")) return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (r.includes("high")) return "bg-rose-50 text-rose-700 border-rose-200";
  return "bg-amber-50 text-amber-700 border-amber-200";
}

function IdeaList() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIdeas() {
      try {
        const res = await api.get("/ideas");
        setIdeas(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchIdeas();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex justify-between items-end mb-8">
          <div className="space-y-2">
            <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
            <div className="h-8 w-48 bg-slate-200 rounded animate-pulse" />
          </div>
          <div className="h-10 w-32 bg-slate-200 rounded-lg animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6 h-48 animate-pulse shadow-sm">
              <div className="flex justify-between mb-4">
                <div className="h-4 w-1/3 bg-slate-100 rounded" />
                <div className="h-6 w-16 bg-slate-100 rounded-full" />
              </div>
              <div className="h-6 w-3/4 bg-slate-100 rounded mb-2" />
              <div className="h-6 w-1/2 bg-slate-100 rounded" />
              <div className="mt-8 h-2 w-full bg-slate-100 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-slate-500 mt-2 text-sm max-w-lg">
            Manage your AI-validated startup concepts. Review profitability scores, risk assessments, and technical feedback.
          </p>
        </div>

        <Link
          to="/submit"
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        >
          <svg className="w-4 h-4 text-slate-300 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          New Idea
        </Link>
      </div>

      
      {ideas.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 text-center shadow-sm">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900">No ideas validated yet</h3>
          <p className="text-slate-500 text-sm mt-1 mb-6 max-w-xs mx-auto">
            Submit your first startup concept to get an instant AI validation report.
          </p>
          <Link
            to="/submit"
            className="px-6 py-2 rounded-full bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition shadow-md shadow-indigo-200"
          >
            Create First Idea
          </Link>
        </div>
      )}

      
      {ideas.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <Link
              key={idea._id}
              to={`/ideas/${idea._id}`}
              className="group relative flex flex-col bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-indigo-100 hover:-translate-y-1 transition-all duration-300 ease-out"
            >
              
              <div className="flex items-start justify-between mb-4">
                <span className="text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
                  {new Date(idea.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${riskColor(idea.risk_level)}`}
                >
                  {idea.risk_level || "Unknown Risk"}
                </span>
              </div>

              
              <h2 className="text-lg font-bold text-slate-900 mb-2 leading-tight line-clamp-2 group-hover:text-indigo-600 transition-colors">
                {idea.title}
              </h2>

              
              <div className="flex-1" />

              
              <div className="mt-6 pt-4 border-t border-slate-50">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-medium text-slate-500">Profitability Score</span>
                  <span className="text-sm font-bold text-slate-900">{idea.profitability_score || 0}%</span>
                </div>
                
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                    style={{ width: `${idea.profitability_score || 0}%` }}
                  />
                </div>
              </div>

              
              <div className="absolute bottom-6 right-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-indigo-500">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default IdeaList;