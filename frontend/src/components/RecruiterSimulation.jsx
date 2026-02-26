import { Eye, Clock, AlertTriangle } from 'lucide-react';

export default function RecruiterSimulation({ simulation }) {
    if (!simulation) return null;

    return (
        <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 p-6 rounded-2xl border border-indigo-500/30 shadow-xl relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>

            <h3 className="text-xl font-bold mb-6 text-indigo-300 flex items-center gap-2 relative z-10">
                <Eye className="w-5 h-5" />
                Recruiter POV Simulation
            </h3>

            <div className="space-y-4 relative z-10">
                <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700/50">
                    <div className="flex items-start gap-3">
                        <div className="mt-1 bg-blue-500/20 p-2 rounded-lg">
                            <Eye className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-300 mb-1">First Impression (0-3s)</p>
                            <p className="text-gray-400 text-sm leading-relaxed">{simulation.first_impression}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700/50">
                    <div className="flex items-start gap-3">
                        <div className="mt-1 bg-amber-500/20 p-2 rounded-lg">
                            <AlertTriangle className="w-4 h-4 text-amber-400" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-300 mb-1">Loss of Interest Points</p>
                            <p className="text-gray-400 text-sm leading-relaxed">{simulation.loss_of_interest}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700/50">
                    <div className="flex items-center gap-3">
                        <div className="bg-emerald-500/20 p-2 rounded-lg">
                            <Clock className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-300">Est. Screening Time</p>
                            <p className="text-lg font-bold text-white">{simulation.estimated_screening_time}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
