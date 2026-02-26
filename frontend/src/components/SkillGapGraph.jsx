import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip
} from 'recharts';

export default function SkillGapGraph({ data }) {
    if (!data || data.length === 0) return null;

    return (
        <div className="bg-gray-900/80 p-6 rounded-2xl border border-gray-800 shadow-xl mt-8">
            <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Skill Alignment Radar
            </h3>
            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                        <PolarGrid stroke="#374151" />
                        <PolarAngleAxis dataKey="skill" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />

                        <Radar
                            name="Required Level"
                            dataKey="required_level"
                            stroke="#6366f1"
                            fill="#6366f1"
                            fillOpacity={0.2}
                        />
                        <Radar
                            name="Your Level"
                            dataKey="candidate_level"
                            stroke="#10b981"
                            fill="#10b981"
                            fillOpacity={0.6}
                        />

                        <Tooltip
                            contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', borderRadius: '8px' }}
                            itemStyle={{ color: '#E5E7EB' }}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-indigo-500 opacity-50"></div>
                    <span className="text-gray-400">Required Level</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 opacity-80"></div>
                    <span className="text-gray-400">Your Level</span>
                </div>
            </div>
        </div>
    );
}
