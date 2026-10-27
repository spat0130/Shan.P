// All site copy lives here. Edit this file to update the content.

export const profile = {
  name: 'Shanmuka Patchigolla',
  firstName: 'Shanmuka',
  lastName: 'Patchigolla',
  shortName: 'Shan',
  location: 'Melbourne, VIC',
  role: 'Business Analyst · Designer · Developer',
  tagline: 'Builder. Problem solver. Always learning.',
  intro:
    'I started as an engineer training computer-vision models, then moved into business analysis to understand why good technology still fails. Today I bridge both worlds, turning stakeholder needs into data, processes and products that actually work.',
  bio: [
    "I'm Shan, a business analyst, developer and designer completing my Master of Business Information Systems at Monash University. I work where technology, business and people meet: gathering requirements, mapping processes, building dashboards and prototyping the solution.",
    'My background spans software engineering, deep learning, business analysis and operations. I care about technology that is responsible, not just powerful: privacy-first AI, sustainable digitalisation and accessible design.',
  ],
  quote: {
    text: 'Shanmukha demonstrated a sharp understanding of complex problems and was remarkably quick in learning and adapting to new challenges.',
    author: 'Nithya Kumaran',
    role: 'Ex-Amazon · Gen AI Software Engineer · Co-founder',
  },
}

// Short-URL pages. `icon` names a line icon in components/Icon.jsx.
export const pages = [
  { path: '/about', label: 'About', title: 'About me', eyebrow: 'Builder. Problem solver. Always learning.', icon: 'person' },
  { path: '/journey', label: 'Journey', title: 'My journey', eyebrow: 'Same streets. New perspective.', icon: 'route' },
  { path: '/projects', label: 'Projects', title: 'Projects in motion', eyebrow: 'Ideas → Code → Real impact.', icon: 'chart' },
  { path: '/contact', label: 'Contact', title: "Let's connect", eyebrow: 'Open to opportunities.', icon: 'connect' },
]
const page = (path) => pages.find((p) => p.path === path)

// Round badge links on either side of the hero.
export const badges = {
  left: [
    { to: '/about', label: 'About me', icon: 'person' },
    { to: '/journey', label: 'My journey', icon: 'route' },
    { to: 'https://www.linkedin.com/in/shan-pat', label: 'LinkedIn', icon: 'linkedin' },
  ],
  right: [
    { to: '/projects', label: 'Projects', icon: 'chart' },
    { to: '/contact', label: "Let's connect", icon: 'connect' },
    { to: 'https://github.com/spat0130', label: 'GitHub', icon: 'github' },
  ],
}

// Three short proof points along the bottom of the hero.
export const highlights = [
  { value: '15+', label: 'Projects delivered across business, data and AI' },
  { value: 'Award', label: 'Outstanding Pitch, FIT5233 AI Transformation, Monash' },
  { value: 'Top 17', label: 'Of around 100 teams selected for the Monash IE Expo' },
]

export const explore = ['/about', '/journey', '/projects'].map(page)

// How I work.
export const principles = [
  { label: 'Understand first', text: 'Turn assumptions into insights. Talk to real users, ask the five whys and validate before building.' },
  { label: 'Build responsibly', text: 'Privacy, ethics and sustainability are design requirements, not afterthoughts.' },
  { label: 'Deliver together', text: 'Innovation is a team sport. I connect business, data and design so teams ship work that matters.' },
]

// Quick numbers.
export const stats = [
  { value: '15+', label: 'Projects delivered' },
  { value: '4', label: 'Industry roles' },
  { value: '3', label: 'Countries studied & worked' },
]

// The journey so far, oldest first.
export const timeline = [
  {
    id: 'sathyabama',
    period: '2020 – 2024',
    title: 'B.E. Computer Science',
    place: 'Sathyabama Institute, Chennai',
    text: 'Graduated with High Distinction (CGPA 8.36). Built computer-vision, data and mobile projects.',
  },
  {
    id: 'dexbotix',
    period: '2021',
    title: 'Deep Learning Intern',
    place: 'Dexbotix, India',
    text: 'Built a YOLOv5 and OpenCV detection system for a shuttle-grabbing machine.',
  },
  {
    id: 'ump',
    period: '2023 – 2024',
    title: 'Computer Systems & Networking',
    place: 'Universiti Malaysia Pahang',
    text: 'Mobility program with Distinction. Earned Cisco CCNA certifications.',
  },
  {
    id: 'aity',
    period: '2024',
    title: 'Software Engineer Intern',
    place: 'Aity Inc, USA (remote)',
    text: 'Created AI training datasets, tested and iterated models, and led UI and brand design.',
  },
  {
    id: 'time-to-save',
    period: '2025 – 2026',
    title: 'Business Analyst',
    place: 'Time To Save, Melbourne',
    text: 'Led requirements, As-Is/To-Be process mapping and KPI dashboards in Power BI and SQL.',
  },
  {
    id: 'monash',
    period: '2025 – 2027',
    title: 'Master of Business Information Systems',
    place: 'Monash University, Melbourne',
    text: 'Academic Distinction. Outstanding Pitch Award (FIT5233) and Innovation for Impact badge.',
  },
]

// Toolkit.
export const skills = [
  'Business Analysis',
  'Requirements Gathering',
  'Process Mapping',
  'Stakeholder Management',
  'KPI Dashboards',
  'Power BI',
  'Tableau',
  'SQL',
  'Python',
  'Java',
  'Figma',
  'AI Governance',
  'Project Management',
  'Git',
]

// Focus areas, used as project categories.
export const focusAreas = [
  'Business Analysis & Systems',
  'AI & Responsible Tech',
  'Product & UX Design',
  'Project Management',
  'Computer Vision & ML',
  'Networks & Security',
]
const [BA, AI, UX, PM, CV, NET] = focusAreas

// Featured projects get a full card. `link` is optional; add a URL to show a button.
export const projects = [
  {
    id: 'ai-smart',
    title: 'AI-Smart Capability Program',
    category: AI,
    year: '2026',
    highlight: 'Outstanding Pitch Award',
    summary:
      'Business case for a 12,000-consultant firm scaling AI without eroding junior skills. Four pillars, from AI-free sprints to reasoning defence gates, so human judgment owns every gate before work reaches the client.',
    tags: ['AI Strategy', 'Consulting', 'Change Management'],
  },
  {
    id: 'elegance-crm',
    title: 'Élégance CRM & Access Control',
    category: BA,
    year: '2025',
    summary:
      'CRM solution for a luxury retail brand. Designed dashboards in Figma, mapped key data assets and built a least-privilege RBAC framework with MFA, encryption and access reviews.',
    tags: ['Requirements', 'Figma', 'RBAC', 'Security'],
  },
  {
    id: 'healthcare',
    title: 'Healthcare Digitalisation Case Study',
    category: AI,
    year: '2025',
    summary:
      'Responsible AI adoption for a private hospital. Assessed AI use cases against Victorian health privacy law and recommended governance for AI scribes, including clinician oversight and consent.',
    tags: ['AI Governance', 'Privacy', 'Risk'],
  },
  {
    id: 'vault-man',
    title: 'Vault-Man Password Manager',
    category: UX,
    year: '2025',
    summary:
      'Secure, user-friendly password manager. Ran user interviews, built personas and journeys, and specified AES-256 storage, breach checks and WCAG 2.1 AA accessibility.',
    tags: ['User Research', 'Service Blueprint', 'Accessibility'],
  },
  {
    id: 'research-network',
    title: 'High-Speed Network for Research Labs',
    category: PM,
    year: '2025',
    summary:
      'Planned an A$1.5M network project end to end: scope, WBS, stakeholder plan, cost-benefit and ROI analysis, with a hybrid Agile and Waterfall delivery approach.',
    tags: ['WBS', 'Budgeting', 'ROI', 'Stakeholders'],
  },
  {
    id: 'drone-thermal',
    title: 'Drone Patrolling with Thermal Detection',
    category: CV,
    year: '2024',
    summary:
      'Real-time thermal image detection for patrol drones using YOLOv5 and YOLOv7, with a data transmission module and privacy safeguards built in.',
    tags: ['YOLO', 'Python', 'Computer Vision'],
  },
]

// Everything else, shown as a compact list under the featured cards.
export const moreProjects = [
  { title: 'Monash Industry Experience Product', year: '2026', category: UX, note: 'Selected for the expo, top 17 of around 100 teams' },
  { title: 'AI-in-Banking Innovation Sprint (MIG)', year: '2026', category: AI, note: 'Innovation for Impact badge' },
  { title: 'Face Recognition Attendance System', year: '2024', category: CV },
  { title: 'Neuro-degenerative Symptoms Detection', year: '2023', category: CV },
  { title: 'Network Security: DDoS Hardening', year: '2023', category: NET },
  { title: 'Network Attached Storage', year: '2023', category: NET },
  { title: 'Complaint Management Mobile App', year: '2022', category: UX },
  { title: 'Arduino Bluetooth-Controlled Car', year: '2021', category: CV },
  { title: 'Image Detection for a Shuttle-Grabbing Machine', year: '2021', category: CV },
  { title: 'Java Calculator', year: '2022', category: UX },
  { title: 'Personalised Sales Website Design', year: '2021', category: UX },
  { title: 'Apple Website Front-End Clone', year: '2021', category: UX },
]

export const contact = {
  heading: "Let's Connect",
  text: 'Open to business analyst, product and consulting roles, collaborations and new ideas.',
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shan-pat', icon: 'linkedin' },
    { label: 'GitHub', href: 'https://github.com/spat0130', icon: 'github' },
    { label: 'Email', href: 'mailto:shan.everything@gmail.com', icon: 'email' },
  ],
}
