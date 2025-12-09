'use client';

import React from 'react';
import { useOS } from '@/app/context/OSContext';
import { Layers, Code, User, Mail, Award, Power, RotateCw } from 'lucide-react';
import SkillsApp from '../apps/SkillsApp';
import ProjectsApp from '../apps/ProjectsApp';
import AboutApp from '../apps/AboutApp';
import ContactApp from '../apps/ContactApp';
import CertificationsApp from '../apps/CertificationsApp';

interface StartMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onShutdown: () => void;
}

export default function StartMenu({ isOpen, onClose, onShutdown }: StartMenuProps) {
    const { addWindow } = useOS();

    if (!isOpen) return null;

    const apps = [
        { name: 'Skills', icon: <Layers size={20} />, component: <SkillsApp />, color: 'text-purple-400' },
        { name: 'Projects', icon: <Code size={20} />, component: <ProjectsApp />, color: 'text-green-400', width: 900, height: 700 },
        { name: 'About Me', icon: <User size={20} />, component: <AboutApp />, color: 'text-yellow-400' },
        { name: 'Contact', icon: <Mail size={20} />, component: <ContactApp />, color: 'text-pink-400' },
        { name: 'Certifications', icon: <Award size={20} />, component: <CertificationsApp />, color: 'text-yellow-300', width: 800, height: 600 },
    ];

    const handleAppClick = (app: typeof apps[0]) => {
        addWindow({
            id: `${app.name.toLowerCase().replace(' ', '-')}-start-menu`,
            title: app.name,
            content: app.component,
            icon: app.name.toLowerCase(),
            width: app.width,
            height: app.height,
        });
        onClose();
    };

    const handleReload = () => {
        window.location.reload();
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40"
                onClick={onClose}
            />

            {/* Start Menu */}
            <div className="fixed bottom-12 left-0 z-50 w-80 bg-[#1e1e1e]/95 backdrop-blur-xl border border-white/10 rounded-tr-xl shadow-2xl">
                {/* Apps List */}
                <div className="p-4">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Applications</h3>
                    <div className="space-y-1">
                        {apps.map((app) => (
                            <button
                                key={app.name}
                                onClick={() => handleAppClick(app)}
                                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-left group"
                            >
                                <div className={`${app.color}`}>{app.icon}</div>
                                <span className="text-white font-medium group-hover:text-blue-300">{app.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10" />

                {/* System Actions */}
                <div className="p-4 space-y-1">
                    <button
                        onClick={handleReload}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600/20 transition-colors text-left group"
                    >
                        <RotateCw size={20} className="text-blue-400" />
                        <span className="text-white font-medium group-hover:text-blue-300">Reload</span>
                    </button>
                    <button
                        onClick={onShutdown}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-600/20 transition-colors text-left group"
                    >
                        <Power size={20} className="text-red-400" />
                        <span className="text-white font-medium group-hover:text-red-300">Shutdown</span>
                    </button>
                </div>
            </div>
        </>
    );
}
