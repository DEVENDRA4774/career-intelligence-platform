import { useState } from 'react';
import { motion } from 'framer-motion';
import ResumeUploader from './components/ResumeUploader';
import ResultsDashboard from './components/ResultsDashboard';
import LiveStats from './components/LiveStats';

function App() {
  const [results, setResults] = useState(null);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white py-12 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[85rem] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-semibold tracking-wide uppercase shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            AI Career Intelligence v2.0
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 pb-2">
            The Ultimate Candidate OS
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-400 leading-relaxed">
            Upload your profile. Decode your market value. Master the interview. Let agentic AI architect your perfect career trajectory.
          </p>
        </motion.div>

        {!results && <LiveStats />}

        <ResumeUploader onAnalyze={setResults} />

        {results && <ResultsDashboard results={results} />}
      </div>
    </div>
  );
}

export default App;
