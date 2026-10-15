export interface Project {
  id: string;
  slug: string;
  name: string;
  category: 'Full-Stack' | 'Computer Vision & AI' | 'Enterprise / Systems' | 'Collaboration';
  shortDescription: string;
  problem: string;
  myContribution: string;
  technologies: string[];
  features: string[];
  reportedOutcome?: string;
  repositoryUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
}

export interface ResearchPublication {
  title: string;
  conference: string;
  conferenceShort: string;
  heldDate: string;
  location: string;
  doi: string;
  isbn: string;
  supervisor: string;
  myContributionTitle: string;
  myContributionSummary: string;
  groupContext: string;
  architectureDetails: string[];
  publicationUrl: string;
  authorCertificateUrl?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  affiliationNote?: string;
  employmentType: 'Contract' | 'Internship' | 'Full-time' | 'Pending Confirmation';
  period: string;
  location: string;
  isCurrent: boolean;
  isSoftwareRole: boolean;
  statusVerified: boolean;
  description: string;
  skills: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  specialization: string;
  status: string;
  expectedGraduation: string;
  notes: string[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  dateAwarded?: string;
  credentialId?: string;
  verificationUrl?: string;
  imageUrl?: string;
  category: 'Cloud & Architecture' | 'AI & Machine Learning' | 'Software Engineering' | 'Academic Research';
  description?: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface PersonalProfile {
  name: string;
  role: string;
  headline: string;
  location: string;
  bioParagraphs: string[];
  coreCompetencies: string[];
  githubUrl: string;
  linkedinUrl: string;
  emailPlaceholder: string;
  cvUrlPlaceholder: string;
  profileImageUrl?: string;
}
