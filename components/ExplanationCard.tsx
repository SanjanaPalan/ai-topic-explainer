
import React from 'react';
import { ExplanationData } from '../types';

interface ExplanationCardProps {
  data: ExplanationData;
}

const ExplanationCard: React.FC<ExplanationCardProps> = ({ data }) => {
  return (
    <div className="w-full max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-indigo-600 px-8 py-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {data.topic}
          </h2>
          <p className="text-indigo-100 mt-1 opacity-90">Learning simplified for you.</p>
        </div>
        
        <div className="p-8 space-y-10">
          {/* Section 1: Simple Explanation */}
          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800">1. Simple Explanation</h3>
            </div>
            <p className="text-slate-600 leading-relaxed text-lg pl-11">
              {data.simpleExplanation}
            </p>
          </section>

          {/* Section 2: Real-life Example */}
          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800">2. Real-life Example</h3>
            </div>
            <p className="text-slate-600 leading-relaxed text-lg pl-11 bg-slate-50 p-4 rounded-xl border-l-4 border-emerald-400">
              {data.realLifeExample}
            </p>
          </section>

          {/* Section 3: Importance */}
          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="bg-amber-100 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800">3. Why This Concept Is Important</h3>
            </div>
            <p className="text-slate-600 leading-relaxed text-lg pl-11">
              {data.importance}
            </p>
          </section>
        </div>
        
        <div className="bg-slate-50 border-t border-slate-100 px-8 py-4 text-center">
          <p className="text-slate-400 text-sm italic">Always keep exploring!</p>
        </div>
      </div>
    </div>
  );
};

export default ExplanationCard;
