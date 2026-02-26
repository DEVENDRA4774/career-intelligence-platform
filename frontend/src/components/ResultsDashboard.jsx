import { motion } from 'framer-motion';
import { Target, CheckCircle2 } from 'lucide-react';
import SkillGapGraph from './SkillGapGraph';
import RecruiterSimulation from './RecruiterSimulation';
import SalaryPredictor from './SalaryPredictor';
import InterviewPrep from './InterviewPrep';

export default function ResultsDashboard({ results }) {
    if (!results) return null;

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-w-6xl mx-auto mt-12 bg-gray-900/60 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-gray-800"
        >
            {/* Header Section */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center justify-between mb-8 pb-6 border-b border-gray-800 gap-6">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Analysis Matrix</h2>
                    <p className="text-gray-400">Deep career intelligence based on your profile and target role.</p>
                </div>

                <div className="flex items-center gap-6 bg-gray-950/50 p-4 rounded-2xl border border-gray-800">
                    <div className="text-center">
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Overall Match</p>
                        <div className={`text-4xl font-extrabold ${results.match_scores?.overall >= 80 ? 'text-emerald-400' :
                            results.match_scores?.overall >= 60 ? 'text-blue-400' : 'text-purple-400'
                            }`}>
                            {results.match_scores?.overall || 0}%
                        </div>
                    </div>
                    <div className="h-12 w-px bg-gray-800"></div>
                    <div className="flex gap-4">
                        <div className="text-center">
                            <p className="text-[10px] text-gray-500 uppercase">Skills</p>
                            <p className="text-lg font-bold text-blue-300">{results.match_scores?.skills || 0}%</p>
                        </div>
                        <div className="text-center">
                            <p className="text-[10px] text-gray-500 uppercase">Exp</p>
                            <p className="text-lg font-bold text-indigo-300">{results.match_scores?.experience || 0}%</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Executive Summary */}
            <motion.div variants={itemVariants} className="mb-8 p-6 bg-gradient-to-r from-blue-900/20 to-indigo-900/20 rounded-2xl border border-blue-500/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-400 to-indigo-500"></div>
                <h3 className="text-xl font-semibold mb-3 text-blue-300 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Executive Summary
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">{results.summary}</p>
            </motion.div>

            {/* Top Grid: Radar & Recruiter Sim */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <motion.div variants={itemVariants} className="h-full">
                    <SkillGapGraph data={results.skill_gap} />
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col gap-8 h-full">
                    <RecruiterSimulation simulation={results.recruiter_simulation} />

                    {/* Missing Skills Quick List */}
                    <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700/50 flex-grow">
                        <h4 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                            Critical Missing Nodes
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {results.missing_skills?.map((skill, index) => (
                                <span key={index} className="px-3 py-1.5 bg-rose-900/20 text-rose-300 rounded-lg border border-rose-800/50 text-sm font-medium">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Middle Grid: Salary & Course Suggestions */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <motion.div variants={itemVariants}>
                    <SalaryPredictor estimation={results.salary_prediction} />
                </motion.div>

                <motion.div variants={itemVariants} className="bg-emerald-900/10 p-6 rounded-2xl border border-emerald-500/20 shadow-xl mt-8">
                    <h3 className="text-xl font-bold mb-6 text-emerald-400 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        Bridging the Gap
                    </h3>
                    <ul className="space-y-3">
                        {results.course_suggestions?.map((course, index) => (
                            <li key={index} className="flex items-start bg-gray-900/50 p-4 rounded-xl border border-gray-700 hover:border-emerald-500/40 transition-all duration-300 group">
                                <div className="bg-emerald-500/20 p-1.5 rounded-lg mr-4 mt-0.5 group-hover:bg-emerald-500/30 transition-colors">
                                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </div>
                                <span className="text-gray-300 font-medium leading-relaxed">{course}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>

            {/* Bottom Section: Interview Prep */}
            <motion.div variants={itemVariants}>
                <InterviewPrep prep={results.interview_prep} />
            </motion.div>

        </motion.div>
    );
}
