
import React, { useState, useCallback } from 'react';
import { AppStatus, ExplanationData } from './types';
import { getExplanation } from './geminiService';
import ExplanationCard from './components/ExplanationCard';

const App: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [result, setResult] = useState<ExplanationData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setStatus(AppStatus.LOADING);
    setError(null);
    setResult(null);

    try {
      const data = await getExplanation(topic);
      setResult(data);
      setStatus(AppStatus.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Oops! Something went wrong while getting the explanation.');
      setStatus(AppStatus.ERROR);
    }
  }, [topic]);

  const loadingMessages = [
    "Thinking about your topic...",
    "Finding the best way to explain it...",
    "Generating examples for you...",
    "Almost there...",
  ];
  
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);

  React.useEffect(() => {
    let interval: any;
    if (status === AppStatus.LOADING) {
      interval = setInterval(() => {
        setLoadingMsgIndex(prev => (prev + 1) % loadingMessages.length);
      }, 2000);
    } else {
      setLoadingMsgIndex(0);
    }
    return () => clearInterval(interval);
  }, [status]);

  return (
    <div className="min-h-screen flex flex-col items-center p-6 md:p-12 transition-colors duration-500">
      {/* Header Section */}
      <header className="w-full max-w-4xl text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            AI Topic Explainer
          </h1>
        </div>
        <p className="text-lg text-slate-600 max-w-xl mx-auto">
          Type any topic, concept, or term. I'll break it down into three simple parts for your learning journey.
        </p>
      </header>

      {/* Search Bar */}
      <form 
        onSubmit={handleSearch}
        className="w-full max-w-2xl flex flex-col md:flex-row gap-4 mb-12 sticky top-4 z-50 transition-all"
      >
        <div className="relative flex-grow">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Photosynthesis, Gravity, Quantum Mechanics..."
            className="w-full px-6 py-4 rounded-2xl border-2 border-slate-200 bg-white text-slate-900 text-lg focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all shadow-sm placeholder:text-slate-400"
            disabled={status === AppStatus.LOADING}
            autoFocus
          />
          {topic && status !== AppStatus.LOADING && (
            <button 
              type="button"
              onClick={() => setTopic('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 bg-white rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={status === AppStatus.LOADING || !topic.trim()}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 whitespace-nowrap min-w-[140px]"
        >
          {status === AppStatus.LOADING ? (
            <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <>
              Learn
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </>
          )}
        </button>
      </form>

      {/* Main Content Area */}
      <main className="w-full flex flex-col items-center gap-8">
        {status === AppStatus.IDLE && (
          <div className="text-center mt-8 animate-in fade-in zoom-in duration-700">
            <div className="bg-white/50 backdrop-blur-sm p-10 rounded-3xl border-2 border-dashed border-slate-200 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-indigo-400 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h3 className="text-2xl font-semibold text-slate-800 mb-2">Ready to explore?</h3>
              <p className="text-slate-500 mb-8 max-w-sm mx-auto">I'm here to help you understand complex concepts with ease.</p>
              <div className="flex flex-wrap justify-center gap-3">
                {['Black Holes', 'How Planes Fly', 'Photosynthesis', 'The Renaissance'].map(suggestion => (
                  <button 
                    key={suggestion}
                    type="button"
                    onClick={() => setTopic(suggestion)}
                    className="px-5 py-2.5 bg-white rounded-xl text-indigo-600 font-medium border border-indigo-100 hover:border-indigo-400 hover:bg-indigo-50 transition-all shadow-sm hover:shadow-md active:scale-95"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {status === AppStatus.LOADING && (
          <div className="flex flex-col items-center gap-6 py-24 animate-in fade-in duration-500">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <p className="text-indigo-600 font-bold text-xl tracking-wide">
              {loadingMessages[loadingMsgIndex]}
            </p>
          </div>
        )}

        {status === AppStatus.ERROR && (
          <div className="w-full max-w-xl bg-red-50 border-2 border-red-100 p-8 rounded-3xl flex items-start gap-4 shadow-sm animate-in shake duration-500">
            <div className="bg-red-100 p-3 rounded-xl shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-red-900 font-bold text-xl mb-1">Something went wrong</h3>
              <p className="text-red-700 text-lg leading-relaxed">{error}</p>
              <button 
                onClick={() => setStatus(AppStatus.IDLE)}
                className="mt-6 px-6 py-2 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-100"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {status === AppStatus.SUCCESS && result && (
          <ExplanationCard data={result} />
        )}
      </main>

      <footer className="mt-auto pt-20 pb-8 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} AI Topic Explainer. Helping students learn better.</p>
      </footer>
    </div>
  );
};

export default App;
