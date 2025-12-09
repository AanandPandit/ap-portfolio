'use client';

import React from 'react';
import { resumeData } from '@/app/data/resume';
import { Cpu } from 'lucide-react';

export default function SkillsApp() {
    return (
        <div className="h-full w-full bg-[#1e1e1e] text-white p-8 overflow-auto">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8 text-center">
                    <div className="inline-block p-4 rounded-full bg-purple-500/10 mb-4">
                        <Cpu size={48} className="text-purple-400" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Technical Skills</h1>
                    <p className="text-gray-400">Expertise across multiple domains</p>
                </div>

                <div className="space-y-8">
                    {Object.entries(resumeData.skills).map(([category, skills]) => (
                        <div key={category} className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                            <div className="bg-white/10 px-6 py-3 border-b border-white/10">
                                <h2 className="text-xl font-bold text-purple-300">{category}</h2>
                            </div>
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-white/5 border-b border-white/10">
                                        <th className="text-left p-4 font-semibold text-gray-300 w-12">#</th>
                                        <th className="text-left p-4 font-semibold text-gray-300">Skill</th>
                                        <th className="text-left p-4 font-semibold text-gray-300 w-96">Proficiency</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {skills.map((skill, index) => {
                                        const proficiency = getSkillProficiency(skill, category);
                                        return (
                                            <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                <td className="p-4 text-gray-400">{index + 1}</td>
                                                <td className="p-4 text-white font-medium">{skill}</td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
                                                                style={{ width: `${proficiency}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-sm text-gray-300 w-12 text-right font-semibold">{proficiency}%</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Helper function to assign proficiency based on skill and category
function getSkillProficiency(skill: string, category: string): number {
    // Core languages and frameworks get higher proficiency
    const expertSkills = ['Python', 'PyTorch', 'TensorFlow', 'Flask', 'PyQt', 'OpenCV', 'YOLOv8'];
    const advancedSkills = ['C/C++', 'SQL', 'NumPy', 'Pandas', 'Scikit-learn', 'LangChain', 'Git', 'Docker'];

    if (expertSkills.includes(skill)) return 95;
    if (advancedSkills.includes(skill)) return 85;
    if (category === 'Languages') return 80;
    if (category === 'Frameworks') return 85;
    if (category === 'Libraries') return 80;
    if (category === 'Developer Tools') return 75;
    return 70;
}
