'use client';

import React from 'react';
import { resumeData } from '@/app/data/resume';
import { Mail, Phone, ExternalLink, Github, MessageCircle, Linkedin } from 'lucide-react';

export default function ContactApp() {
    const { email, phone, links } = resumeData.personal;

    // Format phone for WhatsApp (remove spaces/dashes)
    const waNumber = phone.replace(/\D/g, '');
    // Add country code if missing (assuming India +91 base on resume location)
    const fullWaNumber = waNumber.length === 10 ? `91${waNumber}` : waNumber;

    return (
        <div className="h-full w-full bg-[#1e1e1e] flex flex-col items-center justify-center p-6 text-white">
            <div className="max-w-md w-full bg-white/5 p-8 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-sm">
                <h1 className="text-3xl font-bold mb-6 text-center">Contact Me</h1>

                <div className="space-y-4">
                    <a href={`mailto:${email}`} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-blue-500/20 hover:border-blue-500/50 border border-transparent transition-all group cursor-pointer">
                        <div className="p-3 rounded-full bg-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                            <Mail size={24} />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-200">Email</h3>
                            <p className="text-sm text-gray-400">{email}</p>
                        </div>
                        <ExternalLink size={16} className="text-gray-500 group-hover:text-white" />
                    </a>

                    <a href={`https://wa.me/${fullWaNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-green-500/20 hover:border-green-500/50 border border-transparent transition-all group cursor-pointer">
                        <div className="p-3 rounded-full bg-green-500/20 text-green-400 group-hover:bg-green-500 group-hover:text-white transition-colors">
                            <MessageCircle size={24} />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-200">WhatsApp</h3>
                            <p className="text-sm text-gray-400">{phone}</p>
                        </div>
                        <ExternalLink size={16} className="text-gray-500 group-hover:text-white" />
                    </a>

                    <a href={links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-gray-500/20 hover:border-gray-500/50 border border-transparent transition-all group cursor-pointer">
                        <div className="p-3 rounded-full bg-white/10 text-white group-hover:bg-white group-hover:text-black transition-colors">
                            <Github size={24} />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-200">GitHub</h3>
                            <p className="text-sm text-gray-400">View Profile</p>
                        </div>
                        <ExternalLink size={16} className="text-gray-500 group-hover:text-white" />
                    </a>

                    {links.linkedin && (
                        <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-blue-600/20 hover:border-blue-600/50 border border-transparent transition-all group cursor-pointer">
                            <div className="p-3 rounded-full bg-blue-600/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <Linkedin size={24} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-200">LinkedIn</h3>
                                <p className="text-sm text-gray-400">View Profile</p>
                            </div>
                            <ExternalLink size={16} className="text-gray-500 group-hover:text-white" />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
