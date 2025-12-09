'use client';

import React from 'react';
import { resumeData } from '@/app/data/resume';
import { MapPin, Mail, School, BookOpen, Quote } from 'lucide-react';

export default function AboutApp() {
    const { name, email, location } = resumeData.personal;
    const { education } = resumeData;

    return (
        <div className="h-full w-full bg-[#1e1e1e] text-white p-8 overflow-auto">
            <div className="max-w-3xl mx-auto space-y-8">

                {/* Header / Profile */}
                <div className="flex flex-col md:flex-row items-center gap-6 border-b border-white/10 pb-8">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/10 shadow-xl bg-gray-800 shrink-0">
                        <img src="/assets/images/profile.jpg" alt={name} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-bold mb-2">{name}</h1>
                        <div className="flex flex-col md:flex-row gap-4 text-gray-400 text-sm">
                            <div className="flex items-center gap-1 justify-center md:justify-start">
                                <MapPin size={14} />
                                <span>{location}</span>
                            </div>
                            <div className="flex items-center gap-1 justify-center md:justify-start">
                                <Mail size={14} />
                                <span>{email}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Summary */}
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Quote size={20} className="text-blue-400" />
                        Professional Summary
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        Passionate Computer Science student specializing in AI & ML. Experienced with LLMs, RAG, and Computer Vision. Dedicated to building innovative solutions that leverage the power of artificial intelligence to solve real-world problems.
                    </p>
                </div>

                {/* Education */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <School size={20} className="text-yellow-400" />
                            Education
                        </h2>
                        <div className="space-y-4">
                            {education.map((edu, idx) => (
                                <div key={idx} className="border-l-2 border-white/10 pl-4">
                                    <h3 className="font-medium text-white">{edu.institution}</h3>
                                    <p className="text-sm text-gray-400">{edu.degree}</p>
                                    <span className="text-xs text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded-full mt-1 inline-block">{edu.year}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Interests/Other */}
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <BookOpen size={20} className="text-green-400" />
                            Core Interests
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {["Generative AI", "AI/ML Engineering", "Data Science", "Robotics", "IoT"].map((tag, i) => (
                                <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition-colors cursor-default">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
