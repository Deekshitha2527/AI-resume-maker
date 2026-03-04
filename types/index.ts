export interface ResumeFormData {
  name: string;
  email: string;
  phone: string;
  summary: string;
  skills: string;
  experience: string;
  education: string;
  projects: string;
}

export interface Resume {
  id: string;
  user_id?: string;
  name: string;
  email: string;
  content: string;
  created_at: string;
}

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
}
