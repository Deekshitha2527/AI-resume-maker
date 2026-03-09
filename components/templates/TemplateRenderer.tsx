import dynamic from 'next/dynamic';
import { ResumeContent } from "@/types";

const Geometric = dynamic(() => import("./Geometric"));
const Impact = dynamic(() => import("./Impact"));
const ModernBasic = dynamic(() => import("./ModernBasic"));
const CleanElegant = dynamic(() => import("./CleanElegant"));
const BoldExecutive = dynamic(() => import("./BoldExecutive"));
const TripleBlock = dynamic(() => import("./TripleBlock"));
const SocialClean = dynamic(() => import("./SocialClean"));
const VibrantYellow = dynamic(() => import("./VibrantYellow"));
const TechSpecialist = dynamic(() => import("./TechSpecialist"));
const Architect = dynamic(() => import("./Architect"));

interface TemplateRendererProps {
    templateId: string;
    data: ResumeContent;
}

export default function TemplateRenderer({ templateId, data }: TemplateRendererProps) {
    switch (templateId) {
        case 'geometric':
            return <Geometric data={data} />;
        case 'impact':
            return <Impact data={data} />;
        case 'modern-basic':
            return <ModernBasic data={data} />;
        case 'clean-elegant':
            return <CleanElegant data={data} />;
        case 'bold-executive':
            return <BoldExecutive data={data} />;
        case 'triple-block':
            return <TripleBlock data={data} />;
        case 'social-clean':
            return <SocialClean data={data} />;
        case 'vibrant-yellow':
            return <VibrantYellow data={data} />;
        case 'tech-spec':
            return <TechSpecialist data={data} />;
        case 'architect':
            return <Architect data={data} />;
        default:
            return <ModernBasic data={data} />;
    }
}
