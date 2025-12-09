'use client';

import React, { useState } from 'react';
import { resumeData } from '@/app/data/resume';
import { Github, ExternalLink, Play, ChevronRight, Monitor, Calendar, X, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectsApp() {
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
    const [videoModalOpen, setVideoModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const selectedProject = resumeData.projects[selectedProjectIndex];

    const getYoutubeId = (url: string) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const isGoogleDrive = (url: string) => {
        return url && url.includes('drive.google.com');
    }

    const getEmbedUrl = (url: string) => {
        if (!url) return null;
        const youtubeId = getYoutubeId(url);
        if (youtubeId) return `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
        if (isGoogleDrive(url)) {
            return url.replace(/\/view.*$/, '/preview');
        }
        return url;
    }

    const currentVideoId = selectedProject.links.demo ? getYoutubeId(selectedProject.links.demo) : null;
    const isVideoAvailable = !!selectedProject.links.demo;

    // Thumbnail Strategy:
    // 1. YouTube Thumbnail
    // 2. First Image in Gallery
    // 3. Fallback
    const thumbnailUrl = currentVideoId
        ? `https://img.youtube.com/vi/${currentVideoId}/maxresdefault.jpg`
        : (selectedProject.images && selectedProject.images.length > 0 ? selectedProject.images[0] : null);

    return (
        <div className="flex h-full w-full bg-[#1e1e1e] text-white overflow-hidden">
            {/* Left Side: Detailed View */}
            <div className="flex-1 flex flex-col p-6 overflow-y-auto border-r border-white/10">
                <motion.div
                    key={selectedProjectIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col h-full"
                >
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-blue-300 mb-2">{selectedProject.title}</h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-1"><Calendar size={14} /> {selectedProject.date}</span>
                            <span className="px-2 py-0.5 bg-white/10 rounded-full text-xs text-gray-300 border border-white/10">{selectedProject.tech}</span>
                            {(selectedProject as any).achievement && (
                                <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-300 border border-yellow-500/50 rounded-full text-xs font-semibold flex items-center gap-1 shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                                    {(selectedProject as any).achievement}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Media Preview (Main) */}
                    <div className="w-full aspect-video bg-black/40 rounded-xl overflow-hidden mb-6 relative group border border-white/10 shrink-0">
                        {thumbnailUrl ? (
                            <>
                                <img src={thumbnailUrl} alt={selectedProject.title} className="w-full h-full object-cover opacity-80" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    {isVideoAvailable && (
                                        <button
                                            onClick={() => setVideoModalOpen(true)}
                                            className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer relative z-10"
                                        >
                                            <Play size={28} className="fill-white text-white ml-1" />
                                        </button>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-white/20 gap-2">
                                <Monitor size={48} />
                                <span className="text-sm">No Preview Available</span>
                            </div>
                        )}
                    </div>

                    {/* Image Gallery */}
                    {selectedProject.images && selectedProject.images.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2"><ImageIcon size={14} /> Gallery</h3>
                            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                {selectedProject.images.map((img, idx) => (
                                    <button key={idx} onClick={() => setSelectedImage(img)} className="w-32 h-20 rounded-lg overflow-hidden border border-white/10 shrink-0 hover:border-blue-500 transition-colors relative">
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}


                    {/* Description */}
                    <div className="bg-white/5 rounded-xl p-5 border border-white/5 mb-6 flex-1">
                        <h3 className="font-semibold mb-3 text-lg flex items-center gap-2">
                            Project Details
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-300 leading-relaxed">
                            {selectedProject.description.map((desc, i) => (
                                <li key={i}>{desc}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 mt-auto">
                        {selectedProject.links.github && (
                            <a href={selectedProject.links.github} target="_blank" rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#24292e] rounded-lg hover:bg-[#2f363d] transition-colors font-medium border border-white/10">
                                <Github size={18} /> View Source
                            </a>
                        )}
                        {selectedProject.links.demo && (
                            <a href={selectedProject.links.demo} target="_blank" rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg shadow-blue-500/20">
                                <ExternalLink size={18} /> Live Demo / Video
                            </a>
                        )}
                    </div>

                </motion.div>
            </div>

            {/* Right Side: List of Projects */}
            <div className="w-72 bg-[#151515] overflow-y-auto flex flex-col">
                <div className="p-4 border-b border-white/5 sticky top-0 bg-[#151515] z-10">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">All Projects</h2>
                </div>
                <div className="flex flex-col p-2 gap-1">
                    {resumeData.projects.map((project, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedProjectIndex(index)}
                            className={`w-full text-left p-3 rounded-lg flex items-center justify-between text-sm transition-all group ${selectedProjectIndex === index
                                ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                                : 'hover:bg-white/5 text-gray-400 border border-transparent'
                                }`}
                        >
                            <span className="font-medium truncate pr-2">{project.title}</span>
                            {selectedProjectIndex === index && <ChevronRight size={14} />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Video Modal Overlay */}
            <AnimatePresence>
                {videoModalOpen && isVideoAvailable && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 p-8"
                        onClick={() => setVideoModalOpen(false)}
                    >
                        <div className="w-full h-full max-w-5xl bg-black rounded-lg overflow-hidden border border-white/20 shadow-2xl relative">
                            <iframe
                                width="100%"
                                height="100%"
                                src={getEmbedUrl(selectedProject.links.demo) || ''}
                                title="Deomo Video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="border-0"
                            />
                            <button
                                onClick={(e) => { e.stopPropagation(); setVideoModalOpen(false); }}
                                className="absolute top-4 right-4 bg-black/50 hover:bg-white/20 p-2 rounded-full text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Image Modal Overlay */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 p-8"
                        onClick={() => setSelectedImage(null)}
                    >
                        <div className="relative max-w-5xl max-h-full">
                            <img src={selectedImage} alt="Project Preview" className="max-w-full max-h-[90vh] rounded-lg shadow-2xl border border-white/10" />
                            <button
                                onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                                className="absolute top-4 right-4 bg-black/50 hover:bg-white/20 p-2 rounded-full text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
