
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { api } from "../api";


const getRiskColor = (level) => {
  const l = level?.toLowerCase() || "";
  if (l.includes("low")) return "bg-emerald-100 text-emerald-800 border-emerald-200";
  if (l.includes("medium")) return "bg-amber-100 text-amber-800 border-amber-200";
  if (l.includes("high")) return "bg-rose-100 text-rose-800 border-rose-200";
  return "bg-slate-100 text-slate-800 border-slate-200";
};

function IdeaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function fetchIdea() {
      try {
        const res = await api.get(`/ideas/${id}`);
        setIdea(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchIdea();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this report forever?")) return;
    setDeleting(true);
    try {
      await api.delete(`/ideas/${id}`);
      navigate("/");
    } catch (err) {
      console.error(err);
      setDeleting(false);
    }
  };

  
  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="relative flex h-10 w-10">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-10 w-10 bg-indigo-600"></span>
        </div>
        <p className="mt-4 text-sm font-medium text-slate-500 animate-pulse">
          Generating insights...
        </p>
      </div>
    );
  }


  if (!idea) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <div className="bg-slate-50 p-6 rounded-full mb-4">
          <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <h2 className="text-xl font-bold text-slate-900">Idea Not Found</h2>
        <p className="text-slate-500 mt-2 max-w-xs mx-auto">
          The report you are looking for has been moved or deleted.
        </p>
        <Link to="/" className="mt-6 px-6 py-2.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
          Return Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      
      <header className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Link to="/" className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Back to Dashboard
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {idea.title}
          </h1>
          <p className="mt-2 text-slate-500 flex items-center gap-2 text-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Generated on {new Date(idea.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 font-medium hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-all shadow-sm hover:shadow-md disabled:opacity-50"
          >
            {deleting ? (
              <span className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            )}
            <span>{deleting ? "Deleting..." : "Delete Report"}</span>
          </button>
        </div>
      </header>

      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        
        <div className="lg:col-span-2 space-y-8">
          
          
          <section className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Idea Description
            </h2>
            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
              {idea.description}
            </p>
          </section>

          {/* Detailed Analysis */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-full">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">The Problem</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{idea.problem || "N/A"}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-full">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Target Audience</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{idea.customer || "N/A"}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 md:col-span-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Market Overview</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{idea.market || "N/A"}</p>
            </div>
          </div>

          {/* AI Justification */}
          <section className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl p-6 md:p-8 border border-indigo-100/50 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
            <h2 className="text-lg font-bold text-slate-900 mb-4 relative z-10">AI Verdict</h2>
            <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap relative z-10">
              {idea.justification || "No justification provided."}
            </div>
          </section>
        </div>

        
        <div className="space-y-6">
          
          {/* Score Cards */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900 mb-6">Feasibility Scores</h3>
            
            <div className="space-y-6">
              {/* Profitability */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Profitability</span>
                  <span className="text-2xl font-bold text-slate-900">{idea.profitability_score || 0}<span className="text-sm text-slate-400 font-normal">/100</span></span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${idea.profitability_score || 0}%` }}
                  />
                </div>
              </div>

              {/* Risk */}
              <div>
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wide block mb-2">Risk Assessment</span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(idea.risk_level)}`}>
                  {idea.risk_level || "Unknown"}
                </span>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Recommended Stack</h3>
            <div className="flex flex-wrap gap-2">
              {idea.tech_stack?.length > 0 ? (
                idea.tech_stack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))
              ) : (
                <p className="text-sm text-slate-400 italic">No stack generated</p>
              )}
            </div>
          </div>

          {/* Competitors */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Competitor Analysis</h3>
            <div className="space-y-3">
              {idea.competitors?.length > 0 ? (
                idea.competitors.map((comp, idx) => (
                  <div key={idx} className="group p-3 rounded-xl bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm text-slate-900">{comp.name}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-snug group-hover:text-slate-600">
                      {comp.differentiation}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-400 italic">No competitors found</p>
              )}
            </div>
          </div>

          
          <div className="px-2">
             <p className="text-[10px] text-slate-400 font-mono text-center">ID: {idea._id}</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default IdeaDetail;