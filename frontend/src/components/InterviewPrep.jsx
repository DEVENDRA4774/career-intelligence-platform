import { MessageSquare, Code, CheckCircle } from 'lucide-react';

export default function InterviewPrep({ prep }) {
    if (!prep) return null;

    return (
        <div className="bg-gray-900/80 p-6 rounded-2xl border border-gray-800 shadow-xl mt-8">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-blue-400 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    AI Interview Readiness
                </h3>
                <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs font-semibold rounded-full border border-gray-700">
                    Predicted Difficulty: <span className="text-white">{prep.predicted_difficulty}</span>
                </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                        <Code className="w-4 h-4 text-emerald-400" />
                        Technical Questions
                    </h4>
                    <ul className="space-y-3">
                        {prep.likely_technical_questions?.map((q, idx) => (
                            <li key={idx} className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50 text-sm text-gray-300 flex items-start gap-2 hover:border-emerald-500/30 transition-colors">
                                <span className="text-emerald-500 font-bold mt-0.5">{idx + 1}.</span>
                                {q}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-purple-400" />
                        Behavioral Focus
                    </h4>
                    <ul className="space-y-3">
                        {prep.likely_behavioral_questions?.map((q, idx) => (
                            <li key={idx} className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50 text-sm text-gray-300 flex items-start gap-2 hover:border-purple-500/30 transition-colors">
                                <span className="text-purple-500 font-bold mt-0.5">{idx + 1}.</span>
                                {q}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
