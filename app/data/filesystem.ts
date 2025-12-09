import { resumeData } from './resume';
import React from 'react';

export type FileType = 'folder' | 'file' | 'image' | 'pdf';

export interface FileSystemItem {
    id: string;
    name: string;
    type: FileType;
    content?: any; // For text/custom content
    children?: FileSystemItem[];
}

export const fileSystem: FileSystemItem[] = [
    {
        id: 'root',
        name: 'This PC',
        type: 'folder',
        children: [
            {
                id: 'desktop',
                name: 'Desktop',
                type: 'folder',
                children: [
                    { id: 'desk-about', name: 'About Me', type: 'file', content: 'APP:ABOUT' },
                    { id: 'desk-skills', name: 'Skills', type: 'file', content: 'APP:SKILLS' },
                    { id: 'desk-projects', name: 'Projects', type: 'file', content: 'APP:PROJECTS' },
                    { id: 'desk-certs', name: 'Certifications', type: 'file', content: 'APP:CERTS' },
                    { id: 'desk-contact', name: 'Contact', type: 'file', content: 'APP:CONTACT' },
                    { id: 'desk-resume', name: 'Resume.pdf', type: 'pdf', content: '/assets/resume/Aanand Pandit Resume.pdf' },
                    { id: 'desk-github', name: 'GitHub', type: 'file', content: 'URL:https://github.com/AanandPandit' }
                ]
            },
            {
                id: 'documents',
                name: 'Documents',
                type: 'folder',
                children: [
                    {
                        id: 'resume-folder',
                        name: 'Resume',
                        type: 'folder',
                        children: [
                            { id: 'resume-pdf', name: 'Aanand_Pandit_Resume.pdf', type: 'pdf', content: '/assets/resume/Aanand Pandit Resume.pdf' }
                        ]
                    },
                    {
                        id: 'about',
                        name: 'About Me',
                        type: 'file',
                        content: 'APP:ABOUT'
                    }
                ]
            },
            {
                id: 'skills',
                name: 'Skills',
                type: 'folder',
                children: [
                    {
                        id: 'skills-app',
                        name: 'Skills',
                        type: 'file',
                        content: 'APP:SKILLS'
                    }
                ]
            },
            {
                id: 'projects',
                name: 'Projects',
                type: 'folder',
                children: [
                    { id: 'projects-app', name: 'Projects', type: 'file', content: 'APP:PROJECTS' },
                ]
            },
            {
                id: 'certifications',
                name: 'Certifications',
                type: 'folder',
                children: [
                    { id: 'certs-app', name: 'Certifications', type: 'file', content: 'APP:CERTS' }
                ]
            },
            {
                id: 'pictures',
                name: 'Pictures',
                type: 'folder',
                children: [
                    { id: 'profile-pic', name: 'profile.jpg', type: 'image', content: '/assets/images/profile.jpg' }
                ]
            },
        ]
    }
];

export const findItemById = (items: FileSystemItem[], id: string): FileSystemItem | null => {
    for (const item of items) {
        if (item.id === id) return item;
        if (item.children) {
            const found = findItemById(item.children, id);
            if (found) return found;
        }
    }
    return null;
};
