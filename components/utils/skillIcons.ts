import { Code, Database, Globe, Cpu, Layers, Terminal, PenTool, Layout, Server } from 'lucide-react';

export const getSkillIcon = (skillName: string) => {
    const lower = skillName.toLowerCase();
    if (lower.includes('react') || lower.includes('next') || lower.includes('web')) return Globe;
    if (lower.includes('python') || lower.includes('java') || lower.includes('c++')) return Code;
    if (lower.includes('database') || lower.includes('sql')) return Database;
    if (lower.includes('ai') || lower.includes('learning') || lower.includes('tensor')) return Cpu;
    if (lower.includes('design') || lower.includes('ui')) return PenTool;
    if (lower.includes('linux') || lower.includes('bash')) return Terminal;
    return Layers;
};

export const getSkillColor = (skillName: string) => {
    const lower = skillName.toLowerCase();
    if (lower.includes('react')) return 'text-blue-400';
    if (lower.includes('python')) return 'text-yellow-300';
    if (lower.includes('ai') || lower.includes('learning')) return 'text-purple-400';
    return 'text-gray-200';
}
