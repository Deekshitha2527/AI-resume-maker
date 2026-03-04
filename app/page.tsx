import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect('/builder');
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl text-center space-y-8">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          Create a <span className="text-blue-600">Professional Resume</span> with AI
        </h1>
        <p className="text-xl text-gray-500">
          Stop struggling with formatting. Just enter your details, and our AI will generate a tailored, professional resume in seconds.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/signup"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Get Started Free
          </a>
          <a
            href="/login"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
        <div className="p-6 border rounded-xl bg-gray-50">
          <h3 className="text-lg font-bold mb-2">AI-Powered</h3>
          <p className="text-gray-600">Uses advanced language models to write impactful bullet points.</p>
        </div>
        <div className="p-6 border rounded-xl bg-gray-50">
          <h3 className="text-lg font-bold mb-2">Clean Design</h3>
          <p className="text-gray-600">Professionally formatted layouts that recruiters love.</p>
        </div>
        <div className="p-6 border rounded-xl bg-gray-50">
          <h3 className="text-lg font-bold mb-2">Free Forever</h3>
          <p className="text-gray-600">Create and download your resume without any hidden costs.</p>
        </div>
      </div>
    </div>
  );
}
