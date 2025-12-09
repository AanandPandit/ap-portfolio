'use client';

import React, { useEffect } from 'react';
import { useOS } from '@/app/context/OSContext';
import Window from './Window';
import Taskbar from './Taskbar';
import FileExplorer from './FileExplorer';
import ContactApp from '../apps/ContactApp';
import AboutApp from '../apps/AboutApp';
import SkillsApp from '../apps/SkillsApp';
import ProjectsApp from '../apps/ProjectsApp';
import { Monitor, FileText, User, Github, Layers, Code, Mail } from 'lucide-react';


import { resumeData } from '@/app/data/resume';


export default function Desktop() {
    const { windows, addWindow } = useOS();

    // Open "This PC" / File Explorer on load? Or strict desktop?
    // Let's open "Welcome" window maybe?
    useEffect(() => {
        // Auto-open File Explorer
        // addWindow({ id: 'explorer-home', title: 'File Explorer', content: <FileExplorer /> });
    }, []);

    console.log('Desktop rendering, windows count:', windows.length);

    const openExplorer = () => {
        console.log('openExplorer called');
        addWindow({
            id: `explorer-${Date.now()}`,
            title: 'File Explorer',
            content: <FileExplorer initialPathId="root" />,
            icon: 'folder'
        });
    };

    const openProfile = () => {
        // Open About Text
        const content = (
            <div className="w-full h-full bg-[#1e1e1e] text-white p-6 font-mono overflow-auto select-text">
                <h1 className="text-2xl font-bold mb-4">{resumeData.personal.name}</h1>
                <p className="mb-2 text-gray-300">{resumeData.personal.location}</p>
                <p className="mb-4 text-blue-400">{resumeData.personal.email}</p>
                <h2 className="text-xl font-bold mt-6 mb-2">Summary</h2>
                <div className="whitespace-pre-wrap text-sm text-gray-300">
                    {/* We can fetch the 'about' file content here properly later */}
                    Passionate Computer Science student specializing in AI & ML. Experienced with LLMs, RAG, and Computer Vision.
                </div>
            </div>
        );
        addWindow({
            id: 'profile-window',
            title: 'About Me.txt',
            content: content,
            icon: 'file-text'
        });
    };

    return (
        <div className="relative w-full h-screen overflow-hidden text-white"
        // Background handled in globals.css
        >
            {/* Desktop Icons */}
            <div className="absolute top-0 left-0 p-4 flex flex-col gap-6 flex-wrap h-[calc(100vh-48px)] w-24 z-10">
                <DesktopIcon label="This PC" icon={<Monitor size={32} className="text-blue-300" />} onClick={openExplorer} />
                <DesktopIcon label="About Me" icon={<User size={32} className="text-yellow-400" />}
                    onClick={() => addWindow({
                        id: 'about-app-desktop',
                        title: 'About Me',
                        content: <AboutApp />,
                        icon: 'user'
                    })}
                />
                <DesktopIcon label="Skills" icon={<Layers size={32} className="text-purple-400" />}
                    onClick={() => addWindow({
                        id: 'skills-app-desktop',
                        title: 'Skills',
                        content: <SkillsApp />,
                        icon: 'cpu'
                    })}
                />
                <DesktopIcon label="Projects" icon={<Code size={32} className="text-green-400" />}
                    onClick={() => addWindow({
                        id: 'projects-app-desktop',
                        title: 'Projects',
                        content: <ProjectsApp />,
                        icon: 'code',
                        width: 900,
                        height: 700
                    })}
                />
                <DesktopIcon label="Contact" icon={<Mail size={32} className="text-pink-400" />}
                    onClick={() => addWindow({
                        id: 'contact-app',
                        title: 'Contact',
                        content: <ContactApp />,
                        icon: 'mail'
                    })}
                />

                <DesktopIcon label="Resume.pdf" icon={<FileText size={32} className="text-red-400" />}
                    onClick={() => addWindow({
                        id: 'resume-view',
                        title: 'Aanand_Pandit_Resume.pdf',
                        content: <iframe src="/assets/resume/Aanand Pandit Resume.pdf" className="w-full h-full" />,
                        isMaximized: true
                    })}
                />
                <DesktopIcon label="GitHub" icon={<Github size={32} className="text-white" />}
                    onClick={() => window.open(resumeData.personal.links.github, '_blank')}
                />
            </div>

            {/* Windows Area */}
            {windows.map(win => (
                <Window
                    key={win.id}
                    id={win.id}
                    title={win.title}
                    isMinimized={win.isMinimized}
                    isMaximized={win.isMaximized}
                    zIndex={win.zIndex}
                    width={win.width}
                    height={win.height}
                    x={win.x}
                    y={win.y}
                >
                    {win.content}
                </Window>
            ))}

            <Taskbar />
        </div>
    );
}

function DesktopIcon({ label, icon, onClick }: { label: string, icon: React.ReactNode, onClick: () => void }) {
    return (
        <div
            className="flex flex-col items-center gap-1 group w-20 cursor-pointer p-2 rounded hover:bg-white/10 transition-colors"
            onClick={onClick}
        >
            <div className="filter drop-shadow-lg">
                {icon}
            </div>
            <span className="text-xs text-center font-medium drop-shadow-md leading-tight group-hover:text-blue-200">{label}</span>
        </div>
    );
}
