'use client';

import React, { useState, useEffect } from 'react';
import { useOS } from '@/app/context/OSContext';
import { Monitor, Wifi, Volume2, Battery } from 'lucide-react';
import StartMenu from './StartMenu';
import ShutdownModal from './ShutdownModal';

export default function Taskbar() {
    const { windows, activeWindowId, focusWindow, minimizeWindow } = useOS();
    const [time, setTime] = useState(new Date());
    const [startMenuOpen, setStartMenuOpen] = useState(false);
    const [shutdownModalOpen, setShutdownModalOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const handleShutdown = () => {
        // Try to close the window, or redirect to a blank page
        window.close();
        // If window.close() doesn't work (most browsers block it), redirect
        setTimeout(() => {
            window.location.href = 'about:blank';
        }, 100);
    };

    return (
        <>
            <div className="fixed bottom-0 w-full h-12 bg-[#1f1f1f]/90 backdrop-blur-md border-t border-white/10 flex items-center justify-between px-2 z-50 select-none">

                {/* Start & Pinned Apps */}
                <div className="flex items-center gap-1 h-full">
                    <button
                        onClick={() => setStartMenuOpen(!startMenuOpen)}
                        className={`h-10 w-10 flex items-center justify-center hover:bg-white/10 rounded transition-colors group ${startMenuOpen ? 'bg-white/10' : ''}`}
                    >
                        {/* Windows Logo */}
                        <div className="grid grid-cols-2 gap-[2px]">
                            <div className="w-1.5 h-1.5 bg-blue-400 group-hover:bg-blue-300"></div>
                            <div className="w-1.5 h-1.5 bg-blue-400 group-hover:bg-blue-300"></div>
                            <div className="w-1.5 h-1.5 bg-blue-400 group-hover:bg-blue-300"></div>
                            <div className="w-1.5 h-1.5 bg-blue-400 group-hover:bg-blue-300"></div>
                        </div>
                    </button>

                    {/* Separator */}
                    <div className="h-6 w-[1px] bg-white/10 mx-1"></div>

                    {/* Active Windows */}
                    <div className="flex items-center gap-1">
                        {windows.map((win) => (
                            <button
                                key={win.id}
                                onClick={() => {
                                    if (activeWindowId === win.id && !win.isMinimized) {
                                        minimizeWindow(win.id);
                                    } else {
                                        focusWindow(win.id);
                                    }
                                }}
                                className={`
                    h-10 px-3 max-w-[160px] flex items-center gap-2 rounded transition-colors
                    ${activeWindowId === win.id && !win.isMinimized ? 'bg-white/10 border-b-2 border-blue-400' : 'hover:bg-white/5'}
                    ${win.isMinimized ? 'opacity-70' : ''}
                  `}
                            >
                                <div className="w-4 h-4 rounded-sm bg-yellow-500 overflow-hidden flex-shrink-0" />
                                <span className="text-xs truncate text-white/90">{win.title}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* System Tray */}
                <div className="flex items-center gap-2 h-full px-2">
                    <div className="flex items-center gap-2 hover:bg-white/10 p-1 rounded px-2">
                        <Wifi size={16} />
                        <Volume2 size={16} />
                        <Battery size={16} />
                    </div>
                    <div className="flex flex-col items-end justify-center h-full px-2 hover:bg-white/10 rounded cursor-default min-w-[80px]">
                        <span className="text-xs font-medium">{formatTime(time)}</span>
                        <span className="text-[10px] text-white/60">{formatDate(time)}</span>
                    </div>
                </div>
            </div>

            <StartMenu
                isOpen={startMenuOpen}
                onClose={() => setStartMenuOpen(false)}
                onShutdown={() => {
                    setStartMenuOpen(false);
                    setShutdownModalOpen(true);
                }}
            />

            <ShutdownModal
                isOpen={shutdownModalOpen}
                onConfirm={handleShutdown}
                onCancel={() => setShutdownModalOpen(false)}
            />
        </>
    );
}
