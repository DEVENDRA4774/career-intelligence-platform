import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Building2, TrendingUp } from 'lucide-react';

export default function LiveStats() {
    const [stats, setStats] = useState({
        total_users_analyzed: 14240,
        companies_visited: 312,
        avg_match_rate: 78
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
                const response = await fetch(`${apiUrl}/stats`);
                if (response.ok) {
                    const data = await response.json();
                    setStats(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch live stats", error);
            }
        };

        fetchStats();
        // Optional: Poll every 30 seconds for new data
        const interval = setInterval(fetchStats, 30000);
        return () => clearInterval(interval);
    }, []);

    const statCards = [
        {
            label: "Total Profiles Analyzed",
            value: stats.total_users_analyzed.toLocaleString(),
            icon: <Users className="w-5 h-5 text-blue-400" />,
            color: "from-blue-500/20 to-indigo-500/20",
            border: "border-blue-500/30"
        },
        {
            label: "Companies Hiring from Platform",
            value: stats.companies_visited.toLocaleString(),
            icon: <Building2 className="w-5 h-5 text-purple-400" />,
            color: "from-purple-500/20 to-pink-500/20",
            border: "border-purple-500/30"
        },
        {
            label: "Avg. Match Rate Discovered",
            value: `${stats.avg_match_rate}%`,
            icon: <TrendingUp className="w-5 h-5 text-emerald-400" />,
            color: "from-emerald-500/20 to-teal-500/20",
            border: "border-emerald-500/30"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            {statCards.map((stat, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className={`bg-gradient-to-br ${stat.color} p-6 rounded-2xl border ${stat.border} backdrop-blur-sm relative overflow-hidden group`}
                >
                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <div className="p-2 bg-gray-900/50 rounded-lg">
                            {stat.icon}
                        </div>
                    </div>
                    <div className="relative z-10">
                        <p className="text-3xl font-extrabold text-white mb-1 group-hover:scale-105 transition-transform origin-left">
                            {stat.value}
                        </p>
                        <p className="text-sm text-gray-400 font-medium">
                            {stat.label}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
