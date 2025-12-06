
import { useState } from "react";
import { Link } from "react-router-dom"; 
import { api } from "../api";

function SubmitIdea() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultId, setResultId] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResultId(null);

    try {
      const res = await api.post("/ideas", { title, description });
      setResultId(res.data._id);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-xl w-full space-y-8">
        
        
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 text-indigo-600">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Validate your next big idea
          </h2>
          <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
            Submit your startup concept below. Our AI will analyze market viability, risks, and technical requirements in seconds.
          </p>
        </div>

        
        <div className="bg-white py-8 px-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 rounded-2xl sm:px-10 relative overflow-hidden">
          
          
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-indigo-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

          <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
            
           
            <div>
              <label htmlFor="title" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Concept Title
              </label>
              <div className="relative">
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  disabled={loading}
                  className="appearance-none block w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 placeholder-slate-400 text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 sm:text-sm disabled:opacity-50"
                  placeholder="e.g., Uber for Dog Walking"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>

            
            <div>
              <label htmlFor="description" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Detailed Description
              </label>
              <div className="relative">
                <textarea
                  id="description"
                  name="description"
                  rows="5"
                  required
                  disabled={loading}
                  className="appearance-none block w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 placeholder-slate-400 text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 sm:text-sm resize-none disabled:opacity-50"
                  placeholder="Describe the problem you are solving, your target audience, and your proposed solution..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            
            {error && (
              <div className="rounded-lg bg-red-50 p-4 border border-red-100 flex items-start gap-3">
                <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}

           
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 disabled:bg-slate-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Running AI Analysis...</span>
                  </div>
                ) : (
                  <span className="flex items-center gap-2">
                    Generate Report 
                    <svg className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>

        
        {resultId && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-emerald-50 border border-emerald-100 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 flex-shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-emerald-900">Analysis Complete!</h3>
                <p className="text-sm text-emerald-700 mt-0.5">Your idea has been validated.</p>
              </div>
            </div>
            
            <Link
              to={`/ideas/${resultId}`}
              className="w-full sm:w-auto text-center px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors whitespace-nowrap"
            >
              View Full Report →
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}

export default SubmitIdea;