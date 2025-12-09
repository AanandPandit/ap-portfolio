'use client';

import React, { useState } from 'react';
import { fileSystem, FileSystemItem, findItemById } from '@/app/data/filesystem';
import { Folder, FileText, Image as ImageIcon, ChevronRight, ArrowLeft, ArrowUp, Search } from 'lucide-react';
import SkillsApp from '../apps/SkillsApp';
import AboutApp from '../apps/AboutApp';
import CertificationsApp from '../apps/CertificationsApp';
import ProjectsApp from '../apps/ProjectsApp';
import ContactApp from '../apps/ContactApp';
import { useOS } from '@/app/context/OSContext';

interface FileExplorerProps {
    initialPathId?: string;
}


export default function FileExplorer({ initialPathId = 'root' }: FileExplorerProps) {
    const [currentId, setCurrentId] = useState(initialPathId);
    const [history, setHistory] = useState<string[]>([initialPathId]);
    const { addWindow } = useOS();

    const currentItem = findItemById(fileSystem, currentId) || fileSystem[0];
    const children = currentItem.children || [];

    const navigateTo = (id: string) => {
        setHistory([...history, id]);
        setCurrentId(id);
    };

    const navigateUp = () => {
        // Naive implementation: find parent (not efficient but fine for small tree)
        // Actually, history back is easier? Or just "Up" directory?
        // Finding parent in tree:
        const findParent = (items: FileSystemItem[], targetId: string, parentId: string | null = null): string | null => {
            for (const item of items) {
                if (item.id === targetId) return parentId;
                if (item.children) {
                    const found = findParent(item.children, targetId, item.id);
                    if (found) return found;
                }
            }
            return null;
        };

        const parentId = findParent(fileSystem, currentId);
        if (parentId) {
            navigateTo(parentId);
        }
    };

    const handleItemClick = (item: FileSystemItem) => {
        if (item.type === 'folder') {
            navigateTo(item.id);
        } else {
            // Open file
            let contentNode: React.ReactNode;

            if (item.content === 'APP:SKILLS') {
                contentNode = <SkillsApp />;
                addWindow({
                    id: 'skills-app-window',
                    title: 'Skills Certification',
                    content: contentNode,
                    icon: 'cpu',
                    // width: 800, 
                    // height: 600
                });
                return;
            }

            if (item.content === 'APP:ABOUT') {
                contentNode = <AboutApp />;
                addWindow({
                    id: 'about-app-window',
                    title: 'About Me',
                    content: contentNode,
                    icon: 'user',
                    // width: 800,
                    // height: 700
                });
                return;
            }

            if (item.content === 'APP:PROJECTS') {
                contentNode = <ProjectsApp />;
                addWindow({
                    id: 'projects-app-window',
                    title: 'My Projects',
                    content: contentNode,
                    icon: 'code',
                    width: 900,
                    height: 700
                });
                return;
            }

            if (item.content === 'APP:CERTS') {
                contentNode = <CertificationsApp />;
                addWindow({
                    id: 'certs-app-window',
                    title: 'Certifications',
                    content: contentNode,
                    icon: 'award',
                    width: 800,
                    height: 600
                });
                return;
            }

            if (item.content === 'APP:CONTACT') {
                contentNode = <ContactApp />;
                addWindow({
                    id: 'contact-app-window',
                    title: 'Contact',
                    content: contentNode,
                    icon: 'mail',
                    width: 600,
                    height: 500
                });
                return;
            }

            // Handle URL shortcuts
            if (typeof item.content === 'string' && item.content.startsWith('URL:')) {
                const url = item.content.substring(4);
                window.open(url, '_blank');
                return;
            }

            contentNode = <div className="p-4">{item.content}</div>;

            if (item.type === 'image') {
                contentNode = (
                    <div className="flex items-center justify-center h-full bg-black">
                        <img src={item.content} alt={item.name} className="max-h-full max-w-full" />
                    </div>
                );
            } else if (item.type === 'pdf') {
                contentNode = (
                    <iframe src={item.content} className="w-full h-full" />
                );
            } else if (item.type === 'file') {
                contentNode = (
                    <div className="w-full h-full bg-[#1e1e1e] text-white p-4 font-mono whitespace-pre-wrap overflow-auto outline-none" contentEditable spellCheck={false}>
                        {item.content}
                    </div>
                );
            }

            addWindow({
                id: `file-${item.id}`,
                title: item.name,
                content: contentNode,
                icon: item.type
            });
        }
    };

    return (
        <div className="flex flex-col h-full text-white/90 select-none">
            {/* Toolbar */}
            <div className="h-10 border-b border-white/10 flex items-center px-2 gap-2 bg-[#2c2c2c]">
                <div className="flex gap-1">
                    <button onClick={() => history.length > 1 && setCurrentId(history[history.length - 2])} disabled={history.length <= 1} className="p-1 hover:bg-white/10 rounded disabled:opacity-30">
                        <ArrowLeft size={16} />
                    </button>
                    <button onClick={navigateUp} className="p-1 hover:bg-white/10 rounded">
                        <ArrowUp size={16} />
                    </button>
                </div>

                {/* Breadcrumb / Address Bar */}
                <div className="flex-1 bg-[#1c1c1c] border border-white/10 rounded h-7 flex items-center px-2 text-sm">
                    <Folder size={14} className="mr-2 text-yellow-500" />
                    <span>{currentItem.name}</span>
                </div>

                {/* Search */}
                <div className="w-48 bg-[#1c1c1c] border border-white/10 rounded h-7 flex items-center px-2 text-sm text-gray-400">
                    <Search size={12} className="mr-2" />
                    <span>Search {currentItem.name}</span>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-48 border-r border-white/10 bg-[#2b2b2b]/50 pt-2 flex flex-col gap-1 overflow-y-auto">
                    {/* Quick Links can go here, for now just rendering root children recursively or just simplified list */}
                    <SidebarItem item={fileSystem[0]} currentId={currentId} onNavigate={navigateTo} />
                </div>

                {/* Main Content */}
                <div className="flex-1 bg-[#191919] p-4 overflow-y-auto">
                    {children.length === 0 ? (
                        <div className="text-center text-white/30 mt-10">This folder is empty.</div>
                    ) : (
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-4">
                            {children.map(child => (
                                <div key={child.id}
                                    onDoubleClick={() => handleItemClick(child)}
                                    className="group flex flex-col items-center gap-1 p-2 rounded hover:bg-white/10 hover:border hover:border-white/5 border border-transparent cursor-pointer transition-all"
                                >
                                    {child.type === 'folder' ? (
                                        <Folder size={48} className="text-yellow-500 fill-yellow-500/20" />
                                    ) : child.type === 'image' ? (
                                        <ImageIcon size={48} className="text-purple-400" />
                                    ) : (
                                        <FileText size={48} className="text-blue-400" />
                                    )}
                                    <span className="text-xs text-center break-all w-full leading-tight group-hover:text-white text-gray-200">{child.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function SidebarItem({ item, currentId, onNavigate }: { item: FileSystemItem, currentId: string, onNavigate: (id: string) => void }) {
    const isExpanded = true; // Always expanded for now or simpler logic
    const isActive = item.id === currentId;

    return (
        <div className="pl-2">
            <div
                className={`flex items-center gap-1 px-2 py-1 rounded cursor-pointer text-sm ${isActive ? 'bg-white/10 text-blue-300' : 'hover:bg-white/5'}`}
                onClick={() => onNavigate(item.id)}
            >
                {item.type === 'folder' && <ChevronRight size={12} className="text-gray-500" />}
                <Folder size={14} className={isActive ? 'text-blue-400' : 'text-yellow-500'} />
                <span className="truncate">{item.name}</span>
            </div>
            {item.children && item.children.filter(c => c.type === 'folder').map(child => (
                <SidebarItem key={child.id} item={child} currentId={currentId} onNavigate={onNavigate} />
            ))}
        </div>
    );
}
