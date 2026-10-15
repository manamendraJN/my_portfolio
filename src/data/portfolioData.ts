import {
  PersonalProfile,
  Project,
  ResearchPublication,
  ExperienceItem,
  EducationItem,
  CertificateItem,
  SkillGroup,
} from '../types/portfolio';

export const personalProfile: PersonalProfile = {
  name: 'Navodya Manamendra',
  role: 'Software Engineer & Full-Stack Developer',
  headline: 'Engineering software. Exploring intelligence. Building what matters.',
  location: 'Colombo, Western Province, Sri Lanka',
  bioParagraphs: [
    "I'm a passionate Full Stack Developer and Software Engineer currently pursuing a BSc (Hons) in Information Technology at the Sri Lanka Institute of Information Technology (SLIIT). I enjoy designing and developing practical software solutions that solve real-world problems and improve business processes.",
    "My experience spans developing web-based systems, engineering business software, building computer vision applications, and working on AI-powered research. I'm especially interested in reliable software architecture, emerging technologies, disciplined problem-solving, and intelligent applications.",
    "My goal is to continue growing as a well-rounded Software Engineer and AI Developer capable of designing, developing, and deploying reliable, scalable, and intelligent software systems."
  ],
  coreCompetencies: [
    'Full-Stack Web Architecture',
    'Computer Vision & MediaPipe',
    'Deep Learning Research (EfficientNet-B3)',
    'Business Process Systems',
    'REST APIs & Microservice Patterns',
    'Cloud Fundamentals (AWS Academy Graduate)'
  ],
  githubUrl: 'https://github.com/manamendraJN',
  linkedinUrl: 'https://www.linkedin.com/in/navodya-manamendra-35a309248/',
  emailPlaceholder: 'navodya.manamendra@example.com',
  cvUrlPlaceholder: '#',
  profileImageUrl: '' // ImageKit URL placeholder
};

export const educationData: EducationItem = {
  degree: 'Bachelor of Science (Honours) in Information Technology',
  institution: 'Sri Lanka Institute of Information Technology (SLIIT)',
  specialization: 'Information Technology',
  status: 'Undergraduate — Fourth Year',
  expectedGraduation: '[Date to be confirmed]',
  notes: [
    'Coursework encompassing Object-Oriented Software Engineering, Data Structures & Algorithms, Distributed Systems, Database Management, and Artificial Intelligence.',
    'Undergraduate research in multimodal AI for personal apparel and anthropometric body measurement under faculty supervision.'
  ]
};

export const researchPublication: ResearchPublication = {
  title: 'Temporal Personal Fashion AI System with Multi-Component Integration',
  conference: '2026 IEEE International Research Conference on Smart Computing and Systems Engineering (SCSE 2026)',
  conferenceShort: 'IEEE SCSE 2026',
  heldDate: '26 March 2026',
  location: 'University of Kelaniya, Sri Lanka',
  doi: '10.1109/SCSE70081.2026.11499770',
  isbn: '979-8-3315-4791-2',
  supervisor: 'Mr. S M B Harshanath, SLIIT',
  myContributionTitle: 'Dual-View Anthropometric Measurement System and Garment Size Recommendation',
  myContributionSummary:
    'A deep learning-based module that extracts body measurements from front and side photographs using an EfficientNet-B3 backbone. The extracted measurements feed a custom scoring algorithm that evaluates compatibility between body measurements and available garment sizes, applies weighted aggregation, and generates confidence-rated recommendations with personalized fit advice.',
  groupContext:
    'This module was engineered as part of a 4-component integrated research initiative alongside Temporal Wardrobe Intelligence, Personalized Accessories Recommendation, and Integrated Grooming Recommendation modules.',
  architectureDetails: [
    'Dual-perspective input processing (orthogonal front and sagittal side photographs).',
    'Feature extraction powered by an EfficientNet-B3 convolutional neural network backbone.',
    'Mathematical anthropometric estimation converting pixel keypoint distances to metric body measurements.',
    'Weighted garment fit compatibility scoring with confidence rating and personalized recommendation output.'
  ],
  publicationUrl: 'https://doi.org/10.1109/SCSE70081.2026.11499770',
  authorCertificateUrl: ''
};

export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-dialog',
    role: 'Broadcast Ad Insertion & Playout Operator',
    organization: 'Dialog Axiata PLC',
    affiliationNote: 'Undertaken through recruitment assignment with Sara Creation',
    employmentType: 'Contract',
    period: 'May 2026 – Present',
    location: 'Colombo District, Western Province, Sri Lanka',
    isCurrent: true,
    isSoftwareRole: false,
    statusVerified: true,
    description:
      'Supported television advertisement insertion operations, commercial playout, server operations, and broadcast advertisement management for satellite television services across mission-critical broadcast infrastructure.',
    skills: [
      'Broadcast Operations',
      'Ad Insertion',
      'Commercial Playout',
      'Broadcast Monitoring',
      'Media Operations',
      'Channel Operations',
      'Audio Editing',
      'Broadcast Television',
      'Server Operations'
    ]
  },
  {
    id: 'exp-agrarian',
    role: 'Full Stack Engineer Intern',
    organization: 'Department of Agrarian Development',
    employmentType: 'Internship',
    period: 'August 2025 – February 2026',
    location: 'Colombo District, Western Province, Sri Lanka',
    isCurrent: false,
    isSoftwareRole: true,
    statusVerified: true,
    description:
      'Gained practical experience developing web-based systems and working with PHP, JavaScript, SQL, HTML, CSS, and XAMPP to support organizational software needs and internal workflows.',
    skills: [
      'PHP',
      'JavaScript',
      'SQL',
      'HTML5',
      'CSS3',
      'XAMPP',
      'Relational Databases',
      'Web Systems'
    ]
  },
  {
    id: 'exp-heritage',
    role: 'Full Stack Developer',
    organization: 'Heritage Crops Plantations (Pvt) Ltd',
    affiliationNote: 'Record pending details confirmation',
    employmentType: 'Pending Confirmation',
    period: '[Pending Confirmation]',
    location: 'Sri Lanka',
    isCurrent: false,
    isSoftwareRole: true,
    statusVerified: false,
    description:
      'Original profile references software development tenure with Heritage Crops Plantations. Detailed employment dates, contract scope, verified outcomes, and technical stack are awaiting formal confirmation.',
    skills: ['Full-Stack Development', 'Web Application Development']
  }
];

export const projectsData: Project[] = [
  {
    id: 'proj-wms',
    slug: 'warehouse-management-system',
    name: 'Warehouse Management System',
    category: 'Enterprise / Systems',
    shortDescription:
      'Client-facing enterprise system streamlining inventory tracking, shift scheduling, and supply chain operations.',
    problem:
      'Manual warehouse coordination suffered from disjointed stock audits, scheduling friction, and high operational latency across shifting personnel.',
    myContribution:
      'Engineered the secure authentication and role authorization layer, architected the staff management module, and implemented a custom shift-scheduling algorithm for operational staff.',
    technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'MERN Stack', 'JWT'],
    features: [
      'Inventory and stock monitoring with real-time state tracking',
      'Automated low-inventory thresholds and alerts',
      'Purchase order creation and lifecycle tracking',
      'Shipping, dispatch, and transit management',
      'Wastage logging and anomaly tracking',
      'Supplier catalog and vendor management',
      'Staff directory and automated shift scheduling algorithm',
      'Fully responsive operational interface for warehouse floor tablets and desktops'
    ],
    reportedOutcome: 'Client reported a 20% reduction in operational delays and marked improvement in inventory audit accuracy.',
    repositoryUrl: 'https://github.com/Shiranakther/Warehouse_Management_Syatem',
    liveUrl: '',
    imageUrl: '',
    featured: true
  },
  {
    id: 'proj-issuesync',
    slug: 'issuesync-tracker',
    name: 'IssueSync / Issue Tracker',
    category: 'Full-Stack',
    shortDescription:
      'Full-stack issue tracking and task management system with decoupled cloud deployments.',
    problem:
      'Teams require lightweight, frictionless tracking tools without bloated enterprise overhead to triage bugs, prioritize tasks, and track statuses.',
    myContribution:
      'Designed and implemented the complete application from frontend state management to backend RESTful API architecture and independent continuous deployments.',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Netlify', 'Render'],
    features: [
      'JWT-based secure authentication and session management',
      'Full CRUD operations for issue lifecycle, status transitions, and priorities',
      'Reusable navigation and ergonomic form workflows',
      'Toast notification framework for immediate user feedback on mutations',
      'Decoupled architecture: Vite frontend deployed on Netlify, Express API on Render'
    ],
    repositoryUrl: 'https://github.com/manamendraJN/issue-tracker',
    liveUrl: 'https://issuesync.netlify.app/',
    imageUrl: '',
    featured: true
  },
  {
    id: 'proj-gesture',
    slug: 'hand-gesture-control',
    name: 'HandGestureControl',
    category: 'Computer Vision & AI',
    shortDescription:
      'Touchless computer interaction utilizing optical hand tracking and real-time cursor control.',
    problem:
      'Providing hands-free computing interfaces for accessibility, surgical environments, or presentations without requiring specialized motion hardware.',
    myContribution:
      'Engineered the entire computer vision pipeline from webcam feed capture, landmark identification via MediaPipe, gesture classification logic, and OS-level cursor emulation.',
    technologies: ['Python', 'OpenCV', 'MediaPipe', 'PyAutoGUI', 'Win32 API'],
    features: [
      'Full-screen cursor navigation mapped directly from right-hand landmark points',
      'Dynamically adjustable cursor movement velocity and smoothing factors',
      'Two-finger precision gesture trigger for single-click emulation',
      'Three-finger spatial trigger for double-click execution',
      'Five-second interactive calibration phase for diverse lighting conditions',
      'Always-on-top preview viewport rendering real-time skeleton landmark overlays'
    ],
    repositoryUrl: 'https://github.com/manamendraJN/HandGestureControl',
    imageUrl: '',
    featured: true
  },
  {
    id: 'proj-collabhub',
    slug: 'collab-hub',
    name: 'Collab Hub',
    category: 'Collaboration',
    shortDescription:
      'Remote-work collaboration workspace featuring task distribution, project boards, and file coordination.',
    problem:
      'Distributed teams experience cognitive overload when project files, communication, and task assignment logic exist in disparate tools.',
    myContribution:
      'Architected the platform interface, built the full-stack REST layer with Socket.IO integration, and conceptualized the Smart Workload Balancer algorithm.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'JWT'],
    features: [
      'Centralized workspace project management and team board views',
      'Multi-user task distribution with assignment tracking',
      'Conceptual Smart Workload Balancer considering workload, deadlines, and task complexity',
      'Document and asset file sharing within project contexts',
      'JWT-authenticated team member roles and permissions'
    ],
    repositoryUrl: 'https://github.com/manamendraJN/Collab-Hub',
    imageUrl: '',
    featured: false
  },
  {
    id: 'proj-skillsphere',
    slug: 'skillsphere',
    name: 'SkillSphere',
    category: 'Full-Stack',
    shortDescription:
      'Interactive skill discovery and learning platform connecting mentors and learners across technical and creative domains.',
    problem:
      'Traditional online courses lack structured interactive engagement and community-driven learning paths across coding and creative arts.',
    myContribution:
      'Designed the React UI system, integrated Spring Boot REST endpoints with MySQL persistence, and scaffolded WebRTC session controls.',
    technologies: ['React', 'Spring Boot', 'MySQL', 'WebRTC', 'OAuth 2.0'],
    features: [
      'Personalized domain learning paths spanning coding, photography, and creative arts',
      'Progress tracking milestones and course completion metrics',
      'Interactive video and live peer consultation interface scaffolded with WebRTC',
      'Community discussion forums and topic threads',
      'Achievement badges and gamified learning milestones'
    ],
    repositoryUrl: 'https://github.com/manamendraJN/SkillSphere',
    imageUrl: '',
    featured: false
  }
];

export const certificatesData: CertificateItem[] = [
  {
    id: 'cert-ieee',
    title: 'IEEE SCSE 2026 — Author Certificate',
    issuer: 'IEEE SCSE Conference Committee',
    dateAwarded: 'March 2026',
    category: 'Academic Research',
    verificationUrl: 'https://doi.org/10.1109/SCSE70081.2026.11499770',
    description: 'Certificate of authorship for published paper on Temporal Personal Fashion AI System with Multi-Component Integration.',
    imageUrl: ''
  },
  {
    id: 'cert-sliit-ai',
    title: 'AI/ML Engineer',
    issuer: 'SLIIT',
    category: 'AI & Machine Learning',
    verificationUrl: 'https://code.sliit.org/certificates/muy9c4mfjv',
    description: 'Comprehensive program covering machine learning algorithms, deep neural architectures, and applied AI models.',
    imageUrl: ''
  },
  {
    id: 'cert-aws-academy',
    title: 'AWS Academy Graduate — Cloud Web Application Builder',
    issuer: 'Amazon Web Services (AWS)',
    category: 'Cloud & Architecture',
    verificationUrl: 'https://www.credly.com/badges/230d6cf1-20b6-4433-b23c-0159a704e218',
    description: 'Building Highly Available, Scalable Web Applications covering EC2, RDS, VPC, Auto Scaling, Elastic Load Balancers, and cloud deployments.',
    imageUrl: ''
  },
  {
    id: 'cert-aws-simulearn',
    title: 'AWS SimuLearn: Computing Solutions',
    issuer: 'Amazon Web Services (AWS)',
    dateAwarded: 'August 2025',
    credentialId: 'dd070d49-7895-4e47-8c11-841964fdb44e',
    category: 'Cloud & Architecture',
    verificationUrl: '',
    description: 'Hands-on architectural simulation of production compute, fault-tolerant infrastructure, and scalable cloud solution design.',
    imageUrl: ''
  },
  {
    id: 'cert-hr-react',
    title: 'React (Basic)',
    issuer: 'HackerRank',
    category: 'Software Engineering',
    verificationUrl: 'https://www.hackerrank.com/certificates/206119c6659f',
    description: 'Component architecture, state management, hook lifecycle, and JSX rendering evaluation.',
    imageUrl: ''
  },
  {
    id: 'cert-hr-js',
    title: 'JavaScript (Basic)',
    issuer: 'HackerRank',
    category: 'Software Engineering',
    verificationUrl: 'https://www.hackerrank.com/certificates/ef62b645d0bd',
    description: 'Modern ES6+ syntax, asynchronous programming, closures, and object manipulation.',
    imageUrl: ''
  },
  {
    id: 'cert-hr-sql',
    title: 'SQL (Basic)',
    issuer: 'HackerRank',
    category: 'Software Engineering',
    verificationUrl: 'https://hackerrank.com/certificates/12e449396716',
    description: 'Relational schema queries, complex joins, aggregation, and subqueries.',
    imageUrl: ''
  },
  {
    id: 'cert-hr-java',
    title: 'Java (Basic)',
    issuer: 'HackerRank',
    category: 'Software Engineering',
    verificationUrl: 'https://www.hackerrank.com/certificates/768a9f87f70c',
    description: 'Object-oriented programming, data structures, type safety, and core standard libraries.',
    imageUrl: ''
  },
  {
    id: 'cert-sololearn-python',
    title: 'Python (Basic)',
    issuer: 'SoloLearn',
    category: 'Software Engineering',
    verificationUrl: 'https://www.sololearn.com/en/certificates/CC-S7UZM0GN',
    description: 'Fundamental syntax, control flow, functions, and standard data structures.',
    imageUrl: ''
  }
];

export const skillGroupsData: SkillGroup[] = [
  {
    category: 'Languages',
    skills: ['Java', 'JavaScript', 'PHP', 'Python', 'C', 'TypeScript']
  },
  {
    category: 'Frontend Engineering',
    skills: ['HTML5', 'CSS3', 'React', 'Tailwind CSS', 'Bootstrap']
  },
  {
    category: 'Backend & APIs',
    skills: ['Node.js', 'Express', 'Spring Boot']
  },
  {
    category: 'Mobile Development',
    skills: ['Kotlin']
  },
  {
    category: 'Databases & Storage',
    skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'SQLite']
  },
  {
    category: 'AI / ML & Computer Vision',
    skills: ['AI/ML Principles', 'OpenCV', 'MediaPipe', 'EfficientNet-B3']
  },
  {
    category: 'Application Technologies',
    skills: ['MERN Stack', 'JWT Authentication', 'OAuth 2.0', 'Socket.IO', 'WebRTC']
  },
  {
    category: 'Tools & DevOps',
    skills: ['Git', 'GitHub', 'Postman', 'GitHub Actions', 'Docker']
  },
  {
    category: 'Cloud Infrastructure',
    skills: ['AWS EC2', 'AWS RDS', 'AWS VPC', 'Auto Scaling', 'Elastic Load Balancing']
  },
  {
    category: 'Design & UX',
    skills: ['Figma', 'UI/UX Principles', 'Responsive Layouts']
  }
];
