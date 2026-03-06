"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ResumeContent, PersonalInfo, Experience, Education, Skill, Project } from '@/types';

interface ResumeContextType {
    data: ResumeContent;
    setTemplateId: (id: string) => void;
    updatePersonalInfo: (data: Partial<PersonalInfo>) => void;
    updateSummary: (summary: string) => void;
    addExperience: (exp: Experience) => void;
    updateExperience: (id: string, exp: Partial<Experience>) => void;
    removeExperience: (id: string) => void;
    addEducation: (edu: Education) => void;
    updateEducation: (id: string, edu: Partial<Education>) => void;
    removeEducation: (id: string) => void;
    addSkill: (skill: Skill) => void;
    updateSkill: (id: string, skill: Partial<Skill>) => void;
    removeSkill: (id: string) => void;
    addProject: (proj: Project) => void;
    updateProject: (id: string, proj: Partial<Project>) => void;
    removeProject: (id: string) => void;
}

const defaultData: ResumeContent = {
    templateId: 'modern',
    personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<ResumeContent>(defaultData);

    const setTemplateId = (templateId: string) => {
        setData((prev) => ({ ...prev, templateId }));
    };

    const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
        setData((prev) => ({ ...prev, personalInfo: { ...prev.personalInfo, ...info } }));
    };

    const updateSummary = (summary: string) => {
        setData((prev) => ({ ...prev, summary }));
    };

    const addExperience = (exp: Experience) => {
        setData((prev) => ({ ...prev, experience: [...prev.experience, exp] }));
    };

    const updateExperience = (id: string, exp: Partial<Experience>) => {
        setData((prev) => ({
            ...prev,
            experience: prev.experience.map((e) => (e.id === id ? { ...e, ...exp } : e)),
        }));
    };

    const removeExperience = (id: string) => {
        setData((prev) => ({
            ...prev,
            experience: prev.experience.filter((e) => e.id !== id),
        }));
    };

    const addEducation = (edu: Education) => {
        setData((prev) => ({ ...prev, education: [...prev.education, edu] }));
    };

    const updateEducation = (id: string, edu: Partial<Education>) => {
        setData((prev) => ({
            ...prev,
            education: prev.education.map((e) => (e.id === id ? { ...e, ...edu } : e)),
        }));
    };

    const removeEducation = (id: string) => {
        setData((prev) => ({
            ...prev,
            education: prev.education.filter((e) => e.id !== id),
        }));
    };

    const addSkill = (skill: Skill) => {
        setData((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
    };

    const updateSkill = (id: string, skill: Partial<Skill>) => {
        setData((prev) => ({
            ...prev,
            skills: prev.skills.map((s) => (s.id === id ? { ...s, ...skill } : s)),
        }));
    };

    const removeSkill = (id: string) => {
        setData((prev) => ({
            ...prev,
            skills: prev.skills.filter((s) => s.id !== id),
        }));
    };

    const addProject = (proj: Project) => {
        setData((prev) => ({ ...prev, projects: [...prev.projects, proj] }));
    };

    const updateProject = (id: string, proj: Partial<Project>) => {
        setData((prev) => ({
            ...prev,
            projects: prev.projects.map((p) => (p.id === id ? { ...p, ...proj } : p)),
        }));
    };

    const removeProject = (id: string) => {
        setData((prev) => ({
            ...prev,
            projects: prev.projects.filter((p) => p.id !== id),
        }));
    };

    return (
        <ResumeContext.Provider
            value={{
                data,
                setTemplateId,
                updatePersonalInfo,
                updateSummary,
                addExperience,
                updateExperience,
                removeExperience,
                addEducation,
                updateEducation,
                removeEducation,
                addSkill,
                updateSkill,
                removeSkill,
                addProject,
                updateProject,
                removeProject,
            }}
        >
            {children}
        </ResumeContext.Provider>
    );
}

export function useResumeContext() {
    const context = useContext(ResumeContext);
    if (context === undefined) {
        throw new Error('useResumeContext must be used within a ResumeProvider');
    }
    return context;
}
