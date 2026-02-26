import { useState } from 'react';
import { UploadCloud, FileText, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ResumeUploader({ onAnalyze }) {
    const [file, setFile] = useState(null);
    const [jobDescription, setJobDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !jobDescription) {
            setError('Please provide both a resume (PDF) and a job description.');
            return;
        }

        setError(null);
        setLoading(true);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('job_description', jobDescription);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
            const response = await fetch(`${apiUrl}/analyze`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to analyze resume');
            }

            const result = await response.json();
            onAnalyze(result.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto bg-gray-900/60 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-gray-800"
        >
            <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                Upload Profile Matrix
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                    <div className="relative bg-gray-900 p-6 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-colors">
                        <label className="block text-sm font-medium text-gray-300 mb-4 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-blue-400" />
                            Resume (PDF)
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-xl hover:border-blue-500 transition-colors bg-gray-950/50 cursor-pointer relative overflow-hidden group-hover:bg-gray-900/80">
                            <input id="file-upload" name="file-upload" type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" accept=".pdf" onChange={handleFileChange} />
                            <div className="space-y-2 text-center relative z-0">
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    <UploadCloud className={`mx-auto h-12 w-12 ${file ? 'text-blue-400' : 'text-gray-500'}`} />
                                </motion.div>
                                <div className="flex text-sm text-gray-400 justify-center">
                                    <span className="font-medium text-blue-400 group-hover:text-blue-300">
                                        {file ? file.name : "Click to upload or drag & drop"}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500">PDF up to 10MB</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <label className="block text-sm font-medium text-gray-300 mb-3 ml-1">Target Job Description</label>
                    <textarea
                        rows={6}
                        className="w-full bg-gray-950/50 text-gray-100 p-4 border border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-inner placeholder-gray-600 outline-none resize-none"
                        placeholder="Paste the job requirements here to map your skill gaps..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                    />
                </div>

                <AnimatePresence>
                    {error && (
                        <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-red-400 text-sm bg-red-900/20 p-3 rounded-lg border border-red-900/50"
                        >
                            {error}
                        </motion.p>
                    )}
                </AnimatePresence>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-xl shadow-lg text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 disabled:opacity-50 transition-all duration-300"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Analyzing Profile Fit...
                        </>
                    ) : 'Generate Career Intelligence'}
                </motion.button>
            </form>
        </motion.div>
    );
}
