'use client';

import React, { useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { X, Minus, Square, Copy } from 'lucide-react';
import { useOS } from '@/app/context/OSContext';

interface WindowProps {
    id: string;
    title: string;
    children: React.ReactNode;
    isMinimized: boolean;
    isMaximized: boolean;
    zIndex: number;
    width?: number | string;
    height?: number | string;
    x?: number;
    y?: number;
}

export default function Window({ id, title, children, isMinimized, isMaximized, zIndex, width = 800, height = 500, x = 100, y = 80 }: WindowProps) {
    const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, activeWindowId } = useOS();
    const isActive = activeWindowId === id;
    const constraintsRef = useRef(null);
    const dragControls = useDragControls();

    if (isMinimized) return null;

    const initialWidth = typeof width === 'number' ? `${width}px` : width;
    const initialHeight = typeof height === 'number' ? `${height}px` : height;

    return (
        <motion.div
            drag={!isMaximized}
            dragListener={false}
            dragControls={dragControls}
            dragMomentum={false}
            initial={{ scale: 0.9, opacity: 0, x, y }}
            animate={{
                scale: 1,
                opacity: 1,
                y: isMaximized ? 0 : undefined,
                x: isMaximized ? 0 : undefined,
                width: isMaximized ? '100vw' : initialWidth,
                height: isMaximized ? 'calc(100vh - 48px)' : initialHeight,
                top: isMaximized ? 0 : y,
                left: isMaximized ? 0 : x
            }}
            style={{
                position: isMaximized ? 'fixed' : 'absolute',
                zIndex,
                // Center initial position if not maximized
                left: !isMaximized ? `calc(50vw - (${typeof width === 'number' ? width / 2 : 400}px) + ${Math.random() * 40 - 20}px)` : 0,
                top: !isMaximized ? `calc(50vh - (${typeof height === 'number' ? height / 2 : 250}px) + ${Math.random() * 40 - 20}px)` : 0,
            }}
            onMouseDown={() => focusWindow(id)}
            className={`
        flex flex-col bg-[#202020]/80 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden
        ${isActive ? 'ring-1 ring-white/20' : ''}
        transition-shadow duration-200
      `}
        >
            {/* Title Bar */}
            <div
                className="h-9 flex items-center justify-between px-2 select-none bg-white/5 cursor-move"
                onPointerDown={(e) => {
                    if (!isMaximized) {
                        dragControls.start(e);
                    }
                }}
                onDoubleClick={() => maximizeWindow(id)}
            >
                <div className="flex items-center gap-2 pl-2 text-xs font-medium text-white/90">
                    <img src="/assets/icons/folder.png" alt="" className="w-4 h-4 opacity-80" onError={(e) => e.currentTarget.style.display = 'none'} />
                    {/* Fallback icon if img fails, maybe Lucide icon? */}
                    {/* If fails, we can put a lucide icon next to text */}
                    <span>{title}</span>
                </div>
                <div className="flex items-center h-full">
                    <button onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }} className="h-full px-4 hover:bg-white/10 flex items-center justify-center transition-colors">
                        <Minus size={14} />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); maximizeWindow(id); }} className="h-full px-4 hover:bg-white/10 flex items-center justify-center transition-colors">
                        {isMaximized ? <Copy size={12} /> : <Square size={12} />}
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); closeWindow(id); }} className="h-full px-4 hover:bg-red-500 flex items-center justify-center transition-colors">
                        <X size={14} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto bg-[#191919]/90 relative">
                {children}
            </div>
        </motion.div>
    );
}
