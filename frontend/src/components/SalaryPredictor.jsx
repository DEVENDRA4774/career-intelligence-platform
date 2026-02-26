import { DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

export default function SalaryPredictor({ estimation }) {
    if (!estimation) return null;

    return (
        <div className="bg-gray-900/80 p-6 rounded-2xl border border-gray-800 shadow-xl mt-8">
            <h3 className="text-xl font-bold mb-6 text-emerald-400 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Market Compensation
            </h3>

            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 bg-gray-800/50 p-5 rounded-xl border border-gray-700/50 text-center">
                    <p className="text-sm text-gray-400 mb-2">Expected Salary Range</p>
                    <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                        {estimation.expected_range}
                    </p>
                </div>

                <div className="flex-1 space-y-4">
                    <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <TrendingUp className="w-5 h-5 text-blue-400" />
                            <span className="text-gray-300 font-medium">Market Demand</span>
                        </div>
                        <span className="text-xl font-bold text-white">{estimation.market_demand_score}/100</span>
                    </div>

                    <div className="bg-amber-900/20 p-4 rounded-xl border border-amber-700/30 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-amber-200/80 leading-relaxed">
                            {estimation.alert}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
