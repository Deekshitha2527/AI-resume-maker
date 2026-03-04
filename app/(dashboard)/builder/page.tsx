import ResumeForm from '@/components/ResumeForm';

export default function BuilderPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6 px-4">
            <div className="text-center md:text-left space-y-2">
                <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
                <p className="text-gray-600">
                    Fill in your details below. Our AI will craft a professional resume for you.
                </p>
            </div>

            <ResumeForm />
        </div>
    );
}
