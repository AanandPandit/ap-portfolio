'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface WindowState {
    id: string;
    title: string;
    content: ReactNode;
    icon?: string;
    isMinimized: boolean;
    isMaximized: boolean;
    zIndex: number;
    width?: number | string;
    height?: number | string;
    x?: number;
    y?: number;
}

interface OSContextType {
    windows: WindowState[];
    activeWindowId: string | null;
    addWindow: (window: Partial<WindowState> & { id: string; title: string; content: ReactNode }) => void;
    closeWindow: (id: string) => void;
    minimizeWindow: (id: string) => void;
    restoreWindow: (id: string) => void;
    maximizeWindow: (id: string) => void;
    focusWindow: (id: string) => void;
}

const OSContext = createContext<OSContextType | undefined>(undefined);

export function OSProvider({ children }: { children: ReactNode }) {
    const [windows, setWindows] = useState<WindowState[]>([]);
    const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
    const [nextZIndex, setNextZIndex] = useState(1);

    const focusWindow = (id: string) => {
        setActiveWindowId(id);
        setWindows((prev) =>
            prev.map((win) =>
                win.id === id ? { ...win, zIndex: nextZIndex, isMinimized: false } : win
            )
        );
        setNextZIndex((prev) => prev + 1);
    };

    const addWindow = (windowArgs: Partial<WindowState> & { id: string; title: string; content: ReactNode }) => {
        console.log('addWindow called:', windowArgs.id);
        setWindows((prev) => {
            const existing = prev.find((w) => w.id === windowArgs.id);
            if (existing) {
                console.log('Window exists, focusing:', windowArgs.id);
                focusWindow(existing.id);
                return prev;
            }
            console.log('Creating new window:', windowArgs.id);

            // Calculate cascade position - keep windows in visible area
            const cascadeOffset = 40;
            const baseX = 80;
            const baseY = 60;
            const maxOffsetX = 240; // Max horizontal offset before wrapping
            const maxOffsetY = 120; // Max vertical offset before wrapping (reduced to prevent going below taskbar)
            const windowCount = prev.length;
            const x = windowArgs.x ?? (baseX + (windowCount * cascadeOffset) % maxOffsetX);
            const y = windowArgs.y ?? (baseY + (windowCount * cascadeOffset) % maxOffsetY);

            return [
                ...prev,
                {
                    isMinimized: false,
                    isMaximized: false,
                    zIndex: nextZIndex + 1,
                    x,
                    y,
                    ...windowArgs,
                },
            ];
        });
        setNextZIndex((prev) => prev + 1);
        setActiveWindowId(windowArgs.id);
    };

    const closeWindow = (id: string) => {
        setWindows((prev) => prev.filter((w) => w.id !== id));
        if (activeWindowId === id) {
            setActiveWindowId(null); // Could find next top window
        }
    };

    const minimizeWindow = (id: string) => {
        setWindows((prev) =>
            prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
        );
        if (activeWindowId === id) {
            setActiveWindowId(null);
        }
    };

    const restoreWindow = (id: string) => {
        setWindows((prev) =>
            prev.map((w) => (w.id === id ? { ...w, isMinimized: false } : w))
        );
        focusWindow(id);
    };

    const maximizeWindow = (id: string) => {
        setWindows((prev) =>
            prev.map((w) =>
                w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
            )
        );
        focusWindow(id);
    };

    return (
        <OSContext.Provider
            value={{
                windows,
                activeWindowId,
                addWindow,
                closeWindow,
                minimizeWindow,
                restoreWindow,
                maximizeWindow,
                focusWindow,
            }}
        >
            {children}
        </OSContext.Provider>
    );
}

export function useOS() {
    const context = useContext(OSContext);
    if (context === undefined) {
        throw new Error('useOS must be used within an OSProvider');
    }
    return context;
}
