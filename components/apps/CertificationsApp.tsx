'use client';

import React from 'react';
import { resumeData } from '@/app/data/resume';
import { Award } from 'lucide-react';

export default function CertificationsApp() {
    return (
        <div className="h-full w-full bg-[#1e1e1e] text-white p-8 overflow-auto">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8 text-center">
                    <div className="inline-block p-4 rounded-full bg-yellow-500/10 mb-4">
                        <Award size={48} className="text-yellow-400" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Certifications & Achievements</h1>
                    <p className="text-gray-400">Professional credentials and workshops completed</p>
                </div>

                <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-white/10 border-b border-white/10">
                                <th className="text-left p-4 font-semibold text-gray-300">#</th>
                                <th className="text-left p-4 font-semibold text-gray-300">Certification</th>
                                <th className="text-left p-4 font-semibold text-gray-300">Issuer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resumeData.certifications.map((cert, index) => (
                                <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4 text-gray-400">{index + 1}</td>
                                    <td className="p-4 text-white font-medium">{cert.title}</td>
                                    <td className="p-4 text-blue-300">{cert.issuer}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
